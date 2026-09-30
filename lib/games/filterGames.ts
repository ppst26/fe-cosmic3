import type { ProviderGame } from "@/data/providers";

export function filterProviderGames(
  games: ProviderGame[],
  query: string,
  tab: "all" | "hot" | "new" | "favorite",
  favoriteIds: string[],
): ProviderGame[] {
  const q = query.trim().toLowerCase();

  return games.filter((game) => {
    if (q && !game.title.toLowerCase().includes(q)) {
      return false;
    }
    if (tab === "hot" && !game.hot) {
      return false;
    }
    if (tab === "new" && !game.isNew) {
      return false;
    }
    if (tab === "favorite" && !favoriteIds.includes(game.id)) {
      return false;
    }
    return true;
  });
}
