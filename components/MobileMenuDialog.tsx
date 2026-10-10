"use client";

import React, { useState } from "react";
import Link from "@/lib/i18n/navigation";
import { useRouter } from "@/lib/i18n/navigation";
import { X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AssetIcon } from "@/components/ui/AssetIcon";

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
  emoji?: string;
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
  return (
    <span className="text-xl leading-none transition-transform group-hover:scale-110 sm:text-2xl">
      {item.emoji}
    </span>
  );
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
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const [selectedLang, setSelectedLang] = useState<"TH" | "EN">("TH");

  if (!isOpen) return null;

  const verticalListItems = [
    {
      id: "vip",
      title: "ระดับสมาชิก VIP",
      icon: "/menu-icon/diamond.avif",
      tag: "VIP",
      href: "/vip",
      action: () => {
        onClose();
        router.push("/vip");
      },
    },
    {
      id: "commission",
      title: "รายได้คอมมิชชั่น",
      icon: "/menu-icon/cashback.avif",
      tag: "0.8%",
      href: "/cashback",
      action: () => {
        onClose();
        router.push("/cashback");
      },
    },
    {
      id: "referral",
      title: "แนะนำเพื่อน",
      icon: "/menu-icon/referral.avif",
      tag: "รับ 10%",
      href: "/referral",
      action: () => {
        onClose();
        router.push("/referral");
      },
    },
    {
      id: "coupon",
      title: "คูปอง",
      icon: "/assets/3d/menuicon/coupon.avif",
      tag: "โค้ดฟรี",
      action: () => {
        onClose();
        if (onOpenCoupon) {
          onOpenCoupon();
        } else {
          alert("เปิดหน้ากรอกโค้ดและรับคูปอง");
        }
      },
    },
    {
      id: "bonus",
      title: "โบนัสพิเศษ",
      icon: "/menu-icon/rank.avif",
      tag: "HOT",
      action: () => alert("เปิดหน้ารายการโบนัสพิเศษประจำสัปดาห์"),
    },
    {
      id: "shop",
      title: "ร้านค้าเพชร",
      icon: "/menu-icon/diamond.avif",
      tag: "HOT",
      href: "/shop",
      action: () => {
        onClose();
        router.push("/shop");
      },
    },
  ];

  const gridMenuItems = [
    {
      id: "promo",
      label: "โปรโมชั่น",
      icon: "/menu-icon/promotion.avif",
      href: "/promotions",
      action: () => {
        onClose();
        router.push("/promotions");
      },
    },
    {
      id: "news",
      label: "ข่าวสาร",
      icon: "/assets/3d/menuicon/news.avif",
      action: () => alert("เปิดหน้าข่าวสารและประกาศจากระบบ"),
    },
    {
      id: "activities",
      label: "กิจกรรม",
      icon: "/menu-icon/event.avif",
      href: "/activities",
      action: () => {
        onClose();
        router.push("/activities");
      },
    },
    {
      id: "history",
      label: "ประวัติ",
      icon: "/menu-icon/transactions.avif",
      href: "/transactions",
      action: () => {
        onClose();
        router.push("/transactions");
      },
    },
    {
      id: "notifications",
      label: "แจ้งเตือน",
      icon: "/assets/3d/menuicon/bell.avif",
      action: () => alert("คุณไม่มีการแจ้งเตือนใหม่ในขณะนี้"),
    },
    {
      id: "checkin",
      label: "เช็คอิน",
      icon: "/menu-icon/checkin.avif",
      href: "/check-in",
      action: () => {
        onClose();
        router.push("/check-in");
      },
    },
    {
      id: "guide",
      label: "แนะนำการใช้งาน",
      icon: "/assets/3d/menuicon/doc.avif",
      action: () => alert("เปิดคู่มือการใช้งานและคำถามที่พบบ่อย (FAQ)"),
    },
    {
      id: "wheel",
      label: "วงล้อ",
      icon: "/assets/3d/menuicon/wheel.avif",
      href: "/wheel",
      action: () => {
        onClose();
        router.push("/wheel");
      },
    },
    {
      id: "lang",
      label: "เปลี่ยนภาษา",
      emoji: selectedLang === "TH" ? "🇹🇭" : "🇬🇧",
      action: () => {
        const next = selectedLang === "TH" ? "EN" : "TH";
        setSelectedLang(next);
        alert(`เปลี่ยนภาษาเป็น ${next === "TH" ? "ภาษาไทย" : "English"}`);
      },
    },
  ];

  const rowClass =
    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[var(--soft-card)] transition-colors cursor-pointer group text-left border-0";

  return (
    <div className="fixed inset-0 z-[100] flex justify-end select-none animate-fade-in">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-[101] flex h-full w-full max-w-[340px] flex-col overflow-y-auto border-l border-black/10 bg-[var(--soft-chrome)] p-4 text-[var(--text-on-dark)] shadow-[-12px_0_35px_rgba(0,0,0,0.45)] sm:max-w-[380px] sm:p-5">
        <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-3.5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand)] text-xs font-black text-white">
              XG
            </div>
            <span className="text-xl font-black tracking-wider text-white">
              XGAMBET <span className="text-[var(--brand)]">PRO</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="ปิดเมนู"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border-0 bg-white/10 text-white/90 transition-all hover:bg-white/15 active:scale-95"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        {isLoggedIn ? (
          <div className="mb-3 flex items-center justify-between rounded-lg bg-[var(--soft-card-elevated)] p-3 text-[var(--text-on-light)] shadow-[var(--shadow-soft-sm)]">
            <div
              onClick={() => {
                onClose();
                router.push("/profile");
              }}
              className="flex min-w-0 cursor-pointer items-center gap-2.5 transition-opacity hover:opacity-85"
            >
              <AssetIcon src="/assets/3d/menuicon/profile.avif" alt="" size={32} />
              <div className="flex min-w-0 flex-col text-left">
                <span className="truncate text-xs font-bold leading-tight text-[var(--text-on-light)]">
                  {user?.displayName || "Test User"}
                </span>
                <span className="font-mono text-[10px] font-medium text-[var(--text-muted)]">
                  ฿
                  {(user?.balance ?? 0).toLocaleString("th-TH", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={async () => {
                onClose();
                await logout();
              }}
              className="shrink-0 cursor-pointer rounded-lg border-0 bg-rose-50 px-3 py-1.5 text-[11px] font-bold text-rose-600 hover:bg-rose-100"
            >
              ออกจากระบบ
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
                    className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--soft-card)] text-sm font-bold text-[var(--brand)] transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    ›
                  </span>
                </div>
              </>
            );

            if (item.href) {
              return (
                <Link key={item.id} href={item.href} onClick={onClose} className={`${rowClass} no-underline`}>
                  {inner}
                </Link>
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
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={onClose}
                    className="group flex flex-col items-center justify-center gap-1.5 rounded-lg border-0 p-2 text-center no-underline transition-all hover:bg-[var(--soft-card)]"
                  >
                    {gridInner}
                  </Link>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.action}
                  className="group flex flex-col items-center justify-center gap-1.5 rounded-lg border-0 p-2 text-center transition-all hover:bg-[var(--soft-card)]"
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
            {isLoggedIn ? "เติมเงินด่วน" : "สมัครสมาชิก"}
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
            {isLoggedIn ? "ถอนเงิน" : "เข้าสู่ระบบ"}
          </button>
        </div>
      </div>
    </div>
  );
}
