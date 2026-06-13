import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Hero
 *
 * The first thing visitors see: greeting, name, role, tagline and two CTAs.
 * Pure presentational Server Component — it takes the `hero` dictionary slice
 * and renders it, so all copy is localized upstream.
 */
export function Hero({ dict }: { dict: Dictionary["hero"] }) {
  return (
    <section className="hero-gradient py-24 sm:py-32">
      <Container className="flex flex-col items-start gap-6">
        <p className="text-muted animate-fade-in">
          {dict.greeting}{" "}
          <span className="font-semibold text-foreground">{dict.name}</span>
        </p>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl animate-slide-up text-foreground">
          {dict.role}
        </h1>

        <p className="max-w-xl text-lg text-muted animate-slide-up animation-delay-200">
          {dict.tagline}
        </p>

        <div className="mt-2 flex flex-wrap gap-3 animate-slide-up animation-delay-400">
          <Button href="#projects">{dict.ctaPrimary}</Button>
          <Button href="#contact" variant="secondary">
            {dict.ctaSecondary}
          </Button>
        </div>
      </Container>
    </section>
  );
}
