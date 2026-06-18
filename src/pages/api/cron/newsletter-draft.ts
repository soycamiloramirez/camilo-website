import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { Resend } from 'resend';
import Anthropic from '@anthropic-ai/sdk';
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

  // AI-stylist: Claude redacta un párrafo editorial usando solo las palabras de Camilo
  // (pullquotes + tldrs + títulos) como materia prima. Reglas estrictas de voz.
  const anthropicKey = import.meta.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    return new Response('Server not configured (ANTHROPIC_API_KEY missing).', { status: 500 });
  }

  const lead = recent[0];
  const leadCatLabel = CATEGORY_LABELS[lead.data.categories[0]] || lead.data.categories[0];

  // Fecha del envío (viernes en español)
  const dateFmt = new Intl.DateTimeFormat('es-CO', {
    weekday: 'long', day: 'numeric', month: 'long',
  }).format(new Date());

  // Material para Claude: estructurado, sin ambigüedad
  const material = recent.map((p, i) => ({
    index: i + 1,
    title: p.data.title,
    url: `${SITE_URL}/blog/${p.id}`,
    category: CATEGORY_LABELS[p.data.categories[0]] || p.data.categories[0],
    pullquote: p.data.pullquote || null,
    tldr: p.data.tldr || null,
    description: p.data.description,
  }));

  const systemPrompt = `Eres editor del boletín semanal de Camilo Ramírez. Tu único trabajo: tomar las piezas que publicó esta semana y armar UN párrafo editorial que las hile, USANDO SOLO sus propias palabras (pullquotes, tldrs, títulos, descripciones).

Reglas absolutas. Si rompes alguna, descalificas:
1. Usar SOLO ideas presentes en el material dado. Cero ideas nuevas, cero adjetivos propios, cero conclusiones agregadas.
2. Usted formal de Colombia. NUNCA tú. NUNCA vosotros. NUNCA voseo argentino.
3. CERO em-dashes (—). Usar punto, coma o dos puntos.
4. CERO emoji. CERO signos de admiración. CERO mayúsculas dramáticas.
5. 120 a 180 palabras. Ni más ni menos.
6. UN solo párrafo. No usar listas, viñetas, headers.
7. Linkear CADA pieza inline una sola vez. El anchor text debe ser una frase natural de la prosa que apunte al concepto, NO el título completo.
8. Tono: editorial, sereno, anti-hype. Como alguien procesando en voz alta lo que pasó esa semana.
9. Empezar con una observación que conecte las piezas, NO con "Esta semana publiqué".
10. NO incluir saludo de apertura ("Hola") ni cierre ("Hasta el viernes"). El scaffolding del email los aporta.
11. HTML simple: usa solo <a href="..."> para links y <em> si necesitas énfasis sutil. Nada más.

Devuelve SOLO el HTML del párrafo, sin marcadores de código, sin explicaciones.`;

  const userPrompt = `Material de la semana (${recent.length} pieza${recent.length === 1 ? '' : 's'}):

${JSON.stringify(material, null, 2)}

Escriba el párrafo editorial.`;

  let editorialHtml: string;
  try {
    const anthropic = new Anthropic({ apiKey: anthropicKey });
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 800,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });
    const textBlock = response.content.find((b) => b.type === 'text');
    editorialHtml = textBlock && 'text' in textBlock ? textBlock.text.trim() : '';
    if (!editorialHtml) throw new Error('empty response');
    // Guardrail final: remover em-dashes que pudieran haber escapado
    editorialHtml = editorialHtml.replace(/—/g, ',').replace(/–/g, ',');
  } catch (err) {
    console.error('[cron] Claude generation failed', err);
    // Fallback: párrafo armado mecánicamente con pullquotes
    const fragments = recent.map((p) => {
      const accent = p.data.pullquote || p.data.tldr || p.data.description;
      return `Sobre <a href="${SITE_URL}/blog/${p.id}" style="color:${INK};font-weight:600">${esc(p.data.title)}</a>: <em>"${esc(accent)}"</em>`;
    });
    editorialHtml = `<p>Esta semana, ${recent.length === 1 ? 'una pieza' : `${recent.length} piezas`}. ${fragments.join('. ')}.</p>`;
  }

  // Share mailto: pre-fill subject + body que invita al colega a suscribirse
  const shareSubject = encodeURIComponent('Le comparto este boletín que vale la pena');
  const shareBody = encodeURIComponent(
    `Le mando este boletín semanal de Camilo Ramírez sobre IA, negocios y LATAM. Una sola pieza, los viernes. Sin ruido.\n\nSi le interesa, puede suscribirse acá: ${SITE_URL}/newsletter\n\nLa pieza de esta semana: ${SITE_URL}/blog/${lead.id}`
  );
  const shareUrl = `mailto:?subject=${shareSubject}&body=${shareBody}`;

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
              <p style="font-family:${SANS};font-size:13px;color:${MUTE};margin:0 0 36px;letter-spacing:.01em">${esc(dateFmt)}</p>
            </td>
          </tr>

          <!-- Editorial paragraph -->
          <tr>
            <td style="padding:0 40px">
              <div style="font-family:${SANS};font-size:17px;line-height:1.65;color:${INK};max-width:50ch">
                ${editorialHtml}
              </div>
            </td>
          </tr>

          <!-- Signoff -->
          <tr>
            <td style="padding:32px 40px 8px">
              <p style="font-family:${SANS};font-size:15px;line-height:1.5;color:${INK_2};margin:0 0 4px">Hasta el próximo viernes,</p>
              <p style="font-family:${SERIF};font-style:italic;font-size:20px;line-height:1.3;color:${INK};margin:0">Camilo</p>
            </td>
          </tr>

          <!-- Share CTA -->
          <tr>
            <td style="padding:32px 40px 0">
              <div style="padding:20px;background:${PAPER};border-left:3px solid ${ACCENT}">
                <p style="font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${MUTE};margin:0 0 8px">Si le sirvió</p>
                <p style="font-family:${SANS};font-size:15px;line-height:1.55;color:${INK_2};margin:0">
                  <a href="${shareUrl}" style="color:${INK};font-weight:600;text-decoration:none;border-bottom:2px solid ${ACCENT};padding-bottom:1px">Compártalo con un colega →</a>
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:36px 40px 48px">
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
  const previewText = lead.data.pullquote || lead.data.tldr || lead.data.description;

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
