# Member Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ให้โปรโมชั่น ชวนเพื่อน VIP และโปรไฟล์ใช้ขั้นตอนของ glass และเขียนลง `MemberState`

**Architecture:** แต่ละหน้าเป็นไคลเอนต์คอมโพเนนต์ใต้ `SubPageShell` ตัวกรองวันที่ของรายได้ชวนเพื่อนตัดเฉพาะแถวในตาราง ยอดถอนได้เป็นก้อน `referralEarnings`

**Tech Stack:** Next.js 16.3.7, React 19.2.8, TypeScript, Tailwind CSS 4, pnpm

**Depends on:** แผน 01 ต้องมี `useMember()` และแอ็กชัน `setPromoOptIn`, `withdrawReferral`, `addBank`, `setPrimaryBank`, `changePassword`, `updateProfile`, `logout`

## Global Constraints

- คลาส soft และ `SubPageShell` ปุ่มสูงอย่างน้อย `h-10`
- เปลี่ยนรหัสใช้รหัสเดิม `demo1234` จนกว่าผู้ใช้จะสมัครทับรหัส
- ออกจากระบบล้าง `isAuthenticated` และไม่ลด `balance`
- จบแผนด้วย `pnpm lint` และ `pnpm build`

---

### Task 1: Promotions

**Files:**
- Create: `sport/components/promotions/PromotionsScreen.tsx`
- Modify: `sport/app/promotions/page.tsx`

**Interfaces:**
- Consumes: `PROMOTIONS` and `PromotionItem` from `sport/data/homeLobby.ts`, `state.promoOptIn`, `dispatch({ type: "setPromoOptIn"; value: boolean })`
- Produces: detail panel and a link to `/wallet?tab=deposit`

- [ ] **Step 1: Write the screen**

Two filter buttons `โปรโมชั่น` (`general`) and `โปรโมชั่นพิเศษ` (`special`) using the existing `category` field. A full-width switch button shows `เปิดรับโปรโมชั่น` when `promoOptIn` is true and `ปิดรับโปรโมชั่น` when false. Click dispatches the inverted value and sets message `เปิดรับโปรโมชั่นแล้ว ท่านจะได้รับสิทธิพิเศษทุกยอดฝาก` or `ปิดรับโปรโมชั่นแล้ว ยอดฝากจะไม่ติดเงื่อนไขเทิร์นโอเวอร์`.

Clicking a card sets `selected`. The detail panel shows `title`, `desc`, a `Link` to `/wallet?tab=deposit` labeled `รับโปรและไปฝากเงิน`, and a close button that clears `selected`.

Replace `sport/app/promotions/page.tsx` with `SubPageShell` title `โปรโมชั่น` nav `promo` plus this screen.

- [ ] **Step 2: Typecheck and commit**

Run from `sport`: `pnpm exec tsc --noEmit --pretty false`
Expected: exit code 0

```bash
git add sport/components/promotions/PromotionsScreen.tsx sport/app/promotions/page.tsx
git commit -m "feat(sport): open promotion detail and store opt-in"
```

### Task 2: Referral

**Files:**
- Create: `sport/data/referral.ts`
- Create: `sport/lib/referralFilter.ts`
- Create: `sport/components/referral/ReferralScreen.tsx`
- Modify: `sport/app/referral/page.tsx`

**Interfaces:**
- Consumes: `REFERRAL_LINK`, `MEMBER` from `sport/data/member.ts`, `state.referralEarnings`, `state.balance`, `dispatch({ type: "withdrawReferral"; at: string })`
- Produces: `filterReferralRows(rows: ReferralEarningRow[], range: "all" | "today" | "last_week" | "last_month", today: string): ReferralEarningRow[]`

- [ ] **Step 1: Write rows and filter**

`ReferralFriend` is `{ id: string; name: string }`. Seed three friends named `สมชาย`, `สมหญิง`, `วิชัย`.

`ReferralEarningRow` is `{ id: string; at: string; category: string; commission: number }`. Seed one row dated today computed at render time is not stable. Write fixed dates in the data file: `2026-09-30` commission 72 category `สล็อต`, `2026-09-20` commission 32 category `คาสิโน`, `2026-08-15` commission 25 category `กีฬา`.

Write `filterReferralRows` as:

```ts
function atNoon(iso: string): Date {
  return new Date(`${iso}T12:00:00Z`);
}

export function filterReferralRows(
  rows: ReferralEarningRow[],
  range: "all" | "today" | "last_week" | "last_month",
  today: string,
): ReferralEarningRow[] {
  if (range === "all") return rows;
  if (range === "today") return rows.filter((row) => row.at === today);
  if (range === "last_month") {
    const cursor = atNoon(today);
    const month = cursor.getUTCMonth() === 0 ? 12 : cursor.getUTCMonth();
    const year = cursor.getUTCMonth() === 0 ? cursor.getUTCFullYear() - 1 : cursor.getUTCFullYear();
    const prefix = `${year}-${String(month).padStart(2, "0")}`;
    return rows.filter((row) => row.at.startsWith(prefix));
  }
  const cursor = atNoon(today);
  const weekday = cursor.getUTCDay();
  const mondayOffset = weekday === 0 ? 6 : weekday - 1;
  const thisMonday = new Date(cursor);
  thisMonday.setUTCDate(cursor.getUTCDate() - mondayOffset);
  const start = new Date(thisMonday);
  start.setUTCDate(thisMonday.getUTCDate() - 7);
  const end = new Date(thisMonday);
  end.setUTCDate(thisMonday.getUTCDate() - 1);
  const startIso = start.toISOString().slice(0, 10);
  const endIso = end.toISOString().slice(0, 10);
  return rows.filter((row) => row.at >= startIso && row.at <= endIso);
}
```

