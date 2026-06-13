import { cn } from "@/lib/utils";
import { Container } from "./Container";

/**
 * Section
 *
 * A page section wrapper that standardizes vertical rhythm, the anchor `id`
 * (used by the header's in-page navigation), and an optional title/subtitle
 * header. Because every section on the page reuses it, spacing and heading
 * styles stay consistent and we avoid repeating markup (DRY).
 */
export function Section({
  id,
  title,
  subtitle,
  className,
  children,
}: {
  /** Anchor id, e.g. "about" — matched by header links like "#about". */
  id: string;
  /** Optional already-translated section heading. */
  title?: string;
  /** Optional already-translated supporting line under the heading. */
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-28", className)}>
      <Container>
        {title && (
          <header className="mb-10 max-w-2xl">
            <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
            <div className="mt-3 h-1 w-10 rounded-full bg-primary/60" />
            {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
