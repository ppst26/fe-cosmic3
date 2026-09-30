# เอกสารวิเคราะห์และถอดแบบ UI Design System: Solidx Solid Platform (XGAMBET)

> **แหล่งอ้างอิงหลัก:** [https://demo-solid.solidx.cc/](https://demo-solid.solidx.cc/)  
> **แพลตฟอร์ม:** Solidx Platform — หน้าหลัก (SPA, Dynamic Theme)  
> **ธีมที่สังเกตบนหน้าตัวอย่าง:** `html.light` + `data-theme="orange"`  
> **เป้าหมายโปรเจกต์ sport:** พัฒนาธีม **Orange Light Solid** (พื้นอ่อน + แถบดำ + ส้ม Primary) บน Next.js + Tailwind CSS  
> **วันที่บันทึก:** 30 กันยายน 2026

---

## 1. ภาพรวมสถาปัตยกรรม UI

ระบบ UI เป็น **Single Page Application** (Nuxt/Vue + Tailwind) เน้น **Mobile-First / App Shell** ผสมคาสิโนและกีฬาในหน้าเดียว สไตล์ **Light Content + Dark Chrome** (หัว–ท้ายดำ เนื้อหากลางสว่าง) ไม่ใช่ Dark Gaming แบบ Legend Pro

### 1.1 โครงสร้าง Layout หลัก (Core Layout Shell)

| ชั้น | องค์ประกอบ | รายละเอียด |
|------|-------------|------------|
| **1** | **Top Header** | พื้น `#050608` โลโก้ XG / XGAMBET ซ้าย ปุ่ม **สมัครสมาชิก** (outline ส้ม) + **เข้าสู่ระบบ** (ทึบส้ม) กลาง–ขวา ไอคอนค้นหา + เมนูแฮมเบอร์เกอร์ |
| **2** | **Notice / Marquee** | แถบ `#302e2c` ข้อความขาวเลื่อน ประกาศบริการ 24 ชม. |
| **3** | **Hero Carousel** | สไลด์โปรโมชันกีฬา (เช่น SOLID SPORTS PLATFORM) พื้นลาย geometric อ่อน ปุ่ม CTA ขาวขอบส้ม |
| **4** | **Game Search Row** | Input กว้าง `#f7f7f7` placeholder «ระบุชื่อเกม» + ปุ่ม **ค้นหาเกม** ส้ม + ปุ่ม **ปรับแต่ง** (ธีม/การตั้งค่า) |
| **5** | **Category Nav (Icon Tabs)** | พื้น `#f4f4f4` เลื่อนแนวนอน 14 หมวด: มาแรง, เกมมาใหม่, ค่ายเกม, กีฬา, สล็อต, คาสิโน, ไพ่, อาร์เคด, ต่อสู้, แครช, ยิงปลา, หวย, คริปโต, เกมโปรด — Active: ไอคอน+ข้อความส้ม + เส้นใต้ส้ม |
| **6** | **Section Blocks** | หัวข้อมาแรง (ไอคอนไฟ) แถบผู้ให้บริการกีฬา (ONE BX, Sportbook, Muay…) การ์ดเกมกริด 3–4 คอลัมน์ บล็อก **บอลโลก 2026** พร้อมลิงก์ **ดูทั้งหมด** |
| **7** | **Floating Controls** | ปุ่ม **ปรับแต่ง** แนวตั้งขวา ปุ่ม **ติดต่อ** (ไอคอนหูฟัง) มุมล่างขวา |
| **8** | **Bottom Navigation (Fixed)** | พื้นดำ 5 แท็บ: โปรโมชั่น, กิจกรรม, **หน้าหลัก** (active ส้ม), ฝาก/ถอน, บอลสด — สูง ~56–64px + safe-area |

> **การจัดโค้ดที่แนะนำ (`components/layout/`):**  
> `HeaderBar.tsx`, `NoticeMarquee.tsx`, `HeroCarousel.tsx`, `GameSearchBar.tsx`, `CategoryIconNav.tsx`, `BottomNav.tsx`, `FloatingControls.tsx`, `SectionHeader.tsx`, `Footer.tsx`

---

## 1.2 Mobile-First (บังคับใช้)

- **Base viewport:** 360–430px — คลาส Tailwind ไม่มี prefix ก่อน
- **Breakpoint:** `sm:` 640, `md:` 768, `lg:` 1024, `xl:` 1280
- **Touch target:** สูงอย่างน้อย `40–44px` (`h-10` / `h-11`)
- **Category nav:** `overflow-x-auto scrollbar-none snap-x` + padding ข้าง
- **Game grid:** Mobile `grid-cols-3`, Tablet `md:grid-cols-4`, Desktop `lg:grid-cols-5`–`6`
- **Provider / Sport chips:** แถบเลื่อนแนวนอน การ์ดสี่เหลี่ยมโลโก้บนพื้นขาว/เทาอ่อน
- **ห้าม overflow แนวนอนบนมือถือ**

---

## 2. ระบบสีและ Theme Tokens (ถอดจาก CSS Variables จริง)

ธีม **Orange / Light** ใช้ตัวแปร `--*` มากกว่า 260 รายการ ด้านล่างคือชุดหลักสำหรับ implement

### 2.1 สีแบรนด์และปุ่ม

```css
:root,
[data-theme="orange"] {
  /* Primary Orange */
  --primary: #f5871e;
  --primary2: #f5871e;
  --secondary: #f7931e;
  --accent: #ffd23f;

  /* Buttons */
  --btn-primary: #fe8401;
  --btn-primary-border: #fe8401;
  --btn-border: #f5871e;
  --btn-gradient1: #ff763c;
  --btn-gradient2: #ff4d00;
  --btn-hover-primary: #ffd15c;
  --btn-text: #fff;
  --btn-secondary: #d6d7d7;
  --btn-secondary-border: #f4f4f4;

  /* Balance / Wallet highlight */
  --balance-text1: #fe8401;
  --main-icon-1: #fe8401;
  --icon-active: #f5871e;
}
```

### 2.2 พื้นผิว Light + Chrome ดำ

```css
[data-theme="orange"] {
  --body: #ebebeb;              /* พื้นหลังหน้าหลัก */
  --background: #000;
  --header: #050608;
  --footer: #050608;
  --notice-bg: #302e2c;
  --notice-text: #fff;

  --card-primary: #fff;
  --card-secondary: #f4f4f4;
  --card-tertiary: #d6d7d7;
  --categoryBG: #f4f4f4;
  --gameCategories: #f4f4f4;
  --darkCard: #dfdfdf;

  --surface: #1a1a1a;           /* ใช้กับ chrome / overlay */
  --surface-darker: #323232;
  --surface-lighter: #494949;

  --modal-bg: #fff;
  --input-bg: #f7f7f7;
  --input-border: #f7f7f7;
  --input-placeholder: #8e8e8e;
}
```

### 2.3 ข้อความและแท็บ

```css
[data-theme="orange"] {
  --text-primary: #515151;
  --text-secondary: #515151;
  --text-black: #5f5f5f;
  --text: #fff;                  /* บนพื้นดำ */
  --text-link: #f5871e;
  --text-hightlight: #f5871e;
  --text-placeholder: #bdbdbd;

  --tab-active-text: #f5871e;
  --tab-active-slide: #f5871e;
  --tab-unactive-text: #8e8e8e;
  --tab-bg: #8e8e8e;

  --icon-primary: #5f5f5f;
  --icon-secondary: #ececec;
}
```

### 2.4 สถานะ

```css
--success: #4ac300;
--warning: #ff7a00;
--error: #f44;
--danger: #d72f3c;
--input-correct: #4ac300;
--input-incorrect: #d72f3c;
```

### 2.5 Typography

- **Font:** `Kanit, sans-serif`
- **Base size:** `--font-size-base: 14px`
- **Line height:** `--line-height-base: 1.625rem`
- ปุ่ม Header: `16px`, `font-weight: 600`, ความสูง ~`42px`

### 2.6 หลักการเล่นสี (Color Role)

| บทบาท | สี | ใช้กับ |
|--------|-----|--------|
| **Canvas อ่อน** | `#ebebeb` | พื้นหลังเนื้อหา การ์ดเกมล้อมรอบ |
| **Chrome ดำ** | `#050608` | Header, Bottom Nav, FAB บางตัว |
| **Primary ส้ม** | `#f5871e` / `#fe8401` | CTA, Active tab, ลิงก์, ไอคอน active |
| **Gradient CTA** | `#ff763c` → `#ff4d00` | ปุ่มค้นหา / ปุ่มหลักแบบเต็ม |
| **การ์ดขาว** | `#fff` / `#f4f4f4` | Chip ผู้ให้บริการ, พื้น section อ่อน |
| **ข้อความเนื้อหา** | `#515151` | บนพื้นอ่อน |
| **ข้อความบนดำ** | `#fff` | Header, Notice, Bottom Nav |

---

## 3. องค์ประกอบและสไตล์รายตัว

### 3.1 Header Auth Buttons

| ปุ่ม | พื้น | ขอบ | ตัวอักษร | Radius |
|------|------|-----|----------|--------|
| สมัครสมาชิก | โปร่ง | `2px solid #f5871e` | `#f5871e` | `4px` |
| เข้าสู่ระบบ | Gradient ส้ม (จาก `--btn-gradient*`) | ไม่มี | `#fff` | `4px` |

### 3.2 Search Bar

- ความสูงรวมแถบ ~`48–52px`
- Input: `background: #f7f7f7`, ขอบมนเล็ก (`4px` ถึง `8px`)
- ปุ่มค้นหา: สีส้มทึบ/gradient ติดขวาสุดของแถบ

### 3.3 Category Icon Navigation

- พื้นแถบ: `#f4f4f4`
- ไอคอนเทา `#5f5f5f` เมื่อไม่ active
- Active: สี `#f5871e` + **underline / indicator** ส้มหนาใต้ไอคอน
- แต่ละรายการ: ไอคอน + label ไทย ขนาดเล็ก

### 3.4 Game Card (มาแรง / สล็อต)

```css
.game-card-solid {
  border-radius: 8px;           /* มนเล็ก–กลาง ไม่ ultra-round แบบ Thrill */
  background: #fff;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.game-card-solid .poster {
  aspect-ratio: 3 / 4;
  object-fit: cover;
}

/* Badge มุมซ้ายบน */
.tag-hot { background: #e10000; color: #fff; font-size: 10px; border-radius: 4px; }
.tag-new { background: #2f6cac; color: #fff; }  /* --gameCatAddColor */

/* Favorite มุมขวาบน */
.favorite-btn {
  background: rgba(0, 0, 0, 0.35);
  border-radius: 50%;
}

/* ตัวเลขผู้เล่นล่าง */
.player-count {
  font-size: 11px;
  color: #515151;
}
```

### 3.5 Provider / Sport Provider Chip

- การ์ดสี่เหลี่ยมบนพื้นขาวหรือ `#f4f4f4`
- โลโก้กลางการ์ด แถบเลื่อนแนวนอน
- ตัวเลขใต้โลโก้ (จำนวนเกม/ห้อง) สีเทาเข้ม

### 3.6 Section Header

- ไอคอนธีม (ไฟ = มาแรง, ถ้วย = บอลโลก) + ชื่อหมวด
- ปุ่ม **ดูทั้งหมด** สีส้ม มุมขวา

### 3.7 Bottom Navigation

```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  inset-inline: 0;
  background: #050608;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 50;
}

.bottom-nav-item.active {
  color: #f5871e;
}

.bottom-nav-item {
  color: #ececec;
  font-size: 11px;
}
```

### 3.8 Floating: ปรับแต่ง + ติดต่อ

- **ปรับแต่ง:** แคปซูลดำ ไอคอนเฟือง + ข้อความแนวตั้ง
- **ติดต่อ:** กล่องขาว ไอคอนหูฟัง

---

## 4. Border Radius & Elevation

| ระดับ | px | Tailwind | ใช้กับ |
|-------|-----|----------|--------|
| Tight | 4px | `rounded` | ปุ่ม Header, Auth |
| Small | 8px | `rounded-lg` | Game card, search |
| Medium | 10px | `rounded-[10px]` | `--border-radius` ระบบ |
| Pill | 9999px | `rounded-full` | FAB, badge ผู้เล่น |
| Circle | 50% | `rounded-full` | Carousel dots |

**Elevation:** เน้น **เงาบางบนการ์ดขาว** (`0 1px 4px rgba(0,0,0,0.08)`) ไม่ใช่ borderless dark ambient แบบ Legend/Thrill — มี **เส้นขอบส้ม** บนปุ่ม outline ชัดเจน

---

## 5. Carousel & Hero

- ใช้ Vue Carousel (`--vc-pgn-height: 4px`, active `#000`)
- Hero: ภาพเต็มความกว้าง ข้อความใหญ่สีขาว CTA ปุ่มขาวขอบส้ม
- พื้นหลังลาย X / geometric โทนอ่อน

---

## 6. เปรียบเทียบกับเอกสารเดิม (Legend Pro / Black-Purple)

| มิติ | Legend Pro (เดิม) | Solidx Solid (ใหม่) |
|------|-------------------|---------------------|
| โทนรวม | Dark ดำ–ม่วง | Light body + Dark chrome |
| Primary | `#a855f7` | `#f5871e` / `#fe8401` |
| การ์ด | Borderless matte dark | การ์ดขาว + shadow เบา |
| Header | Search กลาง + หมวด 13 แท็บข้อความ | Auth กลาง + Icon category |
| Navigation ล่าง | FAB ลอย | **Bottom Nav 5 แท็บ fixed** |
| Font | (ตามธีมเดิม) | **Kanit** |

---

## 7. คู่มือ Tailwind / Next.js (Orange Light Solid)

### 7.1 `app/globals.css` (ย่อ)

```css
@import "tailwindcss";

@layer base {
  :root,
  [data-theme="orange"] {
    --body: #ebebeb;
    --header: #050608;
    --footer: #050608;
    --brand: #f5871e;
    --brand-strong: #fe8401;
    --brand-gradient-from: #ff763c;
    --brand-gradient-to: #ff4d00;
    --text-on-light: #515151;
    --text-on-dark: #ffffff;
    --card: #ffffff;
    --card-muted: #f4f4f4;
    --input: #f7f7f7;
  }

  body {
    font-family: Kanit, sans-serif;
    background: var(--body);
    color: var(--text-on-light);
  }
}

@utility btn-primary-gradient {
  background: linear-gradient(180deg, var(--brand-gradient-from), var(--brand-gradient-to));
  color: #fff;
}

@utility btn-outline-brand {
  border: 2px solid var(--brand);
  color: var(--brand);
  background: transparent;
}
```

### 7.2 ตัวอย่าง Bottom Nav (สั้น)

```tsx
const items = [
  { key: "promo", label: "โปรโมชั่น" },
  { key: "events", label: "กิจกรรม" },
  { key: "home", label: "หน้าหลัก" },
  { key: "wallet", label: "ฝาก/ถอน" },
  { key: "live", label: "บอลสด" },
];

export function BottomNav({ active = "home" }) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-[#050608] pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-5 h-14">
        {items.map((item) => (
          <li key={item.key}>
            <button
              type="button"
              className={
                active === item.key
                  ? "text-[#f5871e] text-[11px] w-full h-full"
                  : "text-[#ececec] text-[11px] w-full h-full"
              }
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

---

## 8. เช็คลิสต์นำไปพัฒนา (sport)

- [ ] ตั้ง `data-theme="orange"` และโทน Light body `#ebebeb`
- [ ] Header/Footer/Bottom Nav ใช้ `#050608`
- [ ] CTA และ active state ใช้ส้ม `#f5871e` / gradient `#ff763c`–`#ff4d00`
- [ ] Category nav แบบไอคอน + scroll แนวนอน พื้น `#f4f4f4`
- [ ] Game grid 3 คอลัมน์มือถือ การ์ดขาว `rounded-lg` + badge ฮิต/ใหม่
- [ ] โหลดฟอนต์ **Kanit**
- [ ] Safe area สำหรับ Bottom Nav
- [ ] ปุ่มลอย ปรับแต่ง + ติดต่อ ตามต้นฉบับ

---

## ภาคผนวก A — เอกสารอ้างอิงเดิม (CTMX Legend Pro)

เอกสารฉบับก่อนหน้านี้อ้างอิง `https://demo-legend-pro.ctmx.pro/` ธีม **Black-Purple** + สไตล์ Thrill.com (borderless, dark surfaces) ยังมีค่าสำหรับโปรเจกต์อื่นใน repo แต่ **ไม่ตรงกับ demo-solid.solidx.cc** — หากต้องการ token ม่วงเดิม ให้ดู git history ของไฟล์นี้หรือแยกเป็น `design-legend-pro.md`
