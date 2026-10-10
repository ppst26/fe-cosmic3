import { localizedRedirect } from "@/lib/i18n/server";

/** เส้นทางเดิม — ไปหน้า /promotions */
export default async function PromotionLegacyRedirect() {
  await localizedRedirect("/promotions");
}
