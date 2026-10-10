"use client";

import React from "react";
import Link from "@/lib/i18n/navigation";
import { useT } from "@/lib/i18n/I18nProvider";
import { GamingProviderNavTile } from "@/components/gaming/GamingProviderNavTile";
import type { GamingCategoryMeta } from "@/lib/gamingCategories";
import type { GamingProviderEntry } from "@/lib/gamingProviders";

interface GamingProviderSidebarProps {
  meta: GamingCategoryMeta;
  providers: GamingProviderEntry[];
  activeKey: string;
}

export function GamingProviderSidebar({ meta, providers, activeKey }: GamingProviderSidebarProps) {
  const t = useT("home");
  return (
    <aside className="gaming-lobby-panel flex w-full shrink-0 flex-col p-3 lg:w-[11.5rem] xl:w-[12.5rem]">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <Link href={meta.basePath} className="text-sm font-bold text-[var(--text-on-light)] hover:text-[var(--brand)]">
          {t(meta.labelKey)}
        </Link>
        <span className="text-[11px] text-[var(--text-muted)]">
          {t("categoryProviders.providerCount", { count: providers.length })}
        </span>
      </div>

      <div className="gaming-provider-sidebar grid max-h-[min(70vh,640px)] grid-cols-5 gap-1.5 overflow-y-auto overflow-x-hidden pr-0.5 lg:max-h-none">
        {providers.map((p) => (
          <GamingProviderNavTile key={p.key} provider={p} href={p.href} active={p.key === activeKey} />
        ))}
      </div>
    </aside>
  );
}
