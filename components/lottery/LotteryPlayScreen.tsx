"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getLotteryCatalogEntry } from "@/data/lotteryCatalog";
import { getLotteryPlayRoundById, getLotteryPlayRounds } from "@/data/lotteryRounds";
import { getMarket, YIKI_HOW_TO } from "@/data/lottery";
import { formatCountdown } from "@/lib/lottery/format";
import { canConfirmSlip, slipTotal } from "@/lib/lottery/slip";
import type { LotterySlipLine } from "@/lib/member/types";
import { useAuth } from "@/context/AuthContext";

const PRICES = [10, 20, 50, 100] as const;

function localToday(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

type LotteryPlayScreenProps = {
  marketId: string;
  roundId: string;
  showYikiHelp: boolean;
};

export function LotteryPlayScreen({
  marketId,
  roundId,
  showYikiHelp,
}: LotteryPlayScreenProps) {
  const { state, dispatch } = useAuth();
  const catalog = getLotteryCatalogEntry(marketId);
  const market = getMarket(marketId);
  const playRound = getLotteryPlayRoundById(marketId, roundId);
  const marketName = catalog?.title ?? market?.name;
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const [betType, setBetType] = useState(market?.betTypes[0] ?? "สามตัวบน");
  const [number, setNumber] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [lines, setLines] = useState<LotterySlipLine[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  if (!marketName || !playRound) {
    return (
      <div className="soft-card space-y-3 p-4 text-center">
        <p className="text-sm text-[var(--text-on-light)]">ไม่พบรอบ</p>
        <Link
          href="/lottery"
          className="soft-btn-outline inline-flex h-10 items-center px-4 text-sm font-semibold"
        >
          กลับหวย
        </Link>
      </div>
    );
  }

  const total = slipTotal(lines);
  const canConfirm = canConfirmSlip(lines.length, total, state.balance);
  const betTypes = market?.betTypes ?? [
    "วิ่งบน",
    "วิ่งล่าง",
    "สองตัวบน",
    "สามตัวบน",
  ];
  const routeBase = market?.routeBase ?? `/lottery/${marketId}`;
  const otherRounds = getLotteryPlayRounds(marketId)
    .filter((round) => round.status === "open" && round.id !== roundId)
    .slice(0, 6);
  const countdownLabel = formatCountdown(
    new Date(playRound.closeAt).getTime() - nowMs,
  );

  function appendDigit(digit: string) {
    if (number.length >= 3) {
      return;
    }
    setNumber((prev) => prev + digit);
  }

  function clearNumber() {
    setNumber("");
  }

  function addLine() {
    if (!number || price === null || !PRICES.includes(price as (typeof PRICES)[number])) {
      return;
    }
    setLines((prev) => [
      ...prev,
      { id: `line-${Date.now()}`, betType, number, price },
    ]);
    setNumber("");
    setPrice(null);
  }

  function updateLinePrice(lineId: string, nextPrice: number) {
    setLines((prev) =>
      prev.map((line) =>
        line.id === lineId ? { ...line, price: nextPrice } : line,
      ),
    );
  }

  function removeLine(lineId: string) {
    setLines((prev) => prev.filter((line) => line.id !== lineId));
  }

  function confirmSlip() {
    if (!canConfirm) {
      return;
    }
    const slip = {
      id: `slip-${Date.now()}`,
      marketId,
      roundId,
      lines,
      total,
      status: "บันทึกแล้ว" as const,
      at: localToday(),
    };
    dispatch({ type: "confirmSlip", slip });
    setLines([]);
    setNumber("");
    setPrice(null);
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div className="soft-card space-y-3 p-4 text-center">
        <p className="text-sm font-semibold text-[var(--text-on-light)]">บันทึกสลิปแล้ว</p>
        <Link
          href="/lottery/slips"
          className="soft-btn-primary inline-flex h-10 items-center px-4 text-sm font-semibold"
        >
          ดูสลิปของฉัน
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <section className="lottery-soft-card space-y-1 p-3">
        <p className="text-sm font-bold text-[var(--text-on-light)]">
          {marketName} · {playRound.drawLabel}
        </p>
        <p className="lottery-countdown text-xs">ปิดรับใน {countdownLabel}</p>
      </section>

      {showYikiHelp ? (
        <section className="soft-card p-3 text-sm text-[var(--text-on-light)]">
          <h2 className="mb-2 font-bold">วิธีเล่นยี่กี</h2>
          <ol className="list-decimal space-y-1 pl-5">
            {YIKI_HOW_TO.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <div className="mt-3 flex flex-wrap gap-2">
            {otherRounds.map((r) => (
                <Link
                  key={r.id}
                  href={`${routeBase}/${r.id}`}
                  className="soft-btn-outline inline-flex h-10 items-center px-3 text-xs font-semibold"
                >
                  {r.drawLabel}
                </Link>
              ))}
          </div>
        </section>
      ) : null}

      <section className="soft-card space-y-3 p-3">
        <p className="text-xs font-semibold text-[var(--text-muted)]">ประเภท</p>
        <div className="flex flex-wrap gap-2">
          {betTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setBetType(type)}
              className={`h-10 rounded-[var(--radius-soft-sm)] px-3 text-xs font-semibold ${
                betType === type
                  ? "soft-btn-primary"
                  : "bg-[var(--soft-card-elevated)] text-[var(--text-on-light)]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <p className="text-xs font-semibold text-[var(--text-muted)]">เลข</p>
        <div className="flex h-10 items-center justify-center rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] text-lg font-bold tracking-widest text-[var(--text-on-light)]">
          {number || "—"}
        </div>
        <div className="grid grid-cols-5 gap-2">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => appendDigit(digit)}
              className="h-10 rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] text-sm font-semibold text-[var(--text-on-light)]"
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            onClick={clearNumber}
            className="col-span-4 h-10 rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] text-sm font-semibold text-[var(--text-on-light)]"
          >
            ล้างเลข
          </button>
        </div>

        <p className="text-xs font-semibold text-[var(--text-muted)]">ราคา</p>
        <div className="flex flex-wrap gap-2">
          {PRICES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPrice(p)}
              className={`h-10 min-w-[3rem] rounded-[var(--radius-soft-sm)] px-3 text-sm font-semibold ${
                price === p
                  ? "soft-btn-primary"
                  : "bg-[var(--soft-card-elevated)] text-[var(--text-on-light)]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={addLine}
          disabled={
            !number ||
            price === null ||
            !PRICES.includes(price as (typeof PRICES)[number])
          }
          className="soft-btn-outline h-10 w-full text-sm font-semibold disabled:opacity-50"
        >
          เพิ่มรายการ
        </button>
      </section>

      <section className="soft-card space-y-3 p-3">
        <div className="flex items-center justify-between text-sm font-semibold text-[var(--text-on-light)]">
          <span>สลิป</span>
          <span>รวม {total} บาท</span>
        </div>

        {lines.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">สลิปยังว่าง</p>
        ) : (
          <ul className="space-y-2">
            {lines.map((line) => (
              <li
                key={line.id}
                className="flex flex-wrap items-center gap-2 rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] p-2 text-sm text-[var(--text-on-light)]"
              >
                <span className="flex-1 font-semibold">
                  {line.betType} {line.number}
                </span>
                <select
                  value={line.price}
                  onChange={(e) => updateLinePrice(line.id, Number(e.target.value))}
                  className="h-10 rounded-[var(--radius-soft-sm)] bg-[var(--soft-card)] px-2 text-sm outline-none"
                >
                  {PRICES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeLine(line.id)}
                  className="h-10 rounded-[var(--radius-soft-sm)] px-3 text-xs font-semibold text-[var(--text-muted)]"
                >
                  ลบ
                </button>
              </li>
            ))}
          </ul>
        )}

        {!canConfirm && lines.length > 0 && total > state.balance ? (
          <p className="text-sm font-semibold text-red-600">ยอดไม่พอ</p>
        ) : null}

        <button
          type="button"
          onClick={confirmSlip}
          disabled={!canConfirm}
          className="soft-btn-primary h-10 w-full text-sm font-semibold disabled:opacity-50"
        >
          ยืนยันโพย
        </button>
      </section>
    </div>
  );
}
