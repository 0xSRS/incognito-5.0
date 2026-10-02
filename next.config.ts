import type { NextConfig } from "next";

const FLAG_ORIGIN = process.env.FLAG_ORIGIN || "https://flags.incognito05.tech";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // only applies when no real page matches, so /sanctum-gate-9x7q, /verify-flag, /api/* still win
      fallback: [
        { source: "/:slug([a-z0-9]{20})", destination: `${FLAG_ORIGIN}/:slug` },
      ],
    };
  },
};

export default nextConfig;