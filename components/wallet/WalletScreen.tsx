"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SubPageShell } from "@/components/layout/SubPageShell";
import { useAuth } from "@/context/AuthContext";
import { SheetFrame } from "@/components/wallet/SheetFrame";
import { DEPOSIT_AMOUNTS } from "@/data/member";
import { DEPOSIT_RECEIVING_ACCOUNT } from "@/data/signup";
import { applyCoupon } from "@/lib/coupon";
import {
  COUPON_CODE_MAX_LENGTH,
  digitsOnly,
  MONEY_AMOUNT_MAX_DIGITS,
  moneyAmountError,
} from "@/lib/fieldRules";
import type { Transaction, TransactionKind } from "@/lib/member/types";
import { filterTransactions, PAGE_SIZE } from "@/lib/transactions";

type MainTab = "dw" | "coupon" | "history";
type DepositStep = "methods" | "bank" | "slip";
type SheetKind = "deposit" | "withdraw" | null;

const KIND_LABELS: Record<TransactionKind, string> = {
  deposit: "ฝาก",
  withdraw: "ถอน",
  promotion: "โปรโมชั่น",
  bet: "เดิมพัน",
};

const inputClass =
  "h-11 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] px-3 text-sm outline-none";

function localToday(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function WalletScreen() {
  const params = useSearchParams();
  const tabParam = params.get("tab");
  const { state, dispatch } = useAuth();

  const [mainTab, setMainTab] = useState<MainTab>(tabParam === "history" ? "history" : "dw");
  const [sheet, setSheet] = useState<SheetKind>(tabParam === "deposit" ? "deposit" : null);
  const [message, setMessage] = useState("");

  const [depositStep, setDepositStep] = useState<DepositStep>("methods");
  const [depositAmount, setDepositAmount] = useState("");
  const [slipFileName, setSlipFileName] = useState("");

  const [withdrawAmount, setWithdrawAmount] = useState("");

  const [couponCode, setCouponCode] = useState("");

  const [historyKind, setHistoryKind] = useState<TransactionKind>("deposit");
  const [historyFrom, setHistoryFrom] = useState("");
  const [historyTo, setHistoryTo] = useState("");
  const [historyPage, setHistoryPage] = useState(0);
  const [historyDetail, setHistoryDetail] = useState<Transaction | null>(null);

  const verifiedBanks = useMemo(
    () => state.banks.filter((bank) => bank.status === "verified"),
    [state.banks],
  );

  const depositAmountError = moneyAmountError(depositAmount);
  const withdrawAmountError = moneyAmountError(withdrawAmount);
  const withdrawAmountNum = withdrawAmount ? Number(withdrawAmount) : 0;
  const withdrawDisabled =
    verifiedBanks.length === 0 ||
    withdrawAmountError !== null ||
    withdrawAmountNum > state.balance;

  const filteredHistory = useMemo(
    () => filterTransactions(state.transactions, historyKind, historyFrom, historyTo),
    [state.transactions, historyKind, historyFrom, historyTo],
  );

  const historySlice = filteredHistory.slice(
    historyPage * PAGE_SIZE,
    historyPage * PAGE_SIZE + PAGE_SIZE,
  );

  function closeDepositSheet() {
    setSheet(null);
    setDepositStep("methods");
    setDepositAmount("");
    setSlipFileName("");
  }

  function closeWithdrawSheet() {
    setSheet(null);
    setWithdrawAmount("");
  }

  function copyAccountNumber() {
    void navigator.clipboard.writeText(DEPOSIT_RECEIVING_ACCOUNT.accountNumber);
    setMessage("คัดลอกเลขบัญชีแล้ว");
  }

  function confirmDeposit() {
    const amount = Number(depositAmount);
    dispatch({ type: "deposit", amount, at: localToday() });
    setMessage("ฝากเงินสำเร็จ");
    setDepositStep("methods");
    setDepositAmount("");
    setSlipFileName("");
    setSheet(null);
  }

  function confirmWithdraw() {
    const amount = Number(withdrawAmount);
    dispatch({ type: "withdraw", amount, at: localToday() });
    setMessage("ถอนเงินสำเร็จ");
    setWithdrawAmount("");
    setSheet(null);
  }

  function submitCoupon(event: React.FormEvent) {
    event.preventDefault();
    const result = applyCoupon(couponCode);
    setMessage(result.message);
    if (!result.ok) return;
    const at = localToday();
    if (result.kind === "baht") {
      dispatch({ type: "couponCredit", amount: result.amount, at });
    } else {
      dispatch({ type: "couponGems", amount: result.amount });
    }
    setCouponCode("");
  }

  return (
    <SubPageShell title="ฝาก-ถอน" nav="wallet" requiresAuth sessionMode="none">
      <p className="mb-3 text-sm font-semibold text-[var(--text-on-light)]">
        ยอดคงเหลือ {state.balance.toLocaleString("th-TH")} บาท
      </p>

      <div className="mb-3 flex gap-2">
        {(
          [
            ["dw", "ฝาก/ถอน"],
            ["coupon", "คูปอง"],
            ["history", "ประวัติ"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setMainTab(key)}
            className={`h-10 flex-1 rounded-lg text-xs font-semibold ${
              mainTab === key ? "bg-[var(--brand)] text-white" : "bg-[var(--soft-card-elevated)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mainTab === "dw" ? (
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="soft-btn-primary h-10 rounded-[var(--radius-soft-sm)] text-sm font-semibold"
            onClick={() => {
              setDepositStep("methods");
              setSheet("deposit");
            }}
          >
            ฝาก
          </button>
          <button
            type="button"
            className="h-10 rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] text-sm font-semibold"
            onClick={() => setSheet("withdraw")}
          >
            ถอน
          </button>
        </div>
      ) : null}

      {mainTab === "coupon" ? (
        <form className="soft-card space-y-3 p-4" onSubmit={submitCoupon}>
          <input
            value={couponCode}
            onChange={(event) => setCouponCode(event.target.value)}
            maxLength={COUPON_CODE_MAX_LENGTH}
            placeholder="กรอกรหัสคูปอง"
            className={inputClass}
          />
          <button type="submit" className="soft-btn-primary h-10 w-full text-sm font-semibold">
            ใช้คูปอง
          </button>
        </form>
      ) : null}

      {mainTab === "history" ? (
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
        </section>
      ) : null}

      {message ? <p className="mt-3 text-sm text-[var(--brand)]">{message}</p> : null}

      {sheet === "deposit" ? (
        <SheetFrame title="ฝากเงิน" onClose={closeDepositSheet}>
          {depositStep === "methods" ? (
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                className="h-10 rounded-[var(--radius-soft-sm)] bg-[var(--soft-card)] text-sm font-semibold"
                onClick={() => setDepositStep("bank")}
              >
                บัญชีธนาคาร
              </button>
              <button
                type="button"
                className="h-10 rounded-[var(--radius-soft-sm)] bg-[var(--soft-card)] text-sm font-semibold"
                onClick={() => setMessage("ยังไม่เปิดให้บริการ")}
              >
                Payment Gateway
              </button>
              <button
                type="button"
                className="h-10 rounded-[var(--radius-soft-sm)] bg-[var(--soft-card)] text-sm font-semibold"
                onClick={() => setMessage("ยังไม่เปิดให้บริการ")}
              >
                ทรูวอลเล็ท
              </button>
            </div>
          ) : null}

          {depositStep === "bank" ? (
            <div className="space-y-3 text-sm">
              <div className="soft-card p-3">
                <p>{DEPOSIT_RECEIVING_ACCOUNT.bankName}</p>
                <p className="font-semibold">{DEPOSIT_RECEIVING_ACCOUNT.accountNumber}</p>
                <p className="text-[var(--text-muted)]">{DEPOSIT_RECEIVING_ACCOUNT.accountName}</p>
                <button
                  type="button"
                  onClick={copyAccountNumber}
                  className="mt-2 h-10 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] text-xs font-semibold"
                >
                  คัดลอกเลขบัญชี
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {DEPOSIT_AMOUNTS.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setDepositAmount(value)}
                    className="h-10 rounded-[var(--radius-soft-sm)] bg-[var(--soft-card)] text-xs font-semibold"
                  >
                    ฿{Number(value).toLocaleString("th-TH")}
                  </button>
                ))}
              </div>
              <input
                value={depositAmount}
                onChange={(event) =>
                  setDepositAmount(digitsOnly(event.target.value, MONEY_AMOUNT_MAX_DIGITS))
                }
                placeholder="ระบุจำนวนเงิน"
                className={inputClass}
                inputMode="numeric"
              />
              {depositAmountError ? (
                <p className="text-xs text-[var(--brand)]">{depositAmountError}</p>
              ) : null}
              <button
                type="button"
                disabled={depositAmountError !== null}
                onClick={() => setDepositStep("slip")}
                className="soft-btn-primary h-10 w-full text-sm font-semibold disabled:opacity-40"
              >
                ถัดไป
              </button>
            </div>
          ) : null}

          {depositStep === "slip" ? (
            <div className="space-y-3 text-sm">
              <p>
                จำนวน: <span className="font-semibold">{Number(depositAmount).toLocaleString("th-TH")} บาท</span>
              </p>
              <label className="block">
                <span className="mb-1 block text-[var(--text-muted)]">แนบสลิป</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    setSlipFileName(file?.name ?? "");
                  }}
                  className="w-full text-xs"
                />
              </label>
              {slipFileName ? <p className="text-xs text-[var(--text-muted)]">{slipFileName}</p> : null}
              <button
                type="button"
                onClick={confirmDeposit}
                className="soft-btn-primary h-10 w-full text-sm font-semibold"
              >
                ยืนยันการฝาก
              </button>
            </div>
          ) : null}
        </SheetFrame>
      ) : null}

      {sheet === "withdraw" ? (
        <SheetFrame title="ถอนเงิน" onClose={closeWithdrawSheet}>
          <div className="space-y-3 text-sm">
            {verifiedBanks.length === 0 ? (
              <p className="text-[var(--text-muted)]">ไม่มีบัญชีที่ตรวจสอบแล้ว</p>
            ) : (
              <ul className="space-y-2">
                {verifiedBanks.map((bank) => (
                  <li key={bank.id} className="soft-card p-3">
                    <p className="font-semibold">{bank.bankName}</p>
                    <p>{bank.accountNumber}</p>
                    <p className="text-xs text-[var(--text-muted)]">{bank.accountHolder}</p>
                  </li>
                ))}
              </ul>
            )}
            <input
              value={withdrawAmount}
              onChange={(event) =>
                setWithdrawAmount(digitsOnly(event.target.value, MONEY_AMOUNT_MAX_DIGITS))
              }
              placeholder="จำนวนเงินที่ต้องการถอน"
              className={inputClass}
              inputMode="numeric"
            />
            {withdrawAmountError ? (
              <p className="text-xs text-[var(--brand)]">{withdrawAmountError}</p>
            ) : null}
            <button
              type="button"
              onClick={() => setWithdrawAmount(String(Math.floor(state.balance)))}
              className="text-sm font-semibold text-[var(--brand)]"
            >
              ถอนทั้งหมด
            </button>
            <button
              type="button"
              disabled={withdrawDisabled}
              onClick={confirmWithdraw}
              className="soft-btn-primary h-10 w-full text-sm font-semibold disabled:opacity-40"
            >
              ยืนยันถอนเงิน
            </button>
          </div>
        </SheetFrame>
      ) : null}

      {historyDetail ? (
        <SheetFrame title="รายละเอียดธุรกรรม" onClose={() => setHistoryDetail(null)}>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-2">
              <dt className="text-[var(--text-muted)]">ชนิด</dt>
              <dd className="font-semibold">{KIND_LABELS[historyDetail.kind]}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-[var(--text-muted)]">จำนวน</dt>
              <dd className="font-semibold">{historyDetail.amount.toLocaleString("th-TH")} บาท</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-[var(--text-muted)]">เวลา</dt>
              <dd>{historyDetail.at}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-[var(--text-muted)]">สถานะ</dt>
              <dd className="font-semibold">{historyDetail.status}</dd>
            </div>
          </dl>
        </SheetFrame>
      ) : null}
    </SubPageShell>
  );
}
