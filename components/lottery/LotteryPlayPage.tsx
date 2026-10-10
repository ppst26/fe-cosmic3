"use client";

import { SubPageShell } from "@/components/layout/SubPageShell";
import { getLotteryCatalogEntry } from "@/data/lotteryCatalog";
import { getLotteryPlayRoundById } from "@/data/lotteryRounds";
import { getMarket } from "@/data/lottery";
import { LotteryPlayScreen } from "./LotteryPlayScreen";
import { ThaiGovernmentPlayScreen } from "./ThaiGovernmentPlayScreen";

type LotteryPlayPageProps = {
  marketId: string;
  roundId: string;
  showYikiHelp?: boolean;
};

export function LotteryPlayPage({
  marketId,
  roundId,
  showYikiHelp = false,
}: LotteryPlayPageProps) {
  const catalog = getLotteryCatalogEntry(marketId);
  const market = getMarket(marketId);
  const playRound = getLotteryPlayRoundById(marketId, roundId);
  const name = catalog?.title ?? market?.name;
  const title =
    playRound && name ? `${name} · ${playRound.drawLabel}` : "แทงหวย";

  return (
    <SubPageShell title={title} sessionMode="default" requiresAuth>
      <div className="lottery-hub-theme">
        {marketId === "thai-government" ? (
          <ThaiGovernmentPlayScreen roundId={roundId} />
        ) : (
          <LotteryPlayScreen
            marketId={marketId}
            roundId={roundId}
            showYikiHelp={showYikiHelp}
          />
        )}
      </div>
    </SubPageShell>
  );
}
