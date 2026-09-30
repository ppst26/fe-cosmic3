import type { ReactNode } from "react";

type SectionHeaderProps = {
  icon?: string;
  leading?: ReactNode;
  title: string;
};

export function SectionHeader({ icon = "🔥", leading, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between rounded-t-[var(--radius-soft-lg)] bg-[var(--soft-card-elevated)] px-3 py-3 sm:px-4">
      <h2 className="flex items-center gap-1.5 text-sm font-bold text-[var(--text-on-light)]">
        {leading ?? <span aria-hidden>{icon}</span>}
        {title}
      </h2>
      <button
        type="button"
        className="rounded-full bg-[var(--brand-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--brand)]"
      >
        ดูทั้งหมด &gt;
      </button>
    </div>
  );
}
