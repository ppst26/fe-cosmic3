"use client";

import React, { useState, useEffect } from "react";
import Link from "@/lib/i18n/navigation";
import { PROMOTIONS } from "@/data/homeLobby";
import { SIDEBAR_ACTIVITIES as ACTIVITIES } from "@/data/sidebarActivities";

export function JackpotSidebar() {
  const [miniJackpot, setMiniJackpot] = useState(677030.0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMiniJackpot((prev) => prev + Math.floor(Math.random() * 85) + 12);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside className="w-full space-y-3">
      <div className="soft-card p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xl" role="img" aria-label="gold coins">🪙</span>
          <h3 className="text-base font-bold text-[var(--text-on-light)]">แนะนำเกมแตกดี!</h3>
        </div>

        <div className="relative flex items-center gap-3 rounded-[var(--radius-soft-lg)] bg-[var(--soft-card)] p-3 sm:p-3.5">
          <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--brand-soft)] text-3xl">
            🀄
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="truncate text-sm font-bold text-[var(--text-on-light)]">Mahjong Ways 2</h4>
            <p className="font-mono text-[11px] text-[var(--text-muted)]">User: *****974*****</p>
            <div className="mt-1">
              <span className="block text-[10px] font-medium text-[var(--text-muted)]">ยอดแจ็คพ็อต</span>
              <span className="font-mono text-base font-extrabold tracking-tight text-[var(--brand)]">
                {miniJackpot.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg border-0 bg-[var(--brand)] pl-0.5 text-white transition-transform hover:scale-105 active:scale-95"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="soft-card p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <h3 className="text-base font-bold text-[var(--text-on-light)]">กิจกรรมที่น่าสนใจ</h3>
          </div>
          <Link href="/activities" className="text-xs font-semibold text-[var(--brand)] hover:underline">
            ดูทั้งหมด
          </Link>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {ACTIVITIES.map((act) => (
            <div
              key={act.id}
              className="group flex cursor-pointer flex-col items-center justify-center rounded-[var(--radius-soft-md)] bg-[var(--soft-card)] p-2 transition hover:bg-[var(--brand-soft)]"
            >
              <span className="text-2xl transition-transform group-hover:scale-110">{act.emoji}</span>
              <span className="mt-1 w-full truncate text-center text-[10px] font-semibold text-[var(--text-muted)] group-hover:text-[var(--text-on-light)]">
                {act.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="soft-card p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">📢</span>
            <h3 className="text-base font-bold text-[var(--text-on-light)]">โปรโมชั่นที่น่าสนใจ</h3>
          </div>
          <Link href="/promotions" className="text-xs font-semibold text-[var(--brand)] hover:underline">
            ดูทั้งหมด
          </Link>
        </div>

        <div className="space-y-2.5">
          {PROMOTIONS.slice(0, 4).map((promo) => (
            <div
              key={promo.id}
              className="group flex cursor-pointer items-center gap-3 rounded-[var(--radius-soft-lg)] bg-[var(--soft-card)] p-3 transition hover:bg-[var(--brand-soft)]"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--soft-card-elevated)] text-2xl">
                {promo.emoji}
              </div>

              <div className="min-w-0 flex-1 pr-2">
                <span className="mb-0.5 inline-block rounded-lg bg-[var(--brand-soft)] px-2.5 py-0.5 text-[9px] font-bold text-[var(--brand)]">
                  {promo.tag}
                </span>
                <h4 className="truncate text-xs font-bold text-[var(--text-on-light)] group-hover:text-[var(--brand)] sm:text-sm">
                  {promo.title}
                </h4>
                <p className="truncate text-[11px] text-[var(--text-muted)]">{promo.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
