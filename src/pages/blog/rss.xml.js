import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'Blog · Camilo Ramírez',
    description: 'Análisis editorial sobre IA, negocios y LATAM. Cada artículo nace de un episodio de Pertinente.',
    site: context.site ?? 'https://camilo-ramirez.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/blog/${post.id}`,
      pubDate: post.data.date,
    })),
    customData: '<language>es-CO</language>',
  });
}
