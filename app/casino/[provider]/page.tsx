"use client";

import { use } from "react";
import { ProviderGamesScreen } from "@/components/games/ProviderGamesScreen";
import { SubPageShell } from "@/components/layout/SubPageShell";

type PageProps = {
  params: Promise<{ provider: string }>;
};

export default function CasinoProviderPage({ params }: PageProps) {
  const { provider } = use(params);
  return (
    <SubPageShell title="คาสิโน">
      <ProviderGamesScreen category="casino" providerId={provider} />
    </SubPageShell>
  );
}
