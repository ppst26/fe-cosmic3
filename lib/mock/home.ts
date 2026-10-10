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
  favorited?: boolean;
  imageUrl?: string;
  href?: string;
};

export type ActivityCarouselItem = {
  id: string;
  categoryLabel: string;
  categoryIcon: string;
  dateBadge: string;
  headline: string;
  gradient: string;
  href: string;
};

/** การ์ด carousel กิจกรรม (หน้าแรก — 3–4 ใบ) */
export const ACTIVITY_CAROUSEL_ITEMS: ActivityCarouselItem[] = [
  {
    id: "carousel-checkin",
    categoryLabel: "กิจกรรม",
    categoryIcon: "🎁",
    dateBadge: "ทุกวัน 00:00 – 23:59",
    headline: "เช็คอินรายวัน รับเพชร & โบนัส",
    gradient: "linear-gradient(160deg, #431407 0%, #c2410c 45%, #fdba74 100%)",
    href: "/activities",
  },
  {
    id: "carousel-tournament",
    categoryLabel: "ทัวร์นาเมนต์",
    categoryIcon: "🏆",
    dateBadge: "1 – 30 เม.ย. 2569",
    headline: "แข่งขันยอดเทิร์น แจกรางวัลใหญ่",
    gradient: "linear-gradient(160deg, #1e1b4b 0%, #4338ca 50%, #f97316 100%)",
    href: "/activities",
  },
  {
    id: "carousel-wheel",
    categoryLabel: "กิจกรรม",
    categoryIcon: "🎡",
    dateBadge: "เปิดตลอด 24 ชม.",
    headline: "หมุนกงล้อนำโชค ลุ้นเครดิตฟรี",
    gradient: "linear-gradient(160deg, #4c1d95 0%, #7c3aed 55%, #e9d5ff 100%)",
    href: "/activities",
  },
  {
    id: "carousel-promo",
    categoryLabel: "โปรโมชั่น",
    categoryIcon: "✨",
    dateBadge: "ฉลองเปิดซีซัน",
    headline: "ฝากครั้งแรกรับโบนัสพิเศษ",
    gradient: "linear-gradient(160deg, #14532d 0%, #15803d 50%, #86efac 100%)",
    href: "/promotions",
  },
];

/** แถบกิจกรรม — thumbnail เลื่อนแนวนอน */
export const ACTIVITY_THUMBS: MockSportCategory[] = [
  {
    id: "act-checkin",
    overlayTitle: "เช็คอินรายวัน",
    label: "เช็คอินรายวัน",
    players: 1240,
    playersTone: "green",
    activity: 312,
    activityTone: "green",
    gradient: "linear-gradient(165deg, #7c2d12 0%, #ea580c 50%, #fdba74 100%)",
    href: "/activities",
  },
  {
    id: "act-wheel",
    overlayTitle: "กงล้อนำโชค",
    label: "กงล้อนำโชค",
    players: 892,
    playersTone: "red",
    activity: 201,
    activityTone: "green",
    gradient: "linear-gradient(165deg, #4c1d95 0%, #7c3aed 50%, #c4b5fd 100%)",
    href: "/activities",
  },
  {
    id: "act-mission",
    overlayTitle: "ภารกิจรายสัปดาห์",
    label: "ภารกิจรายสัปดาห์",
    players: 654,
    playersTone: "green",
    activity: 145,
    activityTone: "green",
    href: "/activities",
  },
  {
    id: "act-tournament",
    overlayTitle: "ทัวร์นาเมนต์",
    label: "ทัวร์นาเมนต์",
    players: 1103,
    playersTone: "green",
    activity: 278,
    activityTone: "green",
    favorited: true,
    gradient: "linear-gradient(165deg, #0f172a 0%, #1e40af 55%, #38bdf8 100%)",
    href: "/activities",
  },
  {
    id: "act-coupon",
    overlayTitle: "คูปองพิเศษ",
    label: "คูปองพิเศษ",
    players: 445,
    playersTone: "red",
    activity: 88,
    activityTone: "green",
    gradient: "linear-gradient(165deg, #831843 0%, #db2777 50%, #fbcfe8 100%)",
    href: "/promotions",
  },
  {
    id: "act-vip",
    overlayTitle: "VIP CHALLENGE",
    label: "VIP Challenge",
    players: 321,
    playersTone: "green",
    activity: 67,
    activityTone: "red",
    gradient: "linear-gradient(165deg, #422006 0%, #ca8a04 50%, #fef08a 100%)",
    href: "/vip",
  },
  {
    id: "act-referral",
    overlayTitle: "แนะนำเพื่อน",
    label: "แนะนำเพื่อน",
    players: 567,
    playersTone: "green",
    activity: 134,
    activityTone: "green",
    gradient: "linear-gradient(165deg, #14532d 0%, #16a34a 50%, #86efac 100%)",
    href: "/referral",
  },
  {
    id: "act-lucky",
    overlayTitle: "LUCKY DRAW",
    label: "Lucky Draw",
    players: 978,
    playersTone: "red",
    activity: 256,
    activityTone: "green",
    favorited: true,
    gradient: "linear-gradient(165deg, #1e1b4b 0%, #4338ca 50%, #f97316 100%)",
    href: "/activities",
  },
];

