import { localizedRedirect } from "@/lib/i18n/server";

/** เส้นทางเดิม — ไปหน้า /cashback */
export default async function CommissionLegacyRedirect() {
  await localizedRedirect("/cashback");
}
