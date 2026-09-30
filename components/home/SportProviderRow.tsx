import { SPORT_PROVIDERS } from "@/lib/mock/home";

export function SportProviderRow() {
  return (
    <div className="overflow-x-auto scrollbar-none bg-[var(--soft-card)] px-3 py-3 sm:px-4">
      <ul className="flex gap-2">
        {SPORT_PROVIDERS.map((p) => (
          <li key={p.name} className="shrink-0">
            <button
              type="button"
              className="flex w-[88px] flex-col items-center gap-1 rounded-[var(--radius-soft-md)] bg-[var(--soft-card-elevated)] p-2 shadow-[var(--shadow-soft-sm)]"
            >
              <span className="flex h-12 w-full items-center justify-center rounded-[var(--radius-soft-sm)] bg-[var(--soft-surface)] text-[10px] font-bold text-[var(--text-on-light)]">
                {p.name.slice(0, 6)}
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">{p.count}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
