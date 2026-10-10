"use client";

import { useMemo } from "react";
import { getLotteryCatalogEntry } from "@/data/lotteryCatalog";
import { getLotteryPlayRounds } from "@/data/lotteryRounds";
import { THAI_LOTTO_LAST_RESULT } from "@/data/thaiLottoResult";
import { LotteryMarketShell } from "./LotteryMarketShell";
import { LotteryPlayRoundList } from "./LotteryPlayRoundList";
import { ThaiLottoResultPanel } from "./ThaiLottoResultPanel";

type LotteryMarketRoundsViewProps = {
  marketSlug: string;
};

export function LotteryMarketRoundsView({ marketSlug }: LotteryMarketRoundsViewProps) {
  const entry = getLotteryCatalogEntry(marketSlug);
  const rounds = useMemo(() => getLotteryPlayRounds(marketSlug), [marketSlug]);

  if (!entry) {
    return (
      <div className="soft-card p-4 text-center">
        <p className="text-sm text-[var(--text-muted)]">ไม่พบประเภทหวยนี้</p>
      </div>
    );
  }

  const openCount = rounds.filter((round) => round.status === "open").length;

  return (
    <div className="lottery-hub-theme space-y-3">
      <LotteryMarketShell activeEntry={entry} roundCount={openCount}>
        <LotteryPlayRoundList
          rounds={rounds}
          marketSlug={marketSlug}
          basePath={entry.roundsHref}
        />
      </LotteryMarketShell>
      {marketSlug === "thai-government" ? (
        <div className="hidden lg:block">
          <ThaiLottoResultPanel result={THAI_LOTTO_LAST_RESULT} />
        </div>
      ) : null}
    </div>
  );
}
