---
name: ui-qa-checklist
description: >-
  Runs CM Theme Legend Pro (Black-Purple) UI acceptance checks from design.md before calling work done.
  Use when finishing UI tasks, reviewing front-end output, or when the user asks
  for QA, visual check, or pre-submit review.
---

# CM Theme Legend Pro UI QA Checklist

ใช้ checklist นี้ตรวจสอบงานทุกครั้งก่อนส่งมอบงาน UI เพื่อความถูกต้องตามเกณฑ์ `design.md` โดย**ต้องผ่านการทดสอบบนหน้าจอมือถือก่อนเสมอเป็นอันดับแรก**:

- [ ] **เกณฑ์การตรวจสอบ Mobile-First (Mobile-First Acceptance Priority #1):**
  - [ ] **Viewport Check:** ตรวจสอบการแสดงผลบนหน้าจอมือถือขนาด `360px`, `390px`, `414px` ต้องสวยงาม ไม่แตก ไม่บี้
  - [ ] **Zero Horizontal Overflow:** ไม่มี Horizontal Scrollbar โผล่มาโดยไม่ตั้งใจบนมือถือ
  - [ ] **Touch Target Safety:** ปุ่มกด, ไอคอนลิงก์, และ Search Box มีความสูงอย่างน้อย 40px–44px กดด้วยนิ้วโป้งได้ง่าย ไม่ชิดกันเกินไป
  - [ ] **Horizontal Category Scroll:** เมนู 13 หมวดหมู่ใช้นิ้วปัดเลื่อนได้นุ่มนวล ไม่ติดขัด
  - [ ] **Grid Scaling:** การ์ดเกมและการ์ดค่ายเกมเริ่มต้นที่ 2 คอลัมน์บนมือถือ อ่านง่าย สัดส่วนคมชัด
- [ ] **ความถูกต้องของสีและธีม (Pure Black Surface & Purple Primary Elements):**
  - พื้นหลังหลักใช้ดำสนิท Pure Pitch Black (`#000000` / `#0a0a0a`)
  - **พื้นผิวการ์ดหลักต้องเป็นสีดำ Charcoal (`#141414`) ไม่ใช่สีม่วงทึบ**
  - ก้นลึก Input / Search Box ใช้สีดำสนิท (`#0a0a0a`)
  - หัว Section / แถบเมนูดำเทาเข้ม (`#1a1a1a`)
  - **สีม่วง (Purple `#a855f7`) ทำหน้าที่เป็นสี Primary องค์ประกอบ:** สำหรับเส้นขอบเรืองแสง, แสง Ambient Glow, จุด Active Indicator, ข้อความ Text Gradient, และปุ่ม CTA เด่น
- [ ] **การ์ดค่ายเกม (Provider Cards):**
  - ขอบมน `20px` (`rounded-[20px]`)
  - ใช้เทคนิค Dual-Gradient Border (`padding-box` + `border-box`)
  - สัดส่วน `1:1` พร้อม Gradient มืดบังล่างความสูง `80px`
  - มี Hover Transition ยกตัวและขยายขนาดอย่างสมูท
- [ ] **การ์ดเกม (Game Cards):**
  - ขอบมน `8px` (`rounded-lg`), สัดส่วน `3:4`
  - มีแอนิเมชันเด้งแบบสปริงเมื่อ Hover (`cubic-bezier(0.34, 1.56, 0.64, 1)`)
  - แท็ก HOT สีแดง (`#e10000`), แท็ก NEW สีเขียว (`#34a200`) มน `3px`
  - ปุ่ม Favorite เป็นวงกลม `rounded-full` มีเอฟเฟกต์ Glassmorphism
- [ ] **ปุ่มและการควบคุม (Buttons & Inputs):**
  - ปุ่ม Action หลักขอบมน `10px` มีเอฟเฟกต์ Beveled แสงสะท้อนนูนด้านบน (`box-shadow: inset 0 6px 8px rgba(255, 255, 255, 0.4)`)
  - ปุ่มเข้าสู่ระบบด้วย LINE ใช้สีเขียวทางการ `#06C755` ขอบมน `10px`
  - ช่อง Input ขอบมน `10px` พื้นหลัง `#0b0711` พร้อม Focus Ring ม่วงเรืองแสง
- [ ] **แถบนำทาง (Header & Category Nav):**
  - Header ด้านบนมี Search bar ขอบมน `10px`, โลโก้แบรนด์ตรงกลาง, ปุ่ม Auth และธงภาษา
  - แถบหมวดหมู่ 13 หมวด มีเส้นไฟบอกตำแหน่งสถานะที่เลือก (Bottom Indicator Glow)
- [ ] **ฟอนต์และภาษาไทย:**
  - สระบน/ล่าง (สระอิ, สระอุ, วรรณยุกต์) ไม่โดนตัดขอบด้วย `line-height` ที่เหมาะสม
  - หัวข้อหลักและยอดแจ็คพ็อตสะสมใช้ตัวหนา `font-bold` (700) หรือ `font-extrabold` (800) พร้อม Text Gradient สวยงาม
- [ ] **Responsive & Overflow:**
  - ตรวจสอบการแสดงผลที่ความกว้าง 360px, 390px, 768px, 1280px, 1920px
  - ไม่มี Horizontal Overflow (ไม่มีแถบเลื่อนแนวนอนที่ไม่ได้ตั้งใจ)
