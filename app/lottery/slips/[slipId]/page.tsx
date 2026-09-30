"use client";

import { use } from "react";
import { SubPageShell } from "@/components/layout/SubPageShell";
import { SlipDetailScreen } from "@/components/lottery/SlipDetailScreen";

type PageProps = {
  params: Promise<{ slipId: string }>;
};

export default function LotterySlipDetailPage({ params }: PageProps) {
  const { slipId } = use(params);
  return (
    <SubPageShell title="รายละเอียดโพย">
      <SlipDetailScreen slipId={slipId} />
    </SubPageShell>
  );
}
