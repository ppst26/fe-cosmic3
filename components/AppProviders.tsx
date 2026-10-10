"use client";

import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { AuthUIProvider } from "@/context/AuthUIContext";
import { DepositProvider } from "@/context/DepositContext";
import { MenuUIProvider } from "@/context/MenuUIContext";
import { BottomNavUIProvider } from "@/context/BottomNavUIContext";
import { CouponUIProvider } from "@/context/CouponUIContext";
import { ToastProvider } from "@/context/ToastContext";
import { PendingTransactionProvider } from "@/context/PendingTransactionContext";
import { GlobalBottomNav } from "@/components/layout/GlobalBottomNav";
import { GlobalAuthOverlays } from "@/components/GlobalAuthOverlays";
import { GlobalCouponOverlay } from "@/components/GlobalCouponOverlay";
import { GlobalMobileMenu } from "@/components/GlobalMobileMenu";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <AuthUIProvider>
          <CouponUIProvider>
            <MenuUIProvider>
              <BottomNavUIProvider>
                <PendingTransactionProvider>
                  <DepositProvider>
                    {children}
                    <GlobalBottomNav />
                    <GlobalMobileMenu />
                    <GlobalAuthOverlays />
                    <GlobalCouponOverlay />
                  </DepositProvider>
                </PendingTransactionProvider>
              </BottomNavUIProvider>
            </MenuUIProvider>
          </CouponUIProvider>
        </AuthUIProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
