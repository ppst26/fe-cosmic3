"use client";

import React from "react";
import Image from "next/image";
import Link from "@/lib/i18n/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ProviderCard, type ProviderItem } from "@/components/ProviderCard";
import { getGamingCategory, type GamingCategoryId } from "@/lib/gamingCategories";
import { listProvidersForCategory } from "@/lib/gamingProviders";

interface GamingProvidersViewProps {
  categoryId: GamingCategoryId;
}

function providerItemFromEntry(entry: { key: string; title: string }): ProviderItem {
  return {
    id: entry.key,
    name: entry.title,
    shortName: entry.title.slice(0, 3).toUpperCase(),
    emoji: "🎰",
    characterEmoji: "🎰",
    accentGradient: "from-[#ffe4c4] to-[#fff0e3]",
  };
}

export function GamingProvidersView({ categoryId }: GamingProvidersViewProps) {
  const meta = getGamingCategory(categoryId);
  if (!meta) return null;

  const providers = listProvidersForCategory(meta);
  const isSlot = categoryId === "slot";

  return (
    <div className="gaming-lobby-panel p-3 sm:p-4">
      <Breadcrumb
        items={[{ label: "หน้าแรก", href: "/" }, { label: meta.breadcrumb }]}
        shareTitle={meta.title}
      />

      <header className="mt-3 mb-4 flex flex-wrap items-end justify-between gap-2 border-b border-black/[0.06] pb-3">
        <div>
          <h1 className="text-xl font-black text-[var(--text-on-light)] sm:text-2xl">{meta.title}</h1>
          <p className="mt-0.5 text-xs text-[var(--text-muted)] sm:text-sm">{meta.subtitle}</p>
        </div>
        <p className="text-sm font-bold text-[var(--brand)]">{providers.length} ผู้ให้บริการ</p>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {providers.map((entry) => {
          const href = `${meta.basePath}/${entry.key}`;

          if (isSlot) {
            return (
              <Link key={entry.key} href={href} className="block min-w-0">
                <ProviderCard provider={providerItemFromEntry(entry)} />
              </Link>
            );
          }

          return (
            <Link
              key={entry.key}
              href={href}
              className="soft-card group relative flex aspect-[142/188] min-h-0 overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
            >
              {entry.image ? (
                <Image
                  src={entry.image}
                  alt={entry.title}
                  fill
                  sizes="(max-width: 767px) 50vw, 220px"
                  className="object-cover transition group-hover:scale-[1.04]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[var(--brand-soft)] text-4xl">
                  🎮
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-10">
                <p className="truncate text-sm font-bold text-white">{entry.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
