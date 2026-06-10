import { Inter, Vazirmatn } from "next/font/google";
import type { Locale } from "@/i18n/config";

/**
 * Self-hosted Google fonts via `next/font`.
 *
 * `next/font` downloads the fonts at build time and serves them from our own
 * origin. Benefits: zero layout shift (size-adjust metrics), no extra network
 * request to Google, and automatic `font-display: swap`.
 *
 * Each font exposes a CSS variable that we attach to <html>. The layout then
 * sets the active `--font-sans` so Tailwind's `font-sans` resolves correctly
 * for the current language.
 */

// Latin font used for English (and as a fallback for Latin glyphs).
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Persian/Arabic font with proper RTL glyph shaping, used for Farsi.
const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-vazirmatn",
});

/**
 * Returns the font className(s) plus the per-locale `--font-sans` override so a
 * single helper keeps font wiring DRY across the layout.
 */
export function getFontForLocale(locale: Locale) {
  const isPersian = locale === "fa";
  return {
    // Expose BOTH font variables on the tree; pick the primary one for sans.
    className: `${inter.variable} ${vazirmatn.variable}`,
    fontVariable: isPersian ? "var(--font-vazirmatn)" : "var(--font-inter)",
  };
}
