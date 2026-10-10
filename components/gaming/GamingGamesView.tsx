"use client";

import React, { useMemo, useState } from "react";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { GamingProviderSidebar } from "@/components/gaming/GamingProviderSidebar";
import { GamingGameCard } from "@/components/gaming/GamingGameCard";
import { getGamesForProvider } from "@/data/providerGames";
import { getGamingCategory, type GamingCategoryId } from "@/lib/gamingCategories";
import {
  listProvidersForCategory,
  resolveProviderForCategory,
} from "@/lib/gamingProviders";

type GameTab = "all" | "favorite";

interface GamingGamesViewProps {
  categoryId: GamingCategoryId;
  providerKey: string;
}

export function GamingGamesView({ categoryId, providerKey }: GamingGamesViewProps) {
  const meta = getGamingCategory(categoryId);
  if (!meta) notFound();

  const providers = listProvidersForCategory(meta);
  const provider = resolveProviderForCategory(meta, providerKey);
  if (!provider) notFound();

  const [tab, setTab] = useState<GameTab>("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const games = useMemo(
    () => getGamesForProvider(provider.title, meta.lobbyCategory),
    [provider.title, meta.lobbyCategory],
  );

  const visibleGames = useMemo(() => {
    if (tab === "favorite") {
      return games.filter((g) => favorites.has(g.id) || g.favorite);
    }
    return games;
  }, [games, tab, favorites]);

  const toggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:gap-4">
      <GamingProviderSidebar meta={meta} providers={providers} activeKey={providerKey} />

      <section className="gaming-lobby-panel min-w-0 flex-1 p-3 sm:p-4">
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: meta.breadcrumb, href: meta.basePath },
            { label: provider.title },
          ]}
          shareTitle={provider.title}
        />

        <header className="mt-3 flex flex-col gap-3 border-b border-black/[0.06] pb-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-lg font-black text-[var(--brand)] sm:text-xl">{provider.title}</h1>
          <div className="flex gap-4">
            <button
              type="button"
              className={`gaming-tab ${tab === "all" ? "gaming-tab--active" : ""}`}
              onClick={() => setTab("all")}
            >
              เกมทั้งหมด
            </button>
            <button
              type="button"
              className={`gaming-tab ${tab === "favorite" ? "gaming-tab--active" : ""}`}
              onClick={() => setTab("favorite")}
            >
              เกมโปรด
            </button>
          </div>
        </header>

        <p className="mt-2 text-xs text-[var(--text-muted)]">
          {visibleGames.length} เกม
          {tab === "favorite" && visibleGames.length === 0
            ? " — กดหัวใจที่การ์ดเกมเพื่อบันทึกโปรด"
            : ""}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {visibleGames.map((game) => (
            <GamingGameCard
              key={game.id}
              game={game}
              favorite={favorites.has(game.id) || Boolean(game.favorite)}
              onToggleFavorite={() => toggleFav(game.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
