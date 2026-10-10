"use client";

import { SubPageShell } from "@/components/layout/SubPageShell";
import { TransactionsScreen } from "@/components/transactions/TransactionsScreen";

export default function TransactionsPage() {
  return (
    <SubPageShell title="ประวัติธุรกรรม" requiresAuth>
      <TransactionsScreen />
    </SubPageShell>
  );
}
