"use client";

import { useState } from "react";
import { useMember } from "@/components/member/MemberProvider";
import { SheetFrame } from "@/components/wallet/SheetFrame";
import { BANKS } from "@/data/member";
import { SIGNUP_CHANNELS } from "@/data/signup";
import {
  BANK_ACCOUNT_MAX_DIGITS,
  bankAccountError,
  digitsOnly,
  passwordError,
  personNameError,
  phoneError,
  PHONE_DIGIT_LENGTH,
} from "@/lib/fieldRules";

const inputClass =
  "h-11 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card)] px-3 text-sm outline-none";

type AuthMode = "login" | "register";

export function AuthSheet({
  mode,
  onClose,
  onSwitch,
}: {
  mode: AuthMode;
  onClose: () => void;
  onSwitch: (mode: AuthMode) => void;
}) {
  const { dispatch } = useMember();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [channel, setChannel] = useState("");

  function switchMode(next: AuthMode) {
    setMessage("");
    setStep(1);
    onSwitch(next);
  }

  async function submitLogin(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await response.json()) as {
        message?: string;
        user?: { username?: string };
      };
      if (response.ok) {
        const loginUsername = data.user?.username ?? username;
        dispatch({ type: "loginSuccess", username: loginUsername });
        onClose();
        return;
      }
      setMessage(data.message ?? "เข้าสู่ระบบไม่สำเร็จ");
    } catch {
      setMessage("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้");
    } finally {
      setPending(false);
    }
  }

  function continueRegisterStep1(event: React.FormEvent) {
    event.preventDefault();
    const phoneMsg = phoneError(phone);
    const passwordMsg = passwordError(regPassword);
    if (phoneMsg) {
      setMessage(phoneMsg);
      return;
    }
    if (passwordMsg) {
      setMessage(passwordMsg);
      return;
    }
    if (regPassword !== confirmPassword) {
      setMessage("รหัสผ่านไม่ตรงกัน");
      return;
    }
    setMessage("");
    setStep(2);
  }

  function submitRegister(event: React.FormEvent) {
    event.preventDefault();
    const firstMsg = personNameError(firstName);
    const lastMsg = personNameError(lastName);
    const accountMsg = bankAccountError(accountNumber);
    if (firstMsg) {
      setMessage(firstMsg);
      return;
    }
    if (lastMsg) {
      setMessage(lastMsg);
      return;
    }
    if (accountMsg) {
      setMessage(accountMsg);
      return;
    }
    if (!channel) {
      setMessage("กรุณาเลือกช่องทาง");
      return;
    }
    if (!bankCode) {
      setMessage("กรุณาเลือกธนาคาร");
      return;
    }
    const displayName = `${firstName.trim()} ${lastName.trim()}`;
    dispatch({ type: "signUp", displayName, phone, password: regPassword });
    onClose();
  }

  const title = mode === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิก";

  return (
    <SheetFrame title={title} onClose={onClose}>
      {mode === "login" ? (
        <form onSubmit={submitLogin} className="space-y-3">
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="บัญชีผู้ใช้ หรือ เบอร์โทรศัพท์"
            className={inputClass}
            autoComplete="username"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="รหัสผ่าน"
            className={inputClass}
            autoComplete="current-password"
          />
          <button
            type="submit"
            disabled={pending}
            className="soft-btn-primary h-11 w-full text-sm font-semibold"
          >
            {pending ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
          </button>
          {message ? <p className="text-sm text-[var(--text-on-light)]">{message}</p> : null}
          <button
            type="button"
            className="w-full text-sm font-semibold text-[var(--brand)]"
            onClick={() => switchMode("register")}
          >
            ยังไม่มีบัญชี? สมัครสมาชิก
          </button>
        </form>
      ) : step === 1 ? (
        <form onSubmit={continueRegisterStep1} className="space-y-3">
          <input
            value={phone}
            onChange={(event) => setPhone(digitsOnly(event.target.value, PHONE_DIGIT_LENGTH))}
            placeholder="เบอร์โทรศัพท์"
            inputMode="numeric"
            className={inputClass}
            autoComplete="tel"
          />
          <input
            type="password"
            value={regPassword}
            onChange={(event) => setRegPassword(event.target.value)}
            placeholder="รหัสผ่าน"
            className={inputClass}
            autoComplete="new-password"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="ยืนยันรหัสผ่าน"
            className={inputClass}
            autoComplete="new-password"
          />
          <button type="submit" className="soft-btn-primary h-11 w-full text-sm font-semibold">
            ถัดไป
          </button>
          {message ? <p className="text-sm text-[var(--text-on-light)]">{message}</p> : null}
          <button
            type="button"
            className="w-full text-sm font-semibold text-[var(--brand)]"
            onClick={() => switchMode("login")}
          >
            มีบัญชีแล้ว? เข้าสู่ระบบ
          </button>
        </form>
      ) : (
        <form onSubmit={submitRegister} className="space-y-3">
          <input
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="ชื่อ"
            className={inputClass}
            autoComplete="given-name"
          />
          <input
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="นามสกุล"
            className={inputClass}
            autoComplete="family-name"
          />
          <select
            value={bankCode}
            onChange={(event) => setBankCode(event.target.value)}
            className={inputClass}
          >
            <option value="">เลือกธนาคาร</option>
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
            className={inputClass}
          />
          <select
            value={channel}
            onChange={(event) => setChannel(event.target.value)}
            className={inputClass}
          >
            <option value="">ช่องทางที่รู้จักเรา</option>
            {SIGNUP_CHANNELS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setMessage("");
                setStep(1);
              }}
              className="soft-btn-outline h-11 flex-1 text-sm font-semibold"
            >
              ย้อนกลับ
            </button>
            <button type="submit" className="soft-btn-primary h-11 flex-1 text-sm font-semibold">
              สมัครสมาชิก
            </button>
          </div>
          {message ? <p className="text-sm text-[var(--text-on-light)]">{message}</p> : null}
          <button
            type="button"
            className="w-full text-sm font-semibold text-[var(--brand)]"
            onClick={() => switchMode("login")}
          >
            มีบัญชีแล้ว? เข้าสู่ระบบ
          </button>
        </form>
      )}
    </SheetFrame>
  );
}
