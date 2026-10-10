export const BANGKOK_OFFSET_MS = 7 * 60 * 60 * 1000;

export function getBangkokWallParts(date: Date) {
  const shifted = new Date(date.getTime() + BANGKOK_OFFSET_MS);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
    hour: shifted.getUTCHours(),
    minute: shifted.getUTCMinutes(),
  };
}

export function dateFromBangkokWall(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
): Date {
  return new Date(Date.UTC(year, month - 1, day, hour - 7, minute, 0, 0));
}

export function formatBangkokTimeHHmm(isoOrDate: string | Date): string {
  const ms =
    typeof isoOrDate === "string" ? Date.parse(isoOrDate) : isoOrDate.getTime();
  if (Number.isNaN(ms)) return "--:--";
  const { hour, minute } = getBangkokWallParts(new Date(ms));
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}
