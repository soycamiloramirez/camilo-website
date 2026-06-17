import crypto from 'node:crypto';

/**
 * Stateless double-opt-in tokens.
 *
 * Encodes email + timestamp + nonce, signs with HMAC-SHA256 using NEWSLETTER_CONFIRM_SECRET.
 * No database needed: we trust the signature.
 *
 * Token expires after MAX_AGE_MS (24h by default) — old tokens fail verification.
 */

const MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24h

function getSecret(): string {
  const secret = import.meta.env.NEWSLETTER_CONFIRM_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error('NEWSLETTER_CONFIRM_SECRET missing or too short (need 16+ chars).');
  }
  return secret;
}

function b64url(buf: Buffer): string {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function unb64url(s: string): Buffer {
  const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4));
  return Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/') + pad, 'base64');
}

export function signSubscribeToken(email: string): string {
  const payload = JSON.stringify({
    e: email.toLowerCase().trim(),
    t: Date.now(),
    n: crypto.randomBytes(8).toString('hex'),
  });
  const payloadB64 = b64url(Buffer.from(payload, 'utf8'));
  const sig = crypto
    .createHmac('sha256', getSecret())
    .update(payloadB64)
    .digest();
  return `${payloadB64}.${b64url(sig)}`;
}

export function verifySubscribeToken(token: string): { ok: true; email: string } | { ok: false; reason: string } {
  if (!token || typeof token !== 'string') return { ok: false, reason: 'missing' };
  const parts = token.split('.');
  if (parts.length !== 2) return { ok: false, reason: 'malformed' };
  const [payloadB64, sigB64] = parts;

  const expectedSig = crypto.createHmac('sha256', getSecret()).update(payloadB64).digest();
  const givenSig = unb64url(sigB64);
  if (expectedSig.length !== givenSig.length || !crypto.timingSafeEqual(expectedSig, givenSig)) {
    return { ok: false, reason: 'bad-signature' };
  }

  try {
    const payload = JSON.parse(unb64url(payloadB64).toString('utf8'));
    if (typeof payload.e !== 'string' || typeof payload.t !== 'number') {
      return { ok: false, reason: 'bad-payload' };
    }
    if (Date.now() - payload.t > MAX_AGE_MS) {
      return { ok: false, reason: 'expired' };
    }
    return { ok: true, email: payload.e };
  } catch {
    return { ok: false, reason: 'parse-error' };
  }
}
