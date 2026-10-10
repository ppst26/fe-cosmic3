"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  Landmark,
  QrCode,
  Smartphone,
  Copy,
  Check,
  Clock,
  Sparkles,
  Bell,
  Coins,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  ImageIcon,
  Plus,
  Upload,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { usePendingTransaction } from "@/context/PendingTransactionContext";
import { useRouter } from "next/navigation";
import { WalletConfirmDialog, type WalletConfirmKind } from "@/components/WalletConfirmDialog";

export interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "deposit-withdraw" | "promo" | "history";
  initialSubTab?: "deposit" | "withdraw";
  initialHistorySubTab?: "deposit-history" | "withdraw-history";
  onDepositCompleted?: (amount: number) => void;
  onWithdrawCompleted?: (amount: number) => void;
}

export function WalletModal({
  isOpen,
  onClose,
  initialTab = "deposit-withdraw",
  initialSubTab = "withdraw",
  initialHistorySubTab = "deposit-history",
  onDepositCompleted,
  onWithdrawCompleted,
}: WalletModalProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useToast();
  const { showPendingDeposit, showPendingWithdraw } = usePendingTransaction();
  const [confirmKind, setConfirmKind] = useState<WalletConfirmKind | null>(null);

  // Top level tabs: "deposit-withdraw" | "promo" | "history"
  const [activeMainTab, setActiveMainTab] = useState<"deposit-withdraw" | "promo" | "history">(initialTab);

  // Sub-tabs for deposit-withdraw: "deposit" | "withdraw"
  const [activeActionTab, setActiveActionTab] = useState<"deposit" | "withdraw">(initialSubTab);

  // Sub-tabs for history: "deposit-history" | "withdraw-history"
  const [historySubTab, setHistorySubTab] = useState<"deposit-history" | "withdraw-history">(
    initialHistorySubTab,
  );

  // Deposit Channel selection & amounts
  const [depositChannel, setDepositChannel] = useState<"bank" | "promptpay" | "truemoney">("bank");
  const [depositAmount, setDepositAmount] = useState<string>("500");
  const [copiedBank, setCopiedBank] = useState(false);

  // Deposit Steps: 1 (Select amount & channel) -> 2 (Confirm deposit & upload slip)
  const [depositStep, setDepositStep] = useState<1 | 2>(1);
  const [attachedSlip, setAttachedSlip] = useState<string | null>(null);
  const [isSubmittingDeposit, setIsSubmittingDeposit] = useState(false);

  // Withdraw Steps: 1 (Overview & Balance) -> 2 (Specify Amount & Confirm Withdraw - ตามภาพล่าสุด)
  const [withdrawStep, setWithdrawStep] = useState<1 | 2>(1);
  const [withdrawAmount, setWithdrawAmount] = useState<string>("500");
  const [isSubmittingWithdraw, setIsSubmittingWithdraw] = useState(false);

  // Synchronize state when modal is opened
  useEffect(() => {
    if (isOpen) {
      setActiveMainTab(initialTab);
      setActiveActionTab(initialSubTab);
      setHistorySubTab(initialHistorySubTab);
      setDepositStep(1);
      setWithdrawStep(1);
      setConfirmKind(null);
    }
  }, [isOpen, initialTab, initialSubTab, initialHistorySubTab]);

  const depositChannelLabel =
    depositChannel === "bank"
      ? "โอนธนาคาร"
      : depositChannel === "promptpay"
        ? "พร้อมเพย์ QR"
        : "ทรูมันนี่";

  const parsedDepositAmount = parseFloat(depositAmount || "0") || 0;
  const parsedWithdrawAmount = parseFloat(withdrawAmount || "0") || 0;

  // Quick preset amounts for deposit & withdraw
  const quickAmounts = ["100", "300", "500", "1,000", "2,000", "5,000"];
  const quickWithdrawAmounts = ["100", "300", "500", "1,000", "5,000"];

  if (!isOpen) return null;

  const handleCopyAccount = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleSlipUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedSlip(file.name);
    } else {
      setAttachedSlip("slip_payment_success.png");
    }
  };

  const requestWithdrawConfirm = () => {
    const val = parsedWithdrawAmount;
    if (!val || val <= 0) {
      showToast("กรุณาระบุจำนวนเงินที่ต้องการถอน", "error");
      return;
    }
    const maxAvailable = user?.balance ?? 0;
    if (val > maxAvailable) {
      showToast("ยอดเงินในบัญชีไม่เพียงพอสำหรับการถอน", "error");
      return;
    }
    setConfirmKind("withdraw");
  };

  const requestDepositConfirm = () => {
    if (!parsedDepositAmount || parsedDepositAmount <= 0) {
      showToast("กรุณาระบุจำนวนเงินที่ต้องการฝาก", "error");
      return;
    }
    setConfirmKind("deposit");
  };

  const handleConfirmDeposit = () => {
    const amount = parsedDepositAmount;
    setConfirmKind(null);
    setIsSubmittingDeposit(true);
    window.setTimeout(() => {
      setIsSubmittingDeposit(false);
      setDepositStep(1);
      setAttachedSlip(null);
      setDepositAmount("500");
      onDepositCompleted?.(amount);
      onClose();
      showPendingDeposit(amount);
    }, 600);
  };

  const handleConfirmWithdraw = () => {
    const amount = parsedWithdrawAmount;
    setConfirmKind(null);
    setIsSubmittingWithdraw(true);
    window.setTimeout(() => {
      setIsSubmittingWithdraw(false);
      setWithdrawStep(1);
      setWithdrawAmount("500");
      onWithdrawCompleted?.(amount);
      onClose();
      showPendingWithdraw(amount);
    }, 600);
  };

  return (
    <>
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 select-none animate-fade-in">
      {/* 1. Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 2. Modal Container (Black-Purple Theme & Thrill Borderless Aesthetic) */}
      <div className="relative z-10 w-full max-w-[440px] bg-[var(--soft-card)] border border-white/[0.06] rounded-[26px] sm:rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-4 sm:p-5 flex flex-col max-h-[92vh] overflow-y-auto">
        {/* ========================================================= */}
        {/* Step 2 Header: สำหรับฝากเงิน Step 2                          */}
        {/* ========================================================= */}
        {activeMainTab === "deposit-withdraw" && activeActionTab === "deposit" && depositStep === 2 ? (
          <div className="relative flex items-center justify-between pb-3 mb-2 border-b border-white/[0.05]">
            <button
              type="button"
              onClick={() => setDepositStep(1)}
              aria-label="ย้อนกลับ"
              className="w-8 h-8 rounded-full bg-[#1e1730] hover:bg-[#281e42] text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer border-0 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            <div className="text-center">
              <h3 className="text-base font-extrabold text-white leading-tight">
                ยืนยันการฝากเงิน
              </h3>
              <span className="text-[11px] text-zinc-400 font-medium">
                ขั้นตอน 2 จาก 2
              </span>
            </div>

            <div className="w-8 h-8" />
          </div>
        ) : (
          /* ========================================================= */
          /* Standard Header & Tabs                                    */
          /* ========================================================= */
          <>
            {/* Grabber Bar */}
            <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-3" />

            <button
              type="button"
              onClick={onClose}
              aria-label="ปิดหน้าต่าง"
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-[#1e1730] hover:bg-[#281e42] text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer border-0 z-20 active:scale-95"
            >
              <X className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Top 3 Segmented Tabs: [ฝาก/ถอน]  [โปรโมชั่น]  [ประวัติ] */}
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[#0d0917] border-0 mb-4 pr-10">
              <button
                type="button"
                onClick={() => {
                  setActiveMainTab("deposit-withdraw");
                  setDepositStep(1);
                  setWithdrawStep(1);
                }}
                className={`py-2 px-1 text-center rounded-xl text-xs sm:text-[13px] font-extrabold transition-all cursor-pointer border-0 ${
                  activeMainTab === "deposit-withdraw"
                    ? "button-dark-purple text-white shadow-none"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                ฝาก/ถอน
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveMainTab("promo");
                  setDepositStep(1);
                  setWithdrawStep(1);
                }}
                className={`py-2 px-1 text-center rounded-xl text-xs sm:text-[13px] font-extrabold transition-all cursor-pointer border-0 ${
                  activeMainTab === "promo"
                    ? "button-dark-purple text-white shadow-none"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                โปรโมชั่น
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveMainTab("history");
                  setDepositStep(1);
                  setWithdrawStep(1);
                }}
                className={`py-2 px-1 text-center rounded-xl text-xs sm:text-[13px] font-extrabold transition-all cursor-pointer border-0 ${
                  activeMainTab === "history"
                    ? "button-dark-purple text-white shadow-none"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                ประวัติ
              </button>
            </div>
          </>
        )}

        {/* ========================================================= */}
        {/* TAB 1: ฝาก / ถอน (Deposit & Withdraw)                     */}
        {/* ========================================================= */}
        {activeMainTab === "deposit-withdraw" && (
          <div className="flex-1 flex flex-col space-y-3.5">
            {/* ซ่อนแถบ Sub-tabs ถ้าอยู่ใน Step 2 ของฝาก */}
            {!(activeActionTab === "deposit" && depositStep === 2) && (
              <div className="relative flex border-b border-white/[0.08] mb-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveActionTab("deposit");
                    setDepositStep(1);
                  }}
                  className={`flex-1 py-2.5 text-center text-sm sm:text-base font-extrabold transition-all cursor-pointer border-0 relative ${
                    activeActionTab === "deposit"
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  ฝาก
                  {activeActionTab === "deposit" && (
                    <span className="absolute bottom-0 inset-x-4 h-[2.5px] bg-[var(--brand)] rounded-full" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveActionTab("withdraw");
                    setDepositStep(1);
                  }}
                  className={`flex-1 py-2.5 text-center text-sm sm:text-base font-extrabold transition-all cursor-pointer border-0 relative ${
                    activeActionTab === "withdraw"
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  ถอน
                  {activeActionTab === "withdraw" && (
                    <span className="absolute bottom-0 inset-x-4 h-[2.5px] bg-[var(--brand)] rounded-full" />
                  )}
                </button>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* 1.1 โหมด "ถอน" - แสดงแบบฟอร์มถอนเงินทันทีในขั้นตอนแรก     */}
            {/* ----------------------------------------------------- */}
            {activeActionTab === "withdraw" && (
              <div className="space-y-4 animate-fade-in pt-1">
                {/* 1. การ์ดบัญชีปลายทางของผู้ใช้ (โอนเข้าบัญชีของคุณ) */}
                <div className="rounded-[20px] bg-[#151022] p-3.5 flex items-center justify-between border border-white/[0.04] shadow-sm">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Bank Logo Emblem */}
                    <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center p-1 shadow-sm shrink-0">
                      <div className="w-full h-full rounded-full bg-[#12803b] flex items-center justify-center text-white font-bold text-xs">
                        <Landmark className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div className="text-left min-w-0">
                      <span className="text-[11px] text-zinc-400 font-medium block leading-tight">
                        โอนเข้าบัญชีของคุณ
                      </span>
                      <span className="text-sm sm:text-[15px] font-extrabold text-white block leading-tight mt-0.5">
                        กสิกรไทย
                      </span>
                      <span className="text-xs text-zinc-300 font-mono tracking-wider block leading-tight mt-0.5">
                        090-0-00000-1
                      </span>
                      <span className="text-[11px] text-zinc-400 block truncate leading-tight mt-0.5">
                        {user?.displayName ? `${user.displayName} (VIP 3)` : "คุณพีพี (VIP 3)"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      router.push("/profile");
                    }}
                    className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors border-0 cursor-pointer"
                    title="จัดการบัญชีธนาคาร"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* 2. จำนวนเงินที่ต้องการถอน */}
                <div className="text-center py-2">
                  <span className="text-xs sm:text-[13px] font-bold text-zinc-400 block mb-2">
                    จำนวนเงินที่ต้องการถอน
                  </span>

                  <div className="inline-flex items-baseline justify-center gap-1.5 sm:gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-[var(--brand)]">
                      ฿
                    </span>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight bg-transparent text-center w-48 sm:w-56 focus:outline-none border-b-2 border-transparent focus:border-purple-500/50"
                    />
                  </div>
                </div>

                {/* 3. ยอดถอนได้ & ปุ่มถอนทั้งหมด */}
                <div className="flex items-center justify-between px-1 text-xs">
                  <span className="text-zinc-300 font-bold">
                    ถอนได้{" "}
                    <span className="text-white font-mono font-black">
                      ฿{(user?.balance ?? 0).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </span>

                  <button
                    type="button"
                    onClick={() => setWithdrawAmount((user?.balance ?? 0).toString())}
                    className="text-[var(--brand)] hover:text-white font-bold text-xs cursor-pointer border-0 bg-transparent transition-colors"
                  >
                    ถอนทั้งหมด
                  </button>
                </div>

                {/* 4. Quick Amount Pills (100, 300, 500, 1,000, 5,000) */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    {quickWithdrawAmounts.map((amt) => {
                      const clean = amt.replace(/,/g, "");
                      const isActive = withdrawAmount === clean;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setWithdrawAmount(clean)}
                          className={`flex-1 py-2 rounded-full text-xs font-black transition-all cursor-pointer border-0 ${
                            isActive
                              ? "bg-white text-black shadow-sm scale-105"
                              : "bg-[#1a1429] text-zinc-300 hover:bg-[#231b36] hover:text-white"
                          }`}
                        >
                          {amt}
                        </button>
                      );
                    })}
                  </div>

                  <span className="text-[11px] text-zinc-500 font-medium text-center block">
                    แตะยอดเงินเพื่อแก้ไข
                  </span>
                </div>

                {/* 5. Action Button: ยืนยันถอนเงิน (Electric Vivid Purple) */}
                <div className="pt-2">
                  <button
                    type="button"
                    disabled={isSubmittingWithdraw}
                    onClick={requestWithdrawConfirm}
                    className="w-full h-12 rounded-xl button-dark-purple flex items-center justify-center gap-2 text-[15px] font-extrabold cursor-pointer border-0 active:scale-98 disabled:opacity-60"
                  >
                    {isSubmittingWithdraw ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>กำลังส่งคำขอถอนเงิน...</span>
                      </span>
                    ) : (
                      <>
                        <ArrowUpRight className="w-4.5 h-4.5 stroke-[2.5]" />
                        <span>ยืนยันถอนเงิน</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* 1.2 โหมด "ฝาก" - STEP 1                               */}
            {/* ----------------------------------------------------- */}
            {activeActionTab === "deposit" && depositStep === 1 && (
              <div className="space-y-3.5">
                {/* เลือกช่องทางฝาก */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDepositChannel("bank")}
                    className={`p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border-0 ${
                      depositChannel === "bank"
                        ? "bg-[#241738] ring-1 ring-[var(--brand)] text-white"
                        : "bg-[#151022] text-zinc-400 hover:bg-[#1a1429]"
                    }`}
                  >
                    <Landmark className="w-5 h-5 text-emerald-400" />
                    <span className="text-[11px] font-bold">โอนธนาคาร</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDepositChannel("promptpay")}
                    className={`p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border-0 ${
                      depositChannel === "promptpay"
                        ? "bg-[#241738] ring-1 ring-[var(--brand)] text-white"
                        : "bg-[#151022] text-zinc-400 hover:bg-[#1a1429]"
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-blue-400" />
                    <span className="text-[11px] font-bold">พร้อมเพย์ QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDepositChannel("truemoney")}
                    className={`p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border-0 ${
                      depositChannel === "truemoney"
                        ? "bg-[#241738] ring-1 ring-[var(--brand)] text-white"
                        : "bg-[#151022] text-zinc-400 hover:bg-[#1a1429]"
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-amber-400" />
                    <span className="text-[11px] font-bold">ทรูมันนี่</span>
                  </button>
                </div>

                {/* กล่องจำนวนเงินที่ต้องการฝาก */}
                <div className="rounded-[22px] bg-[#1a1429] p-4 border-0">
                  <span className="text-xs font-bold text-zinc-400 block mb-2">
                    เลือกหรือระบุจำนวนเงินฝาก (บาท)
                  </span>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {quickAmounts.map((amt) => {
                      const cleanAmt = amt.replace(/,/g, "");
                      const isActive = depositAmount === cleanAmt;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setDepositAmount(cleanAmt)}
                          className={`py-2 px-1 rounded-xl text-xs font-black transition-all cursor-pointer border-0 ${
                            isActive
                              ? "bg-[var(--brand)] text-white"
                              : "bg-[#120d1f] text-zinc-300 hover:bg-[#201633]"
                          }`}
                        >
                          ฿{amt}
                        </button>
                      );
                    })}
                  </div>

                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-base font-black text-[var(--brand)]">
                      ฿
                    </span>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="ระบุจำนวนเงิน (ขั้นต่ำ 100)"
                      className="w-full h-11 pl-9 pr-3 rounded-xl bg-[#0e0918] border-0 text-white font-mono font-bold text-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand)]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!parsedDepositAmount || parsedDepositAmount <= 0) {
                        showToast("กรุณาระบุจำนวนเงินที่ต้องการฝาก", "error");
                        return;
                      }
                      setDepositStep(2);
                    }}
                    className="w-full mt-3.5 h-12 rounded-xl button-dark-purple flex items-center justify-center gap-2 text-sm font-extrabold cursor-pointer border-0 active:scale-98"
                  >
                    <span>ขั้นตอนถัดไป (ยืนยันการฝาก)</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* 1.3 โหมด "ฝาก" - STEP 2 (ยืนยันและแนบสลิป)             */}
            {/* ----------------------------------------------------- */}
            {activeActionTab === "deposit" && depositStep === 2 && (
              <div className="space-y-3.5 animate-fade-in">
                {/* 1. การ์ดยอดเงินที่ต้องโอน */}
                <div className="rounded-[22px] bg-[#1a1429] p-4 text-center border-0">
                  <span className="text-xs sm:text-[13px] font-bold text-zinc-400 block mb-1">
                    ยอดเงินที่ต้องโอน
                  </span>
                  <div className="inline-flex items-baseline justify-center gap-1.5 my-1">
                    <span className="text-xl sm:text-2xl font-black text-[var(--brand)]">
                      ฿
                    </span>
                    <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                      {parseFloat(depositAmount || "500").toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>

                {/* 2. การ์ดข้อมูลบัญชีรับเงินของระบบ */}
                <div className="rounded-[22px] bg-[#151022] p-4 border-0">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#12803b] flex items-center justify-center flex-shrink-0 border border-white/10">
                      <Landmark className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm sm:text-[15px] font-extrabold text-white leading-tight">
                        ธนาคารกสิกรไทย
                      </h4>
                      <p className="text-xs text-zinc-300 font-medium mt-0.5 truncate">
                        ชื่อบัญชี: บจก. ซีเอ็ม เทรดดิ้ง (ประเทศไทย)
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm sm:text-base font-black text-white font-mono tracking-wider">
                          090-0-00000-1
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyAccount("090-0-00000-1")}
                          className="p-1 rounded-lg hover:bg-white/10 text-[var(--brand)] hover:text-white transition-colors cursor-pointer border-0"
                          title="คัดลอกเลขบัญชี"
                        >
                          {copiedBank ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/[0.04] text-center">
                    <span className="text-[10px] text-zinc-500 font-medium">
                      * ข้อมูลบัญชีเป็นตัวอย่าง โอนตรงตามยอดและบัญชีที่ระบุเท่านั้น
                    </span>
                  </div>
                </div>

                {/* 3. ส่วนแนบสลิปการโอน */}
                <div>
                  <label className="text-xs sm:text-[13px] font-extrabold text-white mb-2 block">
                    แนบสลิปการโอน
                  </label>

                  <label
                    htmlFor="slip-upload-input"
                    className="relative rounded-[20px] bg-[#1a1429] hover:bg-[#201833] border-2 border-dashed border-[var(--brand)]/30 hover:border-purple-500/60 p-3.5 flex items-center justify-between cursor-pointer transition-all group"
                  >
                    <input
                      id="slip-upload-input"
                      type="file"
                      accept="image/*"
                      onChange={handleSlipUpload}
                      className="hidden"
                    />

                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[#251738] flex items-center justify-center text-[var(--brand)] group-hover:text-white transition-colors">
                        {attachedSlip ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <ImageIcon className="w-6 h-6" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <span className="text-xs sm:text-[13px] font-bold text-white block truncate">
                          {attachedSlip ? attachedSlip : "แตะเพื่อแนบสลิป"}
                        </span>
                        <span className="text-[10px] text-zinc-400 block truncate">
                          {attachedSlip ? "แนบไฟล์เรียบร้อยแล้ว (แตะเพื่อเปลี่ยน)" : "เลือกรูปภาพจากอุปกรณ์"}
                        </span>
                      </div>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-[#251838] group-hover:bg-[var(--brand)] text-white flex items-center justify-center flex-shrink-0 transition-colors">
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </label>

                  <span className="text-[10px] sm:text-[11px] font-medium text-zinc-400 mt-1.5 block">
                    แนบสลิปหลังโอนเงินเรียบร้อยแล้ว
                  </span>
                </div>

                {/* 4. Action Button: ยืนยันการฝากเงิน */}
                <div className="pt-2">
                  <button
                    type="button"
                    disabled={isSubmittingDeposit}
                    onClick={requestDepositConfirm}
                    className="w-full h-12 rounded-xl button-dark-purple flex items-center justify-center gap-2 text-[15px] font-extrabold cursor-pointer border-0 active:scale-98 disabled:opacity-60"
                  >
                    {isSubmittingDeposit ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>กำลังตรวจสอบ...</span>
                      </span>
                    ) : (
                      <span>ยืนยันการฝากเงิน</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: โปรโมชั่น (Turnover & Bonus Progress)              */}
        {/* ========================================================= */}
        {activeMainTab === "promo" && (
          <div className="flex-1 flex flex-col space-y-3.5">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#151022] border-0">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-[var(--brand)]" />
                <span className="text-xs sm:text-[13px] font-extrabold text-white">
                  รับโปรโมชั่นด้วยตนเอง
                </span>
              </div>
              <button
                type="button"
                onClick={() => alert("เปิดรายการเลือกโปรโมชั่นใหม่")}
                className="text-xs font-bold text-[var(--brand)] hover:text-white underline cursor-pointer border-0 bg-transparent"
              >
                เปลี่ยน
              </button>
            </div>

            <div className="rounded-[22px] bg-[#1a1429] p-4 border-0 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white">-</span>
                <span className="text-[var(--brand)] font-extrabold">เติมครั้งแรก</span>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/25 flex items-center gap-2 text-[11px] font-bold text-rose-300 text-center justify-center">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>ลูกค้าต้องทำตามเงื่อนไขที่กำหนดให้ครบถึงจะถอนได้</span>
              </div>

              <div className="space-y-2 pt-1 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-white font-extrabold">เงื่อนไขที่ 1</span>
                </div>

                <div className="flex items-center justify-between text-zinc-400">
                  <span>ยอดเทิร์นที่ต้องทำ</span>
                  <span className="font-mono font-bold text-white">฿0</span>
                </div>

                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-[var(--brand)] font-bold">ยอดเทิร์นปัจจุบัน</span>
                  <span className="font-mono font-bold text-[var(--brand)]">฿0 / ฿0</span>
                </div>

                <div className="flex items-center justify-between text-zinc-400">
                  <span>ต้องทำเทิร์นอีก</span>
                  <span className="font-mono font-bold text-white">฿0</span>
                </div>
              </div>

              <div className="pt-2 text-center text-[10px] text-zinc-400 font-medium">
                &gt;&gt;หมายเหตุ : นับเป็นจำนวนครั้งที่เดิมพัน&lt;&lt;
              </div>
            </div>

            <div className="pt-2 mt-auto">
              <button
                type="button"
                onClick={() => alert("เปิดหน้าต่างตั้งค่าและจัดการบัญชีธนาคาร")}
                className="w-full h-12 rounded-xl button-dark-purple flex items-center justify-center text-[15px] font-extrabold cursor-pointer border-0 active:scale-98"
              >
                <span>จัดการบัญชี</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: ประวัติ (History: Deposit & Withdraw)              */}
        {/* ========================================================= */}
        {activeMainTab === "history" && (
          <div className="flex-1 flex flex-col space-y-3.5">
            <div className="relative flex border-b border-white/[0.08] mb-1">
              <button
                type="button"
                onClick={() => setHistorySubTab("deposit-history")}
                className={`flex-1 py-2 text-center text-xs sm:text-sm font-extrabold transition-all cursor-pointer border-0 relative ${
                  historySubTab === "deposit-history"
                    ? "text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                ประวัติการฝาก
                {historySubTab === "deposit-history" && (
                  <span className="absolute bottom-0 inset-x-4 h-[2px] bg-[var(--brand)] rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setHistorySubTab("withdraw-history")}
                className={`flex-1 py-2 text-center text-xs sm:text-sm font-extrabold transition-all cursor-pointer border-0 relative ${
                  historySubTab === "withdraw-history"
                    ? "text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                ประวัติการถอน
                {historySubTab === "withdraw-history" && (
                  <span className="absolute bottom-0 inset-x-4 h-[2px] bg-[var(--brand)] rounded-full" />
                )}
              </button>
            </div>

            <div className="text-center text-[11px] font-bold text-zinc-400">
              ( 5 รายการล่าสุด )
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#151022] hover:bg-[#1c152d] transition-colors border-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#251838] flex items-center justify-center text-amber-400 border border-white/[0.04]">
                    <Coins className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-[13px] font-bold text-white block">
                      โอนแบบบัญชี
                    </span>
                    <span className="text-[10px] text-zinc-400 block font-mono">
                      23 ก.ย. พ.ศ. 2569 17:00
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs sm:text-sm font-black text-emerald-400 font-mono block">
                    ฿ 2,000.00
                  </span>
                  <span className="text-[9.5px] font-bold text-emerald-400/80">
                    สำเร็จ
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#151022] hover:bg-[#1c152d] transition-colors border-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#251838] flex items-center justify-center text-amber-400 border border-white/[0.04]">
                    <Coins className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-[13px] font-bold text-white block">
                      โอนแบบบัญชี
                    </span>
                    <span className="text-[10px] text-zinc-400 block font-mono">
                      23 มิ.ย. พ.ศ. 2569 11:22
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs sm:text-sm font-black text-emerald-400 font-mono block">
                    ฿ 100.00
                  </span>
                  <span className="text-[9.5px] font-bold text-emerald-400/80">
                    สำเร็จ
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 mt-auto">
              <button
                type="button"
                onClick={() => alert("เปิดหน้าต่างตั้งค่าและจัดการบัญชีธนาคาร")}
                className="w-full h-12 rounded-xl button-dark-purple flex items-center justify-center text-[15px] font-extrabold cursor-pointer border-0 active:scale-98"
              >
                <span>จัดการบัญชี</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

    <WalletConfirmDialog
      kind={confirmKind ?? "deposit"}
      amount={confirmKind === "withdraw" ? parsedWithdrawAmount : parsedDepositAmount}
      open={confirmKind !== null}
      loading={confirmKind === "deposit" ? isSubmittingDeposit : isSubmittingWithdraw}
      channelLabel={depositChannelLabel}
      onClose={() => {
        if (!isSubmittingDeposit && !isSubmittingWithdraw) setConfirmKind(null);
      }}
      onConfirm={() => {
        if (confirmKind === "deposit") handleConfirmDeposit();
        else if (confirmKind === "withdraw") handleConfirmWithdraw();
      }}
    />
    </>
  );
}
