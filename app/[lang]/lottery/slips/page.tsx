"use client";

import { SubPageShell } from "@/components/layout/SubPageShell";
import { SlipListScreen } from "@/components/lottery/SlipListScreen";

export default function LotterySlipsPage() {
  return (
    <SubPageShell title="รายการโพย">
      <SlipListScreen />
    </SubPageShell>
  );
}
