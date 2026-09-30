import type { ReactNode } from "react";

type SoftSectionProps = {
  children: ReactNode;
  className?: string;
};

export function SoftSection({ children, className = "" }: SoftSectionProps) {
  return (
    <section
      className={`soft-panel mx-3 overflow-hidden ${className}`.trim()}
    >
      {children}
    </section>
  );
}
