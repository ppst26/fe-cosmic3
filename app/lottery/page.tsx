"use client";

import { LotteryHub } from "@/components/lottery/LotteryHub";
import { SubPageShell } from "@/components/layout/SubPageShell";

export default function LotteryPage() {
  return (
    <SubPageShell title="หวย">
      <LotteryHub />
    </SubPageShell>
  );
}
