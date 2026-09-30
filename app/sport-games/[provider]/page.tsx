"use client";

import { use } from "react";
import { ProviderGamesScreen } from "@/components/games/ProviderGamesScreen";

type PageProps = {
  params: Promise<{ provider: string }>;
};

export default function SportGamesProviderPage({ params }: PageProps) {
  const { provider } = use(params);
  return <ProviderGamesScreen category="sport-games" providerId={provider} />;
}
