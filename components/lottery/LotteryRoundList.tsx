"use client";

import Link from "@/lib/i18n/navigation";
import { getMarket } from "@/data/lottery";

type LotteryRoundListProps = {
  marketId: string;
  basePath: string;
};

export function LotteryRoundList({ marketId, basePath }: LotteryRoundListProps) {
  const market = getMarket(marketId);

  if (!market) {
    return (
      <div className="soft-card space-y-3 p-4 text-center">
        <p className="text-sm text-[var(--text-on-light)]">ไม่พบรอบ</p>
        <Link
          href="/lottery"
          className="soft-btn-outline inline-flex h-10 items-center px-4 text-sm font-semibold"
        >
          กลับหวย
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {market.rounds.map((round) => (
        <li key={round.id}>
          <Link
            href={`${basePath}/${round.id}`}
            className="soft-card flex h-10 items-center px-3 text-sm font-semibold text-[var(--text-on-light)]"
          >
            {round.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
