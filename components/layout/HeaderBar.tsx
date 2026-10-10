"use client";

import Link from "@/lib/i18n/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAuthUI } from "@/context/AuthUIContext";
import { useDeposit } from "@/context/DepositContext";
import { useMenuUI } from "@/context/MenuUIContext";

type HeaderBarProps = {
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
  onOpenSearch?: () => void;
  onOpenMenu?: () => void;
};

function formatHeaderBalanceCompact(amount: number): string {
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 10_000) {
    return `${Math.round(amount / 1000)}k`;
  }
  return amount.toLocaleString("th-TH", { maximumFractionDigits: 0 });
}

function formatHeaderMoney(amount: number): string {
  return `฿${amount.toLocaleString("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function DesktopBalancePills({
  balance,
  credit,
  onOpenDeposit,
  onRefreshBalance,
}: {
  balance: number;
  credit: number;
  onOpenDeposit: () => void;
  onRefreshBalance: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onRefreshBalance}
        className="flex h-11 min-w-[168px] items-center justify-between gap-2 rounded-lg bg-[#2b2b2b] px-4 border-0 cursor-pointer text-left"
      >
        <div className="min-w-0">
          <p className="text-[11px] leading-none text-white/65">เงิน</p>
          <p className="mt-1 text-sm font-bold tabular-nums text-[var(--brand)]">
            {formatHeaderMoney(balance)}
          </p>
        </div>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80"
          aria-hidden
        >
          <RefreshIcon />
        </span>
      </button>

      <button
        type="button"
        onClick={onOpenDeposit}
        className="flex h-11 min-w-[168px] items-center justify-between gap-2 rounded-lg bg-[#2b2b2b] px-4 border-0 cursor-pointer text-left"
      >
        <div className="min-w-0">
          <p className="text-[11px] leading-none text-white/65">เครดิต</p>
          <p className="mt-1 text-sm font-bold tabular-nums text-white">
            {formatHeaderMoney(credit)}
          </p>
        </div>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand)] text-white"
          aria-hidden
        >
          <WalletPlusIcon />
        </span>
      </button>
    </div>
  );
}

export function HeaderBar({
  onOpenLogin,
  onOpenRegister,
  onOpenSearch,
  onOpenMenu,
}: HeaderBarProps) {
  const { state, user, refreshBalance } = useAuth();
  const { openLogin } = useAuthUI();
  const { openDeposit } = useDeposit();
  const { openMobileMenu } = useMenuUI();
  const isLoggedIn = state.isAuthenticated;
  const creditBalance = user?.balance ?? state.balance;

  function handleOpenDeposit() {
    if (!isLoggedIn) {
      openLogin();
      return;
    }
    openDeposit();
  }

  function handleRefreshBalance() {
    if (!isLoggedIn) {
      openLogin();
      return;
    }
    void refreshBalance();
  }

  function handleMenuClick() {
    if (onOpenMenu) {
      onOpenMenu();
      return;
    }
    if (isLoggedIn) {
      openMobileMenu();
      return;
    }
    onOpenLogin?.();
  }

  const menuControl =
    isLoggedIn && !onOpenMenu ? (
      <button
        type="button"
        aria-label="เมนู"
        onClick={handleMenuClick}
        className="flex h-10 w-10 items-center justify-center text-white/90 md:h-11 md:w-11 border-0 bg-transparent cursor-pointer"
      >
        <MenuIcon />
      </button>
    ) : (
      <button
        type="button"
        aria-label="เมนู"
        onClick={handleMenuClick}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/20 text-white/90 md:h-11 md:w-11 md:bg-transparent"
      >
        <MenuIcon />
      </button>
    );

  return (
    <header className="w-full bg-[#050608] text-[var(--text-on-dark)]">
      {/* Mobile */}
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center gap-1.5 px-3 md:hidden">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="XGAMBET หน้าแรก"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-bold text-white">
            XG
          </span>
        </Link>

        {isLoggedIn ? (
          <button
            type="button"
            onClick={handleOpenDeposit}
            className="flex h-9 items-center gap-1 rounded-lg bg-[var(--brand)] px-2.5 text-xs font-semibold text-white border-0 cursor-pointer"
          >
            <span aria-hidden>👛</span>
            <span className="tabular-nums">
              {formatHeaderBalanceCompact(state.balance)}
            </span>
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={onOpenRegister}
              className="h-9 shrink-0 rounded-lg border-2 border-[var(--brand)] bg-white px-2 text-[11px] font-semibold text-[var(--brand)]"
            >
              สมัครสมาชิก
            </button>
            <button
              type="button"
              onClick={onOpenLogin}
              className="h-9 shrink-0 rounded-lg bg-[var(--brand)] px-3 text-[11px] font-semibold text-white"
            >
              เข้าสู่ระบบ
            </button>
          </>
        )}

        <div className="flex-1" />

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label="ค้นหา"
            onClick={onOpenSearch}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/20 text-white/90"
          >
            <SearchIcon />
          </button>
          {menuControl}
        </div>
      </div>

      {/* Desktop */}
      <div className="mx-auto hidden h-[72px] w-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 md:grid">
        <Link
          href="/"
          className="flex flex-col items-start justify-center leading-none"
          aria-label="XGAMBET หน้าแรก"
        >
          <span className="flex h-9 w-11 items-center justify-center rounded-md bg-gradient-to-b from-[#ff9a3c] to-[#f5871e] text-sm font-extrabold text-white">
            XG
          </span>
          <span className="mt-1 text-[11px] font-bold tracking-[0.12em] text-white">
            XGAMBET
          </span>
        </Link>

        <div className="flex justify-center">
          {isLoggedIn ? (
            <DesktopBalancePills
              balance={state.balance}
              credit={creditBalance}
              onOpenDeposit={handleOpenDeposit}
              onRefreshBalance={handleRefreshBalance}
            />
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenRegister}
                className="h-11 rounded-lg bg-white px-5 text-sm font-semibold text-[var(--brand)]"
              >
                สมัครสมาชิก
              </button>
              <button
                type="button"
                onClick={onOpenLogin}
                className="h-11 rounded-lg bg-[var(--brand)] px-6 text-sm font-semibold text-white"
              >
                เข้าสู่ระบบ
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            aria-label="ค้นหา"
            onClick={onOpenSearch}
            className="flex h-11 w-11 items-center justify-center text-white/90"
          >
            <SearchIcon />
          </button>
          {menuControl}
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.939 7.939 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 9.74A7.939 7.939 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
        fill="currentColor"
      />
    </svg>
  );
}

function WalletPlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h12a3 3 0 0 1 3 3v1h-2V10a1 1 0 0 0-1-1H4V7zm0 4h14a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2zm14 5v-2H4v2h14z"
        fill="currentColor"
      />
      <path d="M18 14h2v2h-2v-2z" fill="currentColor" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
