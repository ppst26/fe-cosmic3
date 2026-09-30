"use client";

import { CategoryLobby } from "@/components/games/CategoryLobby";
import { SubPageShell } from "@/components/layout/SubPageShell";

export default function CasinoPage() {
  return (
    <SubPageShell title="คาสิโน">
      <CategoryLobby category="casino" title="คาสิโน" />
    </SubPageShell>
  );
}
