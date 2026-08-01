// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://camilo-ramirez.com',
  trailingSlash: 'never',
  // Static by default; specific routes opt-in to server rendering via
  // `export const prerender = false` (used by /api/oauth/* for the CMS).
  output: 'static',
  adapter: vercel(),
  integrations: [
    // GA4 (gtag) corre en un web worker vía Partytown, fuera del hilo principal.
    // forward: los stubs que el main thread necesita para encolar eventos hacia
    // el worker — dataLayer.push (config/pageview) y gtag (eventos custom:
    // web-vitals, click_outbound, propuesta_submit, newsletter_signup).
    partytown({ config: { forward: ['dataLayer.push', 'gtag'] } }),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-CO', en: 'en-US' },
      },
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/api/') &&
        !page.includes('/_style-guide') &&
        // Rutas privadas no indexables (propuestas, links directos). Se sirven
        // por URL no adivinable, con noindex en el head, y nunca en el sitemap.
        !page.includes('/p/'),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  // CSS como stylesheet externo (cacheable entre páginas). Mantener el HTML pequeño
  // deja que el preload scanner descubra el preload del hero (LCP) en el primer
  // paquete y lo arranque en paralelo con el CSS, en vez de sepultarlo tras ~74 KB
  // de CSS inline en el <head>.
  build: { inlineStylesheets: 'auto' },
});
