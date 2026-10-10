"use client";

export function LotterySlipToolbar({
  visible,
  canUndo,
  onUndo,
  onClearAll,
}: {
  visible: boolean;
  canUndo: boolean;
  onUndo: () => void;
  onClearAll: () => void;
}) {
  if (!visible) return null;

  return (
    <div
      className="lottery-slip-toolbar grid grid-cols-2 gap-2"
      role="toolbar"
      aria-label="เครื่องมือโพย"
    >
      <button
        type="button"
        className="soft-btn-outline min-h-10 text-xs font-semibold disabled:opacity-40"
        onClick={onUndo}
        disabled={!canUndo}
      >
        ย้อนกลับ
      </button>
      <button
        type="button"
        className="soft-btn-outline min-h-10 text-xs font-semibold"
        onClick={onClearAll}
      >
        ล้างทั้งหมด
      </button>
    </div>
  );
}
