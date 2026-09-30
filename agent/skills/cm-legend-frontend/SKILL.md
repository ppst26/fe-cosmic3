---
name: cm-legend-frontend
description: >-
  Builds or edits CM Theme Legend Pro (Black-Purple) UI from design.md using Next.js 16,
  React 19, and Tailwind CSS v4. Use when creating pages/components, implementing
  lobby sections, or when working on CM Theme Legend Pro UI.
---

# CM Theme Legend Pro Frontend

## When to use
งานสร้างหรือพัฒนาแก้ไขหน้าเว็บ, คอมโพเนนต์, และธีมของ **CM Theme Legend Pro (Black-Purple)** ตามคู่มือ `design.md`

## Workflow
1. อ่าน `design.md` ที่ root เป็นสเปกต้นฉบับหลัก พร้อมอ่าน rules ใน `agent/rules/`
2. **ยึด Mobile-First เป็นอันดับแรก (Priority #1):** จัดวางโครงสร้าง Layout และสไตล์เริ่มต้นสำหรับหน้าจอมือถือ (Viewport 360px - 430px) ก่อนเสมอ
3. ค่อยๆ Scale Up สู่หน้าจอ Tablet และ Desktop ด้วย Tailwind breakpoint prefixes (`sm:`, `md:`, `lg:`, `xl:`)
4. จัดการโครงสร้าง UI และ Layout ด้วย **Tailwind CSS ใน TSX**
5. ใช้ Design Tokens ของ **Black-Purple Theme:**
   - **Surface หลัก & พื้นหลัง:** ดำสนิท Pure Pitch Black (`#000000` / `#0a0a0a`) และผิวการ์ดดำเข้ม Charcoal Black (`#141414`)
   - **สีม่วง (Purple `#a855f7`):** คือ **สี Primary ขององค์ประกอบ** สำหรับเส้นขอบเรืองแสง, แสง Ambient Glow, จุด Active, และปุ่ม CTA (ห้ามใช้สีม่วงเป็นสีพื้นผิวการ์ดเด็ดขาด)
6. ก่อนส่งมอบงานให้รันการตรวจสอบผ่าน skill `ui-qa-checklist` โดยทดสอบบนหน้าจอมือถือก่อนเสมอ

## Styling Rules
- **Pure Black Surface Rule:** ผิวการ์ด, บาร์, โมดอล, และพื้นหลังเว็บต้องใช้เฉดสีดำ (`bg-black`, `bg-[#141414]`, `bg-[#1a1a1a]`) ไม่ใช่ม่วงทึบ
- **Purple Primary Accents:** สีม่วงใช้สำหรับขอบ (`border-purple-500/30`), แสงเงา (`shadow-purple-500/20`), จุด Active Indicator, และปุ่มกดเด่น
- **Mobile-First Tailwind:** Base classes เป็นขนาดมือถือเสมอ (เช่น `grid-cols-2`, `text-xs`, `p-3`) แล้วใช้ Prefix ขยายหน้าจอใหญ่
- **Touch Target Size:** ปุ่มกดและพื้นที่สัมผัสต้องมีความสูงอย่างน้อย `40px – 44px` (`h-10` ถึง `h-11`)
- **Tailwind ใน TSX:** Layout shells, Flex/Grid, Gap, Padding, Margin, Size, Position, Responsive breakpoints
- **CSS Utility & Tokens:** เก็บใน `app/globals.css` สำหรับ Gradient 2 ชั้น (Double-clip border), เอฟเฟกต์สะท้อนแสงนูน (`inset box-shadow`), และแอนิเมชันพิเศษ
- **Provider Card:** ขอบมน `20px`, สัดส่วน 1:1, Double-clip border gradient ม่วงนีออน, ผิวการ์ดดำสนิท ด้านล่างมี Gradient สีดำบัง 80px (Mobile เริ่มต้น 2 คอลัมน์)
- **Game Card:** ขอบมน `8px`, สัดส่วน 3:4, Bounce spring hover animation, แท็ก HOT/NEW, ปุ่มหัวใจ (Mobile เริ่มต้น 2 คอลัมน์)
- **Action Buttons:** ขอบมน `10px`, Beveled 3D reflection, ปุ่ม LINE สี `#06C755`
