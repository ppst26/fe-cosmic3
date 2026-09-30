"use client";

import { getMarket } from "@/data/lottery";
import { LotteryRoundList } from "@/components/lottery/LotteryRoundList";
import { SubPageShell } from "@/components/layout/SubPageShell";

export default function ThaiGovernmentRoundsPage() {
  const market = getMarket("thai-government");
  return (
    <SubPageShell title={market?.name ?? "หวยรัฐบาล"}>
      <LotteryRoundList
        marketId="thai-government"
        basePath="/lottery/thai-government"
      />
    </SubPageShell>
  );
}
