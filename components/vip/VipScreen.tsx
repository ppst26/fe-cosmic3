"use client";

import { useState } from "react";
import { VIP_TIERS } from "@/data/member";

type VipTab = "my-tier" | "rank" | "benefits";

const CURRENT_TURNOVER = 1450;
const NEXT_TURNOVER = 5000;
const PROGRESS_PERCENT = (CURRENT_TURNOVER / NEXT_TURNOVER) * 100;

const TABS: { key: VipTab; label: string }[] = [
  { key: "my-tier", label: "ระดับฉัน" },
  { key: "rank", label: "แรงค์" },
  { key: "benefits", label: "สิทธิประโยชน์" },
];

const CONDITION_TEXT = "รักษาแรงค์ด้วยเทิร์นสะสม";

export function VipScreen() {
  const [tab, setTab] = useState<VipTab>("my-tier");
  const [rankIndex, setRankIndex] = useState(0);

  const currentTier = VIP_TIERS.find((t) => t.id === "gold") ?? VIP_TIERS[2];
  const nextTier = VIP_TIERS.find((t) => t.id === "platinum") ?? VIP_TIERS[3];
  const carouselTier = VIP_TIERS[rankIndex];

  function goPrev() {
    setRankIndex((i) => Math.max(0, i - 1));
  }

  function goNext() {
    setRankIndex((i) => Math.min(VIP_TIERS.length - 1, i + 1));
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`h-10 rounded-[var(--radius-soft-sm)] text-xs font-semibold ${
              tab === key
                ? "soft-btn-primary"
                : "bg-[var(--soft-card)] text-[var(--text-on-light)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "my-tier" ? (
        <section className="soft-panel space-y-3 p-4">
          <p className="text-2xl font-bold">
            {currentTier.emoji} {currentTier.name}
          </p>
          <p className="text-sm text-[var(--text-muted)]">แคชแบ็ก {currentTier.cashback}</p>
          <p className="text-xs text-[var(--text-muted)]">
            ความคืบหน้าไป {nextTier.name}
          </p>
          <div className="h-3 overflow-hidden rounded-full bg-[var(--soft-card-elevated)]">
            <div
              className="h-full rounded-full bg-[var(--brand)]"
              style={{ width: `${PROGRESS_PERCENT}%` }}
            />
          </div>
          <p className="text-sm font-semibold">1450 / 5,000</p>
        </section>
      ) : null}

      {tab === "rank" ? (
        <section className="soft-panel space-y-3 p-4">
          <p className="text-center text-2xl font-bold">
            {carouselTier.emoji} {carouselTier.name}
          </p>
          <p className="text-center text-sm text-[var(--text-muted)]">
            เทิร์น {carouselTier.turnover.toLocaleString("th-TH")} · แคชแบ็ก{" "}
            {carouselTier.cashback}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={rankIndex === 0}
              className="h-10 rounded-[var(--radius-soft-sm)] bg-[var(--soft-card)] text-sm font-semibold disabled:opacity-40"
            >
              ก่อนหน้า
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={rankIndex === VIP_TIERS.length - 1}
              className="h-10 rounded-[var(--radius-soft-sm)] bg-[var(--soft-card)] text-sm font-semibold disabled:opacity-40"
            >
              ถัดไป
            </button>
          </div>
        </section>
      ) : null}

      {tab === "benefits" ? (
        <div className="soft-panel overflow-x-auto p-2">
          <table className="w-full min-w-[280px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--soft-border)] text-xs text-[var(--text-muted)]">
                <th className="px-2 py-2 font-semibold">แรงค์</th>
                <th className="px-2 py-2 font-semibold">เทิร์น</th>
                <th className="px-2 py-2 font-semibold">แคชแบ็ก</th>
                <th className="px-2 py-2 font-semibold">เงื่อนไข</th>
              </tr>
            </thead>
            <tbody>
              {VIP_TIERS.map((tier) => (
                <tr key={tier.id} className="border-b border-[var(--soft-border)] last:border-0">
                  <td className="px-2 py-2 font-semibold">
                    {tier.emoji} {tier.name}
                  </td>
                  <td className="px-2 py-2">{tier.turnover.toLocaleString("th-TH")}</td>
                  <td className="px-2 py-2">{tier.cashback}</td>
                  <td className="px-2 py-2 text-xs text-[var(--text-muted)]">{CONDITION_TEXT}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
