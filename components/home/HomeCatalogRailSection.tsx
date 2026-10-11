"use client";

import type { ReactNode } from "react";
import { useRouter } from "@/lib/i18n/navigation";
import type { MockSportCategory } from "@/lib/mock/home";
import { HomeHorizontalScroll } from "./HomeHorizontalScroll";
import { HomePageSection } from "./HomePageSection";
import { SportCategoryCard } from "./SportCategoryCard";

export function HomeCatalogRailSection({
  title,
  icon,
  leading,
  viewAllHref,
  items,
}: {
  title: string;
  icon?: ReactNode;
  leading?: ReactNode;
  viewAllHref?: string;
  items: MockSportCategory[];
}) {
  const router = useRouter();

  return (
    <HomePageSection title={title} icon={icon} leading={leading} viewAllHref={viewAllHref}>
      <HomeHorizontalScroll>
        {items.map((item) => (
          <li key={item.id} className="shrink-0 snap-start">
            <SportCategoryCard
              sport={item}
              onPress={item.href ? () => router.push(item.href!) : undefined}
            />
          </li>
        ))}
      </HomeHorizontalScroll>
    </HomePageSection>
  );
}
