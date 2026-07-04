# CONTEXT.md — Registro de Mejoras Aplicadas

**Fecha:** 2026-07-01
**Proyecto:** Portfolio Personal — Pablo Jonattan Alonso Anaya
**Stack:** Next.js 16 + React 19 + Tailwind CSS + Motion + TypeScript

---

## Resumen de Cambios

### 1. SEO y Meta Tags (Crítico)

**Archivos modificados:**
- `app/layout.tsx` — Se agregaron Open Graph, Twitter Cards, `metadataBase`, `alternates.canonical`, `robots` config, y `template` para título.
- `app/sitemap.ts` — **Nuevo.** Genera `sitemap.xml` automáticamente.
- `app/robots.ts` — **Nuevo.** Genera `robots.txt` con reglas de acceso.

**Detalles:**
- `metadataBase` apunta a `https://jonattan-alonso.dev` (ajustar dominio real al deploy)
- Open Graph incluye: type, locale (`es_MX`), siteName, images placeholder
- Twitter Card: `summary_large_image`
- Sitemap: frequency mensual, priority 1 para la raíz
- Robots: permite todo, referencia sitemap

---

### 2. Seguridad — Variables de Entorno (Alto)

**Archivos creados/modificados:**
- `.env.local` — Variables sensibles (email, phone, github)
- `.env.example` — Plantilla para otros desarrolladores
- `.gitignore` — **Nuevo.** Excluye `node_modules`, `.next`, `.env*.local`, etc.
- `lib/data.ts` — `profile.email`, `profile.phone`, `profile.github` ahora leen de `process.env.NEXT_PUBLIC_*` con fallback a los valores originales

**Detalles:**
- `NEXT_PUBLIC_EMAIL` — Correo electrónico
- `NEXT_PUBLIC_PHONE` — Teléfono
- `NEXT_PUBLIC_GITHUB_URL` — URL de GitHub
- Los `NEXT_PUBLIC_*` están expuestos al cliente (necesario para `mailto:`, `tel:`, `target="_blank"`)
- Si se necesita mayor seguridad, usar Server Actions o API routes

---

### 3. TypeScript — Type Safety (Alto)

**Archivos modificados:**
- `lib/data.ts` — Se definieron 8 interfaces: `Profile`, `SkillGroup`, `Experience`, `Project`, `Education`, `Certification`, `Language`, `NavItem`. Cada export const ahora tiene tipo explícito.
- `components/ui/section-header.tsx` — Se extrajo interfaz `SectionHeaderProps` de la definición inline.

**Interfaces creadas:**
```typescript
interface Profile { name: string; shortName: string; role: string; ... }
interface SkillGroup { table: string; label: string; items: string[]; }
interface Experience { id: string; role: string; org: string; period: string; points: string[]; stack: string[]; }
interface Project { id: string; title: string; org: string; description: string; tags: string[]; }
interface Education { title: string; org: string; period: string; }
interface Certification { title: string; org: string; year: string; }
interface Language { name: string; level: string; }
interface NavItem { href: string; label: string; table: string; }
interface SectionHeaderProps { table: string; title: string; description?: string; }
```

---

### 4. Server Components (Alto)

**Estado:** Verificado — la arquitectura ya es correcta.

| Componente | Tipo | Razón |
|---|---|---|
| `app/layout.tsx` | Server | No usa hooks ni motion |
| `app/page.tsx` | Server | Composición de Client Components |
| `components/sections/footer.tsx` | Server | No usa `"use client"` |
| `components/sections/*.tsx` | Client | Requieren `motion` para animaciones scroll-triggered |
| `components/ui/*.tsx` | Client | Requieren `motion` o `useState` |

**Nota:** En Next.js App Router, los Server Components pueden importar Client Components. El patrón actual es correcto: la página es Server, las secciones animadas son Client.

---

### 5. Archivos Nuevos Creados

| Archivo | Propósito |
|---|---|
| `app/sitemap.ts` | Generación automática de sitemap.xml |
| `app/robots.ts` | Generación automática de robots.txt |
| `app/not-found.tsx` | Página 404 personalizada |
| `app/error.tsx` | Error boundary con botón de retry |
| `.env.local` | Variables de entorno sensibles (no commitear) |
| `.env.example` | Plantilla de variables de entorno |
| `.gitignore` | Exclusiones de git (node_modules, .next, .env*) |
| `.agents/CONTEXT.md` | Este archivo |

---

### 7. Accesibilidad — Skip-to-Content Link (Medio)

**Archivo modificado:** `app/layout.tsx`

**Detalles:**
- Se agregó un enlace `<a href="#top">` con clases `sr-only focus:not-sr-only`
- Invisible visualmente, aparece solo con navegación por teclado (Tab)
- Estilo consistente con el diseño: fondo `bg-signal`, texto `text-bg`
- Posicionado fijo en esquina superior izquierda

---

### 8. Accesibilidad — Focus Trap Navbar Móvil (Medio)

**Archivo modificado:** `components/sections/navbar.tsx`

