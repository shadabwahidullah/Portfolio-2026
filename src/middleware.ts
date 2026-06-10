import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

/**
 * Locale routing middleware.
 *
 * Responsibility: ensure every page request carries a locale prefix in the URL
 * (e.g. `/en/...` or `/fa/...`). If a request hits a path without a locale, we
 * detect the best language and redirect to the prefixed URL.
 *
 * This keeps URLs explicit and SEO-friendly while letting Server Components read
 * the locale straight from the route params.
 */

/**
 * Picks the best locale for an incoming request by reading the standard
 * `Accept-Language` header and matching it against the locales we support.
 * Falls back to `defaultLocale` when there is no match.
 */
function detectLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  // "fa-IR,fa;q=0.9,en;q=0.8" -> ["fa-IR", "fa", "en"]
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().split("-")[0]);

  return preferred.find((lang) => isLocale(lang)) ?? defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Does the path already start with a supported locale? e.g. "/en" or "/fa/..."
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  // No locale in the path: redirect to the detected one, preserving the path.
  const locale = detectLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  /**
   * Run the middleware on all routes EXCEPT Next.js internals and static assets,
   * which never need a locale prefix. This avoids unnecessary work per request.
   */
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
