# Rewards Workflows Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ให้กิจกรรม เช็คอิน คืนยอด ร้านเพชร และวงล้อเดินขั้นตอนเดียวกับ glass โดยเขียนยอดผ่าน `useMember()`

**Architecture:** ข้อมูลคงที่อยู่ใน `sport/data` หน้าแต่ละหน้าเป็นไคลเอนต์คอมโพเนนต์ใต้ `SubPageShell` สถานะขั้นอยู่ที่หน้า ยอดอยู่ที่ `MemberState`

**Tech Stack:** Next.js 16.3.7, React 19.2.8, TypeScript, Tailwind CSS 4, pnpm

**Depends on:** `2026-09-30-glass-workflows-01-wallet.md` ต้องเสร็จก่อน ใช้ `useMember()` และแอ็กชัน `claimActivity`, `checkIn`, `claimCashback`, `redeemShop`, `spinWheel`

## Global Constraints

- ใช้คลาส soft และ `SubPageShell` ปุ่มสูงอย่างน้อย `h-10`
- ข้อความผิดเงื่อนไขอยู่ในหน้า และไม่ dispatch เมื่อทำไม่สำเร็จ
- จบแผนด้วย `pnpm lint` และ `pnpm build` ในโฟลเดอร์ `sport`
- ข้อมูลเริ่มต้น: กิจกรรมมีอย่างน้อยหนึ่งรายการที่ถึงเป้าและหนึ่งรายการที่ยังไม่ถึง, คืนยอดเล่น `45.2` เหนือขั้นต่ำ `20`, คืนยอดเสีย `10` ต่ำกว่าขั้นต่ำ `20`, ตั๋ววงล้อเริ่มที่ 1, โควตาแลกเพชรเริ่มที่ 1 จาก 3

---

### Task 1: Activity hub

**Files:**
- Create: `sport/data/activities.ts`
- Create: `sport/components/activities/ActivitiesScreen.tsx`
- Modify: `sport/app/activities/page.tsx`

**Interfaces:**
- Consumes: `dispatch({ type: "claimActivity"; id: string; reward: number; at: string })`, `state.claimedActivityIds`, `state.balance`
- Produces: `ActivityItem` with `id`, `category: "slot" | "casino"`, `title`, `currentTurn`, `targetTurn`, `rewardBaht`, `tiers: { rank: string; target: number; reward: number }[]`

- [ ] **Step 1: Write seed data**

`sport/data/activities.ts` exports `ACTIVITIES`:

- id `turnover`, category `slot`, title `ทำยอด Turn รับรางวัล`, `currentTurn: 5000`, `targetTurn: 3000`, `rewardBaht: 100`, tiers rank 1 target 3000 reward 100 and rank 2 target 10000 reward 300
- id `football`, category `casino`, title `ทายผลบอล`, `currentTurn: 100`, `targetTurn: 1000`, `rewardBaht: 50`, tiers rank 1 target 1000 reward 50

- [ ] **Step 2: Write `ActivitiesScreen`**

Category buttons `ทั้งหมด` `สล็อต` `คาสิโน` filter the list. Selecting an item shows a detail block in the same page: current turn, target, a progress width `Math.min(100, current/target*100)%`, and the tier table. Claim button is `disabled` when `currentTurn < targetTurn` or `claimedActivityIds` includes the id. Label becomes `รับแล้ว` after claim. Click dispatches `claimActivity` with `at` equal to today's `YYYY-MM-DD` and sets a local message `รับรางวัลแล้ว`.

`sport/app/activities/page.tsx` renders this screen inside `SubPageShell` title `กิจกรรม` nav `events`.

- [ ] **Step 3: Typecheck and commit**

Run from `sport`: `pnpm exec tsc --noEmit --pretty false`
Expected: exit code 0

```bash
git add sport/data/activities.ts sport/components/activities/ActivitiesScreen.tsx sport/app/activities/page.tsx
git commit -m "feat(sport): add activity claim flow"
```

