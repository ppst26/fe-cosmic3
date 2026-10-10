"use client";

import { SubPageShell } from "@/components/layout/SubPageShell";
import { ReferralScreen } from "@/components/referral/ReferralScreen";

export default function ReferralPage() {
  return (
    <SubPageShell title="ชวนเพื่อน" requiresAuth sessionMode="referral">
      <ReferralScreen />
    </SubPageShell>
  );
}
