"use client";

import { useState } from "react";
import type { WalletSubTab, WalletTab } from "@/data/homeLobby";

type DialogFrameProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

function DialogFrame({ title, onClose, children }: DialogFrameProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-3 sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-md rounded-[var(--radius-soft-xl)] bg-[var(--soft-card-elevated)] p-4 shadow-[var(--shadow-soft)]"
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-[var(--text-on-light)]">{title}</h2>
          <button type="button" onClick={onClose} className="h-9 w-9 rounded-full bg-[var(--soft-card)] text-lg">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

type AuthMode = "login" | "register";

export function AuthDialog({
  mode,
  onClose,
  onSwitch,
}: {
  mode: AuthMode;
  onClose: () => void;
  onSwitch: (mode: AuthMode) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (mode === "register") {
      setMessage("สมัครสมาชิกจำลองสำเร็จ");
      return;
    }
    setPending(true);
    setMessage("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await response.json()) as { message?: string };
      setMessage(data.message ?? "เข้าสู่ระบบไม่สำเร็จ");
    } catch {
      setMessage("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้");
    } finally {
      setPending(false);
    }
  }

  return (
    <DialogFrame title={mode === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"} onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="บัญชีผู้ใช้ หรือ เบอร์โทรศัพท์"
          className="h-11 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card)] px-3 text-sm outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="รหัสผ่าน"
          className="h-11 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card)] px-3 text-sm outline-none"
        />
        <button type="submit" disabled={pending} className="soft-btn-primary h-11 w-full text-sm font-semibold">
          {pending ? "กำลังตรวจสอบ..." : mode === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
        </button>
        {message ? <p className="text-sm text-[var(--text-on-light)]">{message}</p> : null}
        <button
          type="button"
          className="w-full text-sm font-semibold text-[var(--brand)]"
          onClick={() => onSwitch(mode === "login" ? "register" : "login")}
        >
          {mode === "login" ? "ยังไม่มีบัญชี? สมัครสมาชิก" : "มีบัญชีแล้ว? เข้าสู่ระบบ"}
        </button>
      </form>
    </DialogFrame>
  );
}

export function WalletDialog({
  tab,
  subTab,
  onClose,
  onChange,
}: {
  tab: WalletTab;
  subTab: WalletSubTab;
  onClose: () => void;
  onChange: (next: { tab: WalletTab; subTab: WalletSubTab }) => void;
}) {
  return (
    <DialogFrame title="กระเป๋าเงิน" onClose={onClose}>
      <div className="mb-3 flex gap-2">
        {(
          [
            ["deposit-withdraw", "ฝาก/ถอน"],
            ["promo", "โปรโมชั่น"],
            ["history", "ประวัติ"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange({ tab: key, subTab })}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              tab === key ? "bg-[var(--brand)] text-white" : "bg-[var(--soft-card)] text-[var(--text-muted)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === "deposit-withdraw" ? (
        <div className="flex gap-2">
          {(["deposit", "withdraw"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => onChange({ tab, subTab: key })}
              className={`h-10 flex-1 rounded-[var(--radius-soft-sm)] text-sm font-semibold ${
                subTab === key ? "soft-btn-primary" : "bg-[var(--soft-card)] text-[var(--text-on-light)]"
              }`}
            >
              {key === "deposit" ? "ฝากเงิน" : "ถอนเงิน"}
            </button>
          ))}
        </div>
      ) : (
        <p className="rounded-[var(--radius-soft-md)] bg-[var(--soft-card)] p-3 text-sm text-[var(--text-muted)]">
          {tab === "promo" ? "รายการโปรโมชั่นที่รับได้จะแสดงที่นี่" : "ประวัติฝากถอนจะแสดงที่นี่"}
        </p>
      )}
    </DialogFrame>
  );
}

export function InfoDialog({
  title,
  message,
  onClose,
}: {
  title: string;
  message: string;
  onClose: () => void;
}) {
  return (
    <DialogFrame title={title} onClose={onClose}>
      <p className="text-sm text-[var(--text-on-light)]">{message}</p>
    </DialogFrame>
  );
}
