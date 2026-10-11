import { Kanit } from "next/font/google";

/**
 * ฟอนต์หลักทั้งแอป — ไฟล์เดียว เรียกครั้งเดียว ใช้ร่วมกันทั้ง app/[lang]/layout.tsx และ app/global-not-found.tsx
 * (เดิมแต่ละไฟล์เรียก Kanit({...}) เองด้วย config เดียวกัน ทำให้ Turbopack ลงทะเบียน query ซ้ำ
 *  เกิด "next/font/google queries have exactly one entry" ตอน resolve ฟอนต์ภาษาอื่นที่ compile ถัดมา)
 */
export const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});
