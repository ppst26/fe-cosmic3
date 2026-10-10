"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { CASHBACK_RATES } from "@/data/cashback";

type CashbackTab = keyof typeof CASHBACK_RATES;

function localToday(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function CommissionScreen() {
  const { state, dispatch } = useAuth();
  const [tab, setTab] = useState<CashbackTab>("play");

  const config = CASHBACK_RATES[tab];
  const amount = tab === "play" ? state.cashbackPlay : state.cashbackLoss;
  const canClaim = amount > 0 && amount >= config.min;

  function handleClaim() {
    dispatch({ type: "claimCashback", tab, at: localToday() });
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(CASHBACK_RATES) as CashbackTab[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`h-10 rounded-[var(--radius-soft-sm)] text-sm font-semibold ${
              tab === key
                ? "soft-btn-primary"
                : "bg-[var(--soft-card)] text-[var(--text-on-light)]"
            }`}
          >
            {CASHBACK_RATES[key].label}
          </button>
        ))}
      </div>

      <section className="soft-panel space-y-2 p-4">
        <p className="text-sm text-[var(--text-muted)]">ยอดที่รับได้</p>
        <p className="text-2xl font-bold">{amount.toLocaleString("th-TH")} บาท</p>
        <p className="text-xs text-[var(--text-muted)]">
          อัตรา {config.rate} · ขั้นต่ำ {config.min} บาท
        </p>
        <button
          type="button"
          disabled={!canClaim}
          onClick={handleClaim}
          className="soft-btn-primary mt-2 h-10 w-full text-sm font-semibold disabled:opacity-40"
        >
          รับยอด
        </button>
      </section>

      <ul className="space-y-2">
        {state.cashbackClaims.map((item) => (
          <li key={item.id} className="soft-card flex justify-between p-3 text-sm">
            <span>
              {CASHBACK_RATES[item.tab].label}
              <span className="block text-xs text-[var(--text-muted)]">{item.at}</span>
            </span>
            <span>{item.amount.toLocaleString("th-TH")} บาท</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
