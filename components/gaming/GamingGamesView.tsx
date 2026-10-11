"use client";

import React, { useMemo, useState } from "react";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { GameSearchBar } from "@/components/GameSearchBar";
import { GamingProviderSidebar } from "@/components/gaming/GamingProviderSidebar";
import { GamingGameCard } from "@/components/gaming/GamingGameCard";
import { getGamesByProvider } from "@/app/data/providerGamesData";
import { resolveCategoryProviderId } from "@/lib/categoryProviderPaths";
import { useT } from "@/lib/i18n/I18nProvider";
import { getGamingCategory, type GamingCategoryId } from "@/lib/gamingCategories";
import { listProvidersForCategory, resolveProviderForCategory } from "@/lib/gamingProviders";

type GameTab = "all" | "favorite";

interface GamingGamesViewProps {
  categoryId: GamingCategoryId;
  providerKey: string;
}

/** สล็อตใช้ slug ตรง · ยิงปลา/เกมไพ่ แปลงผ่าน resolveCategoryProviderId (เหมือน LobbyProviderGamesView ของ glass) */
function resolveProviderId(categoryId: GamingCategoryId, slug: string): string {
  if (categoryId === "fish") return resolveCategoryProviderId("fishing", slug);
  if (categoryId === "card") return resolveCategoryProviderId("cards", slug);
  if (categoryId === "casino") return resolveCategoryProviderId("casino", slug);
  return slug;
}

export function GamingGamesView({ categoryId, providerKey }: GamingGamesViewProps) {
  const t = useT("home");
  const gt = useT("games");
  const meta = getGamingCategory(categoryId);
  if (!meta) notFound();

  const providers = listProvidersForCategory(meta);
  const provider = resolveProviderForCategory(meta, providerKey);
  if (!provider) notFound();

  const [tab, setTab] = useState<GameTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  /** เกมโปรดเก็บใน state ของหน้านี้เท่านั้น (เหมือน ProviderGameGrid ของ glass) */
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const games = useMemo(() => {
    const all = getGamesByProvider(resolveProviderId(meta.id, providerKey));
    const q = searchQuery.toLowerCase().trim();
    if (!q) return all;
    return all.filter((g) => g.title.toLowerCase().includes(q));
  }, [meta.id, providerKey, searchQuery]);

  const visibleGames = useMemo(() => {
    if (tab === "favorite") {
      return games.filter((g) => favorites.has(g.id) || g.isFavorite);
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
            { label: t("categories.home"), href: "/" },
            { label: t(meta.labelKey), href: meta.basePath },
            { label: provider.title },
          ]}
          shareTitle={provider.title}
        />

        <GameSearchBar
          className="mt-3"
          placeholder={gt("providerGames.searchPlaceholder")}
          onSearch={setSearchQuery}
        />

        <header className="mt-3 flex flex-col gap-3 border-b border-white/[0.06] pb-3 sm:flex-row sm:items-center sm:justify-between">
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
          {gt("providerGames.gameCount", { count: visibleGames.length })}
          {tab === "favorite" && visibleGames.length === 0 ? ` — ${gt("providerGames.favoriteAdd")}` : ""}
        </p>

        {visibleGames.length === 0 && tab === "all" ? (
          <div className="my-10 text-center">
            <h3 className="text-base font-medium text-[var(--text-on-light)]">{gt("providerGames.notFoundTitle")}</h3>
            <p className="mt-1 text-xs text-[var(--text-muted)]">{gt("providerGames.notFoundHint")}</p>
          </div>
        ) : null}

        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {visibleGames.map((game) => (
            <GamingGameCard
              key={game.id}
              game={game}
              providerLabel={provider.title}
              favorite={favorites.has(game.id) || Boolean(game.isFavorite)}
              onToggleFavorite={() => toggleFav(game.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
