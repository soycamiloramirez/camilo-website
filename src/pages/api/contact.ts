import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Server-rendered: must NOT be prerendered.
export const prerender = false;

/**
 * Contact form endpoint. Receives the form POST from /#contacto (ES) and
 * /en#contacto (EN), validates, and sends an email to SITE.email via Resend.
 *
 * Env vars required (set in Vercel project settings):
 *   - RESEND_API_KEY        — Resend API key (from resend.com/api-keys)
 *   - CONTACT_TO_EMAIL      — destination inbox, e.g. yo@camilo-ramirez.com
 *   - CONTACT_FROM_EMAIL    — verified sender, e.g. forms@camilo-ramirez.com
 *
 * Spam protection: honeypot field `website` must be empty.
 */

type ContactPayload = {
  nombre?: string;
  empresa?: string;
  email?: string;
  necesita?: string;
  contexto?: string;
  website?: string; // honeypot
  lang?: 'es' | 'en';
};

const NEED_LABELS: Record<string, string> = {
  advisory: 'Advisory',
  speaking: 'Speaking',
  otro: 'Otro',
  other: 'Other',
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

  let data: ContactPayload = {};
  try {
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      data = await request.json();
    } else {
      const form = await request.formData();
      data = Object.fromEntries(form.entries()) as ContactPayload;
    }
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid payload.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  // Honeypot — bots fill every input. Real users leave this empty.
  if (data.website && data.website.trim() !== '') {
    // Pretend success so bots don't retry.
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }

  const nombre = (data.nombre ?? '').trim();
  const empresa = (data.empresa ?? '').trim();
  const email = (data.email ?? '').trim();
  const necesita = (data.necesita ?? 'otro').trim().toLowerCase();
  const contexto = (data.contexto ?? '').trim();
  const lang = data.lang === 'en' ? 'en' : 'es';

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
  if (!contexto || contexto.length < 10) {
    return new Response(JSON.stringify({ ok: false, error: 'Cuéntame algo más de contexto.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const needLabel = NEED_LABELS[necesita] ?? necesita;
  const subject = `[Web · ${needLabel}] ${nombre}${empresa ? ` (${empresa})` : ''}`;

  const textBody = [
    `Nuevo mensaje desde camilo-ramirez.com${lang === 'en' ? ' (EN)' : ''}`,
    ``,
    `Nombre: ${nombre}`,
    `Empresa: ${empresa || '—'}`,
    `Email: ${email}`,
    `Necesita: ${needLabel}`,
    ``,
    `Contexto:`,
    contexto,
  ].join('\n');

  const htmlBody = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;color:#111">
      <p style="color:#666;font-size:13px;margin:0 0 16px">Nuevo mensaje desde camilo-ramirez.com${lang === 'en' ? ' (EN)' : ''}</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px;line-height:1.5">
        <tr><td style="padding:6px 0;color:#666;width:110px">Nombre</td><td style="padding:6px 0"><strong>${escapeHtml(nombre)}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#666">Empresa</td><td style="padding:6px 0">${escapeHtml(empresa) || '—'}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#666">Necesita</td><td style="padding:6px 0">${escapeHtml(needLabel)}</td></tr>
      </table>
      <p style="margin:20px 0 6px;color:#666;font-size:13px">Contexto</p>
      <div style="background:#f5f5f5;padding:14px 16px;border-left:3px solid #ec4899;white-space:pre-wrap;font-size:14px;line-height:1.55">${escapeHtml(contexto)}</div>
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
      console.error('[contact] Resend error', error);
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
    console.error('[contact] send failed', err);
    return new Response(JSON.stringify({ ok: false, error: 'Error inesperado.' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
};
