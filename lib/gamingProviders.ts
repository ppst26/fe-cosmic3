import { CARDS_ITEMS } from "@/app/data/cardsProvidersData";
import { CASINO_ITEMS } from "@/app/data/casinoProvidersData";
import { FISHING_ITEMS } from "@/app/data/fishingProvidersData";
import { FEATURED_SLOT_PROVIDERS, GRID_SLOT_PROVIDERS } from "@/app/data/slotProvidersData";
import { SPORT_ITEMS } from "@/app/data/sportProvidersData";
import type { GamingCategoryMeta } from "@/lib/gamingCategories";
import { toSportHref } from "@/lib/gamingRoutes";

export type GamingProviderEntry = {
  /** slug ใน URL: /slots/[key] · /fish/[key] · /card/[key] · /sports/[key] */
  key: string;
  title: string;
  /** ชื่อค่าย (ใช้ค้นหา) */
  provider: string;
  image?: string;
  shortName?: string;
  /** ปลายทางเมื่อกดการ์ด — คาสิโนเข้าหน้าเล่นตรง (เหมือน glass) */
  href: string;
};

function lastSegment(href: string): string {
  return href.split("/").filter(Boolean).pop() ?? href;
}

/** รายการค่ายต่อหมวด — ข้อมูลชุดเดียวกับ glass (app/data/*ProvidersData) */
export function listProvidersForCategory(meta: GamingCategoryMeta): GamingProviderEntry[] {
  switch (meta.id) {
    case "slot":
      return [...FEATURED_SLOT_PROVIDERS, ...GRID_SLOT_PROVIDERS].map((p) => ({
        key: p.id,
        title: p.name,
        provider: p.name,
        image: p.coverSrc,
        href: toSportHref(p.href || `/slots/${p.id}`),
      }));
    case "casino":
      return CASINO_ITEMS.map((p) => ({
        key: p.id,
        title: p.title,
        provider: p.provider,
        image: p.coverSrc,
        href: p.href,
      }));
    case "sport":
      return SPORT_ITEMS.map((p) => ({
        key: lastSegment(p.href),
        title: p.title,
        provider: p.provider,
        image: p.coverSrc,
        href: toSportHref(p.href),
      }));
    case "fish":
      return FISHING_ITEMS.map((p) => ({
        key: lastSegment(p.href),
        title: p.title,
        provider: p.provider,
        image: p.coverSrc,
        href: toSportHref(p.href),
      }));
    case "card":
      return CARDS_ITEMS.map((p) => ({
        key: lastSegment(p.href),
        title: p.title,
        provider: p.provider,
        image: p.coverSrc,
        href: toSportHref(p.href),
      }));
  }
}

export function resolveProviderForCategory(
  meta: GamingCategoryMeta,
  providerKey: string,
): GamingProviderEntry | null {
  return listProvidersForCategory(meta).find((p) => p.key === providerKey) ?? null;
}
