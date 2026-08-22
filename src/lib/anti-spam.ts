/**
 * Anti-spam helpers compartidos por los tres endpoints de formulario
 * (contact.ts, subscribe.ts, propuesta.ts).
 *
 * Capas (todas server-side salvo la señal de tiempo, que la setea el cliente):
 *   1. HONEYPOTS   — campos trampa `website` + `company_url`. Si CUALQUIERA
 *                    viene lleno → spam. (Humanos nunca los ven; bots los llenan.)
 *   2. TIEMPO      — `form_elapsed` = ms desde que cargó el form (lo setea el
 *                    cliente vía JS en Base.astro). Envío <3s → bot.
 *   3. TURNSTILE   — reto invisible de Cloudflare. GATED por env: sólo se exige
 *                    si TURNSTILE_SECRET_KEY está definida. Si no, se omite y el
 *                    form funciona con las capas 1, 2 y 4. Verifica contra
 *                    https://challenges.cloudflare.com/turnstile/v0/siteverify.
 *   4. HEURÍSTICA  — detección conservadora de spam de suscripción y de links
 *                    pegados en el cuerpo del mensaje (un lead real no pega links).
 *   5. RATE LIMIT  — best-effort en memoria por IP (soft; ver nota abajo).
 *
 * ENV VARS para activar Turnstile (Camilo las crea en Vercel):
 *   - PUBLIC_TURNSTILE_SITE_KEY   (cliente, build-time) — site key del widget
 *   - TURNSTILE_SECRET_KEY        (server) — secret para siteverify
 * Si AMBAS faltan, el sitio funciona igual sin Turnstile (fallback a 1, 2, 4, 5).
 *
 * Regla de oro: mejor dejar pasar un dudoso que bloquear un cliente real.
 */

const MIN_ELAPSED_MS = 3000;

/** Capa 1 — ¿algún honeypot viene lleno? */
export function isHoneypotFilled(data: Record<string, unknown>): boolean {
  const filled = (v: unknown) => typeof v === 'string' && v.trim() !== '';
  return filled(data.website) || filled(data.company_url);
}

/**
 * Capa 2 — ¿el form se envió demasiado rápido (<3s)?
 * `form_elapsed` lo setea el cliente (Date.now() - loadTime), así que es
 * inmune al skew de reloj y al cacheo por CDN. Si el campo falta (p. ej. un
 * navegador raro o script bloqueado) NO bloqueamos: devolvemos false.
 */
export function isTooFast(data: Record<string, unknown>): boolean {
  const raw = data.form_elapsed;
  if (raw === undefined || raw === null || raw === '') return false;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return false;
  return n < MIN_ELAPSED_MS;
}

/** Capa 4a — spam clásico de suscripción ("mailing list" + "subscription"). */
export function looksLikeSubscriptionSpam(text: string): boolean {
  if (!text) return false;
  const t = text.toLowerCase();
  const mailingList = t.includes('mailing list') || t.includes('mailinglist');
  const subscription =
    /subscription|confirm my subscription|unsubscribe|subscribe me|send me updates/.test(t);
  return mailingList && subscription;
}

/**
 * Capa 4b — ¿el cuerpo trae links? Un lead real de advisory no pega URLs.
 * Conservador: sólo dispara con http(s)://, www.<algo> o bbcode [url.
 */
export function containsLink(text: string): boolean {
  if (!text) return false;
  return /(https?:\/\/|www\.[a-z0-9-]|\[url)/i.test(text);
}

/**
 * Capa 3 — verificación server-side de Cloudflare Turnstile.
 * Devuelve `{ ok, enforced }`:
 *   - Si TURNSTILE_SECRET_KEY no está → { ok: true, enforced: false } (gated off).
 *   - Si hay error de red hacia Cloudflare → fail-open { ok: true } para no
 *     tumbar el form si CF está caído.
 *   - Token ausente o inválido con la capa activa → { ok: false, enforced: true }.
 */
export async function verifyTurnstile(
  data: Record<string, unknown>,
  remoteip?: string | null
): Promise<{ ok: boolean; enforced: boolean }> {
  const secret = import.meta.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: true, enforced: false };

  const token =
    typeof data['cf-turnstile-response'] === 'string'
      ? (data['cf-turnstile-response'] as string).trim()
      : '';
  if (!token) return { ok: false, enforced: true };

  try {
    const body = new URLSearchParams();
    body.set('secret', secret);
    body.set('response', token);
    if (remoteip) body.set('remoteip', remoteip);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    });
    const json: { success?: boolean } = await res.json().catch(() => ({ success: false }));
    return { ok: json.success === true, enforced: true };
  } catch (err) {
    console.error('[anti-spam] Turnstile verify network error — failing open', err);
    return { ok: true, enforced: false };
  }
}

/**
 * Capa 5 — rate limit best-effort por IP, sólo en memoria del lambda caliente.
 * NOTA: el runtime serverless de Vercel no garantiza una instancia persistente
 * ni compartida entre regiones, así que esto NO es un rate limit robusto — es un
 * amortiguador barato sin dependencias. Lenient a propósito (evita bloquear NAT
 * corporativos). Las capas 1-4 son la defensa real.
 */
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 8;
const hits = new Map<string, number[]>();

export function hitRateLimit(ip: string | null | undefined): boolean {
  if (!ip) return false;
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  // Poda ocasional para no crecer sin límite.
  if (hits.size > 5000) hits.clear();
  return arr.length > RATE_MAX;
}

/** Extrae la IP del cliente detrás del proxy de Vercel. */
export function clientIp(request: Request): string | null {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return request.headers.get('x-real-ip');
}
