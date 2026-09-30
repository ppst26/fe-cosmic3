export function GameSearchBar() {
  return (
    <div className="flex items-center gap-2 px-3 py-3 sm:px-4">
      <div className="soft-card flex min-w-0 flex-1 overflow-hidden p-1">
        <input
          type="search"
          placeholder="ระบุชื่อเกม"
          className="h-11 min-w-0 flex-1 rounded-[var(--radius-soft-sm)] bg-[var(--input)] px-3 text-sm text-[var(--text-on-light)] outline-none placeholder:text-[var(--text-muted)]"
        />
        <button type="button" className="soft-btn-primary ml-1 shrink-0 px-4 text-sm font-semibold">
          ค้นหาเกม
        </button>
      </div>
      <button
        type="button"
        className="hidden h-11 shrink-0 items-center gap-1 rounded-[var(--radius-soft-md)] bg-[var(--header)] px-3 text-xs font-medium text-white shadow-[var(--shadow-soft-sm)] sm:flex"
      >
        <span aria-hidden>⚙</span>
        ปรับแต่ง
      </button>
    </div>
  );
}
