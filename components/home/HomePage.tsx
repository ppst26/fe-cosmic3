"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BottomNav,
  CategoryIconNav,
  FloatingControls,
  GameSearchBar,
  HeaderBar,
  HeroCarousel,
  NoticeMarquee,
  SectionHeader,
} from "@/components/layout";
import { SoftSection } from "@/components/ui/SoftSection";
import { LOBBY_GAMES } from "@/data/lobbyGames";
import {
  HALL_OF_FAME,
  LOBBY_TABS,
  MOST_ONLINE_GAMES,
  NAV_CATEGORIES,
  NOTICE_TEXT,
  POPULAR_GAMES,
  PROMOTIONS,
  PROVIDERS,
  type CategoryKey,
  type LobbyGame,
  type TabKey,
} from "@/data/homeLobby";
import { listProviders, type GameCategory } from "@/data/providers";
import { AuthSheet } from "@/components/auth/AuthSheet";
import { useMember } from "@/components/member/MemberProvider";
import { GameCard } from "./GameCard";
import { InfoDialog } from "./dialogs";
import { SportsSection } from "./SportsSection";

type DialogState =
  | { type: "none" }
  | { type: "auth"; mode: "login" | "register" }
  | { type: "info"; title: string; message: string };

const SLOTS_CATALOG_PROVIDER_IDS = new Set(["pg", "jili"]);

const PROVIDER_FAVORITE_CATEGORIES: GameCategory[] = [
  "slots",
  "casino",
  "fishing",
  "cards",
  "sport-games",
];

type HomeGridItem =
  | { source: "lobby"; game: LobbyGame }
  | { source: "provider"; id: string; title: string };

const CATEGORY_ROUTES: Partial<Record<CategoryKey, string>> = {
  slot: "/slots",
  casino: "/casino",
  sport: "/sport-games",
  fish: "/fishing",
  table: "/cards",
};

