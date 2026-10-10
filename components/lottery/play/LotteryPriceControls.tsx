"use client";

import { formatBaht } from "@/lib/lottery/format";

const QUICK_AMOUNTS = [5, 10, 20, 50, 100];

type LotteryPriceControlsProps = {
  sameForAll: boolean;
  onToggleSameForAll: (checked: boolean) => void;
  onBack: () => void;
  onQuickAmount: (amount: number) => void;
  onSubmit: () => void;
  submitDisabled: boolean;
  isSubmitting?: boolean;
  total: number;
  selectedAmount?: number | null;
};

export function LotteryPriceControls({
  sameForAll,
  onToggleSameForAll,
  onBack,
  onQuickAmount,
  onSubmit,
  submitDisabled,
  isSubmitting = false,
  total,
  selectedAmount = null,
}: LotteryPriceControlsProps) {
  return (
    <div className="flex flex-col gap-3" aria-label="ใส่ราคาและส่งโพย">
      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={sameForAll}
            onChange={(event) => onToggleSameForAll(event.target.checked)}
          />
          ราคาเท่ากันทั้งหมด
        </label>
        <button
          type="button"
          className="text-xs font-semibold text-[var(--brand)]"
          onClick={onBack}
        >
          แก้ไขเลข
        </button>
        <span className="ml-auto rounded-full bg-[var(--brand-soft)] px-3 py-1 text-xs font-bold text-[var(--brand)]">
          รวม {formatBaht(total)}
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2" role="group" aria-label="เลือกราคา">
        {QUICK_AMOUNTS.map((amount) => (
          <button
            key={amount}
            type="button"
            aria-pressed={selectedAmount === amount}
            onClick={() => onQuickAmount(amount)}
            className={`lottery-price-chip min-h-10 text-sm font-semibold${selectedAmount === amount ? " is-active" : ""}`}
          >
            {amount}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button type="button" className="soft-btn-outline min-h-11 text-sm font-semibold" onClick={onBack}>
          กลับแก้ไขเลข
        </button>
        <button
          type="button"
          className="soft-btn-primary min-h-11 text-sm font-semibold disabled:opacity-50"
          onClick={onSubmit}
          disabled={submitDisabled || isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "กำลังส่ง…" : "ยืนยันโพย"}
        </button>
      </div>
    </div>
  );
}
