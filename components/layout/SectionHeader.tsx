import type { ReactNode } from "react";
import Link from "@/lib/i18n/navigation";

type SectionHeaderProps = {
  icon?: string;
  leading?: ReactNode;
  title: string;
  viewAllHref?: string;
  onViewAll?: () => void;
};

export function SectionHeader({
  icon = "🔥",
  leading,
  title,
  viewAllHref,
  onViewAll,
}: SectionHeaderProps) {
  const viewAllClass =
    "shrink-0 text-xs font-semibold text-[var(--brand)] hover:underline border-0 bg-transparent cursor-pointer p-0";

  return (
    <div className="px-3 pt-3 md:px-6 md:pt-4">
      <div className="flex items-center justify-between rounded-lg soft-card-bg px-4 py-2.5">
        <h2 className="flex items-center gap-1.5 text-sm font-bold text-[var(--text-primary)]">
          {leading ?? <span aria-hidden>{icon}</span>}
          {title}
        </h2>
        {viewAllHref ? (
          <Link href={viewAllHref} className={viewAllClass}>
            ดูทั้งหมด &gt;
          </Link>
        ) : onViewAll ? (
          <button type="button" onClick={onViewAll} className={viewAllClass}>
            ดูทั้งหมด &gt;
          </button>
        ) : (
          <span className="shrink-0 text-xs font-semibold text-[var(--brand)]">ดูทั้งหมด &gt;</span>
        )}
      </div>
    </div>
  );
}