export const SPORT_CATEGORIES: MockSportCategory[] = [
  {
    id: "one-bx",
    overlayTitle: "ONE BX",
    label: "ONE BX",
    players: 159,
    playersTone: "red",
    activity: 42,
    activityTone: "green",
    favorited: true,
    gradient:
      "linear-gradient(165deg, #1a0505 0%, #7c2d12 35%, #ea580c 70%, #451a03 100%)",
  },
  {
    id: "sportbook",
    overlayTitle: "SPORTBOOK",
    label: "Sportbook",
    players: 253,
    playersTone: "green",
    activity: 88,
    activityTone: "green",
    gradient:
      "linear-gradient(165deg, #0c1929 0%, #1e3a5f 40%, #0ea5e9 75%, #082f49 100%)",
  },
  {
    id: "muay",
    overlayTitle: "MUAY",
    label: "Muay",
    players: 211,
    playersTone: "red",
    activity: 67,
    activityTone: "green",
    gradient:
      "linear-gradient(165deg, #1c1917 0%, #44403c 45%, #78716c 100%)",
  },
  {
    id: "muay-thai",
    overlayTitle: "MUAY THAI",
    label: "Muay Thai",
    players: 901,
    playersTone: "green",
    activity: 156,
    activityTone: "green",
    favorited: true,
    gradient:
      "linear-gradient(165deg, #1a0a2e 0%, #5b21b6 45%, #7c3aed 100%)",
  },
  {
    id: "cock-fight",
    overlayTitle: "COCK FIGHT",
    label: "Cock Fight",
    players: 149,
    playersTone: "green",
    activity: 31,
    activityTone: "red",
    gradient:
      "linear-gradient(165deg, #0f172a 0%, #334155 50%, #64748b 100%)",
  },
  {
    id: "e-sport",
    overlayTitle: "E-SPORT",
    label: "E-Sport",
    players: 167,
    playersTone: "green",
    activity: 54,
    activityTone: "green",
    gradient:
      "linear-gradient(165deg, #0c4a6e 0%, #0369a1 50%, #38bdf8 100%)",
  },
  {
    id: "t-basket",
    overlayTitle: "T-BASKET 24/7",
    label: "T-Basket 24/7",
    players: 137,
    playersTone: "green",
    activity: 44,
    activityTone: "green",
    gradient:
      "linear-gradient(165deg, #422006 0%, #ca8a04 50%, #facc15 100%)",
  },
  {
    id: "cock-arena",
    overlayTitle: "COCK ARENA",
    label: "Cock Arena",
    players: 888,
    playersTone: "red",
    activity: 124,
    activityTone: "red",
    gradient:
      "linear-gradient(165deg, #1c0a0a 0%, #7f1d1d 50%, #b91c1c 100%)",
  },
  {
    id: "virtual-football",
    overlayTitle: "VIRTUAL FB",
    label: "Virtual Football",
    players: 312,
    playersTone: "green",
    activity: 91,
    activityTone: "green",
    gradient:
      "linear-gradient(165deg, #052e16 0%, #15803d 45%, #4ade80 100%)",
  },
  {
    id: "tennis-live",
    overlayTitle: "TENNIS LIVE",
    label: "Tennis Live",
    players: 98,
    playersTone: "red",
    activity: 22,
    activityTone: "green",
    gradient:
      "linear-gradient(165deg, #14532d 0%, #166534 50%, #bbf7d0 100%)",
  },
  {
    id: "nba-live",
    overlayTitle: "NBA LIVE",
    label: "NBA Live",
    players: 445,
    playersTone: "green",
    activity: 118,
    activityTone: "green",
    favorited: true,
    gradient:
      "linear-gradient(165deg, #1e1b4b 0%, #4338ca 50%, #f97316 100%)",
  },
];

