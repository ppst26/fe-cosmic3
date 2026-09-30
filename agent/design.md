# 🎨 เอกสารวิเคราะห์และถอดแบบระบบ UI Design System: CTMX Legend Pro
> **แหล่งอ้างอิง:** `https://demo-legend-pro.ctmx.pro/`  
> **เป้าหมายโปรเจกต์:** พัฒนาธีม **Black-Purple (ดำ-ม่วง)** สำหรับ Next.js + Tailwind CSS  
> **วันที่บันทึก:** 25 กันยายน 2026

---

## 1. ภาพรวมสถาปัตยกรรม UI & เทคโนโลยี (Architecture Overview)

ระบบ UI ของ **Legend Pro (CTMX)** พัฒนาบนสถาปัตยกรรม Single Page Application (Nuxt 3 / Vue 3) ร่วมกับ **Tailwind CSS** และ Scoped CSS Component โดยออกแบบในสไตล์ **Modern Dark Gaming & Entertainment Dashboard** ที่เน้นความพรีเมียม, ความคมชัดของแสงเงา (Neon Glow / Inset Bevel), และระบบ Dynamic Theme Switching

### โครงสร้าง Layout หลัก (Core Layout Shell)
1. **Top Header Bar (ความสูง ~64px - 72px):**
   - ซ้าย: กล่องค้นหาเกม (Global Search Input) พร้อมไอคอนแว่นขยาย
   - กึ่งกลาง: แบรนด์โลโก้ (Center Logo)
   - ขวา: ปุ่มเข้าสู่ระบบ (Login), สมัครสมาชิก (Register), และ Language Switcher (ธงชาติ)
2. **Category Navigation Bar (แถบเมนูหมวดหมู่เกมแนวนอน):**
   - เมนูหมวดหมู่เกม 13 หมวด: หน้าหลัก, สล็อต, คาสิโน, กีฬา, หวย, แทงหวย, ยิงปลา, ไพ่, อาร์เคด, ต่อสู้, แคช, อื่นๆ
   - สไตล์ Tab: Active State มีพื้นหลังการ์เดียนต์ทอง/ปุ่มนูน + เส้นไฮไลท์สีทองขอบล่าง
3. **Hero Banner & Marquee Announcement:**
   - แบนเนอร์สไลด์ขนาดใหญ่ Aspect Ratio ~3.5:1 ขอบมนมนแบบสมูท
   - แถบวิ่งแจ้งเตือน (Marquee Text) พื้นหลังสีทึบ/โปร่งแสง มีไอคอนลำโพงกระจายเสียงสีทอง
4. **Quick Action Cards & Referral Box:**
   - การ์ดทางลัด: "ดูโปรโมชั่น" (Megaphone 3D), "ดูกิจกรรม" (Lucky Chest 3D)
   - กล่อง "ชวนเพื่อนรับรายได้" (Affiliate Card) มี input คัดลอกลิงก์พร้อมภาพมือถือทองคำ
5. **Dynamic Section Grid:**
   - ส่วนห้องถ่ายทอดสด / คาสิโนสด (Live Casino Room Cards) พร้อมตัวเลขคนดูแบบเรียลไทม์
   - หมวดหมู่เกมสล็อตยอดนิยม (Game Cards Grid 6-8 คอลัมน์)
   - ผู้ให้บริการเกม (Provider Cards Grid 6 คอลัมน์) ขอบมนพิเศษ 20px
6. **Sidebar Widgets (เฉพาะหน้าจอเดสก์ท็อป):**
   - การ์ดแนะนำเกมแตกดี (Hot Jackpot Banner) ข้อมูลแจ็คพ็อตสะสมพร้อมปุ่ม Play
   - การ์ดกิจกรรมที่น่าสนใจ (Event List)
   - รายการโปรโมชั่นที่น่าสนใจ (Vertical Promotion List)
7. **Floating Action Controls:**
   - ปุ่มเปลี่ยนธีมลอย (Theme Customizer Floating Button) ไอคอนจานสี
   - ปุ่มติดต่อฝ่ายบริการลูกค้า (Live Chat FAB)
   - ปุ่มสลับสถานะสมาชิก (One-Click Demo Switcher)

> 📁 **การจัดโครงสร้างโค้ด Layout (`components/layout/`):**  
> คอมโพเนนต์โครงสร้างหลักทั้งหมดถูกแยกเก็บไว้ในโฟลเดอร์ `components/layout/` เพื่อความเป็นระเบียบและง่ายต่อการบำรุงรักษา:  
> - `components/layout/HeaderBar.tsx` (แถบนำทางส่วนหัว, Search, Auth Controls)
> - `components/layout/CategoryNav.tsx` (แถบเลือกหมวดหมู่ 13 หมวดแนวนอน)
> - `components/layout/JackpotSidebar.tsx` (กล่องแนะนำแจ็คพ็อต, กิจกรรม, และโปรโมชั่นด้านข้าง)
> - `components/layout/FloatingControls.tsx` (ปุ่มควบคุมลอยมุมจอ: สลับธีม, แชทสด, สลับสถานะสมาชิก)
> - `components/layout/Footer.tsx` (ส่วนท้ายเว็บไซต์, แบรนด์, ธนาคาร, ใบรับรอง)
> - `components/layout/index.ts` (รวมศูนย์การ Export สะดวกต่อการ Import)

