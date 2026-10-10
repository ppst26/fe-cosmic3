import { formatBangkokTimeHHmm } from "@/lib/bangkokTime";

export { formatBangkokTimeHHmm };

export function formatBaht(value: number): string {
  return value.toLocaleString("th-TH", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export function formatLotteryDigitsDisplay(value: string): string {
  return value.replace(/\s/g, "").split("").join(" ");
}

export function formatCountdown(ms: number): string {
  if (ms <= 0) return "ปิดรับแทงแล้ว";
  const totalSec = Math.floor(ms / 1000);
  const days = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const hms = [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
  return days > 0 ? `${days} วัน ${hms}` : hms;
}
