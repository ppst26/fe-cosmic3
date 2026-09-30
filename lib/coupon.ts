export type CouponResult =
  | { ok: true; kind: "baht"; amount: number; message: string }
  | { ok: true; kind: "gems"; amount: number; message: string }
  | { ok: false; message: string };

export function applyCoupon(code: string): CouponResult {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return { ok: false, message: "กรุณากรอกรหัสคูปอง" };
  if (normalized === "SPORT100") return { ok: true, kind: "baht", amount: 100, message: "รับ 100 บาทแล้ว" };
  if (normalized === "WELCOME50") return { ok: true, kind: "baht", amount: 50, message: "รับ 50 บาทแล้ว" };
  if (normalized === "FREEGEMS") return { ok: true, kind: "gems", amount: 50, message: "รับ 50 เพชรแล้ว" };
  return { ok: false, message: "รหัสคูปองไม่ถูกต้องหรือหมดอายุ" };
}
