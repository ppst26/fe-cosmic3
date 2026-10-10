"use client";

import React from "react";
import { ErrorState, LoadingState } from "@/app/components/ui/StatusState";
import { PromotionsMobileFeed } from "./PromotionsMobileFeed";
import { PromoHubDesktopMasterDetail } from "./PromoHubDesktopMasterDetail";
import { PromotionsCatalogProvider, usePromotionsCatalog } from "./PromotionsCatalogProvider";
import { useT } from "@/lib/i18n/I18nProvider";

/** เนื้อหาหน้าโปรโมชั่น (/promotions) — กดโปรเปิดหน้ารายละเอียด /promotions/[id] */
export function PromotionsHubPageContent({ embedded = false }: { embedded?: boolean }) {
  return (
    <PromotionsCatalogProvider>
      <PromotionsHubPageContentInner embedded={embedded} />
    </PromotionsCatalogProvider>
  );
}

function PromotionsHubPageContentInner({ embedded }: { embedded: boolean }) {
  const t = useT("promotions");
  const { catalog, loading, error: loadError, reload } = usePromotionsCatalog();

  return (
    <>
      {loading ? <LoadingState label={t("loading")} /> : null}
      {!loading && loadError && !catalog ? (
        <div className="flex justify-center">
          <ErrorState
            title={t("loadError")}
            description={t("loadErrorDesc")}
            primaryAction={{ label: t("retry"), onClick: reload }}
          />
        </div>
      ) : null}

      {catalog && embedded ? (
        <div className="hidden pb-2 lg:block">
          <PromoHubDesktopMasterDetail />
        </div>
      ) : null}

      {catalog ? (
        <div className={embedded ? "lg:hidden" : ""}>
          <PromotionsMobileFeed />
        </div>
      ) : null}
    </>
  );
}
