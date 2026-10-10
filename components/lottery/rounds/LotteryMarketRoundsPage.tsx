"use client";

import { SubPageShell } from "@/components/layout/SubPageShell";
import { getLotteryCatalogEntry } from "@/data/lotteryCatalog";
import { getMarket } from "@/data/lottery";
import { LotteryMarketRoundsView } from "./LotteryMarketRoundsView";

type LotteryMarketRoundsPageProps = {
  marketSlug: string;
  titleFallback?: string;
};

export function LotteryMarketRoundsPage({
  marketSlug,
  titleFallback = "หวย",
}: LotteryMarketRoundsPageProps) {
  const catalog = getLotteryCatalogEntry(marketSlug);
  const legacy = getMarket(marketSlug);
  const title = catalog?.title ?? legacy?.name ?? titleFallback;

  return (
    <SubPageShell title={title} sessionMode="default">
      <LotteryMarketRoundsView marketSlug={marketSlug} />
    </SubPageShell>
  );
}
