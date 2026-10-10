import type { CoverTone, GameItem } from "@/app/types/lobby";
import type { MockSportCategory } from "@/lib/mock/home";
import { toSportHref } from "@/lib/gamingRoutes";

/** พื้นหลังการ์ดเมื่อเกมไม่มีรูปปก (โทนตาม coverTone จาก lobby API) */
const TONE_GRADIENT: Record<CoverTone, string> = {
  indigo: "linear-gradient(165deg, #1e1b4b 0%, #4338ca 55%, #818cf8 100%)",
  rose: "linear-gradient(165deg, #500724 0%, #be123c 50%, #fb7185 100%)",
  emerald: "linear-gradient(165deg, #064e3b 0%, #059669 50%, #6ee7b7 100%)",
  amber: "linear-gradient(165deg, #451a03 0%, #ea580c 50%, #fbbf24 100%)",
  sky: "linear-gradient(165deg, #0c4a6e 0%, #0284c7 55%, #38bdf8 100%)",
  violet: "linear-gradient(165deg, #2e1065 0%, #7c3aed 50%, #c4b5fd 100%)",
};

/** แปลงเกมจาก lobby layer (GameItem) เป็นการ์ดแนวตั้งของ sport — ไม่มีตัวเลขผู้เล่น/กิจกรรม (ไม่มีใน API) */
export function lobbyGameToSportCard(game: GameItem): MockSportCategory {
  return {
    id: game.id,
    overlayTitle: game.title.toUpperCase(),
    label: game.provider,
    gradient: TONE_GRADIENT[game.coverTone ?? "indigo"],
    imageUrl: game.coverSrc,
    href: toSportHref(game.href),
  };
}
