"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "@/lib/i18n/navigation";
import { useT } from "@/lib/i18n/I18nProvider";
import { toSportHref } from "@/lib/gamingRoutes";
import type { PromoItem } from "@/app/types/lobby";

type HeroCarouselProps = {
  /** แบนเนอร์จาก lobby API (banners.peek / promoCarousel) */
  items: PromoItem[];
  className?: string;
};

const AUTOPLAY_MS = 5000;

/** แบนเนอร์หลักหน้าแรก — สไลด์รูปจาก lobby layer (ไม่มีรูปแบบ hardcode) */
export function HeroCarousel({ items, className = "" }: HeroCarouselProps) {
  const t = useT("home");
  const slides = items.filter((item) => item.bannerSrc);
  const slideCount = slides.length;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slideCount <= 1) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slideCount);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [slideCount]);

  if (slideCount === 0) return null;

  return (
    <section
      className={`relative w-full overflow-hidden bg-[var(--soft-canvas)] ${className}`.trim()}
      aria-label={t("peekCarousel.ariaLabel")}
    >
      <div className="relative mx-auto aspect-[5/2] w-full max-w-[1200px] md:aspect-auto md:h-[clamp(240px,24vw,320px)]">
        {slides.map((slide, index) => (
          <Link
            key={slide.id}
            href={toSportHref(slide.href)}
            aria-hidden={index !== active}
            tabIndex={index === active ? undefined : -1}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={slide.bannerSrc as string}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-contain"
            />
          </Link>
        ))}
      </div>

      {slideCount > 1 ? (
        <div className="relative z-[1] flex justify-center gap-1.5 py-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={t("carousel.goToSlide", { index: index + 1 })}
              aria-current={index === active}
              onClick={() => setActive(index)}
              className={`h-1 w-5 cursor-pointer rounded-sm border-0 p-0 ${
                index === active ? "bg-[var(--lavender-300)]" : "bg-white/25"
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
