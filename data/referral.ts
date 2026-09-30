export type ReferralFriend = { id: string; name: string };

export type ReferralEarningRow = {
  id: string;
  at: string;
  category: string;
  commission: number;
};

export const REFERRAL_FRIENDS: ReferralFriend[] = [
  { id: "f1", name: "สมชาย" },
  { id: "f2", name: "สมหญิง" },
  { id: "f3", name: "วิชัย" },
];

export const REFERRAL_EARNING_ROWS: ReferralEarningRow[] = [
  { id: "e1", at: "2026-09-30", category: "สล็อต", commission: 72 },
  { id: "e2", at: "2026-09-20", category: "คาสิโน", commission: 32 },
  { id: "e3", at: "2026-08-15", category: "กีฬา", commission: 25 },
];
