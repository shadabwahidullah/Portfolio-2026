import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import type { LocaleParams } from "@/types";
import { env } from "@/lib/env";

/**
 * Home page (Server Component).
 *
 * Loads the dictionary ONCE for the active locale, then hands each section the
 * slice it needs. Sections are pure presentational components, so this page is
 * the single place that wires content -> UI. Because everything is server-
 * rendered and statically generated per locale, the client ships almost no JS.
 */
export default async function HomePage({ params }: LocaleParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  // ItemList schema: lets Google index each project as a structured entity,
  // which can surface individual project entries in search results.
  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: dict.projects.title,
    numberOfItems: dict.projects.items.length,
    itemListElement: dict.projects.items.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      description: project.description,
      url:
        project.url ||
        project.appStoreUrl ||
        project.playStoreUrl ||
        `${baseUrl}/${locale}#projects`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <Hero dict={dict.hero} />
      <About dict={dict.about} />
      <Projects dict={dict.projects} />
      <Skills dict={dict.skills} />
      <Contact dict={dict.contact} social={dict.social} />
    </>
  );
}
