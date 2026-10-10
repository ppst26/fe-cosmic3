"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { THAI_LOTTO_BET_TYPES, THAI_LOTTO_GROUPS } from "@/data/thaiLotto";
import { getThaiLottoDrawByRoundId } from "@/data/lotteryRounds";
import { canConfirmSlip, slipTotal } from "@/lib/lottery/slip";
import type { LotterySlipLine } from "@/lib/member/types";
import type { ThaiLottoBetEntry, ThaiLottoBetTypeId } from "@/types/thaiLotto";
import { useAuth } from "@/context/AuthContext";
import { ThaiLottoBetBoard } from "@/components/lottery/thai/ThaiLottoBetBoard";

function localToday(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const typeLabelById = new Map(
  THAI_LOTTO_BET_TYPES.map((type) => [type.id, type.label] as const),
);

function entriesToLines(entries: ThaiLottoBetEntry[]): LotterySlipLine[] {
  return entries.map((entry) => ({
    id: entry.id,
    betType: typeLabelById.get(entry.typeId as ThaiLottoBetTypeId) ?? entry.typeId,
    number: entry.number,
    price: entry.amount,
  }));
}

type ThaiGovernmentPlayScreenProps = {
  roundId: string;
};

export function ThaiGovernmentPlayScreen({ roundId }: ThaiGovernmentPlayScreenProps) {
  const { state, dispatch } = useAuth();
  const draw = useMemo(() => getThaiLottoDrawByRoundId(roundId), [roundId]);
  const [confirmed, setConfirmed] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!draw) {
    return (
      <div className="soft-card space-y-3 p-4 text-center">
        <p className="text-sm text-[var(--text-on-light)]">ไม่พบรอบ</p>
        <Link
          href="/lottery/thai-government"
          className="soft-btn-outline inline-flex h-10 items-center px-4 text-sm font-semibold"
        >
          กลับรายการรอบ
        </Link>
      </div>
    );
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

  async function handleSubmit(entries: ThaiLottoBetEntry[]): Promise<boolean> {
    setSubmitError("");
    const lines = entriesToLines(entries);
    const total = slipTotal(lines);
    if (!canConfirmSlip(lines.length, total, state.balance)) {
      setSubmitError(total > state.balance ? "ยอดไม่พอ" : "กรุณาใส่ราคาทุกรายการ");
      return false;
    }

    setIsSubmitting(true);
    try {
      const slip = {
        id: `slip-${Date.now()}`,
        marketId: "thai-government",
        roundId,
        lines,
        total,
        status: "บันทึกแล้ว" as const,
        at: localToday(),
      };
      dispatch({ type: "confirmSlip", slip });
      setConfirmed(true);
      return true;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="lottery-thai-theme flex flex-col gap-2">
      {submitError ? (
        <p className="m-0 rounded-[var(--radius-soft-sm)] bg-[var(--brand-soft)] px-3 py-2 text-center text-xs font-semibold text-[var(--brand)]">
          {submitError}
        </p>
      ) : null}
      <ThaiLottoBetBoard
        draw={draw}
        groups={THAI_LOTTO_GROUPS}
        betTypes={THAI_LOTTO_BET_TYPES}
        backHref="/lottery/thai-government"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
