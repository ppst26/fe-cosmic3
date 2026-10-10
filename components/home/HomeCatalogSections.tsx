"use client";

import { Fragment } from "react";
import { useT } from "@/lib/i18n/I18nProvider";
import { AuthGate } from "@/app/components/auth/AuthProvider";
import { HOME_LOBBY_GAME_CAROUSEL_MAX } from "@/lib/uiConstants";
import { lobbyGameToSportCard } from "@/lib/home/lobbyToSportCard";
import { viewAllLink } from "@/lib/gamingRoutes";
import type { LobbyContent } from "@/lib/api/lobby";
import type { SectionIconId } from "@/app/types/lobby";
import { HomeActivityCarousel } from "./HomeActivityCarousel";
import { HomeCatalogRailSection } from "./HomeCatalogRailSection";
import { HallOfFame } from "./HallOfFame";
import { MostOnlineSection } from "./MostOnlineSection";
import { ProvidersSection } from "./ProvidersSection";
import { HomePageSection } from "./HomePageSection";

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

/** ไอคอน emoji ต่อ icon id ของ section จาก lobby API */
const SECTION_EMOJI: Record<SectionIconId, string> = {
  sparkle: "✨",
  flame: "🔥",
  cherries: "🎰",
  cards: "🎲",
  fish: "🐟",
  football: "⚽",
  network: "🎮",
};

/** เนื้อหาหน้าแรกทั้งหมดมาจาก lobby layer ของ glass (loadLobbyContent) */
export function HomeCatalogSections({ content }: { content: LobbyContent }) {
  const t = useT("home");

  return (
    <>
      {content.games.sections.map((section) => {
        const items = section.games
          .slice(0, section.carouselMax ?? HOME_LOBBY_GAME_CAROUSEL_MAX)
          .map(lobbyGameToSportCard);
        const title = section.titleKey ? t(section.titleKey) : section.title;
        const isSports = section.id === "section-sports";
        const viewAllHref = viewAllLink(section.viewAllHref);

        return (
          <Fragment key={section.id}>
            {items.length === 0 ? (
              <HomePageSection title={title} icon={SECTION_EMOJI[section.icon]} viewAllHref={viewAllHref}>
                <p className="py-4 text-center text-sm text-[var(--text-muted)]">{t("sections.empty")}</p>
              </HomePageSection>
            ) : (
              <HomeCatalogRailSection
                title={title}
                icon={SECTION_EMOJI[section.icon]}
                leading={isSports ? <BasketballIcon /> : undefined}
                viewAllHref={viewAllHref}
                items={items}
              />
            )}
            {isSports ? <MostOnlineSection items={content.mostOnline} /> : null}
          </Fragment>
        );
      })}

      <AuthGate
        fallback={
          <section className="px-3 pt-3 md:px-6">
            <p className="rounded-[var(--radius-soft-md)] bg-[var(--soft-card-elevated)] px-4 py-6 text-center text-sm text-[var(--text-muted)]">
              {t("auth.loginToSeeEvents")}
            </p>
          </section>
        }
      >
        <HomeActivityCarousel items={content.tournaments} />
      </AuthGate>

      <HallOfFame datasets={content.hallOfFame} />
      <ProvidersSection />
    </>
  );
}
