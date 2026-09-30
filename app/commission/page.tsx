"use client";

import { SubPageShell } from "@/components/layout/SubPageShell";
import { CommissionScreen } from "@/components/commission/CommissionScreen";

export default function CommissionPage() {
  return (
    <SubPageShell title="คอมมิชชั่น">
      <CommissionScreen />
    </SubPageShell>
  );
}
