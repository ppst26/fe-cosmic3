"use client";

import Link from "@/lib/i18n/navigation";
import { useAuth } from "@/context/AuthContext";

type SlipDetailScreenProps = {
  slipId: string;
};

export function SlipDetailScreen({ slipId }: SlipDetailScreenProps) {
  const { state } = useAuth();
  const slip = state.lotterySlips.find((s) => s.id === slipId);

  if (!slip) {
    return (
      <div className="soft-card space-y-3 p-4 text-center">
        <p className="text-sm text-[var(--text-on-light)]">ไม่พบรอบ</p>
        <Link
          href="/lottery/slips"
          className="soft-btn-outline inline-flex h-10 items-center px-4 text-sm font-semibold"
        >
          กลับรายการโพย
        </Link>
      </div>
    );
  }

  return (
    <div className="soft-card space-y-3 p-3">
      <ul className="space-y-2">
        {slip.lines.map((line) => (
          <li
            key={line.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] p-2 text-sm text-[var(--text-on-light)]"
          >
            <span className="font-semibold">{line.betType}</span>
            <span>{line.number}</span>
            <span>{line.price} บาท</span>
          </li>
        ))}
      </ul>
      <p className="text-sm font-bold text-[var(--text-on-light)]">
        รวม {slip.total} บาท
      </p>
    </div>
  );
}
