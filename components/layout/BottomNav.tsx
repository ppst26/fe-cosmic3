import Link from "next/link";

const ITEMS = [
  { key: "promo", label: "โปรโมชั่น", icon: "📣", href: "/promotions" },
  { key: "events", label: "กิจกรรม", icon: "▦", href: "/activities" },
  { key: "home", label: "หน้าหลัก", icon: "⌂", href: "/" },
  { key: "wallet", label: "ฝาก/ถอน", icon: "👛", href: "/wallet" },
  { key: "live", label: "บอลสด", icon: "⚽", href: "/?cat=sport" },
] as const;

type BottomNavKey = (typeof ITEMS)[number]["key"];

type BottomNavProps = {
  active?: BottomNavKey;
};

export function BottomNav({ active = "home" }: BottomNavProps) {
  return (
    <nav
      className="fixed inset-x-3 bottom-3 z-50 rounded-[var(--radius-soft-xl)] bg-[var(--soft-card-elevated)] pb-[env(safe-area-inset-bottom)] shadow-[var(--shadow-soft)]"
      aria-label="เมนูหลัก"
    >
      <ul className="grid h-14 grid-cols-5 px-1">
        {ITEMS.map((item) => {
          const isActive = item.key === active;
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                className={`flex h-full w-full flex-col items-center justify-center gap-0.5 rounded-[var(--radius-soft-md)] text-[10px] font-medium ${
                  isActive
                    ? "bg-[var(--brand-soft)] text-[var(--brand)]"
                    : "text-[var(--text-muted)]"
                }`}
              >
                <span className="text-base leading-none" aria-hidden>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
