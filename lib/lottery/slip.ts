export function slipTotal(lines: { price: number }[]): number {
  return lines.reduce((sum, line) => sum + line.price, 0);
}

export function canConfirmSlip(
  lineCount: number,
  total: number,
  balance: number,
): boolean {
  return lineCount > 0 && total > 0 && total <= balance;
}
