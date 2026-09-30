import type { Metadata } from "next";
import { Kanit } from "next/font/google";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      className={`${kanit.variable} light h-full antialiased`}
      data-theme="orange"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
