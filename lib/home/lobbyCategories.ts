import { CATEGORIES_DATA } from "@/app/data/lobbyMockData";
import type { CategoryId, CategoryItem } from "@/app/types/lobby";
import { toSportHref } from "@/lib/gamingRoutes";
import type { CategoryNavIconId } from "@/components/layout/CategoryNavIcons";

/** หมวด lobby ของ glass (CATEGORIES_DATA) พร้อม href แบบ route ของ sport (/sports /fish /card) */
export const LOBBY_CATEGORIES: CategoryItem[] = CATEGORIES_DATA.map((c) => ({
  ...c,
  href: toSportHref(c.href),
}));

/** ไอคอนรูป (menu-icon) ต่อหมวด — CategoryNav */
export const CATEGORY_IMAGE_ICON: Record<CategoryId, string> = {
  home: "/menu-icon/home.avif",
  casino: "/menu-icon/casino.avif",
  slots: "/menu-icon/slot.avif",
  fishing: "/menu-icon/fish.avif",
  sports: "/menu-icon/sport.avif",
  lottery: "/menu-icon/lotto.avif",
  cards: "/menu-icon/card.avif",
};

/** ไอคอน SVG ต่อหมวด — CategoryIconNav (แถบหมวดมือถือหน้าแรก) */
export const CATEGORY_SVG_ICON: Record<CategoryId, CategoryNavIconId> = {
  home: "hot",
  casino: "casino",
  slots: "slot",
  fishing: "fish",
  sports: "sport",
  lottery: "lottery",
  cards: "cards",
};
