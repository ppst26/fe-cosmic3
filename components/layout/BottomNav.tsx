"use client";

import React, { type ReactNode } from "react";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAuthUI } from "@/context/AuthUIContext";
import { useDeposit } from "@/context/DepositContext";
import { cn } from "@/lib/utils";

export type NavId = "deposit" | "withdraw" | "menu" | "cashback" | "contact";

export interface BottomNavProps {
  active?: NavId | null;
  onAction?: (id: NavId) => void;
  menuOpen?: boolean;
  onMenuClick?: () => void;
  onContactClick?: () => void;
  showSpacer?: boolean;
}

const NAV_ITEMS: { id: NavId; label: string }[] = [
  { id: "deposit", label: "ฝาก" },
  { id: "withdraw", label: "ถอน" },
  { id: "menu", label: "เมนู" },
  { id: "cashback", label: "คืนยอด" },
  { id: "contact", label: "ติดต่อ" },
];

function NavIcon({ id }: { id: NavId }) {
  const shapes: Record<NavId, ReactNode> = {
    deposit: (
      <>
        <path d="M12 3v13m-5-5 5 5 5-5" />
        <path d="M4 14v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
      </>
    ),
    withdraw: (
      <>
        <path d="M12 16V3m-5 5 5-5 5 5" />
        <path d="M4 14v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
      </>
    ),
    menu: (
      <>
        <path d="M5 7h14M5 12h14M5 17h14" />
      </>
    ),
    cashback: (
      <>
        <path d="M3 10a9 9 0 1 1 1.5 7" />
        <path d="M3 4v6h6" />
      </>
    ),
    contact: (
      <>
        <path d="M4 14v-3a8 8 0 0 1 16 0v6a4 4 0 0 1-4 4h-2" />
        <rect x="2" y="11" width="4" height="7" rx="2" />
        <rect x="18" y="11" width="4" height="7" rx="2" />
        <path d="M11 21h3" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[22px] w-[22px]"
      aria-hidden="true"
    >
      {shapes[id]}
    </svg>
  );
}

function SideNavButton({
  id,
  label,
  selected,
  onClick,
}: {
  id: NavId;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-h-[44px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 pb-2 pt-1.5 transition-all duration-200 active:scale-95 border-0 cursor-pointer bg-transparent",
        selected ? "text-[var(--brand-strong)]" : "text-[var(--text-muted)] hover:text-[var(--text-on-light)]",
      )}
      aria-current={selected ? "page" : undefined}
    >
      <span
        className={cn(
          "flex flex-col items-center justify-center gap-1 rounded-2xl px-2.5 py-1.5 transition-colors",
          selected && "bg-[var(--brand-soft)] border-b-2 border-[var(--brand)]",
        )}
      >
        <NavIcon id={id} />
        <span className="whitespace-nowrap text-[11px] font-bold leading-none">{label}</span>
      </span>
    </button>
  );
}

function CenterMenuButton({
  label,
  open,
  onClick,
}: {
  label: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div className="relative flex flex-col items-center justify-end pb-1.5">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "relative z-20 -mt-7 flex h-[58px] w-[58px] items-center justify-center rounded-full border-0 cursor-pointer transition-transform active:scale-95",
          "bg-gradient-to-b from-[#ffc98a] via-[var(--brand)] to-[var(--brand-strong)]",
          "shadow-[0_6px_20px_rgba(245,135,30,0.45),0_0_0_3px_var(--soft-chrome),inset_0_2px_4px_rgba(255,255,255,0.35)]",
          open && "ring-2 ring-[var(--brand)]/80 ring-offset-2 ring-offset-[var(--soft-chrome)]",
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={label}
      >
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--soft-chrome)] text-[var(--brand-soft)] shadow-inner"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M5 6a2 2 0 0 1 2-2h2v4H5V6zm0 6h4v4H7a2 2 0 0 1-2-2v-2zm10-8h2a2 2 0 0 1 2 2v2h-4V4zM15 12h4v2a2 2 0 0 1-2 2h-2v-4z" />
          </svg>
        </span>
      </button>
      <span
        className={cn(
          "mt-1 text-[11px] font-bold leading-none",
          open ? "text-[var(--brand-strong)]" : "text-[var(--text-on-light)]",
        )}
      >
        {label}
      </span>
    </div>
  );
}

export function BottomNav({
  active,
  onAction,
  menuOpen = false,
  onMenuClick,
  onContactClick,
  showSpacer = false,
}: BottomNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useAuth();
  const { openLogin } = useAuthUI();
  const { openDeposit, openWithdraw } = useDeposit();
  const isLoggedIn = state.isAuthenticated;

  const resolvedActive =
    active !== undefined
      ? active
      : pathname.startsWith("/cashback")
        ? "cashback"
        : null;

  const handleAction = (id: NavId) => {
    onAction?.(id);

    switch (id) {
      case "deposit":
        if (!isLoggedIn) {
          openLogin();
        } else {
          openDeposit();
        }
        break;
      case "withdraw":
        if (!isLoggedIn) {
          openLogin();
        } else {
          openWithdraw();
        }
        break;
      case "menu":
        onMenuClick?.();
        break;
      case "cashback":
        if (pathname !== "/cashback") router.push("/cashback");
        break;
      case "contact":
        if (onContactClick) {
          onContactClick();
        } else {
          alert("เชื่อมต่อฝ่ายบริการลูกค้า 24 ชั่วโมง");
        }
        break;
    }
  };

  const barHeight = "calc(76px + env(safe-area-inset-bottom, 0px))";
  const spacerHeight = "calc(92px + env(safe-area-inset-bottom, 0px))";

  return (
    <>
      {showSpacer && <div className="lg:hidden" style={{ height: spacerHeight }} aria-hidden="true" />}

      <nav
        className="fixed bottom-0 left-0 right-0 z-[80] lg:hidden pointer-events-none"
        style={{ height: barHeight }}
        aria-label="เมนูหลัก"
      >
        <div className="pointer-events-auto absolute inset-x-0 bottom-0 top-0">
          <svg
            className="absolute -top-[14px] left-0 w-full h-[22px] text-[var(--soft-chrome)]"
            viewBox="0 0 400 22"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M0,22 L0,10 C60,10 130,10 168,10 Q200,-2 232,10 C270,10 340,10 400,10 L400,22 Z"
            />
          </svg>

          <div
            className="absolute inset-0 rounded-t-[22px] border-t border-black/10 bg-[var(--soft-chrome)] shadow-[0_-8px_24px_rgba(45,55,72,0.2)]"
          />

          <div
            className="relative grid h-[76px] grid-cols-5 items-end"
            style={{
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
              paddingInline:
                "max(4px, env(safe-area-inset-left, 0px)) max(4px, env(safe-area-inset-right, 0px))",
            }}
          >
            {NAV_ITEMS.map(({ id, label }) => {
              if (id === "menu") {
                return (
                  <CenterMenuButton
                    key={id}
                    label={label}
                    open={menuOpen}
                    onClick={() => handleAction("menu")}
                  />
                );
              }

              const selected = resolvedActive === id;

              return (
                <SideNavButton
                  key={id}
                  id={id}
                  label={label}
                  selected={selected}
                  onClick={() => handleAction(id)}
                />
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
