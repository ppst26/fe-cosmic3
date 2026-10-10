# Game Provider Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ให้หมวดบนหน้าหลักเข้าหน้ารวมค่าย และในค่ายมีค้นหา ตัวกรอง กริดเกม หัวใจ และแผงเข้าเกม

**Architecture:** ข้อมูลค่ายและเกมอยู่ใน `sport/data/providers.ts` เส้นทางหมวดคือ `/slots` `/casino` `/fishing` `/cards` `/sport-games` และ `/{หมวด}/[provider]` รหัสที่ไม่มีแสดงหน้าไม่พบค่าย เกมโปรดเก็บด้วยแอ็กชัน `toggleFavorite`

**Tech Stack:** Next.js 16.3.7, React 19.2.8, TypeScript, Tailwind CSS 4, pnpm

**Depends on:** แผน 01 ต้องมี `state.favoriteGameIds` และ `dispatch({ type: "toggleFavorite"; gameId: string })`

## Global Constraints

- กริดเกมบนมือถือเป็น `grid-cols-3` แล้ว `md:grid-cols-4` `lg:grid-cols-6` ตาม `sport/design.md`
- การ์ดใช้คลาส soft ไม่ใช้พื้นดำของ Legend Pro
- ปุ่มสูงอย่างน้อย `h-10`
- จบแผนด้วย `pnpm lint` และ `pnpm build`

---

### Task 1: Provider catalog

**Files:**
- Create: `sport/data/providers.ts`
- Create: `sport/lib/games/filterGames.ts`

**Interfaces:**
- Produces: `GameCategory = "slots" | "casino" | "fishing" | "cards" | "sport-games"`, `ProviderRecord`, `ProviderGame`, `getCategory(slug: string): GameCategory | null`, `getProvider(category: GameCategory, providerId: string): ProviderRecord | null`, `filterProviderGames(games: ProviderGame[], query: string, tab: "all" | "hot" | "new" | "favorite", favoriteIds: string[]): ProviderGame[]`

- [ ] **Step 1: Write the catalog**

Each category has two providers. Each provider has four games. Game fields: `id`, `title`, `hot: boolean`, `isNew: boolean`.

Use these ids so links are stable:

- slots: `pg` (PG SOFT), `jili` (JILI)
- casino: `sexy` (SEXY GAMING), `sa` (SA GAMING)
- fishing: `jili-fish` (JILI FISH), `spadegaming` (SPADE)
- cards: `kingmidas` (KING MIDAS), `km` (KM POKER)
- sport-games: `onebx` (ONE BX), `saba` (SABA)

Game ids look like `pg-1`. Mark the first game of each provider `hot: true` and the second `isNew: true`.

`getCategory` returns the slug when it is one of the five, otherwise null.

- [ ] **Step 2: Write the filter**

`filterProviderGames` keeps games whose title includes the trimmed query, case-insensitive. Tab `hot` also requires `hot`. Tab `new` requires `isNew`. Tab `favorite` requires `favoriteIds` to include `game.id`. Tab `all` only applies the query.

- [ ] **Step 3: Typecheck and commit**

Run from `sport`: `pnpm exec tsc --noEmit --pretty false`
Expected: exit code 0

```bash
git add sport/data/providers.ts sport/lib/games/filterGames.ts
git commit -m "feat(sport): add provider catalog and game filter"
```

### Task 2: Category index and provider grid

**Files:**
- Create: `sport/components/games/CategoryLobby.tsx`
- Create: `sport/components/games/ProviderGamesScreen.tsx`
- Create: `sport/app/slots/page.tsx`
- Create: `sport/app/casino/page.tsx`
- Create: `sport/app/fishing/page.tsx`
- Create: `sport/app/cards/page.tsx`
- Create: `sport/app/sport-games/page.tsx`
- Create: `sport/app/slots/[provider]/page.tsx`
- Create: `sport/app/casino/[provider]/page.tsx`
- Create: `sport/app/fishing/[provider]/page.tsx`
- Create: `sport/app/cards/[provider]/page.tsx`
- Create: `sport/app/sport-games/[provider]/page.tsx`

