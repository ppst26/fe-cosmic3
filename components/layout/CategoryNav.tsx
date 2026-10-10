"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/app/styles/category-nav.css";

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  href?: string;
}

const CATEGORIES: CategoryItem[] = [
  { id: "home", name: "หน้าหลัก", icon: "/menu-icon/home.avif", href: "/" },
  { id: "slot", name: "สล็อต", icon: "/menu-icon/slot.avif", href: "/slots" },
  { id: "casino", name: "คาสิโน", icon: "/menu-icon/casino.avif", href: "/casino" },
  { id: "sport", name: "กีฬา", icon: "/menu-icon/sport.avif", href: "/sports" },
  { id: "lotto", name: "หวย", icon: "/menu-icon/lotto.avif", href: "/lottery" },
  {
    id: "lotto-bet",
    name: "แทงหวย",
    icon: "/menu-icon/ticket.avif",
    href: "/lottery/thai-government",
  },
  { id: "fish", name: "ยิงปลา", icon: "/menu-icon/fish.avif", href: "/fish" },
  { id: "table", name: "ไพ่", icon: "/menu-icon/card.avif", href: "/card" },
  { id: "arcade", name: "อาร์เคด", icon: "/menu-icon/diamond.avif" },
  { id: "muay", name: "ต่อสู้", icon: "/menu-icon/event.avif" },
  { id: "crash", name: "แคช", icon: "/menu-icon/rank.avif" },
  { id: "others", name: "อื่นๆ", icon: "/menu-icon/ticket.avif" },
];

function resolveActiveFromPath(pathname: string): string | null {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/slots")) return "slot";
  if (pathname.startsWith("/casino")) return "casino";
  if (pathname.startsWith("/sports")) return "sport";
  if (
    pathname.startsWith("/lottery/thai-government") ||
    pathname.startsWith("/lottery/yiki")
  ) {
    return "lotto-bet";
  }
  if (pathname.startsWith("/lottery")) return "lotto";
  if (pathname.startsWith("/fish")) return "fish";
  if (pathname.startsWith("/card")) return "table";
  return null;
}

interface CategoryNavProps {
  activeCat: string;
  onSelectCat: (id: string) => void;
}

function CategoryNavItem({
  cat,
  isActive,
  variant,
  onSelect,
}: {
  cat: CategoryItem;
  isActive: boolean;
  variant: "desktop" | "mobile";
  onSelect: () => void;
}) {
  const itemClass =
    variant === "desktop"
      ? `category-nav-desktop__item ${isActive ? "is-active" : ""}`
      : `category-nav-mobile__item ${isActive ? "is-active" : ""}`;

  const inner = (
    <>
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
    </>
  );

  if (cat.href) {
    return (
      <Link href={cat.href} className={itemClass} aria-current={isActive ? "page" : undefined}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" className={itemClass} onClick={onSelect} aria-pressed={isActive}>
      {inner}
    </button>
  );
}

export function CategoryNav({ activeCat, onSelectCat }: CategoryNavProps) {
  const pathname = usePathname();
  const routeActive = useMemo(() => resolveActiveFromPath(pathname), [pathname]);
  const effectiveActive = routeActive ?? activeCat;

  return (
    <>
      <nav className="category-nav-desktop hidden md:block" aria-label="หมวดหมู่เกม">
        <div className="mx-auto max-w-[1440px] px-1 lg:px-4">
          <div className="category-nav-desktop__track">
            {CATEGORIES.map((cat) => (
              <CategoryNavItem
                key={cat.id}
                cat={cat}
                variant="desktop"
                isActive={effectiveActive === cat.id}
                onSelect={() => onSelectCat(cat.id)}
              />
            ))}
          </div>
        </div>
      </nav>

      <nav className="category-nav-mobile block border-b border-[#e8e8e8] bg-white md:hidden" aria-label="หมวดหมู่เกม">
        <div className="mx-auto max-w-[1440px] px-2">
          <div className="category-nav-mobile__track">
            {CATEGORIES.map((cat) => (
              <CategoryNavItem
                key={cat.id}
                cat={cat}
                variant="mobile"
                isActive={effectiveActive === cat.id}
                onSelect={() => onSelectCat(cat.id)}
              />
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
