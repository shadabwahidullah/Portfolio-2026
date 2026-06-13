"use client";

import React from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { rich } from "@/i18n/rich";
import { Section } from "@/components/ui/Section";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { getYearsSince } from "@/lib/text";

/**
 * About
 *
 * A short bio. Reuses the shared <Section> wrapper for consistent spacing and
 * heading treatment.
 */
export function About({ dict }: { dict: Dictionary["about"] }) {
  const [ref, isVisible] = useIntersectionObserver();
  const years = getYearsSince(2021);

  return (
    <Section id="about" title={dict.title}>
      <div ref={ref} className={`fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <p className="max-w-2xl text-lg leading-relaxed text-muted whitespace-pre-line">
          {rich(dict.body, {
            years: () => <span key="years">{years}</span>,
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
      </div>
    </Section>
  );
}
