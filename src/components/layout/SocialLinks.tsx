import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

/**
 * SocialLinks
 *
 * Renders LinkedIn + GitHub icon links from the dictionary's `social` URLs.
 * Defined once and reused (footer, contact section) so the markup, icons, and
 * accessible labels live in a single place (DRY). Icons are inlined SVGs to
 * avoid pulling in an icon library for two glyphs.
 */
export function SocialLinks({
  social,
  className,
}: {
  social: Dictionary["social"];
  className?: string;
}) {
  // Brand names are proper nouns (not translated) and double as aria-labels.
  const links = [
    { label: "LinkedIn", href: social.linkedin, icon: <LinkedInIcon /> },
    { label: "GitHub", href: social.github, icon: <GitHubIcon /> },
  ];

  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border",
              "text-muted transition-all hover:text-foreground hover:border-foreground/30 hover:bg-surface hover:-translate-y-0.5",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            )}
          >
            {link.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** LinkedIn glyph. */
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z" />
    </svg>
  );
}

/** GitHub glyph. */
function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.13-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}
