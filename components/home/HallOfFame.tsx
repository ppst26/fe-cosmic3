"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { useT } from "@/lib/i18n/I18nProvider";
import type { HallOfFameRow, HallOfFameTabId } from "@/app/types/lobby";
import { createHallOfFameRow } from "@/app/data/hallOfFameGenerator";
import { HALL_OF_FAME_ROW_LIMIT, HALL_OF_FAME_TICK_MS } from "@/lib/uiConstants";
import { HomePageSection } from "./HomePageSection";

interface HallOfFameProps {
  /** ข้อมูลรอบแรกจาก lobby API (LobbyContent.hallOfFame) */
  datasets: Record<HallOfFameTabId, HallOfFameRow[]>;
}

const TAB_LABELS: { id: HallOfFameTabId; label: string }[] = [
  { id: "latest-winner", label: "Latest Winner" },
  { id: "top-win-multiple", label: "Top Win Multiple" },
];

const payoutFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** จัดรูปแบบยอดชนะ THB (+80,060.00฿) */
function formatPayoutThb(amount: number): string {
  return `+${payoutFormatter.format(amount)}฿`;
}

/** Hall of Fame (Top Performance) — 2 แท็บ ข้อมูลและการอัปเดตแถวใหม่ตาม glass */
export function HallOfFame({ datasets }: HallOfFameProps) {
  const t = useT("home");
  const panelId = useId();
  const [activeTab, setActiveTab] = useState<HallOfFameTabId>("latest-winner");
  const isLatestWinner = activeTab === "latest-winner";

  /** เริ่มจาก datasets แล้วเพิ่มแถวใหม่ด้านบนทุก HALL_OF_FAME_TICK_MS (ตรรกะเดียวกับ glass) */
  const [rowsByTab, setRowsByTab] = useState<Record<HallOfFameTabId, HallOfFameRow[]>>(() => ({
    "latest-winner": (datasets["latest-winner"] ?? []).slice(0, HALL_OF_FAME_ROW_LIMIT),
    "top-win-multiple": (datasets["top-win-multiple"] ?? []).slice(0, HALL_OF_FAME_ROW_LIMIT),
  }));
  const rows = rowsByTab[activeTab];

  useEffect(() => {
    const tick = () => {
      if (document.hidden) return;
      setRowsByTab((prev) => ({
        "latest-winner": [
          createHallOfFameRow("latest-winner", prev["latest-winner"][0]),
          ...prev["latest-winner"],
        ].slice(0, HALL_OF_FAME_ROW_LIMIT),
        "top-win-multiple": [
          createHallOfFameRow("top-win-multiple", prev["top-win-multiple"][0]),
          ...prev["top-win-multiple"],
        ].slice(0, HALL_OF_FAME_ROW_LIMIT),
      }));
    };
    const id = setInterval(tick, HALL_OF_FAME_TICK_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <HomePageSection title="Top Performance" icon="👑">
      <div className="w-full space-y-3 select-none">
        <div
          className="flex max-w-full flex-wrap items-center gap-1.5"
          role="tablist"
          aria-label={t("hallOfFame.tabsAriaLabel")}
        >
          {TAB_LABELS.map((tab) => {
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`${panelId}-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`${panelId}-panel`}
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-8 cursor-pointer whitespace-nowrap rounded-full border-0 px-4 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                  selected
                    ? "bg-[var(--brand)] text-white"
                    : "bg-[var(--soft-card-elevated)] text-[var(--tab-inactive)] hover:bg-[var(--brand-soft)]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div id={`${panelId}-panel`} role="tabpanel" aria-labelledby={`${panelId}-tab-${activeTab}`} className="w-full">
          <div className="grid grid-cols-12 gap-2 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] sm:px-4 sm:text-xs">
            <div className="col-span-4">Game</div>
            <div className="col-span-3">Player</div>
            <div className="col-span-3 hidden sm:block">Time</div>
            <div className="col-span-5 text-right sm:col-span-2">{isLatestWinner ? "Payout" : "Multiple"}</div>
          </div>

          <div className="mt-1 space-y-2">
            {rows.length === 0 ? (
              <p className="soft-card px-4 py-6 text-center text-sm text-[var(--text-muted)]">
                {t("hallOfFame.empty")}
              </p>
            ) : (
              rows.map((row) => (
                <div
                  key={row.id}
                  className="soft-card grid grid-cols-12 items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3"
                >
                  <div className="col-span-4 flex min-w-0 items-center gap-2.5">
                    <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-[var(--brand-soft)] sm:h-9 sm:w-9">
                      {row.coverSrc ? (
                        <Image src={row.coverSrc} alt="" fill sizes="40px" className="object-cover object-center" />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-sm font-black text-[var(--brand)]">
                          {row.gameName.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </span>
                    <span className="truncate text-xs font-extrabold text-[var(--text-on-light)] sm:text-[13px]">
                      {row.gameName}
                    </span>
                  </div>

                  <div className="col-span-3 min-w-0 pr-1">
                    <span className="block truncate text-xs font-bold tabular-nums text-[var(--text-on-light)] sm:text-[13px]">
                      {row.playerMasked}
                    </span>
                  </div>

                  <div className="col-span-3 hidden min-w-0 sm:block">
                    <span className="block truncate text-[11px] tabular-nums text-[var(--text-muted)]">
                      {row.wonAtLabel ?? "—"}
                    </span>
                  </div>

                  <div className="col-span-5 flex min-w-0 items-center justify-end text-right sm:col-span-2">
                    {isLatestWinner && row.payout != null ? (
                      <span className="truncate font-mono text-xs font-black tracking-tight text-[#16a34a] sm:text-sm">
                        {formatPayoutThb(row.payout)}
                      </span>
                    ) : null}
                    {!isLatestWinner && row.winMultiple != null ? (
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-black sm:px-3 sm:text-xs ${
                          row.winMultiple >= 100
                            ? "bg-amber-100 text-amber-700"
                            : "bg-[var(--brand-soft)] text-[var(--brand-strong)]"
                        }`}
                      >
                        x{row.winMultiple}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </HomePageSection>
  );
}
