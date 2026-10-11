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
 * เมนูซ้ายมือถือ (ใช้ร่วมหน้าแรกและหน้าหมวดเกม) — คอลัมน์ไอคอนหมวด + พื้นที่เนื้อหาขวา
 * กดแล้วเปลี่ยน path จริงไปหน้าหมวดนั้น (ไม่ใช่เปิด modal) — active อ่านจาก pathname ปัจจุบัน
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
        className="sticky top-0 flex w-[4.75rem] shrink-0 self-start flex-col border-r border-[var(--border-soft)] bg-[var(--soft-canvas)] md:hidden"
        aria-label={t("categoryNav.ariaLabel")}
      >
        <nav className="flex flex-col gap-0.5 p-1.5">
          {items.map((item) => {
            const isActive = item.id === active;
            const itemClass = `flex min-h-[4.25rem] w-full flex-col items-center justify-center gap-1 rounded-lg px-1 py-2.5 text-center transition-colors ${
              isActive ? "bg-[var(--brand-soft)] text-white" : "text-[var(--text-muted)]"
            }`;
            const labelClass = `max-w-full truncate text-[11px] leading-tight ${
              isActive ? "font-bold" : "font-medium"
            }`;

            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={itemClass}
              >
                <CategoryNavIcon id={item.icon} className="h-[28px] w-[28px]" aria-hidden />
                <span className={labelClass}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
