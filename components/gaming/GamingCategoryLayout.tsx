"use client";

import React from "react";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { HeaderBar, Footer, CategoryNav, FloatingControls } from "@/components/layout";
import { JackpotSidebar } from "@/components/JackpotSidebar";
import { useAuthUI } from "@/context/AuthUIContext";
import type { LobbyContent } from "@/lib/api/lobby";
import { getGamingCategory, type GamingCategoryId } from "@/lib/gamingCategories";
import { isGamingProviderDetailPath } from "@/lib/gamingLayout";
import "@/app/styles/gaming-lobby.css";

export function GamingCategoryLayout({
  categoryId,
  content,
  children,
}: {
  categoryId: GamingCategoryId;
  /** เนื้อหา lobby ที่ layout (server) โหลดผ่าน loadLobbyContent() */
  content: LobbyContent;
  children: React.ReactNode;
}) {
  const meta = getGamingCategory(categoryId);
  const pathname = usePathname();
  const router = useRouter();
  const { openLogin, openRegister } = useAuthUI();

  if (!meta) return null;

  const isProviderGamesPage = isGamingProviderDetailPath(pathname, meta.basePath);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--body)] text-[var(--text-on-light)]">
      <HeaderBar onOpenLogin={openLogin} onOpenRegister={openRegister} />

      <CategoryNav />

      <div className="mx-auto w-full max-w-[1440px] flex-1 px-0 py-1 sm:px-2 sm:py-3 lg:px-6">
        <div className="mt-2 grid grid-cols-1 gap-4 px-2 sm:mt-4 sm:gap-5 sm:px-0 lg:grid-cols-12 lg:gap-6">
          <div
            className={
              isProviderGamesPage ? "min-w-0 lg:col-span-12" : "min-w-0 lg:col-span-8 xl:col-span-9"
            }
          >
            {children}
          </div>
          {!isProviderGamesPage ? (
            <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
              <div className="sticky top-24">
                <JackpotSidebar tournaments={content.tournaments} promotions={content.banners.promoCarousel} />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <Footer />
      {/* ปุ่มแชทไป /support เหมือน glass (ยังไม่มีหน้า /support ใน glass เช่นกัน) */}
      <FloatingControls onOpenChat={() => router.push("/support")} />
    </div>
  );
}
