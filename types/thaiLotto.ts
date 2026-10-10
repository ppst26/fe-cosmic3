export type ThaiLottoDigitGroup = "three" | "two" | "run";

export type ThaiLottoBetTypeId =
  | "three_top"
  | "three_tod"
  | "three_front"
  | "three_back"
  | "two_top"
  | "two_bottom"
  | "run_top"
  | "run_bottom";

export type ThaiLottoBetType = {
  id: ThaiLottoBetTypeId;
  label: string;
  group: ThaiLottoDigitGroup;
  digits: 1 | 2 | 3;
  payoutRate: number;
};

export type ThaiLottoDraw = {
  id: string;
  drawLabel: string;
  closeAt: string;
  minBet: number;
  maxBet: number;
};

export type ThaiLottoBetEntry = {
  id: string;
  typeId: ThaiLottoBetTypeId;
  number: string;
  amount: number;
};
