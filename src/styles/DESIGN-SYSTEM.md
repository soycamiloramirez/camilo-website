# Contrato del Design System

> Este documento define las variables CSS que `src/styles/tokens.css` DEBE
> exponer para que el sitio renderice sin valores rotos. Cualquier design
> system que se adopte tiene que llenar al menos estas vars.
>
> Si un DS nuevo trae componentes semánticos propios (`.cr-btn`, `.cr-ring`,
> etc.), perfecto. Pero el contrato mínimo es este.

## Cómo aplicar un DS nuevo

1. Reemplazar `src/styles/tokens.css` con el del DS (o reescribirlo con sus
   valores), respetando los nombres de variable de abajo.
2. Si el DS trae fuentes self-hosted, copiarlas a `public/fonts/` y agregar
   los `@font-face` al inicio de `tokens.css`.
3. Si el DS introduce un token nuevo (ej. `--accent-warm`), agregarlo a
   `tokens.css` y mapearlo en `global.css` dentro de `@theme` para que
   exista como utility de Tailwind.
4. Si el DS pide formas (portrait circular con ring, franja, etc.) que el
   sitio no usa, eso es trabajo de componente (Fase 3), no de tokens.
5. `npm run build` y deploy.

---

## Variables OBLIGATORIAS en `tokens.css`

### Surfaces
- `--bg` — canvas principal
- `--bg-soft` — fondo sutil para cards / hover
- `--dark` — superficie oscura (footer, dark sections)
- `--dark-2` — card sobre dark

### Texto
- `--ink` — texto primario
- `--ink-2` — texto secundario
- `--ink-3` — texto terciario / meta / mute
- `--ink-on-dark` — texto sobre fondos oscuros
- `--ink-on-dark-2` — texto secundario sobre oscuro

### Hairlines
- `--rule` — divisor por defecto
- `--rule-strong` — divisor más visible
- `--rule-on-dark` — divisor sobre fondo oscuro

### Accent
- `--accent` — color primario de marca
- `--accent-deep` — hover / depth
- `--accent-soft` — secundario / highlight
- `--accent-on-dark` — accent ajustado para fondos oscuros (no usar el
  saturado directo en negro; suele vibrar)

### Tipografía: familias
- `--font-sans` — UI principal
- `--font-display` — display (puede ser igual a `--font-sans` o distinta)
- `--font-serif` — editorial / acentos
- `--font-mono` — monoespaciada (legacy)

### Tipografía: escala
- `--text-display-1`, `--text-display-2`
- `--text-h1`, `--text-h2`, `--text-h3`, `--text-h4`
- `--text-eyebrow`
- `--text-body-lg`, `--text-body`, `--text-caption`, `--text-meta`

### Tipografía: tracking
- `--tracking-display`, `--tracking-tight`, `--tracking-heading`,
  `--tracking-eyebrow`, `--tracking-label`, `--tracking-wide`

### Tipografía: line-height
- `--leading-tight`, `--leading-display`, `--leading-heading`,
  `--leading-snug`, `--leading-body`, `--leading-relaxed`

### Tipografía: weight
- `--weight-thin` (200) hasta `--weight-bold` (700)

### Spacing (8-pt base)
- `--s-1` (4) hasta `--s-10` (160)

### Radii
- `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-pill`, `--radius-circle`

### Motion
- `--ease`, `--ease-out`
- `--dur-fast`, `--dur-base`, `--dur-slow`

### Elevation
- `--elev-0`, `--elev-1`

### Layout
- `--container`, `--container-narrow`, `--container-text`, `--header-h`

---

## Mapeo a clases Tailwind (`global.css`)

Estas son las utilities que el sitio usa hoy y que dependen de los tokens
de arriba:

| Token CSS | Clase Tailwind |
|---|---|
| `--bg` | `bg-paper` |
| `--bg-soft` | `bg-soft` |
| `--ink` | `bg-ink`, `text-ink` |
| `--ink-3` | `text-mute` |
| `--rule` | `border-rule` |
| `--accent` | `bg-accent`, `text-accent`, `border-accent`, `decoration-accent` |
| `--accent-deep` | `bg-accent-deep` |
| `--accent-soft` | `text-accent-soft` |
| `--font-sans` | `font-sans` |
| `--font-display` | `font-display` |
| `--text-display-1` | `text-display-1` |
| `--text-h1` | `text-h1` |
| `--text-h2` | `text-h2` |
| `--text-eyebrow` | `text-eyebrow` |
| `--text-body-lg` | `text-body-lg` |
| `--text-body` | `text-body` |
| `--tracking-display` | `tracking-display` |
| `--tracking-eyebrow` | `tracking-eyebrow` |
| `--leading-display` | `leading-display` |
| `--leading-body` | `leading-body` |
| `--s-5` | `mt-s5`, `p-s5`, `gap-s5`, etc. |
| `--radius-md` | `rounded-md` |
| `--radius-pill` | `rounded-pill` |

## Reglas para los componentes

1. **Cero arbitrary values en componentes nuevos.** Nada de
   `text-[40px]`, `mt-7`, `tracking-[-0.035em]`. Si necesitas un valor:
   - ¿Existe en `tokens.css`? Úsalo como utility (`text-h1`).
   - ¿No existe? Añádelo a `tokens.css` con un nombre semántico
     (`--text-display-3`) y mapéalo en `global.css`.
2. **Componentes semánticos > clases sueltas.** Cuando exista
   `<Eyebrow>`, `<Display1>`, `<PrimaryButton>`, etc. (Fase 3), usar
   esos en vez de combinar utilities a mano.
3. **Dark mode = `.bg-ink`.** Cualquier sección con `bg-ink` activa el
   override que cambia `text-accent` por `text-accent-on-dark`.

## Fase actual del refactor

- ✅ **Fase 1 (esta)**: tokens.css separado + mapeo Tailwind completo.
  El sitio se ve igual; cualquier token swap mueve la base.
- 🔲 **Fase 2**: barrer arbitrary values en componentes.
  `text-[40px]` → `text-display-1`, etc.
- 🔲 **Fase 3**: componentes semánticos (`<Eyebrow>`, `<Display1>`,
  `<PrimaryButton>`, `<Portrait>`, `<Card>`, `<Field>`, `<Franja>`).
