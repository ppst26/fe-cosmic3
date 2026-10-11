import type { ReactNode } from "react";
import Link from "@/lib/i18n/navigation";

type SectionHeaderProps = {
  icon?: ReactNode;
  leading?: ReactNode;
  title: string;
  viewAllHref?: string;
  onViewAll?: () => void;
};

function DefaultSectionIcon() {
  return (
    <span className="inline-flex text-[var(--brand)]" aria-hidden>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 23c-1.1 0-2-.9-2-2 0-.55.22-1.05.59-1.41C9.5 18.5 8 16.5 8 14c0-2.5 1.5-4.5 3-6-.5 2-1 4 1 6 1-3 3-5 3-8 4 2 6 6 6 10 0 3.87-3.13 7-7 7z" />
      </svg>
    </span>
  );
}

export function SectionHeader({
  icon = <DefaultSectionIcon />,
  leading,
  title,
  viewAllHref,
  onViewAll,
}: SectionHeaderProps) {
  const viewAllClass =
    "shrink-0 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:underline border-0 bg-transparent cursor-pointer p-0";

  return (
    <div className="px-3 pt-1.5 md:px-6 md:pt-2">
      <div className="flex items-center justify-between rounded-lg soft-card-bg px-4 py-2.5">
        <h2 className="flex items-center gap-1.5 text-sm font-bold text-[var(--text-primary)]">
          {leading ?? icon}
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
          <span className="shrink-0 text-xs font-semibold text-[var(--text-muted)]">ดูทั้งหมด &gt;</span>
        )}
      </div>
    </div>
  );
}
