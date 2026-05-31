# INSTRUCCIONES PARA CLAUDE CODE

Pega esto (o un resumen) como prompt a Claude Code, junto con esta carpeta.

---

## El encargo
Implementar el sitio personal de **Camilo Ramírez** (estratega, advisor, host de Pertinente y Métase en mi cabeza) a partir de esta referencia de diseño. Es un sitio editorial multipágina en español, con un design system propio ya construido.

## Modo de trabajo (IMPORTANTE — elige uno)

### Modo A — Fiel (recomendado, queda idéntico)
> Usa `design_handoff_site/` como código base. Copia `tokens.css`, `styles.css`,
> `pages.css`, `fonts/` y `assets/` **TAL CUAL**. No reinterpretes valores ni
> "mejores" nada. Envuelve el HTML existente en la estructura de [Next/Astro/React],
> manteniendo las clases `cr-*` y el CSS sin cambios. Extrae header y footer a un
> layout/partial compartido (se repiten en las 7 páginas).

### Modo B — Reimplementar (cercano, con riesgo de drift)
> Reimplementa en [framework] siguiendo `README.md`. Mapea `tokens.css` a
> [Tailwind theme / CSS vars]. Convierte las clases `cr-*` en componentes/variants.
> Respeta TODAS las reglas de marca (abajo). Revisa contra los screenshots.

## Reglas de marca NO negociables
- **Tipografía**: Helvetica Neue (self-hosted en `fonts/`). Display con contraste de peso (Bold + UltraLight 200) y kerning apretado. Los helpers `.cr-d-thin` / `.cr-d-bold` / `.cr-d-em` aplican la firma tipográfica en los títulos.
- **Color**: blanco y negro + UN acento morado `#800080`, usado con moderación. **Sobre fondos oscuros el acento es magenta `#C75CA6`**, nunca el morado (vibra).
- **La franja** (`.cr-franja`): barra sólida de color antes de cada eyebrow, en lugar de em-dash.
- **Voz**: español, formal *usted/su*, anti-hype, densa.
- **PROHIBIDO**: em-dash (—), emoji, signos de exclamación, gradientes en fondos, imágenes de stock.
- **Iconos**: Lucide a stroke 1.75 (los de redes en footer son SVG de marca inline).

## Qué incluye este paquete
- **7 páginas** HTML que navegan entre sí: `index.html` (home), `blog.html`, `blog-post.html`, `pertinente.html`, `metase.html`, `trabajar.html`, `historia.html`.
- **`tokens.css`** — el design system (color, tipografía + display treatments, espaciado, radios, motion, `@font-face` de Helvetica Neue, y componentes base `.cr-btn`, `.cr-mediacard`, etc.). FUENTE DE VERDAD.
- **`styles.css`** — estilos del home. **`pages.css`** — estilos de páginas internas.
- **`fonts/`** — Helvetica Neue (200–700 + itálicas) + Fraunces + ya self-hosted.
- **`assets/`** — foto del hero, logos reales (Navigamo, AI Collective, RCN, Netbangers, Custom Built Show), carátulas de podcast, íconos de partners.
- **`README.md`** — documentación completa: tokens con valores, las 10 secciones del home con medidas, las plantillas internas, interacciones, responsive.

## Licencia
Helvetica Neue es licenciada. Confirma que la licencia cubra uso web/embedding antes de publicar.
