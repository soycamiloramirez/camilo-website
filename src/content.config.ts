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
    description: z.string(),
    date: z.coerce.date(),
    categories: z.array(z.enum(['negocios', 'geopolitica', 'latam', 'aprende'])).min(1),
    episode: z.number().int().positive().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
