"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAuthUI } from "@/context/AuthUIContext";

interface CouponUIContextValue {
  isOpen: boolean;
  openCoupon: () => void;
  closeCoupon: () => void;
}

const CouponUIContext = createContext<CouponUIContextValue | null>(null);

export function CouponUIProvider({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useAuth();
  const { openLogin } = useAuthUI();
  const [isOpen, setIsOpen] = useState(false);

  const openCoupon = useCallback(() => {
    if (!isLoading && !isLoggedIn) {
      openLogin();
      return;
    }
    setIsOpen(true);
  }, [isLoading, isLoggedIn, openLogin]);

  const closeCoupon = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openCoupon, closeCoupon }),
    [isOpen, openCoupon, closeCoupon],
  );

  return <CouponUIContext.Provider value={value}>{children}</CouponUIContext.Provider>;
}

export function useCouponUI(): CouponUIContextValue {
  const ctx = useContext(CouponUIContext);
  if (!ctx) {
    throw new Error("useCouponUI ต้องใช้ภายใน CouponUIProvider");
  }
  return ctx;
}
