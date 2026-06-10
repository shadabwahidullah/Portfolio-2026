/**
 * Tiny class-name combiner.
 *
 * Accepts any mix of strings, falsy values, or string arrays and joins the
 * truthy ones with a space. This lets components write conditional classes
 * cleanly (e.g. `cn("base", isActive && "active")`) without pulling in an extra
 * dependency — keeping the bundle small and the code DRY.
 */
export type ClassValue = string | number | false | null | undefined | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  for (const input of inputs) {
    if (!input) continue; // skip false / null / undefined / "" / 0
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else {
      out.push(String(input));
    }
  }

  return out.join(" ");
}
