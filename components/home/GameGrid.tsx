import type { MockGame } from "@/lib/mock/home";
import { GameCard } from "./GameCard";

export function GameGrid({ games }: { games: MockGame[] }) {
  return (
    <ul className="grid grid-cols-3 gap-2 bg-[var(--soft-card)] px-3 pb-4 pt-1 sm:grid-cols-4 sm:px-4 md:grid-cols-5 lg:grid-cols-6">
      {games.map((game) => (
        <li key={game.id}>
          <GameCard
            game={{
              id: game.id,
              title: game.title,
              players: game.players.toLocaleString("th-TH"),
              tag: game.tag,
              hue: game.hue,
            }}
          />
        </li>
      ))}
    </ul>
  );
}
