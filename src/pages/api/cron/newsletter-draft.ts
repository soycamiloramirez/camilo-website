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
 * Estructura del broadcast (rediseñada):
 *  - Eyebrow + fecha
 *  - Saludo personalizado con merge tag de Resend
 *  - Lente: 1-2 frases editoriales generadas por Claude (única función AI)
 *  - Bloques por pieza: eyebrow categoría + título + pullquote + leer →
 *  - Signoff
 *  - Share CTA
 *  - Footer con unsubscribe
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

// From specifico del boletin (no usar el de 'forms@' que es para el form de contacto).
const NEWSLETTER_FROM = 'Camilo Ramírez <boletin@send.camilo-ramirez.com>';

const CATEGORY_LABELS: Record<string, string> = {
  negocios: 'Negocios y estrategia',
  geopolitica: 'Geopolítica y mercado',
  latam: 'LATAM',
  aprende: 'Aprende',
};

// Verbos/frases prohibidos en la lente (filtros post-Claude).
const BANNED_PHRASES = [
  'revelará', 'marcará', 'definirá', 'en retrospectiva', 'punto de quiebre',
  'punto de no retorno', 'momento histórico', 'sin precedentes', 'histórico',
  'monumental', 'cambiará para siempre', 'nadie mencionaba', 'pocos vieron venir',
];

