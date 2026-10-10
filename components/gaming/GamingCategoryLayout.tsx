"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  HeaderBar,
  Footer,
  CategoryNav,
  FloatingControls,
  GameSearchBar,
} from "@/components/layout";
import { JackpotSidebar } from "@/components/JackpotSidebar";
import { useAuthUI } from "@/context/AuthUIContext";
import { getGamingCategory, type GamingCategoryId } from "@/lib/gamingCategories";
import { isGamingProviderDetailPath } from "@/lib/gamingLayout";
import "@/app/styles/gaming-lobby.css";

function navCatFromCategory(categoryId: GamingCategoryId): string {
  switch (categoryId) {
    case "slot":
      return "slot";
    case "casino":
      return "casino";
    case "sport":
      return "sport";
    case "fish":
      return "fish";
    case "card":
      return "table";
    default:
      return "home";
  }
}

export function GamingCategoryLayout({
  categoryId,
  children,
}: {
  categoryId: GamingCategoryId;
  children: React.ReactNode;
}) {
  const meta = getGamingCategory(categoryId);
  const pathname = usePathname();
  const { openLogin, openRegister } = useAuthUI();
  const activeCat = navCatFromCategory(categoryId);

  if (!meta) return null;

  const isProviderGamesPage = isGamingProviderDetailPath(pathname, meta.basePath);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--body)] text-[var(--text-on-light)]">
      <HeaderBar
        onOpenLogin={openLogin}
        onOpenRegister={openRegister}
        onOpenSearch={() => document.getElementById("game-search")?.focus()}
      />

      <CategoryNav activeCat={activeCat} onSelectCat={() => {}} />

      <div className="mx-auto w-full max-w-[1440px] flex-1 px-0 py-1 sm:px-2 sm:py-3 lg:px-6">
        <GameSearchBar
          id="game-search"
          placeholder={`ค้นหาใน${meta.title}`}
          compact
        />

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
                <JackpotSidebar />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <Footer />
      <FloatingControls />
    </div>
  );
}
