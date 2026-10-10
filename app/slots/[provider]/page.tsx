"use client";

import { use } from "react";
import { GamingGamesView } from "@/components/gaming/GamingGamesView";

type PageProps = {
  params: Promise<{ provider: string }>;
};

export default function SlotsProviderPage({ params }: PageProps) {
  const { provider } = use(params);
  return <GamingGamesView categoryId="slot" providerKey={provider} />;
}
