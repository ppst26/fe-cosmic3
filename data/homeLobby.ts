import type { CategoryNavIconId } from "@/components/layout/CategoryNavIcons";

export type TabKey = "hot" | "recent" | "favorite";

export type CategoryKey =
  | "home"
  | "new"
  | "providers"
  | "slot"
  | "casino"
  | "sport"
  | "lotto"
  | "fish"
  | "table"
  | "arcade"
  | "fight"
  | "crash"
  | "crypto"
  | "favorite";

export type LobbyGame = {
  id: number;
  title: string;
  image: string;
  category: "slot" | "casino" | "sport" | "fish" | "card";
  hot?: boolean;
  recent?: boolean;
  favorite?: boolean;
  badge?: "ฮิต" | "ใหม่";
  players?: number;
  trend?: "up" | "down";
};

export type PopularGame = {
  id: string;
  name: string;
  provider: string;
  players: string;
  tag: "HOT" | "NEW";
  emoji: string;
};

export type ProviderItem = {
  id: string;
  name: string;
  shortName: string;
  emoji: string;
};

export type MostOnlineItem = {
  id: string;
  name: string;
  brand: string;
  category: string;
  players: string;
  badge: string;
  motifEmojis: string[];
  featureHighlight: string;
};

export type HallOfFameBet = {
  id: string;
  user: string;
  avatar: string;
  game: string;
  gameCategory: string;
  coef: string;
  payout: number;
  currency: "THB" | "USDT";
  timeAgo: string;
};

export type PromotionItem = {
  id: string;
  title: string;
  desc: string;
  tag: string;
  emoji: string;
  category: "general" | "special";
};

export const NOTICE_TEXT =
  "ยินดีต้อนรับสู่ LEGENDPRO เว็บตรง มั่นคง ปลอดภัย ฝาก-ถอน อัตโนมัติ รวดเร็วตลอด 24 ชั่วโมง • รวมโปรโมชั่นจัดเต็มทุกวัน สมัครง่าย การันตีความน่าเชื่อถือ 100%";

export const LOBBY_TABS: { key: TabKey; label: string; emoji: string }[] = [
  { key: "hot", label: "เกมฮิต", emoji: "🔥" },
  { key: "recent", label: "เล่นล่าสุด", emoji: "⏱️" },
  { key: "favorite", label: "เกมโปรด", emoji: "⭐" },
];

export const NAV_CATEGORIES: {
  id: CategoryKey;
  label: string;
  icon: CategoryNavIconId;
}[] = [
  { id: "home", label: "มาแรง", icon: "hot" },
  { id: "new", label: "เกมมาใหม่", icon: "new" },
  { id: "providers", label: "ค่ายเกม", icon: "providers" },
  { id: "sport", label: "กีฬา", icon: "sport" },
  { id: "slot", label: "สล็อต", icon: "slot" },
  { id: "casino", label: "คาสิโน", icon: "casino" },
  { id: "table", label: "ไพ่", icon: "cards" },
  { id: "fish", label: "ยิงปลา", icon: "fish" },
  { id: "lotto", label: "หวย", icon: "lottery" },
  { id: "arcade", label: "อาร์เคด", icon: "arcade" },
  { id: "fight", label: "ต่อสู้", icon: "fight" },
  { id: "crash", label: "แครช", icon: "crash" },
  { id: "crypto", label: "คริปโต", icon: "crypto" },
  { id: "favorite", label: "เกมโปรด", icon: "favorite" },
];

export const POPULAR_GAMES: PopularGame[] = [
  { id: "g1", name: "Mahjong Mega Wins", provider: "PG SOFT", players: "28,450", tag: "HOT", emoji: "🀄" },
  { id: "g2", name: "Nom Nom Fat Cat", provider: "NEXTSPIN", players: "17,869", tag: "NEW", emoji: "🐱" },
  { id: "g3", name: "Farmstead Fortune", provider: "5G GAMES", players: "13,115", tag: "HOT", emoji: "🌾" },
  { id: "g4", name: "Treasures of Aztec", provider: "PG SOFT", players: "29,798", tag: "HOT", emoji: "👑" },
  { id: "g5", name: "Gates of Olympus", provider: "PRAGMATIC PLAY", players: "24,888", tag: "HOT", emoji: "⚡" },
  { id: "g6", name: "MAHJONG SMASH", provider: "JILI", players: "14,680", tag: "NEW", emoji: "🀄" },
  { id: "g7", name: "Roma", provider: "JOKER GAMING", players: "18,924", tag: "HOT", emoji: "⚔️" },
  { id: "g8", name: "Lucky Neko", provider: "PG SOFT", players: "22,450", tag: "HOT", emoji: "🐱" },
  { id: "g9", name: "Super Ace", provider: "JILI", players: "16,720", tag: "HOT", emoji: "🃏" },
  { id: "g10", name: "Sugar Bang 100", provider: "5G GAMES", players: "11,540", tag: "HOT", emoji: "🧸" },
  { id: "g11", name: "Wild Bounty Showdown", provider: "PG SOFT", players: "19,300", tag: "HOT", emoji: "🤠" },
  { id: "g12", name: "Mahjong Phoenix", provider: "NEXTSPIN", players: "12,180", tag: "NEW", emoji: "🀄" },
];

