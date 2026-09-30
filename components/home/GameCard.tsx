export type GameCardData = {
  id: string;
  title: string;
  players: string;
  tag?: "hot" | "new";
  emoji?: string;
  hue?: number;
  subtitle?: string;
};

export function GameCard({ game }: { game: GameCardData }) {
  const hue = game.hue ?? (game.id.charCodeAt(game.id.length - 1) * 17) % 360;

  return (
    <article className="overflow-hidden rounded-[var(--radius-soft-md)] bg-[var(--soft-card-elevated)] shadow-[var(--shadow-soft-sm)]">
      <div className="relative m-1 aspect-[3/4] w-[calc(100%-0.5rem)] overflow-hidden rounded-[var(--radius-soft-sm)]">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(145deg, hsl(${hue} 55% 50%), hsl(${hue + 40} 60% 38%))`,
          }}
        />
        {game.emoji ? (
          <span className="absolute inset-0 flex items-center justify-center text-4xl" aria-hidden>
            {game.emoji}
          </span>
        ) : null}
        {game.tag === "hot" && (
          <span className="absolute left-1.5 top-1.5 rounded-full bg-[#ff6b6b] px-2 py-0.5 text-[9px] font-bold text-white">
            ฮิต
          </span>
        )}
        {game.tag === "new" && (
          <span className="absolute left-1.5 top-1.5 rounded-full bg-[#5b8def] px-2 py-0.5 text-[9px] font-bold text-white">
            ใหม่
          </span>
        )}
        <button
          type="button"
          aria-label="เพิ่มเกมโปรด"
          className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--soft-card-elevated)]/85 text-xs text-[var(--text-muted)]"
        >
          ♡
        </button>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-1.5 pb-1.5 pt-6">
          <p className="line-clamp-2 text-[10px] font-medium leading-tight text-white">{game.title}</p>
        </div>
      </div>
      <p className="flex items-center gap-1 px-2 pb-2 text-[10px] text-[var(--text-muted)]">
        <span aria-hidden>👤</span>
        {game.players}
        {game.subtitle ? <span className="truncate">· {game.subtitle}</span> : null}
      </p>
    </article>
  );
}
