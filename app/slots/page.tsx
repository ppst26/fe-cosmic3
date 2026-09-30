"use client";

import { CategoryLobby } from "@/components/games/CategoryLobby";
import { SubPageShell } from "@/components/layout/SubPageShell";

export default function SlotsPage() {
  return (
    <SubPageShell title="สล็อต">
      <CategoryLobby category="slots" title="สล็อต" />
    </SubPageShell>
  );
}
