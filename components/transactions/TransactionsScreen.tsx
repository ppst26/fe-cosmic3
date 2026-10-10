"use client";

import { useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import type { Transaction, TransactionKind } from "@/lib/member/types";
import { filterTransactions, PAGE_SIZE } from "@/lib/transactions";
import { SheetFrame } from "@/components/wallet/SheetFrame";

const KIND_LABELS: Record<TransactionKind, string> = {
  deposit: "ฝาก",
  withdraw: "ถอน",
  promotion: "โปรโมชั่น",
  bet: "เดิมพัน",
};

const inputClass =
  "h-11 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] px-3 text-sm outline-none";

export function TransactionsScreen() {
  const { state } = useAuth();
  const [historyKind, setHistoryKind] = useState<TransactionKind>("deposit");
  const [historyFrom, setHistoryFrom] = useState("");
  const [historyTo, setHistoryTo] = useState("");
  const [historyPage, setHistoryPage] = useState(0);
  const [historyDetail, setHistoryDetail] = useState<Transaction | null>(null);

  const filteredHistory = useMemo(
    () => filterTransactions(state.transactions, historyKind, historyFrom, historyTo),
    [state.transactions, historyKind, historyFrom, historyTo],
  );

  const historySlice = filteredHistory.slice(
    historyPage * PAGE_SIZE,
    historyPage * PAGE_SIZE + PAGE_SIZE,
  );

  return (
    <section className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(KIND_LABELS) as TransactionKind[]).map((kind) => (
          <button
            key={kind}
            type="button"
            onClick={() => {
              setHistoryKind(kind);
              setHistoryPage(0);
            }}
            className={`h-10 rounded-lg text-xs font-semibold ${
              historyKind === kind ? "bg-[var(--brand)] text-white" : "bg-[var(--soft-card-elevated)]"
            }`}
          >
            {KIND_LABELS[kind]}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="date"
          value={historyFrom}
          onChange={(event) => {
            setHistoryFrom(event.target.value);
            setHistoryPage(0);
          }}
          className={inputClass}
          aria-label="วันเริ่ม"
        />
        <input
          type="date"
          value={historyTo}
          onChange={(event) => {
            setHistoryTo(event.target.value);
            setHistoryPage(0);
          }}
          className={inputClass}
          aria-label="วันสิ้นสุด"
        />
      </div>
      <ul className="space-y-2">
        {historySlice.map((item) => {
          const row = (
            <>
              <span>
                {KIND_LABELS[item.kind]} {item.amount.toLocaleString("th-TH")} บาท
                <span className="block text-xs text-[var(--text-muted)]">{item.at}</span>
              </span>
              <span className="text-xs">{item.status}</span>
            </>
          );
          if (item.status === "รอดำเนินการ") {
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setHistoryDetail(item)}
                  className="soft-card flex w-full justify-between p-3 text-left text-sm"
                >
                  {row}
                </button>
              </li>
            );
          }
          return (
            <li key={item.id} className="soft-card flex justify-between p-3 text-sm">
              {row}
            </li>
          );
        })}
      </ul>
      {filteredHistory.length > PAGE_SIZE ? (
        <div className="flex gap-2">
          <button
            type="button"
            disabled={historyPage === 0}
            onClick={() => setHistoryPage((p) => p - 1)}
            className="h-10 flex-1 rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] text-sm font-semibold disabled:opacity-40"
          >
            ก่อนหน้า
          </button>
          <button
            type="button"
            disabled={(historyPage + 1) * PAGE_SIZE >= filteredHistory.length}
            onClick={() => setHistoryPage((p) => p + 1)}
            className="h-10 flex-1 rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] text-sm font-semibold disabled:opacity-40"
          >
            ถัดไป
          </button>
        </div>
      ) : null}

      {historyDetail ? (
        <SheetFrame title="รายละเอียดรายการ" onClose={() => setHistoryDetail(null)}>
          <div className="space-y-2 text-sm">
            <p>ประเภท: {KIND_LABELS[historyDetail.kind]}</p>
            <p>จำนวน: {historyDetail.amount.toLocaleString("th-TH")} บาท</p>
            <p>สถานะ: {historyDetail.status}</p>
            <p>วันที่: {historyDetail.at}</p>
          </div>
        </SheetFrame>
      ) : null}
    </section>
  );
}
