import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "api.dicebear.com", // For comment avatars
      "momentum.redberryinternship.ge", // For employee avatars
    ],
  },
};

export default nextConfig;