import { GamingCategoryLayout } from "@/components/gaming/GamingCategoryLayout";

export default function FishLayout({ children }: { children: React.ReactNode }) {
  return <GamingCategoryLayout categoryId="fish">{children}</GamingCategoryLayout>;
}
