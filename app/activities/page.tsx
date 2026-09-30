"use client";

import { useState } from "react";
import { SubPageShell } from "@/components/layout/SubPageShell";
import { ACTIVITIES } from "@/data/member";

export default function ActivitiesPage() {
  const [joined, setJoined] = useState<string | null>(null);

  return (
    <SubPageShell title="กิจกรรม" nav="events">
      <ul className="space-y-2">
        {ACTIVITIES.map((activity) => (
          <li key={activity.id} className="soft-card p-3">
            <p className="text-xs font-bold text-[var(--brand)]">
              {activity.emoji} {activity.badge}
            </p>
            <p className="font-semibold">{activity.title}</p>
            <p className="text-sm text-[var(--text-muted)]">{activity.description}</p>
            <p className="mt-1 text-sm">{activity.reward}</p>
            <button
              type="button"
              disabled={!activity.open}
              onClick={() => setJoined(activity.id)}
              className="soft-btn-primary mt-2 h-10 w-full text-sm font-semibold disabled:opacity-40"
            >
              {activity.open ? (joined === activity.id ? "เข้าร่วมแล้ว" : "เข้าร่วม") : "ปิดรับแล้ว"}
            </button>
          </li>
        ))}
      </ul>
    </SubPageShell>
  );
}
