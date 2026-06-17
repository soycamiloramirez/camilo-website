/**
 * Plantillas HTML para emails del newsletter.
 *
 * Voz: usted formal, anti-hype, sin emoji, sin em-dashes en prosa, sin exclamaciones.
 * Diseño: tipografía system + paleta blanco/negro + franja magenta como acento.
 * Sobrio, no plantilla-marketing.
 */

const SITE_URL = 'https://camilo-ramirez.com';
const ACCENT = '#C75CA6';
const INK = '#111111';
const RULE = '#E5E5E5';
const MUTE = '#666666';

function shell(inner: string): string {
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Camilo Ramírez</title>
</head>
<body style="margin:0;padding:0;background:#FAFAFA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${INK};">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    ${inner}
    <hr style="border:0;border-top:1px solid ${RULE};margin:40px 0 20px">
    <p style="font-size:13px;color:${MUTE};line-height:1.5;margin:0">
      Camilo Ramírez · <a href="${SITE_URL}" style="color:${MUTE};text-decoration:underline">camilo-ramirez.com</a><br>
      Bogotá, Colombia
    </p>
  </div>
</body>
</html>`;
}

export function confirmEmailHtml(confirmUrl: string): { subject: string; html: string; text: string } {
  const subject = 'Confirme su suscripción';
  const inner = `
    <div style="width:32px;height:4px;background:${ACCENT};margin-bottom:20px"></div>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px">Hola,</p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 28px">Confirme que quiere suscribirse al boletín. Una pieza con criterio, cada viernes.</p>
    <p style="margin:0 0 28px">
      <a href="${confirmUrl}"
         style="display:inline-block;background:${INK};color:#fff;text-decoration:none;padding:14px 26px;font-size:14px;font-weight:600;letter-spacing:.02em">
        Confirmar suscripción
      </a>
    </p>
    <p style="font-size:14px;line-height:1.55;color:${MUTE};margin:0 0 6px">Si no se suscribió, ignore este correo.</p>
    <p style="font-size:13px;line-height:1.5;color:${MUTE};margin:0;word-break:break-all">El link expira en 24 horas. Si no funciona, copie y pegue en su navegador:<br><a href="${confirmUrl}" style="color:${MUTE}">${confirmUrl}</a></p>
  `;
  const text = `Hola,

Confirme su suscripción al boletín. Una pieza con criterio, cada viernes.

Confirmar: ${confirmUrl}

Si no se suscribió, ignore este correo. El link expira en 24 horas.

— Camilo`;
  return { subject, html: shell(inner), text };
}

export function welcomeEmailHtml(): { subject: string; html: string; text: string } {
  const subject = 'Está dentro';
  const inner = `
    <div style="width:32px;height:4px;background:${ACCENT};margin-bottom:20px"></div>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px">Listo. Cada viernes le llega una pieza.</p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 28px">Si lo que escribo no le sirve, abajo de cada correo está el link para salirse. Sin resentimientos.</p>
    <p style="font-size:14px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:${MUTE};margin:0 0 12px">Mientras tanto, tres puntos de partida</p>
    <ul style="list-style:none;padding:0;margin:0">
      <li style="padding:14px 0;border-top:1px solid ${RULE}">
        <a href="${SITE_URL}/temas/ia-latam" style="color:${INK};text-decoration:none;font-size:16px;font-weight:600">IA en Latinoamérica →</a><br>
        <span style="font-size:14px;color:${MUTE}">La pelea de los modelos ya no es nuestra. La que sí podemos ganar es otra.</span>
      </li>
      <li style="padding:14px 0;border-top:1px solid ${RULE}">
        <a href="${SITE_URL}/temas/gobernanza-ia" style="color:${INK};text-decoration:none;font-size:16px;font-weight:600">Gobernanza de IA →</a><br>
        <span style="font-size:14px;color:${MUTE}">Quién audita, qué oligopolio se formó, qué significa para empresas en LATAM.</span>
      </li>
      <li style="padding:14px 0;border-top:1px solid ${RULE};border-bottom:1px solid ${RULE}">
        <a href="${SITE_URL}/temas/aprende-ia" style="color:${INK};text-decoration:none;font-size:16px;font-weight:600">Aprende IA sin jerga →</a><br>
        <span style="font-size:14px;color:${MUTE}">Los conceptos clave explicados para decidir con criterio, no por hype.</span>
      </li>
    </ul>
    <p style="font-size:15px;line-height:1.6;margin:32px 0 0">Camilo</p>
  `;
  const text = `Listo. Cada viernes le llega una pieza.

Si lo que escribo no le sirve, abajo de cada correo está el link para salirse. Sin resentimientos.

Mientras tanto, tres puntos de partida:

- IA en Latinoamérica: ${SITE_URL}/temas/ia-latam
- Gobernanza de IA: ${SITE_URL}/temas/gobernanza-ia
- Aprende IA sin jerga: ${SITE_URL}/temas/aprende-ia

— Camilo`;
  return { subject, html: shell(inner), text };
}

export function draftReadyEmailHtml(broadcastUrl: string, postCount: number): { subject: string; html: string; text: string } {
  const subject = `Draft del boletín listo (${postCount} ${postCount === 1 ? 'pieza' : 'piezas'})`;
  const inner = `
    <div style="width:32px;height:4px;background:${ACCENT};margin-bottom:20px"></div>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px">Boletín de hoy armado con las ${postCount} ${postCount === 1 ? 'pieza' : 'piezas'} de la semana.</p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 28px">Revisa, ajusta lo que quieras y dispara desde Resend.</p>
    <p style="margin:0 0 28px">
      <a href="${broadcastUrl}"
         style="display:inline-block;background:${INK};color:#fff;text-decoration:none;padding:14px 26px;font-size:14px;font-weight:600;letter-spacing:.02em">
        Abrir draft en Resend
      </a>
    </p>
    <p style="font-size:14px;line-height:1.55;color:${MUTE};margin:0">Si no quieres enviar esta semana, ignora este correo. El draft queda guardado.</p>
  `;
  const text = `Boletín de hoy armado con ${postCount} ${postCount === 1 ? 'pieza' : 'piezas'} de la semana.

Revisa y dispara: ${broadcastUrl}

Si no quieres enviar esta semana, ignora.`;
  return { subject, html: shell(inner), text };
}
