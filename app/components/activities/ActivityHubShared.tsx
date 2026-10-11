"use client";

import React from "react";
import { HubTabs } from "@/app/components/promotions/HubTabs";
import { ACTIVITY_HUB_CATEGORY_TABS } from "@/app/data/activitiesHubMockData";
import { formatActivityNumber } from "@/lib/format";
import type {
  ActivityHubCategoryTab,
  ActivityHubCategoryTabItem,
  ActivityHubItem,
  ActivityThumbTone,
  ActivityTierRow,
} from "@/app/types/activities";
import { useT } from "@/lib/i18n/I18nProvider";
import { useFormat } from "@/lib/i18n/useFormat";

const THUMB_BG: Record<ActivityThumbTone, string> = {
  turn: "#f5871e",
  "xl-win": "#8b5cf6",
  "check-in": "#3b82f6",
  football: "#16a34a",
  mascot: "#ec4899",
  cashback: "#d97706",
};

/** รูปย่อกิจกรรม — รูปจริง (ถ้ามี) หรือพื้นสีทึบตาม tone */
export function ActivityHubThumb({
  tone,
  className,
  overlay,
  imageUrl,
}: {
  tone?: ActivityThumbTone;
  className?: string;
  overlay?: string;
  imageUrl?: string;
}) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-[var(--radius-soft-sm)] ${className ?? ""}`}
      style={{ background: THUMB_BG[tone ?? "turn"] }}
      aria-hidden={overlay ? undefined : true}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
      ) : null}
      {overlay ? (
        <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-xs font-semibold text-white">
          {overlay}
        </span>
      ) : null}
    </div>
  );
}

export function ActivityCategoryTabs({
  activeId,
  onSelect,
  tabs = ACTIVITY_HUB_CATEGORY_TABS,
}: {
  activeId: ActivityHubCategoryTab;
  onSelect: (id: ActivityHubCategoryTab) => void;
  tabs?: ActivityHubCategoryTabItem[];
}) {
  const t = useT("rewards");
  return (
    <HubTabs
      tabs={tabs.map((tab) => ({ id: tab.id, label: t(tab.labelKey) }))}
      activeId={activeId}
      onSelect={onSelect}
      ariaLabel={t("activities.categoryTabsAria")}
    />
  );
}

export function ActivityTurnProgressCard({
  progress,
}: {
  progress: NonNullable<ActivityHubItem["progress"]>;
}) {
  const t = useT("rewards");
  const fmt = useFormat();
  const pct =
    progress.bonusCap > 0 ? Math.min(100, (progress.bonusEarned / progress.bonusCap) * 100) : 0;

  return (
    <section className="soft-card space-y-3 p-3">
      <h3 className="text-center text-sm font-semibold">{t("activities.progress.title")}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-xs text-[var(--text-muted)]">{t("activities.progress.current")}</p>
          <p className="text-sm font-semibold">{fmt.credits(progress.currentTurn)}</p>
        </div>
        <div className="sm:text-right">
          <p className="text-xs text-[var(--text-muted)]">{t("activities.progress.rank1Target")}</p>
          <p className="text-sm font-semibold">{fmt.credits(progress.rank1Target)}</p>
        </div>
      </div>
      <div>
        <div className="h-2 overflow-hidden rounded-full soft-card-bg">
          <div className="h-full rounded-full bg-[var(--brand)]" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-1 text-center text-xs text-[var(--text-muted)]">
          {t("activities.progress.rewardCount", {
            earned: formatActivityNumber(progress.bonusEarned),
            cap: formatActivityNumber(progress.bonusCap),
          })}
        </p>
      </div>
    </section>
  );
}

function ActivityClaimCell({ state }: { state: ActivityTierRow["claimState"] }) {
  const t = useT("rewards");
  if (state === "claimable") {
    /** glass ไม่มี mutation ของการรับรางวัล — แสดงสถานะเท่านั้น (ปุ่ม disabled) */
    return (
      <button
        type="button"
        disabled
        className="soft-btn-primary inline-flex min-w-[5.5rem] justify-center px-2 py-1.5 text-xs font-semibold disabled:opacity-60"
      >
        {t("actions.claim")}
      </button>
    );
  }
  if (state === "claimed") {
    return <span className="text-xs font-semibold text-[var(--brand-strong)]">{t("status.claimed")}</span>;
  }
  return <span className="text-xs text-[var(--text-muted)]">{t("activities.tiers.notEligible")}</span>;
}

export function ActivityTierTable({ rows }: { rows: ActivityTierRow[] }) {
  const t = useT("rewards");
  return (
    <div className="soft-card overflow-x-auto p-2">
      <table className="w-full min-w-[420px] border-collapse text-left text-sm">
        <thead>
          <tr className="text-[var(--text-muted)]">
            <th scope="col" className="px-2 py-1 font-semibold">{t("activities.tiers.rank")}</th>
            <th scope="col" className="px-2 py-1 font-semibold">{t("activities.tiers.turn")}</th>
            <th scope="col" className="px-2 py-1 text-center font-semibold">{t("activities.tiers.bonus")}</th>
            <th scope="col" className="px-2 py-1 text-right font-semibold">{t("activities.tiers.claim")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.rank} className="border-t border-white/[0.06]">
              <td className="px-2 py-2 font-semibold tabular-nums">{row.rank}</td>
              <td className="px-2 py-2 tabular-nums">{formatActivityNumber(row.turnRequired)}</td>
              <td className="px-2 py-2 text-center font-semibold tabular-nums text-[var(--brand-strong)]">
                {formatActivityNumber(row.bonus)}
              </td>
              <td className="px-2 py-2 text-right">
                <ActivityClaimCell state={row.claimState} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ActivityInfoDetail({ item }: { item: ActivityHubItem }) {
  const hasSummary = Boolean(item.infoSummary);
  const hasBullets = Boolean(item.infoBullets && item.infoBullets.length > 0);
  if (!hasSummary && !hasBullets) return null;

  return (
    <div className="flex flex-col gap-3 text-sm leading-relaxed text-[var(--text-muted)]">
      {hasSummary ? <p>{item.infoSummary}</p> : null}
      {hasBullets ? (
        <ul className="space-y-2">
          {item.infoBullets!.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="text-[var(--brand)]" aria-hidden="true">•</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function ActivityRulesSection({ rules, period }: { rules?: string[]; period?: string }) {
  const t = useT("rewards");
  if (!rules || rules.length === 0) return null;

  return (
    <section className="soft-panel p-3" aria-label={t("activities.rulesTitle")}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-2">
        <h3 className="text-sm font-semibold">{t("activities.rulesTitle")}</h3>
        {period ? (
          <span className="rounded-full bg-[var(--brand-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--brand-strong)]">
            {period}
          </span>
        ) : null}
      </div>
      <ol className="mt-3 space-y-2 text-xs leading-relaxed">
        {rules.map((rule, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-soft)] text-xs font-semibold tabular-nums text-[var(--brand-strong)]">
              {idx + 1}
            </span>
            <span className="flex-1 pt-0.5">{rule}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ActivityDetailBody({
  item,
  showTitle = true,
}: {
  item: ActivityHubItem;
  showTitle?: boolean;
}) {
  const [category, setCategory] = React.useState<ActivityHubCategoryTab>(
    item.categoryTabs?.[0] ?? "slots",
  );

  const tiers = item.detailKind === "turn-tier" ? item.tiersByCategory?.[category] ?? [] : [];

  return (
    <div className="flex min-h-0 flex-col gap-4">
      <div className="flex flex-col gap-3">
        {showTitle ? <h2 className="text-lg font-semibold leading-snug">{item.title}</h2> : null}
        {item.detailKind === "turn-tier" && item.categoryTabs ? (
          <ActivityCategoryTabs
            activeId={category}
            onSelect={setCategory}
            tabs={ACTIVITY_HUB_CATEGORY_TABS.filter((tab) => item.categoryTabs?.includes(tab.id))}
          />
        ) : null}
      </div>

      {item.detailKind === "turn-tier" && item.progress ? (
        <div key={category} className="animate-fade-in flex flex-col gap-4">
          <ActivityTurnProgressCard progress={item.progress} />
          <ActivityTierTable rows={tiers} />
        </div>
      ) : (
        <ActivityInfoDetail item={item} />
      )}

      <ActivityRulesSection rules={item.rules} period={item.period} />
    </div>
  );
}
