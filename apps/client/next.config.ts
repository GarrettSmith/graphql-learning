import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/graphql",
        destination: "http://localhost:4000/",
      },
    ];
  },
};

export default nextConfig;
