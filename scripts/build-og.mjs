// Generates the 1200×630 Open Graph card.
// Run: node scripts/build-og.mjs
// Composites the hero photo on the right and a text panel on the left.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const photoPath = join(root, 'public/camilo-hero.jpg');
const outPath = join(root, 'public/og-image.jpg');

const W = 1200;
const H = 630;
const PHOTO_W = 504; // right strip

// Right strip: cover-fit + B&W
const photo = await sharp(photoPath)
  .resize(PHOTO_W, H, { fit: 'cover', position: 'attention' })
  .grayscale()
  .modulate({ brightness: 1.02 })
  .linear(1.05, -5)
  .jpeg({ quality: 92 })
  .toBuffer();

// Left text panel as SVG
const text = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W - PHOTO_W}" height="${H}" viewBox="0 0 ${W - PHOTO_W} ${H}">
  <style>
    .eye { font: 600 18px Helvetica, Arial, sans-serif; fill: #6b6b6b; letter-spacing: 4px; text-transform: uppercase; }
    .h   { font: 600 56px Helvetica, Arial, sans-serif; fill: #0a0a0a; letter-spacing: -1.8px; }
    .sub { font: 400 22px Helvetica, Arial, sans-serif; fill: #2a2a2a; letter-spacing: -0.4px; }
    .ft  { font: 600 16px Helvetica, Arial, sans-serif; fill: #6b6b6b; letter-spacing: 2px; text-transform: uppercase; }
    .dot { fill: #3D2D9C; }
  </style>
  <rect width="100%" height="100%" fill="#ffffff"/>
  <text x="64" y="100" class="eye">Camilo Ramírez</text>
  <text x="64" y="200" class="h">Criterio sobre</text>
  <text x="64" y="262" class="h">IA, negocios</text>
  <text x="64" y="324" class="h">y LATAM.</text>
  <line x1="64" y1="370" x2="220" y2="370" stroke="#3D2D9C" stroke-width="3"/>
  <text x="64" y="420" class="sub">Publicado todos los días.</text>
  <text x="64" y="556" class="ft">Advisor</text>
  <circle cx="172" cy="551" r="3" class="dot"/>
  <text x="190" y="556" class="ft">Speaker</text>
  <circle cx="312" cy="551" r="3" class="dot"/>
  <text x="330" y="556" class="ft">Pertinente</text>
  <text x="64" y="586" class="ft">camilo-ramirez.com</text>
</svg>`.trim();

const composed = await sharp({
  create: { width: W, height: H, channels: 3, background: '#ffffff' },
})
  .composite([
    { input: Buffer.from(text), top: 0, left: 0 },
    { input: photo, top: 0, left: W - PHOTO_W },
  ])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(outPath);

console.log(`OG written → ${outPath} (${composed.size} bytes, ${composed.width}×${composed.height})`);
