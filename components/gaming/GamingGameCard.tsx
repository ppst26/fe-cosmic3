"use client";

import React from "react";
import Image from "next/image";
import { Heart, Flame, UsersRound } from "lucide-react";
import type { InnerGame } from "@/data/providerGames";

interface GamingGameCardProps {
  game: InnerGame;
  favorite: boolean;
  onToggleFavorite: () => void;
}

export function GamingGameCard({ game, favorite, onToggleFavorite }: GamingGameCardProps) {
  return (
    <div className="min-w-0">
      <article className="gaming-game-card group relative aspect-[3/4] w-full">
        <Image
          src={game.image}
          alt={game.title}
          fill
          sizes="(max-width: 640px) 50vw, 140px"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite();
          }}
          className="absolute right-1.5 top-1.5 z-10 rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm"
          aria-label="เกมโปรด"
        >
          <Heart className={`h-3.5 w-3.5 ${favorite ? "fill-red-500 text-red-500" : ""}`} />
        </button>

        {game.badge ? (
          <span
            className={`absolute left-1.5 top-1.5 flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold text-white ${
              game.badge === "ฮิต" ? "bg-red-600" : "bg-emerald-600"
            }`}
          >
            {game.badge === "ฮิต" ? <Flame className="h-3 w-3" /> : null}
            {game.badge}
          </span>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent px-2 pb-2 pt-10 text-center">
          <p className="line-clamp-2 text-[11px] font-extrabold uppercase leading-tight tracking-wide text-white">
            {game.title}
          </p>
          <p className="mt-1 flex items-center justify-end gap-0.5 text-[10px] text-zinc-400">
            <UsersRound className="h-3 w-3" />
            {game.players.toLocaleString()}
          </p>
        </div>
      </article>
      <p className="mt-1.5 truncate text-center text-xs font-medium text-[var(--text-on-light)]">{game.title}</p>
    </div>
  );
}
