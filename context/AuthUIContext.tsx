"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export type AuthUIMode = "login" | "register" | null;

interface AuthUIContextValue {
  mode: AuthUIMode;
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  openLogin: () => void;
  openRegister: () => void;
  closeAuth: () => void;
  switchToRegister: () => void;
  switchToLogin: () => void;
}

const AuthUIContext = createContext<AuthUIContextValue | null>(null);

export function AuthUIProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<AuthUIMode>(null);

  const openLogin = useCallback(() => setMode("login"), []);
  const openRegister = useCallback(() => setMode("register"), []);
  const closeAuth = useCallback(() => setMode(null), []);
  const switchToRegister = useCallback(() => setMode("register"), []);
  const switchToLogin = useCallback(() => setMode("login"), []);

  const value = useMemo(
    () => ({
      mode,
      isLoginOpen: mode === "login",
      isRegisterOpen: mode === "register",
      openLogin,
      openRegister,
      closeAuth,
      switchToRegister,
      switchToLogin,
    }),
    [mode, openLogin, openRegister, closeAuth, switchToRegister, switchToLogin],
  );

  return <AuthUIContext.Provider value={value}>{children}</AuthUIContext.Provider>;
}

export function useAuthUI(): AuthUIContextValue {
  const ctx = useContext(AuthUIContext);
  if (!ctx) {
    throw new Error("useAuthUI ต้องใช้ภายใน AuthUIProvider");
  }
  return ctx;
}
