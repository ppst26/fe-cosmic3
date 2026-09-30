"use client";

import { getMarket } from "@/data/lottery";
import { LotteryRoundList } from "@/components/lottery/LotteryRoundList";
import { SubPageShell } from "@/components/layout/SubPageShell";

export default function Yiki5RoundsPage() {
  const market = getMarket("yiki-5");
  return (
    <SubPageShell title={market?.name ?? "ยี่กี"}>
      <LotteryRoundList marketId="yiki-5" basePath="/lottery/yiki-5" />
    </SubPageShell>
  );
}
