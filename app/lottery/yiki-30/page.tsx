"use client";

import { getMarket } from "@/data/lottery";
import { LotteryRoundList } from "@/components/lottery/LotteryRoundList";
import { SubPageShell } from "@/components/layout/SubPageShell";

export default function Yiki30RoundsPage() {
  const market = getMarket("yiki-30");
  return (
    <SubPageShell title={market?.name ?? "ยี่กี"}>
      <LotteryRoundList marketId="yiki-30" basePath="/lottery/yiki-30" />
    </SubPageShell>
  );
}
