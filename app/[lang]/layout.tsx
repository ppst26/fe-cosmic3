import type { Metadata, Viewport } from "next";
import type React from "react";
import { Kanit } from "next/font/google";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { AppProviders } from "@/components/AppProviders";
import { LOCALES, hasLocale } from "@/lib/i18n/config";
import { localeFontClass } from "@/lib/i18n/fonts";
import { MessagesBoundary } from "@/lib/i18n/MessagesBoundary";
import { NAMESPACES } from "@/lib/i18n/messages";
import { getT } from "@/lib/i18n/server";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return LOCALES.map((code) => ({ lang: code }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT("meta");
  return {
    applicationName: "CMB-Jupiter",
    title: t("title"),
    description: t("description"),
    appleWebApp: {
      capable: true,
      title: "CMB-Jupiter",
      statusBarStyle: "black-translucent",
    },
    icons: {
      apple: "/pwa/apple-touch-icon.png",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#09080e",
};

/**
 * RootLayout ต่อภาษา — กำหนด lang, ฟอนต์ตามภาษา และ dictionary ของ shell
 * (structure เหมือน glass app/[lang]/layout.tsx · ธีม Dark Lavender / Plum เป็นของ sport)
 */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${kanit.variable} ${localeFontClass(locale)} dark h-full antialiased`}
      data-theme="lavender"
    >
      <body className="min-h-full flex flex-col">
        <MessagesBoundary namespaces={NAMESPACES}>
          <AppProviders>{children}</AppProviders>
        </MessagesBoundary>
      </body>
    </html>
  );
}
