import { GamingCategoryLayout } from "@/components/gaming/GamingCategoryLayout";
import { loadLobbyContent } from "@/lib/api/lobby";

export default async function SlotsLayout({ children }: { children: React.ReactNode }) {
  const content = await loadLobbyContent();
  return (
    <GamingCategoryLayout categoryId="slot" content={content}>
      {children}
    </GamingCategoryLayout>
  );
}
