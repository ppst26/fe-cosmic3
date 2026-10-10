import { localizedRedirect } from "@/lib/i18n/server";

/** เส้นทางเดิม — ไปหน้า /check-in */
export default async function CheckinLegacyRedirect() {
  await localizedRedirect("/check-in");
}