---

## 1.1 สถาปัตยกรรมการออกแบบ Mobile-First เป็นอันดับแรก (Mandatory Mobile-First Architecture)

ระบบ UI ทั้งหมดต้องถูกออกแบบและพัฒนาโดยยึด **"Mobile-First เป็นอันดับแรกสุดเสมอ (Priority #1)"** โดยให้ความสำคัญกับประสบการณ์ผู้ใช้บนสมาร์ทโฟนก่อนที่จะขยายผลสู่จอใหญ่:

### 1. Viewport Breakpoints & การไต่ระดับหน้าจอ
- **Mobile Base (Viewport 360px – 430px):** เป็นจุดตั้งต้นของทุกคอมโพเนนต์ ใช้คลาสพื้นฐานของ Tailwind CSS โดยไม่ใส่ breakpoint prefix
- **Small Tablet (`sm:` ≥ 640px):** เริ่มขยายแถบ Header ให้กว้างขึ้น และเพิ่มคอลัมน์การ์ด
- **Tablet (`md:` ≥ 768px):** กาง Quick Action Cards ออกเป็น 12 คอลัมน์ และเริ่มแสดงแถบเครื่องมือเต็มรูปแบบ
- **Desktop / Laptop (`lg:` ≥ 1024px, `xl:` ≥ 1280px):** แสดง Sidebar ขวา (Jackpot, Events, Promos) และแสดง Grid เกม 5-6 คอลัมน์

### 2. หลักการเขียน Tailwind CSS แบบ Mobile-First
- **กฎเหล็ก:** เขียน Class พื้นฐานสำหรับ Mobile เสมอ (เช่น `w-full flex-col px-3 py-2 text-xs grid-cols-2`) แล้วค่อยใช้ Prefix `sm:`, `md:`, `lg:`, `xl:` ในการปรับแต่งขนาดจอใหญ่ **ห้ามเขียนเดสก์ท็อปก่อนแล้วพยายามย่อลงมือถือโดยเด็ดขาด**

### 3. Touch Ergonomics & Thumb Zone (ความสะดวกในการสัมผัสด้วยนิ้วมือ)
- **ขนาด Touch Target ขั้นต่ำ:** ปุ่มกด (`<button>`), ช่อง Input, และลิงก์นำทางทุกจุดบนมือถือต้องมีขนาดความสูงไม่ต่ำกว่า `40px – 44px` (`h-10` ถึง `h-11`) เพื่อให้กดได้แม่นยำ ไม่ติดขัด
- **Thumb Zone Safety:** ปุ่มลอย Floating FAB (สลับธีม, แชทสด, สลับสถานะ) ต้องวางไว้ชิดขอบล่างขวาที่มีระยะห่างเหมาะสม เพื่อให้นิ้วโป้งสัมผัสได้ทันทีโดยไม่ต้องเอื้อม

### 4. การปัดเลื่อนแนวนอนแบบ Touch-Friendly (Horizontal Swipe)
- แถบเลือกหมวดหมู่ (`CategoryNav`) บนมือถือต้องรองรับการปัดเลื่อนแนวนอนได้อย่างลื่นไหล (`overflow-x-auto scrollbar-none snap-x`) พร้อม Safe Padding ด้านซ้ายขวา ป้องกันตัวหนังสือชิดขอบจอ

### 5. ลำดับคอลัมน์แบบ Progressive Grid (Grids Progression)
- **การ์ดเกมสล็อต (`GameCard`):** 
  - Mobile (< 640px): `grid-cols-2` (2 คอลัมน์ ภาพชัดเจน ไม่เบียด)
  - Small Tablet (≥ 640px): `sm:grid-cols-3`
  - Tablet (≥ 768px): `md:grid-cols-4`
  - Desktop (≥ 1280px): `xl:grid-cols-5`
- **การ์ดค่ายเกม (`ProviderCard`):**
  - Mobile (< 640px): `grid-cols-2` (สี่เหลี่ยมจัตุรัส 1:1 ชัดเจน)
  - Tablet (≥ 768px): `md:grid-cols-4`
  - Desktop (≥ 1024px): `lg:grid-cols-6`

### 6. Zero Horizontal Overflow (ไร้ขอบล้นแนวนอน 100%)
- บนขนาดหน้าจอมือถือ (360px, 375px, 390px, 414px) ต้องไม่มีแถบเลื่อนแนวนอนที่ไม่ตั้งใจเด็ดขาด ทุกองค์ประกอบต้องพอดีกับความกว้างหน้าจอ

---

## 2. ระบบสีและชุดตัวแปร CSS (Color System & Theme Tokens)

ระบบสีของ Legend Pro ควบคุมผ่าน CSS Custom Properties (`var(--...)`) ซึ่งรองรับระบบ Dynamic Theme Switching มากกว่า 30 ธีม

