"use client";

import { useMemo, useState } from "react";
import { SubPageShell } from "@/components/layout/SubPageShell";
import { MEMBER, REFERRAL_LINK } from "@/data/member";

const RECORDS = [
  { id: "c1", category: "สล็อต", bet: 12000, rate: "0.6%", commission: 72, friends: 4 },
  { id: "c2", category: "คาสิโน", bet: 8000, rate: "0.4%", commission: 32, friends: 2 },
  { id: "c3", category: "กีฬา", bet: 5000, rate: "0.5%", commission: 25, friends: 1 },
];

export default function ReferralPage() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [balance, setBalance] = useState(1280);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const rows = useMemo(
    () => RECORDS.filter((row) => row.category.includes(query)),
    [query],
  );

  return (
    <SubPageShell title="ชวนเพื่อน">
      <section className="soft-panel space-y-2 p-4 text-sm">
        <p>ลิงก์แนะนำ</p>
        <p className="break-all text-[var(--text-muted)]">{REFERRAL_LINK}</p>
        <button
          type="button"
          className="soft-btn-outline h-10 w-full font-semibold"
          onClick={() => {
            void navigator.clipboard?.writeText(REFERRAL_LINK);
            setMessage("คัดลอกลิงก์แล้ว");
          }}
        >
          คัดลอกลิงก์ของ {MEMBER.username}
        </button>
      </section>
      <p className="mt-3 text-sm">รายได้ถอนได้ {balance.toLocaleString("th-TH")} บาท</p>
      <div className="mt-2 flex gap-2 overflow-x-auto">
        {[
          ["all", "ทั้งหมด"],
          ["today", "วันนี้"],
          ["last_week", "สัปดาห์ก่อน"],
          ["last_month", "เดือนก่อน"],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`h-9 shrink-0 rounded-full px-3 text-xs font-semibold ${
              filter === key ? "bg-[var(--brand)] text-white" : "bg-[var(--soft-card-elevated)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="ค้นหาหมวด"
        className="mt-3 h-11 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] px-3 outline-none"
      />
      <ul className="mt-3 space-y-2">
        {rows.map((row) => (
          <li key={row.id} className="soft-card p-3 text-sm">
            {row.category} · เดิมพัน {row.bet.toLocaleString("th-TH")} · {row.rate} · เพื่อน {row.friends}
            <span className="block font-semibold text-[var(--brand)]">
              ค่าคอม {row.commission} บาท
            </span>
          </li>
        ))}
      </ul>
      <form
        className="mt-3 space-y-2"
        onSubmit={(event) => {
          event.preventDefault();
          const value = Number(amount);
          if (!value || value > balance) {
            setMessage("จำนวนถอนไม่ถูกต้อง");
            return;
          }
          setBalance((current) => current - value);
          setAmount("");
          setMessage("ถอนค่าคอมเข้ากระเป๋าแล้ว");
        }}
      >
        <input
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="จำนวนที่ต้องการถอน"
          className="h-11 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] px-3 outline-none"
        />
        <button type="submit" className="soft-btn-primary h-11 w-full text-sm font-semibold">
          ถอนรายได้
        </button>
      </form>
      {message ? <p className="mt-3 text-sm text-[var(--brand)]">{message}</p> : null}
    </SubPageShell>
  );
}
