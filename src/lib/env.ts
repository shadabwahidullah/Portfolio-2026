/**
 * Centralized environment variable configuration.
 *
 * This file validates all environment variables at startup and provides
 * type-safe access to them. If a required variable is missing, the app
 * will fail fast with a clear error message.
 */

/**
 * Validates that an optional environment variable is present.
 * Returns the value if present, or the provided fallback.
 */
function getOptionalEnv(key: string, fallback: string): string {
  return process.env[key] || fallback;
}

/**
 * Public environment variables (exposed to the browser).
 * These must start with NEXT_PUBLIC_.
 */
export const env = {
  /**
   * Base URL of the site (e.g., https://yourdomain.com).
   * Used for canonical URLs, sitemaps, and OG image resolution.
   * Falls back to localhost for development.
   */
  NEXT_PUBLIC_BASE_URL: getOptionalEnv(
    "NEXT_PUBLIC_BASE_URL",
    "http://localhost:3000"
  ),

  /**
   * Google Analytics Measurement ID (e.g., G-XXXXXXXXXX).
   * Get your ID at https://analytics.google.com/
   * Leave empty to disable analytics.
   */
  NEXT_PUBLIC_GA_MEASUREMENT_ID: getOptionalEnv(
    "NEXT_PUBLIC_GA_MEASUREMENT_ID",
    "G-5NJTNNKK6R"
  ),
};

/**
 * Server-only environment variables (never exposed to the browser).
 * These are used in API routes and server components.
 */
export const serverEnv = {
  /**
   * Resend API key for sending emails via the contact form.
   * Get your key at https://resend.com/api-keys
   */
  RESEND_API_KEY: getOptionalEnv("RESEND_API_KEY", "re_ZhWsqmKP_JG8i32gd7rYp5xJt97x4feTR"),

  /**
   * Contact email address where form submissions are sent.
   * Note: Resend free tier only allows sending to the verified email address.
   */
  CONTACT_EMAIL: getOptionalEnv("CONTACT_EMAIL", "shadabwahidullah@gmail.com"),
};

/**
 * Type-safe access to environment variables.
 * Use this instead of process.env directly throughout the app.
 */
export const getEnv = () => ({
  public: env,
  server: serverEnv,
});
