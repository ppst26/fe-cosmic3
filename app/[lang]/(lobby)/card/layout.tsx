import { GamingCategoryLayout } from "@/components/gaming/GamingCategoryLayout";
import { loadLobbyContent } from "@/lib/api/lobby";

export default async function CardLayout({ children }: { children: React.ReactNode }) {
  const content = await loadLobbyContent();
  return (
    <GamingCategoryLayout categoryId="card" content={content}>
      {children}
    </GamingCategoryLayout>
  );
}
