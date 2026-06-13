"use client";

import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

/** A single project's data, derived from the dictionary's project items. */
type Project = Dictionary["projects"]["items"][number];

/**
 * ProjectCard
 *
 * Renders one project: preview image, title, description, tags and a link to
 * the live preview. Extracted into its own component so the list mapping stays
 * readable and the card markup lives in exactly one place (DRY).
 */
function ProjectCard({
  project,
  viewLabel,
  priority = false,
}: {
  project: Project;
  /** Localized label for the "live preview" link. */
  viewLabel: string;
  /** Set true for the first/above-the-fold card to preload the image (LCP). */
  priority?: boolean;
}) {
  return (
    <Card as="article" className="group flex h-full flex-col gap-4 overflow-hidden p-0 transition-all hover:shadow-lg hover:-translate-y-1">
      {/* Preview screenshot. `next/image` lazy-loads + sizes it responsively. */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-background">
        <Image
          src={project.image}
          alt={project.title}
          fill
          // Tell the optimizer how wide the image renders at each breakpoint.
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 pt-2">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge className="transition-transform hover:scale-105">{tag}</Badge>
            </li>
          ))}
        </ul>

        {/* External links - either app store buttons or live preview link */}
        {project.appStoreUrl || project.playStoreUrl ? (
          <div className="flex gap-3">
            {project.appStoreUrl && (
              <a
                href={project.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                App Store
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.playStoreUrl && (
              <a
                href={project.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Play Store
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        ) : project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            {viewLabel}
            <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
    </Card>
  );
}

/**
 * Projects
 *
 * Responsive grid of project cards built entirely from the dictionary, so the
 * content is fully localized and adding a project is a data-only change.
 */
export function Projects({ dict }: { dict: Dictionary["projects"] }) {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <Section id="projects" title={dict.title} subtitle={dict.subtitle}>
      <div ref={ref} className={`fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.items.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              viewLabel={dict.viewProject}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
