export type CouponResult =
  | { ok: true; kind: "baht"; amount: number; message: string }
  | { ok: true; kind: "gems"; amount: number; message: string }
  | { ok: false; message: string };

/** โค้ดแนะนำใน UI (คูปอง modal / กระเป๋า) */
export const COUPON_QUICK_SAMPLES = ["SPORT100", "WELCOME50", "FREEGEMS"] as const;

const BAHT_COUPONS: Record<string, number> = {
  SPORT100: 100,
  WELCOME50: 50,
  FREE100: 100,
  VIP888: 888,
  LUCKY50: 50,
  BONUS20: 20,
  XGAMBET: 200,
};

export function applyCoupon(code: string): CouponResult {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return { ok: false, message: "กรุณากรอกรหัสคูปอง" };

  const baht = BAHT_COUPONS[normalized];
  if (baht !== undefined) {
    return {
      ok: true,
      kind: "baht",
      amount: baht,
      message: `รับเครดิต ฿${baht.toLocaleString("th-TH")} แล้ว`,
    };
  }

  if (normalized === "FREEGEMS") {
    return { ok: true, kind: "gems", amount: 50, message: "รับ 50 เพชรแล้ว" };
  }

  return { ok: false, message: "รหัสคูปองไม่ถูกต้องหรือหมดอายุ" };
}
