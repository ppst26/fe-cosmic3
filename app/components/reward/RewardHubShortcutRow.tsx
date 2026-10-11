"use client";

import React from "react";
import Link, { usePathname } from "@/lib/i18n/navigation";
import { Gift, Layers, Sparkles, type LucideIcon } from "lucide-react";
import { REWARD_FREESPINS_COMING_SOON_LABEL } from "@/app/data/rewardFeaturesMockData";
import type { RewardHubShortcut } from "@/app/types/reward";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n/I18nProvider";

const ICONS: Record<string, LucideIcon> = {
  "lucky-box": Gift,
  "random-card": Layers,
  freespins: Sparkles,
};

/** แถบทางลัด 3 ช่อง — หน้า /reward และหน้าย่อย */
export function RewardHubShortcutRow({ shortcuts }: { shortcuts: RewardHubShortcut[] }) {
  const t = useT("rewards");
  const pathname = usePathname();

  return (
    <nav className="grid grid-cols-3 gap-2 sm:gap-2.5" aria-label={t("hub.shortcutsAria")}>
      {shortcuts.map((item) => {
        const Icon = ICONS[item.iconId] ?? Gift;
        const inactive = item.comingSoon === true;
        const active = !inactive && pathname === item.href;
        const cls = cn(
          "soft-card flex min-h-[88px] flex-col items-center justify-center gap-1 px-1 py-2 text-center transition-colors",
          active && "ring-2 ring-[var(--brand)]",
          inactive ? "cursor-not-allowed opacity-50" : "hover:soft-card-bg",
        );
        const inner = (
          <>
            <Icon className="h-7 w-7 text-[var(--brand)]" aria-hidden />
            <span className="line-clamp-2 text-[11px] font-medium leading-tight text-[var(--text-on-light)]">
              {t(item.labelKey)}
            </span>
            {inactive ? (
              <span className="text-[9px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
                {REWARD_FREESPINS_COMING_SOON_LABEL}
              </span>
            ) : null}
          </>
        );
        return inactive ? (
          <div key={item.id} className={cls} aria-disabled="true" title={REWARD_FREESPINS_COMING_SOON_LABEL}>
            {inner}
          </div>
        ) : (
          <Link key={item.id} href={item.href} className={cls}>
            {inner}
          </Link>
        );
      })}
    </nav>
  );
}
