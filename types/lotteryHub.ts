/** สถานะตลาดหวย — เปิดรับ / ปิดรับ */
export type LotteryMarketStatus = "open" | "closed";

/** โทนสีไอคอนธงของตลาดหวย */
export type LotteryFlagTone =
  | "th"
  | "la"
  | "vn"
  | "my"
  | "us"
  | "cn"
  | "de"
  | "ru"
  | "kr"
  | "jp"
  | "gb"
  | "hk"
  | "tw"
  | "sg"
  | "in"
  | "eg"
  | "gold";

export interface LotteryFeaturedItem {
  id: string;
  title: string;
  countdownLabel: string;
  href: string;
  visual: "thai-gov" | "yiki";
  yikiMinutes?: 5 | 15 | 30;
}

export interface LotteryGridItem {
  id: string;
  title: string;
  status: LotteryMarketStatus;
  countdownLabel?: string;
  flagLabel: string;
  flagTone: LotteryFlagTone;
  href: string;
}

export interface LotteryResultRow {
  id: string;
  title: string;
  top3: string;
  bottom2: string;
  dateLabel: string;
  flagLabel: string;
  flagTone: LotteryFlagTone;
}

export interface LotteryCatalogEntry {
  slug: string;
  title: string;
  flagLabel: string;
  flagTone: LotteryFlagTone;
  roundsHref: string;
  status: LotteryMarketStatus;
  statusLabel: string;
}

export type LotteryPlayRoundStatus = "open" | "upcoming" | "closed";

export interface LotteryPlayRound {
  id: string;
  drawLabel: string;
  scheduleLabel: string;
  drawAt: string;
  closeAt: string;
  openAt: string;
  status: LotteryPlayRoundStatus;
  minBet: number;
  maxBet: number;
}

export interface ThaiLottoResult {
  drawLabel: string;
  firstPrize: string;
  front3: string[];
  back3: string[];
  bottom2: string;
}

export type YikiRound = {
  id: string;
  label: string;
  closeAt: string;
};
