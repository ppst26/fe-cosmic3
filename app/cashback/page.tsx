"use client";

import { SubPageShell } from "@/components/layout/SubPageShell";
import { CashbackScreen } from "@/components/cashback/CashbackScreen";

export default function CashbackPage() {
  return (
    <SubPageShell title="คืนยอด" requiresAuth>
      <CashbackScreen />
    </SubPageShell>
  );
}
