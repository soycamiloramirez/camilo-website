import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const CATEGORIES = {
  negocios: { label: 'Negocios y estrategia', slug: 'negocios' },
  geopolitica: { label: 'Geopolítica y mercado', slug: 'geopolitica' },
  latam: { label: 'LATAM', slug: 'latam' },
  aprende: { label: 'Aprende', slug: 'aprende' },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    /** SEO `<title>` opcional. Si está, gana sobre `title` (que se renderiza en el body). Útil para titulares editoriales largos que necesitan versión SERP corta (≤60 chars). */
    seo_title: z.string().optional(),
    description: z.string(),
    date: z.coerce.date(),
    categories: z.array(z.enum(['negocios', 'geopolitica', 'latam', 'aprende'])).min(1),
    episode: z.number().int().positive().optional(),
    draft: z.boolean().default(false),
    hidden: z.boolean().default(false),
    tldr: z.string().optional(),
    pullquote: z.string().optional(),
    aside: z.string().optional(),
    hero_image: z.string().optional(),
  }),
});

export const collections = { blog };
