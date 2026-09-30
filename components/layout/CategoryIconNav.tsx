"use client";

type CategoryItem = {
  id: string;
  label: string;
  emoji: string;
};

type CategoryIconNavProps = {
  items: readonly CategoryItem[];
  active: string;
  onSelect: (id: string) => void;
};

export function CategoryIconNav({ items, active, onSelect }: CategoryIconNavProps) {
  return (
    <nav className="soft-panel mx-3">
      <ul className="flex snap-x gap-1 overflow-x-auto px-2 py-2 scrollbar-none sm:px-3">
        {items.map((cat) => {
          const isActive = cat.id === active;
          return (
            <li key={cat.id} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={() => onSelect(cat.id)}
                className={`flex min-w-[56px] flex-col items-center gap-0.5 rounded-[var(--radius-soft-sm)] px-2 pb-1.5 pt-1.5 transition-colors ${
                  isActive
                    ? "bg-[var(--soft-card-elevated)] text-[var(--brand)] shadow-[var(--shadow-soft-sm)]"
                    : "text-[var(--tab-inactive)]"
                }`}
              >
                <span className="text-lg leading-none" aria-hidden>
                  {cat.emoji}
                </span>
                <span className="text-[10px] font-medium leading-tight sm:text-[11px]">
                  {cat.label}
                </span>
                <span
                  className={`mt-0.5 h-1 w-full max-w-[36px] rounded-full ${
                    isActive ? "bg-[var(--brand)]" : "opacity-0"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
