"use client";

import { useState } from "react";
import { useMember } from "@/components/member/MemberProvider";
import { CHECKIN_DAYS } from "@/data/member";

export function CheckInScreen() {
  const { state, dispatch } = useMember();
  const [message, setMessage] = useState("");
  const claimedCount =
    CHECKIN_DAYS.filter(
      (item) => item.claimed || (item.today && state.checkedInToday),
    ).length;

  function handleCheckIn() {
    const todayRow = CHECKIN_DAYS.find((item) => item.today);
    if (!todayRow) return;
    dispatch({ type: "checkIn", diamonds: todayRow.reward });
    setMessage("รับเพชรวันนี้แล้ว");
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-[var(--text-muted)]">
        เช็คอินสะสม {claimedCount}/7 วัน เหลืออีก {7 - claimedCount} วันถึงโบนัสครบสัปดาห์
      </p>
      <ul className="grid grid-cols-7 gap-1">
        {CHECKIN_DAYS.map((item) => {
          const claimed = item.claimed || (item.today && state.checkedInToday);
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
        disabled={state.checkedInToday}
        onClick={handleCheckIn}
        className="soft-btn-primary h-11 w-full text-sm font-semibold disabled:opacity-50"
      >
        {state.checkedInToday ? "เช็คอินวันนี้แล้ว" : "เช็คอินวันนี้"}
      </button>
      {message ? <p className="text-sm text-[var(--brand)]">{message}</p> : null}
    </div>
  );
}
