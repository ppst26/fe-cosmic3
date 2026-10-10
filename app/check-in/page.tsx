"use client";

import { CheckInScreen } from "@/components/check-in/CheckInScreen";
import { SubPageShell } from "@/components/layout/SubPageShell";

export default function CheckInPage() {
  return (
    <SubPageShell title="เช็คอินรายวัน" requiresAuth sessionMode="gems">
      <CheckInScreen />
    </SubPageShell>
  );
}
