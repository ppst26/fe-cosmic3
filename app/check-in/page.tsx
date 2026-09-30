"use client";

import { useState } from "react";
import { SubPageShell } from "@/components/layout/SubPageShell";
import { CHECKIN_DAYS } from "@/data/member";

export default function CheckInPage() {
  const [claimedToday, setClaimedToday] = useState(false);
  const [message, setMessage] = useState("");
  const count = claimedToday ? 2 : 1;

  return (
    <SubPageShell title="เช็คอินรายวัน">
      <p className="mb-3 text-sm text-[var(--text-muted)]">
        เช็คอินสะสม {count}/7 วัน เหลืออีก {7 - count} วันถึงโบนัสครบสัปดาห์
      </p>
      <ul className="grid grid-cols-7 gap-1">
        {CHECKIN_DAYS.map((item) => {
          const claimed = item.claimed || (item.today && claimedToday);
          return (
            <li
              key={item.day}
              className={`rounded-[var(--radius-soft-sm)] p-1 text-center text-[11px] ${
                item.today ? "bg-[var(--brand-soft)]" : "bg-[var(--soft-card-elevated)]"
              }`}
            >
              <p>{item.day}</p>
              <p className="font-bold">{item.reward}</p>
              <p>{claimed ? "รับแล้ว" : item.special ? "พิเศษ" : "รอ"}</p>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        disabled={claimedToday}
        onClick={() => {
          setClaimedToday(true);
          setMessage("รับเพชรวันนี้แล้ว +5");
        }}
        className="soft-btn-primary mt-4 h-11 w-full text-sm font-semibold disabled:opacity-50"
      >
        {claimedToday ? "เช็คอินวันนี้แล้ว" : "เช็คอินวันนี้"}
      </button>
      {message ? <p className="mt-3 text-sm text-[var(--brand)]">{message}</p> : null}
    </SubPageShell>
  );
}
