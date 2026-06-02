---
title: 'Style guide del blog: cómo se ve un post con todos los elementos.'
description: 'Pieza interna invisible que muestra cómo se renderiza cada elemento del template editorial. Si está leyendo esto, entró por URL directa.'
date: 2026-06-01
categories: [aprende]
hidden: true
tldr: 'Este post no es contenido público. Es la referencia visual del style guide: cada elemento markdown y cada bloque opcional del frontmatter renderizado en un solo lugar.'
pullquote: 'Cualquier post nuevo hereda este tratamiento. Lo único que cambia es el copy.'
aside: 'Esta es una nota lateral opcional. En desktop flota a la derecha. En mobile pasa a bloque debajo del párrafo.'
---

Este es un párrafo en body-lg con interlineado holgado. El primer carácter del cuerpo se renderiza como capital ornamentada en Fraunces italic morada. Dentro del texto pueden ir **negritas**, *itálicas* y [enlaces con acento morado](#). El ancho de lectura está fijado a 720px para que cualquier línea quepa cómoda sin obligar al ojo a saltar.

## Heading 2 con franja morada inline

El `## Heading 2` viene con una franja morada de 24px pegada a la izquierda del título, alineada con la baseline. Se usa para abrir secciones grandes dentro de un mismo artículo.

## Heading 2 inmediatamente después de otro H2

Dos `## Heading 2` consecutivos respiran entre sí: el segundo deja aire arriba aunque no haya párrafo en medio. Es uno de los edge cases probados del template.

### Heading 3 sin franja

El `### Heading 3` es un subtítulo más discreto, sin franja, para subdividir dentro de una sección grande.

Volvemos al body. Esto es solo un párrafo normal para ver el ritmo entre headings y prosa.

> Cita de varios párrafos en Fraunces italic con barra de acento morado. El primer párrafo plantea la idea, con una [fuente enlazada](#) y una palabra en **negrita** que deben ganar el estilo del blockquote.
>
> El segundo párrafo cierra el argumento, manteniendo el tratamiento Fraunces sin cortarse entre bloques.

Lista desordenada con viñeta de franja:

- Primer punto. La franja morada reemplaza al bullet del browser.
- Segundo punto, con **negrita dentro** que mantiene su peso.
- Tercer punto, con [enlace dentro](#) que mantiene su accent.

Lista ordenada con números acento, anidando una desordenada:

1. Primer paso.
2. Segundo paso, con sub-puntos:
   - Sub-punto anidado uno.
   - Sub-punto anidado dos.
3. Tercer paso, con **negrita** y [enlace](#) dentro del ítem.

Lista desordenada anidando una ordenada:

- Punto principal.
  1. Paso anidado uno.
  2. Paso anidado dos.
- Otro punto principal.

Código en línea como `npm install` dentro de una frase, y un bloque de código:

```
const criterio = (ruido, señal) => {
  return señal.filter(x => x.importa);
};
```

---

Un divider arriba se renderiza como una franja morada centrada en lugar de una línea horizontal. Lo usamos para separar bloques temáticos sin abrir una nueva sección con h2.

![Imagen del post de 16:9](/camilo-hero.jpg "Pie de imagen en estilo eyebrow, debajo de la figura full-width")

Después de la figura, el párrafo siguiente debe respetar un margen superior y no pegarse al caption. Es otro edge case probado.

Aquí termina el cuerpo del artículo. Debajo, el footer del post inyecta automáticamente: divider con franja, bio circular con foto, caja oscura "Si esto le sirvió" con dos CTAs, y el link "Más en el blog".
