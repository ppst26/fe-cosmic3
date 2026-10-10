import type { ReactNode } from "react";

type HomeHorizontalScrollProps = {
  children: ReactNode;
  gapClass?: string;
  className?: string;
};

export function HomeHorizontalScroll({
  children,
  gapClass = "gap-2.5",
  className = "",
}: HomeHorizontalScrollProps) {
  return (
    <div
      className={`overflow-x-auto overscroll-x-contain scrollbar-none pl-3 md:pl-6 ${className}`.trim()}
    >
      <ul
        className={`flex w-max min-w-full flex-nowrap snap-x snap-mandatory pr-3 md:pr-6 ${gapClass}`}
      >
        {children}
      </ul>
    </div>
  );
}
