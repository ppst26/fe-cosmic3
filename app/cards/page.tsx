"use client";

import { CategoryLobby } from "@/components/games/CategoryLobby";
import { SubPageShell } from "@/components/layout/SubPageShell";

export default function CardsPage() {
  return (
    <SubPageShell title="ไพ่">
      <CategoryLobby category="cards" title="ไพ่" />
    </SubPageShell>
  );
}
