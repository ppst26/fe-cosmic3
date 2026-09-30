"use client";

import { CategoryLobby } from "@/components/games/CategoryLobby";
import { SubPageShell } from "@/components/layout/SubPageShell";

export default function FishingPage() {
  return (
    <SubPageShell title="ยิงปลา">
      <CategoryLobby category="fishing" title="ยิงปลา" />
    </SubPageShell>
  );
}
