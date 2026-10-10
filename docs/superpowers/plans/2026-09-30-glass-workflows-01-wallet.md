# Wallet And Auth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ให้สมัครสองขั้น ล็อกอิน ฝากสามขั้น ถอน คูปอง และประวัติ ใช้ยอดเดียวกันผ่าน `MemberProvider`

**Architecture:** กฎฟอร์มและรีดิวเซอร์สมาชิกเป็นฟังก์ชันบริสุทธิ์ใน `sport/lib` แผงใช้ `SheetFrame` หน้า `/wallet` เป็นไคลเอนต์คอมโพเนนต์ที่อ่าน `useMember()` ค่าเก็บใน `sessionStorage` คีย์ `sport-member-v1`

**Tech Stack:** Next.js 16.3.7, React 19.2.8, TypeScript, Tailwind CSS 4, pnpm

## Global Constraints

- หน้าตายังเป็นคลาส `soft-card`, `soft-panel`, `soft-btn-primary`, `soft-btn-outline`, `SubPageShell` และตัวแปรใน `sport/app/globals.css`
- จุดเดียวที่เรียกเครือข่ายคือ `POST /api/auth/login`
- เบอร์โทรเป็นตัวเลข 10 หลัก รหัสผ่านยาว 6–32 ชื่อไม่เกิน 40 ตัวอักษร เลขบัญชี 10–12 หลัก จำนวนเงินเป็นตัวเลขไม่เกิน 9 หลักและมากกว่า 0
- ปุ่มกดสูงอย่างน้อย `h-10` เลย์เอาต์เริ่มจากมือถือ
- รหัสผ่านเริ่มต้น `demo1234` ใช้ตอนเปลี่ยนรหัสเท่านั้น ไม่ส่งไปล็อกอิน
- เมื่อ `sessionStorage` อ่านไม่ได้หรือ JSON พัง ให้ใช้ค่าเริ่มต้น
- ไม่มีตัวรันเทสอัตโนมัติ ตรวจด้วย `pnpm exec tsc --noEmit` ระหว่างงาน และจบแผนด้วย `pnpm lint` กับ `pnpm build` ในโฟลเดอร์ `sport`
- ทางลัด `/affiliate` `/invite` `/rebate` `/events` `/rank` `/diamond-shop` `/promotion` `/checkin` ไม่แก้

---

### Task 1: Field rules

**Files:**
- Create: `sport/lib/fieldRules.ts`

**Interfaces:**
- Consumes: ไม่มี
- Produces: `digitsOnly(raw: string, maxDigits: number): string`, `phoneError(value: string): string | null`, `passwordError(value: string): string | null`, `personNameError(value: string): string | null`, `bankAccountError(value: string): string | null`, `moneyAmountError(digits: string): string | null`

- [ ] **Step 1: Write `sport/lib/fieldRules.ts`**

```ts
export const PHONE_DIGIT_LENGTH = 10;
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 32;
export const PERSON_NAME_MAX_LENGTH = 40;
export const BANK_ACCOUNT_MIN_DIGITS = 10;
export const BANK_ACCOUNT_MAX_DIGITS = 12;
export const MONEY_AMOUNT_MAX_DIGITS = 9;
export const COUPON_CODE_MAX_LENGTH = 20;

export function digitsOnly(raw: string, maxDigits: number): string {
  return raw.replace(/\D/g, "").slice(0, maxDigits);
}

export function phoneError(value: string): string | null {
  if (value.length !== PHONE_DIGIT_LENGTH) return "เบอร์โทรต้องมี 10 หลัก";
  return null;
}

export function passwordError(value: string): string | null {
  if (value.length < PASSWORD_MIN_LENGTH || value.length > PASSWORD_MAX_LENGTH) {
    return "รหัสผ่านต้องยาว 6 ถึง 32 ตัวอักษร";
  }
  return null;
}

export function personNameError(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "กรุณากรอกชื่อ";
  if (trimmed.length > PERSON_NAME_MAX_LENGTH) return "ชื่อยาวเกิน 40 ตัวอักษร";
  return null;
}

export function bankAccountError(value: string): string | null {
  if (value.length < BANK_ACCOUNT_MIN_DIGITS || value.length > BANK_ACCOUNT_MAX_DIGITS) {
    return "เลขบัญชีต้องมี 10 ถึง 12 หลัก";
  }
  return null;
}

export function moneyAmountError(digits: string): string | null {
  if (!digits) return "กรุณากรอกจำนวนเงิน";
  if (digits.length > MONEY_AMOUNT_MAX_DIGITS) return "จำนวนเงินยาวเกินกำหนด";
  const amount = Number(digits);
  if (!Number.isFinite(amount) || amount <= 0) return "จำนวนเงินต้องมากกว่า 0";
  return null;
}
```

