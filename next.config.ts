import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    /** root layout อยู่ใต้ app/[lang] — URL ที่ไม่ตรง route ใช้ app/global-not-found.tsx */
    globalNotFound: true,
  },
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
