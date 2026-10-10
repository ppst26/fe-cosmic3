"use client";

import type {
  ThaiLottoBetType,
  ThaiLottoBetTypeId,
  ThaiLottoDigitGroup,
} from "@/types/thaiLotto";

type ThaiLottoBetTypePickerProps = {
  groups: { id: ThaiLottoDigitGroup; label: string }[];
  betTypes: ThaiLottoBetType[];
  activeGroup: ThaiLottoDigitGroup;
  selectedTypeIds: ThaiLottoBetTypeId[];
  onGroupChange: (group: ThaiLottoDigitGroup) => void;
  onToggleType: (typeId: ThaiLottoBetTypeId) => void;
};

export function ThaiLottoBetTypePicker({
  groups,
  betTypes,
  activeGroup,
  selectedTypeIds,
  onGroupChange,
  onToggleType,
}: ThaiLottoBetTypePickerProps) {
  const groupTypes = betTypes.filter((type) => type.group === activeGroup);

  return (
    <div className="flex flex-col gap-3">
      <div className="lottery-segment-track grid grid-cols-3 gap-1" role="group" aria-label="จำนวนหลัก">
        {groups.map((group) => {
          const isActive = group.id === activeGroup;
          return (
            <button
              key={group.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onGroupChange(group.id)}
              className={`lottery-segment-btn text-xs${isActive ? " is-active" : ""}`}
            >
              {group.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-1.5" role="group" aria-label="ประเภทการแทง">
        {groupTypes.map((type) => {
          const isSelected = selectedTypeIds.includes(type.id);
          return (
            <button
              key={type.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onToggleType(type.id)}
              className={`thai-lotto-type-chip flex min-h-10 flex-col items-start justify-center gap-0.5 px-2 py-1.5 text-left${isSelected ? " is-active" : ""}`}
            >
              <span className="max-w-full truncate text-xs font-semibold">{type.label}</span>
              <span className="text-[10px] text-[var(--text-muted)]">จ่าย {type.payoutRate}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
