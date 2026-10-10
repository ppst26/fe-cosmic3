"use client";

import { SubPageShell } from "@/components/layout/SubPageShell";
import { DailyCheckInPageContent } from "@/app/components/missions/DailyCheckInPageContent";
import { useT } from "@/lib/i18n/I18nProvider";

export default function CheckInPage() {
  const t = useT("rewards");
  return (
    <SubPageShell title={t("checkIn.title")}>
      <DailyCheckInPageContent />
    </SubPageShell>
  );
}
