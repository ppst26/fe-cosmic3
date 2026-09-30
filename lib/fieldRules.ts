export const PHONE_DIGIT_LENGTH = 10;
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 32;
export const PERSON_NAME_MAX_LENGTH = 40;
export const BANK_ACCOUNT_MIN_DIGITS = 10;
export const BANK_ACCOUNT_MAX_DIGITS = 12;
export const MONEY_AMOUNT_MAX_DIGITS = 9;
export const COUPON_CODE_MAX_LENGTH = 20;

export function digitsOnly(raw: string, maxDigits: number): string {
  return raw.replace(/\D/g, "").slice(0, maxDigits);
}

export function phoneError(value: string): string | null {
  if (value.length !== PHONE_DIGIT_LENGTH) return "เบอร์โทรต้องมี 10 หลัก";
  return null;
}

export function passwordError(value: string): string | null {
  if (value.length < PASSWORD_MIN_LENGTH || value.length > PASSWORD_MAX_LENGTH) {
    return "รหัสผ่านต้องยาว 6 ถึง 32 ตัวอักษร";
  }
  return null;
}

export function personNameError(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "กรุณากรอกชื่อ";
  if (trimmed.length > PERSON_NAME_MAX_LENGTH) return "ชื่อยาวเกิน 40 ตัวอักษร";
  return null;
}

export function bankAccountError(value: string): string | null {
  if (value.length < BANK_ACCOUNT_MIN_DIGITS || value.length > BANK_ACCOUNT_MAX_DIGITS) {
    return "เลขบัญชีต้องมี 10 ถึง 12 หลัก";
  }
  return null;
}

export function moneyAmountError(digits: string): string | null {
  if (!digits) return "กรุณากรอกจำนวนเงิน";
  if (digits.length > MONEY_AMOUNT_MAX_DIGITS) return "จำนวนเงินยาวเกินกำหนด";
  const amount = Number(digits);
  if (!Number.isFinite(amount) || amount <= 0) return "จำนวนเงินต้องมากกว่า 0";
  return null;
}
