"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** The two themes the site supports. */
type Theme = "light" | "dark";

/**
 * ThemeToggle (Client Component)
 *
 * Flips the site between light and dark by toggling the `dark` class on
 * <html> and persisting the choice to `localStorage`. The actual FIRST-PAINT
 * theme is applied by a tiny inline script in the layout (see `themeInitScript`)
 * to avoid a flash of the wrong theme; this button only handles user toggles.
 *
 * Icons are inlined SVGs so we don't pull in an icon dependency just for two
 * glyphs, keeping the client bundle tiny.
 */
export function ThemeToggle({ labels }: { labels: { light: string; dark: string } }) {
  // Tracks the current theme so we can render the correct icon/label.
  const [theme, setTheme] = useState<Theme>("dark");
  // Avoid hydration mismatch: only render the real icon after mount, because
  // the server has no idea which theme the visitor's browser resolved to.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read the theme the inline script already applied to <html>.
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    setMounted(true);
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      // Remember the explicit choice for future visits.
      localStorage.setItem("theme", next);
    } catch {
      // localStorage can throw in private mode; ignore — toggle still works.
    }
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      // When dark, the button switches TO light, and vice versa.
      aria-label={isDark ? labels.light : labels.dark}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border",
        "text-muted transition-colors hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      )}
    >
      {/* Render nothing meaningful until mounted to keep SSR/CSR markup stable. */}
      {mounted && (isDark ? <SunIcon /> : <MoonIcon />)}
    </button>
  );
}

/** Sun icon — shown in dark mode (click to go light). */
function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

/** Moon icon — shown in light mode (click to go dark). */
function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/**
 * Inline script string injected into the document BEFORE React hydrates.
 * It resolves the initial theme from localStorage (explicit choice) or the OS
 * preference, then sets the `dark` class so the first paint matches — no flash.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}})();`;
