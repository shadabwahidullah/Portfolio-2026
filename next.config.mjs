/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enforce React strict mode to surface potential problems early in dev.
  reactStrictMode: true,
  // Produce a self-contained build output that is cheap to deploy/containerize.
  output: "standalone",

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevents MIME-type sniffing (XSS vector).
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Prevents clickjacking.
          { key: "X-Frame-Options", value: "DENY" },
          // Controls how much referrer info is sent — balances analytics with privacy.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Restricts browser features not needed by this site.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  images: {
    // The project preview images shipped in /public/projects are SVGs. Next's
    // image optimizer refuses SVGs by default (they can embed scripts). These
    // are OUR OWN trusted assets, so we opt in — and lock it down with a strict
    // CSP that blocks any scripts/embeds inside the SVG.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Prefer AVIF (smallest file size) then WebP before falling back to the
    // original format. Makes a measurable difference on image-heavy pages.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
