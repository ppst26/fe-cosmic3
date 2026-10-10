"use client";

import { SubPageShell } from "@/components/layout/SubPageShell";
import { ProfileAccountPageContent } from "@/app/components/profile/ProfileAccountPageContent";
import { useT } from "@/lib/i18n/I18nProvider";

/** หน้าข้อมูลบัญชี — protected โดย proxy (lib/auth/protectedPaths.ts) */
export default function ProfileAccountPage() {
  const t = useT("profile");
  return (
    <SubPageShell title={t("account.title")}>
      <ProfileAccountPageContent />
    </SubPageShell>
  );
}
