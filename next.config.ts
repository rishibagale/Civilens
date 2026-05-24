import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack is the default bundler in Next.js 16+.
  // No webpack config needed — mapbox-gl works fine with dynamic imports (ssr: false).
  turbopack: {},
};

export default nextConfig;