### 2.1 โครงสร้างตัวแปรพื้นฐานระดับระบบ (Global CSS Variables)
```css
:root {
  /* Core Brand Colors (Black-Purple Theme) */
  --Main-Primary: #a855f7;              /* สีหลัก (ม่วงนีออน/Accent) */
  --Main-Primary-Light: #c084fc;        /* สีม่วงอ่อนสำหรับ Gradients */
  --Main-Primary-Dark: #6b21a8;         /* สีม่วงเข้ม */
  --Main-Secondary: #d946ef;           /* สีรอง (ฟูเชีย/ชมพูม่วง) */

  /* Background & Surface System (Thrill.com Inspired Solid Surfaces) */
  --body-bg: #0a090f;                  /* สีพื้นหลังเว็บไซต์ระดับล่างสุด */
  --BG-Surface-Lighter: #1e1a2e;       /* พื้นผิวเลเยอร์บน */
  --BG-Surface-Darker: #0d0c14;        /* พื้นผิวเลเยอร์ลึก */
  --BG-Surface-plane: #151320;         /* พื้นผิวเรียบมาตรฐาน */
  --BG-Sidebar-Shadow: #151320;        /* สีสำหรับเงาและ Ambient Drop Shadow */

  /* Card Color Tokens */
  --card-primary: #151320;             /* สีพื้นหลังการ์ดหลัก */
  --card-secondary: #0d0c14;           /* สีพื้นหลังการ์ดระดับ 2 / Input BG */
  --card-tertiary: #1e1a2e;            /* สีการ์ดระดับลอย / Hover */
  --Card-Lighter: #231e36;             /* ขอบหรือสีการ์ดสว่าง */
  --Card-Darker: #0d0c14;              /* ก้นการ์ดหรือส่วนทึบ */

  /* Text & Icon Tokens */
  --text-primary: #ffffff;             /* ข้อความหลัก สีขาวบริสุทธิ์ */
  --text-secondary: #a0a0a5;           /* ข้อความรอง สีเทาอ่านง่าย */
  --text-tertiary: #6b6b72;            /* ข้อความระดับสาม / Placeholder */
  --Text-Icon-Title: #ffffff;          /* สีหัวเรื่อง */
  --Text-Icon-Body: #cccccc;           /* สีเนื้อหา */
  --Text-Icon-Highlight: #c084fc;      /* สีข้อความเน้นพิเศษ */
  --text-label-wrapper: #c084fc;       /* สีตัวอักษรบนหัวข้อ Section */
  --tab-active-text: #ffffff;          /* สีข้อความบนแท็บที่ถูกเลือก */
  --tab-unactive-text: #999999;        /* สีข้อความบนแท็บที่ไม่ได้เลือก */

  /* Status Colors */
  --Status-Success: #10b981;           /* สีเขียวสำเร็จ */
  --Status-Warning: #f59e0b;           /* สีส้มแจ้งเตือน */
  --Status-Error: #ef4444;             /* สีแดงข้อผิดพลาด */
  --Status-Pending: #3b82f6;           /* สีน้ำเงินสถานะรอดำเนินการ */

  /* Interactive Elements */
  --btn-gradient1: #a855f7;
  --btn-gradient2: #d946ef;
  --btn-disabled: #4a4a4e;
  --border-primary: transparent;
  --active-gradient-border: #a855f7;
}
```

---

### 2.2 การประยุกต์ใช้สำหรับธีม **Black-Purple (ดำ-ม่วง)** ของโปรเจกต์นี้
เมื่อนำมาปรับใช้เป็นธีม `black-purple` ตามสเปกของ CTMX (อ้างอิงจากรหัสธีม `darkamethyst-new` และหน้าจอต้นฉบับจริง):

> ⚠️ **กฎเหล็กสถาปัตยกรรมสี (Color Role Principle):**  
> - **Surface หลัก และพื้นหลังทั้งหมด ต้องเป็น "สีดำ (Pure Black / Dark Charcoal)" เสมอ** เช่น `#000000`, `#0a0a0a`, `#141414` ไม่ใช่การ์ดสีม่วงทึบ!
> - **สีม่วง (Purple `#a855f7` / `#c084fc`) คือ "สี Primary องค์ประกอบ"** สำหรับเน้นองค์ประกอบ (Accents, Highlights, Card Borders, Ambient Glows, Active Indicators, Text Gradients, Buttons) เพื่อให้หน้าเว็บดูคมชัด มืดสนิท พรีเมียม และอ่านสบายตาเหมือนในภาพต้นฉบับจริง

