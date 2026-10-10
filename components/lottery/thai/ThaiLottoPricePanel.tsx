"use client";

import { useMemo } from "react";
import type { ThaiLottoBetEntry, ThaiLottoBetType, ThaiLottoBetTypeId } from "@/types/thaiLotto";
import {
  LotteryPriceSlipPanel,
  type LotteryPriceSlipGroup,
} from "@/components/lottery/play/LotteryPriceSlipPanel";

export function ThaiLottoPricePanel({
  entries,
  betTypes,
  selectedEntryId,
  onSelectEntry,
  onAmountChange,
  onRemove,
}: {
  entries: ThaiLottoBetEntry[];
  betTypes: ThaiLottoBetType[];
  selectedEntryId: string | null;
  onSelectEntry: (entryId: string) => void;
  onAmountChange: (entryId: string, amount: number) => void;
  onRemove: (entryId: string) => void;
}) {
  const typeById = useMemo(
    () => new Map<ThaiLottoBetTypeId, ThaiLottoBetType>(betTypes.map((type) => [type.id, type])),
    [betTypes],
  );

  const groups = useMemo((): LotteryPriceSlipGroup[] => {
    const order: ThaiLottoBetTypeId[] = [];
    const map = new Map<ThaiLottoBetTypeId, ThaiLottoBetEntry[]>();
    for (const entry of entries) {
      if (!map.has(entry.typeId)) {
        map.set(entry.typeId, []);
        order.push(entry.typeId);
      }
      map.get(entry.typeId)!.push(entry);
    }
    return order.map((typeId) => {
      const type = typeById.get(typeId);
      return {
        key: typeId,
        label: type?.label ?? typeId,
        entries: map.get(typeId)!.map((entry) => ({
          id: entry.id,
          number: entry.number,
          payoutRate: type?.payoutRate ?? 0,
          amount: entry.amount,
        })),
      };
    });
  }, [entries, typeById]);

  return (
    <LotteryPriceSlipPanel
      groups={groups}
      selectedEntryId={selectedEntryId}
      onSelectEntry={onSelectEntry}
      onAmountChange={onAmountChange}
      onRemove={onRemove}
    />
  );
}
