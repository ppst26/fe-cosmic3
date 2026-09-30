"use client";

import { use } from "react";
import { ProviderGamesScreen } from "@/components/games/ProviderGamesScreen";

type PageProps = {
  params: Promise<{ provider: string }>;
};

export default function CardsProviderPage({ params }: PageProps) {
  const { provider } = use(params);
  return <ProviderGamesScreen category="cards" providerId={provider} />;
}
