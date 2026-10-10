"use client";

import React from "react";
import { ArrowDownLeft, ArrowUpRight, Landmark, X } from "lucide-react";

export type WalletConfirmKind = "deposit" | "withdraw";

export interface WalletConfirmDialogProps {
  kind: WalletConfirmKind;
  amount: number;
  open: boolean;
  loading?: boolean;
  channelLabel?: string;
  onClose: () => void;
  onConfirm: () => void;
}

function formatBaht(amount: number) {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function WalletConfirmDialog({
  kind,
  amount,
  open,
  loading = false,
  channelLabel = "โอนธนาคาร",
  onClose,
  onConfirm,
}: WalletConfirmDialogProps) {
  if (!open) return null;

  const isDeposit = kind === "deposit";
  const title = isDeposit ? "ยืนยันส่งคำขอฝากเงิน" : "ยืนยันส่งคำขอถอนเงิน";
  const subtitle = isDeposit
    ? "ตรวจสอบยอดและช่องทางก่อนส่งคำขอ"
    : "ตรวจสอบยอดและบัญชีปลายทางก่อนส่งคำขอ";

  return (
    <div
      className="fixed inset-0 z-[130] flex animate-fade-in select-none items-center justify-center bg-black/60 p-4 backdrop-blur-[2px]"
      role="presentation"
      onClick={() => {
        if (!loading) onClose();
      }}
    >
      <div
        role="alertdialog"
        aria-labelledby="wallet-confirm-title"
        aria-describedby="wallet-confirm-desc"
        className="soft-card relative w-full max-w-[360px] animate-scale-up p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          disabled={loading}
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border-0 bg-[var(--soft-card)] text-[var(--text-muted)] transition-colors hover:text-[var(--text-on-light)] disabled:opacity-50"
          aria-label="ปิด"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="pb-3 text-center">
          <div
            className={`mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-lg ${
              isDeposit ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
            }`}
          >
            {isDeposit ? (
              <ArrowDownLeft className="h-7 w-7 stroke-[2.5]" />
            ) : (
              <ArrowUpRight className="h-7 w-7 stroke-[2.5]" />
            )}
          </div>
          <h3 id="wallet-confirm-title" className="text-lg font-black text-[var(--text-on-light)]">
            {title}
          </h3>
          <p id="wallet-confirm-desc" className="mt-0.5 text-xs text-[var(--text-muted)]">{subtitle}</p>
        </div>

        <div className="my-3 space-y-2.5 rounded-lg bg-[var(--soft-card)] p-3.5 text-xs sm:text-[13px]">
          <div className="flex items-center justify-between text-[var(--text-muted)]">
            <span>{isDeposit ? "ช่องทางฝาก" : "โอนเข้าบัญชี"}</span>
            <span className="flex items-center gap-1 font-bold text-[var(--text-on-light)]">
              <Landmark className="h-3.5 w-3.5 text-emerald-600" />
              {isDeposit ? channelLabel : "กสิกรไทย · 090-0-00000-1"}
            </span>
          </div>
          <div className="h-px bg-black/[0.06]" />
          <div className="flex items-center justify-between text-[var(--text-muted)]">
            <span>{isDeposit ? "ยอดที่แจ้งฝาก" : "ยอดที่ต้องการถอน"}</span>
            <span className="font-mono text-base font-black text-[var(--brand)]">
              ฿{formatBaht(amount)}
            </span>
          </div>
        </div>

        <p className="mb-3 text-center text-[10px] leading-relaxed text-[var(--text-muted)]">
          {isDeposit
            ? "หลังยืนยัน ระบบจะตรวจสอบสลิปและเครดิตจะเข้าภายในเวลาที่กำหนด"
            : "หลังยืนยัน เงินจะโอนเข้าบัญชีที่ลงทะเบียน โปรดตรวจสอบยอดอีกครั้ง"}
        </p>

        <div className="flex items-center gap-2.5 pt-1">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="h-11 flex-1 rounded-lg border-0 bg-[var(--soft-card)] text-sm font-extrabold text-[var(--text-on-light)] transition-colors hover:bg-[var(--soft-card-elevated)] disabled:opacity-50 cursor-pointer"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            disabled={loading || amount <= 0}
            onClick={onConfirm}
            className="soft-btn-primary h-11 flex-1 text-sm font-extrabold disabled:opacity-60 cursor-pointer active:scale-95 transition-transform"
          >
            {loading ? "กำลังส่ง..." : "ยืนยัน"}
          </button>
        </div>
      </div>
    </div>
  );
}
