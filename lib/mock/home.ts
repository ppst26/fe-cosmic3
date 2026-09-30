export const NOTICE_TEXT =
  "คาสิโนเว็บตรง รวมเกมฮิตจากหลายค่าย ทีมบริการลูกค้าพร้อมให้บริการตลอด 24 ชั่วโมง";

export const CATEGORIES = [
  { id: "hot", label: "มาแรง", emoji: "🔥" },
  { id: "new", label: "เกมมาใหม่", emoji: "✨" },
  { id: "providers", label: "ค่ายเกม", emoji: "🎮" },
  { id: "sport", label: "กีฬา", emoji: "⚽" },
  { id: "slots", label: "สล็อต", emoji: "🎰" },
  { id: "casino", label: "คาสิโน", emoji: "🎲" },
  { id: "cards", label: "ไพ่", emoji: "🃏" },
  { id: "arcade", label: "อาร์เคด", emoji: "👾" },
  { id: "fight", label: "ต่อสู้", emoji: "🥊" },
  { id: "crash", label: "แครช", emoji: "📈" },
  { id: "fish", label: "ยิงปลา", emoji: "🐟" },
  { id: "lottery", label: "หวย", emoji: "🎱" },
  { id: "crypto", label: "คริปโต", emoji: "₿" },
  { id: "fav", label: "เกมโปรด", emoji: "❤️" },
] as const;

export const SPORT_PROVIDERS = [
  { name: "ONE BX", count: 158 },
  { name: "Sportbook", count: 241 },
  { name: "Muay", count: 213 },
  { name: "Muay Thai", count: 915 },
  { name: "Cock Fight", count: 149 },
  { name: "E-Sport", count: 167 },
] as const;

export type GameTag = "hot" | "new";

export type MockGame = {
  id: string;
  title: string;
  players: number;
  tag?: GameTag;
  hue: number;
};

export type SportStatTone = "red" | "green";

export type MockSportCategory = {
  id: string;
  overlayTitle: string;
  label: string;
  players: number;
  playersTone: SportStatTone;
  activity: number;
  activityTone: SportStatTone;
  gradient: string;
};

export const SPORT_CATEGORIES: MockSportCategory[] = [
  {
    id: "muay-thai",
    overlayTitle: "MUAY THAI",
    label: "Muay Thai",
    players: 942,
    playersTone: "red",
    activity: 156,
    activityTone: "green",
    gradient: "linear-gradient(160deg, #1a0a2e 0%, #5b21b6 45%, #7c3aed 100%)",
  },
  {
    id: "cock-arena",
    overlayTitle: "COCK ARENA",
    label: "Cock Arena",
    players: 888,
    playersTone: "red",
    activity: 124,
    activityTone: "red",
    gradient: "linear-gradient(160deg, #1c0a0a 0%, #7f1d1d 50%, #b91c1c 100%)",
  },
  {
    id: "cock-fighting",
    overlayTitle: "COCK FIGHTING",
    label: "Cock Fight...",
    players: 817,
    playersTone: "green",
    activity: 203,
    activityTone: "green",
    gradient: "linear-gradient(160deg, #0f172a 0%, #334155 50%, #64748b 100%)",
  },
  {
    id: "esport",
    overlayTitle: "E-SPORT",
    label: "E-sports",
    players: 268,
    playersTone: "green",
    activity: 89,
    activityTone: "green",
    gradient: "linear-gradient(160deg, #0c4a6e 0%, #0369a1 50%, #38bdf8 100%)",
  },
  {
    id: "basket",
    overlayTitle: "T-BASKET 24/7",
    label: "T-Basket 2...",
    players: 137,
    playersTone: "green",
    activity: 44,
    activityTone: "green",
    gradient: "linear-gradient(160deg, #422006 0%, #ca8a04 50%, #facc15 100%)",
  },
];

export const HOT_GAMES: MockGame[] = [
  { id: "1", title: "Treasures of Aztec", players: 807, tag: "hot", hue: 280 },
  { id: "2", title: "Fortune Ox", players: 976, tag: "hot", hue: 35 },
  { id: "3", title: "Lucky Neko", players: 1000, tag: "new", hue: 340 },
  { id: "4", title: "Wild Bounty", players: 791, hue: 200 },
  { id: "5", title: "Golden Empire", players: 856, tag: "hot", hue: 45 },
  { id: "6", title: "Dragon Hatch", players: 882, hue: 160 },
  { id: "7", title: "Candy Burst", players: 714, tag: "new", hue: 310 },
  { id: "8", title: "Speed Winner", players: 972, hue: 220 },
  { id: "9", title: "Roma Legacy", players: 335, hue: 15 },
];
