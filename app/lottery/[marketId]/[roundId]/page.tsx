"use client";

import { use } from "react";
import { getMarket, getRound } from "@/data/lottery";
import { LotteryPlayScreen } from "@/components/lottery/LotteryPlayScreen";
import { SubPageShell } from "@/components/layout/SubPageShell";

type PageProps = {
  params: Promise<{ marketId: string; roundId: string }>;
};

export default function LotteryPlayPage({ params }: PageProps) {
  const { marketId, roundId } = use(params);
  const market = getMarket(marketId);
  const round = getRound(marketId, roundId);
  const title =
    market && round ? `${market.name} · ${round.label}` : "แทงหวย";
  return (
    <SubPageShell title={title}>
      <LotteryPlayScreen
        marketId={marketId}
        roundId={roundId}
        showYikiHelp={marketId.startsWith("yiki-")}
      />
    </SubPageShell>
  );
}
