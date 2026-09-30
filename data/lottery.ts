export type LotteryMarketGroup = "general" | "government" | "yiki";

export type LotteryRound = {
  id: string;
  label: string;
};

export type LotteryMarket = {
  id: string;
  name: string;
  group: LotteryMarketGroup;
  rounds: readonly LotteryRound[];
  betTypes: readonly string[];
  routeBase: string;
};

const BET_TYPES = [
  "วิ่งบน",
  "วิ่งล่าง",
  "สองตัวบน",
  "สามตัวบน",
] as const;

const ROUNDS: readonly LotteryRound[] = [
  { id: "r1", label: "งวดปัจจุบัน" },
  { id: "r2", label: "งวดถัดไป" },
];

export const YIKI_HOW_TO = [
  "เลือกประเภทรายการ",
  "กดเลขจากแป้น",
  "ตั้งราคา",
  "ตรวจสลิป",
  "ยืนยันโพย",
] as const;

function createMarket(
  id: string,
  name: string,
  group: LotteryMarketGroup,
  routeBase?: string,
): LotteryMarket {
  return {
    id,
    name,
    group,
    rounds: ROUNDS,
    betTypes: BET_TYPES,
    routeBase: routeBase ?? `/lottery/${id}`,
  };
}

const MARKETS: Record<string, LotteryMarket> = {
  hanoi: createMarket("hanoi", "ฮานอย", "general"),
  laos: createMarket("laos", "ลาว", "general"),
  "thai-government": createMarket(
    "thai-government",
    "หวยรัฐบาล",
    "government",
    "/lottery/thai-government",
  ),
  "yiki-5": createMarket("yiki-5", "ยี่กี 5 นาที", "yiki"),
  "yiki-15": createMarket("yiki-15", "ยี่กี 15 นาที", "yiki"),
  "yiki-30": createMarket("yiki-30", "ยี่กี 30 นาที", "yiki"),
};

export function listMarkets(group: LotteryMarketGroup): LotteryMarket[] {
  return Object.values(MARKETS).filter((market) => market.group === group);
}

export function getMarket(marketId: string): LotteryMarket | null {
  return MARKETS[marketId] ?? null;
}

export function getRound(
  marketId: string,
  roundId: string,
): LotteryRound | null {
  const market = getMarket(marketId);
  if (!market) {
    return null;
  }
  return market.rounds.find((round) => round.id === roundId) ?? null;
}
