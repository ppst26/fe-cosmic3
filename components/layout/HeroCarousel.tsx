export function HeroCarousel() {
  return (
    <section className="mx-3 mt-3 overflow-hidden rounded-[var(--radius-soft-xl)] bg-[var(--soft-card-elevated)] shadow-[var(--shadow-soft)]">
      <div className="relative bg-[var(--soft-surface)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #f5871e 0, #f5871e 2px, transparent 2px, transparent 14px)",
          }}
        />
        <div className="relative flex min-h-[168px] flex-col justify-center gap-3 px-4 py-6 sm:min-h-[200px] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="max-w-md space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--brand)] sm:text-xs">
              Solid Sports Platform
            </p>
            <h1 className="text-2xl font-bold leading-tight text-[var(--text-on-light)] sm:text-3xl">
              BET YOUR
              <br />
              CHAMPION TEAM
            </h1>
            <button
              type="button"
              className="soft-btn-outline mt-1 bg-[var(--soft-card-elevated)] px-5 py-2 text-sm font-semibold"
            >
              JOIN NOW
            </button>
          </div>
          <div
            className="hidden h-28 w-48 shrink-0 rounded-[var(--radius-soft-lg)] bg-[var(--brand-soft)] sm:block"
            aria-hidden
          />
        </div>
        <div className="flex justify-center gap-1.5 pb-3">
          <span className="h-1.5 w-4 rounded-full bg-[var(--brand)]" />
          <span className="h-1.5 w-4 rounded-full bg-[var(--soft-surface)]" />
          <span className="h-1.5 w-4 rounded-full bg-[var(--soft-surface)]" />
        </div>
      </div>
    </section>
  );
}
