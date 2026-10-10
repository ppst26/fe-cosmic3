import type { ReactNode } from "react";

type HomeMainContainerProps = {
  children: ReactNode;
};

/** เนื้อหาหลักหน้าแรก — mobile เต็มความกว้าง, desktop กล่องขาวกึ่งกลาง max 1200px */
export function HomeMainContainer({ children }: HomeMainContainerProps) {
  return (
    <main className="w-full bg-gray-100 md:mx-auto md:max-w-[1200px]">
      {children}
    </main>
  );
}
