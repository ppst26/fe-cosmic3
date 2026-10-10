import { localizedRedirect } from "@/lib/i18n/server";

/** เส้นทางเดิม — ไปหน้า /activities */
export default async function EventsLegacyRedirect() {
  await localizedRedirect("/activities");
}
