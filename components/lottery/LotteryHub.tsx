"use client";

import Link from "next/link";
import { listMarkets } from "@/data/lottery";

export function LotteryHub() {
  const general = listMarkets("general");
  const government = listMarkets("government");
  const yiki = listMarkets("yiki");

  return (
    <div className="space-y-4">
      <section className="soft-card p-3">
        <h2 className="mb-2 text-sm font-bold text-[var(--text-on-light)]">หวยทั่วไป</h2>
        <ul className="space-y-2">
          {general.map((market) => (
            <li key={market.id}>
              <Link
                href={`/lottery/${market.id}`}
                className="flex h-10 items-center rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] px-3 text-sm font-semibold text-[var(--text-on-light)]"
              >
                {market.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="soft-card p-3">
        <h2 className="mb-2 text-sm font-bold text-[var(--text-on-light)]">หวยรัฐบาล</h2>
        <ul className="space-y-2">
          {government.map((market) => (
            <li key={market.id}>
              <Link
                href="/lottery/thai-government"
                className="flex h-10 items-center rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] px-3 text-sm font-semibold text-[var(--text-on-light)]"
              >
                {market.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="soft-card p-3">
        <h2 className="mb-2 text-sm font-bold text-[var(--text-on-light)]">ยี่กี</h2>
        <ul className="space-y-2">
          {yiki.map((market) => (
            <li key={market.id}>
              <Link
                href={`/lottery/${market.id}`}
                className="flex h-10 items-center rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] px-3 text-sm font-semibold text-[var(--text-on-light)]"
              >
                {market.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
