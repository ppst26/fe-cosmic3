type GameSearchBarProps = {
  placeholder?: string;
  compact?: boolean;
  id?: string;
};

export function GameSearchBar({
  placeholder = "ระบุชื่อเกม",
  compact = false,
  id,
}: GameSearchBarProps) {
  const pad = compact ? "px-2 py-2 md:px-4" : "px-3 py-3 md:px-6 md:py-4";

  return (
    <div className={`mx-auto flex w-full max-w-[1200px] items-center gap-2 ${pad}`}>
      <div className="flex min-w-0 flex-1 overflow-hidden rounded-lg border border-[var(--border-soft)] soft-card-bg shadow-sm">
        <input
          id={id}
          type="search"
          placeholder={placeholder}
          className="h-11 min-w-0 flex-1 soft-card-bg px-4 text-sm text-[var(--text-on-light)] outline-none placeholder:text-[var(--text-muted)] md:h-12"
        />
        <button
          type="button"
          className="shrink-0 bg-[var(--brand)] px-5 text-sm font-semibold text-white md:px-8 md:text-base"
        >
          ค้นหาเกม
        </button>
      </div>
      <button
        type="button"
        className="hidden h-11 shrink-0 items-center gap-1 rounded-lg bg-[var(--soft-chrome)] px-3 text-xs font-medium text-white md:flex md:h-12"
      >
        <span aria-hidden>⚙</span>
        ปรับแต่ง
      </button>
    </div>
  );
}
