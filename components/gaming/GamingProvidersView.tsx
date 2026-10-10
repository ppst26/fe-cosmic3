"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "@/lib/i18n/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { GameSearchBar } from "@/components/GameSearchBar";
import { ProviderCard } from "@/components/ProviderCard";
import { useT } from "@/lib/i18n/I18nProvider";
import { getGamingCategory, type GamingCategoryId } from "@/lib/gamingCategories";
import { listProvidersForCategory } from "@/lib/gamingProviders";

interface GamingProvidersViewProps {
  categoryId: GamingCategoryId;
}

/** รายการค่ายของหมวด — ข้อมูลชุดเดียวกับ glass (LobbyCategoryProviders) พร้อมค้นหาตามชื่อ/ค่าย */
export function GamingProvidersView({ categoryId }: GamingProvidersViewProps) {
  const t = useT("home");
  const [searchQuery, setSearchQuery] = useState("");
  const meta = getGamingCategory(categoryId);

  const allProviders = useMemo(() => (meta ? listProvidersForCategory(meta) : []), [meta]);
  const providers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allProviders;
    return allProviders.filter(
      (p) => p.title.toLowerCase().includes(q) || p.provider.toLowerCase().includes(q),
    );
  }, [allProviders, searchQuery]);

  if (!meta) return null;

  const title = t(meta.labelKey);
  const isSlot = categoryId === "slot";

  return (
    <div className="gaming-lobby-panel p-3 sm:p-4">
      <Breadcrumb
        items={[{ label: t("categories.home"), href: "/" }, { label: title }]}
        shareTitle={title}
      />

      <GameSearchBar
        className="mt-3"
        placeholder={t(meta.searchPlaceholderKey)}
        onSearch={setSearchQuery}
      />

      <header className="mt-3 mb-4 flex flex-wrap items-end justify-between gap-2 border-b border-black/[0.06] pb-3">
        <h1 className="text-xl font-black text-[var(--text-on-light)] sm:text-2xl">{title}</h1>
        <p className="text-sm font-bold text-[var(--brand)]">
          {t("categoryProviders.providerCount", { count: providers.length })}
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {providers.map((entry) => {
          if (isSlot) {
            return (
              <Link key={entry.key} href={entry.href} className="block min-w-0">
                <ProviderCard provider={{ id: entry.key, name: entry.title, logoSrc: entry.image }} />
              </Link>
            );
          }

          return (
            <Link
              key={entry.key}
              href={entry.href}
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
                <div className="flex h-full w-full items-center justify-center bg-[var(--brand-soft)] text-4xl font-black text-[var(--brand)]">
                  {entry.title.charAt(0).toUpperCase()}
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
