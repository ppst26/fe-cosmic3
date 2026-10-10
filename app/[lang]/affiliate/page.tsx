import { localizedRedirect } from "@/lib/i18n/server";

/** เส้นทางเดิม — ไปหน้า /referral */
export default async function AffiliateLegacyRedirect() {
  await localizedRedirect("/referral");
}
