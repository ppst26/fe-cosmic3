import { GamingGamesView } from "@/components/gaming/GamingGamesView";

type PageProps = {
  params: Promise<{ provider: string }>;
};

export default async function FishProviderPage({ params }: PageProps) {
  const { provider } = await params;
  return <GamingGamesView categoryId="fish" providerKey={provider} />;
}
