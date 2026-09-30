"use client";

import { useState } from "react";
import { SubPageShell } from "@/components/layout/SubPageShell";
import { MEMBER, SHOP_PACKAGES } from "@/data/member";

export default function ShopPage() {
  const [diamonds, setDiamonds] = useState(MEMBER.diamonds);
  const [daily, setDaily] = useState(1);
  const [message, setMessage] = useState("");

  return (
    <SubPageShell title="ร้านแลกเพชร">
      <p className="mb-3 text-sm">
        เพชรคงเหลือ {diamonds.toLocaleString("th-TH")} · โควตาวันนี้ {daily}/3
      </p>
      <ul className="grid grid-cols-2 gap-2">
        {SHOP_PACKAGES.map((pack) => (
          <li key={pack.id}>
            <button
              type="button"
              onClick={() => {
                if (diamonds < pack.cost) {
                  setMessage("เพชรไม่พอ");
                  return;
                }
                if (daily >= 3) {
                  setMessage("ใช้โควตาแลกรายวันครบ 3/3 แล้ว");
                  return;
                }
                setDiamonds((value) => value - pack.cost);
                setDaily((value) => value + 1);
                setMessage(`แลกเครดิต ${pack.credits} สำเร็จ`);
              }}
              className="soft-card w-full p-3 text-left text-sm"
            >
              <p className="font-bold">{pack.credits} เครดิต</p>
              <p className="text-[var(--text-muted)]">{pack.cost.toLocaleString("th-TH")} เพชร</p>
              {pack.popular ? <p className="text-xs font-semibold text-[var(--brand)]">ยอดนิยม</p> : null}
            </button>
          </li>
        ))}
      </ul>
      {message ? <p className="mt-3 text-sm text-[var(--brand)]">{message}</p> : null}
    </SubPageShell>
  );
}
