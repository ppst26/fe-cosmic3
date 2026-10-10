import Image from "next/image";
import type { MockSportCategory } from "@/lib/mock/home";

const toneClass = {
  red: "text-[#ff6b6b]",
  green: "text-[#2ecc71]",
} as const;

export function SportCategoryCard({
  sport,
  onPress,
}: {
  sport: MockSportCategory;
  onPress?: () => void;
}) {
  const hasStats = sport.players !== undefined && sport.playersTone && sport.activity !== undefined && sport.activityTone;

  return (
    <article className="w-[108px] shrink-0 sm:w-[120px]">
      <button type="button" onClick={onPress} className="group w-full border-0 bg-transparent p-0 text-left cursor-pointer">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
          {sport.imageUrl ? (
            <Image
              src={sport.imageUrl}
              alt=""
              fill
              sizes="120px"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0" style={{ background: sport.gradient }} aria-hidden />
          )}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
            aria-hidden
          />

          <p
            className={`absolute inset-x-0 px-1 text-center text-[11px] font-extrabold leading-tight tracking-wide text-white drop-shadow-md sm:text-xs ${hasStats ? "bottom-9" : "bottom-2"}`}
          >
            {sport.overlayTitle}
          </p>

          {hasStats && sport.playersTone && sport.activityTone ? (
            <div className="absolute inset-x-1 bottom-1 flex items-center justify-between rounded bg-white/90 px-2 py-1 text-[10px] font-semibold backdrop-blur-[2px]">
              <span className={`flex items-center gap-0.5 ${toneClass[sport.playersTone]}`}>
                <UsersIcon />
                {sport.players}
              </span>
              <span className={`flex items-center gap-0.5 ${toneClass[sport.activityTone]}`}>
                <ChartIcon />
                {sport.activity}
              </span>
            </div>
          ) : null}
        </div>
        <p className="mt-1.5 truncate text-center text-[11px] text-[var(--text-muted)]">
          {sport.label}
        </p>
      </button>
    </article>
  );
}

function UsersIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3.5 18.5 9.5 12.5 13.5 16.5 22 6.92 20.59 5.5 13.5 13.5 9.5 9.5 2 17z" />
    </svg>
  );
}
