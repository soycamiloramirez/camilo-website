import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { verifySubscribeToken } from '../../lib/email-tokens';
import { welcomeEmailHtml } from '../../lib/emails';

export const prerender = false;

/**
 * GET /api/confirm-subscription?token=...
 *
 * Verifica el token DOI, añade el email al audience de Resend (unsubscribed=false),
 * envía welcome email, y redirige a /gracias-newsletter.
 */

const SITE_URL = 'https://camilo-ramirez.com';

export const GET: APIRoute = async ({ url, redirect }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const audienceId = import.meta.env.RESEND_AUDIENCE_ID;
  const fromEmail = import.meta.env.CONTACT_FROM_EMAIL || 'forms@send.camilo-ramirez.com';

  if (!apiKey || !audienceId) {
    return new Response('Server not configured.', { status: 500 });
  }

  const token = url.searchParams.get('token');
  const result = verifySubscribeToken(token ?? '');
  if (!result.ok) {
    return redirect(`/gracias-newsletter?status=invalid&reason=${encodeURIComponent(result.reason)}`, 302);
  }

  const email = result.email;
  const resend = new Resend(apiKey);

  try {
    // Add to audience (idempotente — si ya existe, Resend devuelve 409 o lo upsertea según versión).
    await resend.contacts.create({
      audienceId,
      email,
      unsubscribed: false,
    });
  } catch (err: unknown) {
    // Si ya existe, no es error fatal — seguimos al welcome.
    const status = (err as { statusCode?: number })?.statusCode;
    if (status && status !== 409) {
      console.error('[confirm] contact.create error', err);
    }
  }

  // Welcome email — no bloqueante: si falla, igual confirmamos al usuario.
  try {
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
