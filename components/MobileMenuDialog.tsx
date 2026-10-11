"use client";

import React from "react";
import Link from "@/lib/i18n/navigation";
import { useLocale, useRouter } from "@/lib/i18n/navigation";
import { X } from "lucide-react";
import { useAuth } from "@/app/components/auth/AuthProvider";
import { useProfile, useWallet } from "@/app/hooks/api/account";
import { useProfileHubStats } from "@/app/hooks/api/member";
import { SportHubLink } from "@/app/components/hub/SportHubLink";
import { useLogoutConfirm } from "@/app/hooks/useLogoutConfirm";
import { LocaleFlag } from "@/app/components/i18n/LocaleFlag";
import { useLanguagePicker } from "@/app/components/i18n/LanguagePickerProvider";
import { useNotifications } from "@/app/components/notifications/NotificationProvider";
import { AssetIcon } from "@/components/ui/AssetIcon";
import { formatMoney } from "@/lib/format";
import { useT } from "@/lib/i18n/I18nProvider";
import { BrandLogo } from "@/components/brand/BrandLogo";

export interface MobileMenuDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
  onOpenDeposit?: () => void;
  onOpenWithdraw?: () => void;
  onOpenCoupon?: () => void;
}

type MenuIconItem = {
  id: string;
  icon?: string;
  locale?: ReturnType<typeof useLocale>;
};

function MenuListIcon({ item, size = 28 }: { item: MenuIconItem; size?: number }) {
  if (item.icon) {
    return (
      <AssetIcon
        src={item.icon}
        alt=""
        size={size}
        className="transition-transform group-hover:scale-110"
      />
    );
  }
  if (item.locale) {
    return (
      <LocaleFlag
        locale={item.locale}
        className="h-7 w-7 transition-transform group-hover:scale-110"
      />
    );
  }
  return null;
}

