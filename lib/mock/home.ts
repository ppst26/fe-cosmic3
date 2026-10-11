export const SPORT_PROVIDERS = [
  { name: "ONE BX", count: 158 },
  { name: "Sportbook", count: 241 },
  { name: "Muay", count: 213 },
  { name: "Muay Thai", count: 915 },
  { name: "Cock Fight", count: 149 },
  { name: "E-Sport", count: 167 },
] as const;

export type SportStatTone = "red" | "green";

export type MockSportCategory = {
  id: string;
  overlayTitle: string;
  label: string;
  /** ตัวเลขผู้เล่น/กิจกรรม — ไม่ระบุเมื่อไม่มีข้อมูลจริง (การ์ดจาก lobby API) */
  players?: number;
  playersTone?: SportStatTone;
  activity?: number;
  activityTone?: SportStatTone;
  gradient: string;
  imageUrl?: string;
  href?: string;
};

export const SPORT_CATEGORIES: MockSportCategory[] = [
  {
    id: "one-bx",
    overlayTitle: "ONE BX",
    label: "ONE BX",
    players: 159,
    playersTone: "red",
    activity: 42,
    activityTone: "green",
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
    gradient:
      "linear-gradient(165deg, #1e1b4b 0%, #4338ca 50%, #f97316 100%)",
  },
];

/** แถบมาแรง — thumbnail แนวตั้งเลื่อนแนวนอน (mock) */
export type MockSportBetSide = {
  role: "H" | "A";
  name: string;
  /** รหัสทีมย่อ (2-3 ตัวอักษร) ใช้แทนธง — ไม่ใช้ emoji */
  code: string;
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
    home: { role: "H", name: "Greece", code: "GR" },
    away: { role: "A", name: "Germany", code: "DE" },
    odds: { home: 4.09, draw: 3.84, away: 1.83 },
    startsInLabel: "05:57:35",
  },
  {
    id: "wc-br-ar",
    league: "FIFA World Cup 2026...",
    kickoffLabel: "03:00 : 12/06/69",
    home: { role: "H", name: "Brazil", code: "BR" },
    away: { role: "A", name: "Argentina", code: "AR" },
    odds: { home: 2.45, draw: 3.1, away: 2.88 },
    startsInLabel: "12:24:18",
  },
  {
    id: "apl-mc-liv",
    league: "Premier League...",
    kickoffLabel: "23:30 : 04/10/69",
    home: { role: "H", name: "Man City", code: "MCI" },
    away: { role: "A", name: "Liverpool", code: "LIV" },
    odds: { home: 2.12, draw: 3.55, away: 3.2 },
    startsInLabel: "01:12:04",
  },
  {
    id: "laliga-rm-bar",
    league: "La Liga...",
    kickoffLabel: "02:15 : 06/10/69",
    home: { role: "H", name: "Real Madrid", code: "RMA" },
    away: { role: "A", name: "Barcelona", code: "BAR" },
    odds: { home: 2.05, draw: 3.4, away: 3.45 },
    startsInLabel: "08:33:12",
  },
  {
    id: "serie-juv-mil",
    league: "Serie A...",
    kickoffLabel: "21:00 : 05/10/69",
    home: { role: "H", name: "Juventus", code: "JUV" },
    away: { role: "A", name: "AC Milan", code: "MIL" },
    odds: { home: 2.38, draw: 3.25, away: 2.95 },
    startsInLabel: "03:18:44",
  },
  {
    id: "wc-fr-eng",
    league: "FIFA World Cup 2026...",
    kickoffLabel: "04:30 : 18/06/69",
    home: { role: "H", name: "France", code: "FR" },
    away: { role: "A", name: "England", code: "EN" },
    odds: { home: 2.22, draw: 3.15, away: 3.05 },
    startsInLabel: "16:42:09",
  },
  {
    id: "ucl-psg-bay",
    league: "UEFA Champions League...",
    kickoffLabel: "02:00 : 08/10/69",
    home: { role: "H", name: "PSG", code: "PSG" },
    away: { role: "A", name: "Bayern", code: "BAY" },
    odds: { home: 2.55, draw: 3.5, away: 2.65 },
    startsInLabel: "06:05:27",
  },
  {
    id: "wc-jp-kr",
    league: "FIFA World Cup 2026...",
    kickoffLabel: "18:00 : 22/06/69",
    home: { role: "H", name: "Japan", code: "JP" },
    away: { role: "A", name: "South Korea", code: "KR" },
    odds: { home: 2.7, draw: 3.05, away: 2.62 },
    startsInLabel: "22:11:55",
  },
  {
    id: "thai-t1-bg",
    league: "Thai League 1...",
    kickoffLabel: "19:00 : 05/10/69",
    home: { role: "H", name: "Buriram", code: "BRM" },
    away: { role: "A", name: "Bangkok Utd", code: "BKK" },
    odds: { home: 1.95, draw: 3.6, away: 3.75 },
    startsInLabel: "00:44:18",
  },
  {
    id: "euro-nl-es",
    league: "UEFA Euro Qualifiers...",
    kickoffLabel: "23:45 : 07/10/69",
    home: { role: "H", name: "Netherlands", code: "NL" },
    away: { role: "A", name: "Spain", code: "ES" },
    odds: { home: 3.1, draw: 3.2, away: 2.25 },
    startsInLabel: "09:27:33",
  },
  {
    id: "wc-us-mx",
    league: "FIFA World Cup 2026...",
    kickoffLabel: "05:00 : 02/07/69",
    home: { role: "H", name: "USA", code: "US" },
    away: { role: "A", name: "Mexico", code: "MX" },
    odds: { home: 2.48, draw: 3.08, away: 2.92 },
    startsInLabel: "14:58:01",
  },
];

