"use client";

import React, { useState } from "react";
import Link from "@/lib/i18n/navigation";
import { Check, Copy, X, Clock } from "lucide-react";
import type { PendingTransactionPayload } from "@/data/pendingTransactionMockData";

interface PendingTransactionDialogProps {
  payload: PendingTransactionPayload | null;
  onClose: () => void;
}

export function PendingTransactionDialog({ payload, onClose }: PendingTransactionDialogProps) {
  const [copiedRef, setCopiedRef] = useState(false);

  if (!payload) return null;

  const handleCopyRef = async () => {
    try {
      await navigator.clipboard.writeText(payload.referenceCopyValue);
      setCopiedRef(true);
      window.setTimeout(() => setCopiedRef(false), 2000);
    } catch {
      /* clipboard ไม่พร้อม */
    }
  };

  return (
    <div
      className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in select-none"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-labelledby="pending-tx-title"
        aria-describedby="pending-tx-desc"
        className="soft-card relative w-full max-w-[400px] animate-scale-up px-5 pb-5 pt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border-0 bg-[var(--soft-card)] text-[var(--text-muted)] transition-colors hover:text-[var(--text-on-light)]"
          aria-label="ปิด"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center pt-2 text-center">
          {payload.kind === "deposit" ? (
            <PendingDepositGraphic className="mb-3 h-24 w-24" />
          ) : (
            <PendingWithdrawGraphic className="mb-3 h-24 w-24" />
          )}

          <div className="mb-2 inline-flex items-center gap-1.5 rounded-md border border-amber-300/60 bg-amber-50 px-2.5 py-1 text-[11px] font-extrabold text-amber-800">
            <Clock className="w-3.5 h-3.5" />
            รอดำเนินการ
          </div>

          <h2 id="pending-tx-title" className="text-lg font-black text-[var(--text-on-light)] sm:text-xl">
            {payload.title}
          </h2>
          <p id="pending-tx-desc" className="mt-1 text-sm font-medium text-[var(--text-muted)]">
            {payload.subtitle}
          </p>
        </div>

        <p className="mt-6 text-center text-4xl font-black tracking-tight text-[var(--text-on-light)] sm:text-[2.75rem]">
          <span className="text-[var(--brand)]">฿</span> {payload.amountDisplay}
        </p>

        <hr className="my-5 border-black/[0.06]" />

        <dl className="space-y-3 text-sm">
          {payload.rows.map((row) => {
            const isRef = row.label === "เลขอ้างอิง";
            return (
              <div key={row.label} className="flex items-start justify-between gap-3">
                <dt className="shrink-0 font-medium text-[var(--text-muted)]">{row.label}</dt>
                <dd className="flex min-w-0 items-center justify-end gap-1.5 text-right font-bold text-[var(--text-on-light)]">
                  <span className="truncate">{row.value}</span>
                  {isRef && (
                    <button
                      type="button"
                      onClick={handleCopyRef}
                      className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md border-0 bg-[var(--soft-card)] text-[var(--brand)] hover:bg-[var(--brand-soft)]"
                      aria-label="คัดลอกเลขอ้างอิง"
                    >
                      {copiedRef ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
        {copiedRef && (
          <p className="mt-2 text-right text-xs text-emerald-400 font-semibold" role="status">
            คัดลอกเลขอ้างอิงแล้ว
          </p>
        )}

        <button
          type="button"
          onClick={onClose}
          className="soft-btn-primary mt-6 flex h-12 w-full cursor-pointer items-center justify-center text-[15px] font-extrabold active:scale-[0.98]"
        >
          เรียบร้อย
        </button>

        <Link
          href={payload.historyHref}
          onClick={onClose}
          className="mt-4 block text-center text-sm font-bold text-[var(--brand-strong)] underline underline-offset-4 transition-colors hover:text-[var(--brand)]"
        >
          ดูประวัติรายการ
        </Link>
      </div>
    </div>
  );
}

function PendingDepositGraphic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
      <ellipse cx="48" cy="78" rx="28" ry="8" fill="#000" opacity="0.35" />
      <rect x="22" y="36" width="52" height="38" rx="10" fill="#5b21b6" stroke="#a78bfa" strokeWidth="1.5" />
      <rect x="22" y="42" width="52" height="8" rx="2" fill="#4c1d95" />
      <circle cx="48" cy="24" r="14" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
      <path d="M48 18v12M42 24h12" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
      <circle cx="68" cy="68" r="10" fill="#312e81" stroke="#fde047" strokeWidth="1.5" />
      <path d="M68 64v5l2 2" stroke="#fde047" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="68" cy="64" r="1.5" fill="#fde047" />
    </svg>
  );
}

function PendingWithdrawGraphic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
      <ellipse cx="48" cy="78" rx="28" ry="8" fill="#000" opacity="0.35" />
      <path
        d="M28 38 48 28 68 38 V58 C68 68 48 76 48 76 C48 76 28 68 28 58 Z"
        fill="#6d28d9"
        stroke="#c4b5fd"
        strokeWidth="1.5"
      />
      <path
        d="M58 48 H78 L74 44 M78 48 74 52"
        stroke="#c4b5fd"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="68" cy="62" r="10" fill="#312e81" stroke="#fde047" strokeWidth="1.5" />
      <path d="M68 58v5l2 2" stroke="#fde047" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="68" cy="58" r="1.5" fill="#fde047" />
    </svg>
  );
}