**Interfaces:**
- Consumes: catalog functions, `filterProviderGames`, `useMember`, `SheetFrame` from `sport/components/wallet/SheetFrame.tsx`

- [ ] **Step 1: Write `CategoryLobby`**

Props `{ category: GameCategory; title: string }`. List that category's providers as links to `/${category}/${provider.id}`. Each card shows the provider name. Use `grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6`.

Each `page.tsx` under a category folder renders `SubPageShell` plus `CategoryLobby` with the Thai title `สล็อต`, `คาสิโน`, `ยิงปลา`, `ไพ่`, or `กีฬา`.

- [ ] **Step 2: Write `ProviderGamesScreen`**

Props `{ category: GameCategory; providerId: string }`. When `getProvider` returns null, render `ไม่พบค่าย` and a `Link` to `/${category}`.

Otherwise render a breadcrumb link back to `/${category}` labeled with the category title, an `h1` of the provider name, a search input, and tabs `ทั้งหมด` `มาแรง` `มาใหม่` `โปรด`. Grid is `grid-cols-3 md:grid-cols-4 lg:grid-cols-6`. Heart button `aria-label` is `บันทึกเกมโปรด` and dispatches `toggleFavorite`. Filled state when `favoriteGameIds` includes the id. Game title button opens `SheetFrame` title `เข้าเกม` with the text `กำลังเข้าเกมจำลอง` and the game title.

The five `[provider]/page.tsx` files read `params.provider` and render `ProviderGamesScreen`. In Next.js 16, type the page props as `{ params: Promise<{ provider: string }> }` and unwrap with `React.use` if the page is a client component. Make the page a client component and `const { provider } = use(params)`.

- [ ] **Step 3: Typecheck and commit**

Run from `sport`: `pnpm exec tsc --noEmit --pretty false`
Expected: exit code 0

```bash
git add sport/components/games sport/app/slots sport/app/casino sport/app/fishing sport/app/cards sport/app/sport-games
git commit -m "feat(sport): add category lobbies and provider game grids"
```

### Task 3: Home category navigation and favorites tab

**Files:**
- Modify: `sport/components/home/HomePage.tsx`
- Modify: `sport/components/layout/CategoryIconNav.tsx` only if a category must navigate. Prefer handling inside `HomePage` so the nav component stays a button list.

**Interfaces:**
- Consumes: `useRouter` from `next/navigation`, `state.favoriteGameIds`

- [ ] **Step 1: Route category clicks**

In `HomePage`, when the selected id is `slot`, `casino`, `sport`, `fish`, or `table`, call `router.push` to `/slots`, `/casino`, `/sport-games`, `/fishing`, or `/cards` and return before `setActiveCat`. When the id is `lotto`, `router.push("/lottery")`. Keep `home` and `others` on the local `setActiveCat` path. `lotto` will 404 until plan 05. That is expected. Do not create a placeholder lottery page in this plan.

Provider buttons in the home section link to `/slots/${provider.id}` for ids that exist in the slots catalog (`pg`, `jili`). Other home provider ids stay as buttons that `router.push("/slots")`.

The favorite sub-tab on the home lobby filters `LOBBY_GAMES` to ids included in `state.favoriteGameIds` instead of the static `game.favorite` flag. Join this with the existing hot/recent filters for the other tabs.

- [ ] **Step 2: Lint, build, and manual check**

Run from `sport`:

```bash
pnpm exec tsc --noEmit --pretty false
pnpm lint
pnpm build
```

Expected: exit code 0

Manual:

1. จากหน้าหลักกดหมวดสล็อตแล้วไป `/slots` กด PG SOFT แล้วเห็นกริด
2. ค้นชื่อเกมแรกของค่ายนั้นจนเหลือใบเดียว กดหัวใจ กลับหน้าหลักแท็บโปรดแล้วเห็นเกมนั้น
3. เปิด `/slots/missing` แล้วเห็น `ไม่พบค่าย` และลิงก์กลับ `/slots`
4. เปิดเกมแล้วแผงขึ้น `กำลังเข้าเกมจำลอง`

- [ ] **Step 3: Commit**

```bash
git add sport/components/home/HomePage.tsx
git commit -m "feat(sport): open provider lobbies from the home categories"
```
