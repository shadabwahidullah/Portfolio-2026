"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook to detect when an element first enters the viewport.
 *
 * Trigger-once: once the element becomes visible the observer disconnects,
 * so the element stays visible even when scrolled out of view. This prevents
 * the jarring pattern of sections disappearing as the user scrolls past them.
 *
 * Options are fixed constants (no parameter) which keeps the deps array stable
 * and prevents the effect from re-running on every render.
 */
export function useIntersectionObserver(): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, isVisible];
}
