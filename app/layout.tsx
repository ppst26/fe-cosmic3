import type { Metadata } from "next";
import type React from "react";
import { Kanit } from "next/font/google";
import { AppProviders } from "@/components/AppProviders";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Solidx Platform - หน้าหลัก",
  description: "Mock หน้าแรกธีม Orange Light Solid",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="th"
      className={`${kanit.variable} light h-full antialiased`}
      data-theme="orange"
    >
      <body className="min-h-full flex flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
