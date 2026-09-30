"use client";

import Link from "next/link";
import { useState } from "react";
import { SubPageShell } from "@/components/layout/SubPageShell";
import { BANKS, MEMBER, MEMBER_LINKS, REFERRAL_LINK } from "@/data/member";

type BankAccount = {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  primary: boolean;
  status: "verified" | "pending";
};

export default function ProfilePage() {
  const [tab, setTab] = useState<"info" | "bank">("info");
  const [lineId, setLineId] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [copied, setCopied] = useState("");
  const [notice, setNotice] = useState("");
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: "b1",
      bankName: "ธนาคาร กรุงไทย",
      accountNumber: "661-3-71722-3",
      accountHolder: "-",
      primary: false,
      status: "pending",
    },
    {
      id: "b2",
      bankName: "ธนาคาร ไทยพาณิชย์",
      accountNumber: "091-0-17077-8",
      accountHolder: MEMBER.displayName,
      primary: true,
      status: "verified",
    },
  ]);
  const [bankCode, setBankCode] = useState<(typeof BANKS)[number]["code"]>("kbank");
  const [accountNumber, setAccountNumber] = useState("");

  function copy(value: string, key: string) {
    void navigator.clipboard?.writeText(value);
    setCopied(key);
    setNotice("คัดลอกแล้ว");
  }

  return (
    <SubPageShell title="โปรไฟล์">
      <section className="soft-panel p-4">
        <p className="text-lg font-bold text-[var(--text-on-light)]">{MEMBER.displayName}</p>
        <p className="text-sm text-[var(--text-muted)]">
          {MEMBER.username} · {MEMBER.phone}
        </p>
        <p className="mt-2 text-sm font-semibold text-[var(--brand)]">
          คงเหลือ {MEMBER.balance.toLocaleString("th-TH")} บาท · {MEMBER.vipTier}
        </p>
      </section>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {(["info", "bank"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`h-10 rounded-full text-sm font-semibold ${
              tab === key ? "bg-[var(--brand)] text-white" : "bg-[var(--soft-card-elevated)] text-[var(--text-muted)]"
            }`}
          >
            {key === "info" ? "ข้อมูลส่วนตัว" : "บัญชีธนาคาร"}
          </button>
        ))}
      </div>

      {tab === "info" ? (
        <section className="mt-3 space-y-3">
          <label className="block text-sm">
            LINE ID
            <input
              value={lineId}
              onChange={(event) => setLineId(event.target.value)}
              className="mt-1 h-11 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] px-3 outline-none"
            />
          </label>
          <label className="block text-sm">
            วันเกิด
            <input
              type="date"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              className="mt-1 h-11 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] px-3 outline-none"
            />
          </label>
          <button
            type="button"
            onClick={() => setNotice("บันทึกรหัสผ่านและ PIN แล้ว")}
            className="soft-btn-outline h-11 w-full text-sm font-semibold"
          >
            เปลี่ยนรหัสผ่าน / PIN
          </button>
          <div className="soft-panel space-y-2 p-3 text-sm">
            <p>รหัสชวนเพื่อน: {MEMBER.refCode}</p>
            <p className="truncate text-[var(--text-muted)]">{REFERRAL_LINK}</p>
            <button
              type="button"
              onClick={() => copy(REFERRAL_LINK, "ref")}
              className="soft-btn-primary h-10 w-full text-sm font-semibold"
            >
              {copied === "ref" ? "คัดลอกแล้ว" : "คัดลอกลิงก์ชวนเพื่อน"}
            </button>
            <Link href="/referral" className="block text-center text-sm font-semibold text-[var(--brand)]">
              ดูรายงานและถอนรายได้เครือข่าย
            </Link>
          </div>
        </section>
      ) : (
        <section className="mt-3 space-y-2">
          {accounts.map((account) => (
            <article key={account.id} className="soft-card p-3 text-sm">
              <p className="font-semibold">{account.bankName}</p>
              <p className="font-mono">{account.accountNumber}</p>
              <p className="text-[var(--text-muted)]">
                {account.accountHolder} · {account.status === "verified" ? "ยืนยันแล้ว" : "รอตรวจ"}
                {account.primary ? " · บัญชีหลัก" : ""}
              </p>
              {!account.primary ? (
                <button
                  type="button"
                  className="mt-2 text-xs font-semibold text-[var(--brand)]"
                  onClick={() =>
                    setAccounts((list) =>
                      list.map((item) => ({ ...item, primary: item.id === account.id })),
                    )
                  }
                >
                  ตั้งเป็นบัญชีหลัก
                </button>
              ) : null}
            </article>
          ))}
          <form
            className="soft-panel space-y-2 p-3"
            onSubmit={(event) => {
              event.preventDefault();
              if (!accountNumber) return;
              const bank = BANKS.find((item) => item.code === bankCode);
              setAccounts((list) => [
                ...list,
                {
                  id: `b-${Date.now()}`,
                  bankName: bank?.name ?? bankCode,
                  accountNumber,
                  accountHolder: MEMBER.displayName,
                  primary: false,
                  status: "pending",
                },
              ]);
              setAccountNumber("");
              setNotice("ส่งบัญชีใหม่รอตรวจสอบแล้ว");
            }}
          >
            <select
              value={bankCode}
              onChange={(event) => setBankCode(event.target.value as typeof bankCode)}
              className="h-11 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] px-3"
            >
              {BANKS.map((bank) => (
                <option key={bank.code} value={bank.code}>
                  {bank.name}
                </option>
              ))}
            </select>
            <input
              value={accountNumber}
              onChange={(event) => setAccountNumber(event.target.value)}
              placeholder="เลขบัญชี"
              className="h-11 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] px-3 outline-none"
            />
            <button type="submit" className="soft-btn-primary h-11 w-full text-sm font-semibold">
              เพิ่มบัญชี
            </button>
          </form>
        </section>
      )}

      <ul className="mt-4 grid grid-cols-3 gap-2">
        {MEMBER_LINKS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="soft-card flex h-16 flex-col items-center justify-center text-center text-[11px] font-semibold"
            >
              <span aria-hidden>{item.emoji}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      {notice ? <p className="mt-3 text-sm text-[var(--brand)]">{notice}</p> : null}
    </SubPageShell>
  );
}
