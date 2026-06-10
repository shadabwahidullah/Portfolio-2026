/**
 * Central i18n configuration.
 *
 * Everything that depends on "what languages do we support?" reads from here,
 * so adding a new locale is a single-file change (DRY).
 */

// The list of locales the site is available in.
export const locales = ["en", "fa"] as const;

// A union type derived from the array above (e.g. "en" | "fa").
// Using `as const` + `typeof` keeps the type and runtime list in perfect sync.
export type Locale = (typeof locales)[number];

// The locale used when none is specified or detection fails.
export const defaultLocale: Locale = "en";

// Text direction per locale. Persian (fa) is written right-to-left.
// This is consumed by the root layout to set <html dir="...">.
export const localeDirections: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  fa: "rtl",
};

// Human-readable names shown in the language switcher UI.
export const localeNames: Record<Locale, string> = {
  en: "English",
  fa: "فارسی",
};

/**
 * Type guard that checks whether an arbitrary string is a supported locale.
 * Useful in the middleware / layout where the value comes from the URL.
 */
export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
