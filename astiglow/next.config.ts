import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_CAL_USERNAME: process.env.CAL_USERNAME || 'astiglow',
  },
};

export default nextConfig;