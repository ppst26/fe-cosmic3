"use client";

import { CategoryLobby } from "@/components/games/CategoryLobby";
import { SubPageShell } from "@/components/layout/SubPageShell";

export default function SportGamesPage() {
  return (
    <SubPageShell title="กีฬา">
      <CategoryLobby category="sport-games" title="กีฬา" />
    </SubPageShell>
  );
}
