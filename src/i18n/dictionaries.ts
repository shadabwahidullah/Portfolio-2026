import "server-only";
import type { Locale } from "./config";
import en from "./dictionaries/en";

/**
 * The `Dictionary` type is INFERRED from the English dictionary, so the type and
 * the actual copy never drift apart. Every locale file is checked against this.
 */
export type Dictionary = typeof en;

/**
 * Lazy, code-split loaders for each locale.
 *
 * Why functions returning dynamic imports?
 *   - Only the requested language's JSON is sent to the server bundle for a
 *     given request, instead of bundling every translation everywhere.
 *   - `import("server-only")` above guarantees this file is never shipped to
 *     the client, keeping translation data off the browser bundle.
 */
const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => Promise.resolve(en),
  fa: () => import("./dictionaries/fa").then((m) => m.default),
};

/**
 * Returns the fully-typed dictionary for the given locale.
 * Server Components `await getDictionary(locale)` and pass the result down.
 */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}

/**
 * Rich text helper that replaces placeholders with React components.
 * Similar to next-intl's t.rich() but works with the existing dictionary system.
 *
 * @param text - The translation text with placeholders like {key}
 * @param components - Object mapping placeholder keys to render functions
 * @returns React elements with placeholders replaced by components
 */
export function rich(
  text: string,
  components: Record<string, (chunks: React.ReactNode) => React.ReactNode>
): React.ReactNode {
  const parts = text.split(/({\w+})/);
  
  return parts.map((part, index) => {
    const match = part.match(/^{(\w+)}$/);
    if (match) {
      const key = match[1];
      const Component = components[key];
      if (Component) {
        return Component(key);
      }
    }
    return part;
  });
}
