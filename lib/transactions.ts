import type { Transaction, TransactionKind } from "@/lib/member/types";

export const PAGE_SIZE = 10;

export function filterTransactions(
  items: Transaction[],
  kind: TransactionKind,
  from: string,
  to: string,
): Transaction[] {
  return items.filter((item) => {
    if (item.kind !== kind) return false;
    const date = item.at.slice(0, 10);
    if (from && date < from) return false;
    if (to && date > to) return false;
    return true;
  });
}
