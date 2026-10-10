import type { ReactNode } from "react";

type SoftSectionProps = {
  children: ReactNode;
  className?: string;
  /** เปิดให้ลูกเลื่อนแนวนอน (carousel) ไม่ถูก clip */
  horizontalScroll?: boolean;
};

export function SoftSection({
  children,
  className = "",
  horizontalScroll = false,
}: SoftSectionProps) {
  return (
    <section
      className={`soft-panel mx-3 ${horizontalScroll ? "overflow-x-clip overflow-y-visible" : "overflow-hidden"} ${className}`.trim()}
    >
      {children}
    </section>
  );
}
