export type GameCategory =
  | "slots"
  | "casino"
  | "fishing"
  | "cards"
  | "sport-games";

export type ProviderGame = {
  id: string;
  title: string;
  hot: boolean;
  isNew: boolean;
};

export type ProviderRecord = {
  id: string;
  name: string;
  games: ProviderGame[];
};

const GAME_CATEGORIES: readonly GameCategory[] = [
  "slots",
  "casino",
  "fishing",
  "cards",
  "sport-games",
];

function providerGames(prefix: string, label: string): ProviderGame[] {
  return [
    { id: `${prefix}-1`, title: `${label} 1`, hot: true, isNew: false },
    { id: `${prefix}-2`, title: `${label} 2`, hot: false, isNew: true },
    { id: `${prefix}-3`, title: `${label} 3`, hot: false, isNew: false },
    { id: `${prefix}-4`, title: `${label} 4`, hot: false, isNew: false },
  ];
}

const CATALOG: Record<GameCategory, ProviderRecord[]> = {
  slots: [
    { id: "pg", name: "PG SOFT", games: providerGames("pg", "PG SOFT") },
    { id: "jili", name: "JILI", games: providerGames("jili", "JILI") },
  ],
  casino: [
    { id: "sexy", name: "SEXY GAMING", games: providerGames("sexy", "SEXY GAMING") },
    { id: "sa", name: "SA GAMING", games: providerGames("sa", "SA GAMING") },
  ],
  fishing: [
    {
      id: "jili-fish",
      name: "JILI FISH",
      games: providerGames("jili-fish", "JILI FISH"),
    },
    {
      id: "spadegaming",
      name: "SPADE",
      games: providerGames("spadegaming", "SPADE"),
    },
  ],
  cards: [
    {
      id: "kingmidas",
      name: "KING MIDAS",
      games: providerGames("kingmidas", "KING MIDAS"),
    },
    { id: "km", name: "KM POKER", games: providerGames("km", "KM POKER") },
  ],
  "sport-games": [
    { id: "onebx", name: "ONE BX", games: providerGames("onebx", "ONE BX") },
    { id: "saba", name: "SABA", games: providerGames("saba", "SABA") },
  ],
};

export function getCategory(slug: string): GameCategory | null {
  return GAME_CATEGORIES.includes(slug as GameCategory)
    ? (slug as GameCategory)
    : null;
}

export function getProvider(
  category: GameCategory,
  providerId: string,
): ProviderRecord | null {
  return CATALOG[category].find((p) => p.id === providerId) ?? null;
}

export function listProviders(category: GameCategory): ProviderRecord[] {
  return CATALOG[category];
}
