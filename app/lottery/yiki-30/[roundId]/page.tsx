"use client";

import { use } from "react";
import { getMarket, getRound } from "@/data/lottery";
import { LotteryPlayScreen } from "@/components/lottery/LotteryPlayScreen";
import { SubPageShell } from "@/components/layout/SubPageShell";

type PageProps = {
  params: Promise<{ roundId: string }>;
};

export default function Yiki30PlayPage({ params }: PageProps) {
  const { roundId } = use(params);
  const market = getMarket("yiki-30");
  const round = getRound("yiki-30", roundId);
  const title =
    market && round ? `${market.name} · ${round.label}` : "แทงหวย";
  return (
    <SubPageShell title={title}>
      <LotteryPlayScreen
        marketId="yiki-30"
        roundId={roundId}
        showYikiHelp={true}
      />
    </SubPageShell>
  );
}
