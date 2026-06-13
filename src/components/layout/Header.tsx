import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { NavLink } from "@/types";
import { Container } from "@/components/ui/Container";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { BrandLink } from "./BrandLink";

/**
 * Header (Server Component)
 *
 * Sticky top navigation. It receives ONLY the translated slices it needs
 * (`dict` = nav labels, `switcherLabel`) rather than the whole dictionary, which
 * keeps responsibilities clear and props minimal.
 */
export function Header({
  locale,
  dict,
  switcherLabel,
  themeLabels,
}: {
  locale: Locale;
  dict: Dictionary["nav"];
  switcherLabel: string;
  themeLabels: Dictionary["theme"];
}) {
  // Build the nav from the dictionary so labels are localized and the list is
  // defined in exactly one place (DRY). hrefs are in-page anchors.
  const links: NavLink[] = [
    { href: "#about", label: dict.about },
    { href: "#projects", label: dict.projects },
    { href: "#skills", label: dict.skills },
    { href: "#contact", label: dict.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        {/* Brand returns to the localized home page. */}
        <BrandLink locale={locale} />

        {/* Primary in-page navigation (hidden on small screens to stay clean). */}
        <nav className="hidden items-center gap-6 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-muted transition-colors hover:text-foreground after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-primary after:transition-[width] after:duration-200 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Grouped controls: language + theme toggle. */}
        <div className="flex items-center gap-2">
          <LocaleSwitcher current={locale} label={switcherLabel} />
          <ThemeToggle labels={themeLabels} />
        </div>
      </Container>
    </header>
  );
}
