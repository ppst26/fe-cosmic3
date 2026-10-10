import { localizedRedirect } from "@/lib/i18n/server";

export default async function WalletPage() {
  await localizedRedirect("/?layer=deposit");
}
