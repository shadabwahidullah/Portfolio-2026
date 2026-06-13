import React from "react";

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
  components: Record<string, () => React.ReactNode>
): React.ReactNode {
  const parts = text.split(/({\w+})/);
  
  return parts.map((part, index) => {
    const match = part.match(/^{(\w+)}$/);
    if (match) {
      const key = match[1];
      const renderComponent = components[key];
      if (renderComponent) {
        return React.cloneElement(renderComponent() as React.ReactElement, { key });
      }
    }
    return part;
  });
}
