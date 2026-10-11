# Design System: Dark Lavender / Plum UI (LaunchKit-inspired)

> **สถานะ:** เอกสารนี้แทนที่ดีไซน์เดิมทั้งหมด (Orange Light Solid / Solidx และ Legend Pro Black-Purple ก่อนหน้า) — นี่คือ design system หลักของโปรเจกต์ `sport` ตั้งแต่วันที่บันทึกนี้เป็นต้นไป
> **วันที่บันทึก:** 11 ตุลาคม 2026
> **แหล่งอ้างอิง:** Reverse-engineered จากภาพอ้างอิง LaunchKit-style dark lavender UI — ค่าเป็นค่าประมาณสำหรับ production ไม่ใช่ตัวเลขที่วัดจากไฟล์ต้นฉบับ

---

## 1. ทิศทางภาพรวม (Visual direction)

อินเทอร์เฟซนี้เป็น **dark cinematic lavender / plum UI** สร้างจาก 3 ชั้น:

1. **Near-black plum base** — ไม่ใช่ดำสนิท
2. **Soft translucent surfaces** — การ์ดและคอนโทรลสว่างกว่าพื้นหลังหนึ่งระดับ
3. **Lavender + warm peach ambient light** — ใช้เป็น internal glow, edge light, selected state, และ focal accent

เอฟเฟกต์ควรให้ความรู้สึกคล้าย polished glass / anodized-metal UI มากกว่า neon cyberpunk — glow นุ่มและกว้าง ไม่ใช่ halo คมชัด

---

## 2. Core palette

### Background
- `bg-canvas`: `#0D0B12`
- `bg-deep`: `#09080E`
- `bg-plum`: `#1C1726`
- `bg-plum-soft`: `#2E243A`

### Surfaces
- `surface-1`: `rgba(37, 29, 48, .84)`
- `surface-2`: `rgba(47, 37, 60, .88)`
- `surface-3`: `rgba(65, 49, 79, .80)`
- `surface-input`: `rgba(46, 36, 58, .76)`
- `surface-hover`: `rgba(57, 45, 70, .92)`

### Accent
- `lavender-200`: `#E1CCFF`
- `lavender-300`: `#D4B9FF`
- `lavender-400`: `#C9AAFB`
- `lavender-500`: `#B88BFA`
- `violet-500`: `#9361E8`
- `violet-600`: `#7B4FC3`
- `violet-700`: `#624099`

### Warm glow
- `peach-glow`: `#F6A98B`
- `rose-glow`: `#C87AAE`
- `plum-glow`: `#7A3B8F`

### Text
- `text-primary`: `#F7F4FA`
- `text-secondary`: `#C0B6C8`
- `text-muted`: `#8E8497`
- `text-accent`: `#D3B3FF`
- `text-on-light` (บนพื้นสว่าง เช่น CTA lavender): `#19131F`

### Borders
- `border-soft`: `rgba(255,255,255,.075)`
- `border-medium`: `rgba(226,210,255,.14)`
- `border-strong`: `rgba(226,210,255,.22)`
- `border-focus`: `rgba(207,171,255,.50)`

---

## 3. Background recipe

พื้นหลังไม่ใช่สีม่วงทึบแบนๆ แต่เป็น dark plum-black base + radial light field ขนาดใหญ่หลายจุด:

- upper-left: muted lavender glow
- mid-left / lower-left: plum glow
- upper-right: violet glow
- warm peach/pink rim รอบ hero artwork (ใช้เฉพาะจุดโฟกัส)
- black falloff ไปทางมุมจอและระหว่าง section

ให้ light field ทั้งหมด low-opacity และเบลอมาก ผู้ใช้ควรรู้สึกถึง "บรรยากาศ" ไม่ใช่เห็นวงกลมชัดๆ

```css
.app-shell {
  background:
    radial-gradient(55rem 36rem at 14% 10%, rgba(141, 96, 190, .16), transparent 62%),
    radial-gradient(46rem 34rem at 92% 16%, rgba(104, 55, 157, .13), transparent 60%),
    radial-gradient(44rem 42rem at 16% 86%, rgba(104, 55, 135, .16), transparent 66%),
    radial-gradient(34rem 28rem at 78% 75%, rgba(81, 47, 113, .10), transparent 70%),
    linear-gradient(180deg, #15101D 0%, #0D0B12 46%, #09080E 100%);
}
```

---

