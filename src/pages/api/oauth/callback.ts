import type { APIRoute } from 'astro';

export const prerender = false;

/**
 * Step 2 of the GitHub OAuth flow.
 * GitHub redirects here with ?code=... after the user consents.
 * We exchange the code for an access token and post it back to the
 * Sveltia/Decap CMS window using window.opener.postMessage.
 */
export const GET: APIRoute = async ({ url, request }) => {
  const clientId = import.meta.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = import.meta.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new Response('Missing GITHUB_OAUTH_CLIENT_ID or GITHUB_OAUTH_CLIENT_SECRET', { status: 500 });
  }

  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  if (!code) return html(renderError('Missing code from GitHub.'));

  // Verify state cookie.
  const cookieHeader = request.headers.get('cookie') ?? '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map((c) => {
      const [k, ...v] = c.trim().split('=');
      return [k, v.join('=')];
    }),
  );
  if (!state || cookies.cms_oauth_state !== state) {
    return html(renderError('State mismatch — posible intento de CSRF.'));
  }

  // Exchange code for token.
  let tokenJson: { access_token?: string; error?: string; error_description?: string };
  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });
    tokenJson = await tokenRes.json();
  } catch (err) {
    return html(renderError('Network error talking to GitHub: ' + String(err)));
  }

  if (!tokenJson.access_token) {
    return html(renderError(tokenJson.error_description ?? tokenJson.error ?? 'No access token in response'));
  }

  // Post the token back to the CMS window using the format Decap/Sveltia expect.
  const payload = JSON.stringify({ token: tokenJson.access_token, provider: 'github' });
  return html(renderSuccess(payload));
};

function html(body: string): Response {
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      // Clear the state cookie.
      'Set-Cookie': 'cms_oauth_state=; Path=/api/oauth; Max-Age=0; SameSite=Lax; Secure; HttpOnly',
    },
  });
}

function renderSuccess(payload: string): string {
  // Decap/Sveltia listen for these exact two messages on window.opener.
  return `<!doctype html><html><head><meta charset="utf-8"><title>Auth OK</title></head><body>
<script>
  (function(){
    function send(target){
      target.postMessage('authorization:github:success:' + ${JSON.stringify(payload)}, '*');
    }
    if (window.opener) {
      // Handshake: CMS replies "authorizing:github" then expects success message.
      window.addEventListener('message', function(e){
        if (e.data === 'authorizing:github') send(e.source);
      }, false);
      send(window.opener);
    } else {
      document.body.innerText = 'Login OK. Puedes cerrar esta ventana y volver al CMS.';
    }
  })();
<\/script>
</body></html>`;
}

function renderError(msg: string): string {
  const safe = String(msg).replace(/</g, '&lt;');
  return `<!doctype html><html><head><meta charset="utf-8"><title>Auth error</title></head><body style="font-family:system-ui;padding:2rem;max-width:560px">
<h1>Error de autenticación</h1>
<p>${safe}</p>
<p>Vuelve al CMS e intenta de nuevo. Si persiste, revisa GITHUB_OAUTH_CLIENT_ID y GITHUB_OAUTH_CLIENT_SECRET en Vercel.</p>
</body></html>`;
}
