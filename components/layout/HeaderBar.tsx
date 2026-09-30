type HeaderBarProps = {
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
  onOpenSearch?: () => void;
  onOpenMenu?: () => void;
};

export function HeaderBar({
  onOpenLogin,
  onOpenRegister,
  onOpenSearch,
  onOpenMenu,
}: HeaderBarProps) {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3">
      <div className="flex h-14 items-center gap-2 rounded-[var(--radius-soft-lg)] bg-[var(--header)] px-3 text-[var(--text-on-dark)] shadow-[var(--shadow-soft)] sm:px-4">
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-soft-sm)] bg-[var(--brand)] text-sm font-bold text-white">
            XG
          </span>
          <span className="hidden text-sm font-bold tracking-wide sm:inline">
            XGAMBET
          </span>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
          <button
            type="button"
            onClick={onOpenRegister}
            className="soft-btn-outline h-[42px] shrink-0 px-4 text-sm font-semibold"
          >
            สมัครสมาชิก
          </button>
          <button
            type="button"
            onClick={onOpenLogin}
            className="soft-btn-primary h-[42px] shrink-0 px-5 text-sm font-semibold"
          >
            เข้าสู่ระบบ
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label="ค้นหา"
            onClick={onOpenSearch}
            className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-soft-sm)] bg-white/10 text-white/90"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="เมนู"
            onClick={onOpenMenu}
            className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-soft-sm)] bg-white/10 text-white/90"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
