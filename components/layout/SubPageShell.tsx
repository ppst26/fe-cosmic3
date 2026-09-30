import Link from "next/link";
import { HeaderBar } from "./HeaderBar";
import { BottomNav } from "./BottomNav";

type SubPageShellProps = {
  title: string;
  children: React.ReactNode;
  nav?: "promo" | "events" | "home" | "wallet" | "live";
};

export function SubPageShell({ title, children, nav = "home" }: SubPageShellProps) {
  return (
    <div className="min-h-screen bg-[var(--body)] pb-24">
      <HeaderBar />
      <main className="mx-auto w-full max-w-xl px-3 py-3">
        <div className="mb-3 flex items-center gap-2">
          <Link
            href="/"
            className="rounded-full bg-[var(--soft-card-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--text-on-light)] shadow-[var(--shadow-soft-sm)]"
          >
            ← หน้าแรก
          </Link>
          <h1 className="text-base font-bold text-[var(--text-on-light)]">{title}</h1>
        </div>
        {children}
      </main>
      <BottomNav active={nav} />
    </div>
  );
}
