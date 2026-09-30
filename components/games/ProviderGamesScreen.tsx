"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useMember } from "@/components/member/MemberProvider";
import { SheetFrame } from "@/components/wallet/SheetFrame";
import type { GameCategory, ProviderGame } from "@/data/providers";
import { getProvider } from "@/data/providers";
import { filterProviderGames } from "@/lib/games/filterGames";

const CATEGORY_TITLES: Record<GameCategory, string> = {
  slots: "สล็อต",
  casino: "คาสิโน",
  fishing: "ยิงปลา",
  cards: "ไพ่",
  "sport-games": "กีฬา",
};

const TABS: { key: "all" | "hot" | "new" | "favorite"; label: string }[] = [
  { key: "all", label: "ทั้งหมด" },
  { key: "hot", label: "มาแรง" },
  { key: "new", label: "มาใหม่" },
  { key: "favorite", label: "โปรด" },
];

type ProviderGamesScreenProps = {
  category: GameCategory;
  providerId: string;
};

export function ProviderGamesScreen({ category, providerId }: ProviderGamesScreenProps) {
  const { state, dispatch } = useMember();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"all" | "hot" | "new" | "favorite">("all");
  const [launchGame, setLaunchGame] = useState<ProviderGame | null>(null);

  const provider = getProvider(category, providerId);
  const categoryTitle = CATEGORY_TITLES[category];

  const games = useMemo(() => {
    if (!provider) return [];
    return filterProviderGames(provider.games, query, tab, state.favoriteGameIds);
  }, [provider, query, tab, state.favoriteGameIds]);

  if (!provider) {
    return (
      <div className="space-y-3 py-6 text-center">
        <p className="text-base font-semibold text-[var(--text-on-light)]">ไม่พบค่าย</p>
        <Link
          href={`/${category}`}
          className="inline-flex h-10 items-center rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] px-4 text-sm font-semibold text-[var(--text-on-light)]"
        >
          กลับหน้า{categoryTitle}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <nav>
        <Link
          href={`/${category}`}
          className="text-sm font-semibold text-[var(--brand)]"
        >
          ← {categoryTitle}
        </Link>
      </nav>
      <h1 className="text-lg font-bold text-[var(--text-on-light)]">{provider.name}</h1>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ค้นหาเกม"
        className="h-10 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] px-3 text-sm outline-none"
      />

      <div className="flex gap-2 overflow-x-auto scrollbar-none">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`h-10 shrink-0 rounded-[var(--radius-soft-sm)] px-3 text-sm font-semibold ${
              tab === key
                ? "soft-btn-primary"
                : "bg-[var(--soft-card)] text-[var(--text-on-light)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6">
        {games.map((game) => {
          const favorited = state.favoriteGameIds.includes(game.id);
          const hue = (game.id.charCodeAt(game.id.length - 1) * 17) % 360;

          return (
            <li key={game.id}>
              <article className="overflow-hidden rounded-[var(--radius-soft-md)] bg-[var(--soft-card-elevated)] shadow-[var(--shadow-soft-sm)]">
                <div className="relative m-1 aspect-[3/4] w-[calc(100%-0.5rem)] overflow-hidden rounded-[var(--radius-soft-sm)]">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(145deg, hsl(${hue} 55% 50%), hsl(${hue + 40} 60% 38%))`,
                    }}
                  />
                  {game.hot ? (
                    <span className="absolute left-1 top-1 rounded-full bg-[#ff6b6b] px-1.5 py-0.5 text-[8px] font-bold text-white">
                      ฮิต
                    </span>
                  ) : null}
                  {game.isNew ? (
                    <span className="absolute left-1 top-1 rounded-full bg-[#5b8def] px-1.5 py-0.5 text-[8px] font-bold text-white">
                      ใหม่
                    </span>
                  ) : null}
                  <button
                    type="button"
                    aria-label="บันทึกเกมโปรด"
                    onClick={(event) => {
                      event.stopPropagation();
                      dispatch({ type: "toggleFavorite", gameId: game.id });
                    }}
                    className={`relative z-10 absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--soft-card-elevated)]/85 text-xs ${
                      favorited ? "text-[#ff6b6b]" : "text-[var(--text-muted)]"
                    }`}
                  >
                    {favorited ? "♥" : "♡"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLaunchGame(game)}
                    className="absolute inset-0 flex items-end p-1.5 text-left"
                  >
                    <span className="line-clamp-2 w-full rounded-[var(--radius-soft-sm)] bg-black/50 px-1 py-0.5 text-[10px] font-medium leading-tight text-white">
                      {game.title}
                    </span>
                  </button>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      {launchGame ? (
        <SheetFrame title="เข้าเกม" onClose={() => setLaunchGame(null)}>
          <p className="text-sm text-[var(--text-muted)]">กำลังเข้าเกมจำลอง</p>
          <p className="mt-2 text-base font-semibold text-[var(--text-on-light)]">
            {launchGame.title}
          </p>
        </SheetFrame>
      ) : null}
    </div>
  );
}
