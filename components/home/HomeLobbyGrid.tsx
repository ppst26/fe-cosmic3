"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { LobbyGame } from "@/data/homeLobby";
import { LOBBY_GAMES } from "@/data/lobbyGames";
import { getGamesForProvider, type InnerGame } from "@/data/providerGames";
import { useAuth } from "@/context/AuthContext";
import { SheetFrame } from "@/components/wallet/SheetFrame";
import { LobbyContextBar } from "@/components/home/LobbyContextBar";
import { ProviderPickerSheet } from "@/components/home/ProviderPickerSheet";
import { resolveLobbyGameHref } from "@/lib/gamingRoutes";

const DRILLABLE: LobbyGame["category"][] = ["slot", "casino", "sport", "fish", "card"];

const CATEGORY_LABEL: Record<LobbyGame["category"], string> = {
  slot: "สล็อต",
  casino: "คาสิโน",
  sport: "กีฬา",
  fish: "ยิงปลา",
  card: "ไพ่",
};

function formatPlayers(value?: number): string {
  return new Intl.NumberFormat("en-US").format(value ?? 0);
}

function ProviderCard({
  game,
  favorited,
  onOpen,
  onToggleFavorite,
}: {
  game: LobbyGame;
  favorited: boolean;
  onOpen: () => void;
  onToggleFavorite: () => void;
}) {
  return (
    <article className="min-w-0">
      <div
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
        className="group relative aspect-[142/188] w-full overflow-hidden rounded-2xl bg-[var(--soft-card)] shadow-[var(--shadow-soft-sm)] transition-transform active:scale-[0.98] cursor-pointer"
      >
        <Image
          src={game.image}
          alt={game.title}
          fill
          sizes="(max-width: 767px) 50vw, 220px"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        {game.badge ? (
          <span
            className={`absolute left-1.5 top-1.5 z-10 rounded-full px-2 py-0.5 text-[9px] font-extrabold text-white shadow-sm ${
              game.badge === "ใหม่" ? "bg-emerald-600" : "bg-rose-600"
            }`}
          >
            {game.badge}
          </span>
        ) : null}
        <button
          type="button"
          aria-label={`เพิ่ม ${game.title} เป็นเกมโปรด`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`absolute right-1.5 top-1.5 z-10 grid h-7 w-7 place-items-center rounded-full bg-black/40 text-sm backdrop-blur-sm border-0 cursor-pointer ${
            favorited ? "text-rose-400" : "text-white/85"
          }`}
        >
          {favorited ? "♥" : "♡"}
        </button>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 pb-2 pt-8 text-left">
          <p className="line-clamp-2 text-[11px] font-bold leading-tight text-white">{game.title}</p>
          <p className="mt-0.5 text-[10px] font-medium text-white/75">👤 {formatPlayers(game.players)}</p>
        </div>
      </div>
    </article>
  );
}

function InnerGameCard({
  game,
  favorited,
  onPlay,
  onToggleFavorite,
}: {
  game: InnerGame;
  favorited: boolean;
  onPlay: () => void;
  onToggleFavorite: () => void;
}) {
  return (
    <article className="min-w-0">
      <div
        role="button"
        tabIndex={0}
        onClick={onPlay}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onPlay();
          }
        }}
        className="group relative aspect-[142/188] w-full overflow-hidden rounded-xl bg-[var(--soft-card)] shadow-[var(--shadow-soft-sm)] cursor-pointer active:scale-[0.98]"
      >
        <Image
          src={game.image}
          alt={game.title}
          fill
          sizes="33vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        {game.badge ? (
          <span
            className={`absolute left-1 top-1 z-10 rounded-full px-1.5 py-0.5 text-[8px] font-bold text-white ${
              game.badge === "ใหม่" ? "bg-emerald-600" : "bg-rose-600"
            }`}
          >
            {game.badge}
          </span>
        ) : null}
        <button
          type="button"
          aria-label="บันทึกเกมโปรด"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`absolute right-1 top-1 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-xs border-0 cursor-pointer ${
            favorited ? "text-rose-500" : "text-[var(--text-muted)]"
          }`}
        >
          {favorited ? "♥" : "♡"}
        </button>
        <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-1.5 pb-1.5 pt-6 text-left text-[10px] font-semibold leading-tight text-white">
          {game.title}
        </p>
      </div>
    </article>
  );
}

