import { GamingCategoryLayout } from "@/components/gaming/GamingCategoryLayout";

export default function SlotsLayout({ children }: { children: React.ReactNode }) {
  return <GamingCategoryLayout categoryId="slot">{children}</GamingCategoryLayout>;
}
