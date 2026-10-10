import type { LotteryFlagTone } from "@/types/lotteryHub";
import { LotteryCountdown, LotteryFlagOrb } from "@/components/lottery/hub/LotteryFlagOrb";
import { formatCountdown } from "@/lib/lottery/format";

type LotteryDrawCardProps = {
  title: string;
  drawLabel: string;
  remainingMs: number | null;
  flagLabel?: string;
  flagTone?: LotteryFlagTone;
};

export function LotteryDrawCard({
  title,
  drawLabel,
  remainingMs,
  flagLabel = "TH",
  flagTone = "th",
}: LotteryDrawCardProps) {
  return (
    <section
      className="thai-lotto-draw lottery-soft-card flex flex-wrap items-center gap-3 p-3 sm:p-4"
      aria-label="ข้อมูลงวด"
    >
      <LotteryFlagOrb label={flagLabel} tone={flagTone} size="lg" />
      <div className="min-w-0 flex-1">
        <h2 className="m-0 text-sm font-bold text-[var(--text-on-light)] sm:text-base">{title}</h2>
        <p className="m-0 text-xs text-[var(--text-muted)]">{drawLabel}</p>
      </div>
      <div className="flex flex-col items-end gap-0.5">
        <span className="text-[10px] text-[var(--text-muted)]">ปิดรับใน</span>
        <LotteryCountdown
          label={remainingMs === null ? "--:--:--" : formatCountdown(remainingMs)}
        />
      </div>
    </section>
  );
}
