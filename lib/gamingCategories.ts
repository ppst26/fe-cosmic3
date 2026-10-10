import type { CategoryKey } from "@/data/homeLobby";

export type GamingCategoryId = "slot" | "casino" | "sport" | "fish" | "card";

export interface GamingCategoryMeta {
  id: GamingCategoryId;
  title: string;
  subtitle: string;
  lobbyCategory: CategoryKey;
  basePath: string;
  breadcrumb: string;
}

export const GAMING_CATEGORIES: Record<GamingCategoryId, GamingCategoryMeta> = {
  slot: {
    id: "slot",
    title: "สล็อต",
    subtitle: "เลือกค่ายเกมสล็อตชั้นนำ ทุกค่ายในที่เดียว",
    lobbyCategory: "slot",
    basePath: "/slots",
    breadcrumb: "สล็อต",
  },
  casino: {
    id: "casino",
    title: "คาสิโน",
    subtitle: "คาสิโนสดและเกมโต๊ะ — เลือกค่ายที่ชอบ",
    lobbyCategory: "casino",
    basePath: "/casino",
    breadcrumb: "คาสิโน",
  },
  sport: {
    id: "sport",
    title: "กีฬา",
    subtitle: "เดิมพันกีฬาออนไลน์ ราคาต่อรองแบบเรียลไทม์",
    lobbyCategory: "sport",
    basePath: "/sports",
    breadcrumb: "กีฬา",
  },
  fish: {
    id: "fish",
    title: "ยิงปลา",
    subtitle: "เกมยิงปลาและอาร์เคด — ล่าปลาใหญ่รับโบนัส",
    lobbyCategory: "fish",
    basePath: "/fish",
    breadcrumb: "ยิงปลา",
  },
  card: {
    id: "card",
    title: "ไพ่",
    subtitle: "เกมไพ่และโต๊ะ — เลือกค่ายเกม",
    lobbyCategory: "table",
    basePath: "/card",
    breadcrumb: "ไพ่",
  },
};

export function getGamingCategory(id: string): GamingCategoryMeta | null {
  if (id in GAMING_CATEGORIES) {
    return GAMING_CATEGORIES[id as GamingCategoryId];
  }
  return null;
}
