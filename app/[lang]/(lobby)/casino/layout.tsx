import { GamingCategoryLayout } from "@/components/gaming/GamingCategoryLayout";

export default function CasinoLayout({ children }: { children: React.ReactNode }) {
  return <GamingCategoryLayout categoryId="casino">{children}</GamingCategoryLayout>;
}
