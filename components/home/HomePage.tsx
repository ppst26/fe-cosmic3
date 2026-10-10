"use client";

import { HeaderBar, NoticeMarquee, Footer, FloatingControls } from "@/components/layout";
import { useRouter } from "@/lib/i18n/navigation";
import { useAuthUI } from "@/context/AuthUIContext";
import type { LobbyContent } from "@/lib/api/lobby";
import { HomeScreenShortcutPromo } from "@/app/components/home/HomeScreenShortcutPromo";
import { HomeMainContainer } from "./HomeMainContainer";
import { HomeTopFeed } from "./HomeTopFeed";
import { SportBettingSection } from "./SportBettingSection";
import { HomeCatalogSections } from "./HomeCatalogSections";

/**
 * หน้าแรก — เนื้อหา (แบนเนอร์ · ประกาศ · เกม · ออนไลน์มากที่สุด · Hall of Fame · กิจกรรม)
 * โหลดฝั่ง server ด้วย loadLobbyContent() ใน (lobby)/page.tsx แล้วส่งเป็น props
 */
export function HomePage({ content }: { content: LobbyContent }) {
  const router = useRouter();
  const { openLogin, openRegister } = useAuthUI();
  const { banners } = content;
  const heroItems = banners.peek.length > 0 ? banners.peek : banners.promoCarousel;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-40 w-full">
        <HeaderBar onOpenLogin={openLogin} onOpenRegister={openRegister} />
        <NoticeMarquee messages={content.announcements} />
      </div>
      <HomeTopFeed banners={heroItems} />

      <HomeMainContainer>
        <SportBettingSection />
        <HomeCatalogSections content={content} />
        <HomeScreenShortcutPromo className="mt-8 sm:mt-10" />
      </HomeMainContainer>

      <Footer />
      {/* ปุ่มแชทไป /support เหมือน glass (ยังไม่มีหน้า /support ใน glass เช่นกัน) */}
      <FloatingControls onOpenChat={() => router.push("/support")} />
    </div>
  );
}
