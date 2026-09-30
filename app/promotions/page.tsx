"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubPageShell } from "@/components/layout/SubPageShell";
import { PROMOTIONS, type PromotionItem } from "@/data/homeLobby";

export default function PromotionsPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"all" | "special">("all");
  const [optIn, setOptIn] = useState(false);
  const [selected, setSelected] = useState<PromotionItem | null>(null);
  const [message, setMessage] = useState("");

  const items = PROMOTIONS.filter((promo) =>
    tab === "all" ? promo.category === "general" : promo.category === "special",
  );

  return (
    <SubPageShell title="โปรโมชั่น" nav="promo">
      <button
        type="button"
        onClick={() => {
          const next = !optIn;
          setOptIn(next);
          setMessage(
            next
              ? "เปิดรับโปรโมชั่นแล้ว ท่านจะได้รับสิทธิพิเศษทุกยอดฝาก"
              : "ปิดรับโปรโมชั่นแล้ว ยอดฝากจะไม่ติดเงื่อนไขเทิร์นโอเวอร์",
          );
        }}
        className={`mb-3 h-11 w-full rounded-full text-sm font-semibold ${
          optIn ? "soft-btn-primary" : "bg-[var(--soft-card-elevated)]"
        }`}
      >
        {optIn ? "เปิดรับโปรโมชั่น" : "ปิดรับโปรโมชั่น"}
      </button>
      <div className="mb-3 grid grid-cols-2 gap-2">
        {(
          [
            ["all", "โปรโมชั่น"],
            ["special", "โปรโมชั่นพิเศษ"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`h-10 rounded-full text-sm font-semibold ${
              tab === key ? "bg-[var(--brand)] text-white" : "bg-[var(--soft-card-elevated)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <ul className="space-y-2">
        {items.map((promo) => (
          <li key={promo.id}>
            <button type="button" onClick={() => setSelected(promo)} className="soft-card w-full p-3 text-left">
              <p className="text-xs font-bold text-[var(--brand)]">
                {promo.emoji} {promo.tag}
              </p>
              <p className="font-semibold">{promo.title}</p>
              <p className="text-sm text-[var(--text-muted)]">{promo.desc}</p>
            </button>
          </li>
        ))}
      </ul>
      {selected ? (
        <div className="soft-panel mt-3 space-y-2 p-4 text-sm">
          <p className="font-bold">{selected.title}</p>
          <p>{selected.desc}</p>
          <button
            type="button"
            className="soft-btn-primary h-11 w-full font-semibold"
            onClick={() => router.push("/wallet?tab=deposit-withdraw&sub=deposit")}
          >
            รับโปรและไปฝากเงิน
          </button>
          <button type="button" className="w-full" onClick={() => setSelected(null)}>
            ปิด
          </button>
        </div>
      ) : null}
      {message ? <p className="mt-3 text-sm text-[var(--brand)]">{message}</p> : null}
    </SubPageShell>
  );
}