- [ ] **Step 2: Typecheck**

Run from `sport`: `pnpm exec tsc --noEmit --pretty false`
Expected: exit code 0

- [ ] **Step 3: Commit**

```bash
git add sport/lib/fieldRules.ts
git commit -m "feat(sport): add shared form field rules"
```

### Task 2: Member state and reducer

**Files:**
- Create: `sport/lib/member/types.ts`
- Create: `sport/lib/member/reducer.ts`
- Create: `sport/lib/coupon.ts`
- Modify: `sport/data/member.ts` (add `password: "demo1234"` on `MEMBER` only)

**Interfaces:**
- Consumes: `moneyAmountError` from `sport/lib/fieldRules.ts`
- Produces: `MemberState`, `MemberAction`, `createInitialMember(): MemberState`, `reduceMember(state: MemberState, action: MemberAction): MemberState`, `loadMember(): MemberState`, `STORAGE_KEY`, `applyCoupon(code: string)`

- [ ] **Step 1: Add password to seed**

In `sport/data/member.ts`, add `password: "demo1234"` inside `MEMBER`.

- [ ] **Step 2: Write `sport/lib/member/types.ts`**

```ts
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
```

- [ ] **Step 3: Write `sport/lib/coupon.ts`**

```ts
export type CouponResult =
  | { ok: true; kind: "baht"; amount: number; message: string }
  | { ok: true; kind: "gems"; amount: number; message: string }
  | { ok: false; message: string };

export function applyCoupon(code: string): CouponResult {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return { ok: false, message: "กรุณากรอกรหัสคูปอง" };
  if (normalized === "SPORT100") return { ok: true, kind: "baht", amount: 100, message: "รับ 100 บาทแล้ว" };
  if (normalized === "WELCOME50") return { ok: true, kind: "baht", amount: 50, message: "รับ 50 บาทแล้ว" };
  if (normalized === "FREEGEMS") return { ok: true, kind: "gems", amount: 50, message: "รับ 50 เพชรแล้ว" };
  return { ok: false, message: "รหัสคูปองไม่ถูกต้องหรือหมดอายุ" };
}
```

- [ ] **Step 4: Write `sport/lib/member/reducer.ts`**

`createInitialMember` copies `MEMBER.balance`, `MEMBER.diamonds`, `MEMBER.displayName`, `MEMBER.username`, `MEMBER.phone`, `MEMBER.password`. Set `tickets: 1`, `referralEarnings: 1280`, `cashbackPlay: 45.2`, `cashbackLoss: 10`, `promoOptIn: false`, `isAuthenticated: false`, `shopRedeemsToday: 1`, `checkedInToday: false`, `claimedActivityIds: []`, `favoriteGameIds: []`, `lotterySlips: []`, `wheelHistory: []`, `wheelWinners: ["คุณเอ ได้รับ 50 บาท"]`, `lineId: ""`, `birthDate: ""`.

Banks:

```ts
[
  { id: "b1", bankName: "ธนาคาร กรุงไทย", accountNumber: "6613717223", accountHolder: "-", primary: false, status: "pending" },
  { id: "b2", bankName: "ธนาคาร ไทยพาณิชย์", accountNumber: "0910170778", accountHolder: MEMBER.displayName, primary: true, status: "verified" },
]
```

