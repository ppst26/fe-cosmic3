/** บัญชีเดโมฝังในโค้ด — ล็อกอินผ่าน /api/auth/login */
export const DEMO_LOGIN_PHONE = "0999999999";
export const DEMO_LOGIN_PASSWORD = "112233";

export function normalizeLoginPhone(input: string): string {
  return input.replace(/\D/g, "");
}

export function isDemoLogin(username: string, password: string): boolean {
  const phone = normalizeLoginPhone(username);
  return phone === DEMO_LOGIN_PHONE && password === DEMO_LOGIN_PASSWORD;
}
