import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import {
  isHoneypotFilled,
  isTooFast,
  hitRateLimit,
  clientIp,
} from '../../lib/anti-spam';

// Server-rendered: must NOT be prerendered.
export const prerender = false;

/**
 * Endpoint del formulario de cierre de las propuestas privadas (/p/*).
 * Recibe el POST del formulario, valida y envia un correo a CONTACT_TO_EMAIL
 * (por defecto yo@camilo-ramirez.com) via Resend.
 *
 * Env vars (Vercel project settings), reutiliza las del formulario de contacto:
 *   - RESEND_API_KEY        Resend API key
 *   - CONTACT_TO_EMAIL      destino, p. ej. yo@camilo-ramirez.com
 *   - CONTACT_FROM_EMAIL    remitente verificado, p. ej. forms@send.camilo-ramirez.com
 *
 * Spam: campo honeypot `website` debe ir vacio.
 */

type PropuestaPayload = {
  propuesta?: string; // id/nombre de la propuesta
  avanzar?: string | boolean; // checkbox
  nombre?: string;
  email?: string;
  mensaje?: string;
  website?: string; // honeypot
  company_url?: string; // honeypot #2
  form_elapsed?: string; // ms desde carga (cliente)
  lang?: 'es' | 'en';
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const toEmail = import.meta.env.CONTACT_TO_EMAIL || 'yo@camilo-ramirez.com';
  const fromEmail = import.meta.env.CONTACT_FROM_EMAIL || 'forms@send.camilo-ramirez.com';

  if (!apiKey) {
    return new Response(JSON.stringify({ ok: false, error: 'Server not configured.' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }

  let data: PropuestaPayload = {};
  try {
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      data = await request.json();
    } else {
      const form = await request.formData();
      data = Object.fromEntries(form.entries()) as PropuestaPayload;
    }
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid payload.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  // Respuesta "silenciosa": simula éxito para que el bot no reintente.
  const silentOk = () =>
    new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });

  if (isHoneypotFilled(data as Record<string, unknown>)) {
    console.warn('[propuesta] blocked: honeypot');
    return silentOk();
  }
  if (isTooFast(data as Record<string, unknown>)) {
    console.warn('[propuesta] blocked: too fast');
    return silentOk();
  }
  if (hitRateLimit(clientIp(request))) {
    console.warn('[propuesta] blocked: rate limit');
    return silentOk();
  }
  // Nota: Turnstile NO se exige aquí. La landing /p/* tiene dos formularios
  // (ES/EN) con uno oculto al cargar; un widget dentro de un contenedor oculto
  // puede no emitir token y bloquearía a un cliente real. Es una página privada,
  // noindex y con URL hasheada (exposición a bots mínima), así que las capas
  // 1 (honeypots), 2 (tiempo), 4 (heurística) y 5 (rate limit) son suficientes.

  const propuesta = (data.propuesta ?? 'Propuesta').toString().trim();
  const nombre = (data.nombre ?? '').toString().trim();
  const email = (data.email ?? '').toString().trim();
  const mensaje = (data.mensaje ?? '').toString().trim();
  const lang = data.lang === 'en' ? 'en' : 'es';
  const avanzarRaw = data.avanzar;
  const avanzar =
    avanzarRaw === true ||
    avanzarRaw === 'on' ||
    avanzarRaw === 'true' ||
    avanzarRaw === '1' ||
    avanzarRaw === 'yes';

  // Minimal validation
  if (!nombre || nombre.length < 2) {
    return new Response(JSON.stringify({ ok: false, error: 'Falta el nombre.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ ok: false, error: 'Email inválido.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  // NOTA: aquí NO se aplica la heurística de contenido (links / "mailing list").
  // Un cliente de propuesta responde legítimamente con su web, Calendly o
  // LinkedIn, y containsLink descartaría su respuesta en silencio (falla
  // silenciosa en un deal real). El remitente ya está validado por nombre+email+
  // tiempo+2 honeypots+rate limit, y la URL es privada/hasheada/noindex.

  const avanzarLabel = avanzar ? 'Sí, quiere avanzar' : 'No marcó avanzar';
  const subject = `[Propuesta] ${nombre} · ${propuesta}`;

  const textBody = [
    `Respuesta a una propuesta privada${lang === 'en' ? ' (EN)' : ''}`,
    ``,
    `Propuesta: ${propuesta}`,
    `Avanzar: ${avanzarLabel}`,
    `Nombre: ${nombre}`,
    `Email: ${email}`,
    ``,
    `Mensaje:`,
    mensaje || '—',
  ].join('\n');

  const htmlBody = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;color:#111">
      <p style="color:#666;font-size:13px;margin:0 0 16px">Respuesta a una propuesta privada${lang === 'en' ? ' (EN)' : ''}</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px;line-height:1.5">
        <tr><td style="padding:6px 0;color:#666;width:110px">Propuesta</td><td style="padding:6px 0">${escapeHtml(propuesta)}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Avanzar</td><td style="padding:6px 0"><strong>${escapeHtml(avanzarLabel)}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#666">Nombre</td><td style="padding:6px 0"><strong>${escapeHtml(nombre)}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      </table>
      <p style="margin:20px 0 6px;color:#666;font-size:13px">Mensaje</p>
      <div style="background:#f5f5f5;padding:14px 16px;border-left:3px solid #ec4899;white-space:pre-wrap;font-size:14px;line-height:1.55">${escapeHtml(mensaje) || '—'}</div>
    </div>
  `;

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: `Camilo Ramirez Web <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error('[propuesta] Resend error', error);
      return new Response(JSON.stringify({ ok: false, error: 'No se pudo enviar. Intente de nuevo.' }), {
        status: 502,
        headers: { 'content-type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    console.error('[propuesta] send failed', err);
    return new Response(JSON.stringify({ ok: false, error: 'Error inesperado.' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
};
