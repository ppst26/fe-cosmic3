import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/sport-games", destination: "/sports", permanent: true },
      { source: "/sport-games/:provider", destination: "/sports/:provider", permanent: true },
      { source: "/fishing", destination: "/fish", permanent: true },
      { source: "/fishing/:provider", destination: "/fish/:provider", permanent: true },
      { source: "/cards", destination: "/card", permanent: true },
      { source: "/cards/:provider", destination: "/card/:provider", permanent: true },
    ];
  },
};

export default nextConfig;
