"use client";

import { LotteryHubContent } from "@/components/lottery/hub/LotteryHubContent";
import { SubPageShell } from "@/components/layout/SubPageShell";

export default function LotteryPage() {
  return (
    <SubPageShell title="หวย" sessionMode="default">
      <LotteryHubContent showPageHeading={false} />
    </SubPageShell>
  );
}
