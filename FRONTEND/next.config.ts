import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.optimization.minimize = false; // Disables all minification (JS + CSS)
    return config;
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },

      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
