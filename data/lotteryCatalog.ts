import type { LotteryCatalogEntry } from "@/types/lotteryHub";
import { LOTTERY_FEATURED_ITEMS, LOTTERY_GRID_ITEMS } from "@/data/lotteryHubMockData";

export const LOTTERY_CATALOG_ENTRIES: LotteryCatalogEntry[] = [
  ...LOTTERY_FEATURED_ITEMS.map((item) => ({
    slug: item.href.replace(/^\/lottery\//, ""),
    title: item.title,
    flagLabel: item.visual === "thai-gov" ? "TH" : "YK",
    flagTone: item.visual === "thai-gov" ? ("th" as const) : ("gold" as const),
    roundsHref: item.href,
    status: "open" as const,
    statusLabel: item.countdownLabel,
  })),
  ...LOTTERY_GRID_ITEMS.map((item) => ({
    slug: item.href.replace(/^\/lottery\//, ""),
    title: item.title,
    flagLabel: item.flagLabel,
    flagTone: item.flagTone,
    roundsHref: item.href,
    status: item.status,
    statusLabel:
      item.status === "closed" ? "ปิดรับแทง" : (item.countdownLabel ?? "เปิดรับแทง"),
  })),
];

export function getLotteryCatalogEntry(slug: string): LotteryCatalogEntry | undefined {
  return LOTTERY_CATALOG_ENTRIES.find((entry) => entry.slug === slug);
}
