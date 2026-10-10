"use client";

import { useState } from "react";
import Link from "@/lib/i18n/navigation";
import { useLocale } from "@/lib/i18n/navigation";
import { useAuth } from "@/app/components/auth/AuthProvider";
import { useWallet } from "@/app/hooks/api/account";
import { LocaleFlag } from "@/app/components/i18n/LocaleFlag";
import { useLanguagePicker } from "@/app/components/i18n/LanguagePickerProvider";
import { useNotifications } from "@/app/components/notifications/NotificationProvider";
import { NotificationBellButton } from "@/app/components/notifications/NotificationBellButton";
import { NotificationDesktopPopover } from "@/app/components/notifications/NotificationDesktopPopover";
import { useAuthUI } from "@/context/AuthUIContext";
import { useDeposit } from "@/context/DepositContext";
import { useMenuUI } from "@/context/MenuUIContext";
import { formatHeaderWalletBalance, formatMoney } from "@/lib/format";
import { useT } from "@/lib/i18n/I18nProvider";

type HeaderBarProps = {
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
  onOpenSearch?: () => void;
  onOpenMenu?: () => void;
};

const HIDDEN_BALANCE = "••••";

function DesktopBalancePills({
  amount,
  hidden,
  refreshing,
  onToggleHidden,
  onOpenDeposit,
  onRefreshBalance,
}: {
  amount: number;
  hidden: boolean;
  refreshing: boolean;
  onToggleHidden: () => void;
  onOpenDeposit: () => void;
  onRefreshBalance: () => void;
}) {
  const t = useT("nav");
  const tCommon = useT("common");
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 min-w-[190px] items-center justify-between gap-2 rounded-lg bg-[#2b2b2b] px-4">
        <div className="min-w-0" aria-live="polite">
          <p className="text-[11px] leading-none text-white/65">{t("header.walletBalance")}</p>
          <p className="mt-1 text-sm font-bold tabular-nums text-[var(--brand)]">
            {hidden ? HIDDEN_BALANCE : `฿${formatMoney(amount)}`}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={onToggleHidden}
            aria-pressed={hidden}
            aria-label={t("header.walletBalance")}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-transparent text-white/80"
          >
            <EyeIcon off={hidden} />
          </button>
          <button
            type="button"
            onClick={onRefreshBalance}
            disabled={refreshing}
            aria-label={tCommon("retry")}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-transparent text-white/80 disabled:opacity-60"
          >
            <span className={refreshing ? "animate-spin" : undefined}>
              <RefreshIcon />
            </span>
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenDeposit}
        aria-label={t("header.depositAria")}
        className="flex h-11 min-w-[132px] cursor-pointer items-center justify-between gap-2 rounded-lg border-0 bg-[#2b2b2b] px-4 text-left"
      >
        <span className="text-sm font-bold text-white">{t("header.deposit")}</span>
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
  const t = useT("nav");
  const tAuth = useT("auth");
  const { isAuthenticated: isLoggedIn } = useAuth();
  const wallet = useWallet();
  const locale = useLocale();
  const { openLanguagePicker } = useLanguagePicker();
  const { openNotifications } = useNotifications();
  const { openLogin } = useAuthUI();
  const { openDeposit } = useDeposit();
  const { openMobileMenu } = useMenuUI();
  const [balanceHidden, setBalanceHidden] = useState(false);
  const balance = wallet.data?.amount ?? 0;

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
    wallet.refresh();
  }

  function handleMenuClick() {
    if (onOpenMenu) {
      onOpenMenu();
      return;
    }
    openMobileMenu();
  }

  const menuControl = isLoggedIn ? (
    <button
      type="button"
      aria-label={t("header.openMenu")}
      onClick={handleMenuClick}
      className="flex h-10 w-10 cursor-pointer items-center justify-center border-0 bg-transparent text-white/90 md:h-11 md:w-11"
    >
      <MenuIcon />
    </button>
  ) : (
    <button
      type="button"
      aria-label={t("header.openMenu")}
      onClick={handleMenuClick}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-0 bg-black/20 text-white/90 md:h-11 md:w-11 md:bg-transparent"
    >
      <MenuIcon />
    </button>
  );

  const languageControl = (
    <button
      type="button"
      aria-label={t("menu.language")}
      onClick={openLanguagePicker}
      className="flex h-10 w-10 cursor-pointer items-center justify-center border-0 bg-transparent md:h-11 md:w-11"
    >
      <LocaleFlag locale={locale} className="h-6 w-6" />
    </button>
  );

  return (
    <header className="w-full bg-[#050608] text-[var(--text-on-dark)]">
      {/* Mobile */}
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center gap-1.5 px-3 md:hidden">
        <Link href="/" className="flex shrink-0 items-center" aria-label={t("header.home")}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand)] text-[11px] font-bold text-white">
            CMB
          </span>
        </Link>

        {isLoggedIn ? (
          <div className="flex h-9 items-center overflow-hidden rounded-lg bg-[var(--brand)] text-xs font-semibold text-white">
            <button
              type="button"
              onClick={handleOpenDeposit}
              aria-label={t("header.walletDeposit")}
              className="flex h-9 cursor-pointer items-center gap-1 border-0 bg-transparent pl-2.5 pr-1.5 text-xs font-semibold text-white"
            >
              <span aria-hidden>👛</span>
              <span className="tabular-nums">
                {balanceHidden ? HIDDEN_BALANCE : formatHeaderWalletBalance(balance)}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setBalanceHidden((v) => !v)}
              aria-pressed={balanceHidden}
              aria-label={t("header.walletBalance")}
              className="flex h-9 w-7 cursor-pointer items-center justify-center border-0 bg-transparent text-white/90"
            >
              <EyeIcon off={balanceHidden} size={14} />
            </button>
            <button
              type="button"
              onClick={handleRefreshBalance}
              disabled={wallet.isRefreshing}
              aria-label={t("header.walletBalance")}
              className="flex h-9 w-7 cursor-pointer items-center justify-center border-0 bg-transparent pr-1 text-white/90 disabled:opacity-60"
            >
              <span className={wallet.isRefreshing ? "animate-spin" : undefined}>
                <RefreshIcon size={14} />
              </span>
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={onOpenRegister}
              className="h-9 shrink-0 cursor-pointer rounded-lg border-2 border-solid border-[var(--brand)] bg-white px-2 text-[11px] font-semibold text-[var(--brand)]"
            >
              {tAuth("signUp")}
            </button>
            <button
              type="button"
              onClick={onOpenLogin}
              className="h-9 shrink-0 cursor-pointer rounded-lg border-0 bg-[var(--brand)] px-3 text-[11px] font-semibold text-white"
            >
              {tAuth("login")}
            </button>
          </>
        )}

        <div className="flex-1" />

        <div className="flex shrink-0 items-center">
          {languageControl}
          {isLoggedIn ? (
            <NotificationBellButton onClick={openNotifications} />
          ) : null}
          <button
            type="button"
            aria-label={t("header.searchLabel")}
            onClick={onOpenSearch}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-0 bg-black/20 text-white/90"
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
          aria-label={t("header.home")}
        >
          <span className="flex h-9 w-11 items-center justify-center rounded-md bg-gradient-to-b from-[#ff9a3c] to-[#f5871e] text-sm font-extrabold text-white">
            CMB
          </span>
          <span className="mt-1 text-[11px] font-bold tracking-[0.12em] text-white">
            JUPITER
          </span>
        </Link>

        <div className="flex justify-center">
          {isLoggedIn ? (
            <DesktopBalancePills
              amount={balance}
              hidden={balanceHidden}
              refreshing={wallet.isRefreshing}
              onToggleHidden={() => setBalanceHidden((v) => !v)}
              onOpenDeposit={handleOpenDeposit}
              onRefreshBalance={handleRefreshBalance}
            />
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenRegister}
                className="h-11 cursor-pointer rounded-lg border-0 bg-white px-5 text-sm font-semibold text-[var(--brand)]"
              >
                {tAuth("signUp")}
              </button>
              <button
                type="button"
                onClick={onOpenLogin}
                className="h-11 cursor-pointer rounded-lg border-0 bg-[var(--brand)] px-6 text-sm font-semibold text-white"
              >
                {tAuth("login")}
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-1">
          {languageControl}
          {isLoggedIn ? <NotificationDesktopPopover /> : null}
          <button
            type="button"
            aria-label={t("header.searchLabel")}
            onClick={onOpenSearch}
            className="flex h-11 w-11 cursor-pointer items-center justify-center border-0 bg-transparent text-white/90"
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

function RefreshIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.939 7.939 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 9.74A7.939 7.939 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
        fill="currentColor"
      />
    </svg>
  );
}

function EyeIcon({ off, size = 16 }: { off: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
      {off ? <path d="M4 4l16 16" /> : null}
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
