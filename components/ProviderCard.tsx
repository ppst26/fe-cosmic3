"use client";

import React from "react";
import Image from "next/image";

export interface ProviderItem {
  id: string;
  name: string;
  shortName: string;
  emoji?: string;
  image?: string;
  accentGradient?: string;
  characterEmoji?: string;
}

interface ProviderCardProps {
  provider: ProviderItem;
  onClick?: () => void;
}

export function ProviderCard({ provider, onClick }: ProviderCardProps) {
  return (
    <div
      onClick={onClick}
      className="soft-card group relative flex aspect-square w-full cursor-pointer flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
    >
      <div
        className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-3 ${
          provider.accentGradient
            ? `bg-gradient-to-b ${provider.accentGradient}`
            : "bg-[var(--brand-soft)]"
        }`}
      >
        {provider.image ? (
          <Image
            src={provider.image}
            alt={provider.name}
            fill
            sizes="(max-width: 767px) 50vw, 200px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="text-5xl transition-transform duration-300 group-hover:scale-110 sm:text-6xl">
            {provider.characterEmoji ?? provider.emoji ?? "🎰"}
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-3 pt-8">
          <p className="truncate text-center text-sm font-bold text-white">{provider.name}</p>
          <p className="text-center text-[10px] font-semibold text-[var(--brand)]">{provider.shortName}</p>
        </div>
      </div>
    </div>
  );
}
