"use client";

import { ShopScreen } from "@/components/shop/ShopScreen";
import { SubPageShell } from "@/components/layout/SubPageShell";

export default function ShopPage() {
  return (
    <SubPageShell title="ร้านแลกเพชร" requiresAuth sessionMode="gems">
      <ShopScreen />
    </SubPageShell>
  );
}
