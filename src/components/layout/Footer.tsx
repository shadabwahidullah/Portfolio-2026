import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "./SocialLinks";

/**
 * Footer (Server Component)
 *
 * Shows a localized copyright line + social links. Receives only the slices it
 * needs (`dict` = footer copy, `name`, `social` = profile URLs).
 */
export function Footer({
  dict,
  name,
  social,
}: {
  dict: Dictionary["footer"];
  name: string;
  social: Dictionary["social"];
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8 text-sm text-muted">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p>
          &copy; {year} {name}. {dict.rights}
        </p>
        <SocialLinks social={social} />
      </Container>
    </footer>
  );
}
