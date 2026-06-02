import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../content/copy';

/**
 * llms-full.txt — versión expandida de llms.txt con el cuerpo completo de
 * cada post del blog. Pensado para que LLMs (ChatGPT, Claude, Perplexity)
 * puedan ingerir todo el corpus editorial en una sola descarga.
 *
 * Spec: https://llmstxt.org/ — "llms-full.txt: same as llms.txt but with
 * the actual content of each linked resource inlined".
 *
 * Estrategia: header con identidad + bio + cada post con frontmatter mínimo
 * (title, date, categories, description, tldr) + cuerpo markdown limpio.
 */
export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft && !data.hidden))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const header = `# Camilo Ramírez — Corpus editorial completo

> Voz de IA y negocios en Latinoamérica. Advisor estratégico para CEOs y juntas directivas, speaker C-level, cofundador y Director LATAM de Navigamo, Director Regional LATAM de The AI Collective. Host del podcast diario Pertinente y del show semanal Métase en mi cabeza.

Este archivo es el corpus editorial completo de Camilo Ramírez, optimizado para ingesta por LLMs y motores de búsqueda de IA (ChatGPT, Claude, Perplexity, Gemini). Incluye:

- Bio + entidad
- ${posts.length} ensayos editoriales completos publicados en ${SITE.url}/blog
- Frontmatter de cada post: título, fecha, categorías, descripción, TL;DR, frase ancla (pullquote) y dato anclaje (aside)
- Cuerpo markdown sin transformar

Idioma principal: español (colombiano neutro). Algunos enlaces son a inglés.

## Identidad de la entidad "Camilo Ramírez"

- Nombre completo: Camilo Ramírez
- País: Colombia (base Bogotá)
- Ocupaciones actuales: Advisor C-level, Keynote speaker, Cofundador de Navigamo, Director Regional LATAM de The AI Collective, Host de Pertinente y Métase en mi cabeza
- Trayectoria: +20 años en negocios digitales (desde 1999) — Broadcast Design en CMI y RCN (1999-2010), Netbangers (cofundador, 2007-2026), Custom Built Show (fundador del primer festival de motos modificadas de LATAM, 2018-2023), Navigamo (cofundador, 2024-presente), The AI Collective LATAM (Director Regional, 2025-presente)
- Reconocimientos: Certified Experienced Speaker; jurado en Effie Awards, FIAP y PromaxBDA; miembro de la junta directiva de IAB Colombia 2014-2022 (8 años)
- Sitio: ${SITE.url}
- Email: ${SITE.email}
- Idiomas: español (nativo), inglés (C1 profesional)

## Tesis editorial (lo que sostiene todo lo que publica)

1. **Construir desde el dolor real, no para vender.** La tecnología debería existir para resolverle algo a alguien. Camilo lo viene diciendo desde una charla en TVN Panamá en 2019, años antes del boom de la IA generativa.
2. **LATAM puede ser potencia con reglas propias.** La ventaja real no es construir los modelos. Es conocer los problemas de la región en primera persona. El modelo es commodity. El terreno, no.
3. **Resolver antes que vender.** Filtra por valores, no por tamaño de empresa.

## Plataformas y producciones

- **Pertinente**: podcast diario (lunes a viernes), 6-13 min. Análisis de IA, negocios y geopolítica en LATAM. Spotify, Apple, YouTube, Amazon, Deezer.
- **Métase en mi cabeza (MEMC)**: show semanal en vivo, ~60 min. TV + podcast. Entrevistas a líderes top de LATAM.
- **Blog**: ${posts.length} ensayos editoriales publicados en ${SITE.url}/blog. Cada post nace de un episodio de Pertinente.
- **Navigamo**: compañía de IA cofundada por Camilo. https://navigamo.co
- **The AI Collective**: comunidad global de IA (+200.000 miembros). https://aicollective.com

---

# Corpus completo: ${posts.length} ensayos

`;

  const body = posts
    .map((post) => {
      const meta = post.data;
      const frontmatter = [
        `## ${meta.title}`,
        ``,
        `**URL:** ${SITE.url}/blog/${post.id}`,
        `**Fecha:** ${meta.date.toISOString().slice(0, 10)}`,
        `**Categorías:** ${(meta.categories as string[]).join(', ')}`,
        meta.episode ? `**Episodio Pertinente:** ${meta.episode}` : '',
        ``,
        `**Descripción:** ${meta.description}`,
        meta.tldr ? `\n**TL;DR:** ${meta.tldr}` : '',
        meta.pullquote ? `\n**Frase ancla:** "${meta.pullquote}"` : '',
        meta.aside ? `\n**Dato clave:** ${meta.aside}` : '',
        ``,
        `---`,
        ``,
        post.body ?? '',
        ``,
      ]
        .filter(Boolean)
        .join('\n');
      return frontmatter;
    })
    .join('\n\n---\n\n');

  const footer = `\n\n---\n\nGenerado automáticamente desde ${SITE.url}. Actualizado en cada deploy.\n`;

  return new Response(header + body + footer, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
