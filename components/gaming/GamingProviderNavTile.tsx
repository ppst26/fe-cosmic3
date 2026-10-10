"use client";

import React from "react";
import Image from "next/image";
import Link from "@/lib/i18n/navigation";
import type { GamingProviderEntry } from "@/lib/gamingProviders";

interface GamingProviderNavTileProps {
  provider: GamingProviderEntry;
  href: string;
  active: boolean;
}

export function GamingProviderNavTile({ provider, href, active }: GamingProviderNavTileProps) {
  const label = provider.shortName ?? provider.title.slice(0, 3).toUpperCase();

  return (
    <Link
      href={href}
      className={`gaming-provider-nav-tile relative flex items-center justify-center overflow-hidden p-1.5 ${
        active ? "gaming-provider-nav-tile--active" : ""
      }`}
      title={provider.title}
      aria-current={active ? "page" : undefined}
    >
      {provider.image ? (
        <Image
          src={provider.image}
          alt=""
          fill
          sizes="72px"
          className={
            provider.navLogo
              ? "object-contain object-center p-1"
              : "object-cover object-center"
          }
        />
      ) : (
        <span className="text-[10px] font-bold text-[var(--brand)]">{label}</span>
      )}
    </Link>
  );
}
