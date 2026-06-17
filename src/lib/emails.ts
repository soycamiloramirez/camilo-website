/**
 * Plantillas HTML para emails del newsletter.
 *
 * Voz: usted formal, anti-hype, sin emoji, sin em-dashes en prosa, sin exclamaciones.
 * Diseño: traslada el DS del sitio al email. Franja magenta, jerarquía tipográfica
 * con contraste fino/bold, signature serif, respiración generosa.
 *
 * Email-safe HTML:
 *  - Inline styles (Gmail strips <style>).
 *  - Tablas para layout crítico (Outlook).
 *  - Stack tipográfico system (Helvetica Neue donde exista, fallback Arial).
 *  - Georgia italic para signature (universal).
 *  - Cero web fonts (no se cargan en clientes).
 */

const SITE_URL = 'https://camilo-ramirez.com';
const ACCENT = '#C75CA6';
const INK = '#111111';
const INK_2 = '#3D3D3D';
const MUTE = '#7A7A7A';
const RULE = '#E5E5E5';
const PAPER = '#FAFAFA';
const SANS = `-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif`;
const SERIF = `Georgia,'Times New Roman',serif`;

function eyebrow(label: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px">
      <tr>
        <td style="padding-right:14px;vertical-align:middle">
          <div style="width:28px;height:4px;background:${ACCENT};line-height:0;font-size:0">&nbsp;</div>
        </td>
        <td style="vertical-align:middle">
          <span style="font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${MUTE}">${label}</span>
        </td>
      </tr>
    </table>
  `;
}

function signature(): string {
  return `
    <p style="font-family:${SERIF};font-style:italic;font-size:18px;line-height:1.4;color:${INK};margin:36px 0 0">Camilo</p>
  `;
}

function footer(): string {
  return `
    <tr>
      <td style="padding:32px 40px 48px;border-top:1px solid ${RULE}">
        <p style="font-family:${SANS};font-size:12px;line-height:1.6;color:${MUTE};margin:0">
          <strong style="color:${INK_2};font-weight:600">Camilo Ramírez</strong> · Bogotá, Colombia<br>
          <a href="${SITE_URL}" style="color:${MUTE};text-decoration:underline">camilo-ramirez.com</a>
        </p>
      </td>
    </tr>
  `;
}

function shell(inner: string): string {
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Camilo Ramírez</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};font-family:${SANS};color:${INK};-webkit-font-smoothing:antialiased">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${PAPER}">
    <tr>
      <td align="center" style="padding:32px 16px">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background:#fff;border:1px solid ${RULE}">
          ${inner}
          ${footer()}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/*  Email 1: confirmación DOI                                          */
/* ------------------------------------------------------------------ */

export function confirmEmailHtml(confirmUrl: string): { subject: string; html: string; text: string } {
  const subject = 'Gracias por suscribirse · Camilo Ramírez';

  const inner = `
    <tr>
      <td style="padding:56px 40px 12px">
        ${eyebrow('Boletín · Camilo Ramírez')}

        <h1 style="font-family:${SANS};font-size:44px;line-height:1.0;letter-spacing:-.04em;color:${INK};margin:0 0 32px;font-weight:700">
          <span style="font-weight:300;color:${MUTE}">Gracias por</span><br>
          suscribirse.
        </h1>

        <p style="font-family:${SANS};font-size:17px;line-height:1.6;color:${INK_2};margin:0 0 20px;max-width:46ch">
          Cada viernes le voy a mandar una pieza editorial. Una sola, destilada de la semana en IA, negocios y LATAM.
        </p>

        <p style="font-family:${SANS};font-size:16px;line-height:1.6;color:${INK_2};margin:0 0 40px;max-width:46ch">
          La idea es que llegue cuando tenga tiempo de leerla, no en medio del ruido del día.
        </p>

        <p style="font-family:${SANS};font-size:14px;line-height:1.55;color:${MUTE};margin:0 0 16px">
          Para activar la suscripción, confirme que este correo es suyo:
        </p>

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 36px">
          <tr>
            <td style="background:${INK}">
              <a href="${confirmUrl}"
                 style="display:inline-block;padding:16px 30px;font-family:${SANS};font-size:14px;font-weight:600;letter-spacing:.02em;color:#fff;text-decoration:none">
                Confirmar y entrar →
              </a>
            </td>
          </tr>
        </table>

        <p style="font-family:${SANS};font-size:13px;line-height:1.6;color:${MUTE};margin:0 0 8px">
          Si no fue usted quien se suscribió, ignore este correo. El link vale por 24 horas.
        </p>
        <p style="font-family:${SANS};font-size:12px;line-height:1.55;color:${MUTE};margin:0;word-break:break-all">
          ¿No funciona el botón? Copie y pegue:<br>
          <a href="${confirmUrl}" style="color:${MUTE}">${confirmUrl}</a>
        </p>
      </td>
    </tr>
    <tr><td style="padding:0 40px 48px">${signature()}</td></tr>
  `;

  const text = `Boletín · Camilo Ramírez

Gracias por suscribirse.

Cada viernes le voy a mandar una pieza editorial. Una sola, destilada de la semana en IA, negocios y LATAM.

La idea es que llegue cuando tenga tiempo de leerla, no en medio del ruido del día.

Para activar la suscripción, confirme que este correo es suyo:
${confirmUrl}

Si no fue usted quien se suscribió, ignore este correo. El link vale por 24 horas.

Camilo`;

  return { subject, html: shell(inner), text };
}

/* ------------------------------------------------------------------ */
/*  Email 2: welcome (después de confirmar)                            */
/* ------------------------------------------------------------------ */

export function welcomeEmailHtml(): { subject: string; html: string; text: string } {
  const subject = 'Está dentro';

  const pillarRow = (href: string, kicker: string, title: string, desc: string) => `
    <tr>
      <td style="padding:24px 0;border-top:1px solid ${RULE}">
        <p style="font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${ACCENT};margin:0 0 8px">${kicker}</p>
        <a href="${href}" style="font-family:${SANS};font-size:20px;font-weight:700;letter-spacing:-.02em;line-height:1.2;color:${INK};text-decoration:none;display:block;margin:0 0 8px">${title}</a>
        <p style="font-family:${SANS};font-size:15px;line-height:1.55;color:${INK_2};margin:0 0 10px;max-width:48ch">${desc}</p>
        <a href="${href}" style="font-family:${SANS};font-size:13px;font-weight:600;color:${INK};text-decoration:none;border-bottom:1px solid ${INK};padding-bottom:1px">Leer →</a>
      </td>
    </tr>
  `;

  const inner = `
    <tr>
      <td style="padding:56px 40px 12px">
        ${eyebrow('Bienvenido · Boletín')}

        <h1 style="font-family:${SANS};font-size:48px;line-height:1.0;letter-spacing:-.04em;color:${INK};margin:0 0 28px;font-weight:700">
          <span style="font-weight:300;color:${MUTE}">Está</span> dentro.
        </h1>

        <p style="font-family:${SANS};font-size:17px;line-height:1.6;color:${INK_2};margin:0 0 16px;max-width:46ch">
          Cada viernes le llega una pieza. Una sola. Destilada de la semana en IA, negocios y LATAM.
        </p>

        <p style="font-family:${SANS};font-size:15px;line-height:1.6;color:${MUTE};margin:0 0 44px;max-width:46ch">
          Si lo que escribo no le sirve, abajo de cada correo está el link para salirse. Sin resentimientos.
        </p>

        <p style="font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${MUTE};margin:0 0 4px">
          Mientras tanto
        </p>
        <p style="font-family:${SERIF};font-style:italic;font-size:22px;line-height:1.3;color:${INK};margin:0 0 24px">
          Tres puntos de partida.
        </p>

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-bottom:1px solid ${RULE}">
          ${pillarRow(
            `${SITE_URL}/temas/ia-latam`,
            'LATAM',
            'IA en Latinoamérica',
            'La pelea de los modelos ya no es nuestra. La que sí podemos ganar es la de aplicar esta tecnología a un terreno desordenado que solo nosotros conocemos.'
          )}
          ${pillarRow(
            `${SITE_URL}/temas/gobernanza-ia`,
            'Geopolítica',
            'Gobernanza de IA',
            'Quién audita los modelos, qué oligopolio se formó, y qué significa construir sobre tecnología que se decide en otro continente.'
          )}
          ${pillarRow(
            `${SITE_URL}/temas/aprende-ia`,
            'Diccionario',
            'Aprende IA sin jerga',
            'AGI, ventana de contexto, agentes, alucinaciones, tokens. Los conceptos clave para decidir con criterio y no por hype.'
          )}
        </table>
      </td>
    </tr>
    <tr><td style="padding:8px 40px 48px">${signature()}</td></tr>
  `;

  const text = `Bienvenido · Boletín

Está dentro.

Cada viernes le llega una pieza. Una sola. Destilada de la semana en IA, negocios y LATAM.

Si lo que escribo no le sirve, abajo de cada correo está el link para salirse. Sin resentimientos.

Mientras tanto, tres puntos de partida:

LATAM
IA en Latinoamérica: ${SITE_URL}/temas/ia-latam

Geopolítica
Gobernanza de IA: ${SITE_URL}/temas/gobernanza-ia

Diccionario
Aprende IA sin jerga: ${SITE_URL}/temas/aprende-ia

Camilo`;

  return { subject, html: shell(inner), text };
}

/* ------------------------------------------------------------------ */
/*  Email 3: notificación a Camilo que el draft semanal está listo    */
/* ------------------------------------------------------------------ */

export function draftReadyEmailHtml(broadcastUrl: string, postCount: number): { subject: string; html: string; text: string } {
  const subject = `Draft del boletín listo (${postCount} ${postCount === 1 ? 'pieza' : 'piezas'})`;

  const inner = `
    <tr>
      <td style="padding:48px 40px 12px">
        ${eyebrow('Operación · Newsletter')}

        <h1 style="font-family:${SANS};font-size:32px;line-height:1.1;letter-spacing:-.03em;color:${INK};margin:0 0 24px;font-weight:700">
          <span style="font-weight:300;color:${MUTE}">Draft listo con</span><br>
          ${postCount} ${postCount === 1 ? 'pieza' : 'piezas'} de la semana.
        </h1>

        <p style="font-family:${SANS};font-size:15px;line-height:1.6;color:${INK_2};margin:0 0 32px;max-width:46ch">
          Revisa, ajusta lo que quieras y dispara desde Resend. Si no quieres enviar esta semana, ignora. El draft queda guardado.
        </p>

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px">
          <tr>
            <td style="background:${INK}">
              <a href="${broadcastUrl}" style="display:inline-block;padding:14px 28px;font-family:${SANS};font-size:14px;font-weight:600;letter-spacing:.02em;color:#fff;text-decoration:none">
                Abrir draft en Resend →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr><td style="padding:8px 40px 40px"></td></tr>
  `;

  const text = `Operación · Newsletter

Draft listo con ${postCount} ${postCount === 1 ? 'pieza' : 'piezas'} de la semana.

Revisa y dispara: ${broadcastUrl}

Si no quieres enviar esta semana, ignora.`;

  return { subject, html: shell(inner), text };
}
