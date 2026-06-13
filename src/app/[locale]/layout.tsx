import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { getFontForLocale } from "@/app/fonts";
import {
  isLocale,
  locales,
  localeDirections,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { themeInitScript } from "@/components/layout/ThemeToggle";
import type { LocaleParams } from "@/types";

/**
 * Canonical viewport meta — extracted from Metadata per Next.js 13+ best
 * practice so it isn't duplicated across nested layouts.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f17" },
  ],
};

/**
 * Pre-generate a static page for each supported locale at build time.
 * This makes every language fully static + cacheable (great performance).
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Per-locale <head> metadata. Generated on the server so titles/descriptions
 * are localized and SEO-friendly without client-side work.
 */
export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  // Fall back to empty metadata for unsupported locales (those 404 anyway).
  if (!isLocale(locale)) return {};

  const dict = await getDictionary(locale);
  return {
    title: `${dict.hero.name} — ${dict.hero.role}`,
    description: dict.hero.tagline,
    openGraph: {
      title: `${dict.hero.name} — ${dict.hero.role}`,
      description: dict.hero.tagline,
      type: "website",
      locale,
    },
    twitter: {
      card: "summary",
      title: `${dict.hero.name} — ${dict.hero.role}`,
      description: dict.hero.tagline,
    },
  };
}

/**
 * Root layout for every page. Because the `[locale]` segment is the top of the
 * route tree, this is the document root and therefore renders <html>/<body>.
 *
 * It is a Server Component: it loads the dictionary once and passes the relevant
 * slices down to the header/footer, so no translation data ever reaches the
 * client bundle unnecessarily.
 */
export default async function LocaleLayout({
  children,
  params,
}: { children: React.ReactNode } & LocaleParams) {
  const { locale } = await params;

  // Guard against unknown locales (e.g. someone visits /de). 404 instead of crash.
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const { className, fontVariable } = getFontForLocale(locale);

  return (
    <html
      lang={locale}
      // `dir` flips the whole layout for RTL languages (Persian) automatically.
      dir={localeDirections[locale]}
      className={className}
      // The inline theme script mutates this element before hydration, so tell
      // React not to warn about the resulting class/style attribute mismatch.
      suppressHydrationWarning
      // Bind the active language font to the token Tailwind's `font-sans` reads.
      style={{ ["--font-sans" as string]: fontVariable }}
    >
      <head>
        {/* Applies the saved/system theme before first paint to avoid a flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header
          locale={locale}
          dict={dict.nav}
          switcherLabel={dict.localeSwitcher.label}
          themeLabels={dict.theme}
        />
        <main className="flex-1">{children}</main>
        <Footer dict={dict.footer} name={dict.hero.name} social={dict.social} />
      </body>
    </html>
  );
}
