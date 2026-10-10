import type { ValueRole } from "@/lib/semanticValue";
import { cn } from "@/lib/utils";

/**
 * สีตัวเลขตามบทบาท (ValueRole จาก lib/semanticValue) — ใช้ token ของ sport (Orange Light Solid)
 * แทน class `cosmic-value--*` ของ glass ที่ sport ไม่มี
 */
const TONE_CLASS: Record<ValueRole, string> = {
  emphasis: "text-[var(--text-on-light)] font-semibold",
  neutral: "text-[var(--text-on-light)]",
  muted: "text-[var(--text-muted)]",
  success: "text-emerald-600",
  danger: "text-red-600",
  warning: "text-amber-600",
  reward: "text-[var(--brand-strong)] font-semibold",
  accent: "text-[var(--brand)] font-semibold",
};

export function toneClass(role: ValueRole, extra?: string): string {
  return cn("tabular-nums", TONE_CLASS[role], extra);
}
