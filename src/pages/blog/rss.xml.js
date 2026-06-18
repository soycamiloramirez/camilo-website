import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

const CATEGORY_LABELS = {
  negocios: 'Negocios y estrategia',
  geopolitica: 'Geopolítica y mercado',
  latam: 'LATAM',
  aprende: 'Aprende',
};

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft && !data.hidden);
  posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const site = context.site?.toString().replace(/\/$/, '') ?? 'https://camilo-ramirez.com';
  // lastBuildDate = pubDate del post más reciente. Si no hay posts, fallback al build time stable
  // (no usar new Date() puro porque cambia cada deploy y agregadores marcan como "actualización fantasma").
  const lastBuildDate = posts[0]?.data.date.toUTCString() ?? new Date().toUTCString();
  const rssUrl = `${site}/blog/rss.xml`;

  return rss({
    title: 'Blog · Camilo Ramírez',
    description: 'Análisis editorial sobre IA, negocios y LATAM. Cada artículo nace de un episodio de Pertinente.',
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/blog/${post.id}`,
      pubDate: post.data.date,
      // Categorías editoriales — mejora indexación en agregadores.
      categories: (post.data.categories || []).map((c) => CATEGORY_LABELS[c] || c),
    })),
    // Namespace + extras: atom:link self-link es estándar RSS 2.0;
    // lastBuildDate ayuda a feeds readers a saber si hay novedad sin parsear todo;
    // image para preview en Apple News y feedly.
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: `
      <language>es-CO</language>
      <copyright>© ${new Date().getFullYear()} Camilo Ramírez</copyright>
      <managingEditor>yo@camilo-ramirez.com (Camilo Ramírez)</managingEditor>
      <webMaster>yo@camilo-ramirez.com (Camilo Ramírez)</webMaster>
      <lastBuildDate>${lastBuildDate}</lastBuildDate>
      <atom:link href="${rssUrl}" rel="self" type="application/rss+xml" />
      <image>
        <url>${site}/og-image.jpg</url>
        <title>Blog · Camilo Ramírez</title>
        <link>${site}/blog</link>
      </image>
    `.trim(),
  });
}