- [ ] **Step 2: Write the screen**

Tabs `ภาพรวม` `เพื่อนที่แนะนำ` `รายได้`.

Overview shows three numbered steps: `คัดลอกลิงก์`, `ส่งให้เพื่อน`, `รับรายได้เมื่อเพื่อนเล่น`. Show `REFERRAL_LINK` and a button that copies it and sets message `คัดลอกลิงก์แล้ว`.

Friends tab has a name input. Show friends whose name includes the query.

Earnings tab has the four range buttons and calls `filterReferralRows` with `today` from `new Date().toISOString().slice(0, 10)`. Show `state.referralEarnings` outside the filtered list. Withdraw button is `disabled` when `referralEarnings <= 0`. Click dispatches `withdrawReferral` and sets message `ถอนรายได้เข้ากระเป๋าแล้ว`.

- [ ] **Step 3: Typecheck and commit**

Run from `sport`: `pnpm exec tsc --noEmit --pretty false`
Expected: exit code 0

```bash
git add sport/data/referral.ts sport/lib/referralFilter.ts sport/components/referral/ReferralScreen.tsx sport/app/referral/page.tsx
git commit -m "feat(sport): split referral overview, friends, and earnings"
```

### Task 3: VIP

**Files:**
- Create: `sport/components/vip/VipScreen.tsx`
- Modify: `sport/app/vip/page.tsx`

**Interfaces:**
- Consumes: `VIP_TIERS` from `sport/data/member.ts`
- Produces: tabs `my-tier`, `rank`, `benefits`

- [ ] **Step 1: Write the screen**

Current tier is the `gold` row. Next tier is `platinum`. Turnover progress uses current 1450 and next `turnover` 5000. Bar width is `(1450 / 5000) * 100` percent.

`my-tier` shows the gold name, cashback, and the bar text `1450 / 5,000`.

`rank` shows one tier at a time with buttons `ก่อนหน้า` and `ถัดไป` that clamp the index inside `VIP_TIERS`.

`benefits` renders a table with columns แรงค์, เทิร์น, แคชแบ็ก for every tier. This table is not the same list as the rank carousel. Include a column `เงื่อนไข` with the text `รักษาแรงค์ด้วยเทิร์นสะสม`.

- [ ] **Step 2: Typecheck and commit**

Run from `sport`: `pnpm exec tsc --noEmit --pretty false`
Expected: exit code 0

```bash
git add sport/components/vip/VipScreen.tsx sport/app/vip/page.tsx
git commit -m "feat(sport): add vip progress, rank carousel, and benefits table"
```

### Task 4: Profile

**Files:**
- Create: `sport/components/profile/ProfileScreen.tsx`
- Modify: `sport/app/profile/page.tsx`

**Interfaces:**
- Consumes: `BANKS`, `bankAccountError`, `digitsOnly`, `passwordError`, `useMember` actions `updateProfile`, `addBank`, `setPrimaryBank`, `changePassword`, `logout`

- [ ] **Step 1: Write three tabs**

`ข้อมูลส่วนตัว` inputs for LINE and birth date, initialized from `state.lineId` and `state.birthDate`. Save dispatches `updateProfile`.

`บัญชีธนาคาร` lists `state.banks`. A verified primary account shows `บัญชีหลัก`. A button on a non-primary row dispatches `setPrimaryBank`. The add form has a bank select, digit account input max 12, and is blocked with `bankAccountError` text when invalid. Valid submit dispatches `addBank` with a new id `b-${Date.now()}`, `primary: false`, `status: "pending"`, `accountHolder: state.displayName`.

`รหัสผ่าน` requires current password equal to `state.password`, `passwordError(next)` null, and confirm equal to next. Otherwise show the matching message and do not dispatch. Success dispatches `changePassword` and shows `เปลี่ยนรหัสแล้ว`.

Logout button dispatches `logout` and shows `ออกจากระบบแล้ว`. `state.balance` stays on screen so the reader can see it did not change.

- [ ] **Step 2: Lint, build, and manual check**

Run from `sport`:

```bash
pnpm exec tsc --noEmit --pretty false
pnpm lint
pnpm build
```

Expected: exit code 0

Manual:

1. `/promotions` เปิดการ์ดแล้วลิงก์ไป `/wallet?tab=deposit` สวิตช์รับโปรยังอยู่หลังรีเฟรช
2. `/referral` ค้น `สม` เหลือสมชายกับสมหญิง แท็บรายได้เลือกเดือนก่อนแล้วแถวกันยายนหาย ถอนรายได้แล้วบาทเพิ่มเท่า `referralEarnings` เดิมและยอดถอนได้เป็น 0
3. `/vip` กดถัดไปจนครบห้าแรงค์ แท็บสิทธิประโยชน์เห็นห้าแถว
4. `/profile` เพิ่มบัญชีเลขสั้นแล้วเห็นข้อความเลขบัญชี เพิ่มเลข 10 หลักได้ เปลี่ยนรหัสด้วย `demo1234` สำเร็จ ออกจากระบบแล้วยอดบาทเท่าเดิม

- [ ] **Step 3: Commit**

```bash
git add sport/components/profile/ProfileScreen.tsx sport/app/profile/page.tsx
git commit -m "feat(sport): add profile bank, password, and logout flows"
```
