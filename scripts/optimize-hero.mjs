/**
 * optimize-hero.mjs — Genera versiones modernas (AVIF + WebP) y dimensiones
 * responsive de camilo-hero.jpg. Reemplaza el original con uno ya comprimido.
 *
 * El hero original pesa ~1.8MB. Con AVIF y dimensión razonable se baja a
 * ~60-150KB, lo que mejora Core Web Vitals (LCP) directamente.
 *
 * Output:
 *   /public/camilo-hero.avif (1200w)
 *   /public/camilo-hero.webp (1200w)
 *   /public/camilo-hero.jpg  (1200w, optimizado, fallback)
 *
 * Run: node scripts/optimize-hero.mjs
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readFile, writeFile, copyFile } from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const inputPath = join(root, 'public/camilo-hero.jpg');

// Backup original if not already backed up
const backupPath = join(root, 'public/camilo-hero.original.jpg');
try {
  await readFile(backupPath);
  console.log('[hero] backup exists, skipping');
} catch {
  await copyFile(inputPath, backupPath);
  console.log('[hero] backed up original to camilo-hero.original.jpg');
}

const src = await readFile(backupPath);

const TARGET_WIDTH = 1200; // suficiente para hero responsive hasta 2x

// AVIF — la mejor compresión, soporte ~90% browsers
await sharp(src)
  .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
  .avif({ quality: 60, effort: 6 })
  .toFile(join(root, 'public/camilo-hero.avif'));

// WebP — fallback para Safari viejo
await sharp(src)
  .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
  .webp({ quality: 75 })
  .toFile(join(root, 'public/camilo-hero.webp'));

// JPG optimizado — último fallback
await sharp(src)
  .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
  .jpeg({ quality: 82, progressive: true, mozjpeg: true })
  .toFile(join(root, 'public/camilo-hero.jpg'));

// Print sizes
const fs = await import('node:fs/promises');
const files = ['camilo-hero.avif', 'camilo-hero.webp', 'camilo-hero.jpg', 'camilo-hero.original.jpg'];
for (const f of files) {
  const stat = await fs.stat(join(root, 'public', f));
  console.log(`[hero] ${f}: ${(stat.size / 1024).toFixed(1)}KB`);
}
