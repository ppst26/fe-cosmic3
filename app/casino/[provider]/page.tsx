"use client";

import { use } from "react";
import { ProviderGamesScreen } from "@/components/games/ProviderGamesScreen";

type PageProps = {
  params: Promise<{ provider: string }>;
};

export default function CasinoProviderPage({ params }: PageProps) {
  const { provider } = use(params);
  return <ProviderGamesScreen category="casino" providerId={provider} />;
}
