"use client";

import { use } from "react";
import { getMarket } from "@/data/lottery";
import { LotteryRoundList } from "@/components/lottery/LotteryRoundList";
import { SubPageShell } from "@/components/layout/SubPageShell";

type PageProps = {
  params: Promise<{ marketId: string }>;
};

export default function LotteryMarketPage({ params }: PageProps) {
  const { marketId } = use(params);
  const market = getMarket(marketId);
  return (
    <SubPageShell title={market?.name ?? "หวย"}>
      <LotteryRoundList marketId={marketId} basePath={`/lottery/${marketId}`} />
    </SubPageShell>
  );
}