```css
/* ธีม Black-Purple (พื้นผิวสีดำสนิท + องค์ประกอบสีม่วงนีออน Primary) */
[data-theme="black-purple"], .theme-black-purple {
  /* 1. Primary & Accent (สีองค์ประกอบหลัก — ม่วงนีออน และฟูเชีย) */
  --Main-Primary: #a855f7;              /* Purple 500 (สี Primary องค์ประกอบ: ขอบ, ปุ่ม CTA, จุด Active) */
  --Main-Primary-Light: #c084fc;        /* Purple 400 (สว่างสำหรับข้อความไฮไลท์/Text Gradient) */
  --Main-Primary-Dark: #6b21a8;         /* Purple 800 (มิติเงาเข้ม) */
  --Main-Secondary: #d946ef;           /* Fuchsia 500 (สีเฉดประกายคู่) */
  --accent: #e879f9;                   /* Accent Highlight */

  /* 2. Pure Black Surfaces (พื้นผิวหลักสีดำสนิท Charcoal — ไม่ใช่สีม่วง!) */
  --body-bg: #000000;                  /* พื้นหลังเว็บดำสนิท 100% (Pure Pitch Black) */
  --BG-Surface-Lighter: #1a1a1a;       /* หัว Section, แถบเมนูด้านบน, แท็บ (ดำเทาเข้ม) */
  --BG-Surface-Darker: #0a0a0a;        /* ผิวหน้าชั้นลึก สำหรับหลุมค้นหาและ Input */
  --BG-Surface-plane: #121212;         /* ผิวระนาบปานกลางสีดำ */
  --BG-Sidebar-Shadow: #141414;        /* พื้นหลังกล่อง Widget ด้านข้าง */

  /* 3. Cards in Pure Black (พื้นผิวการ์ดสีดำเข้ม) */
  --card-primary: #141414;             /* เนื้อในและผิวหน้าการ์ดหลักสีดำ Charcoal Black */
  --card-secondary: #0a0a0a;           /* ก้นลึกสีดำสนิทสำหรับ Input & Slots */
  --card-tertiary: #1a1a1a;            /* Card Hover Highlight สีเทาดำ */
  --Card-Lighter: #222222;             /* สันขอบบนของการ์ด */
  --Card-Darker: #080808;              /* สันขอบล่าง */

  /* 4. Gradients สำหรับปุ่ม & แท็บ */
  --btn-gradient1: #a855f7;
  --btn-gradient2: #7c3aed;
  --btn-gradient-hover1: #c084fc;
  --btn-gradient-hover2: #9333ea;
  --active-gradient-border: #c084fc;

  /* 5. Borders & Glows (เส้นขอบและแสงเรืองม่วง) */
  --border-primary: rgba(168, 85, 247, 0.25);
  --border-focus: rgba(192, 132, 252, 0.6);
  --glow-primary: 0 0 15px rgba(168, 85, 247, 0.35);
  --glow-secondary: 0 0 25px rgba(217, 70, 239, 0.25);

  /* 6. Thrill.com Inspired Solid Surfaces & Elevation Tokens */
  --surface-solid-base: #0a090f;        /* พื้นหลังระดับลึกสุด Solid Canvas */
  --surface-solid-card: #151320;        /* พื้นผิวการ์ดทึบระดับ 1 (Matte Solid Card) */
  --surface-solid-elevated: #1e1a2e;    /* พื้นผิวการ์ดยกสูง/Hover (Solid Elevated Card) */
  --surface-solid-inset: #0d0c14;       /* พื้นผิวหลุมทึบสำหรับ Search / Input */
  --shadow-card-ambient: 0 4px 20px -2px rgba(0, 0, 0, 0.45); /* มิติเงาแทนเส้นขอบ */
  --shadow-card-hover: 0 14px 30px -4px rgba(0, 0, 0, 0.65);  /* มิติเงายกตัวเมื่อ Hover */
}
```

---

## 2.3 สถาปัตยกรรม UI สไตล์ Thrill.com Casino: Borderless + High-Radius + Solid Dark Surfaces
> **แหล่งอ้างอิงและมาตรฐาน:** `https://thrill.com/casino`  
> **แกนหลัก 3 ประการ:**
> 1. **Card Rounded ที่โค้งมนสูง (Modern Ultra-Smooth Radius):** การ์ดและคอมโพเนนต์ใช้ความโค้งมนระดับ `16px - 24px` (`rounded-2xl` ถึง `rounded-3xl`) ให้ความรู้สึกพรีเมียม สบายตา ทันสมัยแบบ Next-Gen Web3/Crypto Casino
> 2. **Borderless Style (ไร้เส้นขอบ 100%):** ปลดเปลื้องเส้นขอบแข็ง (1px/2px hard borders) ออกจากการ์ดและคอนเทนเนอร์ทั้งหมด แล้วใช้ **"Solid Surface Contrast"** ร่วมกับ **"Soft Ambient Shadows"** ในการแยกมิติเลเยอร์แทน
> 3. **Solid Style Component BG Surface (พื้นผิวสีทึบเรียบหรู Solid Surfaces):** พื้นผิวของการ์ด กล่องคอนเทนเนอร์ และโมดูล ใช้สีทึบแบบ Solid Matte Tone (หลีกเลี่ยงพื้นหลังเกรเดียนต์ที่รกสายตา) ขับให้ภาพเกมและแสงนีออนสีม่วงโดดเด่นอย่างชัดเจน

### เปรียบเทียบความแตกต่าง (Legacy CTMX vs. Thrill.com Modern Style)

