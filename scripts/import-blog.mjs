#!/usr/bin/env node
// One-off importer: read /tmp/articulos/*.md (raw articles from Camilo),
// extract title + dek, infer slug, attach categories + sequential dates,
// and write Astro content collection files into src/content/blog/.
// Idempotent: overwrites on each run.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = '/tmp/articulos';
const DEST = path.join(__dirname, '..', 'src', 'content', 'blog');

// Per-article metadata: slug (final URL), categories, episode number.
// Order = chronological (01 = oldest, 18 = newest). Dates are assigned
// daily working backwards from the most recent.
const ARTICLES = [
  { ep: 1,  slug: 'talento-no-es-la-barrera',          categories: ['latam', 'negocios'] },
  { ep: 2,  slug: 'nadie-audita-la-ia',                categories: ['geopolitica'] },
  { ep: 3,  slug: 'ventana-de-contexto',               categories: ['aprende'] },
  { ep: 4,  slug: 'web-para-agentes',                  categories: ['negocios', 'aprende'] },
  { ep: 5,  slug: 'latamgpt',                          categories: ['latam'] },
  { ep: 6,  slug: 'agi-vs-singularidad',               categories: ['aprende'] },
  { ep: 7,  slug: 'oligopolio-ia',                     categories: ['geopolitica', 'negocios'] },
  { ep: 8,  slug: 'cerebras-soberania',                categories: ['geopolitica'] },
  { ep: 9,  slug: 'empresas-eligen-lo-que-funciona',   categories: ['negocios'] },
  { ep: 10, slug: 'openai-microsoft-infraestructura',  categories: ['geopolitica', 'negocios'] },
  { ep: 11, slug: 'chatgpt-publicidad',                categories: ['negocios'] },
  { ep: 12, slug: 'costo-fisico-de-la-ia',             categories: ['geopolitica', 'aprende'] },
  { ep: 13, slug: 'gobierno-usa-audita',               categories: ['geopolitica'] },
  { ep: 14, slug: 'openai-consultoria',                categories: ['negocios'] },
  { ep: 15, slug: 'palantir-ontologia',                categories: ['negocios'] },
  { ep: 16, slug: 'salesforce-fin-de-la-pantalla',     categories: ['negocios'] },
  { ep: 17, slug: 'musk-altman-juicio',                categories: ['geopolitica'] },
  { ep: 18, slug: 'china-meta-guerra-fria',            categories: ['geopolitica'] },
];

// Most recent (#18) = 2026-05-29, then backwards day-by-day.
const REFERENCE_DATE = new Date('2026-05-29T12:00:00-05:00');
const MOST_RECENT_EP = 18;

function dateFor(ep) {
  const daysBack = MOST_RECENT_EP - ep;
  const d = new Date(REFERENCE_DATE);
  d.setDate(d.getDate() - daysBack);
  return d.toISOString().slice(0, 10);
}

function findSourceFile(ep) {
  const padded = String(ep).padStart(2, '0');
  const files = fs.readdirSync(SRC).filter((f) => f.startsWith(`pertinente-${padded}-`));
  if (files.length !== 1) throw new Error(`expected 1 file for ep ${padded}, found ${files.length}`);
  return path.join(SRC, files[0]);
}

function escapeYaml(s) {
  // Wrap in single quotes; double any embedded single quote.
  return `'${s.replace(/'/g, "''")}'`;
}

function process(article) {
  const src = findSourceFile(article.ep);
  const raw = fs.readFileSync(src, 'utf8');

  // Drop the closing italic "Esto nació de un episodio de Pertinente..." line;
  // we render that CTA from the template, not from the article body.
  const body = raw
    .replace(/\n+---\n+\*Esto nació de un episodio de Pertinente[\s\S]*$/m, '\n')
    .trim();

  // Title = first H1.
  const titleMatch = body.match(/^#\s+(.+)$/m);
  if (!titleMatch) throw new Error(`no H1 in ep ${article.ep}`);
  const title = titleMatch[1].trim();

  // Description = first paragraph after the H1.
  const afterTitle = body.slice(body.indexOf(titleMatch[0]) + titleMatch[0].length);
  const firstPara = afterTitle.split(/\n\n+/).map((p) => p.trim()).find((p) => p && !p.startsWith('#'));
  const description = firstPara ? firstPara.replace(/\s+/g, ' ').slice(0, 200) : '';

  // Body = everything after the H1 (we'll re-render the title from frontmatter).
  const bodyWithoutTitle = afterTitle.replace(/^\s*\n/, '');

  const frontmatter = [
    '---',
    `title: ${escapeYaml(title)}`,
    `description: ${escapeYaml(description)}`,
    `date: ${dateFor(article.ep)}`,
    `episode: ${article.ep}`,
    `categories: [${article.categories.join(', ')}]`,
    '---',
    '',
    bodyWithoutTitle.trim(),
    '',
  ].join('\n');

  const out = path.join(DEST, `${article.slug}.md`);
  fs.writeFileSync(out, frontmatter);
  console.log(`✓ ep ${String(article.ep).padStart(2, '0')} → /blog/${article.slug} (${dateFor(article.ep)})`);
}

fs.mkdirSync(DEST, { recursive: true });
ARTICLES.forEach(process);
console.log(`\n${ARTICLES.length} articles imported into ${DEST}`);
