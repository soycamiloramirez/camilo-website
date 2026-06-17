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
const INK_2 = '#3D3D3D';
const RULE = '#E5E5E5';
const MUTE = '#7A7A7A';
const PAPER = '#FAFAFA';
const SANS = `-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif`;
const SERIF = `Georgia,'Times New Roman',serif`;

const CATEGORY_LABELS: Record<string, string> = {
  negocios: 'Negocios',
  geopolitica: 'Geopolítica',
  latam: 'LATAM',
  aprende: 'Aprende',
};

export const GET: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const segmentId = import.meta.env.RESEND_SEGMENT_ID;
  const fromEmail = import.meta.env.CONTACT_FROM_EMAIL || 'forms@send.camilo-ramirez.com';
  const cronSecret = import.meta.env.CRON_SECRET;
  const adminEmail = import.meta.env.CONTACT_TO_EMAIL || 'yo@camilo-ramirez.com';

  if (!apiKey || !segmentId) {
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

  // Estructura editorial curada (no roundup):
  //   - Una pieza protagonista (la más reciente): categoría + título + 1 frase + leer
  //   - Si hay más, lista plana de títulos al final (sin descripciones)
  //   - Si solo hay 1 pieza esa semana, no aparece la sección "También"
  const lead = recent[0];
  const rest = recent.slice(1);
  const leadCatLabel = CATEGORY_LABELS[lead.data.categories[0]] || lead.data.categories[0];
  // Para la pieza protagonista, preferir pullquote (1 frase fuerte) > tldr > description.
  const leadAccent = (lead.data.pullquote || lead.data.tldr || lead.data.description || '').trim();

  // Fecha del envío (viernes en español)
  const dateFmt = new Intl.DateTimeFormat('es-CO', {
    weekday: 'long', day: 'numeric', month: 'long',
  }).format(new Date());

  const restHtml = rest.length === 0 ? '' : `
    <tr>
      <td style="padding:40px 40px 8px">
        <p style="font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${MUTE};margin:0 0 16px">
          También esta semana
        </p>
        ${rest.map((p) => `
          <p style="font-family:${SANS};font-size:16px;line-height:1.5;margin:0 0 10px">
            <a href="${SITE_URL}/blog/${p.id}" style="color:${INK};text-decoration:none;border-bottom:1px solid ${RULE};padding-bottom:1px">${esc(p.data.title)}</a>
          </p>
        `).join('')}
      </td>
    </tr>
  `;

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>Boletín · Camilo Ramírez</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};font-family:${SANS};color:${INK};-webkit-font-smoothing:antialiased">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${PAPER}">
    <tr>
      <td align="center" style="padding:32px 16px">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background:#fff;border:1px solid ${RULE}">

          <!-- Header -->
          <tr>
            <td style="padding:48px 40px 0">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px">
                <tr>
                  <td style="padding-right:14px;vertical-align:middle">
                    <div style="width:28px;height:4px;background:${ACCENT};line-height:0;font-size:0">&nbsp;</div>
                  </td>
                  <td style="vertical-align:middle">
                    <span style="font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${MUTE}">Boletín · Camilo Ramírez</span>
                  </td>
                </tr>
              </table>
              <p style="font-family:${SANS};font-size:13px;color:${MUTE};margin:0 0 32px;letter-spacing:.01em">${esc(dateFmt)}</p>
            </td>
          </tr>

          <!-- Cornerstone piece -->
          <tr>
            <td style="padding:0 40px">
              <p style="font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${ACCENT};margin:0 0 12px">
                ${esc(leadCatLabel)} · Tema del viernes
              </p>
              <a href="${SITE_URL}/blog/${lead.id}" style="color:${INK};text-decoration:none">
                <h1 style="font-family:${SANS};font-size:32px;line-height:1.1;letter-spacing:-.03em;font-weight:700;margin:0 0 24px;color:${INK}">
                  ${esc(lead.data.title)}
                </h1>
              </a>
              ${leadAccent ? `
                <p style="font-family:${SERIF};font-style:italic;font-size:19px;line-height:1.5;color:${INK_2};margin:0 0 28px;max-width:46ch">
                  ${esc(leadAccent)}
                </p>
              ` : ''}
              <p style="margin:0 0 8px">
                <a href="${SITE_URL}/blog/${lead.id}" style="font-family:${SANS};font-size:14px;font-weight:600;color:${INK};text-decoration:none;border-bottom:2px solid ${ACCENT};padding-bottom:2px">
                  Leer la pieza →
                </a>
              </p>
            </td>
          </tr>

          ${restHtml}

          <!-- Signoff -->
          <tr>
            <td style="padding:48px 40px 8px;border-top:1px solid ${RULE}">
              <p style="font-family:${SANS};font-size:15px;line-height:1.5;color:${INK_2};margin:0 0 4px">Hasta el próximo viernes,</p>
              <p style="font-family:${SERIF};font-style:italic;font-size:20px;line-height:1.3;color:${INK};margin:0">Camilo</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 40px 48px">
              <p style="font-family:${SANS};font-size:12px;line-height:1.6;color:${MUTE};margin:0">
                <strong style="color:${INK_2};font-weight:600">Camilo Ramírez</strong> · Bogotá, Colombia<br>
                <a href="${SITE_URL}" style="color:${MUTE};text-decoration:underline">camilo-ramirez.com</a> · {{{RESEND_UNSUBSCRIBE_URL}}}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const subject = lead.data.seo_title || lead.data.title;
  const previewText = leadAccent || lead.data.description;

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
        segment_id: segmentId,
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
