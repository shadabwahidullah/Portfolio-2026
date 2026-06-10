import type { Dictionary } from "@/i18n/dictionaries";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

/**
 * Technology names are proper nouns, so they are NOT translated. Keeping them
 * as a single constant list here means there's one place to update skills.
 */
const SKILLS = {
  "Frontend & Mobile": [
    "React-Native",
    "Next.js",
    "React",
    "Expo",
    "Redux",
    "Redux Toolkit",
    "Tailwind CSS",
  ],
  "Backend & Database": [
    "Node.js",
    "Express",
    "GraphQL",
    "PostgreSQL",
  ],
  "Tools & Testing": [
    "Jest",
    "Git",
    "GitHub",
    "Figma",
    "Confluence",
  ],
} as const;

/**
 * Skills

 * Renders the (localized) heading + a wrap of skill badges. Reuses <Section>
 * and <Badge> so it stays visually consistent with the rest of the page.
 */
export function Skills({ dict }: { dict: Dictionary["skills"] }) {
  return (
    <Section id="skills" title={dict.title} subtitle={dict.subtitle}>
      <div className="space-y-6">
        {Object.entries(SKILLS).map(([category, skills]) => (
          <div key={category}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
              {dict.categories[category as keyof typeof dict.categories]}
            </h3>
            <ul className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <li key={skill}>
                  <Badge className="px-4 py-2 text-sm">{skill}</Badge>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
