import { localizedRedirect } from "@/lib/i18n/server";

/** เส้นทางเดิม — ไปหน้า /vip */
export default async function RankLegacyRedirect() {
  await localizedRedirect("/vip");
}
