import { GamingCategoryLayout } from "@/components/gaming/GamingCategoryLayout";
import { loadLobbyContent } from "@/lib/api/lobby";

export default async function SportsLayout({ children }: { children: React.ReactNode }) {
  const content = await loadLobbyContent();
  return (
    <GamingCategoryLayout categoryId="sport" content={content}>
      {children}
    </GamingCategoryLayout>
  );
}