**Detalles:**
- **Refs:** `menuButtonRef` para el botón hamburguesa, `menuRef` para el menú móvil
- **Focus inicial:** Al abrir, foco se mueve al primer enlace del menú
- **Escape:** Cierra el menú y retorna foco al botón hamburguesa
- **Tab trapping:** Tab循环 se mantiene dentro del menú abierto
- **ARIA:** `aria-expanded`, `aria-controls`, `role="menu"`, `role="menuitem"`

**Flujo de teclado:**
```
1. Tab hasta botón hamburguesa → Enter abre menú
2. Foco en primer enlace del menú
3. Tab循环 dentro del menú (5 links)
4. Escape cierra menú → foco vuelve al botón
5. Shift+Tab desde primer enlace → va al último (loop)
```

---

### 9. Build Verificado (Actualizado)

```
✓ Compiled successfully in 32.0s
✓ TypeScript passed
✓ Static pages generated (5/5)

Routes:
├ ○ /              (main page)
├ ○ /_not-found    (404 personalizada)
├ ○ /robots.txt    (generated)
└ ○ /sitemap.xml   (generated)
```

---

## Pendiente (Mejoras Bajas)

- [x] **Contact Form:** Formulario real con validación y server action
- [x] **CI/CD:** GitHub Actions workflow para lint y build
- [x] **Pre-commit hooks:** husky + lint-staged
- [x] **Analytics:** Vercel Analytics
- [ ] **OG Image:** Crear imagen real `public/og-image.png`
- [x] **Dominio:** Actualizar `SITE_URL` en `layout.tsx`, `sitemap.ts`, `robots.ts` con el dominio real de deploy

---

### 10. Contact Form (Bajo)

**Archivos creados/modificados:**
- `app/actions/contact.ts` — **Nuevo.** Server action con validación de campos (nombre, email, asunto, mensaje). Incluye TODO para integrar con servicio de email (Resend, Formspree).
- `components/ui/contact-form.tsx` — **Nuevo.** Componente cliente con formulario controlado, estados de carga/éxito/error, y diseño consistente con el tema SQL.
- `components/sections/contact.tsx` — Modificado. Se agregó formulario debajo de los canales de contacto.

**Detalles:**
- Validación client-side (HTML5 + minLength) y server-side (regex email, longitudes mínimas)
- Estados: idle → submitting → success/error
- Loading spinner animado con `Loader2` de lucide
- Mensajes de feedback con iconos (CheckCircle, AlertCircle)
- Server action preparado para integrar con Resend (ver TODO en `app/actions/contact.ts`)

---

### 11. CI/CD — GitHub Actions (Bajo)

**Archivos creados:**
- `.github/workflows/ci.yml` — **Nuevo.** Workflow que ejecuta en push/PR a main:
  1. Checkout del código
  2. Setup Node.js 20 con cache npm
  3. `npm ci` (instalación limpia)
  4. `npm run lint`
  5. `npx tsc --noEmit` (type check)
  6. `npm run build`

---

### 12. Pre-commit Hooks — Husky + lint-staged (Bajo)

**Archivos creados/modificados:**
- `.husky/pre-commit` — **Nuevo.** Ejecuta `npx lint-staged` antes de cada commit.
- `.lintstagedrc.json` — **Nuevo.** Configuración de lint-staged:
  - `*.{ts,tsx}` → eslint --fix + prettier --write
  - `*.{json,md,yml,yaml,css}` → prettier --write
- `package.json` — Se agregaron dependencias: `husky`, `lint-staged`

**Setup:**
```bash
git init                    # Inicializar repo (si no existe)
npm install -D husky lint-staged
npx husky init
# Crear .husky/pre-commit con: npx lint-staged
chmod +x .husky/pre-commit
```

---

### 13. Analytics — Vercel Analytics (Bajo)

**Archivos modificados:**
- `app/layout.tsx` — Se agregó import y componente `<Analytics />` de `@vercel/analytics/react`.
- `package.json` — Se agregó dependencia: `@vercel/analytics`.

**Detalles:**
- Analytics se carga automáticamente en todas las páginas
- Compatible con Vercel部署 (zero-config)
- No requiere configuración adicional (usa el ID del proyecto de Vercel)

---

### 14. Build Verificado (Final)

```
✓ Compiled successfully in 29.0s
✓ TypeScript passed
✓ Static pages generated (5/5)

Routes:
├ ○ /              (main page)
├ ○ /_not-found    (404 personalizada)
├ ○ /robots.txt    (generated)
└ ○ /sitemap.xml   (generated)
```

---

## Resumen Final de Archivos