### Task 2: Daily check-in

**Files:**
- Create: `sport/components/check-in/CheckInScreen.tsx`
- Modify: `sport/app/check-in/page.tsx`

**Interfaces:**
- Consumes: `CHECKIN_DAYS` from `sport/data/member.ts`, `dispatch({ type: "checkIn"; diamonds: number })`, `state.checkedInToday`, `state.diamonds`

- [ ] **Step 1: Write the screen**

Render seven cells from `CHECKIN_DAYS`. A day is claimed when `item.claimed` is true, or when `item.today && state.checkedInToday`. The claim button is `disabled` when `state.checkedInToday` is true. Click finds the row with `today: true` and dispatches `checkIn` with `diamonds: item.reward`. The seed row for today has `reward: 5`, so the balance increases by 5. A row with `special: true` shows the label `พิเศษ` and its own `reward` (Sunday is 20). Message: `รับเพชรวันนี้แล้ว`.

Replace `sport/app/check-in/page.tsx` with the shell plus this screen. Title `เช็คอินรายวัน`.

- [ ] **Step 2: Typecheck and commit**

Run from `sport`: `pnpm exec tsc --noEmit --pretty false`
Expected: exit code 0

```bash
git add sport/components/check-in/CheckInScreen.tsx sport/app/check-in/page.tsx
git commit -m "feat(sport): claim daily check-in through member state"
```

### Task 3: Cashback

**Files:**
- Create: `sport/data/cashback.ts`
- Create: `sport/components/commission/CommissionScreen.tsx`
- Modify: `sport/app/commission/page.tsx`

**Interfaces:**
- Consumes: `state.cashbackPlay`, `state.cashbackLoss`, `state.cashbackClaims`, `dispatch({ type: "claimCashback"; tab: "play" | "loss"; at: string })`

- [ ] **Step 1: Write rates**

```ts
export const CASHBACK_RATES = {
  play: { label: "คืนยอดเล่น", rate: "0.5%", min: 20 },
  loss: { label: "คืนยอดเสีย", rate: "5%", min: 20 },
} as const;
```

- [ ] **Step 2: Write the screen**

Two tabs. Show rate, minimum, and the available amount for the active tab. Claim is `disabled` when the amount is below `min` or the amount is 0. Click dispatches `claimCashback`. List `state.cashbackClaims` under the panel.

Replace the page body with `SubPageShell` title `คอมมิชชั่น` and this screen.

- [ ] **Step 3: Typecheck and commit**

Run from `sport`: `pnpm exec tsc --noEmit --pretty false`
Expected: exit code 0

```bash
git add sport/data/cashback.ts sport/components/commission/CommissionScreen.tsx sport/app/commission/page.tsx
git commit -m "feat(sport): claim play and loss cashback"
```

### Task 4: Diamond shop

**Files:**
- Create: `sport/data/shopTerms.ts`
- Create: `sport/components/shop/ShopScreen.tsx`
- Modify: `sport/app/shop/page.tsx`

**Interfaces:**
- Consumes: `SHOP_PACKAGES` from `sport/data/member.ts`, `state.diamonds`, `state.shopRedeemsToday`, `dispatch({ type: "redeemShop"; cost: number; credits: number })`

- [ ] **Step 1: Write terms and screen**

`SHOP_TERMS` is the string `แลกได้ไม่เกิน 3 ครั้งต่อวัน เพชรที่แลกแล้วคืนไม่ได้`.

Screen shows diamonds and `โควตาวันนี้ {shopRedeemsToday}/3`. A button toggles the terms panel. Each package button sets message `เพชรไม่พอ` when `diamonds < cost`, or `ใช้โควตาแลกรายวันครบ 3/3 แล้ว` when `shopRedeemsToday >= 3`, and does not dispatch. Otherwise dispatch `redeemShop` and set message `แลกเครดิต {credits} สำเร็จ`.

- [ ] **Step 2: Typecheck and commit**

