import { GamingCategoryLayout } from "@/components/gaming/GamingCategoryLayout";
import { loadLobbyContent } from "@/lib/api/lobby";

export default async function FishLayout({ children }: { children: React.ReactNode }) {
  const content = await loadLobbyContent();
  return (
    <GamingCategoryLayout categoryId="fish" content={content}>
      {children}
    </GamingCategoryLayout>
  );
}
