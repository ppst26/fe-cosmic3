import { Suspense } from "react";
import { WalletScreen } from "@/components/wallet/WalletScreen";

export default function WalletPage() {
  return (
    <Suspense fallback={null}>
      <WalletScreen />
    </Suspense>
  );
}