export function HomeLobbyGrid({
  games,
  categoryLabel,
}: {
  games: LobbyGame[];
  categoryLabel: string;
}) {
  const router = useRouter();
  const { state, dispatch } = useAuth();
  const [selectedProvider, setSelectedProvider] = useState<LobbyGame | null>(null);
  const [showAllProviders, setShowAllProviders] = useState(false);
  const [showAllInner, setShowAllInner] = useState(false);
  const [launchGame, setLaunchGame] = useState<InnerGame | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    setSelectedProvider(null);
    setShowAllInner(false);
    setPickerOpen(false);
  }, [categoryLabel]);

  const visibleProviders = showAllProviders ? games : games.slice(0, 10);

  const innerGames = useMemo(() => {
    if (!selectedProvider) return [];
    return getGamesForProvider(selectedProvider.title, selectedProvider.category);
  }, [selectedProvider]);

  const visibleInner = showAllInner ? innerGames : innerGames.slice(0, 9);

  const pickerProviders = useMemo(() => {
    if (!selectedProvider) return [];
    return LOBBY_GAMES.filter((g) => g.category === selectedProvider.category);
  }, [selectedProvider]);

  const drillCategoryLabel = selectedProvider
    ? CATEGORY_LABEL[selectedProvider.category]
    : categoryLabel;

  const fullPageHref = selectedProvider ? resolveLobbyGameHref(selectedProvider) : null;

  function openProvider(game: LobbyGame) {
    if (!DRILLABLE.includes(game.category)) return;
    setSelectedProvider(game);
    setShowAllInner(false);
    setPickerOpen(false);
  }

  function exitDrill() {
    setSelectedProvider(null);
    setShowAllInner(false);
    setPickerOpen(false);
  }

  return (
    <div className="space-y-3">
      {selectedProvider ? (
        <LobbyContextBar
          mode="drill"
          providerTitle={selectedProvider.title}
          gameCount={innerGames.length}
          onBackToProviders={exitDrill}
          onOpenPicker={() => setPickerOpen(true)}
          onOpenFullPage={
            fullPageHref
              ? () => {
                  router.push(fullPageHref);
                }
              : undefined
          }
        />
      ) : (
        <LobbyContextBar mode="list" categoryLabel={categoryLabel} providerCount={games.length} />
      )}

      {selectedProvider ? (
        <>
          {visibleInner.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
              {visibleInner.map((game) => {
                const favorited = state.favoriteGameIds.includes(game.id);
                return (
                  <InnerGameCard
                    key={game.id}
                    game={game}
                    favorited={favorited}
                    onPlay={() => setLaunchGame(game)}
                    onToggleFavorite={() => dispatch({ type: "toggleFavorite", gameId: game.id })}
                  />
                );
              })}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-[var(--text-muted)]">ยังไม่มีเกมในค่ายนี้</p>
          )}

          {innerGames.length > 9 ? (
            <button
              type="button"
              onClick={() => setShowAllInner((v) => !v)}
              className="flex h-11 w-full items-center justify-center gap-1 rounded-xl border-0 bg-[var(--soft-card-elevated)] text-sm font-bold text-[var(--brand-strong)] cursor-pointer"
            >
              {showAllInner ? (
                <>
                  แสดงน้อยลง <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  ดูทั้งหมด ({innerGames.length} เกม) <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          ) : null}
        </>
      ) : visibleProviders.length > 0 ? (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {visibleProviders.map((game) => {
            const favorited = state.favoriteGameIds.includes(String(game.id));
            return (
              <ProviderCard
                key={game.id}
                game={game}
                favorited={favorited}
                onOpen={() => openProvider(game)}
                onToggleFavorite={() =>
                  dispatch({ type: "toggleFavorite", gameId: String(game.id) })
                }
              />
            );
          })}
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-[var(--text-muted)]">ยังไม่มีเกมในหมวดนี้</p>
      )}

      {!selectedProvider && games.length > 10 ? (
        <button
          type="button"
          onClick={() => setShowAllProviders((v) => !v)}
          className="h-11 w-full rounded-xl border-0 bg-[var(--soft-card-elevated)] text-sm font-bold text-[var(--brand-strong)] cursor-pointer"
        >
          {showAllProviders ? "แสดงน้อยลง" : "แสดงทั้งหมด"}
        </button>
      ) : null}

      <ProviderPickerSheet
        isOpen={pickerOpen}
        categoryLabel={drillCategoryLabel}
        providers={pickerProviders}
        selectedId={selectedProvider?.id ?? null}
        onSelect={(provider) => {
          setSelectedProvider(provider);
          setShowAllInner(false);
        }}
        onClose={() => setPickerOpen(false)}
      />

      {launchGame ? (
        <SheetFrame title="เข้าเกม" onClose={() => setLaunchGame(null)}>
          <p className="text-sm text-[var(--text-on-light)]">กำลังเข้าเกมจำลอง</p>
          <p className="mt-2 text-base font-bold text-[var(--brand)]">{launchGame.title}</p>
        </SheetFrame>
      ) : null}
    </div>
  );
}
