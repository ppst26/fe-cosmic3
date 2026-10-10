import { GamingCategoryLayout } from "@/components/gaming/GamingCategoryLayout";

export default function CardLayout({ children }: { children: React.ReactNode }) {
  return <GamingCategoryLayout categoryId="card">{children}</GamingCategoryLayout>;
}
