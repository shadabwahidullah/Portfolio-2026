import type { Dictionary } from "@/i18n/dictionaries";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

/**
 * Technology names are proper nouns, so they are NOT translated. Keeping them
 * as a single constant list here means there's one place to update skills.
 */
const SKILLS = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "GraphQL",
  "Docker",
  "AWS",
  "Jest",
] as const;

/**
 * Skills
 *
 * Renders the (localized) heading + a wrap of skill badges. Reuses <Section>
 * and <Badge> so it stays visually consistent with the rest of the page.
 */
export function Skills({ dict }: { dict: Dictionary["skills"] }) {
  return (
    <Section id="skills" title={dict.title} subtitle={dict.subtitle}>
      <ul className="flex flex-wrap gap-3">
        {SKILLS.map((skill) => (
          <li key={skill}>
            <Badge className="px-4 py-2 text-sm">{skill}</Badge>
          </li>
        ))}
      </ul>
    </Section>
  );
}
