import Link from "@/lib/i18n/navigation";
import type { GameCategory } from "@/data/providers";
import { listProviders } from "@/data/providers";

type CategoryLobbyProps = {
  category: GameCategory;
  title: string;
};

export function CategoryLobby({ category, title }: CategoryLobbyProps) {
  const providers = listProviders(category);

  return (
    <div className="space-y-3">
      <p className="text-sm text-[var(--text-muted)]">เลือกค่าย{title}</p>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {providers.map((provider) => (
          <li key={provider.id}>
            <Link
              href={`/${category}/${provider.id}`}
              className="soft-card flex h-20 items-center justify-center p-3 text-center text-sm font-semibold text-[var(--text-on-light)]"
            >
              {provider.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
