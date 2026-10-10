"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ActivityCarouselItem } from "@/lib/mock/home";
import { HomePageSection } from "./HomePageSection";

type HomeActivityCarouselProps = {
  items: ActivityCarouselItem[];
  title?: string;
  viewAllHref?: string;
};

export function HomeActivityCarousel({
  items,
  title = "กิจกรรม",
  viewAllHref = "/activities",
}: HomeActivityCarouselProps) {
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
    <HomePageSection title={title} icon="🎉" viewAllHref={viewAllHref} contentClassName="pb-4 pt-2 md:pb-5 md:pt-3">
      <div
        ref={trackRef}
        className="flex gap-2.5 overflow-x-auto scroll-smooth px-3 snap-x snap-mandatory scrollbar-none sm:gap-3 md:px-6"
      >
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="relative w-[88%] max-w-none shrink-0 snap-start overflow-hidden rounded-xl sm:w-[78%] md:w-[70%]"
          >
            <div
              className="relative flex min-h-[132px] flex-col justify-end p-4 sm:min-h-[148px]"
              style={{ background: item.gradient }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" aria-hidden />

              <div className="relative">
                <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold text-white/90">
                  <span aria-hidden>{item.categoryIcon}</span>
                  <span>{item.categoryLabel}</span>
                  <span className="text-white/50">·</span>
                  <span className="text-white/75">{item.dateBadge}</span>
                </div>
                <p className="text-base font-extrabold leading-snug text-white sm:text-lg">
                  {item.headline}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div
        className="mt-3 flex items-center justify-center gap-1.5 px-3 md:px-6"
        role="tablist"
        aria-label="สไลด์กิจกรรม"
      >
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={idx === activeIndex}
            aria-label={`สไลด์ ${idx + 1}`}
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