### Archivos Nuevos (16)
| Archivo | Propósito |
|---|---|
| `app/sitemap.ts` | Generación automática de sitemap.xml |
| `app/robots.ts` | Generación automática de robots.txt |
| `app/not-found.tsx` | Página 404 personalizada |
| `app/error.tsx` | Error boundary con retry |
| `app/actions/contact.ts` | Server action para formulario de contacto |
| `components/ui/contact-form.tsx` | Formulario con validación y feedback |
| `components/ui/particle-background.tsx` | Fondo de partículas interactivo con mouse |
| `components/ui/scroll-progress.tsx` | Barra de progreso de scroll con spring physics |
| `.github/workflows/ci.yml` | CI pipeline (lint + typecheck + build) |
| `.husky/pre-commit` | Pre-commit hook para lint-staged |
| `.lintstagedrc.json` | Configuración de lint-staged |
| `.env.local` | Variables de entorno sensibles |
| `.env.example` | Plantilla de variables de entorno |
| `.gitignore` | Exclusiones de git |
| `eslint.config.mjs` | Configuración ESLint flat config |
| `public/preview-bgg.png` | Screenshot de Black Ghost's Garage |

### Archivos Modificados (10)
| Archivo | Cambios |
|---|---|
| `app/layout.tsx` | OG/Twitter tags, skip-to-content, Analytics, ParticleBackground, ScrollProgress |
| `app/globals.css` | GPU utilities, scroll reveal, hover-lift, focus-visible, reduced-motion |
| `lib/data.ts` | Interfaces TypeScript, env vars, LinkedIn field |
| `components/ui/section-header.tsx` | Interfaz SectionHeaderProps, GPU acceleration |
| `components/ui/query-console.tsx` | GPU acceleration |
| `components/ui/pipeline-diagram.tsx` | GPU acceleration |
| `components/sections/contact.tsx` | Formulario de contacto, GPU acceleration |
| `components/sections/navbar.tsx` | Focus trap, ARIA, LinkedIn link, "Jonattan Anaya" |
| `components/sections/hero.tsx` | Removido grid background, ParticleBackground global |
| `components/sections/*.tsx` | GPU acceleration en todos los componentes animados |

---

## Skills Instaladas

| Skill | Fuente | Propósito |
|---|---|---|
| `find-skills` | vercel-labs/skills | Buscar e instalar skills |
| `frontend-design` | anthropics/skills | Guías de diseño UI visual |
| `fixing-motion-performance` | ibelick/ui-skills | Optimización de animaciones GPU |
| `scroll-experience` | sickn33/antigravity-awesome-skills | Experiencias de scroll inmersivas |

---

## Resumen de Cambios Visuales

### 15. Particle Background (Visual)

**Archivo creado:** `components/ui/particle-background.tsx`

**Detalles:**
- Canvas con 100 partículas de polvo que flotan suavemente
- Interacción con mouse: las partículas se alejan al acercar el cursor
- Colores de la paleta: signal (#4C8DFF), insight (#F5A623), text-muted
- Canvas con DPR scaling para nitidez en pantallas retina
- `position: fixed` para cubrir toda la web (no solo hero)
- `pointer-events: none` para no interferir con interacciones

**Configuración:**
```typescript
PARTICLE_COUNT = 100
MOUSE_RADIUS = 150px
MOUSE_FORCE = 0.025
FRICTION = 0.96
BASE_SPEED = 0.25
```

---

### 16. GPU Optimization (Rendimiento)

**Archivos modificados:** Todos los componentes animados

**Detalles:**
- Clase `.gpu-accelerated` con `will-change: transform` + `translateZ(0)`
- Solo se animan propiedades compositoras: `transform` y `opacity`
- `backface-visibility: hidden` para prevenir flickering
- `prefers-reduced-motion` desactiva todas las optimizaciones

**Componentes optimizados:**
- `hero.tsx` — todos los motion elements
- `query-console.tsx` — contenedor principal
- `pipeline-diagram.tsx` — nodos del diagrama
- `section-header.tsx` — encabezados de sección
- `skills.tsx` — cards de habilidades
- `experience.tsx` — timeline de experiencia
- `projects.tsx` — cards de proyectos
- `contact.tsx` — canales y formulario
- `about.tsx` — párrafo de resumen

---

### 17. Scroll Progress (Experiencia)

**Archivo creado:** `components/ui/scroll-progress.tsx`

**Detalles:**
- Barra de progreso fija en la parte superior
- Gradiente de signal → insight que sigue el scroll
- Spring physics para movimiento suave
- `z-index: 60` para estar sobre el contenido pero bajo el navbar

---

### 18. CSS Utilities (Visual)

**Archivo modificado:** `app/globals.css`

**Nuevas clases:**
```css
.gpu-accelerated    /* will-change + translateZ(0) + backface-visibility */
.hover-lift         /* translateY(-2px) en hover con cubic-bezier */
.animate-reveal     /* keyframe reveal-up para scroll */
:focus-visible      /* outline azul consistente */
```

---

## Build Verificado (Final)

```
✓ Compiled successfully in 15s
✓ TypeScript passed
✓ Static pages generated (5/5)

Routes:
├ ○ /              (main page)
├ ○ /_not-found    (404 personalizada)
├ ○ /robots.txt    (generated)
└ ○ /sitemap.xml   (generated)
```

---

## Dominio

- **Producción:** `https://jonattan-anaya-dev.vercel.app`
- **Alias Vercel:** `jonattan-anaya-dev.vercel.app`
- **GitHub:** `https://github.com/YonAnn99/portafolio_jonattan_anaya_dev`

