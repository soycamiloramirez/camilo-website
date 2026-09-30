import type { APIRoute } from 'astro';
import { signFormToken } from '../../lib/form-token';

// SSR: se renderiza en cada request (el sitio es `output: 'static'`, así que
// este endpoint DEBE optar por server-render para emitir un token fresco).
export const prerender = false;

/**
 * GET /api/form-token → { token }
 *
 * Emite un token de sesión de formulario firmado (ver src/lib/form-token.ts).
 * Los forms (contacto ES/EN, newsletter) lo piden al enviarse y lo mandan en el
 * campo oculto `form_token`. Un bot que hace POST directo al endpoint de
 * contacto/subscribe sin pasar por aquí no tendrá un token válido → rechazo.
 *
 * No-cache: cada visita necesita un token con su propio timestamp.
 */
export const GET: APIRoute = async () => {
  const token = signFormToken();
  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store, max-age=0',
    },
  });
};
