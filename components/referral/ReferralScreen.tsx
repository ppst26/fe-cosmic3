"use client";

import { useMemo, useState } from "react";
import { useMember } from "@/components/member/MemberProvider";
import { MEMBER, REFERRAL_LINK } from "@/data/member";
import { REFERRAL_EARNING_ROWS, REFERRAL_FRIENDS } from "@/data/referral";
import { filterReferralRows } from "@/lib/referralFilter";

type ReferralTab = "overview" | "friends" | "earnings";
type EarningsRange = "all" | "today" | "last_week" | "last_month";

const TABS: { key: ReferralTab; label: string }[] = [
  { key: "overview", label: "ภาพรวม" },
  { key: "friends", label: "เพื่อนที่แนะนำ" },
  { key: "earnings", label: "รายได้" },
];

const RANGE_BUTTONS: { key: EarningsRange; label: string }[] = [
  { key: "all", label: "ทั้งหมด" },
  { key: "today", label: "วันนี้" },
  { key: "last_week", label: "สัปดาห์ก่อน" },
  { key: "last_month", label: "เดือนก่อน" },
];

const OVERVIEW_STEPS = ["คัดลอกลิงก์", "ส่งให้เพื่อน", "รับรายได้เมื่อเพื่อนเล่น"];

function localToday(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function ReferralScreen() {
  const { state, dispatch } = useMember();
  const [tab, setTab] = useState<ReferralTab>("overview");
  const [friendQuery, setFriendQuery] = useState("");
  const [range, setRange] = useState<EarningsRange>("all");
  const [message, setMessage] = useState("");

  const today = localToday();

  const friends = useMemo(() => {
    const q = friendQuery.trim();
    if (!q) return REFERRAL_FRIENDS;
    return REFERRAL_FRIENDS.filter((friend) => friend.name.includes(q));
  }, [friendQuery]);

  const earningRows = useMemo(
    () => filterReferralRows(REFERRAL_EARNING_ROWS, range, today),
    [range, today],
  );

  function handleCopyLink() {
    void navigator.clipboard?.writeText(REFERRAL_LINK);
    setMessage("คัดลอกลิงก์แล้ว");
  }

  function handleWithdraw() {
    dispatch({ type: "withdrawReferral", at: localToday() });
    setMessage("ถอนรายได้เข้ากระเป๋าแล้ว");
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`h-10 rounded-[var(--radius-soft-sm)] text-xs font-semibold sm:text-sm ${
              tab === key
                ? "soft-btn-primary"
                : "bg-[var(--soft-card)] text-[var(--text-on-light)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "overview" ? (
        <section className="soft-panel space-y-3 p-4">
          <ol className="list-decimal space-y-2 pl-5 text-sm">
            {OVERVIEW_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="text-sm text-[var(--text-muted)]">ลิงก์แนะนำ</p>
          <p className="break-all text-sm">{REFERRAL_LINK}</p>
          <button
            type="button"
            onClick={handleCopyLink}
            className="soft-btn-outline h-10 w-full text-sm font-semibold"
          >
            คัดลอกลิงก์ของ {MEMBER.username}
          </button>
        </section>
      ) : null}

      {tab === "friends" ? (
        <>
          <input
            value={friendQuery}
            onChange={(event) => setFriendQuery(event.target.value)}
            placeholder="ค้นหาชื่อเพื่อน"
            className="h-10 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] px-3 text-sm outline-none"
          />
          <ul className="space-y-2">
            {friends.map((friend) => (
              <li key={friend.id} className="soft-card p-3 text-sm font-semibold">
                {friend.name}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {tab === "earnings" ? (
        <>
          <section className="soft-panel p-4">
            <p className="text-sm text-[var(--text-muted)]">รายได้ถอนได้</p>
            <p className="text-2xl font-bold">
              {state.referralEarnings.toLocaleString("th-TH")} บาท
            </p>
            <button
              type="button"
              disabled={state.referralEarnings <= 0}
              onClick={handleWithdraw}
              className="soft-btn-primary mt-3 h-10 w-full text-sm font-semibold disabled:opacity-40"
            >
              ถอนรายได้
            </button>
          </section>

          <div className="flex gap-2 overflow-x-auto">
            {RANGE_BUTTONS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setRange(key)}
                className={`h-10 shrink-0 rounded-full px-3 text-xs font-semibold ${
                  range === key
                    ? "bg-[var(--brand)] text-white"
                    : "bg-[var(--soft-card-elevated)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <ul className="space-y-2">
            {earningRows.map((row) => (
              <li key={row.id} className="soft-card p-3 text-sm">
                <span className="text-[var(--text-muted)]">{row.at}</span>
                <span className="block font-semibold">
                  {row.category} · ค่าคอม {row.commission.toLocaleString("th-TH")} บาท
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {message ? <p className="text-sm text-[var(--brand)]">{message}</p> : null}
    </div>
  );
}