Transactions, with one pending row:

```ts
[
  { id: "d1", kind: "deposit", amount: 1000, status: "สำเร็จ", at: "2026-09-28" },
  { id: "w1", kind: "withdraw", amount: 500, status: "สำเร็จ", at: "2026-09-27" },
  { id: "d2", kind: "deposit", amount: 300, status: "รอดำเนินการ", at: "2026-09-26" },
  { id: "p1", kind: "promotion", amount: 100, status: "สำเร็จ", at: "2026-09-25" },
  { id: "bet1", kind: "bet", amount: 200, status: "สำเร็จ", at: "2026-09-24" },
]
```

Cashback claims seed: `{ id: "h1", tab: "play", amount: 45.2, at: "2026-09-28" }`.

Write this function exactly:

```ts
function withTx(state: MemberState, kind: Transaction["kind"], amount: number, at: string): MemberState {
  return {
    ...state,
    transactions: [{ id: `tx-${kind}-${at}-${state.transactions.length}`, kind, amount, status: "สำเร็จ", at }, ...state.transactions],
  };
}

export function reduceMember(state: MemberState, action: MemberAction): MemberState {
  switch (action.type) {
    case "replace":
      return action.state;
    case "signUp":
      return { ...state, displayName: action.displayName, phone: action.phone, password: action.password, isAuthenticated: true };
    case "loginSuccess":
      return { ...state, username: action.username, isAuthenticated: true };
    case "logout":
      return { ...state, username: "", isAuthenticated: false };
    case "deposit":
      return withTx({ ...state, balance: state.balance + action.amount }, "deposit", action.amount, action.at);
    case "withdraw":
      return withTx({ ...state, balance: state.balance - action.amount }, "withdraw", action.amount, action.at);
    case "couponCredit":
      return withTx({ ...state, balance: state.balance + action.amount }, "promotion", action.amount, action.at);
    case "couponGems":
      return { ...state, diamonds: state.diamonds + action.amount };
    case "setPromoOptIn":
      return { ...state, promoOptIn: action.value };
    case "claimActivity":
      return withTx(
        { ...state, balance: state.balance + action.reward, claimedActivityIds: [...state.claimedActivityIds, action.id] },
        "promotion",
        action.reward,
        action.at,
      );
    case "checkIn":
      return { ...state, diamonds: state.diamonds + action.diamonds, checkedInToday: true };
    case "claimCashback": {
      const amount = action.tab === "play" ? state.cashbackPlay : state.cashbackLoss;
      const next = withTx({ ...state, balance: state.balance + amount }, "promotion", amount, action.at);
      return {
        ...next,
        cashbackPlay: action.tab === "play" ? 0 : state.cashbackPlay,
        cashbackLoss: action.tab === "loss" ? 0 : state.cashbackLoss,
        cashbackClaims: [{ id: `cb-${action.at}-${state.cashbackClaims.length}`, tab: action.tab, amount, at: action.at }, ...state.cashbackClaims],
      };
    }
    case "redeemShop":
      return { ...state, diamonds: state.diamonds - action.cost, balance: state.balance + action.credits, shopRedeemsToday: state.shopRedeemsToday + 1 };
    case "spinWheel":
      return {
        ...state,
        tickets: action.method === "ticket" ? state.tickets - 1 : state.tickets,
        diamonds: state.diamonds - (action.method === "gems" ? 50 : 0) + action.gems,
        balance: state.balance + action.credit,
        wheelHistory: [{ id: `wh-${action.at}-${state.wheelHistory.length}`, prize: action.prize, at: action.at }, ...state.wheelHistory],
        wheelWinners: [`${state.displayName} ได้รับ ${action.prize}`, ...state.wheelWinners],
      };
    case "toggleFavorite":
      return {
        ...state,
        favoriteGameIds: state.favoriteGameIds.includes(action.gameId)
          ? state.favoriteGameIds.filter((id) => id !== action.gameId)
          : [...state.favoriteGameIds, action.gameId],
      };
    case "addBank":
      return { ...state, banks: [...state.banks, { ...action.bank, primary: false }] };
    case "setPrimaryBank":
      return { ...state, banks: state.banks.map((bank) => ({ ...bank, primary: bank.id === action.id })) };
    case "changePassword":
      return { ...state, password: action.password };
    case "updateProfile":
      return { ...state, lineId: action.lineId, birthDate: action.birthDate };
    case "withdrawReferral":
      return withTx({ ...state, balance: state.balance + state.referralEarnings, referralEarnings: 0 }, "promotion", state.referralEarnings, action.at);
    case "confirmSlip":
      return { ...state, balance: state.balance - action.slip.total, lotterySlips: [action.slip, ...state.lotterySlips] };
    default:
      return state;
  }
}
```

