"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { BANKS, MEMBER } from "@/data/member";
import {
  BANK_ACCOUNT_MAX_DIGITS,
  bankAccountError,
  digitsOnly,
  passwordError,
} from "@/lib/fieldRules";

type ProfileTab = "info" | "bank" | "password";

const TABS: { key: ProfileTab; label: string }[] = [
  { key: "info", label: "ข้อมูลส่วนตัว" },
  { key: "bank", label: "บัญชีธนาคาร" },
  { key: "password", label: "รหัสผ่าน" },
];

const inputClass =
  "mt-1 h-11 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] px-3 text-sm outline-none";

export function ProfileScreen() {
  const { state, dispatch } = useAuth();
  const [tab, setTab] = useState<ProfileTab>("info");
  const [message, setMessage] = useState("");

  const [profileDraft, setProfileDraft] = useState<{
    lineId: string;
    birthDate: string;
  } | null>(null);

  const lineId = profileDraft?.lineId ?? state.lineId;
  const birthDate = profileDraft?.birthDate ?? state.birthDate;

  const [bankCode, setBankCode] = useState<(typeof BANKS)[number]["code"]>("kbank");
  const [accountNumber, setAccountNumber] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const accountErr = accountNumber ? bankAccountError(accountNumber) : null;

  function handleSaveProfile() {
    dispatch({ type: "updateProfile", lineId, birthDate });
    setProfileDraft(null);
    setMessage("บันทึกข้อมูลแล้ว");
  }

  function handleAddBank(event: React.FormEvent) {
    event.preventDefault();
    const err = bankAccountError(accountNumber);
    if (err) {
      setMessage(err);
      return;
    }
    const bank = BANKS.find((item) => item.code === bankCode);
    dispatch({
      type: "addBank",
      bank: {
        id: `b-${Date.now()}`,
        bankName: bank?.name ?? bankCode,
        accountNumber,
        accountHolder: state.displayName,
        primary: false,
        status: "pending",
      },
    });
    setAccountNumber("");
    setMessage("ส่งบัญชีใหม่รอตรวจสอบแล้ว");
  }

  function handleChangePassword(event: React.FormEvent) {
    event.preventDefault();
    if (currentPassword !== state.password) {
      setMessage("รหัสผ่านปัจจุบันไม่ถูกต้อง");
      return;
    }
    const nextErr = passwordError(nextPassword);
    if (nextErr) {
      setMessage(nextErr);
      return;
    }
    if (nextPassword !== confirmPassword) {
      setMessage("รหัสผ่านไม่ตรงกัน");
      return;
    }
    dispatch({ type: "changePassword", password: nextPassword });
    setCurrentPassword("");
    setNextPassword("");
    setConfirmPassword("");
    setMessage("เปลี่ยนรหัสแล้ว");
  }

  function handleLogout() {
    dispatch({ type: "logout" });
    setMessage("ออกจากระบบแล้ว");
  }

  if (!state.isAuthenticated) {
    return null;
  }

  return (
    <div className="space-y-3">
      <section className="soft-panel p-4">
        <p className="text-lg font-bold text-[var(--text-on-light)]">{state.displayName}</p>
        <p className="text-sm text-[var(--text-muted)]">
          {state.username ? `${state.username} · ` : null}
          {state.phone}
        </p>
        <p className="mt-2 text-sm font-semibold text-[var(--brand)]">
          คงเหลือ {state.balance.toLocaleString("th-TH")} บาท · {MEMBER.vipTier}
        </p>
      </section>

      <div className="grid grid-cols-3 gap-2">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setTab(key);
              setMessage("");
            }}
            className={`h-10 rounded-[var(--radius-soft-sm)] text-xs font-semibold sm:text-sm ${
              tab === key
                ? "soft-btn-primary"
                : "bg-[var(--soft-card)] text-[var(--text-on-light)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "info" ? (
        <section className="soft-panel space-y-3 p-4">
          <label className="block text-sm">
            LINE ID
            <input
              value={lineId}
              onChange={(event) =>
                setProfileDraft({ lineId: event.target.value, birthDate })
              }
              className={inputClass}
            />
          </label>
          <label className="block text-sm">
            วันเกิด
            <input
              type="date"
              value={birthDate}
              onChange={(event) =>
                setProfileDraft({ lineId, birthDate: event.target.value })
              }
              className={inputClass}
            />
          </label>
          <button
            type="button"
            onClick={handleSaveProfile}
            className="soft-btn-primary h-10 w-full text-sm font-semibold"
          >
            บันทึก
          </button>
        </section>
      ) : null}

      {tab === "bank" ? (
        <section className="space-y-2">
          {state.banks.map((account) => (
            <article key={account.id} className="soft-card p-3 text-sm">
              <p className="font-semibold">{account.bankName}</p>
              <p className="font-mono">{account.accountNumber}</p>
              <p className="text-[var(--text-muted)]">
                {account.accountHolder} · {account.status === "verified" ? "ยืนยันแล้ว" : "รอตรวจ"}
                {account.primary && account.status === "verified" ? " · บัญชีหลัก" : ""}
              </p>
              {!account.primary ? (
                <button
                  type="button"
                  className="mt-2 h-10 text-xs font-semibold text-[var(--brand)]"
                  onClick={() => {
                    dispatch({ type: "setPrimaryBank", id: account.id });
                    setMessage("ตั้งเป็นบัญชีหลักแล้ว");
                  }}
                >
                  ตั้งเป็นบัญชีหลัก
                </button>
              ) : null}
            </article>
          ))}
          <form className="soft-panel space-y-2 p-3" onSubmit={handleAddBank}>
            <select
              value={bankCode}
              onChange={(event) =>
                setBankCode(event.target.value as (typeof BANKS)[number]["code"])
              }
              className="h-11 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] px-3 text-sm"
            >
              {BANKS.map((bank) => (
                <option key={bank.code} value={bank.code}>
                  {bank.name}
                </option>
              ))}
            </select>
            <input
              value={accountNumber}
              onChange={(event) =>
                setAccountNumber(digitsOnly(event.target.value, BANK_ACCOUNT_MAX_DIGITS))
              }
              placeholder="เลขบัญชี"
              inputMode="numeric"
              className="h-11 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] px-3 text-sm outline-none"
            />
            {accountErr ? (
              <p className="text-sm text-[var(--text-on-light)]">{accountErr}</p>
            ) : null}
            <button
              type="submit"
              disabled={!!accountErr || !accountNumber}
              className="soft-btn-primary h-10 w-full text-sm font-semibold disabled:opacity-50"
            >
              เพิ่มบัญชี
            </button>
          </form>
        </section>
      ) : null}

      {tab === "password" ? (
        <form className="soft-panel space-y-3 p-4" onSubmit={handleChangePassword}>
          <label className="block text-sm">
            รหัสผ่านปัจจุบัน
            <input
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className={inputClass}
              autoComplete="current-password"
            />
          </label>
          <label className="block text-sm">
            รหัสผ่านใหม่
            <input
              type="password"
              value={nextPassword}
              onChange={(event) => setNextPassword(event.target.value)}
              className={inputClass}
              autoComplete="new-password"
            />
          </label>
          <label className="block text-sm">
            ยืนยันรหัสผ่านใหม่
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className={inputClass}
              autoComplete="new-password"
            />
          </label>
          <button type="submit" className="soft-btn-primary h-10 w-full text-sm font-semibold">
            เปลี่ยนรหัสผ่าน
          </button>
        </form>
      ) : null}

      <button
        type="button"
        onClick={handleLogout}
        className="soft-btn-outline h-10 w-full text-sm font-semibold"
      >
        ออกจากระบบ
      </button>

      {message ? <p className="text-sm font-semibold text-[var(--brand)]">{message}</p> : null}
    </div>
  );
}