| มิติการออกแบบ | CTMX สไตล์ดั้งเดิม | Thrill.com Casino Style (แบบใหม่ที่นำมาปรับใช้) |
|---|---|---|
| **เส้นขอบ (Borders)** | ขอบ Gradient 2 ชั้น หนา 2px มีเส้นตัดขอบชัดเจน | **Borderless 100%** (`border: none` / `border-0`), ไร้เส้นตัดสายตา |
| **ความโค้งมน (Radius)** | Game Card `8px`, ปุ่ม `10px`, ค่ายเกม `20px` | **Ultra-Smooth High Radius:** Game Card `16px` (`rounded-2xl`), ค่ายเกม `20px - 24px`, Container `20px` |
| **พื้นผิวการ์ด (Surface BG)** | Radial Gradient ผสม มีความสว่างไม่สม่ำเสมอ | **Solid Matte Surface:** สีทึบเรียบสนิท (`#151320`, `#1e1a2e`) มินิมอล พรีเมียม |
| **การสร้างมิติความลึก (Depth)** | แสงสะท้อน Bevel บนขอบและเส้นเรืองแสงนีออนรอบกรอบ | **Elevation + Ambient Shadow:** แยกชั้นด้วยระดับสีทึบและความนุ่มของ Soft Drop Shadow |
| **Hover Feedback** | กรอบเรืองแสงไฟวิ่งขอบการ์ด | การ์ดยกตัวนุ่มนวล (`translateY(-4px) scale(1.02)`) + เงานุ่มฟุ้ง (`shadow-xl`) |

---

## 3. การวิเคราะห์โครงสร้างการ์ด (Card Components Analysis)

การ์ดในระบบ Black-Purple สไตล์ Thrill.com Casino ได้รับการออกแบบให้โค้งมน ไร้เส้นขอบ และใช้พื้นผิวสีทึบ:

### 3.1 การ์ดค่ายเกม (Provider Card) — *Thrill-Inspired Borderless & Solid Style*
การ์ดผู้ให้บริการ (เช่น PG Soft, Joker, Pragmatic Play) ได้รับการปรับปรุงเป็นสไตล์ **Borderless Ultra-Smooth Rounded (20px - 24px)**:

```css
/* การ์ดค่ายเกมสไตล์ Thrill: Borderless + Solid Dark Charcoal */
.provider-card-thrill {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 20px;                 /* ความโค้งมน 20px (rounded-[20px]) */
  border: none;                         /* Borderless ไร้เส้นขอบ 100% */
  background-color: var(--surface-solid-card, #151320); /* สีทึบ Solid Matte */
  box-shadow: var(--shadow-card-ambient); /* มิติเงาลอยนุ่มนวล */
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease;
  will-change: transform;
}

.provider-card-thrill:hover {
  transform: translateY(-4px) scale(1.02);
  background-color: var(--surface-solid-elevated, #1e1a2e); /* สว่างขึ้นแบบสีทึบ */
  box-shadow: var(--shadow-card-hover);
}

.provider-card-image-wrapper {
  aspect-ratio: 1 / 1;                 /* สี่เหลี่ยมจัตุรัส 1:1 */
  width: 100%;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
  position: relative;
}

/* เงาดำด้านล่างรูปภาพ เพื่อให้โลโก้ค่ายลอยเด่น */
.bottom-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: linear-gradient(to top, var(--body-bg) 0%, transparent 100%);
  pointer-events: none;
}
```

---

### 3.2 การ์ดเกม (Game Card / Slot Item Card)
ออกแบบตามมาตรฐาน Thrill.com ด้วย **ขอบโค้งมน 16px (`rounded-2xl`), ไร้ขอบ (`border-0`), และพื้นหลังทึบ Solid Dark Charcoal**:

```css
/* การ์ดเกมสล็อตสไตล์ Thrill Casino */
.game-card-thrill {
  position: relative;
  width: 100%;
  contain: content;
  opacity: 1;
  transform: translateY(0);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
  will-change: transform;
}

.game-card-thrill:hover {
  transform: translateY(-6px) scale(1.03);
  z-index: 10;
  box-shadow: var(--shadow-card-hover);
}

.game-card-wrapper-thrill {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--surface-solid-card, #151320); /* พื้นผิวสีทึบ ไร้ขอบ */
  border-radius: 16px;                 /* ความโค้งมน 16px (rounded-2xl) */
  border: none;                         /* Borderless ไร้เส้นขอบ */
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 3 / 4;                 /* อัตราส่วนโปสเตอร์ 3:4 */
  box-shadow: var(--shadow-card-ambient);
}

/* รูปภาพเกมข้างใน โค้งมนรับกับกรอบ */
.game-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  transition: transform 0.4s ease;
}
.game-card-thrill:hover .game-card-image {
  transform: scale(1.05);
}
ออกแบบเพื่อแสดงตัวอย่างเกมสล็อต มีความกระชับ รองรับ Responsive Grid:

```css
/* ถอดรหัส CSS จาก GameCard.D8ExR-qN.css */
.game-card {
  position: relative;
  width: 100%;
  contain: content;
  opacity: 1;
  perspective: 1000px;
  transform: translateY(0);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); /* Bounce Spring */
  will-change: transform;
}

