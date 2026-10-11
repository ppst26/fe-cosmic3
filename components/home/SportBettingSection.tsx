import { Trophy } from "lucide-react";
import { SPORT_BET_MATCHES } from "@/lib/mock/home";
import { HomeHorizontalScroll } from "./HomeHorizontalScroll";
import { HomePageSection } from "./HomePageSection";
import { SportBetMatchCard } from "./SportBetMatchCard";

export function SportBettingSection() {
  return (
    <HomePageSection title="บอลโลก 2026" icon={<Trophy className="h-4 w-4 text-[var(--brand)]" aria-hidden />}>
      <HomeHorizontalScroll gapClass="gap-3">
        {SPORT_BET_MATCHES.map((match) => (
          <li key={match.id} className="shrink-0 snap-start">
            <SportBetMatchCard match={match} />
          </li>
        ))}
      </HomeHorizontalScroll>
    </HomePageSection>
  );
}
