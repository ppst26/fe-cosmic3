"use client";

import Link from "next/link";
import type {
  LotteryFeaturedItem,
  LotteryGridItem,
  LotteryResultRow,
} from "@/types/lotteryHub";
import {
  LOTTERY_FEATURED_ITEMS,
  LOTTERY_GRID_ITEMS,
  LOTTERY_LATEST_RESULTS,
} from "@/data/lotteryHubMockData";
import { LotteryCountdown, LotteryFlagOrb } from "./LotteryFlagOrb";
import { LotteryLatestResultsTable } from "./LotteryLatestResultsTable";

type LotteryHubContentProps = {
  showPageHeading?: boolean;
  featured?: LotteryFeaturedItem[];
  gridItems?: LotteryGridItem[];
  results?: LotteryResultRow[];
};

export function LotteryHubContent({
  showPageHeading = true,
  featured = LOTTERY_FEATURED_ITEMS,
  gridItems = LOTTERY_GRID_ITEMS,
  results = LOTTERY_LATEST_RESULTS,
}: LotteryHubContentProps) {
  return (
    <div className="lottery-hub-theme lottery-hub flex min-w-0 flex-col gap-5 sm:gap-6">
      {showPageHeading ? (
        <header className="lottery-hub__head min-w-0">
          <h2 className="text-lg font-bold tracking-tight text-[var(--text-on-light)] sm:text-xl">
            แทงหวย
          </h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">เลือกประเภทหวยที่ต้องการแทง</p>
        </header>
      ) : null}

      <section className="lottery-hub__featured" aria-label="หวยแนะนำ">
        <div className="lottery-feature-grid grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2">
          {featured.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`lottery-feature-card lottery-soft-card lottery-feature-card--${item.visual} flex min-h-[5.5rem] items-center gap-3 px-4 py-3`}
            >
              {item.visual === "thai-gov" ? (
                <LotteryFlagOrb label="TH" tone="th" size="lg" />
              ) : (
                <span
                  className="lottery-feature-card__yiki relative h-[3.25rem] w-[3.25rem] shrink-0"
                  aria-hidden="true"
                >
                  <span className="lottery-feature-card__yiki-ball grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full text-sm font-bold">
                    YK
                  </span>
                  <span className="lottery-feature-card__yiki-coin absolute right-[-0.15rem] bottom-0 h-5 w-5 rounded-full" />
                </span>
              )}
              <span className="lottery-feature-card__text flex min-w-0 flex-col items-start gap-1">
                <span className="lottery-feature-card__title font-semibold">{item.title}</span>
                <LotteryCountdown label={item.countdownLabel} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="lottery-hub__markets min-w-0" aria-label="ประเภทหวยทั้งหมด">
        <h3 className="mb-2 text-sm font-bold text-[var(--text-on-light)]">ตลาดหวย</h3>
        <div className="lottery-type-grid grid grid-cols-2 gap-2 md:grid-cols-3">
          {gridItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="lottery-type-card lottery-soft-card flex min-h-[4.25rem] items-center gap-2 px-3 py-2"
            >
              <LotteryFlagOrb label={item.flagLabel} tone={item.flagTone} size="sm" />
              <span className="lottery-type-card__body flex min-w-0 flex-col gap-0.5">
                <span className="lottery-type-card__title truncate text-sm font-semibold">
                  {item.title}
                </span>
                {item.status === "closed" ? (
                  <span className="lottery-type-card__closed text-xs">ปิดรับแทง</span>
                ) : (
                  <LotteryCountdown label={item.countdownLabel ?? "—"} />
                )}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <LotteryLatestResultsTable results={results} />
    </div>
  );
}
