"use client";

import Link from "@/lib/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { type ReactNode } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useAuthUI } from "@/context/AuthUIContext";
import { useT } from "@/lib/i18n/I18nProvider";
import { Footer } from "./Footer";
import { FloatingControls } from "./FloatingControls";
import { HeaderBar } from "./HeaderBar";

/** @deprecated ไม่ใช้แล้ว — คงไว้ให้ไฟล์ที่ยัง import type นี้คอมไพล์ได้ */
export type MemberSessionMode =
  | "none"
  | "default"
  | "gems"
  | "tickets"
  | "referral";

type SubPageShellProps = {
  title: string;
  children: ReactNode;
  nav?: "promo" | "events" | "home" | "wallet" | "live";
  /** @deprecated ไม่มีผล — หน้าต้องกั้นด้วย proxy / ResourceGate เอง */
  requiresAuth?: boolean;
  /** @deprecated ไม่มีผล */
  sessionMode?: MemberSessionMode;
  breadcrumbLabel?: string;
  backHref?: string;
};

export function SubPageShell({
  title,
  children,
  breadcrumbLabel,
  backHref = "/",
}: SubPageShellProps) {
  const t = useT("common");
  const { openLogin, openRegister } = useAuthUI();
  const crumb = breadcrumbLabel ?? title;

  return (
    <div className="flex min-h-screen flex-col bg-[var(--body)] text-[var(--text-on-light)]">
      <HeaderBar
        onOpenLogin={openLogin}
        onOpenRegister={openRegister}
        onOpenSearch={() => document.getElementById("game-search")?.scrollIntoView({ behavior: "smooth" })}
      />

      <div className="sticky top-14 z-30 w-full border-b border-black/[0.06] bg-[var(--soft-card-elevated)]/95 backdrop-blur-sm sm:top-16">
        <div className="mx-auto flex max-w-[1240px] items-center gap-3 px-3 py-2 sm:px-4 lg:px-6">
          <Link
            href={backHref}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[var(--soft-card)] px-3 py-1.5 text-xs font-semibold text-[var(--text-on-light)] shadow-[var(--shadow-soft-sm)] transition hover:bg-[var(--soft-card-elevated)]"
            aria-label={t("back")}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t("back")}</span>
          </Link>
          <Breadcrumb items={[{ label: "หน้าแรก", href: "/" }, { label: crumb }]} />
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1240px] flex-1 px-3 py-4 sm:px-4 lg:px-6">
        <h1 className="mb-4 text-xl font-bold text-[var(--text-on-light)] sm:text-2xl">{title}</h1>
        {children}
      </main>

      <Footer />
      <FloatingControls />
    </div>
  );
}
