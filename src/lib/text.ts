/**
 * Text processing utilities.
 */

/**
 * Calculates years of experience from a start year.
 * Returns the number of full years elapsed since the start year.
 */
export function getYearsSince(startYear: number): number {
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
}

/**
 * Replaces {years} placeholder in text with calculated years.
 * Used for dynamic experience calculations in copy.
 */
export function replaceYearsPlaceholder(text: string, startYear: number = 2021): string {
  const years = getYearsSince(startYear);
  return text.replace(/{years}/g, years.toString());
}