export const GET: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const segmentId = import.meta.env.RESEND_SEGMENT_ID;
  const cronSecret = import.meta.env.CRON_SECRET;
  const adminEmail = import.meta.env.CONTACT_TO_EMAIL || 'yo@camilo-ramirez.com';
  const anthropicKey = import.meta.env.ANTHROPIC_API_KEY;
  const adminFromEmail = import.meta.env.CONTACT_FROM_EMAIL || 'forms@send.camilo-ramirez.com';

  if (!apiKey || !segmentId) {
    return new Response('Server not configured.', { status: 500 });
  }
  if (!anthropicKey) {
    return new Response('Server not configured (ANTHROPIC_API_KEY missing).', { status: 500 });
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

  // Fecha del envío con formato editorial: "Jueves 18 de junio" (capital, sin coma).
  const dateRaw = new Intl.DateTimeFormat('es-CO', {
    weekday: 'long', day: 'numeric', month: 'long',
  }).format(new Date());
  const dateFmt = capitalizeFirst(dateRaw.replace(/,\s*/, ' '));

  // Material para Claude: estructurado, sin ambigüedad.
  const material = recent.map((p, i) => ({
    index: i + 1,
    title: p.data.title,
    category: CATEGORY_LABELS[p.data.categories[0]] || p.data.categories[0],
    pullquote: p.data.pullquote || null,
    tldr: p.data.tldr || null,
    description: p.data.description,
  }));

  // Claude: SOLO genera la lente (1-2 frases) y el subject. Cero generación de
  // cuerpo por pieza (eso viene 100% del frontmatter del autor).
  const systemPrompt = `Eres editor del boletín semanal de Camilo Ramírez (IA, negocios, LATAM para C-level).

Tu único trabajo: dadas las piezas que publicó esta semana, devolver un JSON con dos campos:

- "lente": 1 a 2 frases (40 a 80 palabras) que conecten las piezas con un hilo común. Es el intro editorial del boletín. Empieza directo, sin saludo, sin "Esta semana publiqué".
- "subject": subject del email (40 a 55 caracteres). Debe sentirse a newsletter curado, no a titular de artículo.

Reglas absolutas. Si rompes alguna, descalificas:
1. Usar SOLO ideas presentes en el material (títulos, pullquotes, tldrs). NUNCA inventar contexto, NUNCA agregar tesis, NUNCA conclusiones tuyas.
2. Usted formal de Colombia. NUNCA tú. NUNCA voseo argentino.
3. CERO em-dashes (—). Usar punto, coma o dos puntos.
4. CERO emoji. CERO signos de admiración. CERO mayúsculas dramáticas.
5. NUNCA verbos predictivos: "revelará", "marcará", "definirá", "cambiará para siempre".
6. NUNCA frases editorializantes: "en retrospectiva", "punto de quiebre", "momento histórico", "nadie mencionaba".
7. NUNCA calificativos propios: "histórico", "sin precedentes", "monumental".
8. Tono: editorial, sereno, anti-hype. Directo. Como alguien procesando en voz alta lo que pasó esta semana.

Voz de referencia (escribe así, no copies — solo absorbe la cadencia):
"Suena a una noticia más de centros de datos. No lo es. Es el intento más serio de partir en dos la infraestructura de IA del planeta."
"El candado real no está en el modelo, está en la infraestructura."
"El que se case con un solo bloque hereda sus reglas."

Devuelve SOLO el JSON. Sin markdown, sin code fences, sin explicaciones.`;

  const userPrompt = `Material de la semana (${recent.length} pieza${recent.length === 1 ? '' : 's'}):

${JSON.stringify(material, null, 2)}

Devuelve el JSON con "lente" y "subject".`;

  let lente = '';
  let subject = '';
  try {
    const anthropic = new Anthropic({ apiKey: anthropicKey });
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });
    const textBlock = response.content.find((b) => b.type === 'text');
    const rawText = textBlock && 'text' in textBlock ? textBlock.text.trim() : '';
    // Limpiar code fences si Claude los agrega a pesar de la regla.
    const cleaned = rawText.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
    const parsed = JSON.parse(cleaned);
    lente = String(parsed.lente || '').trim();
    subject = String(parsed.subject || '').trim();

    // Guardrails post-Claude
    lente = lente.replace(/—/g, ',').replace(/–/g, ',').replace(/[¡!]/g, '');
    subject = subject.replace(/—/g, ',').replace(/–/g, ',').replace(/[¡!]/g, '');

    // Detectar frases prohibidas en la lente. Si las contiene, fallback.
    const lower = lente.toLowerCase();
    if (BANNED_PHRASES.some((p) => lower.includes(p.toLowerCase()))) {
      console.warn('[cron] Claude usó frase prohibida, usando fallback');
      throw new Error('banned phrase');
    }

    if (!lente || !subject) throw new Error('empty fields');
  } catch (err) {
    console.error('[cron] Claude generation failed, using fallback', err);
    lente = recent.length === 1
      ? 'Esta semana, una pieza para su bandeja.'
      : `Esta semana, ${recent.length} piezas para su bandeja.`;
    subject = recent[0].data.seo_title || recent[0].data.title;
  }

  // Truncar subject a 60 chars por seguridad
  if (subject.length > 60) subject = subject.slice(0, 57).trim() + '...';

  // Render de cada pieza como bloque independiente (todo material del autor).
  const blocksHtml = recent.map((p, i) => {
    const url = `${SITE_URL}/blog/${p.id}`;
    const cat = CATEGORY_LABELS[p.data.categories[0]] || p.data.categories[0];
    const accent = (p.data.pullquote || p.data.tldr || '').trim();
    const isLast = i === recent.length - 1;
    return `
      <tr>
        <td style="padding:32px 40px ${isLast ? '0' : '32px'};border-top:1px solid ${RULE}">
          <p style="font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${ACCENT};margin:0 0 12px">${esc(cat)}</p>
          <a href="${url}" style="color:${INK};text-decoration:none;display:block">
            <h2 style="font-family:${SANS};font-size:22px;line-height:1.2;letter-spacing:-.02em;font-weight:700;margin:0 0 16px;color:${INK}">${esc(p.data.title)}</h2>
          </a>
          ${accent ? `
            <p style="font-family:${SERIF};font-style:italic;font-size:17px;line-height:1.5;color:${INK_2};margin:0 0 16px;max-width:48ch">"${esc(accent)}"</p>
          ` : ''}
          <p style="margin:0">
            <a href="${url}" style="font-family:${SANS};font-size:13px;font-weight:600;color:${INK};text-decoration:none;border-bottom:2px solid ${ACCENT};padding-bottom:2px">Leer la pieza →</a>
          </p>
        </td>
      </tr>
    `;
  }).join('');

  // Plain text version del cuerpo entero
  const blocksText = recent.map((p) => {
    const cat = CATEGORY_LABELS[p.data.categories[0]] || p.data.categories[0];
    const accent = (p.data.pullquote || p.data.tldr || '').trim();
    return `${cat.toUpperCase()}\n${p.data.title}\n${accent ? `"${accent}"\n` : ''}Leer: ${SITE_URL}/blog/${p.id}`;
  }).join('\n\n');

  // Share mailto
  const lead = recent[0];
  const shareSubject = encodeURIComponent('Le comparto este boletín que vale la pena');
  const shareBody = encodeURIComponent(
    `Le mando este boletín semanal de Camilo Ramírez sobre IA, negocios y LATAM. Una pieza editorial, los viernes. Sin ruido.\n\nSi le interesa, puede suscribirse acá: ${SITE_URL}/newsletter\n\nLa edición de esta semana abre con: ${lead.data.title}`
  );
  const shareUrl = `mailto:?subject=${shareSubject}&body=${shareBody}`;

  // Merge tag de Resend para personalizar el saludo. Si no hay first_name, fallback.
  // Resend usa la sintaxis {{contact.first_name|fallback}} en HTML de broadcasts.
  const greetingHtml = `Hola {{contact.first_name|}},`;

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

          <!-- Header: franja + label + fecha -->
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
              <p style="font-family:${SANS};font-size:13px;color:${MUTE};margin:0 0 40px;letter-spacing:.01em">${esc(dateFmt)}</p>
            </td>
          </tr>

          <!-- Greeting + Lente -->
          <tr>
            <td style="padding:0 40px 8px">
              <p style="font-family:${SANS};font-size:17px;line-height:1.55;color:${INK};margin:0 0 24px">${greetingHtml}</p>
              <p style="font-family:${SANS};font-size:17px;line-height:1.65;color:${INK};margin:0 0 12px;max-width:50ch">${esc(lente)}</p>
            </td>
          </tr>

          <!-- Bloques por pieza -->
          ${blocksHtml}

          <!-- Signoff -->
          <tr>
            <td style="padding:48px 40px 0">
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

  // Versión plain text completa
  const text = `BOLETÍN · CAMILO RAMÍREZ
${dateFmt}

Hola {{contact.first_name|}},

${lente}

---

${blocksText}

---

Hasta el próximo viernes,
Camilo

Si le sirvió, compártalo con un colega: ${shareUrl}

Camilo Ramírez · Bogotá, Colombia
${SITE_URL}
Para darse de baja: {{{RESEND_UNSUBSCRIBE_URL}}}`;

  // Preview text deliberado: la lente, no un pullquote suelto
  const previewText = lente.slice(0, 130);

  // Crear el broadcast en draft
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
        from: NEWSLETTER_FROM,
        subject,
        html,
        text,
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
      from: `Camilo Ramirez Web <${adminFromEmail}>`,
      to: [adminEmail],
      subject: nSub,
      html: nHtml,
      text: nText,
    });
  } catch (err) {
    console.error('[cron] admin notification failed', err);
  }

  return new Response(JSON.stringify({ ok: true, broadcastId, postCount: recent.length, subject, lente }), {
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

function capitalizeFirst(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
