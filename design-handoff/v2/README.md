# Handoff: Sitio camilo-ramirez.com

## Overview
Implementación de referencia del sitio personal de **Camilo Ramírez** (estratega, advisor, host de *Pertinente* y *Métase en mi cabeza*), construida con su design system. Es un sitio editorial de una sola página con anclas: hero, bloques de marca (Navigamo / The AI Collective), podcasts, blog, tesis, modos de trabajo, historia y contacto.

## About the design files
Los archivos de este bundle son **referencias de diseño en HTML/CSS estático**, no código de producción para copiar tal cual. Muestran el look final, la estructura semántica y el comportamiento esperado. **La tarea es recrear este diseño en el entorno del proyecto destino** (React, Next, Vue, Astro, SwiftUI, etc.) usando sus patrones y componentes establecidos. Si no existe un entorno todavía, elige el framework más apropiado e impleméntalo ahí.

El HTML ya está libre de andamiaje de prototipo (no usa React vía CDN ni Babel): es HTML semántico + CSS con variables, así que es directo de leer y portar.

## Fidelity
**Alta fidelidad (hi-fi).** Colores, tipografía, espaciado e interacciones son finales. Recrea la UI pixel-perfect usando las librerías y patrones del codebase destino. Los tokens están en `tokens.css` como variables CSS; mapéalos a tu sistema (CSS vars, Tailwind theme, design tokens, etc.) en vez de hardcodear valores.

## Archivos del bundle
| Archivo | Qué es |
|---|---|
| `index.html` | **Home** completa en HTML semántico estático. Punto de partida para portar. |
| `blog.html` | Índice del blog: banner, filtro por categoría, post destacado + lista. |
| `blog-post.html` | Plantilla de ensayo (detalle): título, byline, lede, cuerpo largo, cita destacada, relacionados. |
| `pertinente.html` | Página del podcast diario (banner oscuro con carátula + lista de episodios). |
| `metase.html` | Página del programa semanal "Métase en mi cabeza" (mismo patrón, identidad propia). |
| `speaking.html` | Página de Speaking (ES): hero, diferenciador, temas, formatos, logística, prueba social, docencia, otros podcasts, FAQ, contacto. Reemplaza la antigua `trabajar.html`. |
| `podcasts.html` | Directorio curado de 52 podcasts con chip-nav sticky filtrable. |
| `historia.html` | Trayectoria completa (6 capítulos) + brand ticker. |
| `*.en.html` | Versiones EN: `index.en`, `historia.en`, `speaking.en`, `blog.en`, `blog-post.en`. |
| `styles.css` | Estilos de la home (clases `cr-*`). Importa `tokens.css`. |
| `pages.css` | Estilos de las plantillas internas (article, blog index, podcast, servicios). Se carga después de `styles.css`. |
| `tokens.css` | **El design system**: variables CSS de color, tipografía, espaciado, radios, motion, y los `@font-face` de Helvetica Neue. Más los estilos base de componentes (`.cr-btn`, `.cr-container`, `.cr-eyebrow`, `.cr-lead`, `.cr-display-2`). |
| `fonts/` | Helvetica Neue (200–700 + itálicas), self-hosted `.woff2`. |
| `assets/` | Reales del sitio en vivo: `camilo-hero.jpg` (retrato), `navigamo-logo.svg`, `aicollective-logo.svg`, `pertinente-cover.jpg`, `memc-cover.jpg`. |

Las páginas internas cargan **dos** hojas: `<link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="pages.css">`. La home solo carga `styles.css`.

El sitio es **multipágina** con navegación real entre archivos (no solo anclas). El header y el footer se repiten en cada página (en producción, conviértelos en layout/partials compartidos). El mapa de navegación: `index.html` (home, con secciones ancla `#ultimo`, `#tesis`, `#contacto`), `blog.html` → `blog-post.html`, `pertinente.html`, `metase.html`, `trabajar.html`, `historia.html`.

Para previsualizar la referencia: abre `index.html` en un navegador y navega. Todo es relativo y funciona offline.

---

## Brand rules (no negociables)
Antes de tocar estilos, respeta esto. Es lo que evita que el sitio se sienta genérico o "hecho con IA":

