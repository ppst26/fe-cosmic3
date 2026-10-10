"use client";

import { useMemo } from "react";
import { LOBBY_GAMES } from "@/data/lobbyGames";
import { useAuth } from "@/context/AuthContext";
import { lobbyToSportCard } from "@/lib/home/lobbyToSportCard";
import {
  ACTIVITY_CAROUSEL_ITEMS,
  SPORT_CATEGORIES,
  TRENDING_THUMBS,
  type MockSportCategory,
} from "@/lib/mock/home";
import { HomeActivityCarousel } from "./HomeActivityCarousel";
import { HomeCatalogRailSection } from "./HomeCatalogRailSection";
import { HomeScreenShortcutBanner } from "./HomeScreenShortcutBanner";

function BasketballIcon() {
  return (
    <span className="inline-flex text-[var(--brand)]" aria-hidden>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.22.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
        />
      </svg>
    </span>
  );
}

function lobbyRail(
  category: "casino" | "slot" | "fish" | "sport",
  favoriteIds: string[],
  limit = 12,
): MockSportCategory[] {
  return LOBBY_GAMES.filter((g) => g.category === category)
    .slice(0, limit)
    .map((g) => lobbyToSportCard(g, favoriteIds.includes(String(g.id))));
}

export function HomeCatalogSections() {
  const { state } = useAuth();
  const favoriteIds = state.favoriteGameIds;

  const sports = useMemo(
    () =>
      SPORT_CATEGORIES.map((item) => ({
        ...item,
        href: `/sports/${item.id}`,
      })),
    [],
  );

  const trending = useMemo(
    () =>
      TRENDING_THUMBS.map((item) => ({
        ...item,
        href: item.href ?? "/slots",
      })),
    [],
  );

  const casino = useMemo(() => lobbyRail("casino", favoriteIds), [favoriteIds]);
  const slots = useMemo(() => lobbyRail("slot", favoriteIds), [favoriteIds]);
  const fish = useMemo(() => lobbyRail("fish", favoriteIds), [favoriteIds]);

  return (
    <>
      <HomeCatalogRailSection
        title="กีฬา"
        leading={<BasketballIcon />}
        viewAllHref="/sports"
        items={sports}
      />
      <HomeCatalogRailSection title="มาแรง" icon="🔥" viewAllHref="/slots" items={trending} />
      <HomeCatalogRailSection title="คาสิโน" icon="🎲" viewAllHref="/casino" items={casino} />
      <HomeCatalogRailSection title="สล็อต" icon="🎰" viewAllHref="/slots" items={slots} />
      <HomeCatalogRailSection title="ยิงปลา" icon="🐟" viewAllHref="/fish" items={fish} />
      <HomeActivityCarousel items={ACTIVITY_CAROUSEL_ITEMS} />
      <HomeScreenShortcutBanner />
    </>
  );
}
