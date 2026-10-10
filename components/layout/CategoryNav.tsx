"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "@/lib/i18n/navigation";
import { usePathname } from "@/lib/i18n/navigation";
import "@/app/styles/category-nav.css";
import { useT } from "@/lib/i18n/I18nProvider";
import { resolveLobbyCategoryFromPath } from "@/app/lib/lobbyCategoryFromPath";
import { CATEGORY_IMAGE_ICON, LOBBY_CATEGORIES } from "@/lib/home/lobbyCategories";

interface NavEntry {
  id: string;
  name: string;
  icon: string;
  href: string;
}

function CategoryNavItem({
  cat,
  isActive,
  variant,
}: {
  cat: NavEntry;
  isActive: boolean;
  variant: "desktop" | "mobile";
}) {
  const itemClass =
    variant === "desktop"
      ? `category-nav-desktop__item ${isActive ? "is-active" : ""}`
      : `category-nav-mobile__item ${isActive ? "is-active" : ""}`;

  return (
    <Link href={cat.href} className={itemClass} aria-current={isActive ? "page" : undefined}>
      <span className="category-nav-desktop__glow" aria-hidden="true" />
      <span className="category-nav-desktop__indicator" aria-hidden="true" />
      <span className="category-nav-desktop__icon">
        <Image
          src={cat.icon}
          alt=""
          fill
          sizes="32px"
          className={`object-contain transition-opacity ${isActive ? "opacity-100" : "opacity-80"}`}
        />
      </span>
      <span className="category-nav-desktop__label">{cat.name}</span>
    </Link>
  );
}

/** แถบหมวดเกม — รายการหมวดและลิงก์มาจาก CATEGORIES_DATA ของ glass, หมวด active อ่านจาก pathname */
export function CategoryNav() {
  const t = useT("home");
  const pathname = usePathname();
  const routeActive = useMemo(
    () => resolveLobbyCategoryFromPath(pathname, LOBBY_CATEGORIES),
    [pathname],
  );
  const items = useMemo<NavEntry[]>(
    () =>
      LOBBY_CATEGORIES.map((c) => ({
        id: c.id,
        name: t(c.labelKey),
        icon: CATEGORY_IMAGE_ICON[c.id],
        href: c.href,
      })),
    [t],
  );

  const track = (variant: "desktop" | "mobile") =>
    items.map((cat) => (
      <CategoryNavItem key={cat.id} cat={cat} variant={variant} isActive={routeActive === cat.id} />
    ));

  return (
    <>
      <nav className="category-nav-desktop hidden md:block" aria-label={t("categoryNav.ariaLabel")}>
        <div className="mx-auto max-w-[1440px] px-1 lg:px-4">
          <div className="category-nav-desktop__track">{track("desktop")}</div>
        </div>
      </nav>

      <nav
        className="category-nav-mobile block border-b border-[#e8e8e8] bg-white md:hidden"
        aria-label={t("categoryNav.ariaLabel")}
      >
        <div className="mx-auto max-w-[1440px] px-2">
          <div className="category-nav-mobile__track">{track("mobile")}</div>
        </div>
      </nav>
    </>
  );
}