- **Tipografía**: Helvetica Neue. Bold para display, Regular/Medium para UI. Títulos con **kerning apretado** (ya está en los tokens: display −0.045em, headings −0.03 a −0.04em). El hero usa contraste de peso: líneas en `font-weight: 200` (UltraLight) intercaladas con líneas en 700.
- **Color**: base blanco y negro (neutros cálido-fríos) + **un solo acento morado `#800080`**, usado con moderación. **Sobre fondos oscuros el acento va en magenta claro `#C75CA6`**, nunca el morado saturado (vibra y no se lee). Sin gradientes en fondos.
- **La franja**: el dispositivo de marca para introducir secciones es una **barra sólida de color** (`.cr-franja`, 28×4px) antes del eyebrow, NO un em-dash. En secciones oscuras usa `.cr-franja--mag` (magenta).
- **Voz**: español, formal *usted / su*, anti-hype, densa. Tercera persona sobre Camilo en lo editorial; segunda persona (usted) en los CTA.
- **PROHIBIDO**: em-dash (—), emoji, signos de exclamación, gradientes en fondos, contenedores tipo blob con bordes súper redondeados, e imágenes de stock. Para pausas usa punto, coma o paréntesis.
- **Íconos** (si agregas): Lucide a stroke 1.75.

---

## Design tokens (resumen — fuente de verdad en `tokens.css`)

### Color
| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#F4F4F3` | Lienzo primario |
| `--bg-pure` | `#FFFFFF` | Superficie de cards |
| `--ink` | `#15101B` | Texto principal |
| `--ink-2` | `#3E3A44` | Texto secundario |
| `--ink-3` | `#7C7882` | Meta / captions |
| `--accent` | `#800080` | Acento (morado) |
| `--accent-deep` | `#560072` | Hover / profundidad |
| `--accent-warm` | `#A90072` | Resalte secundario (magenta) |
| `#C75CA6` | (literal) | Acento SOBRE oscuro (legibilidad) |
| `--dark` | `#190A24` | Secciones oscuras (Tesis, Contacto) |
| `--ink-on-dark-2` | `#BBB2C6` | Texto secundario sobre oscuro |
| `--danger` | `#D50048` | Errores |

### Tipografía
- Familia: `var(--font-sans)` = `"Helvetica Neue", "Helvetica", Arial, sans-serif`
- Display: `--display-2` ~56px, peso 700, tracking −0.035em
- Hero title: clamp(40px, 5vw, 68px), line-height 1.0, tracking −0.045em
- Body: 16px / 1.65 · Lead: 21px / 1.55 · Eyebrow: 13px uppercase, tracking +0.18em

### Espaciado (base 8)
`--s-1:4` `--s-2:8` `--s-3:12` `--s-4:16` `--s-5:24` `--s-6:32` `--s-7:48` `--s-8:72` `--s-9:112` `--s-10:160` (px)

### Radios
`--radius-sm:6` `--radius-md:12` `--radius-lg:20` `--radius-pill:9999` `--radius-circle:50%`

### Motion
`--dur-fast:160ms` `--dur-base:280ms` · ease `cubic-bezier(.2,.7,.2,1)`

### Elevación
Casi sin sombra. `--elev-1: 0 1px 2px rgba(14,14,15,.06), 0 8px 24px rgba(14,14,15,.04)` solo en hover de cards.

---

## Secciones (en orden)

### 1. Header (sticky)
- Sticky top, fondo `rgba(244,244,243,0.85)` + `backdrop-filter: blur(8px)`, hairline inferior, alto `--header-h` (72px).
- Izq: wordmark "Camilo **Ramírez**" (apellido en `--accent`). Centro/der: nav (Lo último, Blog, Tesis, Trabajar conmigo, Historia). Der: switch idioma `ES / EN` + botón "Contacto".
- Links nav: 14px, peso 500, `--ink-2`, hover `--accent`. CTA usa `.cr-btn--primary`.
- Responsive: nav colapsa a fila envuelta ≤920px y se oculta ≤560px (implementa un menú móvil propio en tu framework).

### 2. Hero
- Grid 2 columnas (1.15fr / 0.85fr), gap `--s-8`, centrado vertical.
- Izq: eyebrow con franja → título con contraste de peso (líneas thin 200 + línea bold con "&" en acento) → lead → 2 CTA (acento "Escuchar Pertinente" + link "Trabajar conmigo →") → pie de página 13px.
- Der: **retrato circular con el anillo morado limpio** (la firma gráfica de la marca). Círculo `aspect-ratio: 1/1`, **B&N** (`filter: grayscale(1) contrast(1.04)`), anillo de 2px en `--accent` vía `::after` con `inset:-12px`. Es el motivo de marca; aparece también como avatar pequeño en el header (`.cr-mark--sm`) y como mark magenta en el footer (`.cr-mark--md.cr-mark--ondark`).