## 4. Surface system

### Base surface
ใช้กับการ์ด, nav container, input field, feature block เล็กๆ — dark translucent plum, top-left highlight บางๆ, border เส้นบางคอนทราสต์ต่ำ, shadow ดำน้อยที่สุด

```css
.surface {
  background:
    linear-gradient(145deg, rgba(255,255,255,.035), transparent 42%),
    rgba(34, 27, 44, .88);
  border: 1px solid rgba(255,255,255,.075);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.025),
    0 10px 26px rgba(0,0,0,.28);
  backdrop-filter: blur(18px) saturate(112%);
}
```

### Elevated surface
ใช้กับการ์ดเนื้อหาหลักและคอนโทรลลอย

```css
.surface-elevated {
  background:
    radial-gradient(120% 120% at 0% 0%, rgba(183,137,242,.08), transparent 52%),
    rgba(41, 32, 52, .92);
  border: 1px solid rgba(225,207,255,.11);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.035),
    0 16px 36px rgba(0,0,0,.34);
}
```

### Selected / active surface
Element ที่ถูกเลือกต้อง "สว่างขึ้นเป็น lavender อ่อน" ไม่ใช่ม่วงนีออนจ้า

```css
.surface-selected {
  background: linear-gradient(180deg, #D4BAFF 0%, #C39AF8 100%);
  color: #17121D;
  border-color: rgba(255,255,255,.42);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.52),
    0 8px 20px rgba(148,92,210,.20);
}
```

---

## 4.1 Surface card variants (`.surface-card` / `.surface-card-glow` / `.surface-card-active`)

ชุดคลาสสำเร็จสำหรับการ์ดโฟกัส (feature card, promo card, selectable item) — ใช้แทน `.surface` / `.surface-elevated` เมื่อต้องการ glow ม่วงที่ชัดขึ้น implement แล้วใน `app/globals.css`:

- **`.surface-card`** — การ์ดพื้นฐาน พื้นหลัง plum gradient เข้ม + glow จางมากมุมขวาบน ใช้เป็นค่าเริ่มต้นของ feature card
- **`.surface-card-glow`** — เพิ่ม purple glow สองจุด (ขวาบน + ซ้ายล่าง) ชัดกว่า `.surface-card` ใช้กับการ์ดที่ต้องการดึงดูดสายตา (โปรโมชัน, แบนเนอร์เด่น)
- **`.surface-card-active`** — สถานะ active/selected มี outer glow ring สีม่วงรอบการ์ด (`--surface-border-active`) ใช้กับตัวเลือกที่ถูกเลือกในกลุ่ม (เช่น เลือกแพ็กเกจ/แผนผัง)

ทั้งสามคลาสแชร์ typography ร่วม (`h3` = `--surface-text`, `p` = `--surface-text-muted`) และ layout พื้นฐาน (`padding: 18px`, `min-height: 160px`, `position: relative; overflow: hidden`) — เหมาะกับการวาง background glow ไว้ใต้เนื้อหา

```css
--surface-text: var(--text-primary);
--surface-text-muted: var(--text-secondary);
--surface-border-active: rgba(164, 60, 255, 0.45);
```

---

## 5. Card style

- radius: `16–18px`
- padding ภายใน: `16–18px`
- gap ระหว่างการ์ด: `10–12px`
- border: 1px ขาว/ลาเวนเดอร์จางมาก
- ไม่ใช้ drop shadow หนัก

ใช้ภาพ/illustration เป็นองค์ประกอบที่สว่างที่สุดในการ์ด ตัวการ์ดเองยังคงมืด

---

## 6. Buttons

### Primary button
CTA หลักเป็น **soft lavender** โทนนุ่มคล้าย Apple มากกว่านีออน

```css
.btn-primary {
  background: linear-gradient(180deg, #D4BAFF 0%, #C7A2F8 100%);
  color: #19131F;
  border: 1px solid rgba(255,255,255,.34);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.48),
    0 7px 18px rgba(128,76,182,.18);
}
```

### Secondary button
```css
.btn-secondary {
  background: rgba(47, 37, 60, .80);
  color: #F5F1F7;
  border: 1px solid rgba(255,255,255,.08);
}
```

### Icon button
พื้นผิว plum โปร่งแสง สี่เหลี่ยมหรือวงกลม

```css
.icon-button {
  background: rgba(49, 39, 62, .78);
  border: 1px solid rgba(255,255,255,.07);
  color: #F7F4FA;
  backdrop-filter: blur(14px);
}
```

