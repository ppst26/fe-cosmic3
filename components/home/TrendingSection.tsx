import { TRENDING_THUMBS } from "@/lib/mock/home";
import { HomeHorizontalScroll } from "./HomeHorizontalScroll";
import { HomePageSection } from "./HomePageSection";
import { SportCategoryCard } from "./SportCategoryCard";

export function TrendingSection() {
  return (
    <HomePageSection title="มาแรง" icon="🔥">
      <HomeHorizontalScroll>
        {TRENDING_THUMBS.map((item) => (
          <li key={item.id} className="shrink-0 snap-start">
            <SportCategoryCard sport={item} />
          </li>
        ))}
      </HomeHorizontalScroll>
    </HomePageSection>
  );
}
