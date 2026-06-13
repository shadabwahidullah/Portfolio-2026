import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { env } from "@/lib/env";
import { replaceYearsPlaceholder } from "@/lib/text";
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
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;
  const seoDescription = replaceYearsPlaceholder(dict.hero.seoDescription);
  return {
    title: `${dict.hero.name} — ${dict.hero.role}`,
    description: seoDescription,
    keywords: "full-stack developer, web developer, mobile developer, React, Next.js, React Native, TypeScript, Node.js, portfolio",
    authors: [{ name: dict.hero.name }],
    creator: dict.hero.name,
    publisher: dict.hero.name,
    metadataBase: new URL(baseUrl),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}`])
      ),
    },
    openGraph: {
      title: `${dict.hero.name} — ${dict.hero.role}`,
      description: seoDescription,
      type: "profile",
      locale,
      url: `/${locale}`,
      siteName: `${dict.hero.name} — Portfolio`,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${dict.hero.name} — ${dict.hero.role}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.hero.name} — ${dict.hero.role}`,
      description: seoDescription,
      images: ["/opengraph-image"],
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

  // Build canonical URL based on the actual request host
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const canonicalUrl = `${protocol}://${host}/${locale}`;

  const baseUrl = env.NEXT_PUBLIC_BASE_URL;
  const seoDescription = replaceYearsPlaceholder(dict.hero.seoDescription);

  // JSON-LD: array of schemas — WebSite + ProfilePage/Person.
  // Google recommends multiple schemas on the same page for richer indexing.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: baseUrl,
      name: `${dict.hero.name} — Portfolio`,
      description: seoDescription,
      inLanguage: locale,
      author: { "@type": "Person", name: dict.hero.name },
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      url: canonicalUrl,
      inLanguage: locale,
      mainEntity: {
        "@type": "Person",
        name: dict.hero.name,
        jobTitle: dict.hero.role,
        description: seoDescription,
        url: canonicalUrl,
        email: dict.contact.email,
        sameAs: [dict.social.linkedin, dict.social.github],
        knowsAbout: [
          "React", "React Native", "Next.js", "TypeScript",
          "Node.js", "Express", "PostgreSQL", "GraphQL", "Expo",
        ],
      },
    },
  ];

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
        {/* JSON-LD structured data for rich snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Canonical URL - prevents duplicate content issues */}
        <link rel="canonical" href={canonicalUrl} />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="flex min-h-screen flex-col">
        {/* Skip-to-content: accessibility + Google crawlability */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
        >
          Skip to main content
        </a>
        <Header
          locale={locale}
          dict={dict.nav}
          switcherLabel={dict.localeSwitcher.label}
          themeLabels={dict.theme}
        />
        <main id="main-content" aria-label="Main content" className="flex-1">{children}</main>
        <Footer dict={dict.footer} name={dict.hero.name} social={dict.social} />
      </body>
    </html>
  );
}
