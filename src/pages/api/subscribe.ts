import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { signSubscribeToken } from '../../lib/email-tokens';
import { confirmEmailHtml } from '../../lib/emails';

export const prerender = false;

/**
 * POST /api/subscribe
 *
 * Recibe { email, website? } (website = honeypot).
 * Genera token DOI firmado y envía email de confirmación con link a /api/confirm-subscription.
 * NO añade al audience de Resend hasta que confirme. Stateless.
 *
 * Devuelve siempre `{ ok: true }` ante honeypot llenado (para no dar señal a bots).
 */

const SITE_URL = 'https://camilo-ramirez.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const fromEmail = import.meta.env.CONTACT_FROM_EMAIL || 'forms@send.camilo-ramirez.com';

  if (!apiKey) {
    return json({ ok: false, error: 'Server not configured.' }, 500);
  }

  let body: { email?: string; website?: string } = {};
  try {
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      body = await request.json();
    } else {
      const form = await request.formData();
      body = Object.fromEntries(form.entries()) as typeof body;
    }
  } catch {
    return json({ ok: false, error: 'Invalid payload.' }, 400);
  }

  // Honeypot: respondemos ok para no dar señal a bots.
  if (body.website && body.website.trim() !== '') {
    return json({ ok: true }, 200);
  }

  const email = (body.email ?? '').trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'Email inválido.' }, 400);
  }

  let token: string;
  try {
    token = signSubscribeToken(email);
  } catch (err) {
    console.error('[subscribe] token signing failed', err);
    return json({ ok: false, error: 'Server not configured.' }, 500);
  }

  const confirmUrl = `${SITE_URL}/api/confirm-subscription?token=${encodeURIComponent(token)}`;
  const { subject, html, text } = confirmEmailHtml(confirmUrl);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Camilo Ramirez <${fromEmail}>`,
      to: [email],
      subject,
      html,
      text,
    });
    if (error) {
      console.error('[subscribe] resend send error', error);
      return json({ ok: false, error: 'No se pudo enviar la confirmación.' }, 502);
    }
    return json({ ok: true }, 200);
  } catch (err) {
    console.error('[subscribe] send failed', err);
    return json({ ok: false, error: 'Error inesperado.' }, 500);
  }
};

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
