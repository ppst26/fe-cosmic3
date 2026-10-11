"use client";

import { Fragment } from "react";
import { useT } from "@/lib/i18n/I18nProvider";
import { AuthGate } from "@/app/components/auth/AuthProvider";
import { HOME_LOBBY_GAME_CAROUSEL_MAX } from "@/lib/uiConstants";
import { lobbyGameToSportCard } from "@/lib/home/lobbyToSportCard";
import { viewAllLink } from "@/lib/gamingRoutes";
import type { LobbyContent } from "@/lib/api/lobby";
import type { SectionIconId } from "@/app/types/lobby";
import { CategoryNavIcon, type CategoryNavIconId } from "@/components/layout/CategoryNavIcons";
import { HomeActivityCarousel } from "./HomeActivityCarousel";
import { HomeCatalogRailSection } from "./HomeCatalogRailSection";
import { HallOfFame } from "./HallOfFame";
import { MostOnlineSection } from "./MostOnlineSection";
import { ProvidersSection } from "./ProvidersSection";
import { HomePageSection } from "./HomePageSection";

/** ไอคอน SVG ต่อ icon id ของ section จาก lobby API (ใช้ชุดเดียวกับ CategoryNavIcon) */
const SECTION_ICON: Record<SectionIconId, CategoryNavIconId> = {
  sparkle: "new",
  flame: "hot",
  cherries: "slot",
  cards: "cards",
  fish: "fish",
  football: "sport",
  network: "arcade",
};

function SectionIcon({ id, size = 16 }: { id: SectionIconId; size?: number }) {
  return (
    <span className="inline-flex text-[var(--brand)]" aria-hidden>
      <CategoryNavIcon id={SECTION_ICON[id]} width={size} height={size} />
    </span>
  );
}

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
              <HomePageSection title={title} icon={<SectionIcon id={section.icon} />} viewAllHref={viewAllHref}>
                <p className="py-4 text-center text-sm text-[var(--text-muted)]">{t("sections.empty")}</p>
              </HomePageSection>
            ) : (
              <HomeCatalogRailSection
                title={title}
                icon={<SectionIcon id={section.icon} />}
                leading={isSports ? <SectionIcon id="football" size={18} /> : undefined}
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
            <p className="rounded-[var(--radius-soft-md)] soft-card-bg px-4 py-6 text-center text-sm text-[var(--text-muted)]">
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
