# Changelog — Entrega 2 (DS v2.1)
Fecha: 2026-06-01

## Nuevos archivos
- speaking.html — copy literal sección 4 del handoff
- blog-post.html — style guide universal (todos los elementos markdown + 3 especiales)
- index.en.html, historia.en.html, speaking.en.html, blog.en.html, blog-post.en.html

## Eliminados
- trabajar.html — reemplazado por sección 2.7 del home + /speaking. Redirect 301 lo maneja el equipo de Astro.

## Modificados
- index.html, historia.html, pertinente.html, metase.html, blog.html, podcasts.html
  - Header nuevo: Blog · Podcasts · Speaking · Historia
  - Footer: Advisory → /#trabajar, Speaking → /speaking
- historia.html + historia.en.html: agregado brand ticker (24 marcas)
- podcasts.html: chip-nav sticky filtrable (12 chips)
- tokens.css: cambios mínimos en media-card. Resto intacto.
- pages.css: agregado bloque speaking, ticker, chip-nav, blog-post template, espectro

## Convenciones EN
- "Criterio" → "Judgment" (palabra ancla)
- Em-dashes prohibidos en prose
- Números: 200,000+ formato EN
- Tags "· In Spanish" en cards de contenido ES servidos desde sitio EN

## Pendiente para Astro
- 301: /trabajar → /#trabajar
- Conectar /podcasts a podcasts.ts (51 entries)
- Conectar /blog a content collection (20 .md actuales)
- Header/footer extraídos a layout compartido
