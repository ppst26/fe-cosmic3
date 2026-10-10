"use client";

import Link from "@/lib/i18n/navigation";
import { useAuth } from "@/context/AuthContext";
import { MEMBER } from "@/data/member";

type MemberSessionStripProps = {
  showGems?: boolean;
  showTickets?: boolean;
  showReferral?: boolean;
};

export function MemberSessionStrip({
  showGems = false,
  showTickets = false,
  showReferral = false,
}: MemberSessionStripProps) {
  const { state } = useAuth();

  if (!state.isAuthenticated) return null;

  const label = state.displayName || state.username || "สมาชิก";

  return (
    <section className="soft-panel mb-3 flex flex-wrap items-center justify-between gap-2 p-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-[var(--text-on-light)]">{label}</p>
        <p className="text-xs text-[var(--text-muted)]">
          {state.username ? `@${state.username}` : state.phone}
          <span className="mx-1">·</span>
          {MEMBER.vipTier}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        <Link
          href="/wallet"
          className="rounded-lg bg-[var(--brand-soft)] px-3 py-1.5 text-[var(--brand-strong)]"
        >
          {state.balance.toLocaleString("th-TH")} บาท
        </Link>
        {showGems ? (
          <span className="rounded-lg bg-[var(--soft-card-elevated)] px-3 py-1.5 text-[var(--text-on-light)]">
            💎 {state.diamonds.toLocaleString("th-TH")}
          </span>
        ) : null}
        {showTickets ? (
          <span className="rounded-lg bg-[var(--soft-card-elevated)] px-3 py-1.5 text-[var(--text-on-light)]">
            🎫 {state.tickets}
          </span>
        ) : null}
        {showReferral ? (
          <span className="rounded-lg bg-[var(--soft-card-elevated)] px-3 py-1.5 text-[var(--text-on-light)]">
            รายได้ {state.referralEarnings.toLocaleString("th-TH")}
          </span>
        ) : null}
        <Link
          href="/profile"
          className="rounded-lg bg-[var(--soft-card-elevated)] px-3 py-1.5 text-[var(--text-on-light)]"
        >
          โปรไฟล์
        </Link>
      </div>
    </section>
  );
}
