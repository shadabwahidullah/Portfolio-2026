import type { Config } from "tailwindcss";

/**
 * Tailwind configuration.
 * - `content` lists every file that may contain class names so unused CSS is purged.
 * - The theme is extended with a small, semantic design-token palette + fonts
 *   that are wired to CSS variables (see globals.css). This keeps styling DRY:
 *   change a token once and it updates everywhere.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  // Class strategy: dark mode is enabled by adding `class="dark"` to <html>.
  // A tiny inline script in the layout sets this before paint to avoid flashes.
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Semantic tokens map to CSS variables so light/dark or theming is trivial.
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        foreground: "var(--color-foreground)",
        muted: "var(--color-muted)",
        primary: "var(--color-primary)",
        "primary-foreground": "var(--color-primary-foreground)",
        border: "var(--color-border)",
      },
      fontFamily: {
        // `sans` is swapped automatically per-locale via the --font-sans variable.
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      container: {
        center: true,
        padding: "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
