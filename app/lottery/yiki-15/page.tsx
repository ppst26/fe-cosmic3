"use client";

import { getMarket } from "@/data/lottery";
import { LotteryRoundList } from "@/components/lottery/LotteryRoundList";
import { SubPageShell } from "@/components/layout/SubPageShell";

export default function Yiki15RoundsPage() {
  const market = getMarket("yiki-15");
  return (
    <SubPageShell title={market?.name ?? "ยี่กี"}>
      <LotteryRoundList marketId="yiki-15" basePath="/lottery/yiki-15" />
    </SubPageShell>
  );
}
