"use client";

import { use } from "react";
import { getMarket, getRound } from "@/data/lottery";
import { LotteryPlayScreen } from "@/components/lottery/LotteryPlayScreen";
import { SubPageShell } from "@/components/layout/SubPageShell";

type PageProps = {
  params: Promise<{ roundId: string }>;
};

export default function Yiki5PlayPage({ params }: PageProps) {
  const { roundId } = use(params);
  const market = getMarket("yiki-5");
  const round = getRound("yiki-5", roundId);
  const title =
    market && round ? `${market.name} · ${round.label}` : "แทงหวย";
  return (
    <SubPageShell title={title}>
      <LotteryPlayScreen
        marketId="yiki-5"
        roundId={roundId}
        showYikiHelp={true}
      />
    </SubPageShell>
  );
}
