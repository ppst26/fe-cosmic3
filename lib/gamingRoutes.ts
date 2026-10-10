/**
 * เส้นทางหน้าเล่นเกมใช้ helper ของ glass — lib/gamePlayPaths.ts (buildGamePlayHref · buildCasinoProviderPlayHref)
 * และ lib/categoryProviderPaths.ts (resolveCategoryProviderId) · ไฟล์นี้ re-export + แปลงชื่อ route ของ glass เป็นของ sport
 */
export { buildGamePlayHref, buildCasinoProviderPlayHref } from "@/lib/gamePlayPaths";
export { resolveCategoryProviderId } from "@/lib/categoryProviderPaths";

/** glass ใช้ /sport /fishing /cards — sport ใช้ /sports /fish /card */
const GLASS_TO_SPORT_PREFIX: [string, string][] = [
  ["/sport", "/sports"],
  ["/fishing", "/fish"],
  ["/cards", "/card"],
];

/** แปลง href จาก glass data/lobby API เป็น route ของ sport (href อื่นคงเดิม) */
export function toSportHref(href: string): string {
  for (const [from, to] of GLASS_TO_SPORT_PREFIX) {
    if (href === from) return to;
    if (href.startsWith(`${from}/`) || href.startsWith(`${from}?`)) {
      return `${to}${href.slice(from.length)}`;
    }
  }
  return href;
}

/** viewAllHref ของ glass บางส่วนชี้ /games ซึ่งไม่มีหน้า — ไม่แสดงลิงก์ในกรณีนี้ */
export function viewAllLink(href: string): string | undefined {
  if (href.startsWith("/games")) return undefined;
  return toSportHref(href);
}
