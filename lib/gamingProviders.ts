import type { GameCategory } from "@/data/providers";
import { listProviders } from "@/data/providers";
import type { GamingCategoryMeta, GamingCategoryId } from "@/lib/gamingCategories";

export type GamingProviderEntry = {
  key: string;
  title: string;
  image?: string;
  shortName?: string;
  navLogo?: boolean;
};

function gameCategoryFromMeta(meta: GamingCategoryMeta): GameCategory {
  const map: Record<GamingCategoryId, GameCategory> = {
    slot: "slots",
    casino: "casino",
    sport: "sports",
    fish: "fish",
    card: "card",
  };
  return map[meta.id];
}

export function listProvidersForCategory(meta: GamingCategoryMeta): GamingProviderEntry[] {
  return listProviders(gameCategoryFromMeta(meta)).map((p) => ({
    key: p.id,
    title: p.name,
    shortName: p.name.slice(0, 3).toUpperCase(),
  }));
}

export function resolveProviderForCategory(
  meta: GamingCategoryMeta,
  providerKey: string,
): GamingProviderEntry | null {
  return listProvidersForCategory(meta).find((p) => p.key === providerKey) ?? null;
}
