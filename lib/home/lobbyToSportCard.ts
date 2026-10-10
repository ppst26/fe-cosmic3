import type { LobbyGame } from "@/data/homeLobby";
import type { MockSportCategory, SportStatTone } from "@/lib/mock/home";
import { resolveLobbyGameHref } from "@/lib/gamingRoutes";

const GRADIENTS = [
  "linear-gradient(165deg, #1a0f2e 0%, #6d28d9 45%, #a855f7 100%)",
  "linear-gradient(165deg, #451a03 0%, #ea580c 50%, #fbbf24 100%)",
  "linear-gradient(165deg, #0c4a6e 0%, #0284c7 55%, #38bdf8 100%)",
  "linear-gradient(165deg, #064e3b 0%, #059669 50%, #6ee7b7 100%)",
  "linear-gradient(165deg, #500724 0%, #be123c 50%, #fb7185 100%)",
  "linear-gradient(165deg, #312e81 0%, #6366f1 50%, #fde047 100%)",
  "linear-gradient(165deg, #1e3a8a 0%, #2563eb 50%, #93c5fd 100%)",
  "linear-gradient(165deg, #422006 0%, #b45309 50%, #fcd34d 100%)",
];

function toneFromSeed(seed: number): SportStatTone {
  return seed % 3 === 0 ? "red" : "green";
}

export function lobbyToSportCard(game: LobbyGame, favorited = false): MockSportCategory {
  const seed = game.id * 17 + game.title.length;
  const players = game.players ?? 100 + (seed % 900);
  const activity = 20 + (seed % 280);

  return {
    id: `lobby-${game.id}`,
    overlayTitle: game.title.toUpperCase(),
    label: game.title,
    players,
    playersTone: game.trend === "down" ? "red" : toneFromSeed(seed),
    activity,
    activityTone: game.trend === "up" ? "green" : toneFromSeed(seed + 1),
    favorited,
    gradient: GRADIENTS[seed % GRADIENTS.length],
    imageUrl: game.image,
    href: resolveLobbyGameHref(game) ?? undefined,
  };
}
