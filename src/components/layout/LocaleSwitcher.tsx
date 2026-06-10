"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

/**
 * LocaleSwitcher (Client Component)
 *
 * Renders one link per supported language. Clicking a language rewrites only
 * the FIRST path segment (the locale) and keeps the rest of the URL intact, so
 * the user stays on the same page in the new language.
 *
 * It's a Client Component because it needs `usePathname()` to know the current
 * route. It's intentionally tiny so very little JS ships to the browser.
 */
export function LocaleSwitcher({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  const pathname = usePathname();

  /** Replace the leading "/<locale>" of the current path with `next`. */
  function buildHref(next: Locale): string {
    const segments = pathname.split("/");
    // segments[0] is "" (leading slash); segments[1] is the current locale.
    segments[1] = next;
    return segments.join("/") || `/${next}`;
  }

  return (
    <nav aria-label={label} className="flex items-center gap-1">
      {locales.map((locale) => {
        const isActive = locale === current;
        return (
          <Link
            key={locale}
            href={buildHref(locale)}
            // Tell assistive tech / crawlers which language each link points to.
            hrefLang={locale}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "rounded-lg px-2.5 py-1 text-sm transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted hover:text-foreground"
            )}
          >
            {localeNames[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
