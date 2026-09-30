"use client";

import { useMemo, useState } from "react";
import { useMember } from "@/components/member/MemberProvider";
import { ACTIVITIES, type ActivityItem } from "@/data/activities";

type CategoryFilter = "all" | "slot" | "casino";

const CATEGORY_BUTTONS: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "ทั้งหมด" },
  { key: "slot", label: "สล็อต" },
  { key: "casino", label: "คาสิโน" },
];

function localToday(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function ActivitiesScreen() {
  const { state, dispatch } = useMember();
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const filtered = useMemo(() => {
    if (category === "all") return ACTIVITIES;
    return ACTIVITIES.filter((a) => a.category === category);
  }, [category]);

  const selected = useMemo(
    () => ACTIVITIES.find((a) => a.id === selectedId) ?? null,
    [selectedId],
  );

  function handleClaim(activity: ActivityItem) {
    dispatch({
      type: "claimActivity",
      id: activity.id,
      reward: activity.rewardBaht,
      at: localToday(),
    });
    setMessage("รับรางวัลแล้ว");
  }

  return (
    <div className="space-y-3">
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
        {filtered.map((activity) => (
          <li key={activity.id}>
            <button
              type="button"
              onClick={() => setSelectedId(activity.id)}
              className={`soft-card w-full p-3 text-left ${
                selectedId === activity.id ? "ring-2 ring-[var(--brand)]" : ""
              }`}
            >
              <p className="text-xs font-bold text-[var(--brand)]">
                {activity.category === "slot" ? "สล็อต" : "คาสิโน"}
              </p>
              <p className="font-semibold">{activity.title}</p>
              <p className="text-sm text-[var(--text-muted)]">
                รางวัล {activity.rewardBaht} บาท
              </p>
            </button>
          </li>
        ))}
      </ul>

      {selected ? (
        <div className="soft-card space-y-3 p-3">
          <p className="font-semibold">{selected.title}</p>
          <p className="text-sm">
            ยอด Turn ปัจจุบัน:{" "}
            <span className="font-semibold">{selected.currentTurn}</span>
          </p>
          <p className="text-sm">
            เป้าหมาย: <span className="font-semibold">{selected.targetTurn}</span>
          </p>
          <div className="h-2 overflow-hidden rounded-full bg-[var(--soft-card-elevated)]">
            <div
              className="h-full rounded-full bg-[var(--brand)]"
              style={{
                width: `${Math.min(
                  100,
                  (selected.currentTurn / selected.targetTurn) * 100,
                )}%`,
              }}
            />
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--text-muted)]">
                <th className="pb-1 font-semibold">ระดับ</th>
                <th className="pb-1 font-semibold">เป้าหมาย</th>
                <th className="pb-1 font-semibold">รางวัล</th>
              </tr>
            </thead>
            <tbody>
              {selected.tiers.map((tier) => (
                <tr key={tier.rank}>
                  <td className="py-1">{tier.rank}</td>
                  <td className="py-1">{tier.target}</td>
                  <td className="py-1">{tier.reward} บาท</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            disabled={
              selected.currentTurn < selected.targetTurn ||
              state.claimedActivityIds.includes(selected.id)
            }
            onClick={() => handleClaim(selected)}
            className="soft-btn-primary h-11 w-full text-sm font-semibold disabled:opacity-40"
          >
            {state.claimedActivityIds.includes(selected.id)
              ? "รับแล้ว"
              : "รับรางวัล"}
          </button>
        </div>
      ) : null}

      {message ? (
        <p className="text-center text-sm font-semibold text-[var(--brand)]">{message}</p>
      ) : null}
    </div>
  );
}
