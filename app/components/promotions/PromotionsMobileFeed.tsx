"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "@/lib/i18n/navigation";
import { matchesPromoHubMobileCategory } from "@/lib/promotions/promotionFilters";
import type { PromoHubMobileListItem, PromoHubMobileCategoryFilterId } from "@/app/types/promotions";
import { PromotionsCategoryTabs } from "./PromotionsCategoryTabs";
import { usePromotionsCatalog } from "./PromotionsCatalogProvider";
import { promotionDetailHref } from "./promotionDetailHref";
import { useT } from "@/lib/i18n/I18nProvider";

/** รายการโปรโมชั่น — แท็บหมวด + การ์ดแนวตั้ง (รูป · ชื่อ · หมดเขต · อ่านเงื่อนไข) กดการ์ด → /promotions/[id] */
export function PromotionsMobileFeed() {
  const t = useT("promotions");
  const { catalog } = usePromotionsCatalog();
  const [categoryFilter, setCategoryFilter] = useState<PromoHubMobileCategoryFilterId>("all");

  const mobileList = catalog?.mobileList ?? [];
  const mobileTabs = catalog?.mobileCategoryTabs ?? [];

  const items = useMemo(
    () =>
      mobileList.filter((item) =>
        matchesPromoHubMobileCategory(item.mobileCategories, categoryFilter),
      ),
    [mobileList, categoryFilter],
  );

  if (!catalog) return null;

  return (
    <div className="flex flex-col gap-3 pb-2">
      <PromotionsCategoryTabs
        activeId={categoryFilter}
        onSelect={setCategoryFilter}
        tabs={mobileTabs}
      />

      {items.length === 0 ? (
        <p className="soft-panel p-3 text-center text-sm text-[var(--text-muted)]">
          {t("empty.category")}
        </p>
      ) : (
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {items.map((item) => (
            <li key={item.id}>
              <PromotionsMobileListCard item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PromotionsMobileListCard({ item }: { item: PromoHubMobileListItem }) {
  const t = useT("promotions");
  return (
    <Link
      href={promotionDetailHref(item.detailId)}
      className="soft-card group flex w-full flex-col overflow-hidden text-left"
      aria-label={t("mobile.readTermsAria", { title: item.title })}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--soft-card-elevated)]">
        <Image
          src={item.bannerSrc}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 480px"
          className="object-cover object-center"
        />
      </div>
      <div className="px-3 pb-3 pt-2.5">
        <h2 className="font-semibold leading-snug">{item.title}</h2>
        <div className="mt-2 flex items-center justify-between gap-3 border-t border-black/[0.06] pt-2">
          <span className="text-xs text-[var(--text-muted)]">
            {t("mobile.expires", { date: item.expiresLabel })}
          </span>
          <span className="shrink-0 text-xs font-semibold text-[var(--brand-strong)]" aria-hidden="true">
            {t("mobile.readTerms")}
          </span>
        </div>
      </div>
    </Link>
  );
}
