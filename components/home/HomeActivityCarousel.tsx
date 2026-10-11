"use client";

import Image from "next/image";
import Link from "@/lib/i18n/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n/I18nProvider";
import { toSportHref } from "@/lib/gamingRoutes";
import type { HomeLobbyTournamentItem } from "@/app/types/lobby";
import { HomePageSection } from "./HomePageSection";

function EventTicketIcon() {
  return (
    <span className="inline-flex text-[var(--brand)]" aria-hidden>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 1 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 1 0 0-4V7zm6 1v2h2V8h-2zm0 4v2h2v-2h-2zm0 4v1a1 1 0 0 0 2 0v-1h-2z" />
      </svg>
    </span>
  );
}

type HomeActivityCarouselProps = {
  /** กิจกรรม/ทัวร์นาเมนต์จาก lobby API (LobbyContent.tournaments) */
  items: HomeLobbyTournamentItem[];
  title?: string;
  viewAllHref?: string;
};

export function HomeActivityCarousel({
  items,
  title: titleProp,
  viewAllHref = "/activities",
}: HomeActivityCarouselProps) {
  const t = useT("home");
  const title = titleProp ?? t("events.title");
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getSlideStride = useCallback(() => {
    const track = trackRef.current;
    if (!track?.firstElementChild) return 0;
    const first = track.firstElementChild as HTMLElement;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "10");
    return first.offsetWidth + gap;
  }, []);

  const updateIndex = useCallback(() => {
    const track = trackRef.current;
    const stride = getSlideStride();
    if (!track || stride <= 0 || items.length === 0) return;
    const index = Math.round(track.scrollLeft / stride);
    setActiveIndex(Math.min(Math.max(index, 0), items.length - 1));
  }, [getSlideStride, items.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateIndex();
    track.addEventListener("scroll", updateIndex, { passive: true });
    const ro = new ResizeObserver(updateIndex);
    ro.observe(track);
    return () => {
      track.removeEventListener("scroll", updateIndex);
      ro.disconnect();
    };
  }, [updateIndex]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    const stride = getSlideStride();
    if (!track || stride <= 0) return;
    const clamped = Math.min(Math.max(index, 0), items.length - 1);
    track.scrollTo({ left: clamped * stride, behavior: "smooth" });
    setActiveIndex(clamped);
  };

  if (items.length === 0) return null;

  return (
    <HomePageSection title={title} icon={<EventTicketIcon />} viewAllHref={viewAllHref} contentClassName="pb-4 pt-2 md:pb-5 md:pt-3">
      <div
        ref={trackRef}
        className="flex gap-2.5 overflow-x-auto scroll-smooth px-3 snap-x snap-mandatory scrollbar-none sm:gap-3 md:px-6"
      >
        {items.map((item) => {
          const cardClass =
            "relative block aspect-[16/9] w-[88%] max-w-none shrink-0 snap-start overflow-hidden rounded-xl soft-panel-bg sm:w-[78%] md:w-[48%] lg:w-[32%]";
          const image = (
            <Image
              src={item.imageSrc}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 32vw, (min-width: 768px) 48vw, 88vw"
              className="object-cover object-center"
            />
          );
          return item.href ? (
            <Link key={item.id} href={toSportHref(item.href)} className={cardClass} aria-label={item.title}>
              {image}
            </Link>
          ) : (
            <article key={item.id} className={cardClass} aria-label={item.title}>
              {image}
            </article>
          );
        })}
      </div>

      <div
        className="mt-3 flex items-center justify-center gap-1.5 px-3 md:px-6"
        role="tablist"
        aria-label={t("events.slidesAriaLabel", { title })}
      >
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={idx === activeIndex}
            aria-label={t("events.goTo", { name: item.title })}
            onClick={() => scrollToIndex(idx)}
            className={`h-2 rounded-full transition-all border-0 cursor-pointer ${
              idx === activeIndex
                ? "w-5 bg-[var(--brand)]"
                : "w-2 bg-[var(--text-muted)]/35 hover:bg-[var(--brand)]/50"
            }`}
          />
        ))}
      </div>
    </HomePageSection>
  );
}
