/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enforce React strict mode to surface potential problems early in dev.
  reactStrictMode: true,
  // Produce a self-contained build output that is cheap to deploy/containerize.
  output: "standalone",
  images: {
    // The project preview images shipped in /public/projects are SVGs. Next's
    // image optimizer refuses SVGs by default (they can embed scripts). These
    // are OUR OWN trusted assets, so we opt in — and lock it down with a strict
    // CSP that blocks any scripts/embeds inside the SVG.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
