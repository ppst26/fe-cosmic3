"use client";

import React from "react";
import Image from "next/image";

export interface ProviderCardItem {
  id: string;
  name: string;
  /** path รูปปก/โลโก้จริง — ถ้าไม่มีแสดงอักษรแรกของชื่อค่าย */
  logoSrc?: string;
}

interface ProviderCardProps {
  provider: ProviderCardItem;
}

/** การ์ดค่ายเกม (สี่เหลี่ยมจัตุรัส) — ห่อด้วย Link ที่ผู้เรียก */
export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <div className="soft-card group relative flex aspect-square w-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[var(--brand-soft)] p-3">
        {provider.logoSrc ? (
          <Image
            src={provider.logoSrc}
            alt={provider.name}
            fill
            sizes="(max-width: 767px) 50vw, 200px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="text-5xl font-black text-[var(--brand)] transition-transform duration-300 group-hover:scale-110 sm:text-6xl">
            {provider.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-3 pt-8">
          <p className="truncate text-center text-sm font-bold text-white">{provider.name}</p>
        </div>
      </div>
    </div>
  );
}
