import type { ThaiLottoDraw } from "@/types/thaiLotto";
import { LotteryDrawCard } from "@/components/lottery/play/LotteryDrawCard";

export function ThaiLottoDrawCard({
  draw,
  remainingMs,
}: {
  draw: ThaiLottoDraw;
  remainingMs: number | null;
}) {
  return (
    <LotteryDrawCard
      title="หวยรัฐบาลไทย"
      drawLabel={draw.drawLabel}
      remainingMs={remainingMs}
      flagLabel="TH"
      flagTone="th"
    />
  );
}
