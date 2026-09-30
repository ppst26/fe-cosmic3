"use client";

import { useState } from "react";
import { SubPageShell } from "@/components/layout/SubPageShell";

type Tab = "turnover" | "cashback";

export default function CommissionPage() {
  const [tab, setTab] = useState<Tab>("turnover");
  const [turnover, setTurnover] = useState(45.2);
  const [cashback, setCashback] = useState(250);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([
    { id: "h1", type: "คืนยอดเล่น", amount: 45.2, at: "2026-09-28" },
    { id: "h2", type: "คืนยอดเสีย", amount: 250, at: "2026-09-22" },
  ]);
  const amount = tab === "turnover" ? turnover : cashback;

  return (
    <SubPageShell title="คอมมิชชั่น">
      <div className="mb-3 grid grid-cols-2 gap-2">
        {(
          [
            ["turnover", "คืนยอดเล่น"],
            ["cashback", "คืนยอดเสีย"],
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
      <section className="soft-panel p-4">
        <p className="text-sm text-[var(--text-muted)]">ยอดที่รับได้</p>
        <p className="text-2xl font-bold">{amount.toLocaleString("th-TH")} บาท</p>
        <p className="text-xs text-[var(--text-muted)]">{tab === "turnover" ? "อัตรา 0.5%" : "อัตรา 5%"}</p>
        <button
          type="button"
          disabled={amount <= 0}
          onClick={() => {
            setHistory((list) => [
              { id: `h-${Date.now()}`, type: tab === "turnover" ? "คืนยอดเล่น" : "คืนยอดเสีย", amount, at: "เมื่อสักครู่" },
              ...list,
            ]);
            if (tab === "turnover") setTurnover(0);
            else setCashback(0);
            setMessage("รับยอดเข้ากระเป๋าแล้ว");
          }}
          className="soft-btn-primary mt-3 h-11 w-full text-sm font-semibold disabled:opacity-40"
        >
          รับยอด
        </button>
      </section>
      <ul className="mt-3 space-y-2">
        {history.map((item) => (
          <li key={item.id} className="soft-card flex justify-between p-3 text-sm">
            <span>
              {item.type}
              <span className="block text-xs text-[var(--text-muted)]">{item.at}</span>
            </span>
            <span>{item.amount.toLocaleString("th-TH")}</span>
          </li>
        ))}
      </ul>
      {message ? <p className="mt-3 text-sm text-[var(--brand)]">{message}</p> : null}
    </SubPageShell>
  );
}