.game-card:hover {
  transform: translateY(-6px) scale(1.03);
  z-index: 10;
}

.game-card-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--card-bg, rgba(0, 0, 0, 0.2));
  border-radius: 8px;                  /* ขอบมน 8px */
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 3 / 4;                 /* อัตราส่วนโปสเตอร์ 3:4 */
}

/* Badge แท็กมุมซ้ายบน */
.tags-container {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 10;
}

.tag {
  font-size: 10px;
  font-weight: 700;
  line-height: 1.2;
  min-width: 32px;
  padding: 2px 6px;
  border-radius: 3px;                  /* มน 3px */
  color: #ffffff;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.4);
}
.tag--hot { background: #e10000; }     /* แดงนีออน */
.tag--new { background: #34a200; }     /* เขียวนีออน */

/* ปุ่มกดหัวใจเกมโปรด (Favorite Button) */
.favorite-button {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  border-radius: 50%;                  /* วงกลมสมบูรณ์ */
  padding: 6px;
  cursor: pointer;
  z-index: 20;
  transition: transform 0.2s ease, background 0.2s ease;
}
.favorite-button:hover {
  transform: scale(1.15);
  background: rgba(0, 0, 0, 0.7);
}

/* ป้ายแสดงจำนวนคนเล่นสด (Player Counter Badge) */
.live-counter-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  border-radius: 9999px;               /* ทรงแคปซูล */
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 4px;
}
```

---

### 3.3 การ์ดกิจกรรม & โปรโมชั่น 3D (Event Card & Quick Promo)
การ์ดโปรโมชั่นมีลูกเล่นลายคลื่นวงกลมซ้อนฉากหลัง (Backdrop Rings) และโมเดล 3D ลอยตัว:

```css
/* ถอดรหัส CSS จาก EventCard.BkrShu0c.css & EventsCard.BmPkQfFV.css */
.event-card-wrapper {
  position: relative;
  border-radius: 20px;
  border: 2px solid transparent;
  background: 
    radial-gradient(137.89% 100% at 50% 0%, var(--BG-Sidebar-Shadow) 0%, var(--BG-Surface-Darker) 55.29%) padding-box,
    linear-gradient(180deg, var(--BG-Surface-plane) 0%, var(--Main-Secondary) 100%) border-box;
  background-clip: padding-box, border-box;
  overflow: hidden;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* ลวดลายวงกลมโปร่งแสงประดับพื้นหลัง */
.event-card-wrapper::after {
  content: "";
  position: absolute;
  top: 0;
  right: 20%;
  width: 280px;
  height: 140px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0 0 150px 150px;
  pointer-events: none;
}

.event-card-wrapper::before {
  content: "";
  position: absolute;
  top: 40px;
  right: 0;
  width: 130px;
  height: 250px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 150px 0 0 150px;
  pointer-events: none;
}

/* แอนิเมชันลอย 3D (Floating Animation) */
.animate-float {
  animation: float 2.5s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-8px) scale(1.03); }
}

/* ข้อความตัวหนังสือทองไล่เฉด */
.text-title-gradient {
  background: linear-gradient(180deg, var(--Main-Primary-Light, #f6db96) 0%, var(--Main-Primary-Dark, #9b7a24) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  font-size: 1.25rem;
}
```

---

### 3.4 การ์ดหัวข้อ Section (Section Header Card)
แถบป้ายหัวข้อแต่ละหมวดหมู่ เช่น "ห้องยอดนิยม", "ค่ายเกมของเรา", "50 เกมฮิตช่วงนี้":

```css
/* ถอดรหัส CSS จาก PCShell.D6YJH8wa.css */
.sections-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, var(--BG-Surface-Lighter) 0%, var(--BG-Surface-Darker) 100%);
  border-radius: 8px 8px 0 0;          /* มนเฉพาะ 2 มุมบน 8px */
  border-bottom: 2px solid var(--border-primary);
  color: var(--text-label-wrapper);
  font-size: 18px;
  font-weight: 700;
  padding: 10px 16px;
}

