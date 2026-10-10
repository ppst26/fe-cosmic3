import type { YikiRound } from "@/types/lotteryHub";
import {
  BANGKOK_OFFSET_MS,
  dateFromBangkokWall,
  getBangkokWallParts,
} from "@/lib/bangkokTime";

const CLOSE_BEFORE_DRAW_MS = 2 * 60 * 1000;

export function generateYikiRounds(count = 8, intervalMin = 15, from = new Date()): YikiRound[] {
  const intervalMs = intervalMin * 60 * 1000;
  const bkkMinute = Math.floor((from.getTime() + BANGKOK_OFFSET_MS) / 60_000);
  const remainder = bkkMinute % intervalMin;
  const nextBkkMinute = bkkMinute - remainder + intervalMin;
  const baseMs = nextBkkMinute * 60_000 - BANGKOK_OFFSET_MS;

  return Array.from({ length: count }, (_, index) => {
    const drawAt = new Date(baseMs + index * intervalMs);
    const closeAt = new Date(drawAt.getTime() - CLOSE_BEFORE_DRAW_MS);
    const { year, month, day, hour, minute } = getBangkokWallParts(drawAt);
    const hh = String(hour).padStart(2, "0");
    const mm = String(minute).padStart(2, "0");
    return {
      id: `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}${hh}${mm}`,
      label: `รอบ ${hh}:${mm} น.`,
      closeAt: closeAt.toISOString(),
    };
  });
}

const ROUND_ID_PATTERN = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})$/;

export function getYikiRoundById(roundId: string): YikiRound | null {
  const match = ROUND_ID_PATTERN.exec(roundId);
  if (!match) return null;
  const [, year, month, day, hour, minute] = match;
  const drawAt = dateFromBangkokWall(
    Number(year),
    Number(month),
    Number(day),
    Number(hour),
    Number(minute),
  );
  if (Number.isNaN(drawAt.getTime())) return null;
  const closeAt = new Date(drawAt.getTime() - CLOSE_BEFORE_DRAW_MS);
  return {
    id: roundId,
    label: `รอบ ${hour}:${minute} น.`,
    closeAt: closeAt.toISOString(),
  };
}
