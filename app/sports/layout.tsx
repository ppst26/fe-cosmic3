import { GamingCategoryLayout } from "@/components/gaming/GamingCategoryLayout";

export default function SportsLayout({ children }: { children: React.ReactNode }) {
  return <GamingCategoryLayout categoryId="sport">{children}</GamingCategoryLayout>;
}