---

## 7. Inputs

Input ไม่ใช่สีดำสนิท — เป็นเทา-พลัมโทนนุ่ม ขอบจาง

```css
.input {
  background: rgba(48, 38, 60, .78);
  border: 1px solid rgba(255,255,255,.07);
  color: #F5F2F7;
}

.input::placeholder {
  color: rgba(214, 203, 221, .50);
}

.input:focus {
  border-color: rgba(207,171,255,.44);
  box-shadow: 0 0 0 3px rgba(183,137,242,.09);
}
```

---

## 8. Tabs / segmented controls

Tab ที่ไม่ active เป็น pill plum เข้มขนาดกระชับ; tab active กลายเป็นลาเวนเดอร์อ่อน

- height: `34–38px`
- radius: `10–12px`
- gap: `8px`
- ข้อความ active กลายเป็นเกือบดำ (`text-on-light`)

ห้ามใช้ active state สีน้ำเงิน — คงอยู่ในกลุ่มลาเวนเดอร์/พลัมเท่านั้น

---

## 9. Typography

```css
font-family: Inter, "SF Pro Display", "SF Pro Text", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

> โปรเจกต์ `sport` ยังคงใช้ **Kanit** เป็นฟอนต์หลัก (รองรับไทย) ตาม `next/font` ที่ตั้งไว้ใน `app/[lang]/layout.tsx` — สแต็กด้านบนใช้เป็น fallback/อ้างอิง sizing เท่านั้น ไม่บังคับเปลี่ยนฟอนต์

Hierarchy:
- Display: 32–40px / 700
- H1: 28–32px / 700
- H2: 22–26px / 650–700
- Body: 14–16px / 400–500
- Label: 11–13px / 600
- Overline: 10–11px / 600 / letter-spacing `.18em`

---

## 10. Radius system

```text
xs   8px
sm  10px
md  14px
lg  18px
xl  24px
2xl 32px
pill 999px
```

การ์ดและคอนโทรลบนมือถือมักใช้ 14–18px

---

## 11. Shadow & glow language

ห้ามใช้ shadow นีออนจ้า

- **Surface shadow:** `0 12px 30px rgba(0,0,0,.30)`
- **Lavender focus glow:** `0 0 0 3px rgba(190,147,246,.10)`
- **Ambient purple glow:** ใช้ radial gradient ด้านใน/หลัง section เท่านั้น ไม่ใช่ box-shadow รอบทุก component
- **Warm artwork glow** (peach/pink สำรองไว้สำหรับ focal visual เท่านั้น):

```css
radial-gradient(circle, rgba(246,169,139,.20), transparent 62%)
```

---

## 12. UI state rules

| State | กฎ |
|---|---|
| Hover | เพิ่มความสว่าง 4–7%, border ชัดขึ้นเล็กน้อย, `translateY` สูงสุด `-1px` |
| Active | scale `0.985–0.99`, ลด shadow |
| Focus | lavender focus ring นุ่ม 2–3px |
| Disabled | opacity `.44–.55`, ไม่มี glow |

---

## 13. Component recipes

### Dark feature card
```text
Surface: rgba(34,27,44,.88)
Border: white 7%
Radius: 18px
Padding: 18px
Title: white
Body: muted lavender-gray
Accent: artwork + label ลาเวนเดอร์เล็กๆ
```

### Compact navigation pill
```text
Surface: rgba(47,37,60,.80)
Radius: 11px
Text: white 80%
Active: #D0AEFC
```

### CTA
```text
Fill: #D4BAFF → #C7A2F8
Text: #19131F
Border: white 34%
Shadow: violet เข้ม opacity ต่ำ
```

---

## 14. กฎโดยรวม

กฎที่สำคัญที่สุดคือ **contrast ผ่าน luminance ไม่ใช่ saturation**

สัดส่วนโดยประมาณ:
- 70% near-black / plum-black
- 20% muted plum surfaces
- 7% lavender
- 3% peach / pink / violet ambient light

สมดุลนี้คือสิ่งที่ทำให้ UI ดูพรีเมียมแบบ Apple-like แทนที่จะดูเหมือน generic purple gaming UI

---

## 15. CSS Variables (token implementation)

Token จริงที่ implement อยู่ใน `app/globals.css` (ตัวแปร `--*` ทั้งหมดถูกแทนที่จากธีม Orange Light Solid เดิมเป็นชุดนี้):

```css
:root,
[data-theme="lavender"] {
  /* Background */
  --bg-canvas: #0d0b12;
  --bg-deep: #09080e;
  --bg-plum: #1c1726;
  --bg-plum-soft: #2e243a;

  /* Surface */
  --surface-1: rgba(37, 29, 48, 0.84);
  --surface-2: rgba(47, 37, 60, 0.88);
  --surface-3: rgba(65, 49, 79, 0.80);
  --surface-input: rgba(46, 36, 58, 0.76);
  --surface-hover: rgba(57, 45, 70, 0.92);

  /* Lavender / violet */
  --lavender-200: #e1ccff;
  --lavender-300: #d4b9ff;
  --lavender-400: #c9aafb;
  --lavender-500: #b88bfa;
  --violet-500: #9361e8;
  --violet-600: #7b4fc3;
  --violet-700: #624099;

  /* Ambient glow */
  --glow-lavender: rgba(183, 137, 242, 0.16);
  --glow-violet: rgba(123, 79, 195, 0.15);
  --glow-plum: rgba(122, 59, 143, 0.16);
  --glow-peach: rgba(246, 169, 139, 0.18);
  --glow-rose: rgba(200, 122, 174, 0.13);

  /* Text */
  --text-primary: #f7f4fa;
  --text-secondary: #c0b6c8;
  --text-muted: #8e8497;
  --text-accent: #d3b3ff;
  --text-on-light: #19131f;
  --text-on-dark: #f7f4fa;

  /* Border */
  --border-soft: rgba(255, 255, 255, 0.075);
  --border-medium: rgba(226, 210, 255, 0.14);
  --border-strong: rgba(226, 210, 255, 0.22);
  --border-focus: rgba(207, 171, 255, 0.50);

  /* Radius */
  --radius-soft-sm: 14px;
  --radius-soft-md: 18px;
  --radius-soft-lg: 22px;
  --radius-soft-xl: 28px;

  /* Shadow */
  --shadow-soft: 0 12px 30px rgba(0, 0, 0, 0.30);
  --shadow-soft-sm: 0 7px 18px rgba(0, 0, 0, 0.24);
  --shadow-primary: 0 7px 18px rgba(128, 76, 182, 0.18);
  --focus-ring: 0 0 0 3px rgba(190, 147, 246, 0.10);

  /* Semantic aliases ที่ยังใช้ใน codebase เดิม (soft-* utilities) */
  --soft-canvas: var(--bg-canvas);
  --soft-surface: var(--bg-plum);
  --soft-card: var(--surface-1);
  --soft-card-elevated: var(--surface-2);
  --soft-chrome: var(--bg-deep);
  --body: var(--bg-canvas);
  --header: var(--bg-deep);
  --footer: var(--bg-deep);
  --notice-bg: var(--surface-2);
  --brand: var(--lavender-400);
  --brand-strong: var(--lavender-300);
  --brand-soft: rgba(201, 170, 251, 0.14);
  --input: var(--surface-input);
  --tab-inactive: var(--text-muted);
  --icon-muted: var(--text-muted);
}
```

> **หมายเหตุ:** `--soft-*`, `--brand*`, `--body`, `--header`, `--footer` ฯลฯ เป็น semantic alias ที่ component เดิมอ้างอิงอยู่ (`soft-panel`, `soft-card`, `soft-btn-primary`, `button-dark-purple` และอื่นๆ) — คง naming เดิมไว้เพื่อไม่ต้องแก้ทุก component แต่ค่าถูก map เข้ากับ dark lavender token ชุดใหม่ทั้งหมดแล้ว

---

## 16. ประวัติเอกสารดีไซน์ก่อนหน้า

| เวอร์ชัน | ธีม | สถานะ |
|---|---|---|
| CTMX Legend Pro | Black-Purple (dark, borderless) | แทนที่แล้ว (ก่อน 30 ก.ย. 2026) |
| Solidx Solid (Orange Light) | Light body + dark chrome, primary ส้ม | แทนที่แล้ว (11 ต.ค. 2026) |
| **Dark Lavender / Plum (เอกสารนี้)** | Dark cinematic lavender/plum | **ใช้งานปัจจุบัน** |

ดู git history ของไฟล์นี้หากต้องการย้อนดู token ของธีมก่อนหน้า
