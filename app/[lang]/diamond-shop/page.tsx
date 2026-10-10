import { localizedRedirect } from "@/lib/i18n/server";

/** เส้นทางเดิม — ไปหน้า /shop */
export default async function DiamondShopLegacyRedirect() {
  await localizedRedirect("/shop");
}
