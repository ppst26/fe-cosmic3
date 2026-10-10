import { localizedRedirect } from "@/lib/i18n/server";

/** เส้นทางเดิม — ไปหน้า /referral */
export default async function InviteLegacyRedirect() {
  await localizedRedirect("/referral");
}
