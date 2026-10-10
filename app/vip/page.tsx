"use client";

import { VipScreen } from "@/components/vip/VipScreen";
import { SubPageShell } from "@/components/layout/SubPageShell";

export default function VipPage() {
  return (
    <SubPageShell title="แรงค์ VIP" requiresAuth sessionMode="none">
      <VipScreen />
    </SubPageShell>
  );
}
