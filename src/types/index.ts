/**
 * Shared TypeScript types used across the app.
 * Centralizing them avoids duplicate definitions and keeps imports consistent.
 */

/**
 * In Next.js 15 App Router, dynamic route params are delivered as a Promise.
 * Every page/layout under `app/[locale]/` receives this exact shape, so we type
 * it once and reuse it everywhere.
 *
 * `locale` is typed as a plain `string` (not the `Locale` union) to match the
 * types Next.js generates for route params. We narrow it at runtime with the
 * `isLocale` guard inside each layout/page.
 */
export interface LocaleParams {
  params: Promise<{ locale: string }>;
}

/** A single navigation entry rendered in the header. */
export interface NavLink {
  /** The in-page anchor target, e.g. "#about". */
  href: string;
  /** The visible, already-translated label. */
  label: string;
}

/** A skill/tool shown in the Skills section. */
export interface Skill {
  name: string;
}
