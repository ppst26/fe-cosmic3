"use client";

import {
  CategoryIconNav,
  GameSearchBar,
  HeroCarousel,
} from "@/components/layout";
import type { CategoryNavIconId } from "@/components/layout/CategoryNavIcons";
import type { CategoryKey } from "@/data/homeLobby";

type NavItem = {
  id: CategoryKey;
  label: string;
  icon: CategoryNavIconId;
};

type HomeTopFeedProps = {
  navItems: readonly NavItem[];
  activeCat: CategoryKey;
  onSelectCategory: (id: CategoryKey) => void;
};

/**
 * ลำดับตาม Solidx:
 * - Mobile: Header/Marquee (นอก component) → หมวด → Hero → ค้นหา
 * - Desktop: Hero → ค้นหา (ทับขอบล่าง hero) → หมวด (พื้นขาว)
 */
export function HomeTopFeed({
  navItems,
  activeCat,
  onSelectCategory,
}: HomeTopFeedProps) {
  return (
    <div className="flex flex-col">
      <CategoryIconNav
        className="order-1 md:order-3 md:border-t md:border-[#ececec]"
        items={navItems}
        active={activeCat}
        onSelect={(id) => onSelectCategory(id as CategoryKey)}
      />

      <HeroCarousel className="order-2 md:order-1" />

      <div
        id="game-search"
        className="order-3 bg-white md:order-2 md:relative md:z-10 md:-mt-7 md:pb-0 md:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
      >
        <GameSearchBar />
      </div>
    </div>
  );
}
