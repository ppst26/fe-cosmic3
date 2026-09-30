"use client";

import { useState } from "react";
import { SubPageShell } from "@/components/layout/SubPageShell";
import { VIP_TIERS } from "@/data/member";

export default function VipPage() {
  const [tab, setTab] = useState<"my-tier" | "rank" | "privileges">("my-tier");
  const current = VIP_TIERS[2];

  return (
    <SubPageShell title="แรงค์ VIP">
      <div className="mb-3 grid grid-cols-3 gap-2">
        {(
          [
            ["my-tier", "ระดับฉัน"],
            ["rank", "ตารางแรงค์"],
            ["privileges", "สิทธิพิเศษ"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`h-10 rounded-full text-xs font-semibold ${
              tab === key ? "bg-[var(--brand)] text-white" : "bg-[var(--soft-card-elevated)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === "my-tier" ? (
        <section className="soft-panel p-4">
          <p className="text-2xl">
            {current.emoji} {current.name}
          </p>
          <p className="text-sm text-[var(--text-muted)]">แคชแบ็ก {current.cashback}</p>
          <p className="mt-2 text-sm">เทิร์นสะสม 1,450 / {VIP_TIERS[3].turnover.toLocaleString("th-TH")} เพื่อขึ้น Platinum</p>
        </section>
      ) : null}
      {tab !== "my-tier" ? (
        <ul className="space-y-2">
          {VIP_TIERS.map((tier) => (
            <li key={tier.id} className="soft-card p-3 text-sm">
              <p className="font-semibold">
                {tier.emoji} {tier.name}
              </p>
              <p className="text-[var(--text-muted)]">
                เทิร์น {tier.turnover.toLocaleString("th-TH")} · แคชแบ็ก {tier.cashback}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </SubPageShell>
  );
}
