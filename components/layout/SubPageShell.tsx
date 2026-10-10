"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MemberAuthPrompt } from "@/components/member/MemberAuthPrompt";
import { MemberSessionStrip } from "@/components/member/MemberSessionStrip";
import { useAuth } from "@/context/AuthContext";
import { useAuthUI } from "@/context/AuthUIContext";
import { Footer } from "./Footer";
import { FloatingControls } from "./FloatingControls";
import { HeaderBar } from "./HeaderBar";

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
  requiresAuth?: boolean;
  sessionMode?: MemberSessionMode;
  breadcrumbLabel?: string;
  backHref?: string;
};

export function SubPageShell({
  title,
  children,
  requiresAuth = false,
  sessionMode = "default",
  breadcrumbLabel,
  backHref = "/",
}: SubPageShellProps) {
  const { state } = useAuth();
  const { openLogin, openRegister } = useAuthUI();

  const isLoggedIn = state.isAuthenticated;
  const showContent = !requiresAuth || isLoggedIn;
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
            aria-label="กลับ"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">กลับ</span>
          </Link>
          <Breadcrumb items={[{ label: "หน้าแรก", href: "/" }, { label: crumb }]} />
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1240px] flex-1 px-3 py-4 sm:px-4 lg:px-6">
        <h1 className="mb-4 text-xl font-bold text-[var(--text-on-light)] sm:text-2xl">{title}</h1>

        {isLoggedIn && sessionMode !== "none" ? (
          <MemberSessionStrip
            showGems={sessionMode === "gems" || sessionMode === "tickets"}
            showTickets={sessionMode === "tickets"}
            showReferral={sessionMode === "referral"}
          />
        ) : null}

        {showContent ? (
          children
        ) : (
          <MemberAuthPrompt onOpenLogin={openLogin} onOpenRegister={openRegister} />
        )}
      </main>

      <Footer />
      <FloatingControls />
    </div>
  );
}
