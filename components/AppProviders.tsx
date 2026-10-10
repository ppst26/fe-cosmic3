"use client";

import React from "react";
import { SWRConfig } from "swr";
import { UrlSearchParamsProvider } from "@/app/hooks/useUrlSearchParams";
import { AuthProvider as SessionAuthProvider } from "@/app/components/auth/AuthProvider";
import type { ApiError } from "@/lib/api/http";
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

/**
 * ค่าเริ่มต้น SWR ทั้งแอป (เหมือน glass app/providers.tsx) — ไม่ดึงใหม่ทุกครั้งที่สลับแท็บ · 401 / 4xx ไม่ retry
 * (retry เฉพาะ network / 5xx สูงสุด 3 ครั้ง)
 */
const SWR_DEFAULTS = {
  revalidateOnFocus: false,
  onErrorRetry: (
    error: ApiError,
    _key: string,
    _config: unknown,
    revalidate: (opts: { retryCount: number }) => void,
    { retryCount }: { retryCount: number },
  ) => {
    if (error.code === "UNAUTHORIZED" || (error.status >= 400 && error.status < 500)) return;
    if (retryCount >= 3) return;
    setTimeout(() => revalidate({ retryCount }), 2000 * (retryCount + 1));
  },
};

/**
 * ระหว่างย้ายเป็น logic ของ glass: SessionAuthProvider (session cookie) ทำงานคู่กับ AuthProvider เดิม (reducer)
 * จนกว่าทุกหน้าจะเลิกใช้ @/context/AuthContext แล้วจึงลบของเดิมออก
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <UrlSearchParamsProvider>
      <SWRConfig value={SWR_DEFAULTS}>
        <ToastProvider>
          <SessionAuthProvider>
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
          </SessionAuthProvider>
        </ToastProvider>
      </SWRConfig>
    </UrlSearchParamsProvider>
  );
}
