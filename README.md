# Portafolio — Pablo Jonattan Alonso Anaya

Sitio de portafolio personal construido con **Next.js 16** (App Router), **TypeScript**,
**Tailwind CSS** y **Motion** (la evolución de Framer Motion). Tomado como base la
estructura de [`portfolio-template`](https://github.com/Sofiane-Bahmed/portfolio-template)
(MIT) y rediseñado desde cero con una identidad propia inspirada en el trabajo diario con
SQL, ETL y análisis de datos: una consola de "query" animada como elemento central del
hero, etiquetas de sección con estilo `SELECT * FROM tabla;`, y un diagrama de pipeline
(Extract → Transform → Load → Insight).

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + **TypeScript**
- **Tailwind CSS 3** con tokens de diseño personalizados (`tailwind.config.ts`)
- **motion** (`motion/react`) para animaciones de entrada, scroll-reveal y el efecto de
  escritura en la consola del hero
- **lucide-react** para iconografía

## Estructura

```
app/
  layout.tsx        # Fuentes (Space Grotesk, Inter, JetBrains Mono) + metadata SEO
  page.tsx           # Composición de secciones
  globals.css         # Estilos base y variables
components/
  sections/           # navbar, hero, about, skills, experience, projects, contact, footer
  ui/                  # query-console (hero), pipeline-diagram, section-header
lib/
  data.ts              # Todo el contenido (perfil, experiencia, skills, educación...)
    tomado directamente del CV — edítalo aquí para actualizar el sitio
```

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). La primera compilación descarga las
fuentes de Google Fonts (Space Grotesk, Inter, JetBrains Mono), así que necesitas conexión
a internet la primera vez.

## Cómo actualizar el contenido

Todo el texto del sitio (perfil, experiencia laboral, skills, educación, certificaciones,
proyectos y datos de contacto) vive en un solo archivo: **`lib/data.ts`**. No necesitas
tocar los componentes para actualizar información — solo edita ese archivo.

## Build de producción

```bash
npm run build
npm start
```

## Despliegue

El proyecto está listo para desplegarse en [Vercel](https://vercel.com) (creador de
Next.js) sin configuración adicional: conecta el repositorio de GitHub y Vercel detecta
automáticamente el framework.

## Pendientes sugeridos

- Agregar capturas o enlaces en vivo de los proyectos de ACRYLITEC y Premium Brand
  Restaurant si se pueden compartir públicamente.
- Conectar un formulario de contacto real (por ejemplo con Resend o un endpoint propio)
  si se desea recibir mensajes directamente desde el sitio.
- Añadir un favicon/logo personalizado en `app/icon.svg`.
