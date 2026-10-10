import { GamingGamesView } from "@/components/gaming/GamingGamesView";

type PageProps = {
  params: Promise<{ provider: string }>;
};

export default async function SlotsProviderPage({ params }: PageProps) {
  const { provider } = await params;
  return <GamingGamesView categoryId="slot" providerKey={provider} />;
}
