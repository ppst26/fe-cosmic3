# Lottery Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ให้ฮับหวย หน้าแทงของตลาดทั่วไป รัฐบาล และยี่กี และรายการสลิป หักยอดผ่าน `confirmSlip`

**Architecture:** ตลาดและรอบเป็นข้อมูลคงที่ หน้าแทงใช้คอมโพเนนต์เดียวกัน `LotteryPlayScreen` ยี่กีเพิ่มแถบรอบกับแผงวิธีแทงห้าขั้น สลิปที่ยืนยันแล้วอยู่ใน `state.lotterySlips`

**Tech Stack:** Next.js 16.3.7, React 19.2.8, TypeScript, Tailwind CSS 4, pnpm

**Depends on:** แผน 01 ต้องมี `LotterySlip`, `state.balance`, `state.lotterySlips`, `dispatch({ type: "confirmSlip"; slip: LotterySlip })`

## Global Constraints

- ใช้ `SubPageShell` และคลาส soft
- ยืนยันได้เมื่อมีอย่างน้อยหนึ่งรายการและผลรวมไม่เกิน `state.balance`
- รหัสตลาดหรือรอบที่ไม่มีแสดง `ไม่พบรอบ` และลิงก์ไป `/lottery`
- ปุ่มสูงอย่างน้อย `h-10`
- จบแผนด้วย `pnpm lint` และ `pnpm build`

---

### Task 1: Lottery catalog

**Files:**
- Create: `sport/data/lottery.ts`
- Create: `sport/lib/lottery/slip.ts`

**Interfaces:**
- Produces: `LotteryMarket`, `getMarket(marketId: string)`, `getRound(marketId: string, roundId: string)`, `slipTotal(lines: { price: number }[]): number`, `canConfirmSlip(lineCount: number, total: number, balance: number): boolean`

- [ ] **Step 1: Write markets**

Groups:

- `general`: id `hanoi` name `ฮานอย`, id `laos` name `ลาว`
- `government`: id `thai-government` name `หวยรัฐบาล` route base `/lottery/thai-government`
- `yiki`: ids `yiki-5`, `yiki-15`, `yiki-30` names `ยี่กี 5 นาที`, `ยี่กี 15 นาที`, `ยี่กี 30 นาที`

Each market has two rounds: id `r1` label `งวดปัจจุบัน`, id `r2` label `งวดถัดไป`.

Bet types for every market: `วิ่งบน`, `วิ่งล่าง`, `สองตัวบน`, `สามตัวบน`.

```ts
export const YIKI_HOW_TO = [
  "เลือกประเภทรายการ",
  "กดเลขจากแป้น",
  "ตั้งราคา",
  "ตรวจสลิป",
  "ยืนยันโพย",
] as const;
```

- [ ] **Step 2: Write slip helpers**

`slipTotal` sums `price`. `canConfirmSlip` returns true only when `lineCount > 0` and `total > 0` and `total <= balance`.

- [ ] **Step 3: Typecheck and commit**

Run from `sport`: `pnpm exec tsc --noEmit --pretty false`
Expected: exit code 0

```bash
git add sport/data/lottery.ts sport/lib/lottery/slip.ts
git commit -m "feat(sport): add lottery markets and slip checks"
```

### Task 2: Hub, rounds, and play screen

**Files:**
- Create: `sport/components/lottery/LotteryHub.tsx`
- Create: `sport/components/lottery/LotteryRoundList.tsx`
- Create: `sport/components/lottery/LotteryPlayScreen.tsx`
- Create: `sport/app/lottery/page.tsx`
- Create: `sport/app/lottery/[marketId]/page.tsx`
- Create: `sport/app/lottery/[marketId]/[roundId]/page.tsx`
- Create: `sport/app/lottery/thai-government/page.tsx`
- Create: `sport/app/lottery/thai-government/[roundId]/page.tsx`
- Create: `sport/app/lottery/yiki-5/page.tsx`
- Create: `sport/app/lottery/yiki-5/[roundId]/page.tsx`
- Create: `sport/app/lottery/yiki-15/page.tsx`
- Create: `sport/app/lottery/yiki-15/[roundId]/page.tsx`
- Create: `sport/app/lottery/yiki-30/page.tsx`
- Create: `sport/app/lottery/yiki-30/[roundId]/page.tsx`

**Interfaces:**
- Consumes: catalog, `canConfirmSlip`, `slipTotal`, `useMember`, `LotterySlip`
- Produces: `LotteryPlayScreen` props `{ marketId: string; roundId: string; showYikiHelp: boolean }`

