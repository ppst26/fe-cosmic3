"use client";

import { use } from "react";
import { ProviderGamesScreen } from "@/components/games/ProviderGamesScreen";
import { SubPageShell } from "@/components/layout/SubPageShell";

type PageProps = {
  params: Promise<{ provider: string }>;
};

export default function SlotsProviderPage({ params }: PageProps) {
  const { provider } = use(params);
  return (
    <SubPageShell title="สล็อต">
      <ProviderGamesScreen category="slots" providerId={provider} />
    </SubPageShell>
  );
}