Run from `sport`: `pnpm exec tsc --noEmit --pretty false`
Expected: exit code 0

```bash
git add sport/data/shopTerms.ts sport/components/shop/ShopScreen.tsx sport/app/shop/page.tsx
git commit -m "feat(sport): redeem diamond shop packages with a daily quota"
```

### Task 5: Lucky wheel

**Files:**
- Create: `sport/data/wheel.ts`
- Create: `sport/components/wheel/WheelScreen.tsx`
- Create: `sport/app/wheel/page.tsx`

**Interfaces:**
- Consumes: `state.tickets`, `state.diamonds`, `state.wheelHistory`, `state.wheelWinners`, `dispatch({ type: "spinWheel"; method: "ticket" | "gems"; prize: string; credit: number; gems: number; at: string })`
- Produces: route `/wheel`

- [ ] **Step 1: Write segments**

```ts
export const WHEEL_SEGMENTS = [
  { id: "s1", label: "50 บาท", credit: 50, gems: 0 },
  { id: "s2", label: "10 เพชร", credit: 0, gems: 10 },
  { id: "s3", label: "20 บาท", credit: 20, gems: 0 },
  { id: "s4", label: "ขอบคุณ", credit: 0, gems: 0 },
] as const;
export const GEMS_PER_SPIN = 50;
```

- [ ] **Step 2: Write the screen and page**

Local state: `method: "ticket" | "gems"`, `spinning: boolean`, `rotation: number`, `lastWin: string | null`, `termsOpen: boolean`.

Spin is `disabled` when `spinning` is true, or method is `ticket` and `tickets < 1`, or method is `gems` and `diamonds < 50`. Choose segment index `Math.floor(Math.random() * WHEEL_SEGMENTS.length)`. Set `spinning` true and add `360 * 4 + index * 90` to `rotation`. A wheel element uses `style={{ transform: \`rotate(${rotation}deg)\`, transition: "transform 2s" }}`. After 2000ms dispatch `spinWheel` with that segment, set `lastWin` to the label, and set `spinning` false. Clear the timer on unmount.

Show winners from `state.wheelWinners` and history from `state.wheelHistory`. Terms button toggles the text `หมุนครั้งละ 1 ตั๋ว หรือ 50 เพชร`.

`sport/app/wheel/page.tsx` renders `SubPageShell` title `วงล้อ` plus `WheelScreen`. Add `{ href: "/wheel", label: "วงล้อ", emoji: "🎡" }` to `MEMBER_LINKS` in `sport/data/member.ts`.

- [ ] **Step 3: Lint, build, and manual check**

Run from `sport`:

```bash
pnpm exec tsc --noEmit --pretty false
pnpm lint
pnpm build
```

Expected: exit code 0

Manual:

1. `/activities` เปิดทำยอด Turn แล้วกดรับ ยอดเพิ่ม 100 และปุ่มเป็นรับแล้ว ทายผลบอลปุ่มรับกดไม่ได้
2. `/check-in` กดครั้งแรกเพชรเพิ่ม 5 กดครั้งที่สองปุ่มปิด
3. `/commission` แท็บคืนยอดเสียปุ่มรับกดไม่ได้ แท็บคืนยอดเล่นรับได้ ยอดบาทเพิ่ม 45.2 และยอดที่รับได้เป็น 0
4. `/shop` กดแลกจนโควตาเป็น 3/3 ครั้งถัดไปขึ้นข้อความโควตาและเพชรไม่ลด
5. `/wheel` หมุนด้วยตั๋วหนึ่งครั้งจนตั๋วเป็น 0 ปุ่มหมุนด้วยตั๋วกดไม่ได้ ระหว่างหมุนปุ่มกดไม่ได้

- [ ] **Step 4: Commit**

```bash
git add sport/data/wheel.ts sport/components/wheel/WheelScreen.tsx sport/app/wheel/page.tsx sport/data/member.ts
git commit -m "feat(sport): add lucky wheel spin flow"
```
