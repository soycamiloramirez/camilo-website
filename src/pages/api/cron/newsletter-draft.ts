import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { Resend } from 'resend';
import { draftReadyEmailHtml } from '../../../lib/emails';

export const prerender = false;

/**
 * GET /api/cron/newsletter-draft
 *
 * Vercel Cron lo dispara cada viernes 8:30 AM Bogotá (13:30 UTC).
 * Lee posts del blog publicados en los últimos 7 días, arma un draft de broadcast
 * en Resend, y manda email a Camilo con link al draft para que revise y dispare.
 *
 * Auth: Vercel agrega header `Authorization: Bearer ${CRON_SECRET}` automáticamente.
 */

const SITE_URL = 'https://camilo-ramirez.com';
const ACCENT = '#C75CA6';
const INK = '#111111';
const RULE = '#E5E5E5';
const MUTE = '#666666';

export const GET: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const audienceId = import.meta.env.RESEND_AUDIENCE_ID;
  const fromEmail = import.meta.env.CONTACT_FROM_EMAIL || 'forms@send.camilo-ramirez.com';
  const cronSecret = import.meta.env.CRON_SECRET;
  const adminEmail = import.meta.env.CONTACT_TO_EMAIL || 'yo@camilo-ramirez.com';

  if (!apiKey || !audienceId) {
    return new Response('Server not configured.', { status: 500 });
  }

  // Auth: Vercel Cron envía este header automáticamente cuando CRON_SECRET está en env.
  if (cronSecret) {
    const auth = request.headers.get('authorization') || '';
    if (auth !== `Bearer ${cronSecret}`) {
      return new Response('Unauthorized', { status: 401 });
    }
  }

  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

  const all = await getCollection('blog', ({ data }) => !data.draft && !data.hidden);
  const recent = all
    .filter((p) => p.data.date.getTime() >= sevenDaysAgo)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  if (recent.length === 0) {
    console.log('[cron] no posts in the last 7 days, skipping');
    return new Response(JSON.stringify({ ok: true, skipped: 'no-posts' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }

  // HTML del broadcast: lista de las piezas de la semana.
  const intro = recent.length === 1
    ? 'Esta semana publiqué una pieza. Aquí va.'
    : `Esta semana publiqué ${recent.length} piezas. Aquí van.`;

  const itemsHtml = recent.map((p) => {
    const url = `${SITE_URL}/blog/${p.id}`;
    const desc = p.data.tldr || p.data.description;
    return `
      <li style="padding:20px 0;border-top:1px solid ${RULE}">
        <a href="${url}" style="color:${INK};text-decoration:none">
          <p style="font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:${MUTE};margin:0 0 8px">${esc(p.data.categories[0])}</p>
          <p style="font-size:20px;line-height:1.25;font-weight:700;letter-spacing:-.02em;color:${INK};margin:0 0 10px">${esc(p.data.title)}</p>
          <p style="font-size:15px;line-height:1.55;color:${MUTE};margin:0 0 12px">${esc(desc)}</p>
          <span style="font-size:14px;font-weight:600;color:${ACCENT}">Leer →</span>
        </a>
      </li>
    `;
  }).join('');

  const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FAFAFA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${INK}">
  <div style="max-width:580px;margin:0 auto;padding:40px 24px">
    <div style="width:32px;height:4px;background:${ACCENT};margin-bottom:24px"></div>
    <p style="font-size:13px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${MUTE};margin:0 0 8px">Boletín semanal</p>
    <h1 style="font-size:28px;line-height:1.15;font-weight:700;letter-spacing:-.025em;margin:0 0 20px">Camilo Ramírez</h1>
    <p style="font-size:16px;line-height:1.6;margin:0 0 28px">${intro}</p>
    <ul style="list-style:none;padding:0;margin:0;border-bottom:1px solid ${RULE}">
      ${itemsHtml}
    </ul>
    <p style="font-size:15px;line-height:1.6;margin:32px 0 0">Hasta el próximo viernes,<br>Camilo</p>
    <hr style="border:0;border-top:1px solid ${RULE};margin:40px 0 20px">
    <p style="font-size:12px;color:${MUTE};line-height:1.5;margin:0">
      Camilo Ramírez · <a href="${SITE_URL}" style="color:${MUTE}">camilo-ramirez.com</a><br>
      Bogotá, Colombia · {{{RESEND_UNSUBSCRIBE_URL}}}
    </p>
  </div>
</body></html>`;

  const subject = recent[0].data.seo_title || recent[0].data.title;
  const previewText = recent[0].data.tldr || recent[0].data.description;

  // Crear el broadcast en draft via fetch a la API de Resend
  // (resend SDK aún no expone broadcasts en todas las versiones, usamos REST directo).
  let broadcastId: string | null = null;
  try {
    const res = await fetch('https://api.resend.com/broadcasts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        audience_id: audienceId,
        from: `Camilo Ramirez <${fromEmail}>`,
        subject,
        html,
        preview_text: previewText,
        reply_to: adminEmail,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error('[cron] resend broadcast create failed', data);
      return new Response(JSON.stringify({ ok: false, error: data }), {
        status: 502,
        headers: { 'content-type': 'application/json' },
      });
    }
    broadcastId = data?.id ?? null;
  } catch (err) {
    console.error('[cron] resend broadcast create exception', err);
    return new Response(JSON.stringify({ ok: false, error: 'exception' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }

  // Notificar a Camilo
  const broadcastUrl = broadcastId
    ? `https://resend.com/broadcasts/${broadcastId}`
    : 'https://resend.com/broadcasts';
  try {
    const resend = new Resend(apiKey);
    const { subject: nSub, html: nHtml, text: nText } = draftReadyEmailHtml(broadcastUrl, recent.length);
    await resend.emails.send({
      from: `Camilo Ramirez Web <${fromEmail}>`,
      to: [adminEmail],
      subject: nSub,
      html: nHtml,
      text: nText,
    });
  } catch (err) {
    console.error('[cron] admin notification failed', err);
  }

  return new Response(JSON.stringify({ ok: true, broadcastId, postCount: recent.length }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
