"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useMember } from "@/components/member/MemberProvider";
import { PROMOTIONS, type PromotionItem } from "@/data/homeLobby";

type CategoryFilter = "general" | "special";

const CATEGORY_BUTTONS: { key: CategoryFilter; label: string }[] = [
  { key: "general", label: "โปรโมชั่น" },
  { key: "special", label: "โปรโมชั่นพิเศษ" },
];

export function PromotionsScreen() {
  const { state, dispatch } = useMember();
  const [category, setCategory] = useState<CategoryFilter>("general");
  const [selected, setSelected] = useState<PromotionItem | null>(null);
  const [message, setMessage] = useState("");

  const items = useMemo(
    () => PROMOTIONS.filter((promo) => promo.category === category),
    [category],
  );

  function handleToggleOptIn() {
    const next = !state.promoOptIn;
    dispatch({ type: "setPromoOptIn", value: next });
    setMessage(
      next
        ? "เปิดรับโปรโมชั่นแล้ว ท่านจะได้รับสิทธิพิเศษทุกยอดฝาก"
        : "ปิดรับโปรโมชั่นแล้ว ยอดฝากจะไม่ติดเงื่อนไขเทิร์นโอเวอร์",
    );
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleToggleOptIn}
        className={`h-10 w-full rounded-[var(--radius-soft-sm)] text-sm font-semibold ${
          state.promoOptIn
            ? "soft-btn-primary"
            : "bg-[var(--soft-card)] text-[var(--text-on-light)]"
        }`}
      >
        {state.promoOptIn ? "เปิดรับโปรโมชั่น" : "ปิดรับโปรโมชั่น"}
      </button>

      <div className="flex gap-2">
        {CATEGORY_BUTTONS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setCategory(key)}
            className={`h-10 flex-1 rounded-[var(--radius-soft-sm)] text-sm font-semibold ${
              category === key
                ? "soft-btn-primary"
                : "bg-[var(--soft-card)] text-[var(--text-on-light)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {items.map((promo) => (
          <li key={promo.id}>
            <button
              type="button"
              onClick={() => setSelected(promo)}
              className={`soft-card w-full p-3 text-left ${
                selected?.id === promo.id ? "ring-2 ring-[var(--brand)]" : ""
              }`}
            >
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
        <div className="soft-card space-y-3 p-3">
          <p className="font-semibold">{selected.title}</p>
          <p className="text-sm text-[var(--text-muted)]">{selected.desc}</p>
          <Link
            href="/wallet?tab=deposit"
            className="soft-btn-primary flex h-10 w-full items-center justify-center text-sm font-semibold"
          >
            รับโปรและไปฝากเงิน
          </Link>
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="h-10 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] text-sm font-semibold text-[var(--text-on-light)]"
          >
            ปิด
          </button>
        </div>
      ) : null}

      {message ? (
        <p className="text-center text-sm font-semibold text-[var(--brand)]">
          {message}
        </p>
      ) : null}
    </div>
  );
}
