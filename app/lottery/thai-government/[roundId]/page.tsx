"use client";

import { use } from "react";
import { getMarket, getRound } from "@/data/lottery";
import { LotteryPlayScreen } from "@/components/lottery/LotteryPlayScreen";
import { SubPageShell } from "@/components/layout/SubPageShell";

type PageProps = {
  params: Promise<{ roundId: string }>;
};

export default function ThaiGovernmentPlayPage({ params }: PageProps) {
  const { roundId } = use(params);
  const market = getMarket("thai-government");
  const round = getRound("thai-government", roundId);
  const title =
    market && round ? `${market.name} · ${round.label}` : "แทงหวย";
  return (
    <SubPageShell title={title}>
      <LotteryPlayScreen
        marketId="thai-government"
        roundId={roundId}
        showYikiHelp={false}
      />
    </SubPageShell>
  );
}