/** แถบมาแรง — thumbnail แนวตั้งเลื่อนแนวนอน (mock) */
export const TRENDING_THUMBS: MockSportCategory[] = [
  {
    id: "treasures-aztec",
    overlayTitle: "TREASURES OF AZTEC",
    label: "Treasures of Aztec",
    players: 807,
    playersTone: "red",
    activity: 142,
    activityTone: "green",
    favorited: true,
    gradient:
      "linear-gradient(165deg, #1a0f2e 0%, #6d28d9 45%, #a855f7 100%)",
  },
  {
    id: "fortune-ox",
    overlayTitle: "FORTUNE OX",
    label: "Fortune Ox",
    players: 976,
    playersTone: "green",
    activity: 201,
    activityTone: "green",
    gradient:
      "linear-gradient(165deg, #451a03 0%, #ea580c 50%, #fbbf24 100%)",
  },
  {
    id: "lucky-neko",
    overlayTitle: "LUCKY NEKO",
    label: "Lucky Neko",
    players: 1000,
    playersTone: "red",
    activity: 318,
    activityTone: "green",
    favorited: true,
    gradient:
      "linear-gradient(165deg, #500724 0%, #be123c 50%, #fb7185 100%)",
  },
  {
    id: "wild-bounty",
    overlayTitle: "WILD BOUNTY",
    label: "Wild Bounty",
    players: 791,
    playersTone: "green",
    activity: 96,
    activityTone: "green",
    gradient:
      "linear-gradient(165deg, #0c4a6e 0%, #0284c7 55%, #38bdf8 100%)",
  },
  {
    id: "golden-empire",
    overlayTitle: "GOLDEN EMPIRE",
    label: "Golden Empire",
    players: 856,
    playersTone: "red",
    activity: 177,
    activityTone: "green",
    gradient:
      "linear-gradient(165deg, #422006 0%, #b45309 50%, #fcd34d 100%)",
  },
  {
    id: "dragon-hatch",
    overlayTitle: "DRAGON HATCH",
    label: "Dragon Hatch",
    players: 882,
    playersTone: "green",
    activity: 133,
    activityTone: "green",
    gradient:
      "linear-gradient(165deg, #064e3b 0%, #059669 50%, #6ee7b7 100%)",
  },
  {
    id: "candy-burst",
    overlayTitle: "CANDY BURST",
    label: "Candy Burst",
    players: 714,
    playersTone: "green",
    activity: 88,
    activityTone: "red",
    gradient:
      "linear-gradient(165deg, #701a75 0%, #c026d3 50%, #f0abfc 100%)",
  },
  {
    id: "speed-winner",
    overlayTitle: "SPEED WINNER",
    label: "Speed Winner",
    players: 972,
    playersTone: "red",
    activity: 245,
    activityTone: "green",
    favorited: true,
    gradient:
      "linear-gradient(165deg, #1e3a8a 0%, #2563eb 50%, #93c5fd 100%)",
  },
  {
    id: "roma-legacy",
    overlayTitle: "ROMA LEGACY",
    label: "Roma Legacy",
    players: 335,
    playersTone: "green",
    activity: 52,
    activityTone: "green",
    gradient:
      "linear-gradient(165deg, #292524 0%, #78716c 50%, #d6d3d1 100%)",
  },
  {
    id: "mahjong-ways",
    overlayTitle: "MAHJONG WAYS",
    label: "Mahjong Ways",
    players: 923,
    playersTone: "green",
    activity: 190,
    activityTone: "green",
    gradient:
      "linear-gradient(165deg, #14532d 0%, #16a34a 45%, #86efac 100%)",
  },
  {
    id: "gates-olympus",
    overlayTitle: "GATES OF OLYMPUS",
    label: "Gates of Olympus",
    players: 1044,
    playersTone: "red",
    activity: 276,
    activityTone: "green",
    favorited: true,
    gradient:
      "linear-gradient(165deg, #312e81 0%, #6366f1 50%, #fde047 100%)",
  },
];

export type MockSportBetSide = {
  role: "H" | "A";
  name: string;
  flag: string;
};

export type MockSportBetMatch = {
  id: string;
  league: string;
  kickoffLabel: string;
  home: MockSportBetSide;
  away: MockSportBetSide;
  odds: { home: number; draw: number; away: number };
  startsInLabel: string;
};

