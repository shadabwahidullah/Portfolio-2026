import React from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { rich } from "@/i18n/dictionaries";
import { Section } from "@/components/ui/Section";

/**
 * About
 *
 * A short bio. Reuses the shared <Section> wrapper for consistent spacing and
 * heading treatment.
 */
export function About({ dict }: { dict: Dictionary["about"] }) {
  return (
    <Section id="about" title={dict.title}>
      <p className="max-w-2xl text-lg leading-relaxed text-muted whitespace-pre-line">
        {rich(dict.body, {
          icpcLink: () => (
            <a
              key="icpcLink"
              href="https://icpc.global/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary/80"
            >
              ICPC
            </a>
          ),
        })}
      </p>
    </Section>
  );
}
