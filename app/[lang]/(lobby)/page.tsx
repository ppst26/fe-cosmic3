import { HomePage } from "@/components/home/HomePage";
import { loadLobbyContent } from "@/lib/api/lobby";

/**
 * หน้าแรก — โหลดเนื้อหา lobby ฝั่ง server (loadLobbyContent) แล้วส่งเป็น props
 * เหมือน glass: HTML แรกมีแบนเนอร์/เกมครบ ไม่กระพริบ
 */
export default async function Home() {
  const content = await loadLobbyContent();
  return <HomePage content={content} />;
}
