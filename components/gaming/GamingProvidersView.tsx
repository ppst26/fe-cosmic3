"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "@/lib/i18n/navigation";
import { ProviderCard } from "@/components/ProviderCard";
import { getGamingCategory, type GamingCategoryId } from "@/lib/gamingCategories";
import { listProvidersForCategory } from "@/lib/gamingProviders";

interface GamingProvidersViewProps {
  categoryId: GamingCategoryId;
}

/** thumbnail ค่ายของหมวด — ข้อมูลชุดเดียวกับ glass (LobbyCategoryProviders) ไม่มี breadcrumb/ค้นหา เอาเฉพาะ grid */
export function GamingProvidersView({ categoryId }: GamingProvidersViewProps) {
  const meta = getGamingCategory(categoryId);

  const providers = useMemo(() => (meta ? listProvidersForCategory(meta) : []), [meta]);

  if (!meta) return null;

  const isSlot = categoryId === "slot";

  return (
    <div className="p-3 sm:p-4">
      <div className="grid grid-cols-3 gap-3">
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
              className="group relative flex aspect-[142/188] min-h-0 overflow-hidden rounded-sm"
            >
              {entry.image ? (
                <Image
                  src={entry.image}
                  alt={entry.title}
                  fill
                  sizes="(max-width: 767px) 33vw, 220px"
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
