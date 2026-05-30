import type { APIRoute } from 'astro';

// Server-rendered: must NOT be prerendered.
export const prerender = false;

/**
 * Step 1 of the GitHub OAuth flow for Sveltia/Decap CMS.
 * Redirects the browser to GitHub's authorize URL with our client_id.
 * GitHub will redirect the user to /api/oauth/callback after consent.
 */
export const GET: APIRoute = ({ url, redirect }) => {
  const clientId = import.meta.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return new Response('Missing GITHUB_OAUTH_CLIENT_ID', { status: 500 });
  }

  // Sveltia/Decap may pass a `provider` query (always github in our case).
  // It also may pass a `scope`. We force a sensible default.
  const requestedScope = url.searchParams.get('scope') ?? 'repo,user';
  const state = crypto.randomUUID();

  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', clientId);
  authorize.searchParams.set('scope', requestedScope);
  authorize.searchParams.set('state', state);

  // Pass state in a short-lived cookie so the callback can verify it.
  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.toString(),
      'Set-Cookie': `cms_oauth_state=${state}; Path=/api/oauth; Max-Age=600; SameSite=Lax; Secure; HttpOnly`,
    },
  });
};
