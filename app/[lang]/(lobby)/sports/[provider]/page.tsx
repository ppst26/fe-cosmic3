import { GamingGamesView } from "@/components/gaming/GamingGamesView";

type PageProps = {
  params: Promise<{ provider: string }>;
};

export default async function SportsProviderPage({ params }: PageProps) {
  const { provider } = await params;
  return <GamingGamesView categoryId="sport" providerKey={provider} />;
}
