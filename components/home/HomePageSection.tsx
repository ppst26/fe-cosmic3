import type { ReactNode } from "react";
import { SectionHeader } from "@/components/layout";

type HomePageSectionProps = {
  title: string;
  icon?: ReactNode;
  leading?: ReactNode;
  viewAllHref?: string;
  onViewAll?: () => void;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

/** บล็อกหน้าหลักแบบ Solidx — หัวข้อแถบขาว เนื้อหาบนพื้น body ไม่ห่อ soft-panel ทั้ง section */
export function HomePageSection({
  title,
  icon,
  leading,
  viewAllHref,
  onViewAll,
  children,
  className = "",
  contentClassName = "px-3 pb-1.5 pt-3 md:px-6 md:pb-2 md:pt-4",
}: HomePageSectionProps) {
  return (
    <section className={`mt-1 md:mt-0 ${className}`.trim()}>
      <SectionHeader
        title={title}
        icon={icon}
        leading={leading}
        viewAllHref={viewAllHref}
        onViewAll={onViewAll}
      />
      <div className={contentClassName}>{children}</div>
    </section>
  );
}