- [ ] **Step 1: Write the hub and round list**

`LotteryHub` renders three headings `หวยทั่วไป` `หวยรัฐบาล` `ยี่กี`. General markets link to `/lottery/${id}`. Government links to `/lottery/thai-government`. Yiki links to `/lottery/${id}`.

`LotteryRoundList` props `{ marketId: string; basePath: string }`. If `getMarket` is null, show `ไม่พบรอบ` and a link to `/lottery`. Otherwise link each round to `${basePath}/${round.id}`.

Pages:

- `/lottery` renders the hub
- `/lottery/[marketId]` renders `LotteryRoundList` with `basePath` `/lottery/${marketId}` for general ids only. If the id is `thai-government` or starts with `yiki-`, still resolve through `getMarket` so unknown ids hit `ไม่พบรอบ`
- Dedicated round-list pages for government and each yiki pass their own base path

- [ ] **Step 2: Write `LotteryPlayScreen`**

If market or round is missing, show `ไม่พบรอบ` and link `/lottery`.

Local draft lines: `{ id, betType, number, price }`. Controls:

- Bet type buttons from the market list
- Digit buttons `0`–`9` append one digit up to 3
- A clear-number button
- Price buttons `10` `20` `50` `100`
- Add button creates a line when `number` is non-empty and price is one of those four. New id is `line-${Date.now()}`
- Each line has a price select of the same four values and a delete button

Show `slipTotal`. Confirm is `disabled` when `canConfirmSlip(lines.length, total, state.balance)` is false. When disabled because total exceeds balance, show `ยอดไม่พอ`. When the slip is empty, show `สลิปยังว่าง`.

Confirm builds a `LotterySlip` with `status: "บันทึกแล้ว"`, `at` today `YYYY-MM-DD`, `id` `slip-${Date.now()}`, dispatches `confirmSlip`, clears the draft, and shows a link to `/lottery/slips`.

When `showYikiHelp` is true, render `YIKI_HOW_TO` as a numbered list and a row of links to the other rounds of the same market using `getMarket(marketId).rounds`.

Government and yiki play pages pass their fixed market id. The generic `[marketId]/[roundId]` page passes `showYikiHelp` when `marketId.startsWith("yiki-")`.

Client pages unwrap `params` with `React.use` as in plan 04.

- [ ] **Step 3: Typecheck and commit**

Run from `sport`: `pnpm exec tsc --noEmit --pretty false`
Expected: exit code 0

```bash
git add sport/components/lottery sport/app/lottery
git commit -m "feat(sport): add lottery hub and bet slip flow"
```

### Task 3: Slip list and detail

**Files:**
- Create: `sport/components/lottery/SlipListScreen.tsx`
- Create: `sport/components/lottery/SlipDetailScreen.tsx`
- Create: `sport/app/lottery/slips/page.tsx`
- Create: `sport/app/lottery/slips/[slipId]/page.tsx`

**Interfaces:**
- Consumes: `state.lotterySlips`

- [ ] **Step 1: Write list and detail**

List links each slip to `/lottery/slips/${slip.id}` and shows market id, total, and status `บันทึกแล้ว`. Empty state text is `ยังไม่มีโพย`.

Detail finds the slip by id. Missing id shows `ไม่พบรอบ` and a link to `/lottery/slips`. A found slip lists each line's bet type, number, and price, then the total.

- [ ] **Step 2: Lint, build, and manual check**

Run from `sport`:

```bash
pnpm exec tsc --noEmit --pretty false
pnpm lint
pnpm build
```

Expected: exit code 0

Manual:

1. `/lottery` เข้าฮานอย เลือกงวดปัจจุบัน เพิ่มเลข `12` ราคา 10 แล้วยืนยัน ยอดบาทลด 10
2. เปิด `/lottery/slips` แล้วเข้าโพยนั้น เห็นเลข `12`
3. เปิด `/lottery/yiki-5/r1` เห็นวิธีแทงห้าขั้นและสลับไป `r2` ได้
4. เปิด `/lottery/nope/r1` เห็น `ไม่พบรอบ` และลิงก์กลับ `/lottery`
5. ตั้งราคาในสลิปให้เกินยอด ปุ่มยืนยันกดไม่ได้และขึ้น `ยอดไม่พอ`

- [ ] **Step 3: Commit**

```bash
git add sport/components/lottery/SlipListScreen.tsx sport/components/lottery/SlipDetailScreen.tsx sport/app/lottery/slips
git commit -m "feat(sport): list and open saved lottery slips"
```
