"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { SubPageShell } from "@/components/layout/SubPageShell";
import { DEPOSIT_AMOUNTS, DEPOSIT_CHANNELS, MEMBER, WALLET_HISTORY } from "@/data/member";
import { PROMOTIONS } from "@/data/homeLobby";

type MainTab = "deposit-withdraw" | "promo" | "history";
type ActionTab = "deposit" | "withdraw";
type Channel = (typeof DEPOSIT_CHANNELS)[number]["id"];

function WalletScreen() {
  const params = useSearchParams();
  const initial = params.get("tab");
  const [mainTab, setMainTab] = useState<MainTab>(
    initial === "promo" || initial === "history" ? initial : "deposit-withdraw",
  );
  const [action, setAction] = useState<ActionTab>(params.get("sub") === "withdraw" ? "withdraw" : "deposit");
  const [channel, setChannel] = useState<Channel>("bank");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [balance, setBalance] = useState(MEMBER.balance);
  const [message, setMessage] = useState("");
  const [historyFilter, setHistoryFilter] = useState<"deposit" | "withdraw">("deposit");

  const history = useMemo(
    () => WALLET_HISTORY.filter((item) => item.type === historyFilter),
    [historyFilter],
  );

  return (
    <SubPageShell title="ฝาก-ถอน" nav="wallet">
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
            onClick={() => setMainTab(key)}
            className={`h-10 flex-1 rounded-full text-xs font-semibold ${
              mainTab === key ? "bg-[var(--brand)] text-white" : "bg-[var(--soft-card-elevated)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mainTab === "deposit-withdraw" ? (
        <section className="space-y-3">
          <p className="text-sm text-[var(--text-muted)]">
            ยอดคงเหลือ {balance.toLocaleString("th-TH")} บาท
          </p>
          {step === 1 ? (
            <div className="grid grid-cols-2 gap-2">
              {(["deposit", "withdraw"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setAction(key)}
                  className={`h-10 rounded-[var(--radius-soft-sm)] text-sm font-semibold ${
                    action === key ? "soft-btn-primary" : "bg-[var(--soft-card-elevated)]"
                  }`}
                >
                  {key === "deposit" ? "ฝาก" : "ถอน"}
                </button>
              ))}
            </div>
          ) : null}

          {action === "deposit" && step === 1 ? (
            <>
              <div className="grid grid-cols-3 gap-2">
                {DEPOSIT_CHANNELS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setChannel(item.id)}
                    className={`rounded-[var(--radius-soft-md)] px-2 py-3 text-xs font-semibold ${
                      channel === item.id
                        ? "bg-[var(--brand-soft)] text-[var(--brand)]"
                        : "bg-[var(--soft-card-elevated)]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {DEPOSIT_AMOUNTS.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAmount(value)}
                    className="h-10 rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] text-sm font-semibold"
                  >
                    ฿{Number(value).toLocaleString("th-TH")}
                  </button>
                ))}
              </div>
              <input
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="ระบุจำนวนเงิน ขั้นต่ำ 100"
                className="h-11 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] px-3 outline-none"
              />
              <button
                type="button"
                className="soft-btn-primary h-11 w-full text-sm font-semibold"
                onClick={() => {
                  if (!amount || Number(amount) < 100) {
                    setMessage("กรุณาระบุจำนวนเงินอย่างน้อย 100 บาท");
                    return;
                  }
                  setMessage("");
                  setStep(2);
                }}
              >
                ขั้นตอนถัดไป (ยืนยันการฝาก)
              </button>
            </>
          ) : null}

          {action === "deposit" && step === 2 ? (
            <div className="soft-panel space-y-3 p-4 text-sm">
              <p>ช่องทาง: {DEPOSIT_CHANNELS.find((item) => item.id === channel)?.label}</p>
              <p>จำนวน: {Number(amount).toLocaleString("th-TH")} บาท</p>
              <p className="text-[var(--text-muted)]">แนบสลิปในขั้นนี้เป็นข้อมูลจำลอง</p>
              <button
                type="button"
                className="soft-btn-primary h-11 w-full text-sm font-semibold"
                onClick={() => {
                  setBalance((value) => value + Number(amount));
                  setMessage("ยืนยันการฝากเงินแล้ว รอระบบตรวจสอบสลิป");
                  setStep(1);
                  setAmount("");
                }}
              >
                ยืนยันการฝากเงิน
              </button>
              <button type="button" className="w-full text-sm" onClick={() => setStep(1)}>
                กลับไปแก้จำนวน
              </button>
            </div>
          ) : null}

          {action === "withdraw" ? (
            <form
              className="space-y-3"
              onSubmit={(event) => {
                event.preventDefault();
                const value = Number(amount);
                if (!value) {
                  setMessage("กรุณาระบุจำนวนเงินที่ต้องการถอน");
                  return;
                }
                if (value > balance) {
                  setMessage("ยอดเงินในบัญชีไม่เพียงพอสำหรับการถอน");
                  return;
                }
                setBalance((current) => current - value);
                setMessage("ส่งคำขอถอนสำเร็จ เงินเข้าบัญชีใน 30 วิ");
                setAmount("");
              }}
            >
              <input
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="จำนวนเงินที่ต้องการถอน"
                className="h-11 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card-elevated)] px-3 outline-none"
              />
              <button
                type="button"
                className="text-sm font-semibold text-[var(--brand)]"
                onClick={() => setAmount(String(balance))}
              >
                ถอนทั้งหมด ({balance.toLocaleString("th-TH")})
              </button>
              <button type="submit" className="soft-btn-primary h-11 w-full text-sm font-semibold">
                ยืนยันถอนเงิน
              </button>
            </form>
          ) : null}
        </section>
      ) : null}

      {mainTab === "promo" ? (
        <ul className="space-y-2">
          {PROMOTIONS.map((promo) => (
            <li key={promo.id} className="soft-card p-3 text-sm">
              <p className="font-semibold">{promo.title}</p>
              <p className="text-[var(--text-muted)]">{promo.desc}</p>
            </li>
          ))}
        </ul>
      ) : null}

      {mainTab === "history" ? (
        <section>
          <div className="mb-2 grid grid-cols-2 gap-2">
            {(["deposit", "withdraw"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setHistoryFilter(key)}
                className={`h-10 rounded-full text-sm font-semibold ${
                  historyFilter === key ? "bg-[var(--brand)] text-white" : "bg-[var(--soft-card-elevated)]"
                }`}
              >
                {key === "deposit" ? "ประวัติการฝาก" : "ประวัติการถอน"}
              </button>
            ))}
          </div>
          <ul className="space-y-2">
            {history.map((item) => (
              <li key={item.id} className="soft-card flex justify-between p-3 text-sm">
                <span>
                  {item.amount.toLocaleString("th-TH")} บาท
                  <span className="block text-xs text-[var(--text-muted)]">{item.at}</span>
                </span>
                <span>{item.status}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {message ? <p className="mt-3 text-sm text-[var(--brand)]">{message}</p> : null}
    </SubPageShell>
  );
}

export default function WalletPage() {
  return (
    <Suspense fallback={<SubPageShell title="ฝาก-ถอน" nav="wallet">กำลังโหลด</SubPageShell>}>
      <WalletScreen />
    </Suspense>
  );
}
