import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { verifySubscribeToken } from '../../lib/email-tokens';
import { welcomeEmailHtml } from '../../lib/emails';

export const prerender = false;

/**
 * GET /api/confirm-subscription?token=...
 *
 * Verifica el token DOI, crea el contacto en Resend asignado al segment del
 * newsletter (unsubscribed=false), envía welcome email, y redirige a
 * /gracias-newsletter.
 *
 * Usa la API nueva de Contacts (sin audience_id, que está deprecated).
 */

export const GET: APIRoute = async ({ url, redirect }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const segmentId = import.meta.env.RESEND_SEGMENT_ID;
  const fromEmail = import.meta.env.CONTACT_FROM_EMAIL || 'forms@send.camilo-ramirez.com';

  if (!apiKey || !segmentId) {
    return new Response('Server not configured.', { status: 500 });
  }

  const token = url.searchParams.get('token');
  const result = verifySubscribeToken(token ?? '');
  if (!result.ok) {
    return redirect(`/gracias-newsletter?status=invalid&reason=${encodeURIComponent(result.reason)}`, 302);
  }

  const email = result.email;

  // Crear contacto via REST directo (API nueva, sin audience_id).
  try {
    const res = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        unsubscribed: false,
        segments: [{ id: segmentId }],
      }),
    });
    if (!res.ok && res.status !== 409) {
      // 409 = ya existe, no es error. Otros sí loguear pero no bloquear.
      const body = await res.text();
      console.error('[confirm] contact.create non-ok', res.status, body);
    }
  } catch (err) {
    console.error('[confirm] contact.create exception', err);
  }

  // Welcome email — no bloqueante.
  try {
    const resend = new Resend(apiKey);
    const { subject, html, text } = welcomeEmailHtml();
    await resend.emails.send({
      from: `Camilo Ramirez <${fromEmail}>`,
      to: [email],
      subject,
      html,
      text,
    });
  } catch (err) {
    console.error('[confirm] welcome send failed', err);
  }

  return redirect(`/gracias-newsletter?status=ok`, 302);
};
