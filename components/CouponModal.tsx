"use client";

import React, { useState } from "react";
import { X, Ticket, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { applyCoupon, COUPON_QUICK_SAMPLES } from "@/lib/coupon";

export interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function localToday(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function CouponModal({ isOpen, onClose }: CouponModalProps) {
  const { dispatch } = useAuth();
  const { showToast } = useToast();
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [rewardKind, setRewardKind] = useState<"baht" | "gems" | null>(null);
  const [rewardAmount, setRewardAmount] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleRedeem = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanCode = code.trim();
    if (!cleanCode) return;

    setStatus("loading");
    setMessage("");

    window.setTimeout(() => {
      const result = applyCoupon(cleanCode);
      if (!result.ok) {
        setStatus("error");
        setMessage(result.message);
        return;
      }

      const at = localToday();
      if (result.kind === "baht") {
        dispatch({ type: "couponCredit", amount: result.amount, at });
      } else {
        dispatch({ type: "couponGems", amount: result.amount });
      }

      setRewardKind(result.kind);
      setRewardAmount(result.amount);
      setStatus("success");
      setMessage(result.message);
      showToast(result.message, "success");
    }, 400);
  };

  const handleQuickPaste = (sampleCode: string) => {
    setCode(sampleCode);
    setStatus("idle");
    setMessage("");
  };

  const handleReset = () => {
    setCode("");
    setStatus("idle");
    setMessage("");
    setRewardAmount(null);
    setRewardKind(null);
  };

  const closeModal = () => {
    handleReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 select-none animate-fade-in">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
        onClick={closeModal}
        aria-hidden="true"
      />

      <div
        className="relative z-10 w-full max-w-[380px] rounded-[var(--radius-soft-lg)] border border-black/10 bg-[var(--soft-card-elevated)] p-5 sm:p-6 shadow-[0_12px_40px_rgba(45,55,72,0.25)] text-[var(--text-on-light)]"
        role="dialog"
        aria-labelledby="coupon-modal-title"
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--brand-soft)] text-[var(--brand)]">
              <Ticket className="h-4 w-4" />
            </div>
            <h2 id="coupon-modal-title" className="text-lg font-extrabold tracking-wide">
              คูปอง
            </h2>
          </div>

          <button
            type="button"
            onClick={closeModal}
            aria-label="ปิด"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--soft-card)] text-[var(--text-muted)] transition-colors border-0 cursor-pointer hover:text-[var(--text-on-light)] active:scale-95"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {status === "success" ? (
          <div className="space-y-3.5 py-2 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div>
              <p className="text-base font-extrabold">รับรางวัลสำเร็จ!</p>
              <div className="my-2 rounded-2xl border border-emerald-500/25 bg-emerald-50 p-3">
                <span className="text-xs text-[var(--text-muted)]">ยอดที่ได้รับ:</span>
                <p className="mt-0.5 font-mono text-2xl font-black text-emerald-600">
                  {rewardKind === "gems" ? `+${rewardAmount} เพชร` : `+฿${rewardAmount?.toLocaleString("th-TH")}`}
                </p>
              </div>
              <p className="px-2 text-xs font-medium text-[var(--text-muted)]">{message}</p>
            </div>

            <button
              type="button"
              onClick={closeModal}
              className="mt-2 h-11 w-full cursor-pointer rounded-xl border-0 text-sm font-extrabold text-white soft-btn-primary active:scale-[0.98] transition-transform"
            >
              เสร็จสิ้น
            </button>
          </div>
        ) : (
          <form onSubmit={handleRedeem} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="coupon-input" className="text-xs font-bold text-[var(--text-muted)]">
                รหัสคูปอง
              </label>
              <div className="relative">
                <input
                  id="coupon-input"
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="กรอกรหัสคูปองที่นี่"
                  autoFocus
                  maxLength={20}
                  className="h-12 w-full rounded-xl border border-black/10 bg-[var(--soft-card)] px-4 font-mono text-[15px] font-bold uppercase tracking-wider text-[var(--text-on-light)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/40"
                />
                {code ? (
                  <button
                    type="button"
                    onClick={() => setCode("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 border-0 bg-transparent p-1 text-xs text-[var(--text-muted)] cursor-pointer hover:text-[var(--text-on-light)]"
                  >
                    ล้าง
                  </button>
                ) : null}
              </div>
            </div>

            {status === "error" ? (
              <div className="flex items-center gap-2 rounded-xl border border-rose-500/25 bg-rose-50 p-2.5 text-xs font-medium text-rose-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{message}</span>
              </div>
            ) : null}

            <div className="space-y-1.5 pt-0.5">
              <span className="text-[11px] font-bold text-[var(--text-muted)]">โค้ดแนะนำ:</span>
              <div className="flex flex-wrap gap-1.5">
                {COUPON_QUICK_SAMPLES.map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => handleQuickPaste(sample)}
                    className="cursor-pointer rounded-lg border-0 bg-[var(--brand-soft)] px-2.5 py-1 font-mono text-[11px] font-bold text-[var(--brand-strong)] transition-all active:scale-95"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!code.trim() || status === "loading"}
                className={`flex h-12 w-full items-center justify-center rounded-xl border-0 text-[15px] font-extrabold transition-all ${
                  !code.trim() || status === "loading"
                    ? "cursor-not-allowed bg-[var(--soft-card)] text-[var(--text-muted)]"
                    : "cursor-pointer text-white soft-btn-primary active:scale-[0.98]"
                }`}
              >
                {status === "loading" ? "กำลังตรวจสอบ..." : "ยืนยัน"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