`logout` clears `username` and `isAuthenticated` and leaves `balance` as it was. Callers must not dispatch `withdraw`, `redeemShop`, `spinWheel`, or `confirmSlip` when the guard on the page fails.

`STORAGE_KEY = "sport-member-v1"`.

`loadMember` runs only when `typeof window !== "undefined"`. Read the key. If missing, return `createInitialMember()`. If `JSON.parse` throws or the value is not an object with numeric `balance`, remove the key and return `createInitialMember()`.

- [ ] **Step 5: Typecheck**

Run from `sport`: `pnpm exec tsc --noEmit --pretty false`
Expected: exit code 0

- [ ] **Step 6: Commit**

```bash
git add sport/lib/member/types.ts sport/lib/member/reducer.ts sport/lib/coupon.ts sport/data/member.ts
git commit -m "feat(sport): add member reducer and coupon rules"
```

### Task 3: MemberProvider and SheetFrame

**Files:**
- Create: `sport/components/member/MemberProvider.tsx`
- Create: `sport/components/wallet/SheetFrame.tsx`
- Modify: `sport/app/layout.tsx`

**Interfaces:**
- Consumes: `MemberState`, `MemberAction`, `createInitialMember`, `reduceMember`, `loadMember`, `STORAGE_KEY`
- Produces: `useMember(): { state: MemberState; dispatch: (action: MemberAction) => void }`, `SheetFrame`

- [ ] **Step 1: Write the provider**

`"use client"`. `useReducer(reduceMember, null, createInitialMember)`. On mount, `dispatch({ type: "replace", state: loadMember() })`. On every state change after the first paint, `sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))` inside try/catch that ignores quota errors. Context default throws `Error("useMember ต้องอยู่ใต้ MemberProvider")` when used outside.

- [ ] **Step 2: Write `SheetFrame`**

Copy the overlay from `sport/components/home/dialogs.tsx` `DialogFrame`: fixed inset overlay `bg-black/40`, panel `max-w-md rounded-[var(--radius-soft-xl)] bg-[var(--soft-card-elevated)] p-4`, title and a close button labeled `×`. Props: `{ title: string; onClose: () => void; children: React.ReactNode }`. `role="dialog"` `aria-modal="true"` `aria-label={title}`.

- [ ] **Step 3: Wrap the body**

In `sport/app/layout.tsx` wrap `{children}` with `<MemberProvider>`. Keep the font and `data-theme="orange"`.

- [ ] **Step 4: Typecheck and commit**

Run from `sport`: `pnpm exec tsc --noEmit --pretty false`
Expected: exit code 0

```bash
git add sport/components/member/MemberProvider.tsx sport/components/wallet/SheetFrame.tsx sport/app/layout.tsx
git commit -m "feat(sport): persist member state and add sheet frame"
```

### Task 4: Signup and login sheet

**Files:**
- Create: `sport/data/signup.ts`
- Create: `sport/components/auth/AuthSheet.tsx`
- Modify: `sport/components/home/HomePage.tsx`
- Modify: `sport/components/home/dialogs.tsx` (stop exporting `AuthDialog`; keep `InfoDialog`)

