import type { LotteryFlagTone, LotteryMarketStatus } from "@/types/lotteryHub";
import { LOTTERY_GRID_ITEMS } from "@/data/lotteryHubMockData";

export type LotteryMarketConfig = {
  slug: string;
  title: string;
  flagLabel: string;
  flagTone: LotteryFlagTone;
  status: LotteryMarketStatus;
};

export const LOTTERY_MARKETS: LotteryMarketConfig[] = LOTTERY_GRID_ITEMS.map((item) => ({
  slug: item.href.replace("/lottery/", ""),
  title: item.title,
  flagLabel: item.flagLabel,
  flagTone: item.flagTone,
  status: item.status,
}));

export function getLotteryMarketBySlug(slug: string): LotteryMarketConfig | undefined {
  return LOTTERY_MARKETS.find((market) => market.slug === slug);
}
