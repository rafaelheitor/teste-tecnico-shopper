import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  },

  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://backend:8080/:path*",
      },
    ];
  },
};

export default nextConfig;
