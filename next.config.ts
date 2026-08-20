import type { NextConfig } from "next";

/**
 * Baseline security headers. These are the ones that are safe to apply to a
 * static marketing site without breaking anything.
 *
 * Note: no Content-Security-Policy is set here. Next.js injects inline
 * scripts, and the Cal.com booking embed loads a third-party iframe, so a CSP
 * needs a nonce-based setup to avoid silently breaking the page. Add one
 * deliberately once the third-party surface is final.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
