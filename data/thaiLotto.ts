import type { ThaiLottoBetType, ThaiLottoDigitGroup } from "@/types/thaiLotto";

export const THAI_LOTTO_GROUPS: { id: ThaiLottoDigitGroup; label: string }[] = [
  { id: "three", label: "3 ตัว" },
  { id: "two", label: "2 ตัว" },
  { id: "run", label: "เลขวิ่ง" },
];

export const THAI_LOTTO_BET_TYPES: ThaiLottoBetType[] = [
  { id: "three_top", label: "3 ตัวบน", group: "three", digits: 3, payoutRate: 900 },
  { id: "three_tod", label: "3 ตัวโต๊ด", group: "three", digits: 3, payoutRate: 150 },
  { id: "three_front", label: "3 ตัวหน้า", group: "three", digits: 3, payoutRate: 450 },
  { id: "three_back", label: "3 ตัวล่าง", group: "three", digits: 3, payoutRate: 450 },
  { id: "two_top", label: "2 ตัวบน", group: "two", digits: 2, payoutRate: 90 },
  { id: "two_bottom", label: "2 ตัวล่าง", group: "two", digits: 2, payoutRate: 90 },
  { id: "run_top", label: "วิ่งบน", group: "run", digits: 1, payoutRate: 3.2 },
  { id: "run_bottom", label: "วิ่งล่าง", group: "run", digits: 1, payoutRate: 4.2 },
];
