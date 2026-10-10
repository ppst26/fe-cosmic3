"use client";

import { SubPageShell } from "@/components/layout/SubPageShell";
import { ReferralPageContent } from "@/app/components/referral/ReferralPageContent";
import { useAuth } from "@/app/components/auth/AuthProvider";
import { useProfile } from "@/app/hooks/api/account";
import { useT } from "@/lib/i18n/I18nProvider";

export default function ReferralPage() {
  const { isAuthenticated } = useAuth();
  const t = useT("referral");
  const { data: profile } = useProfile();
  /** รหัสชวนเพื่อน = memberId ของผู้ใช้ที่ login · ไม่มีให้ ReferralPageContent ใช้ refCode จาก overview */
  const refCode = isAuthenticated ? profile?.memberId : undefined;

  return (
    <SubPageShell title={t("pageTitle")}>
      <ReferralPageContent refCode={refCode} />
    </SubPageShell>
  );
}
