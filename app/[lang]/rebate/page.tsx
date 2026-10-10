import { localizedRedirect } from "@/lib/i18n/server";

/** เส้นทางเดิม — ไปหน้า /cashback?tab=loss */
export default async function RebateLegacyRedirect() {
  await localizedRedirect("/cashback?tab=loss");
}
