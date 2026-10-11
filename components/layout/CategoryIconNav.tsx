"use client";

import Link from "@/lib/i18n/navigation";
import {
  CategoryNavIcon,
  type CategoryNavIconId,
} from "@/components/layout/CategoryNavIcons";

type CategoryItem = {
  id: string;
  label: string;
  icon: CategoryNavIconId;
  href: string;
};

type CategoryIconNavProps = {
  items: readonly CategoryItem[];
  active: string;
  ariaLabel?: string;
  className?: string;
};

/** แถบหมวดไอคอน (หน้าแรก) — แต่ละหมวดเป็นลิงก์ไปหน้าหมวดนั้น */
export function CategoryIconNav({
  items,
  active,
  ariaLabel,
  className = "",
}: CategoryIconNavProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={`w-full border-b border-[var(--border-soft)] soft-card-bg ${className}`.trim()}
    >
      <ul className="mx-auto flex min-w-full max-w-[1200px] snap-x snap-mandatory justify-start gap-0 overflow-x-auto px-1 py-2.5 scrollbar-none sm:px-2 md:justify-center md:gap-1 md:px-6 md:py-3">
        {items.map((cat) => {
          const isActive = cat.id === active;
          return (
            <li key={cat.id} className="shrink-0 snap-start">
              <Link
                href={cat.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-w-[62px] flex-col items-center gap-1 px-2.5 py-1 transition-colors sm:min-w-[68px] ${
                  isActive ? "text-[var(--brand)]" : "text-[var(--text-muted)]"
                }`}
              >
                <CategoryNavIcon
                  id={cat.icon}
                  className={isActive ? "text-[var(--brand)]" : "text-[var(--text-muted)]"}
                  aria-hidden
                />
                <span
                  className={`max-w-[72px] truncate text-center text-[10px] leading-tight sm:text-[11px] ${
                    isActive ? "font-bold" : "font-medium"
                  }`}
                >
                  {cat.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