### 3. Building (Navigamo / The AI Collective)
- Fondo `--bg-pure`, hairlines arriba/abajo. Dos filas grid (0.8fr / 1.2fr) separadas por hairline.
- Cada fila: izq eyebrow+franja, nombre 34px tracking −0.04em, rol en acento 14px bold; der body 18px.
- Abajo: fila de partners — label uppercase + nombres (Anthropic, Microsoft, Nvidia, Amazon, Perplexity, Meta) como texto 17px, NO logos.

### 4. Lo último (podcasts)
- Grid 2 columnas, gap `--s-6`. Dos cards (`.cr-pod`) con borde, `--radius-lg`, hover `--elev-1`.
- Card art arriba (`aspect-ratio: 16/7`, background-image con las carátulas reales). Body: meta uppercase + nombre 26px + desc + CTA.
- **Pertinente** usa identidad propia (meta en rojo `#C0392B`), CTA acento. **Métase en mi cabeza** CTA ghost.

### 5. Del blog
- Fondo `--bg-pure`, hairlines. Head: título + link "Ver todo el blog →".
- Lista de posts como filas grid (160px categoría / título / meta), separadas por hairline. Hover desplaza padding-left `--s-4`. Categoría en acento uppercase, título 20px tracking −0.02em.

### 6. Tesis (DARK)
- Fondo `--dark`, texto claro. Eyebrow con **franja magenta**. Título display en blanco.
- Grid 3 columnas. Cada item: borde superior 2px `#C75CA6`, número 40px en `#C75CA6`, título 21px blanco, body en `--ink-on-dark-2`.

### 7. Trabajar conmigo
- Grid 2 cards (Advisory / Speaking) con borde, padding `--s-7`.
- Cada card: título 26px, body, lista con marcador de **franja** (barra de 14×3px en `::before`, color acento), CTA primary al fondo (`margin-top:auto`).

### 8. Historia
- Fondo `--bg-pure`, hairlines. Lista (`ol`) de 5 capítulos como filas grid (140px años / contenido), separadas por hairline.
- Años en acento 14px bold; título 22px; body 15.5px máx 64ch.

### 9. Contacto (DARK)
- Fondo `--dark`. Grid 2 columnas. Izq: eyebrow franja magenta + título 38px + email en `#C75CA6`.
- Der: formulario con **inputs de solo borde inferior** (sin cajas). Label uppercase 11px. Focus: borde inferior `#C75CA6` 2px.
- "Qué necesita": 3 toggles tipo pill (Advisory/Speaking/Otro); el activo va en `#C75CA6`. Es la única interacción real — está en el `<script>` al final del HTML; pórtala a estado de componente.

### 10. Footer (DARK, casi negro)
- Fondo `#0E0B12`. Grid: marca + tagline | 3 columnas de links (Contenido, Trabajo, Redes). Barra inferior: copyright + "Hecho con criterio en Bogotá." Links hover `#C75CA6`.

---

## Interacciones & comportamiento
- **Nav**: scroll suave a anclas (`#ultimo`, `#blog`, etc.). Implementa con scroll-behavior o el router de tu framework.
- **Toggle "Qué necesita"**: 3 opciones excluyentes; guarda la elección en estado y refléjala en el envío. (En la referencia es vanilla JS al final de `index.html`.)
- **Form submit**: en la referencia solo cambia el texto del botón a "Recibido. Gracias". Conéctalo a tu backend / servicio real.
- **Hover de cards** (`.cr-pod`, `.cr-work__card`): elevan con `--elev-1`. **Hover de posts del blog**: desplazan padding-left.
- **Transiciones**: 160–280ms, ease `cubic-bezier(.2,.7,.2,1)`. Sin bounce ni spring.

## Responsive
- Breakpoint principal **920px**: todos los grids de 2+ columnas pasan a 1 columna; el grid de Tesis pasa a 1 col; las filas de blog e historia se apilan.
- **560px**: el nav del header se oculta (implementa menú hamburguesa propio).

