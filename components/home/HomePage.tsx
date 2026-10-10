"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/lib/i18n/navigation";
import { HeaderBar, NoticeMarquee } from "@/components/layout";
import { HomeMainContainer } from "./HomeMainContainer";
import { HomeTopFeed } from "./HomeTopFeed";
import { HomePageSection } from "./HomePageSection";
import { HomeLobbyGrid } from "./HomeLobbyGrid";
import { LOBBY_GAMES } from "@/data/lobbyGames";
import {
  NAV_CATEGORIES,
  NOTICE_TEXT,
  PROVIDERS,
  type CategoryKey,
  type LobbyGame,
} from "@/data/homeLobby";
import { useAuthUI } from "@/context/AuthUIContext";
import { useAuth } from "@/context/AuthContext";
import { InfoDialog } from "./dialogs";
import { SportBettingSection } from "./SportBettingSection";
import { HomeCatalogSections } from "./HomeCatalogSections";
import { resolveProviderRoute, slotsProviderHref } from "@/lib/gamingRoutes";

type DialogState = { type: "none" } | { type: "info"; title: string; message: string };

const CATEGORY_ROUTES: Partial<Record<CategoryKey, string>> = {
  slot: "/slots",
  casino: "/casino",
  sport: "/sports",
  fish: "/fish",
  table: "/card",
};

const CATEGORY_FILTER: Partial<Record<CategoryKey, LobbyGame["category"]>> = {
  slot: "slot",
  casino: "casino",
  sport: "sport",
  fish: "fish",
  table: "card",
  fight: "card",
};

export function HomePage() {
  const router = useRouter();
  const { state } = useAuth();
  const { openLogin, openRegister } = useAuthUI();
  const [activeCat, setActiveCat] = useState<CategoryKey>("home");
  const [dialog, setDialog] = useState<DialogState>({ type: "none" });

  const lobbyGames = useMemo((): LobbyGame[] => {
    if (activeCat === "new") {
      return LOBBY_GAMES.filter((game) => game.badge === "ใหม่");
    }

    if (activeCat === "favorite") {
      return LOBBY_GAMES.filter((game) => state.favoriteGameIds.includes(String(game.id)));
    }

    const mapped = CATEGORY_FILTER[activeCat];
    if (mapped) {
      return LOBBY_GAMES.filter((game) => game.category === mapped);
    }

    if (activeCat === "providers") {
      return [];
    }

    return LOBBY_GAMES.filter((game) => game.hot);
  }, [activeCat, state.favoriteGameIds]);

  function handleCategorySelect(id: CategoryKey) {
    const route = CATEGORY_ROUTES[id];
    if (route) {
      router.push(route);
      return;
    }
    if (id === "lotto") {
      router.push("/lottery");
      return;
    }
    setActiveCat(id);
  }

  function openProviderLink(name: string, fallbackId: string) {
    const href = resolveProviderRoute(name) ?? slotsProviderHref(fallbackId);
    router.push(href);
  }

  function closeDialog() {
    setDialog({ type: "none" });
  }

  const lobbySectionTitle =
    NAV_CATEGORIES.find((item) => item.id === activeCat)?.label ?? "เกม";

  const showSportSections = activeCat === "home" || activeCat === "sport";
  const showLobbySection = activeCat !== "home";

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-40 w-full">
        <HeaderBar
          onOpenLogin={openLogin}
          onOpenRegister={openRegister}
          onOpenSearch={() =>
            document.getElementById("game-search")?.scrollIntoView({ behavior: "smooth" })
          }
        />
        <NoticeMarquee text={NOTICE_TEXT} />
      </div>
      <HomeTopFeed
        navItems={NAV_CATEGORIES}
        activeCat={activeCat}
        onSelectCategory={handleCategorySelect}
      />

      <HomeMainContainer>
        {showSportSections ? (
          <>
            <SportBettingSection />
            <HomeCatalogSections />
          </>
        ) : null}

        {showLobbySection ? (
          activeCat === "providers" ? (
            <HomePageSection title="ค่ายเกม" icon="🎰">
              <ul className="grid grid-cols-3 gap-2 py-2 sm:grid-cols-4 lg:grid-cols-6">
                {PROVIDERS.map((provider) => (
                  <li key={provider.id}>
                    <button
                      type="button"
                      onClick={() => openProviderLink(provider.name, provider.id)}
                      className="flex w-full flex-col items-center gap-1 rounded-[var(--radius-soft-md)] bg-[var(--soft-card-elevated)] px-2 py-3 text-center shadow-[var(--shadow-soft-sm)] border-0 cursor-pointer"
                    >
                      <span className="text-xl" aria-hidden>{provider.emoji}</span>
                      <span className="text-[11px] font-semibold text-[var(--text-on-light)]">
                        {provider.shortName}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </HomePageSection>
          ) : (
            <HomePageSection title={lobbySectionTitle} icon="🔥">
              <HomeLobbyGrid games={lobbyGames} categoryLabel={lobbySectionTitle} />
            </HomePageSection>
          )
        ) : null}
      </HomeMainContainer>

      {dialog.type === "info" ? (
        <InfoDialog title={dialog.title} message={dialog.message} onClose={closeDialog} />
      ) : null}
    </div>
  );
}
