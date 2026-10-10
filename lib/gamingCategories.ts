import type { MessageKey } from "@/lib/i18n/messages";
import type { CategoryId } from "@/app/types/lobby";

export type GamingCategoryId = "slot" | "casino" | "sport" | "fish" | "card";

export interface GamingCategoryMeta {
  id: GamingCategoryId;
  /** key แปลชื่อหมวด — render ด้วย useT("home")(labelKey) */
  labelKey: MessageKey<"home">;
  /** key placeholder ช่องค้นหาของหมวด (glass: categoryProviders.searchPlaceholder.*) */
  searchPlaceholderKey: MessageKey<"home">;
  /** id หมวดแบบ glass (CategoryId ใน app/types/lobby) */
  lobbyCategoryId: CategoryId;
  /** path ของ sport (glass ใช้ /sport /fishing /cards — แปลงด้วย toSportHref) */
  basePath: string;
}

export const GAMING_CATEGORIES: Record<GamingCategoryId, GamingCategoryMeta> = {
  slot: {
    id: "slot",
    labelKey: "categories.slots",
    searchPlaceholderKey: "categoryProviders.searchPlaceholder.default",
    lobbyCategoryId: "slots",
    basePath: "/slots",
  },
  casino: {
    id: "casino",
    labelKey: "categories.casino",
    searchPlaceholderKey: "categoryProviders.searchPlaceholder.casino",
    lobbyCategoryId: "casino",
    basePath: "/casino",
  },
  sport: {
    id: "sport",
    labelKey: "categories.sports",
    searchPlaceholderKey: "categoryProviders.searchPlaceholder.sports",
    lobbyCategoryId: "sports",
    basePath: "/sports",
  },
  fish: {
    id: "fish",
    labelKey: "categories.fishing",
    searchPlaceholderKey: "categoryProviders.searchPlaceholder.fishing",
    lobbyCategoryId: "fishing",
    basePath: "/fish",
  },
  card: {
    id: "card",
    labelKey: "categories.cards",
    searchPlaceholderKey: "categoryProviders.searchPlaceholder.cards",
    lobbyCategoryId: "cards",
    basePath: "/card",
  },
};

export function getGamingCategory(id: string): GamingCategoryMeta | null {
  if (id in GAMING_CATEGORIES) {
    return GAMING_CATEGORIES[id as GamingCategoryId];
  }
  return null;
}
