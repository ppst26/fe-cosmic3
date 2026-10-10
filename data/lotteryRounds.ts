import type { LotteryPlayRound } from "@/types/lotteryHub";
import type { ThaiLottoDraw } from "@/types/thaiLotto";
import { generateYikiRounds, getYikiRoundById } from "@/data/yikiRounds";
import { getLotteryMarketBySlug } from "@/data/lotteryMarkets";

const BKK_OFFSET_MS = 7 * 60 * 60 * 1000;

function formatScheduleLabel(date: Date): string {
  return new Intl.DateTimeFormat("th-TH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Bangkok",
  }).format(date);
}

function formatDrawLabel(date: Date): string {
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Bangkok",
  }).format(date);
}

function bkkDate(year: number, month: number, day: number, hour: number, minute: number): Date {
  const utc = Date.UTC(year, month - 1, day, hour - 7, minute, 0, 0);
  return new Date(utc);
}

function enumerateThaiGovernmentDrawDates(from: Date, max: number): Date[] {
  const start = new Date(from.getTime());
  start.setHours(0, 0, 0, 0);
  const results: Date[] = [];

  for (let monthOffset = 0; monthOffset < 36 && results.length < max; monthOffset += 1) {
    const probe = new Date(start.getFullYear(), start.getMonth() + monthOffset, 1);
    const year = probe.getFullYear();
    const month = probe.getMonth() + 1;
    for (const day of [1, 16]) {
      const drawAt = bkkDate(year, month, day, 16, 0);
      if (drawAt.getTime() >= start.getTime() - BKK_OFFSET_MS) {
        results.push(drawAt);
      }
      if (results.length >= max) break;
    }
  }

  return results.sort((a, b) => a.getTime() - b.getTime());
}

function resolveRoundStatus(now: number, openAt: number, closeAt: number): LotteryPlayRound["status"] {
  if (now < openAt) return "upcoming";
  if (now >= closeAt) return "closed";
  return "open";
}

export function generateThaiGovernmentPlayRounds(count = 6, from = new Date()): LotteryPlayRound[] {
  const now = from.getTime();
  const drawDates = enumerateThaiGovernmentDrawDates(from, count);

  const rounds = drawDates.map((drawAt) => {
    const closeAt = bkkDate(
      drawAt.getFullYear(),
      drawAt.getMonth() + 1,
      drawAt.getDate(),
      15,
      0,
    );
    const openAt = new Date(closeAt.getTime() - 2 * 24 * 60 * 60 * 1000);
    openAt.setHours(1, 0, 0, 0);

    const id = `th-gov-${drawAt.getFullYear()}-${String(drawAt.getMonth() + 1).padStart(2, "0")}-${String(drawAt.getDate()).padStart(2, "0")}`;

    return {
      id,
      drawLabel: `งวด ${formatDrawLabel(drawAt)}`,
      scheduleLabel: formatScheduleLabel(drawAt),
      drawAt: drawAt.toISOString(),
      closeAt: closeAt.toISOString(),
      openAt: openAt.toISOString(),
      status: resolveRoundStatus(now, openAt.getTime(), closeAt.getTime()),
      minBet: 1,
      maxBet: 5000,
    };
  });

  if (!rounds.some((round) => round.status === "open")) {
    const next = rounds.find((round) => new Date(round.closeAt).getTime() > now);
    if (next) next.status = "open";
  }

  return rounds;
}

function generateDailyMarketPlayRounds(slug: string, from = new Date()): LotteryPlayRound[] {
  const market = getLotteryMarketBySlug(slug);
  const title = market?.title ?? "หวย";
  const now = from.getTime();

  return [0, 1, 2].map((dayOffset) => {
    const base = new Date(from);
    base.setDate(base.getDate() + dayOffset);
    base.setHours(16, 0, 0, 0);
    const drawAt = base;
    const closeAt = new Date(drawAt.getTime() - 30 * 60 * 1000);
    const openAt = new Date(drawAt);
    openAt.setDate(openAt.getDate() - 1);
    openAt.setHours(1, 0, 0, 0);

    const id = `${slug}-${drawAt.getFullYear()}${String(drawAt.getMonth() + 1).padStart(2, "0")}${String(drawAt.getDate()).padStart(2, "0")}`;

    let status = resolveRoundStatus(now, openAt.getTime(), closeAt.getTime());
    if (market?.status === "closed" && dayOffset === 0) status = "closed";

    return {
      id,
      drawLabel: `${title} ${formatDrawLabel(drawAt)}`,
      scheduleLabel: formatScheduleLabel(drawAt),
      drawAt: drawAt.toISOString(),
      closeAt: closeAt.toISOString(),
      openAt: openAt.toISOString(),
      status,
      minBet: 1,
      maxBet: 2000,
    };
  });
}

