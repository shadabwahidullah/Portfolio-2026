# Portfolio

A fast, fully bilingual (**English** + **Persian/فارسی**) personal portfolio built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

It is server-rendered, statically generated per language, and ships almost no JavaScript to the browser — so it scores high on performance, SEO, and accessibility out of the box. Persian is rendered fully **right-to-left (RTL)** with a dedicated font.

---

## Table of contents

- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Design overview](#design-overview)
- [Folder structure](#folder-structure)
- [How internationalization (i18n) works](#how-internationalization-i18n-works)
- [How styling works](#how-styling-works)
- [How to customize](#how-to-customize)
- [Available scripts](#available-scripts)

---

## Tech stack

| Concern        | Choice                          | Why |
| -------------- | ------------------------------- | --- |
| Framework      | Next.js 15 (App Router)         | Server Components, file-based routing, great performance defaults |
| Language       | TypeScript (strict)             | Type safety across the whole app |
| Styling        | Tailwind CSS                    | Utility-first, purged CSS, design tokens via CSS variables |
| i18n           | Custom, dictionary-based        | Zero runtime dependency, fully type-safe, server-only |
| Fonts          | `next/font` (Inter + Vazirmatn) | Self-hosted, no layout shift, per-locale font |

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the app — you'll be redirected to your preferred language
#    http://localhost:3000  ->  /en  or  /fa
```

---

## Design overview

The app is built around a few simple, repeated ideas so the codebase stays **DRY** (Don't Repeat Yourself) and easy to extend:

1. **One source of truth for content.** All text lives in dictionaries (`src/i18n/dictionaries`). Components never hard-code copy; they receive only the translated slice they need.
2. **Composable UI primitives.** Generic building blocks (`Container`, `Section`, `Card`, `Button`, `Badge`) are defined once in `src/components/ui` and reused everywhere, so the look stays consistent and edits happen in one place.
3. **Server-first rendering.** Pages and sections are React Server Components. Only the tiny `LocaleSwitcher` is a Client Component, which keeps the JavaScript bundle minimal.
4. **Design tokens, not magic values.** Colors and fonts are CSS variables mapped to semantic Tailwind classes (`bg-background`, `text-foreground`, `bg-primary`, …). Re-theming is a one-file change.

### Request lifecycle

```
Browser request "/"
      │
      ▼
middleware.ts  ──►  detects language from Accept-Language, redirects to /en or /fa
      │
      ▼
app/[locale]/layout.tsx  ──►  sets <html lang dir>, picks the font, loads the dictionary,
      │                         renders Header + Footer
      ▼
app/[locale]/page.tsx    ──►  loads the dictionary once, passes slices to each Section
      │
      ▼
components/sections/*     ──►  pure presentational UI built from components/ui/*
```

---

## Folder structure

```
portfolio/
├── src/
│   ├── middleware.ts            # Locale detection + redirect (adds /en or /fa to the URL)
│   │
│   ├── app/                     # Next.js App Router (routes + layouts)
│   │   ├── globals.css          # Tailwind layers + design tokens (CSS variables)
│   │   ├── fonts.ts             # next/font setup; chooses Inter (en) or Vazirmatn (fa)
│   │   └── [locale]/            # Dynamic segment: every page lives under a language
│   │       ├── layout.tsx       # Root layout: <html>, dir, fonts, Header/Footer, metadata
│   │       └── page.tsx         # Home page: composes all sections
│   │
│   ├── components/              # All React components, grouped by responsibility
│   │   ├── ui/                  # Generic, reusable primitives (no business logic)
│   │   │   ├── Container.tsx    #   Centered max-width wrapper
│   │   │   ├── Section.tsx      #   Page section w/ heading + spacing + anchor id
│   │   │   ├── Card.tsx         #   Shared "surface" panel
│   │   │   ├── Button.tsx       #   Button OR link, with variants
│   │   │   └── Badge.tsx        #   Small pill for tags/skills
│   │   ├── layout/              # Site chrome shared across pages
│   │   │   ├── Header.tsx       #   Sticky nav + brand + language switcher
│   │   │   ├── Footer.tsx       #   Localized copyright
│   │   │   └── LocaleSwitcher.tsx  # (Client) swaps the locale in the URL
│   │   └── sections/            # The page's content sections
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Projects.tsx
│   │       ├── Skills.tsx
│   │       └── Contact.tsx
│   │
│   ├── i18n/                    # Everything about languages
│   │   ├── config.ts            # Supported locales, directions, names, helpers
│   │   ├── dictionaries.ts      # Type-safe loader; derives the Dictionary type
│   │   └── dictionaries/
│   │       ├── en.ts            # English copy — the SOURCE OF TRUTH for the type
│   │       └── fa.ts            # Persian copy — must match the English keys
│   │
│   ├── lib/
│   │   └── utils.ts             # `cn()` class-name combiner
│   │
│   └── types/
│       └── index.ts             # Shared TypeScript types (route params, nav links, …)
│
├── tailwind.config.ts           # Tailwind theme: semantic tokens + fonts
├── postcss.config.mjs           # Tailwind + Autoprefixer
├── next.config.mjs              # Next.js config (strict mode, standalone output)
├── tsconfig.json                # TypeScript config + "@/..." path alias
└── package.json
```

### What each folder is responsible for

- **`src/app/`** — Routing and page composition only. Files here decide *which* content shows on *which* URL and load the data; they delegate all visuals to components.
- **`src/components/ui/`** — Dumb, reusable building blocks with no knowledge of the portfolio's content. If something is used in more than one place, it belongs here.
- **`src/components/layout/`** — The persistent "frame" of the site (header/footer/switcher) shown on every page.
- **`src/components/sections/`** — The actual content blocks of the home page. Each takes a translated slice and renders it using `ui/` primitives.
- **`src/i18n/`** — The single place that knows about languages: which exist, their direction, and all translated text.
- **`src/lib/`** — Framework-agnostic helper utilities.
- **`src/types/`** — Cross-cutting TypeScript types so definitions aren't duplicated.

---

## How internationalization (i18n) works

The site supports two languages and is designed so **adding a third is mostly a copy-paste**.

1. **Locales are declared once** in `src/i18n/config.ts` (`locales`, `localeDirections`, `localeNames`).
2. **`middleware.ts`** runs on every request. If the URL has no language prefix, it reads the browser's `Accept-Language` header and redirects to the best match (e.g. `/fa/...`). This keeps URLs explicit and SEO-friendly.
3. **`app/[locale]/layout.tsx`** reads the locale from the URL, sets `<html lang dir>` (so Persian flips to RTL automatically), and selects the correct font.
4. **Dictionaries are type-safe.** The `Dictionary` type is *inferred* from `en.ts`. Every other language file (`fa.ts`) is typed as `Dictionary`, so if you add a key in English and forget to translate it, **TypeScript fails the build**.
5. **Dictionaries are server-only.** `dictionaries.ts` imports `server-only`, so translation data never ships to the browser, and each language is code-split.

### Adding a new language (example: Arabic `ar`)

1. Add `"ar"` to `locales` and fill in `localeDirections` / `localeNames` in `config.ts`.
2. Create `src/i18n/dictionaries/ar.ts` (copy `fa.ts`, translate the values).
3. Register it in the `loaders` map in `dictionaries.ts`.

That's it — routing, the language switcher, and static generation all pick it up automatically.

---

## How styling works

- **Tailwind utility classes** are used directly in components for layout/spacing.
- **Semantic color tokens** (`background`, `surface`, `foreground`, `muted`, `primary`, `border`) are defined as CSS variables in `globals.css` and mapped to Tailwind in `tailwind.config.ts`. Components reference the semantic name, never a raw hex value.
- **Repeated visual patterns** (like the card surface) are defined once with `@layer components` (e.g. `.surface-card`) and wrapped by a component (`<Card />`).
- **RTL** works automatically: Tailwind's logical properties + `<html dir="rtl">` mean Persian mirrors the layout without duplicate CSS.

---

## How to customize

- **Your details / copy:** edit `src/i18n/dictionaries/en.ts` and `fa.ts`.
- **Projects shown:** edit the `projects.items` array in both dictionaries.
- **Skills shown:** edit the `SKILLS` list in `src/components/sections/Skills.tsx`.
- **Colors / theme:** edit the CSS variables in `src/app/globals.css`.
- **Contact email:** edit `contact.email` in the dictionaries.

---

## Available scripts

| Script          | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start the development server (hot reload) |
| `npm run build` | Create an optimized production build      |
| `npm run start` | Run the production build locally          |
| `npm run lint`  | Run ESLint                                |
