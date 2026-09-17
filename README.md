# RED-RIIBA · Frontend

> Sitio web oficial de la **Red Internacional de Investigación en Bienestar Animal (RED-RIIBA)** — una red académica y científica que articula instituciones de educación superior, centros de investigación y entidades gubernamentales de América Latina, el Caribe y África bajo el enfoque *Una Sola Salud – Un Bienestar*.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-000?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-Proprietary-red)](#licencia)

---

## 📖 Acerca del proyecto

RED-RIIBA es una red internacional que promueve la investigación, formación y cooperación en bienestar animal. Este repositorio contiene el **frontend público** del sitio: un sitio multilingüe (español/inglés) con arquitectura **App Router**, renderizado en servidor (SSR/SSG) y contenido editorial gestionado mediante MDX.

### ✨ Características

- 🌍 **Internacionalización completa** — Español e inglés con `next-intl`, incluyendo rutas, textos y contenido MDX.
- ⚡ **Server Components** — Páginas renderizadas en servidor para SEO y rendimiento.
- 🎨 **Sistema de diseño propio** — Tokens de color, tipografía y componentes reutilizables.
- 📝 **Contenido editorial en MDX** — Secciones largas (como *Nosotros*) se escriben en Markdown.
- 🧩 **PageHero dinámico** — Cabeceras de página auto-configuradas por ruta.
- 🏛️ **Página de miembros** — Grid de instituciones internacionales con logos y enlaces.
- 📱 **Diseño responsive** — Mobile-first, adaptable a cualquier tamaño.
- 🌗 **Preparado para backend** — Estructura lista para integrarse con una API NestJS.

---

## 🛠️ Stack técnico

| Capa | Tecnología |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev) |
| Lenguaje | [TypeScript 5](https://www.typescriptlang.org) |
| Estilos | [Tailwind CSS 4](https://tailwindcss.com) + `@tailwindcss/typography` |
| i18n | [next-intl 4](https://next-intl-docs.vercel.app) |
| Contenido | [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) |
| Iconos | [react-icons](https://react-icons.github.io/react-icons) |
| Gestor de paquetes | [Yarn 1.22](https://classic.yarnpkg.com) |

---

## 📁 Estructura del proyecto

```
frontend/
├── app/
│   ├── [locale]/                # Rutas internacionalizadas (es / en)
│   │   ├── about/               # Página "Nosotros"
│   │   ├── members/             # Página "Miembros"
│   │   ├── layout.tsx           # Layout raíz con Header/Footer/PageHero
│   │   └── page.tsx             # Home
│   ├── globals.css              # Tokens de diseño + Tailwind
│   └── icon.png
│
├── components/
│   ├── about/                   # Componentes de la página Nosotros
│   ├── content/                 # Renderizador MDX
│   ├── home/                    # Secciones de la home
│   ├── layout/                  # Header, Footer, PageHero, etc.
│   ├── members/                 # Componentes de la página Miembros
│   └── ui/                      # Componentes base (Button, Container)
│
├── content/
│   ├── en/                      # Contenido MDX en inglés
│   └── es/                      # Contenido MDX en español
│
├── i18n/                        # Configuración de next-intl
│   ├── navigation.ts
│   ├── request.ts
│   └── routing.ts
│
├── lib/
│   ├── data/                    # Datos estáticos (miembros, etc.)
│   ├── config.ts                # Configuración del sitio
│   └── navigation.ts            # Definición de rutas
│
├── messages/
│   ├── en/                      # Traducciones en inglés (JSON)
│   └── es/                      # Traducciones en español (JSON)
│
└── public/
    └── images/                  # Assets estáticos
```

---

## 🚀 Empezando

### Requisitos previos

- **Node.js** ≥ 20
- **Yarn** 1.22 (o npm/pnpm, aunque el proyecto usa Yarn)

### Instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/kingdomsoldier/red-riiba.git
cd red-riiba/frontend

# 2. Instala las dependencias
yarn install

# 3. Arranca el servidor de desarrollo
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000). El sitio redirige automáticamente a `/es` (idioma por defecto).

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `yarn dev` | Servidor de desarrollo con hot reload |
| `yarn build` | Build de producción |
| `yarn start` | Sirve el build de producción |
| `yarn lint` | Ejecuta ESLint |
| `yarn lint:fix` | Ejecuta ESLint y corrige automáticamente |
| `yarn typecheck` | Verifica los tipos con TypeScript |

---

## 🌐 Internacionalización

El proyecto soporta dos locales: **español** (`es`, por defecto) y **inglés** (`en`). Todas las rutas viven bajo `app/[locale]/`.

### Estructura de traducciones

Cada idioma tiene su carpeta en `messages/`:

```
messages/
├── es/
│   ├── common.json         # Textos genéricos (menú, botones…)
│   ├── navigation.json     # Labels del menú principal
│   ├── home.json           # Textos de la home
│   ├── about.json          # Textos de "Nosotros"
│   ├── members.json        # Textos de "Miembros"
│   ├── pageHero.json       # Cabeceras de página (auto-detectadas por ruta)
│   ├── footer.json
│   └── social.json
└── en/
    └── ...
```

**Cómo añadir una nueva página:**

1. Crea `app/[locale]/mi-pagina/page.tsx`.
2. Añade textos en `messages/{es,en}/miPagina.json`.
3. Registra el archivo en `i18n/request.ts`.
4. Añade la cabecera a `messages/{es,en}/pageHero.json` bajo la clave `"mi-pagina"`.

El componente `PageHero` detecta automáticamente la ruta y muestra la cabecera correspondiente.

### Contenido MDX

Los artículos largos (como *Nosotros*) se escriben en Markdown:

```
content/
├── es/about.mdx
└── en/about.mdx
```

El componente `MDXContent` los renderiza con estilos de prosa ya configurados.

---

## 🎨 Sistema de diseño

Los tokens de color viven en `app/globals.css` bajo `@theme inline`:

| Token | Valor | Uso |
|---|---|---|
| `riiba-orange` | `#ff8c00` | Acentos, CTAs, badges |
| `riiba-orange-light` | `#ffb74d` | Hover de naranja |
| `riiba-green` | `#4caf50` | Verde principal |
| `riiba-green-dark` | `#1b5e20` | Texto, fondos oscuros |
| `riiba-green-bg` | `#f1f8e9` | Fondos suaves |

Se usan directamente como clases de Tailwind: `bg-riiba-orange`, `text-riiba-green-dark`, etc.

---

## 🔌 Integración con backend

El frontend está preparado para consumir una API externa (NestJS). Cuando esté disponible:

1. Define `NEXT_PUBLIC_API_URL` en `.env.local`.
2. Usa `lib/api/client.ts` (a crear) para centralizar las llamadas.
3. Migra `lib/data/*.ts` a fetches del backend progresivamente.

---

## 🤝 Contribuir

1. Crea una rama desde `main`: `git checkout -b feature/mi-cambio`.
2. Sigue las convenciones del proyecto (componentes en `components/`, textos en `messages/`).
3. Asegúrate de que pasa `yarn lint` y `yarn typecheck`.
4. Abre un Pull Request describiendo el cambio.

### Convenciones de código

- **Idioma de identificadores**: inglés (`navLinks`, `memberCountries`, `pageHero`).
- **Idioma de textos visibles**: en `messages/{locale}/*.json` o `content/{locale}/*.mdx`.
- **Componentes servidor por defecto**; solo `"use client"` cuando se necesite estado o hooks del navegador.
- **Clases de Tailwind**: orden por categoría (layout → spacing → typography → colors → states).

---

## 📄 Licencia

Este proyecto tiene un esquema de **doble licencia**:

- **Código fuente**: [MIT License](LICENSES/MIT.txt)
- **Contenido editorial** (archivos `.mdx` y traducciones): [CC BY 4.0](LICENSES/CC-BY-4.0.txt)

Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## 📬 Contacto

- **Email**: [redriiba01@gmail.com](mailto:redriiba01@gmail.com)
- **Sitio web**: [redriiba.unica.edu.cu](https://redriiba.unica.edu.cu)
- **Institución coordinadora**: [Universidad de Ciego de Ávila (UNICA)](https://unica.edu.cu)

---

<p align="center">
  <sub>Desarrollado con ❤️ para la comunidad internacional de bienestar animal.</sub>
</p>