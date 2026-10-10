"use client";

import { useMemo } from "react";
import { formatLotteryDigitsDisplay } from "@/lib/lottery/format";
import { LotterySlipToolbar } from "./LotterySlipToolbar";

export type LotteryBetSlipPickEntry = {
  id: string;
  number: string;
  groupKey: string;
};

export type LotteryBetSlipGroupInfo = {
  label: string;
  payoutRate: number;
};

type LotteryBetSlipProps = {
  entries: LotteryBetSlipPickEntry[];
  resolveGroup: (groupKey: string) => LotteryBetSlipGroupInfo | undefined;
  emptyMessage: string;
  titleId?: string;
  onRemove: (entryId: string) => void;
  onClearAll: () => void;
  canUndo?: boolean;
  onUndo?: () => void;
};

export function LotteryBetSlip({
  entries,
  resolveGroup,
  emptyMessage,
  titleId = "lottery-bet-slip-title",
  onRemove,
  onClearAll,
  canUndo = false,
  onUndo,
}: LotteryBetSlipProps) {
  const grouped = useMemo(() => {
    const order: string[] = [];
    const map = new Map<string, LotteryBetSlipPickEntry[]>();
    for (const entry of entries) {
      if (!map.has(entry.groupKey)) {
        map.set(entry.groupKey, []);
        order.push(entry.groupKey);
      }
      map.get(entry.groupKey)!.push(entry);
    }
    return { order, map };
  }, [entries]);

  return (
    <section
      className="lottery-bet-slip lottery-soft-card flex h-full min-h-0 flex-col gap-2 overflow-hidden p-3"
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="m-0 shrink-0 text-sm font-bold text-[var(--text-on-light)]">
        {entries.length} รายการ
      </h2>

      <div className="lottery-bet-slip__scroll flex min-h-0 flex-1 flex-col">
        {entries.length === 0 ? (
          <p className="m-auto px-2 text-center text-xs leading-relaxed text-[var(--text-muted)] sm:text-sm">
            {emptyMessage}
          </p>
        ) : (
          <div className="space-y-2">
            {grouped.order.map((groupKey) => {
              const groupEntries = grouped.map.get(groupKey)!;
              const group = resolveGroup(groupKey);
              const label = group?.label ?? groupKey;
              const payoutRate = group?.payoutRate ?? 0;
              return (
                <section key={groupKey} aria-label={label}>
                  <div className="mb-1 flex items-center justify-between px-1 text-xs font-semibold text-[var(--text-muted)]">
                    <span>{label}</span>
                    <span>{groupEntries.length} รายการ</span>
                  </div>
                  <ul className="m-0 flex list-none flex-col gap-1 p-0">
                    {groupEntries.map((entry) => (
                      <li
                        key={entry.id}
                        className="lottery-bet-slip__row flex items-center gap-1 rounded-[var(--radius-soft-sm)] bg-[var(--soft-card)] py-1 pr-1 pl-2"
                      >
                        <span className="min-w-0 flex-1 font-semibold tabular-nums text-[var(--text-on-light)]">
                          {formatLotteryDigitsDisplay(entry.number)}
                        </span>
                        <span className="shrink-0 text-xs text-[var(--text-muted)]">x{payoutRate}</span>
                        <button
                          type="button"
                          className="grid h-8 w-8 shrink-0 place-items-center text-[var(--text-muted)]"
                          onClick={() => onRemove(entry.id)}
                          aria-label={`ลบ ${label} ${entry.number}`}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        )}
      </div>

      <LotterySlipToolbar
        visible={entries.length > 0}
        canUndo={canUndo}
        onUndo={() => onUndo?.()}
        onClearAll={onClearAll}
      />
    </section>
  );
}
