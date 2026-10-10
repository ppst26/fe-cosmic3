"use client";

import { SubPageShell } from "@/components/layout/SubPageShell";
import { ProfileScreen } from "@/components/profile/ProfileScreen";

export default function ProfilePage() {
  return (
    <SubPageShell title="โปรไฟล์" requiresAuth sessionMode="none">
      <ProfileScreen />
    </SubPageShell>
  );
}
