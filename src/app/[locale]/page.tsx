import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import type { LocaleParams } from "@/types";

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

  return (
    <>
      <Hero dict={dict.hero} />
      <About dict={dict.about} />
      <Projects dict={dict.projects} />
      <Skills dict={dict.skills} />
      <Contact dict={dict.contact} social={dict.social} />
    </>
  );
}
