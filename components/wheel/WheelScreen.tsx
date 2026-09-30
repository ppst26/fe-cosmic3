"use client";

import { useEffect, useRef, useState } from "react";
import { useMember } from "@/components/member/MemberProvider";
import { GEMS_PER_SPIN, WHEEL_SEGMENTS } from "@/data/wheel";

function localToday(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function WheelScreen() {
  const { state, dispatch } = useMember();
  const [method, setMethod] = useState<"ticket" | "gems">("ticket");
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [lastWin, setLastWin] = useState<string | null>(null);
  const [termsOpen, setTermsOpen] = useState(false);
  const spinTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (spinTimerRef.current) {
        clearTimeout(spinTimerRef.current);
      }
    };
  }, []);

  const spinDisabled =
    spinning ||
    (method === "ticket" && state.tickets < 1) ||
    (method === "gems" && state.diamonds < GEMS_PER_SPIN);

  function handleSpin() {
    if (spinDisabled) return;

    const index = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
    const segment = WHEEL_SEGMENTS[index];

    setSpinning(true);
    setRotation((prev) => prev + 360 * 4 + index * 90);

    spinTimerRef.current = setTimeout(() => {
      dispatch({
        type: "spinWheel",
        method,
        prize: segment.label,
        credit: segment.credit,
        gems: segment.gems,
        at: localToday(),
      });
      setLastWin(segment.label);
      setSpinning(false);
      spinTimerRef.current = null;
    }, 2000);
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-[var(--text-muted)]">
        ตั๋ว {state.tickets} · เพชร {state.diamonds.toLocaleString("th-TH")}
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMethod("ticket")}
          className={`h-10 flex-1 rounded-[var(--radius-soft-sm)] text-sm font-semibold ${
            method === "ticket"
              ? "soft-btn-primary"
              : "bg-[var(--soft-card)] text-[var(--text-on-light)]"
          }`}
        >
          ใช้ตั๋ว (1)
        </button>
        <button
          type="button"
          onClick={() => setMethod("gems")}
          className={`h-10 flex-1 rounded-[var(--radius-soft-sm)] text-sm font-semibold ${
            method === "gems"
              ? "soft-btn-primary"
              : "bg-[var(--soft-card)] text-[var(--text-on-light)]"
          }`}
        >
          ใช้เพชร ({GEMS_PER_SPIN})
        </button>
      </div>

      <div className="relative mx-auto flex h-56 w-56 items-center justify-center">
        <div
          className="absolute h-full w-full rounded-full border-4 border-[var(--soft-card-elevated)]"
          style={{
            background: `conic-gradient(
              var(--brand-soft) 0deg 90deg,
              var(--soft-card-elevated) 90deg 180deg,
              var(--brand) 180deg 270deg,
              var(--soft-card) 270deg 360deg
            )`,
            transform: `rotate(${rotation}deg)`,
            transition: "transform 2s",
          }}
        />
        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--body)] text-lg shadow-[var(--shadow-soft-sm)]">
          🎡
        </div>
        <div
          className="absolute -top-1 left-1/2 z-20 h-0 w-0 -translate-x-1/2 border-l-8 border-r-8 border-b-[14px] border-l-transparent border-r-transparent border-b-[var(--brand)]"
          aria-hidden
        />
      </div>

      <ul className="grid grid-cols-2 gap-1 text-center text-[11px] text-[var(--text-muted)]">
        {WHEEL_SEGMENTS.map((seg) => (
          <li key={seg.id}>{seg.label}</li>
        ))}
      </ul>

      <button
        type="button"
        disabled={spinDisabled}
        onClick={handleSpin}
        className="soft-btn-primary h-11 w-full text-sm font-semibold disabled:opacity-50"
      >
        {spinning ? "กำลังหมุน..." : "หมุนวงล้อ"}
      </button>

      {lastWin ? (
        <p className="text-sm font-semibold text-[var(--brand)]">ผลลัพธ์: {lastWin}</p>
      ) : null}

      <button
        type="button"
        onClick={() => setTermsOpen((open) => !open)}
        className="h-10 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card)] text-sm font-semibold text-[var(--text-on-light)]"
      >
        {termsOpen ? "ซ่อนเงื่อนไข" : "ดูเงื่อนไข"}
      </button>
      {termsOpen ? (
        <p className="soft-panel p-3 text-sm text-[var(--text-muted)]">
          หมุนครั้งละ 1 ตั๋ว หรือ 50 เพชร
        </p>
      ) : null}

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-[var(--text-on-light)]">ผู้โชคดีล่าสุด</h2>
        <ul className="space-y-1">
          {state.wheelWinners.map((row, i) => (
            <li
              key={`${row}-${i}`}
              className="rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] px-3 py-2 text-xs text-[var(--text-on-light)]"
            >
              {row}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-[var(--text-on-light)]">ประวัติการหมุน</h2>
        {state.wheelHistory.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">ยังไม่มีประวัติ</p>
        ) : (
          <ul className="space-y-1">
            {state.wheelHistory.map((row) => (
              <li
                key={row.id}
                className="flex justify-between rounded-[var(--radius-soft-sm)] bg-[var(--soft-card)] px-3 py-2 text-xs text-[var(--text-on-light)]"
              >
                <span>{row.prize}</span>
                <span className="text-[var(--text-muted)]">{row.at}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
