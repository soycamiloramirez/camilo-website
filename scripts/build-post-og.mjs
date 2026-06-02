/**
 * build-post-og.mjs — Genera OG image (1200×630) por cada post del blog.
 *
 * Estrategia: satori → SVG → resvg → PNG, guardado en /public/og/{slug}.png
 *
 * Se ejecuta como prebuild script. Cada post obtiene una OG card propia con
 * su título sobre el fondo de marca (off-white + accent purple). Mucho mejor
 * para CTR cuando se comparte en LinkedIn/X que la OG genérica del autor.
 */
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const blogDir = join(root, 'src/content/blog');
const outDir = join(root, 'public/og');

const helveticaBold = await readFile(join(root, 'public/fonts/HelveticaNeue-Bold.woff2'));
const helveticaThin = await readFile(join(root, 'public/fonts/HelveticaNeue-UltraLight.woff2'));
const fraunces = await readFile(join(root, 'public/fonts/Fraunces-RegularItalic.woff2'));

const CATEGORY_LABEL = {
  negocios: 'Negocios y estrategia',
  geopolitica: 'Geopolítica y mercado',
  latam: 'LATAM',
  aprende: 'Aprende',
};

function ogTemplate({ title, category, date }) {
  return {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px 80px',
        background: '#F4F4F3',
        fontFamily: 'Helvetica Neue',
      },
      children: [
        // Top: eyebrow with franja + brand
        {
          type: 'div',
          props: {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center', gap: '16px' },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: { width: '36px', height: '6px', background: '#800080', borderRadius: '2px' },
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: { fontSize: '20px', fontWeight: 700, letterSpacing: '0.18em', color: '#3D3D40', textTransform: 'uppercase' },
                        children: category,
                      },
                    },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: { fontSize: '20px', fontWeight: 700, color: '#16161A', letterSpacing: '-0.02em' },
                  children: [
                    'Camilo ',
                    { type: 'span', props: { style: { color: '#800080' }, children: 'Ramírez' } },
                  ],
                },
              },
            ],
          },
        },
        // Middle: title display
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', flex: '1' },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: title.length > 80 ? '52px' : '64px',
                    fontWeight: 700,
                    lineHeight: '1.05',
                    letterSpacing: '-0.035em',
                    color: '#16161A',
                    maxWidth: '1040px',
                  },
                  children: title,
                },
              },
            ],
          },
        },
        // Bottom: date · pertinente footer
        {
          type: 'div',
          props: {
            style: { display: 'flex', justifyContent: 'space-between', fontSize: '18px', color: '#7A7A7D', fontWeight: 500 },
            children: [
              { type: 'div', props: { children: date } },
              { type: 'div', props: { children: 'camilo-ramirez.com' } },
            ],
          },
        },
      ],
    },
  };
}

async function main() {
  if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });

  const files = (await readdir(blogDir)).filter((f) => f.endsWith('.md'));
  let generated = 0;
  let skipped = 0;

  for (const file of files) {
    const slug = basename(file, '.md');
    const outPath = join(outDir, `${slug}.png`);

    const src = await readFile(join(blogDir, file), 'utf-8');
    const { data } = matter(src);

    // Skip drafts and hidden
    if (data.draft || data.hidden) {
      skipped++;
      continue;
    }

    // Skip if up to date (output newer than source)
    if (existsSync(outPath)) {
      const [srcStat, outStat] = await Promise.all([stat(join(blogDir, file)), stat(outPath)]);
      if (outStat.mtimeMs > srcStat.mtimeMs) {
        skipped++;
        continue;
      }
    }

    const category = CATEGORY_LABEL[data.categories?.[0]] ?? 'Blog';
    const date = data.date
      ? new Date(data.date).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })
      : '';

    try {
      const svg = await satori(ogTemplate({ title: data.title, category, date }), {
        width: 1200,
        height: 630,
        fonts: [
          { name: 'Helvetica Neue', data: helveticaBold, weight: 700, style: 'normal' },
          { name: 'Helvetica Neue', data: helveticaThin, weight: 200, style: 'normal' },
          { name: 'Fraunces', data: fraunces, weight: 400, style: 'italic' },
        ],
      });

      const png = new Resvg(svg).render().asPng();
      await writeFile(outPath, png);
      generated++;
      console.log(`[og] ${slug}`);
    } catch (err) {
      console.error(`[og] FAILED ${slug}: ${err.message}`);
    }
  }

  console.log(`[og] generated=${generated}, skipped=${skipped}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
