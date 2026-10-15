import type { NextConfig } from "next";

// Mirrors the live app: everything is served under katkin.com/lps, and
// next/image runs unoptimized (image srcs carry the /lps prefix themselves).
const nextConfig: NextConfig = {
  basePath: "/lps",
  images: { unoptimized: true },
  // Preview hosting only: send the bare domain (and /lps) straight to the page.
  async redirects() {
    return [
      { source: "/", destination: "/lps/mouse-lp", basePath: false, permanent: false },
      { source: "/", destination: "/mouse-lp", permanent: false },
    ];
  },
};

export default nextConfig;
