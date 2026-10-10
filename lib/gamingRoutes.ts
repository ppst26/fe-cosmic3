import { LOBBY_GAMES, type LobbyGame } from "@/data/lobbyGames";
import type { CategoryKey } from "@/data/homeLobby";
import { PROVIDERS } from "@/data/homeLobby";
import { getGamingCategory, type GamingCategoryId } from "@/lib/gamingCategories";

const CATEGORY_TO_GAMING: Partial<Record<CategoryKey, GamingCategoryId>> = {
  slot: "slot",
  casino: "casino",
  sport: "sport",
  fish: "fish",
  table: "card",
  fight: "card",
};

const PROVIDER_ALIASES: Record<string, { gamingId: GamingCategoryId; key: string }> = {
  pgsoft: { gamingId: "slot", key: "pg" },
  pg: { gamingId: "slot", key: "pg" },
  pockergamessoft: { gamingId: "slot", key: "pg" },
  pragmaticplay: { gamingId: "slot", key: "pp" },
  ppslot: { gamingId: "slot", key: "pp" },
  jokergaming: { gamingId: "slot", key: "vertex" },
  jili: { gamingId: "slot", key: "jili" },
  nextspin: { gamingId: "slot", key: "nextspin" },
  askmeslot: { gamingId: "slot", key: "askme" },
  sunnigames: { gamingId: "slot", key: "sunni" },
  letsgo: { gamingId: "slot", key: "letsgo" },
  sexyslot: { gamingId: "slot", key: "ses" },
  ameba: { gamingId: "slot", key: "amigo" },
  habanero: { gamingId: "slot", key: "habanero" },
  bng: { gamingId: "slot", key: "bng" },
  booongo: { gamingId: "slot", key: "bng" },
  sexygaming: { gamingId: "casino", key: "sexy" },
  asexy: { gamingId: "casino", key: "sexy" },
  sagaming: { gamingId: "casino", key: "sa" },
  kingmidas: { gamingId: "card", key: "kingmidas" },
  "5ggames": { gamingId: "slot", key: "nextspin" },
  onebx: { gamingId: "sport", key: "onebx" },
  saba: { gamingId: "sport", key: "saba" },
};

export function normalizeProviderLabel(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function hrefFor(gamingId: GamingCategoryId, key: string): string | null {
  const meta = getGamingCategory(gamingId);
  if (!meta) return null;
  return `${meta.basePath}/${key}`;
}

export function resolveProviderRoute(label: string): string | null {
  const n = normalizeProviderLabel(label);
  if (!n) return null;

  const alias = PROVIDER_ALIASES[n];
  if (alias) return hrefFor(alias.gamingId, alias.key);

  for (const p of PROVIDERS) {
    if (normalizeProviderLabel(p.name) === n || normalizeProviderLabel(p.shortName) === n) {
      return `/slots/${p.id}`;
    }
  }

  for (const g of LOBBY_GAMES) {
    if (normalizeProviderLabel(g.title) === n) {
      const gamingId = CATEGORY_TO_GAMING[g.category];
      if (gamingId) return hrefFor(gamingId, String(g.id));
    }
  }

  for (const p of PROVIDERS) {
    const pn = normalizeProviderLabel(p.name);
    if (n.includes(pn) || pn.includes(n)) return `/slots/${p.id}`;
  }

  for (const g of LOBBY_GAMES) {
    const gn = normalizeProviderLabel(g.title);
    if (n.includes(gn) || gn.includes(n)) {
      const gamingId = CATEGORY_TO_GAMING[g.category];
      if (gamingId) return hrefFor(gamingId, String(g.id));
    }
  }

  return null;
}

export function resolveLobbyGameHref(game: LobbyGame): string | null {
  return resolveProviderRoute(game.title);
}

export function resolveCategoryBasePath(categoryLabel: string): string | null {
  const t = categoryLabel.toLowerCase();
  if (t.includes("สล็อต") || t.includes("slot") || t.includes("jackpot")) return "/slots";
  if (t.includes("คาสิโน") || t.includes("casino") || t.includes("บาคาร่า") || t.includes("live"))
    return "/casino";
  if (t.includes("กีฬา") || t.includes("sport")) return "/sports";
  if (t.includes("ยิงปลา") || t.includes("fish")) return "/fish";
  if (t.includes("ไพ่") || t.includes("card")) return "/card";
  return null;
}

export function resolveMostOnlineHref(brand: string, category: string): string {
  return resolveProviderRoute(brand) ?? resolveCategoryBasePath(category) ?? "/slots";
}

export function slotsProviderHref(providerId: string): string {
  return `/slots/${providerId}`;
}