export const SPORT_BET_MATCHES: MockSportBetMatch[] = [
  {
    id: "uel-gr-de",
    league: "UEFA Nations League...",
    kickoffLabel: "01:45 : 05/10/69",
    home: { role: "H", name: "Greece", flag: "🇬🇷" },
    away: { role: "A", name: "Germany", flag: "🇩🇪" },
    odds: { home: 4.09, draw: 3.84, away: 1.83 },
    startsInLabel: "05:57:35",
  },
  {
    id: "wc-br-ar",
    league: "FIFA World Cup 2026...",
    kickoffLabel: "03:00 : 12/06/69",
    home: { role: "H", name: "Brazil", flag: "🇧🇷" },
    away: { role: "A", name: "Argentina", flag: "🇦🇷" },
    odds: { home: 2.45, draw: 3.1, away: 2.88 },
    startsInLabel: "12:24:18",
  },
  {
    id: "apl-mc-liv",
    league: "Premier League...",
    kickoffLabel: "23:30 : 04/10/69",
    home: { role: "H", name: "Man City", flag: "🔵" },
    away: { role: "A", name: "Liverpool", flag: "🔴" },
    odds: { home: 2.12, draw: 3.55, away: 3.2 },
    startsInLabel: "01:12:04",
  },
  {
    id: "laliga-rm-bar",
    league: "La Liga...",
    kickoffLabel: "02:15 : 06/10/69",
    home: { role: "H", name: "Real Madrid", flag: "🇪🇸" },
    away: { role: "A", name: "Barcelona", flag: "🇪🇸" },
    odds: { home: 2.05, draw: 3.4, away: 3.45 },
    startsInLabel: "08:33:12",
  },
  {
    id: "serie-juv-mil",
    league: "Serie A...",
    kickoffLabel: "21:00 : 05/10/69",
    home: { role: "H", name: "Juventus", flag: "🇮🇹" },
    away: { role: "A", name: "AC Milan", flag: "🇮🇹" },
    odds: { home: 2.38, draw: 3.25, away: 2.95 },
    startsInLabel: "03:18:44",
  },
  {
    id: "wc-fr-eng",
    league: "FIFA World Cup 2026...",
    kickoffLabel: "04:30 : 18/06/69",
    home: { role: "H", name: "France", flag: "🇫🇷" },
    away: { role: "A", name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    odds: { home: 2.22, draw: 3.15, away: 3.05 },
    startsInLabel: "16:42:09",
  },
  {
    id: "ucl-psg-bay",
    league: "UEFA Champions League...",
    kickoffLabel: "02:00 : 08/10/69",
    home: { role: "H", name: "PSG", flag: "🇫🇷" },
    away: { role: "A", name: "Bayern", flag: "🇩🇪" },
    odds: { home: 2.55, draw: 3.5, away: 2.65 },
    startsInLabel: "06:05:27",
  },
  {
    id: "wc-jp-kr",
    league: "FIFA World Cup 2026...",
    kickoffLabel: "18:00 : 22/06/69",
    home: { role: "H", name: "Japan", flag: "🇯🇵" },
    away: { role: "A", name: "South Korea", flag: "🇰🇷" },
    odds: { home: 2.7, draw: 3.05, away: 2.62 },
    startsInLabel: "22:11:55",
  },
  {
    id: "thai-t1-bg",
    league: "Thai League 1...",
    kickoffLabel: "19:00 : 05/10/69",
    home: { role: "H", name: "Buriram", flag: "🇹🇭" },
    away: { role: "A", name: "Bangkok Utd", flag: "🇹🇭" },
    odds: { home: 1.95, draw: 3.6, away: 3.75 },
    startsInLabel: "00:44:18",
  },
  {
    id: "euro-nl-es",
    league: "UEFA Euro Qualifiers...",
    kickoffLabel: "23:45 : 07/10/69",
    home: { role: "H", name: "Netherlands", flag: "🇳🇱" },
    away: { role: "A", name: "Spain", flag: "🇪🇸" },
    odds: { home: 3.1, draw: 3.2, away: 2.25 },
    startsInLabel: "09:27:33",
  },
  {
    id: "wc-us-mx",
    league: "FIFA World Cup 2026...",
    kickoffLabel: "05:00 : 02/07/69",
    home: { role: "H", name: "USA", flag: "🇺🇸" },
    away: { role: "A", name: "Mexico", flag: "🇲🇽" },
    odds: { home: 2.48, draw: 3.08, away: 2.92 },
    startsInLabel: "14:58:01",
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
