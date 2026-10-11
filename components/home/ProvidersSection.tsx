"use client";

import Image from "next/image";
import Link from "@/lib/i18n/navigation";
import { Gamepad2 } from "lucide-react";
import { useT } from "@/lib/i18n/I18nProvider";
import { HOME_PROVIDER_LOGO_MARQUEE } from "@/app/data/homeProviderLogosData";
import { toSportHref } from "@/lib/gamingRoutes";
import { HomePageSection } from "./HomePageSection";

/** แถบโลโก้ค่ายเกมเลื่อนอัตโนมัติ — ข้อมูลชุดเดียวกับ glass (HOME_PROVIDER_LOGO_MARQUEE) */
export function ProvidersSection() {
  const t = useT("home");
  const logos = HOME_PROVIDER_LOGO_MARQUEE;

  const group = (groupKey: string, ariaHidden?: boolean) => (
    <div
      className="flex shrink-0 items-center gap-3 px-2 sm:gap-5 sm:px-3"
      aria-hidden={ariaHidden || undefined}
    >
      {logos.map((item) => (
        <Link
          key={`${groupKey}-${item.id}`}
          href={toSportHref(item.href)}
          className="flex h-10 w-[clamp(6.25rem,13vw,9.5rem)] shrink-0 items-center justify-center opacity-80 transition-opacity hover:opacity-100"
          aria-label={t("providers.logoAriaLabel", { name: item.name })}
          tabIndex={ariaHidden ? -1 : undefined}
        >
          <Image
            src={item.logoSrc}
            alt=""
            width={152}
            height={40}
            className="h-full w-auto max-w-full object-contain"
            sizes="152px"
          />
        </Link>
      ))}
    </div>
  );

  return (
    <HomePageSection title="Providers" icon={<Gamepad2 className="h-4 w-4 text-[var(--brand)]" aria-hidden />} viewAllHref="/slots">
      {logos.length === 0 ? (
        <p className="py-6 text-center text-sm text-[var(--text-muted)]">{t("providers.empty")}</p>
      ) : (
        <div
          className="w-full overflow-hidden rounded-[var(--radius-soft-md)] bg-[var(--soft-chrome)] py-3"
          aria-label={t("providers.marqueeAriaLabel")}
        >
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {group("a")}
            {group("b", true)}
          </div>
        </div>
      )}
    </HomePageSection>
  );
}