export function MobileMenuDialog({
  isOpen,
  onClose,
  onOpenLogin,
  onOpenRegister,
  onOpenDeposit,
  onOpenWithdraw,
  onOpenCoupon,
}: MobileMenuDialogProps) {
  const t = useT("nav");
  const tAuth = useT("auth");
  const tCommon = useT("common");
  const router = useRouter();
  const locale = useLocale();
  const { isAuthenticated: isLoggedIn, user } = useAuth();
  const profile = useProfile();
  const wallet = useWallet();
  const hubStats = useProfileHubStats();
  const { openLanguagePicker } = useLanguagePicker();
  const { openNotifications } = useNotifications();
  const { openLogoutConfirm, LogoutConfirmDialog } = useLogoutConfirm(onClose);

  if (!isOpen) return null;

  const displayName =
    profile.data?.displayName ?? (user ? `${user.firstName} ${user.lastName}`.trim() : "");
  const vipLabel = hubStats.data?.vipLabel;
  const diamonds = hubStats.data?.diamonds;

  const goTo = (href: string) => () => {
    onClose();
    router.push(href);
  };

  const verticalListItems = [
    {
      id: "vip",
      title: t("menu.vipRank"),
      icon: "/menu-icon/diamond.avif",
      tag: vipLabel,
      href: "/vip",
    },
    {
      id: "commission",
      title: t("menu.referralEarnings"),
      icon: "/menu-icon/cashback.avif",
      href: "/cashback",
    },
    {
      id: "referral",
      title: t("menu.referFriend"),
      icon: "/menu-icon/referral.avif",
      href: "/referral",
    },
    {
      id: "coupon",
      title: t("menu.coupon"),
      icon: "/assets/3d/menuicon/coupon.avif",
      action: () => {
        onClose();
        onOpenCoupon?.();
      },
    },
    {
      id: "reward",
      title: t("menu.rewardHub"),
      icon: "/assets/3d/menuicon/ticket.avif",
      href: "/reward",
    },
    {
      id: "shop",
      title: t("menu.gemsShop"),
      icon: "/menu-icon/diamond.avif",
      href: "/shop",
    },
  ];

  const gridMenuItems = [
    {
      id: "promo",
      label: t("menu.promotions"),
      icon: "/menu-icon/promotion.avif",
      href: "/promotions",
    },
    {
      id: "activities",
      label: t("menu.activities"),
      icon: "/menu-icon/event.avif",
      href: "/activities",
    },
    {
      id: "history",
      label: t("menu.history"),
      icon: "/menu-icon/transactions.avif",
      href: "/transactions",
    },
    {
      id: "notifications",
      label: tCommon("notifications.title"),
      icon: "/assets/3d/menuicon/bell.avif",
      action: () => {
        onClose();
        openNotifications();
      },
    },
    {
      id: "checkin",
      label: t("menu.checkIn"),
      icon: "/menu-icon/checkin.avif",
      href: "/check-in",
    },
    {
      id: "wheel",
      label: t("menu.wheel"),
      icon: "/assets/3d/menuicon/wheel.avif",
      href: "/wheel",
    },
    {
      id: "profile",
      label: t("menu.profile"),
      icon: "/assets/3d/menuicon/profile.avif",
      href: "/profile/account",
    },
    {
      id: "lang",
      label: t("menu.language"),
      locale,
      action: () => {
        onClose();
        openLanguagePicker();
      },
    },
  ];

  const rowClass =
    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:soft-panel-bg transition-colors cursor-pointer group text-left border-0";

  return (
    <div className="fixed inset-0 z-[100] flex justify-end select-none animate-fade-in">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-[101] flex h-full w-full max-w-[340px] flex-col overflow-y-auto border-l border-white/10 app-bg p-4 text-[var(--text-on-dark)] shadow-[-12px_0_35px_rgba(0,0,0,0.45)] sm:max-w-[380px] sm:p-5">
        <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-3.5">
          <BrandLogo size="md" />

          <button
            type="button"
            onClick={onClose}
            aria-label={t("drawer.close")}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border-0 bg-white/10 text-white/90 transition-all hover:bg-white/15 active:scale-95"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        {isLoggedIn ? (
          <div className="mb-3 flex items-center justify-between rounded-lg soft-card-bg p-3 text-[var(--text-on-light)] shadow-[var(--shadow-soft-sm)]">
            <div
              onClick={() => {
                onClose();
                router.push("/profile/account");
              }}
              className="flex min-w-0 cursor-pointer items-center gap-2.5 transition-opacity hover:opacity-85"
            >
              <AssetIcon src="/assets/3d/menuicon/profile.avif" alt="" size={32} />
              <div className="flex min-w-0 flex-col text-left">
                <span className="truncate text-xs font-bold leading-tight text-[var(--text-on-light)]">
                  {displayName}
                </span>
                <span className="font-mono text-[10px] font-medium text-[var(--text-muted)]">
                  ฿{formatMoney(wallet.data?.amount ?? 0)}
                  {diamonds !== undefined ? ` · ${t("drawer.gems")} ${diamonds}` : ""}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={openLogoutConfirm}
              className="shrink-0 cursor-pointer rounded-lg border-0 btn-danger-soft px-3 py-1.5 text-[11px] font-bold"
            >
              {tAuth("logout")}
            </button>
          </div>
        ) : null}

        <div className="soft-card mb-3.5 space-y-0.5 p-1.5 sm:p-2">
          {verticalListItems.map((item) => {
            const inner = (
              <>
                <div className="flex min-w-0 items-center gap-3">
                  <MenuListIcon item={item} />
                  <span className="truncate text-xs font-bold text-[var(--text-on-light)] sm:text-[13.5px]">
                    {item.title}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {item.tag ? (
                    <span className="rounded-md bg-[var(--brand-soft)] px-2 py-0.5 text-[10px] font-extrabold text-[var(--brand-strong)]">
                      {item.tag}
                    </span>
                  ) : null}
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-md soft-panel-bg text-sm font-bold text-[var(--brand)] transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    ›
                  </span>
                </div>
              </>
            );

            if (item.href) {
              return (
                <SportHubLink key={item.id} href={item.href} onClick={onClose} className={`${rowClass} no-underline`}>
                  {inner}
                </SportHubLink>
              );
            }

            return (
              <button key={item.id} type="button" onClick={item.action} className={rowClass}>
                {inner}
              </button>
            );
          })}
        </div>

        <div className="soft-card mb-4 p-3 sm:p-3.5">
          <div className="grid grid-cols-3 gap-x-1.5 gap-y-3.5">
            {gridMenuItems.map((item) => {
              const gridInner = (
                <>
                  <MenuListIcon item={item} size={36} />
                  <span className="line-clamp-2 text-center text-[11px] font-bold leading-tight text-[var(--text-on-light)] transition-colors group-hover:text-[var(--brand)] sm:text-[11.5px]">
                    {item.label}
                  </span>
                </>
              );

              if (item.href) {
                return (
                  <SportHubLink
                    key={item.id}
                    href={item.href}
                    onClick={onClose}
                    className="group flex flex-col items-center justify-center gap-1.5 rounded-lg border-0 p-2 text-center no-underline transition-all hover:soft-panel-bg"
                  >
                    {gridInner}
                  </SportHubLink>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.action}
                  className="group flex flex-col items-center justify-center gap-1.5 rounded-lg border-0 bg-transparent p-2 text-center transition-all hover:soft-panel-bg"
                >
                  {gridInner}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => {
              onClose();
              if (isLoggedIn) {
                onOpenDeposit?.();
              } else {
                onOpenRegister?.();
              }
            }}
            className="soft-btn-primary flex h-12 w-full cursor-pointer items-center justify-center whitespace-nowrap px-2 text-sm font-extrabold active:scale-[0.98] sm:text-[15px]"
          >
            {isLoggedIn ? t("drawer.deposit") : tAuth("signUp")}
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              if (isLoggedIn) {
                onOpenWithdraw?.();
              } else {
                onOpenLogin?.();
              }
            }}
            className="soft-btn-outline flex h-12 w-full cursor-pointer items-center justify-center whitespace-nowrap px-2 text-sm font-extrabold active:scale-[0.98] sm:text-[15px]"
          >
            {isLoggedIn ? t("drawer.withdraw") : tAuth("login")}
          </button>
        </div>
      </div>

      <LogoutConfirmDialog />
    </div>
  );
}
