"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export function SlipListScreen() {
  const { state } = useAuth();
  const slips = state.lotterySlips;

  if (slips.length === 0) {
    return (
      <div className="soft-card p-4 text-center">
        <p className="text-sm text-[var(--text-muted)]">ยังไม่มีโพย</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {slips.map((slip) => (
        <li key={slip.id}>
          <Link
            href={`/lottery/slips/${slip.id}`}
            className="soft-card flex h-10 items-center justify-between gap-2 px-3 text-sm font-semibold text-[var(--text-on-light)]"
          >
            <span>{slip.marketId}</span>
            <span className="text-[var(--text-muted)]">{slip.total} บาท</span>
            <span className="text-xs text-[var(--text-muted)]">{slip.status}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