const YIKI_ROUND_COUNTS: Record<string, { interval: number; count: number }> = {
  "yiki-5": { interval: 5, count: 37 },
  "yiki-15": { interval: 15, count: 37 },
  "yiki-30": { interval: 30, count: 24 },
};

function yikiPlayRounds(intervalMin: number, count: number, from = new Date()): LotteryPlayRound[] {
  const yikiRounds = generateYikiRounds(count, intervalMin, from);
  const now = from.getTime();

  return yikiRounds.map((round) => {
    const drawAt = new Date(round.closeAt);
    drawAt.setMinutes(drawAt.getMinutes() + 2);
    const openAt = new Date(drawAt.getTime() - intervalMin * 60 * 1000);
    const stillOpen = now < new Date(round.closeAt).getTime();

    return {
      id: round.id,
      drawLabel: round.label,
      scheduleLabel: round.label,
      drawAt: drawAt.toISOString(),
      closeAt: round.closeAt,
      openAt: openAt.toISOString(),
      status: stillOpen ? "open" : "closed",
      minBet: 1,
      maxBet: 2000,
    };
  });
}

export const LOTTERY_LOW_FREQ_MAX_ROUNDS = 4;

export function getLotteryPlayRounds(slug: string, from = new Date()): LotteryPlayRound[] {
  if (slug === "thai-government") {
    return generateThaiGovernmentPlayRounds(LOTTERY_LOW_FREQ_MAX_ROUNDS, from);
  }
  const yiki = YIKI_ROUND_COUNTS[slug];
  if (yiki) return yikiPlayRounds(yiki.interval, yiki.count, from);
  return generateDailyMarketPlayRounds(slug, from);
}

export function lotteryMarketUsesRoundGrid(slug: string): boolean {
  return slug.startsWith("yiki-");
}

export function getThaiLottoDrawByRoundId(roundId: string): ThaiLottoDraw | undefined {
  const match = /^th-gov-(\d{4})-(\d{2})-(\d{2})$/.exec(roundId);
  if (!match) return undefined;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const drawAt = bkkDate(year, month, day, 16, 0);
  const closeAt = bkkDate(year, month, day, 15, 0);
  return {
    id: roundId,
    drawLabel: `งวด ${formatDrawLabel(drawAt)}`,
    closeAt: closeAt.toISOString(),
    minBet: 1,
    maxBet: 5000,
  };
}

export function getLotteryPlayRoundById(
  slug: string,
  roundId: string,
): LotteryPlayRound | undefined {
  if (slug === "yiki-5" || slug === "yiki-15" || slug === "yiki-30") {
    const yiki = getYikiRoundById(roundId);
    if (!yiki) return undefined;
    const interval = YIKI_ROUND_COUNTS[slug]?.interval ?? 15;
    const drawAt = new Date(yiki.closeAt);
    drawAt.setMinutes(drawAt.getMinutes() + 2);
    return {
      id: yiki.id,
      drawLabel: yiki.label,
      scheduleLabel: yiki.label,
      drawAt: drawAt.toISOString(),
      closeAt: yiki.closeAt,
      openAt: new Date(drawAt.getTime() - interval * 60 * 1000).toISOString(),
      status: "open",
      minBet: 1,
      maxBet: 2000,
    };
  }

  if (slug === "thai-government") {
    const draw = getThaiLottoDrawByRoundId(roundId);
    if (!draw) return undefined;
    return {
      id: draw.id,
      drawLabel: draw.drawLabel,
      scheduleLabel: draw.drawLabel,
      drawAt: draw.closeAt,
      closeAt: draw.closeAt,
      openAt: draw.closeAt,
      status: "open",
      minBet: draw.minBet,
      maxBet: draw.maxBet,
    };
  }

  return getLotteryPlayRounds(slug).find((round) => round.id === roundId);
}
