"use client";

import React from "react";
import Image from "next/image";
import Link from "@/lib/i18n/navigation";
import { useT } from "@/lib/i18n/I18nProvider";
import { toSportHref } from "@/lib/gamingRoutes";
import type { HomeLobbyTournamentItem, PromoItem } from "@/app/types/lobby";

interface JackpotSidebarProps {
  /** กิจกรรม/ทัวร์นาเมนต์จาก lobby API (LobbyContent.tournaments) */
  tournaments: HomeLobbyTournamentItem[];
  /** โปรโมชันจาก lobby API (LobbyContent.banners.promoCarousel) */
  promotions: PromoItem[];
}

/** แถบข้างหมวดเกม — แสดงเฉพาะข้อมูลจาก lobby layer (ไม่มีตัวเลขสุ่ม) */
export function JackpotSidebar({ tournaments, promotions }: JackpotSidebarProps) {
  const t = useT("home");

  return (
    <aside className="w-full space-y-3">
      {tournaments.length > 0 ? (
        <div className="soft-card p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden>
                🎯
              </span>
              <h3 className="text-base font-bold text-[var(--text-on-light)]">{t("events.title")}</h3>
            </div>
            <Link href="/activities" className="text-xs font-semibold text-[var(--brand)] hover:underline">
              ดูทั้งหมด
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {tournaments.slice(0, 4).map((act) => {
              const tile = (
                <>
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-soft-sm)]">
                    <Image
                      src={act.imageSrc}
                      alt=""
                      fill
                      sizes="140px"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <span className="mt-1 w-full truncate text-center text-[10px] font-semibold text-[var(--text-muted)] group-hover:text-[var(--text-on-light)]">
                    {act.title}
                  </span>
                </>
              );
              const tileClass =
                "group flex flex-col items-center justify-center rounded-[var(--radius-soft-md)] bg-[var(--soft-card)] p-1.5 transition hover:bg-[var(--brand-soft)]";
              return act.href ? (
                <Link key={act.id} href={toSportHref(act.href)} className={tileClass}>
                  {tile}
                </Link>
              ) : (
                <div key={act.id} className={tileClass}>
                  {tile}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {promotions.length > 0 ? (
        <div className="soft-card p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden>
                📢
              </span>
              <h3 className="text-base font-bold text-[var(--text-on-light)]">โปรโมชั่นที่น่าสนใจ</h3>
            </div>
            <Link href="/promotions" className="text-xs font-semibold text-[var(--brand)] hover:underline">
              ดูทั้งหมด
            </Link>
          </div>

          <div className="space-y-2.5">
            {promotions.slice(0, 4).map((promo) => (
              <Link
                key={promo.id}
                href={toSportHref(promo.href)}
                className="group flex items-center gap-3 rounded-[var(--radius-soft-lg)] bg-[var(--soft-card)] p-3 transition hover:bg-[var(--brand-soft)]"
              >
                {promo.bannerSrc ? (
                  <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-lg bg-[var(--soft-card-elevated)]">
                    <Image src={promo.bannerSrc} alt="" fill sizes="64px" className="object-cover" />
                  </div>
                ) : null}

                <div className="min-w-0 flex-1 pr-2">
                  <h4 className="truncate text-xs font-bold text-[var(--text-on-light)] group-hover:text-[var(--brand)] sm:text-sm">
                    {promo.title}
                  </h4>
                  <p className="truncate text-[11px] text-[var(--text-muted)]">{promo.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  );
}