## Assets
- `assets/camilo-hero.jpg` — retrato editorial (se aplica grayscale por CSS; el original viene a color).
- `assets/navigamo-logo.svg`, `assets/aicollective-logo.svg` — logos reales de las compañías (gris #333, van sobre fondo claro en la sección "Construyo IA").
- `assets/pertinente-cover.jpg`, `assets/memc-cover.jpg` — carátulas reales de los podcasts (cuadradas 600×600).
- Fuentes en `fonts/` (Helvetica Neue, licenciada — confirma que la licencia cubra uso web/embedding antes de publicar).

> **Contenido:** la copia es **verbatim de camilo-ramirez.com** (mayo 2026): la home (`index.html`), el índice del blog (`blog.html`), el ensayo de muestra (`blog-post.html` = el post real "China le quitó una empresa a Meta…") y la historia completa (`historia.html`, 6 capítulos). Los em-dashes del original se convirtieron a coma/punto según la regla de marca. Las listas de episodios en `pertinente.html`/`metase.html` son representativas (el sitio en vivo enlaza a Spotify/YouTube; solo el último episodio de cada uno es real).

## Notas de implementación
- **Mapea `tokens.css` a tu sistema** (CSS vars nativas, Tailwind `theme.extend`, o tu librería de tokens). No hardcodees hex ni tamaños.
- Las clases `cr-*` son BEM-ish; si usas componentes, conviértelas en props/variants (p.ej. `<Button variant="accent|primary|ghost|link">`).
- **Header y footer se repiten en las 7 páginas**: extráelos a un layout/partial compartido en tu framework en vez de duplicarlos.
- **El anillo (`.cr-mark`)** es la firma de la marca: avatar en el header, retrato grande en el hero, mark magenta en el footer. Mantenlo como componente reutilizable. Sobre oscuro usa el anillo magenta (`.cr-mark--ondark`).
- **Iconos Lucide a 1.75** (`<script src="...lucide...">` + `lucide.createIcons()`): redes del footer (youtube/linkedin/instagram) y botones play de episodios. Si tu stack tiene un set de íconos, usa el equivalente a 1.75 de trazo.
- **Fraunces** (serif editorial) se usa con moderación: cita destacada del ensayo (`.cr-article__pull`) y **drop-cap** del primer párrafo (`::first-letter`). No la extiendas a UI.
- El contraste de peso del hero depende de tener Helvetica Neue UltraLight (200) cargada, está en `fonts/`.
- Mantén la regla del acento-sobre-oscuro (`#C75CA6`): si reutilizas `--accent` directo sobre `--dark`, se ve mal.

## Páginas internas (plantillas en `pages.css`)

### blog.html — Índice
- Banner (`.cr-pagehead`) con eyebrow+franja, título y lead.
- **Filtro** (`.cr-filter`): chips tipo pill; el activo va en `--ink` sólido. Demo en `<script>`; pórtalo a filtrado real por query/router.
- **Post destacado** (`.cr-ix__feature`): grid 2col (media 4/3 + copy con categoría, título grande, extracto, meta).
- **Lista** reutiliza `.cr-post` (categoría / título / meta) separada por hairlines, con hover de padding-left.

### blog-post.html — Detalle de ensayo
- Columna de lectura centrada, máx 720px (`.cr-article__wrap`).
- Breadcrumb → categoría → título (clamp 32–52px, tracking −0.04em) → byline con hairline.
- **Lede** 21px peso 500. Cuerpo 17px/1.7. Subtítulos `h2` 26px. **Cita destacada** (`.cr-article__pull`) en Fraunces itálica con borde izquierdo de acento.
- Pie con "volver al blog" + CTA. Abajo, bloque "Seguir leyendo" con 2 posts.

### pertinente.html / metase.html — Podcasts
- Banner **oscuro** (`.cr-pagehead--dark`) con grid: carátula cuadrada (280px) + meta/título/desc/plataformas. Plataformas como pills con borde claro, hover magenta.
- Título del podcast muy grande (clamp 40–72px). Pertinente identidad propia; Métase su variante.
- **Lista de episodios** (`.cr-ep`): número mono en acento / título+desc / duración / botón play circular (se rellena de acento en hover). Pórtalo a un reproductor real.

### speaking.html — Speaking (detalle, reemplaza trabajar.html)
- 10 secciones: hero, diferenciador, 3 temas numerados, 5 formatos, logística (dl), prueba social (eventos), docencia, otros podcasts, FAQ, contacto oscuro. Usa franja + display treatments. La antigua `trabajar.html` fue eliminada; "Advisory" en el footer ahora ancla a `index.html#trabajar`.
- (legado) Banner claro + dos bloques (`.cr-svc__block`, grid 0.9/1.1): Advisory y Speaking, cada uno con eyebrow, título grande, body, y lista con sub-ítems (título + descripción) marcados con la **franja** en `::before`. CTA por bloque.
- Cierra con **banda CTA oscura** centrada (`.cr-cta-band`).

### historia.html — Trayectoria
- Banner + lista (`ol.cr-tray__list`, máx 920px) de 5 capítulos: años en acento / título / cuerpo, separados por hairlines. CTA al final.

## Interacciones nuevas (además de la home)
- **Filtro del blog**: chips excluyentes; el activo en sólido. (Demo vanilla en `blog.html`.)
- **Botón play de episodios**: hover lo rellena de acento. Conéctalo a tu reproductor.
- **Navegación entre páginas**: enlaces `<a>` normales entre archivos `.html`. En tu framework, rutas del router.
