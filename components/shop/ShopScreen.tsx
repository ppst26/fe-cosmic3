"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { SHOP_PACKAGES } from "@/data/member";
import { SHOP_TERMS } from "@/data/shopTerms";

export function ShopScreen() {
  const { state, dispatch } = useAuth();
  const [message, setMessage] = useState("");
  const [termsOpen, setTermsOpen] = useState(false);

  function handleRedeem(cost: number, credits: number) {
    if (state.diamonds < cost) {
      setMessage("เพชรไม่พอ");
      return;
    }
    if (state.shopRedeemsToday >= 3) {
      setMessage("ใช้โควตาแลกรายวันครบ 3/3 แล้ว");
      return;
    }
    dispatch({ type: "redeemShop", cost, credits });
    setMessage(`แลกเครดิต ${credits} สำเร็จ`);
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-[var(--text-muted)]">
        เพชรคงเหลือ {state.diamonds.toLocaleString("th-TH")} · โควตาวันนี้{" "}
        {state.shopRedeemsToday}/3
      </p>

      <button
        type="button"
        onClick={() => setTermsOpen((open) => !open)}
        className="h-10 w-full rounded-[var(--radius-soft-sm)] bg-[var(--soft-card)] text-sm font-semibold text-[var(--text-on-light)]"
      >
        {termsOpen ? "ซ่อนเงื่อนไข" : "ดูเงื่อนไขการแลก"}
      </button>
      {termsOpen ? (
        <p className="soft-panel p-3 text-sm text-[var(--text-muted)]">{SHOP_TERMS}</p>
      ) : null}

      <ul className="grid grid-cols-2 gap-2">
        {SHOP_PACKAGES.map((pack) => (
          <li key={pack.id}>
            <button
              type="button"
              onClick={() => handleRedeem(pack.cost, pack.credits)}
              className="soft-card min-h-10 w-full p-3 text-left text-sm"
            >
              <p className="font-bold">{pack.credits} เครดิต</p>
              <p className="text-[var(--text-muted)]">
                {pack.cost.toLocaleString("th-TH")} เพชร
              </p>
              {pack.popular ? (
                <p className="text-xs font-semibold text-[var(--brand)]">ยอดนิยม</p>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      {message ? <p className="text-sm text-[var(--brand)]">{message}</p> : null}
    </div>
  );
}
