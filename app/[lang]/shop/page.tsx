"use client";

import { SubPageShell } from "@/components/layout/SubPageShell";
import { GemsStorePageContent } from "@/app/components/gems-store/GemsStorePageContent";
import { useT } from "@/lib/i18n/I18nProvider";

export default function ShopPage() {
  const t = useT("rewards");
  return (
    <SubPageShell title={t("gemsStore.title")}>
      <GemsStorePageContent />
    </SubPageShell>
  );
}
