"use client";

import { useMemo } from "react";
import { usePathname } from "@/lib/i18n/navigation";
import { useT } from "@/lib/i18n/I18nProvider";
import { CategoryIconNav, HeroCarousel } from "@/components/layout";
import { resolveLobbyCategoryFromPath } from "@/app/lib/lobbyCategoryFromPath";
import { CATEGORY_SVG_ICON, LOBBY_CATEGORIES } from "@/lib/home/lobbyCategories";
import type { PromoItem } from "@/app/types/lobby";

type HomeTopFeedProps = {
  /** แบนเนอร์จาก lobby API (banners.peek, สำรองเป็น promoCarousel) */
  banners: PromoItem[];
};

/**
 * ลำดับตาม Solidx:
 * - Mobile: Header/Marquee (นอก component) → หมวด → Hero
 * - Desktop: Hero → หมวด (พื้นขาว)
 */
export function HomeTopFeed({ banners }: HomeTopFeedProps) {
  const t = useT("home");
  const pathname = usePathname();
  const active = resolveLobbyCategoryFromPath(pathname, LOBBY_CATEGORIES) ?? "home";

  const navItems = useMemo(
    () =>
      LOBBY_CATEGORIES.map((c) => ({
        id: c.id,
        label: t(c.labelKey),
        icon: CATEGORY_SVG_ICON[c.id],
        href: c.href,
      })),
    [t],
  );

  return (
    <div className="flex flex-col">
      <CategoryIconNav
        className="order-1 hidden md:block md:order-2 md:border-t md:border-[var(--border-soft)]"
        items={navItems}
        active={active}
        ariaLabel={t("categoryNav.ariaLabel")}
      />

      <HeroCarousel className="order-2 md:order-1" items={banners} />
    </div>
  );
}
