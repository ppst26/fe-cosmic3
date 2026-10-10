import { GamingCategoryLayout } from "@/components/gaming/GamingCategoryLayout";
import { loadLobbyContent } from "@/lib/api/lobby";

export default async function CasinoLayout({ children }: { children: React.ReactNode }) {
  const content = await loadLobbyContent();
  return (
    <GamingCategoryLayout categoryId="casino" content={content}>
      {children}
    </GamingCategoryLayout>
  );
}