export const PROVIDERS: ProviderItem[] = [
  { id: "pg", name: "PG SOFT", shortName: "PG", emoji: "📱" },
  { id: "askme", name: "AskMeSlot", shortName: "AMS", emoji: "🎰" },
  { id: "sunni", name: "Sunni Games", shortName: "SUNNI", emoji: "🎮" },
  { id: "jili", name: "JILI", shortName: "JILI", emoji: "🃏" },
  { id: "nextspin", name: "NextSpin", shortName: "NEX", emoji: "🐯" },
  { id: "letsgo", name: "Let's GO!", shortName: "GO", emoji: "🏴‍☠️" },
  { id: "pp", name: "PP SLOT", shortName: "PP", emoji: "⚡" },
  { id: "ses", name: "Sexy Slot", shortName: "SES", emoji: "🍒" },
  { id: "amigo", name: "Ameba", shortName: "AMIGO", emoji: "🪅" },
  { id: "habanero", name: "Habanero", shortName: "HB", emoji: "🌶️" },
  { id: "vertex", name: "Joker Gaming", shortName: "VP", emoji: "🦅" },
  { id: "bng", name: "BNG", shortName: "BNG", emoji: "🔮" },
];

export const MOST_ONLINE_GAMES: MostOnlineItem[] = [
  { id: "mo-1", name: "Fortune Rabbit & Mahjong", brand: "PG SOFT", category: "สล็อตยอดนิยม", players: "30,000", badge: "HOT", motifEmojis: ["🐰", "💎", "🏮"], featureHighlight: "โบนัสแตกง่าย x5000" },
  { id: "mo-2", name: "Sexy Baccarat Classic", brand: "SEXY GAMING", category: "คาสิโนสด", players: "18,200", badge: "HOT", motifEmojis: ["💃", "🎲", "♠️"], featureHighlight: "ดีลเลอร์สาวสวย 24 ชม." },
  { id: "mo-3", name: "SA Gaming VIP Live", brand: "SA GAMING", category: "คาสิโนสด 4K", players: "7,278", badge: "HOT", motifEmojis: ["🃏", "💰", "👑"], featureHighlight: "โต๊ะสปีดบาคาร่า" },
  { id: "mo-4", name: "King Midas Golden Touch", brand: "KING MIDAS", category: "สล็อตแจ็คพอต", players: "7,807", badge: "HOT", motifEmojis: ["👑", "🏆", "🪙"], featureHighlight: "รางวัลแจ็คพอตใหญ่" },
  { id: "mo-5", name: "Gates of Olympus 1000", brand: "PRAGMATIC PLAY", category: "สล็อตสายฟ้า", players: "24,650", badge: "HOT", motifEmojis: ["⚡", "🏛️", "🍬"], featureHighlight: "ตัวคูณคอมโบต่อเนื่อง" },
  { id: "mo-6", name: "Roma X & Golden Dragon", brand: "JOKER GAMING", category: "สล็อตระดับตำนาน", players: "14,320", badge: "HOT", motifEmojis: ["🃏", "🎰", "🔥"], featureHighlight: "ฟันสิงโตโบนัสฟรีสปิน" },
];

export const HALL_OF_FAME: HallOfFameBet[] = [
  { id: "hof-1", user: "WinnerOffense", avatar: "🥷", game: "Forbidden Alchemy", gameCategory: "สล็อต", coef: "x2.11", payout: 6320, currency: "THB", timeAgo: "1 วินาทีที่แล้ว" },
  { id: "hof-2", user: "LuckyDragon99", avatar: "🥷", game: "Dreams of Macau", gameCategory: "สล็อต", coef: "x3.44", payout: 17214, currency: "THB", timeAgo: "4 วินาทีที่แล้ว" },
  { id: "hof-3", user: "GhostPlayer", avatar: "🥷", game: "Hot Pepper 1000", gameCategory: "สล็อต", coef: "x12.50", payout: 25000, currency: "THB", timeAgo: "7 วินาทีที่แล้ว" },
  { id: "hof-4", user: "ZeusStriker", avatar: "🥷", game: "Zeus Goes Wild", gameCategory: "สล็อต", coef: "x2.98", payout: 8940, currency: "THB", timeAgo: "12 วินาทีที่แล้ว" },
  { id: "hof-5", user: "CryptoVip_88", avatar: "🥷", game: "Book Of Rebirth", gameCategory: "สล็อต", coef: "x4.97", payout: 23850, currency: "THB", timeAgo: "16 วินาทีที่แล้ว" },
  { id: "hof-6", user: "CyberQueen", avatar: "👩‍🎤", game: "Treasures of Aztec", gameCategory: "สล็อต", coef: "x58.20", payout: 116400, currency: "THB", timeAgo: "22 วินาทีที่แล้ว" },
  { id: "hof-7", user: "MasterBaccarat", avatar: "🕶️", game: "Sexy Baccarat VIP", gameCategory: "คาสิโน", coef: "x8.50", payout: 42500, currency: "THB", timeAgo: "28 วินาทีที่แล้ว" },
];

export const PROMOTIONS: PromotionItem[] = [
  { id: "p1", title: "โปรฝาก X2 รับได้ทั้งวัน", desc: "โปรฝาก X2 รับได้ทั้งวัน รับโบนัสทุกยอดฝาก ถอนไม่อั้น", tag: "โบนัส 10%", emoji: "🎁", category: "general" },
  { id: "p2", title: "Happytime (แฮปปี้ไทม์)", desc: "โบนัสพิเศษช่วง 12:00–14:00 และ 20:00–22:00", tag: "โบนัส 100%", emoji: "🎉", category: "general" },
  { id: "p4", title: "สมาชิกใหม่ โบนัส 50%", desc: "ต้อนรับสมาชิกใหม่ ฝากครั้งแรกรับโบนัสเพิ่ม 50%", tag: "NEW MEMBER", emoji: "✨", category: "special" },
];

export type WalletTab = "deposit-withdraw" | "promo" | "history";
export type WalletSubTab = "deposit" | "withdraw";