**Interfaces:**
- Consumes: `useMember`, `SheetFrame`, `phoneError`, `passwordError`, `personNameError`, `bankAccountError`, `digitsOnly`, `PHONE_DIGIT_LENGTH`, `BANKS` from `sport/data/member.ts`
- Produces: `AuthSheet` props `{ mode: "login" | "register"; onClose: () => void; onSwitch: (mode: "login" | "register") => void }`

- [ ] **Step 1: Write `sport/data/signup.ts`**

```ts
export const SIGNUP_CHANNELS = ["Facebook", "เพื่อนแนะนำ", "Google", "อื่นๆ"] as const;
export const DEPOSIT_RECEIVING_ACCOUNT = {
  bankName: "ธนาคารกสิกรไทย",
  accountNumber: "1234567890",
  accountName: "บจก. โซลิดเอ็กซ์",
};
```

- [ ] **Step 2: Write `AuthSheet`**

Login branch: username and password fields, submit `POST /api/auth/login` with `{ username, password }`. On `response.ok`, read JSON `user.username` and `dispatch({ type: "loginSuccess", username })`, then `onClose()`. On non-OK JSON, show `message`. On throw, show `เชื่อมต่อเซิร์ฟเวอร์ไม่ได้` and do not dispatch.

Register branch local state `step: 1 | 2`. Step 1 fields: phone (digits only, max 10), password, confirm. Continue only when `phoneError`, `passwordError` are null and confirm equals password. Otherwise set the message and stay on step 1. Step 2 fields: first name, last name, bank select from `BANKS`, account number digits max 12, channel select from `SIGNUP_CHANNELS`. Back button sets step to 1. Submit only when both names pass `personNameError`, account passes `bankAccountError`, and channel is selected. Then `dispatch({ type: "signUp", displayName: first + " " + last, phone, password })` and `onClose()`.

Buttons use `h-11`. Panel title is `เข้าสู่ระบบ` or `สมัครสมาชิก`. A text button switches mode via `onSwitch`.

- [ ] **Step 3: Point the home page at `AuthSheet`**

Replace `AuthDialog` import and render with `AuthSheet`. Remove the wallet dialog branch and the `wallet` member of `DialogState`. `WalletDialog` can remain in `dialogs.tsx` unused; delete its export usage from `HomePage.tsx` only.

- [ ] **Step 4: Typecheck and commit**

Run from `sport`: `pnpm exec tsc --noEmit --pretty false`
Expected: exit code 0

```bash
git add sport/data/signup.ts sport/components/auth/AuthSheet.tsx sport/components/home/HomePage.tsx sport/components/home/dialogs.tsx
git commit -m "feat(sport): add two-step signup and login sheet"
```

### Task 5: Wallet page

**Files:**
- Create: `sport/lib/transactions.ts`
- Create: `sport/components/wallet/WalletScreen.tsx`
- Modify: `sport/app/wallet/page.tsx` (render `WalletScreen` inside `Suspense` because it reads `useSearchParams`)

**Interfaces:**
- Consumes: `useMember`, `SheetFrame`, `applyCoupon`, `moneyAmountError`, `digitsOnly`, `MONEY_AMOUNT_MAX_DIGITS`, `COUPON_CODE_MAX_LENGTH`, `DEPOSIT_AMOUNTS`, `DEPOSIT_RECEIVING_ACCOUNT`
- Produces: `filterTransactions(items: Transaction[], kind: TransactionKind, from: string, to: string): Transaction[]`, `PAGE_SIZE = 10`

- [ ] **Step 1: Write `sport/lib/transactions.ts`**

`filterTransactions` keeps rows whose `kind` matches and whose `at` is `>= from` when `from` is non-empty and `<= to` when `to` is non-empty. Compare the `YYYY-MM-DD` prefix.

- [ ] **Step 2: Write `WalletScreen`**

Query `tab`: `deposit` opens the deposit action, `history` opens history, anything else opens deposit/withdraw main tab.

