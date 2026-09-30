import type { ReferralEarningRow } from "@/data/referral";

function atNoon(iso: string): Date {
  return new Date(`${iso}T12:00:00Z`);
}

export function filterReferralRows(
  rows: ReferralEarningRow[],
  range: "all" | "today" | "last_week" | "last_month",
  today: string,
): ReferralEarningRow[] {
  if (range === "all") return rows;
  if (range === "today") return rows.filter((row) => row.at === today);
  if (range === "last_month") {
    const cursor = atNoon(today);
    const month = cursor.getUTCMonth() === 0 ? 12 : cursor.getUTCMonth();
    const year = cursor.getUTCMonth() === 0 ? cursor.getUTCFullYear() - 1 : cursor.getUTCFullYear();
    const prefix = `${year}-${String(month).padStart(2, "0")}`;
    return rows.filter((row) => row.at.startsWith(prefix));
  }
  const cursor = atNoon(today);
  const weekday = cursor.getUTCDay();
  const mondayOffset = weekday === 0 ? 6 : weekday - 1;
  const thisMonday = new Date(cursor);
  thisMonday.setUTCDate(cursor.getUTCDate() - mondayOffset);
  const start = new Date(thisMonday);
  start.setUTCDate(thisMonday.getUTCDate() - 7);
  const end = new Date(thisMonday);
  end.setUTCDate(thisMonday.getUTCDate() - 1);
  const startIso = start.toISOString().slice(0, 10);
  const endIso = end.toISOString().slice(0, 10);
  return rows.filter((row) => row.at >= startIso && row.at <= endIso);
}
