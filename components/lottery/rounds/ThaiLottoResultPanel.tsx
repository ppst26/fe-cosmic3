import type { ThaiLottoResult } from "@/types/lotteryHub";

export function ThaiLottoResultPanel({ result }: { result: ThaiLottoResult }) {
  const subPrizes = [
    { id: "front3", label: "3 ตัวหน้า", values: result.front3 },
    { id: "back3", label: "3 ตัวท้าย", values: result.back3 },
    { id: "bottom2", label: "2 ตัวล่าง", values: [result.bottom2] },
  ];

  return (
    <section
      className="thai-lotto-panel lottery-soft-card flex flex-col gap-3 p-3 sm:gap-4 sm:p-4"
      aria-labelledby="thai-lotto-result-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2
          id="thai-lotto-result-title"
          className="m-0 text-sm font-bold text-[var(--text-on-light)]"
        >
          ผลรางวัลงวดก่อน
        </h2>
        <span className="text-xs text-[var(--text-muted)]">{result.drawLabel}</span>
      </div>

      <div className="thai-lotto-result__first flex flex-col items-center gap-1 rounded-[var(--radius-soft-sm)] bg-[var(--soft-card)] p-3">
        <span className="text-xs text-[var(--text-muted)]">รางวัลที่ 1</span>
        <span className="text-2xl font-bold tracking-widest text-[var(--brand)]">
          {result.firstPrize}
        </span>
      </div>

      <dl className="grid grid-cols-3 gap-2 m-0">
        {subPrizes.map((prize) => (
          <div
            key={prize.id}
            className="flex flex-col items-center gap-1 rounded-[var(--radius-soft-sm)] bg-[var(--soft-card)] px-1 py-3"
          >
            <dt className="text-[10px] text-[var(--text-muted)]">{prize.label}</dt>
            <dd className="m-0 flex flex-wrap justify-center gap-1 text-sm font-semibold text-[var(--text-on-light)]">
              {prize.values.map((value) => (
                <span key={value}>{value}</span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
