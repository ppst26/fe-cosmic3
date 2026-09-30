export type TransactionKind = "deposit" | "withdraw" | "promotion" | "bet";
export type TransactionStatus = "สำเร็จ" | "รอดำเนินการ";

export type BankAccount = {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  primary: boolean;
  status: "verified" | "pending";
};

export type Transaction = {
  id: string;
  kind: TransactionKind;
  amount: number;
  status: TransactionStatus;
  at: string;
};

export type LotterySlipLine = {
  id: string;
  betType: string;
  number: string;
  price: number;
};

export type LotterySlip = {
  id: string;
  marketId: string;
  roundId: string;
  lines: LotterySlipLine[];
  total: number;
  status: "บันทึกแล้ว";
  at: string;
};

export type CashbackClaim = {
  id: string;
  tab: "play" | "loss";
  amount: number;
  at: string;
};

export type WheelHistoryRow = {
  id: string;
  prize: string;
  at: string;
};

export type MemberState = {
  displayName: string;
  username: string;
  phone: string;
  password: string;
  isAuthenticated: boolean;
  balance: number;
  diamonds: number;
  tickets: number;
  promoOptIn: boolean;
  referralEarnings: number;
  lineId: string;
  birthDate: string;
  banks: BankAccount[];
  transactions: Transaction[];
  cashbackClaims: CashbackClaim[];
  cashbackPlay: number;
  cashbackLoss: number;
  lotterySlips: LotterySlip[];
  favoriteGameIds: string[];
  shopRedeemsToday: number;
  claimedActivityIds: string[];
  checkedInToday: boolean;
  wheelHistory: WheelHistoryRow[];
  wheelWinners: string[];
};

export type MemberAction =
  | { type: "replace"; state: MemberState }
  | { type: "signUp"; displayName: string; phone: string; password: string }
  | { type: "loginSuccess"; username: string }
  | { type: "logout" }
  | { type: "deposit"; amount: number; at: string }
  | { type: "withdraw"; amount: number; at: string }
  | { type: "couponCredit"; amount: number; at: string }
  | { type: "couponGems"; amount: number }
  | { type: "setPromoOptIn"; value: boolean }
  | { type: "claimActivity"; id: string; reward: number; at: string }
  | { type: "checkIn"; diamonds: number }
  | { type: "claimCashback"; tab: "play" | "loss"; at: string }
  | { type: "redeemShop"; cost: number; credits: number }
  | { type: "spinWheel"; method: "ticket" | "gems"; prize: string; credit: number; gems: number; at: string }
  | { type: "toggleFavorite"; gameId: string }
  | { type: "addBank"; bank: BankAccount }
  | { type: "setPrimaryBank"; id: string }
  | { type: "changePassword"; password: string }
  | { type: "updateProfile"; lineId: string; birthDate: string }
  | { type: "withdrawReferral"; at: string }
  | { type: "confirmSlip"; slip: LotterySlip };
