import crypto from 'node:crypto';

/**
 * Token de sesión de formulario, FIRMADO server-side (HMAC-SHA256).
 *
 * PROBLEMA que resuelve: los bots hacen POST DIRECTO a /api/contact y
 * /api/subscribe sin cargar nunca la página. Al no cargarla, no tienen honeypots
 * que llenar mal ni señal de tiempo (`form_elapsed`) — y como esas capas
 * fallan-abierto para no bloquear a nadie, el spam pasaba.
 *
 * SOLUCIÓN: la página, al enviarse (ya envía por fetch JS, así que JS es
 * obligatorio para un envío real), pide un token fresco a /api/form-token y lo
 * manda en un campo oculto `form_token`. El endpoint RECHAZA si el token falta,
 * la firma no valida, o tiene más de MAX_AGE_MS. Un POST directo de bot no
 * tendrá token válido → rechazo silencioso.
 *
 * El token es `${timestamp}.${hmac(timestamp)}`. No lleva PII. Es stateless.
 *
 * SECRETO (ver getFormTokenSecret): `FORM_TOKEN_SECRET` de entorno. Si no está,
 * cae a un secreto estable por-deploy derivado de otros valores del entorno del
 * build/deploy, para NO romper el sitio si la env no está configurada. Como el
 * mismo secreto firma (en /api/form-token) y verifica (en los endpoints) dentro
 * del mismo deploy, los tokens de un usuario real siempre validan.
 */

const MAX_AGE_MS = 6 * 60 * 60 * 1000; // 6h: cubre pestañas dejadas abiertas.

/**
 * Resuelve el secreto HMAC. Node-safe: usa import.meta.env (Astro/Vite) si
 * existe y si no process.env (tests / runtime Node). Nunca lanza: siempre
 * devuelve algo estable dentro del mismo deploy para no tumbar el form.
 */
export function getFormTokenSecret(): string {
  // @ts-expect-error import.meta.env sólo existe bajo Vite/Astro.
  const viteEnv = (typeof import.meta !== 'undefined' && import.meta.env) || undefined;
  const pick = (k: string): string | undefined =>
    (viteEnv && viteEnv[k]) || (typeof process !== 'undefined' ? process.env?.[k] : undefined);

  const explicit = pick('FORM_TOKEN_SECRET');
  if (explicit && explicit.length >= 16) return explicit;

  // Fallback estable por-deploy (no ideal, pero mejor que romper el sitio).
  // Reutiliza secretos ya presentes o el SHA del commit de Vercel; todos son
  // estables dentro de un mismo deploy, que es lo único que necesitamos.
  const derived =
    pick('NEWSLETTER_CONFIRM_SECRET') ||
    pick('VERCEL_DEPLOYMENT_ID') ||
    pick('VERCEL_GIT_COMMIT_SHA') ||
    'camilo-ramirez-form-token-fallback-v1';
  return crypto.createHash('sha256').update(`form-token::${derived}`).digest('hex');
}

function b64url(buf: Buffer): string {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function sign(ts: string, secret: string): string {
  return b64url(crypto.createHmac('sha256', secret).update(ts).digest());
}

/** Genera un token fresco firmado con el timestamp actual. */
export function signFormToken(now: number = Date.now(), secret: string = getFormTokenSecret()): string {
  const ts = String(now);
  return `${ts}.${sign(ts, secret)}`;
}

/**
 * Verifica un token de formulario. `true` sólo si:
 *   - tiene formato `ts.sig`,
 *   - la firma valida (comparación de tiempo constante),
 *   - el timestamp es un número y no tiene más de MAX_AGE_MS ni está en el futuro.
 * Cualquier otra cosa (ausente, malformado, firma mala, expirado) → false.
 */
export function verifyFormToken(
  token: unknown,
  now: number = Date.now(),
  maxAgeMs: number = MAX_AGE_MS,
  secret: string = getFormTokenSecret()
): boolean {
  if (typeof token !== 'string' || token.length === 0) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [ts, sig] = parts;
  if (!/^\d{10,16}$/.test(ts)) return false;

  const expected = sign(ts, secret);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  const t = Number(ts);
  if (!Number.isFinite(t)) return false;
  // Tolerancia de 2 min hacia el futuro por skew de reloj entre lambdas.
  if (t > now + 2 * 60 * 1000) return false;
  if (now - t > maxAgeMs) return false;
  return true;
}
