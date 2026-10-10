"use client";

import React, { useEffect } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { useBottomNavUI } from "@/context/BottomNavUIContext";
import { useMenuUI } from "@/context/MenuUIContext";

export function GlobalBottomNav() {
  const { isMobileMenuOpen, toggleMobileMenu } = useMenuUI();
  const { suppressed } = useBottomNavUI();

  useEffect(() => {
    document.body.classList.toggle("bottom-nav-suppressed", suppressed);
    return () => {
      document.body.classList.remove("bottom-nav-suppressed");
    };
  }, [suppressed]);

  if (suppressed) return null;

  return (
    <BottomNav
      showSpacer={false}
      menuOpen={isMobileMenuOpen}
      onMenuClick={toggleMobileMenu}
    />
  );
}
