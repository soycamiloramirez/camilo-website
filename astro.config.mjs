// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
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
  build: { inlineStylesheets: 'auto' },
});