export function HomePage() {
  const router = useRouter();
  const { state } = useMember();
  const [activeCat, setActiveCat] = useState<CategoryKey>("home");
  const [gameSubTab, setGameSubTab] = useState<TabKey>("hot");
  const [dialog, setDialog] = useState<DialogState>({ type: "none" });

  const lobbyGames = useMemo((): HomeGridItem[] => {
    const toLobbyItems = (games: LobbyGame[]): HomeGridItem[] =>
      games.map((game) => ({ source: "lobby", game }));

    if (activeCat !== "home") {
      return toLobbyItems(
        LOBBY_GAMES.filter((game) => game.category === activeCat).slice(0, 12),
      );
    }

    if (gameSubTab === "hot") {
      return toLobbyItems(LOBBY_GAMES.filter((game) => game.hot).slice(0, 12));
    }
    if (gameSubTab === "recent") {
      return toLobbyItems(LOBBY_GAMES.filter((game) => game.recent).slice(0, 12));
    }

    const lobbyFavorites = LOBBY_GAMES.filter((game) =>
      state.favoriteGameIds.includes(String(game.id)),
    );
    const seenIds = new Set(lobbyFavorites.map((game) => String(game.id)));
    const providerItems: HomeGridItem[] = [];

    for (const category of PROVIDER_FAVORITE_CATEGORIES) {
      for (const provider of listProviders(category)) {
        for (const game of provider.games) {
          if (state.favoriteGameIds.includes(game.id) && !seenIds.has(game.id)) {
            seenIds.add(game.id);
            providerItems.push({ source: "provider", id: game.id, title: game.title });
          }
        }
      }
    }

    return [...toLobbyItems(lobbyFavorites), ...providerItems].slice(0, 12);
  }, [activeCat, gameSubTab, state.favoriteGameIds]);

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

  function handleProviderClick(providerId: string) {
    if (SLOTS_CATALOG_PROVIDER_IDS.has(providerId)) {
      router.push(`/slots/${providerId}`);
      return;
    }
    router.push("/slots");
  }

  function closeDialog() {
    setDialog({ type: "none" });
  }

  return (
    <div className="min-h-screen bg-[var(--body)] pb-24">
      <HeaderBar
        onOpenLogin={() => setDialog({ type: "auth", mode: "login" })}
        onOpenRegister={() => setDialog({ type: "auth", mode: "register" })}
        onOpenSearch={() =>
          document.getElementById("game-search")?.scrollIntoView({ behavior: "smooth" })
        }
        onOpenMenu={() => router.push("/profile")}
      />
      <NoticeMarquee text={NOTICE_TEXT} />
      <HeroCarousel />
      <div id="game-search">
        <GameSearchBar />
      </div>
      <CategoryIconNav
        items={NAV_CATEGORIES}
        active={activeCat}
        onSelect={(id) => handleCategorySelect(id as CategoryKey)}
      />

      {activeCat === "home" || activeCat === "sport" ? <SportsSection /> : null}

      {activeCat === "home" ? (
        <div className="mx-3 mt-3 flex gap-2 overflow-x-auto scrollbar-none">
          {LOBBY_TABS.map((tab) => {
            const active = gameSubTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setGameSubTab(tab.key)}
                className={`flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-semibold ${
                  active
                    ? "bg-[var(--brand)] text-white"
                    : "bg-[var(--soft-card-elevated)] text-[var(--text-muted)]"
                }`}
              >
                <span aria-hidden>{tab.emoji}</span>
                {tab.label}
              </button>
            );
          })}
        </div>
      ) : null}

      <SoftSection className="mt-3">
        <SectionHeader
          title={activeCat === "home" ? "เกมฮิตช่วงนี้" : NAV_CATEGORIES.find((item) => item.id === activeCat)?.label ?? "เกม"}
          icon="🔥"
        />
        <ul className="grid grid-cols-3 gap-2 bg-[var(--soft-card)] px-3 pb-4 pt-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {lobbyGames.map((item) =>
            item.source === "lobby" ? (
              <li key={`lobby-${item.game.id}`}>
                <GameCard
                  game={{
                    id: String(item.game.id),
                    title: item.game.title,
                    players: (item.game.players ?? 0).toLocaleString("th-TH"),
                    tag:
                      item.game.badge === "ใหม่"
                        ? "new"
                        : item.game.badge === "ฮิต"
                          ? "hot"
                          : undefined,
                  }}
                />
              </li>
            ) : (
              <li key={`provider-${item.id}`}>
                <GameCard
                  game={{
                    id: item.id,
                    title: item.title,
                    players: "—",
                  }}
                />
              </li>
            ),
          )}
        </ul>
      </SoftSection>

      {activeCat === "home" ? (
        <>
          <SoftSection className="mt-3">
            <SectionHeader title="ออนไลน์มากที่สุด" icon="👥" />
            <ul className="space-y-2 bg-[var(--soft-card)] px-3 py-3">
              {MOST_ONLINE_GAMES.map((game) => (
                <li
                  key={game.id}
                  className="rounded-[var(--radius-soft-md)] bg-[var(--soft-card-elevated)] px-3 py-2 shadow-[var(--shadow-soft-sm)]"
                >
                  <p className="text-sm font-semibold text-[var(--text-on-light)]">
                    {game.motifEmojis[0]} {game.name}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {game.brand} · {game.category} · {game.players} คน · {game.featureHighlight}
                  </p>
                </li>
              ))}
            </ul>
          </SoftSection>

          <SoftSection className="mt-3">
            <SectionHeader title="โปรโมชั่น" icon="🎁" />
            <ul className="grid gap-2 bg-[var(--soft-card)] px-3 py-3 sm:grid-cols-3">
              {PROMOTIONS.map((promo) => (
                <li
                  key={promo.id}
                  className="rounded-[var(--radius-soft-md)] bg-[var(--soft-card-elevated)] p-3 shadow-[var(--shadow-soft-sm)]"
                >
                  <p className="text-xs font-bold text-[var(--brand)]">
                    {promo.emoji} {promo.tag}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--text-on-light)]">{promo.title}</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">{promo.desc}</p>
                </li>
              ))}
            </ul>
          </SoftSection>

          <SoftSection className="mt-3">
            <SectionHeader title="ค่ายเกมของเรา" icon="🎰" />
            <ul className="grid grid-cols-3 gap-2 bg-[var(--soft-card)] px-3 py-3 sm:grid-cols-4 lg:grid-cols-6">
              {PROVIDERS.map((provider) => (
                <li key={provider.id}>
                  <button
                    type="button"
                    onClick={() => handleProviderClick(provider.id)}
                    className="flex w-full flex-col items-center gap-1 rounded-[var(--radius-soft-md)] bg-[var(--soft-card-elevated)] px-2 py-3 text-center shadow-[var(--shadow-soft-sm)]"
                  >
                    <span className="text-xl" aria-hidden>
                      {provider.emoji}
                    </span>
                    <span className="text-[11px] font-semibold text-[var(--text-on-light)]">
                      {provider.shortName}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </SoftSection>

          <SoftSection className="mt-3">
            <SectionHeader title="50 เกมฮิตช่วงนี้" icon="🔥" />
            <ul className="grid grid-cols-3 gap-2 bg-[var(--soft-card)] px-3 pb-4 pt-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {POPULAR_GAMES.map((game) => (
                <li key={game.id}>
                  <GameCard
                    game={{
                      id: game.id,
                      title: game.name,
                      players: game.players,
                      tag: game.tag === "NEW" ? "new" : "hot",
                      emoji: game.emoji,
                      subtitle: game.provider,
                    }}
                  />
                </li>
              ))}
            </ul>
          </SoftSection>

          <SoftSection className="mt-3">
            <SectionHeader title="Hall of Fame" icon="🏆" />
            <ul className="space-y-2 bg-[var(--soft-card)] px-3 py-3">
              {HALL_OF_FAME.map((bet) => (
                <li
                  key={bet.id}
                  className="flex items-center justify-between gap-2 rounded-[var(--radius-soft-md)] bg-[var(--soft-card-elevated)] px-3 py-2"
                >
                  <p className="min-w-0 text-sm text-[var(--text-on-light)]">
                    <span aria-hidden>{bet.avatar}</span> {bet.user}
                    <span className="block truncate text-xs text-[var(--text-muted)]">
                      {bet.game} · {bet.gameCategory} · {bet.timeAgo}
                    </span>
                  </p>
                  <p className="shrink-0 text-right text-sm font-bold text-[var(--brand)]">
                    {bet.coef}
                    <span className="block text-xs font-medium text-[var(--text-muted)]">
                      {bet.payout.toLocaleString("th-TH")} {bet.currency}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </SoftSection>
        </>
      ) : null}

      <FloatingControls
        onOpenTheme={() =>
          setDialog({
            type: "info",
            title: "ปรับแต่งธีม",
            message: "หน้านี้ใช้ธีม Soft Orange อยู่แล้ว",
          })
        }
        onOpenChat={() =>
          setDialog({
            type: "info",
            title: "ติดต่อ",
            message: "เชื่อมต่อฝ่ายบริการลูกค้า 24 ชั่วโมง",
          })
        }
      />
      <BottomNav active="home" />

      {dialog.type === "auth" ? (
        <AuthSheet
          mode={dialog.mode}
          onClose={closeDialog}
          onSwitch={(mode) => setDialog({ type: "auth", mode })}
        />
      ) : null}
      {dialog.type === "info" ? (
        <InfoDialog title={dialog.title} message={dialog.message} onClose={closeDialog} />
      ) : null}
    </div>
  );
}
