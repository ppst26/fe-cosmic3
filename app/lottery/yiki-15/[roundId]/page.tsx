"use client";

import { use } from "react";
import { getMarket, getRound } from "@/data/lottery";
import { LotteryPlayScreen } from "@/components/lottery/LotteryPlayScreen";
import { SubPageShell } from "@/components/layout/SubPageShell";

type PageProps = {
  params: Promise<{ roundId: string }>;
};

export default function Yiki15PlayPage({ params }: PageProps) {
  const { roundId } = use(params);
  const market = getMarket("yiki-15");
  const round = getRound("yiki-15", roundId);
  const title =
    market && round ? `${market.name} · ${round.label}` : "แทงหวย";
  return (
    <SubPageShell title={title}>
      <LotteryPlayScreen
        marketId="yiki-15"
        roundId={roundId}
        showYikiHelp={true}
      />
    </SubPageShell>
  );
}