.view-all-link {
  color: var(--text-label-wrapper, #d6d6d6);
  font-size: 14px;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s ease;
}
.view-all-link:hover {
  color: var(--Main-Primary);
}
```

---

## 4. ระบบความโค้งมนและเส้นขอบ (Border Radius & Border System)

## 4. ระบบความโค้งมนและสถาปัตยกรรมไร้ขอบ (Border Radius & Borderless System)

ปรับใช้ลำดับชั้นความโค้งมนตามมาตรฐานสากลของ **Thrill.com Casino** ผสานกับอัตลักษณ์ Black-Purple:

| ระดับ (Scale) | ค่าความโค้งมน (px) | Tailwind Equivalent | วัตถุที่นำไปใช้งาน (Components) |
|---|---|---|---|
| **Micro** | `4px - 6px` | `rounded-md` | Badge สถานะ (HOT, NEW), เส้นเลื่อนสไลด์ Indicator |
| **Small** | `10px - 12px` | `rounded-xl` / `rounded-[12px]` | **ปุ่มกด Action**, Tag หมวดหมู่ย่อย, Thumbnail ในลิสต์ |
| **Medium / Game Card** | `16px` | `rounded-2xl` / `rounded-[16px]` | **การ์ดเกมสล็อต (`GameCard`)**, กล่องค้นหา (Search Bar) |
| **Large / Containers** | `20px - 24px` | `rounded-3xl` / `rounded-[20px]` | **การ์ดค่ายเกม (`ProviderCard`)**, Promo/Event Cards, Content Wells |
| **Extra Large** | `28px - 32px` | `rounded-[28px]` | Modal Dialogs, Floating Bottom Sheets |
| **Full Pill** | `9999px` | `rounded-full` | แท็บหมวดหมู่ (Pill Tabs), ปุ่ม Favorite, ปุ่มลอย FAB, ป้ายคนดูสด |

### 4.1 สถาปัตยกรรมไร้เส้นขอบ (Borderless & Surface Elevation Philosophy)
ตามแนวทางของ Thrill.com การ์ดและกล่องคอนเทนเนอร์จะไม่ใช้เส้นขอบตัดสายตา (`border: none` / `border-0`):
1. **Zero Border Policy:** ไม่ใส่ `border: 1px solid ...` รอบตัวการ์ด ช่วยให้รูปภาพเกมเต็มตาและหน้าเว็บดูโมเดิร์น ไร้รอยสะดุด
2. **Solid Color Elevation (การแบ่งเลเยอร์ด้วยสีทึบ):**
   - **Canvas Level (ล่างสุด):** `#0a090f` (ดำสนิทติดม่วงครามเข้ม)
   - **Container / Section Well:** `#110f1a` (พื้นที่รองรับการ์ด)
   - **Card Surface Level 1:** `#151320` (ตัวการ์ดเกม / ค่ายเกม)
   - **Card Hover / Active Level 2:** `#1e1a2e` (สว่างขึ้นเมื่อถูกโฟกัสหรือโฮเวอร์)
3. **Soft Ambient Shadow (มิติความลึกด้วยเงาฟุ้ง):**
   ```css
   /* มิติเงามาตรฐานของการ์ด (Default State) */
   box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.45);

   /* มิติเงาเมื่อชี้เมาส์ (Hover State) */
   box-shadow: 0 14px 30px -4px rgba(0, 0, 0, 0.65), 0 0 20px -4px rgba(168, 85, 247, 0.15);
   ```

---

## 5. คอมโพเนนต์ปุ่มและการควบคุม (Buttons & Controls)

### 5.1 ปุ่มหลักใน Header (Auth Buttons)
- **ปุ่ม "เข้าสู่ระบบ" (Primary Solid Button):**
  - Background: `linear-gradient(180deg, #f2cc47 0%, #eb7a13 100%)`
  - Text Color: `#000000` (ดำสนิท ตัวหนา `font-weight: 700`)
  - Border Radius: `10px`
  - Inner Highlight: `box-shadow: inset 0 3px 4px rgba(255, 255, 255, 0.5)`
  - Padding: `8px 20px`
- **ปุ่ม "สมัครสมาชิก" (Secondary Outline Button):**
  - Background: `transparent` หรือ `rgba(255, 214, 0, 0.05)`
  - Border: `1px solid var(--Main-Primary)` (#ffd600)
  - Text Color: `var(--Main-Primary)`
  - Border Radius: `10px`
  - Hover: Background เปลี่ยนเป็น `#ffd600`, ตัวหนังสือเป็นสีดำ

### 5.2 ปุ่มเข้าสู่ระบบผ่าน LINE (Line Login Button)
- Background: `#06C755` (สีเขียวมาตรฐานทางการของ LINE)
- Height: `46px - 48px`
- Border Radius: `10px`
- Typography: สีขาว `#ffffff`, ขนาด `15px`, `font-weight: 600`
- Icon: โลโก้ LINE สีขาวด้านซ้าย

### 5.3 กล่องข้อความและ Input Field (`InputField.DyTQMdK7.css`)
```css
.input-container {
  height: 42px;                        /* ขนาด md */
  background-color: var(--card-secondary, #0d0e10);
  border: 1px solid var(--border-primary, rgba(255, 255, 255, 0.12));
  border-radius: 10px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-container:focus-within {
  border-color: var(--Main-Primary);
  box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.25); /* ม่วงเรืองแสง */
}

.input-field {
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 14px;
  width: 100%;
}
```

---

## 6. หน้าต่างป๊อปอัปและโมดอล (Modals & Dialogs)

### 6.1 หน้าต่างเข้าสู่ระบบ (Login Modal)
- **Overlay Backdrop:** `rgba(0, 0, 0, 0.75)` ร่วมกับ `backdrop-filter: blur(12px)`
- **Modal Box:**
  - Max Width: `460px`
  - Background: `var(--card-primary, #171719)` มีเงาขอบแบบ radial gradient บางเบา
  - Border-radius: `20px`
  - Padding: `32px 24px`
  - Header: โลโก้เว็บไซต์กึ่งกลาง + ปุ่มกากบาทปิด (X) มุมขวาบน
  - Form Fields: ฟิลด์ "บัญชีผู้ใช้ หรือ เบอร์โทรศัพท์", "รหัสผ่าน / PIN" (พร้อมปุ่มเปิด/ปิดรูปลูกตา)
  - Checkbox: "จำฉันไว้" สไตล์โมเดิร์น
  - Divider: เส้นขีดพร้อมคำว่า "หรือ" คั่นกลาง
  - ปุ่มรอง: เข้าสู่ระบบด้วย LINE สีเขียว

### 6.2 หน้าต่างเลือกธีม (Legend Pro Themes Drawer / Modal)
- รองรับธีม 2 โหมด: **Light Themes** และ **Dark Themes**
- แต่ละธีมแสดงเป็นการ์ด 3-Color Swatch Bar:
  - Color 1: Primary Gradient Start
  - Color 2: Primary Gradient End
  - Color 3: Accent / Highlight
  - Background: สีโทนพื้นผิวจริงของธีมนั้น
  - Badge เลือก: วงกลมติ๊กถูกสีฟ้า/ทอง

---

## 7. คู่มือการแปลงสู่ Next.js + Tailwind CSS v4 (Implementation Guide for Black-Purple)

### 7.1 กำหนดตัวแปรใน `app/globals.css`
```css
@import "tailwindcss";

@layer base {
  :root {
    --bg-base: #000000;
    --surface-1: #141414;
    --surface-2: #1a1a1a;
    --surface-3: #222222;

    --brand-primary: #a855f7;
    --brand-primary-light: #c084fc;
    --brand-primary-dark: #6b21a8;
    --brand-accent: #d946ef;

    --text-main: #ffffff;
    --text-muted: #a1a1aa;
    --text-sub: #71717a;

    --border-subtle: rgba(168, 85, 247, 0.25);
    --border-accent: rgba(192, 132, 252, 0.5);
  }
}

/* Utilities เสริมสำหรับ Legend Pro Styling */
@utility bg-provider-card {
  background: 
    radial-gradient(137.89% 100% at 50% 0%, #1a1a1a 0%, #0d0d0d 55.29%) padding-box,
    linear-gradient(180deg, #1c1c1c 0%, #a855f7 100%) border-box;
  background-clip: padding-box, border-box;
}

@utility text-gold-gradient {
  background: linear-gradient(180deg, #f6db96 0%, #9b7a24 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

@utility text-purple-gradient {
  background: linear-gradient(180deg, #e879f9 0%, #a855f7 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

@utility btn-beveled {
  box-shadow: inset 0 4px 6px rgba(255, 255, 255, 0.35);
}
```

### 7.2 ตัวอย่าง Component การ์ดค่ายเกมใน Next.js (React 19)
```tsx
// components/ProviderCard.tsx
import React from "react";
import Image from "next/image";

interface ProviderCardProps {
  name: string;
  logoUrl: string;
  onClick?: () => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ name, logoUrl, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col aspect-square w-full rounded-[20px] border-2 border-transparent bg-provider-card overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(168,85,247,0.3)]"
    >
      <div className="relative w-full h-full p-4 flex items-center justify-center">
        <Image
          src={logoUrl}
          alt={name}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none" />
    </div>
  );
};
```

---

## 8. สรุปเช็คลิสต์สำหรับการนำไปพัฒนาต่อ (Key Takeaways)
- [x] **โครงสร้างสี (Pure Black Surface):** ยึดพื้นผิวและพื้นหลังสีดำสนิท Pure Black `#000000` / `#0a0a0a` และเลเยอร์การ์ดสีดำ Charcoal `#141414` (ไม่ใช่สีม่วงทึบ)
- [x] **สีม่วงคือสี Primary องค์ประกอบ:** ใช้สีม่วงนีออน `#a855f7` และฟูเชีย `#d946ef` สำหรับเส้นขอบการ์ด (Borders), แสงเรือง (Glows), จุด Active Indicator, และปุ่ม CTA
- [x] **การ์ดค่ายเกม:** ต้องใช้ Double-gradient border (padding-box + border-box) ขอบมน `20px` ผิวการ์ดสีดำ
- [x] **การ์ดเกม:** ขอบมน `8px`, อัตราส่วน `3:4`, มี Badge สีแดง (`#e10000`) / เขียว (`#34a200`) และปุ่มหัวใจแบบกลม
- [x] **ปุ่มแอ็กชัน:** ขอบมน `10px`, มีเอฟเฟกต์สะท้อนแสงด้านบนด้วย `inset box-shadow`
- [x] **ปุ่ม LINE:** ใช้สีเขียว `#06C755` เสมอ
- [x] **ระบบโมดอล:** ใช้ Dark Glassmorphism ผสม `backdrop-blur` สูง บนพื้นหลังสีดำเข้ม `#141414`
