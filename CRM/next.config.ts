import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  webpack(config) {
    config.module.rules.push({
      test: /jodit\.min\.css$/,
      use: ["ignore-loader"], // Skip processing
    });
    return config;
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    optimizeCss: false,
  },

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
