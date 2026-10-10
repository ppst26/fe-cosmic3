"use client";

import React from "react";
import Link from "@/lib/i18n/navigation";
import { Heart } from "lucide-react";
import { useT } from "@/lib/i18n/I18nProvider";
import { buildGamePlayHref } from "@/lib/gamePlayPaths";
import type { ProviderGameItem } from "@/app/types/providers";

interface GamingGameCardProps {
  game: ProviderGameItem;
  providerLabel?: string;
  favorite: boolean;
  onToggleFavorite: () => void;
}

/** การ์ดเกมในค่าย — กดเข้าหน้าเล่น /play/[id] เหมือน glass (ProviderGameGrid) */
export function GamingGameCard({ game, providerLabel, favorite, onToggleFavorite }: GamingGameCardProps) {
  const t = useT("games");
  const href = buildGamePlayHref({ id: game.id, title: game.title, provider: providerLabel ?? game.providerId });

  return (
    <div className="min-w-0">
      <article className="gaming-game-card group relative aspect-[3/4] w-full">
        <Link href={href} className="absolute inset-0 block" aria-label={game.title}>
          <div
            className={`absolute inset-0 bg-gradient-to-br ${game.bgGradient} transition duration-300 group-hover:scale-[1.03]`}
            aria-hidden="true"
          >
            <span
              className="absolute inset-0 flex items-center justify-center text-5xl font-black opacity-35"
              style={{ color: game.accentColor }}
            >
              {game.title.charAt(0).toUpperCase()}
            </span>
          </div>

          {game.badge ? (
            <span className="absolute left-1.5 top-1.5 rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
              {game.badge}
            </span>
          ) : null}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent px-2 pb-2 pt-10 text-center">
            <p className="line-clamp-2 text-[11px] font-extrabold uppercase leading-tight tracking-wide text-white">
              {game.title}
            </p>
          </div>
        </Link>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute right-1.5 top-1.5 z-10 cursor-pointer rounded-full border-0 bg-black/50 p-1.5 text-white"
          aria-label={favorite ? t("providerGames.favoriteRemove") : t("providerGames.favoriteAdd")}
          aria-pressed={favorite}
        >
          <Heart className={`h-3.5 w-3.5 ${favorite ? "fill-red-500 text-red-500" : ""}`} />
        </button>
      </article>
      <p className="mt-1.5 truncate text-center text-xs font-medium text-[var(--text-on-light)]">{game.title}</p>
    </div>
  );
}
