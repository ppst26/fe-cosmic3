"use client";

import { SubPageShell } from "@/components/layout/SubPageShell";
import { WheelScreen } from "@/components/wheel/WheelScreen";

export default function WheelPage() {
  return (
    <SubPageShell title="วงล้อ" requiresAuth sessionMode="tickets">
      <WheelScreen />
    </SubPageShell>
  );
}
