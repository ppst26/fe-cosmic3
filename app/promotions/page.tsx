"use client";

import { SubPageShell } from "@/components/layout/SubPageShell";
import { PromotionsScreen } from "@/components/promotions/PromotionsScreen";

export default function PromotionsPage() {
  return (
    <SubPageShell title="โปรโมชั่น" nav="promo" sessionMode="default">
      <PromotionsScreen />
    </SubPageShell>
  );
}
