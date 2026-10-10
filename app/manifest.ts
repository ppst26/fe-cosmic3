import type { MetadataRoute } from "next";

/**
 * Web App Manifest — ให้มือถือติดตั้ง CMB-Jupiter เป็นแอป (Add to Home Screen)
 * ไอคอนอยู่ที่ public/pwa · ใช้คู่กับ service worker ใน app/sw.ts
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CMB-Jupiter",
    short_name: "CMB-Jupiter",
    description: "CMB-Jupiter กีฬาออนไลน์",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#323c4d",
    theme_color: "#323c4d",
    icons: [
      {
        src: "/pwa/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