Main tabs: `ฝาก/ถอน`, `คูปอง`, `ประวัติ`. Buttons `h-10`.

Inside ฝาก/ถอน, two buttons open `SheetFrame`: `ฝาก` and `ถอน`. Closing the sheet returns to step `methods` or an empty withdraw amount.

Deposit sheet steps:

1. Three buttons: บัญชีธนาคาร goes to step `bank`. Payment Gateway and ทรูวอลเล็ท set message `ยังไม่เปิดให้บริการ` and stay on `methods`.
2. Show `DEPOSIT_RECEIVING_ACCOUNT`. Copy button writes `accountNumber` and sets message `คัดลอกเลขบัญชีแล้ว`. Quick amounts from `DEPOSIT_AMOUNTS` plus a numeric input sanitized by `digitsOnly`. Next is disabled when `moneyAmountError` returns a string. Show that string.
3. Show the amount and a file input. On change store `file.name`. Confirm dispatches `{ type: "deposit", amount, at: today YYYY-MM-DD }`, sets message `ฝากเงินสำเร็จ`, and returns to `methods`.

Withdraw sheet: list only banks with `status === "verified"`. Amount input and a button `ถอนทั้งหมด` that fills `String(Math.floor(state.balance))`. Confirm button `disabled` when there is no verified bank, `moneyAmountError` is set, or the amount is greater than `state.balance`. On submit dispatch `{ type: "withdraw", amount, at: today }` and set message `ถอนเงินสำเร็จ`.

Coupon: input `maxLength={20}`. Submit calls `applyCoupon`. On `kind: "baht"` dispatch `couponCredit`. On `kind: "gems"` dispatch `couponGems`. Show `message` either way. Do not dispatch when `ok` is false.

History: kind buttons ฝาก ถอน โปรโมชั่น เดิมพัน, two date inputs, list `filterTransactions(...).slice(page * 10, page * 10 + 10)`. Pager buttons when more rows exist. A row with status `รอดำเนินการ` is a button that opens `SheetFrame` showing kind, amount, `at`, and status.

Show `ยอดคงเหลือ` from `state.balance` at the top. Wrap with `SubPageShell` title `ฝาก-ถอน` nav `wallet`.

- [ ] **Step 3: Replace `sport/app/wallet/page.tsx`**

Default export renders `<Suspense fallback={null}><WalletScreen /></Suspense>`.

- [ ] **Step 4: Typecheck, lint, build**

Run from `sport`:

```bash
pnpm exec tsc --noEmit --pretty false
pnpm lint
pnpm build
```

Expected: each command exit code 0

- [ ] **Step 5: Manual check**

1. Open `/`. สมัครด้วยเบอร์ 9 หลักแล้วเห็นข้อความเบอร์ และยังอยู่ขั้นที่ 1
2. สมัครครบสองขั้น ปิดแผงแล้วรีเฟรช ชื่อที่แสดงยังเป็นชื่อที่กรอก
3. ล็อกอินด้วยชื่อ `demo` แล้วเห็นข้อความสำเร็จ
4. เปิด `/wallet` เลือก Payment Gateway แล้วเห็น `ยังไม่เปิดให้บริการ`
5. ฝากธนาคาร 100 บาทถึงขั้นสลิป ยอดเพิ่ม 100
6. ถอนมากกว่ายอด ปุ่มยืนยันกดไม่ได้ ถอน 100 ได้และยอดลด
7. คูปอง `SPORT100` เพิ่ม 100 บาท คูปอง `NOPE` ไม่เปลี่ยนยอด
8. ประวัติกรองฝากและช่วง `2026-09-26` ถึง `2026-09-26` เหลือแถวรอ เปิดแผงแล้วเห็น `รอดำเนินการ`

- [ ] **Step 6: Commit**

```bash
git add sport/lib/transactions.ts sport/components/wallet/WalletScreen.tsx sport/app/wallet/page.tsx
git commit -m "feat(sport): add deposit, withdraw, coupon, and history flows"
```
