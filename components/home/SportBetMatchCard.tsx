import type { MockSportBetMatch } from "@/lib/mock/home";

function formatOdd(value: number) {
  return value.toFixed(2);
}

function TeamRow({ role, name, flag }: MockSportBetMatch["home"]) {
  return (
    <div className="flex items-center gap-2 text-sm text-[var(--text-on-light)]">
      <span className="text-lg leading-none" aria-hidden>
        {flag}
      </span>
      <span className="font-semibold text-[var(--text-muted)]">[{role}]</span>
      <span className="min-w-0 truncate font-semibold">{name}</span>
    </div>
  );
}

export function SportBetMatchCard({ match }: { match: MockSportBetMatch }) {
  return (
    <article className="w-[min(100%,292px)] shrink-0 overflow-hidden rounded-lg bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between gap-2 bg-[#2c4563] px-3 py-2.5 text-[11px] font-semibold text-white">
        <p className="min-w-0 truncate">{match.league}</p>
        <p className="flex shrink-0 items-center gap-1 whitespace-nowrap">
          <TimerIcon />
          {match.kickoffLabel}
        </p>
      </div>

      <div className="space-y-2.5 px-3 py-3">
        <TeamRow {...match.home} />
        <TeamRow {...match.away} />

        <div className="grid grid-cols-3 gap-1 rounded-lg bg-[#f4f4f4] p-1 text-center text-xs font-bold">
          <OddCell label="1" value={match.odds.home} />
          <OddCell label="X" value={match.odds.draw} />
          <OddCell label="2" value={match.odds.away} />
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#f4f4f4] py-2 text-xs font-semibold text-[var(--text-muted)]"
        >
          <span aria-hidden>🕒</span>
          เริ่มใน {match.startsInLabel}
        </button>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[var(--brand)] py-2.5 text-sm font-bold text-white"
        >
          <TicketIcon />
          แทงคู่นี้
        </button>
      </div>
    </article>
  );
}

function OddCell({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[6px] bg-[var(--soft-card-elevated)] py-2">
      <p className="text-[10px] font-semibold text-[var(--text-muted)]">{label}</p>
      <p className="mt-0.5 text-sm font-extrabold text-[var(--text-on-light)]">
        {formatOdd(value)}
      </p>
    </div>
  );
}

function TimerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
    </svg>
  );
}

function TicketIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 10V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4c1.1 0 2 .9 2 2s-.9 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-1.46c-1.19.69-2 1.99-2 3.46s.81 2.77 2 3.46V18H4v-2.54c1.19-.69 2-1.99 2-3.46 0-1.48-.8-2.77-1.99-3.46V6h12v2.54z" />
    </svg>
  );
}
