import { redirect } from "next/navigation";

/** เมนู BP ชี้ /commission — เนื้อหาคืนยอดรวมอยู่ที่ /cashback */
export default function CommissionPage() {
  redirect("/cashback");
}
