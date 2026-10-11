"use client";

import { useMemo, type ReactNode } from "react";
import Link from "@/lib/i18n/navigation";
import { usePathname } from "@/lib/i18n/navigation";
import { CategoryNavIcon } from "@/components/layout/CategoryNavIcons";
import { resolveLobbyCategoryFromPath } from "@/app/lib/lobbyCategoryFromPath";
import { useT } from "@/lib/i18n/I18nProvider";
import { CATEGORY_SVG_ICON, LOBBY_CATEGORIES } from "@/lib/home/lobbyCategories";

type MobileHomeSidebarLayoutProps = {
  children: ReactNode;
};

/**
 * หน้าแรกมือถือ — คอลัมน์ซ้ายเมนูหมวด + พื้นที่เนื้อหาขวา (layout เท่านั้น)
 */
export function MobileHomeSidebarLayout({ children }: MobileHomeSidebarLayoutProps) {
  const t = useT("home");
  const pathname = usePathname();
  const active = resolveLobbyCategoryFromPath(pathname, LOBBY_CATEGORIES) ?? "home";

  const items = useMemo(
    () =>
      LOBBY_CATEGORIES.map((c) => ({
        id: c.id,
        href: c.href,
        label: t(c.labelKey),
        icon: CATEGORY_SVG_ICON[c.id],
      })),
    [t],
  );

  return (
    <div className="flex w-full md:block">
      <aside
        className="sticky top-0 flex w-[4.25rem] shrink-0 self-start flex-col border-r border-[var(--border-soft)] bg-[var(--soft-canvas)] md:hidden"
        aria-label={t("categoryNav.ariaLabel")}
      >
        <nav className="flex flex-col gap-0.5 p-1.5">
          {items.map((item) => {
            const isActive = item.id === active;
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-1.5 text-center transition-colors ${
                  isActive
                    ? "bg-[var(--brand-soft)] text-[var(--brand)]"
                    : "text-[var(--text-muted)]"
                }`}
              >
                <CategoryNavIcon
                  id={item.icon}
                  className="h-[22px] w-[22px]"
                  aria-hidden
                />
                <span
                  className={`max-w-full truncate text-[9px] leading-tight ${
                    isActive ? "font-bold" : "font-medium"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
