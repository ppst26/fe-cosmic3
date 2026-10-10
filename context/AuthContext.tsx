"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import type { RegisterRequestBody } from "@/types/signup";
import {
  createInitialMember,
  loadMember,
  reduceMember,
  STORAGE_KEY,
} from "@/lib/member/reducer";
import type { MemberAction, MemberState } from "@/lib/member/types";
import { DEMO_LOGIN_PASSWORD, DEMO_LOGIN_PHONE } from "@/lib/auth/demoLogin";

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  phone: string;
  vipTier: string;
  balance: number;
  diamonds: number;
  points: number;
  unreadNotiCount: number;
  avatar: string;
  accountNumber: string;
  referralCount: number;
  commissionEarned: number;
  loginAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isBalanceHidden: boolean;
  isRefreshingBalance: boolean;
  state: MemberState;
  dispatch: React.Dispatch<MemberAction>;
  login: (username: string, password?: string) => Promise<{ success: boolean; message: string }>;
  register: (body: RegisterRequestBody) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  toggleHideBalance: () => void;
  refreshBalance: () => Promise<void>;
  quickLoginDemo: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function memberToUser(state: MemberState): UserProfile | null {
  if (!state.isAuthenticated) return null;
  const primaryBank = state.banks.find((b) => b.primary);
  return {
    id: "sport-local",
    username: state.username || state.phone,
    displayName: state.displayName,
    phone: state.phone,
    vipTier: "VIP 3",
    balance: state.balance,
    diamonds: state.diamonds,
    points: state.balance,
    unreadNotiCount: 3,
    avatar: "👤",
    accountNumber: primaryBank?.accountNumber ?? "",
    referralCount: 12,
    commissionEarned: state.referralEarnings,
    loginAt: new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reduceMember, null, createInitialMember);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [isRefreshingBalance, setIsRefreshingBalance] = useState(false);
  const mayPersist = useRef(false);

  useEffect(() => {
    dispatch({ type: "replace", state: loadMember() });
  }, []);

  useEffect(() => {
    if (!mayPersist.current) {
      mayPersist.current = true;
      return;
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
    setUser(memberToUser(state));
  }, [state]);

  const login = useCallback(async (username: string, password = "") => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const loginUsername = data.user?.username ?? username;
        dispatch({ type: "loginSuccess", username: loginUsername });
        return { success: true, message: data.message ?? "เข้าสู่ระบบสำเร็จ" };
      }
      return { success: false, message: data.message || "เข้าสู่ระบบไม่สำเร็จ" };
    } catch {
      return { success: false, message: "เชื่อมต่อเซิร์ฟเวอร์ขัดข้อง" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (body: RegisterRequestBody) => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 400));
      dispatch({
        type: "signUp",
        displayName: `${body.firstName} ${body.lastName}`.trim(),
        phone: body.phone,
        password: body.password,
      });
      return { success: true, message: "สมัครสมาชิกสำเร็จ" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    dispatch({ type: "logout" });
    setUser(null);
  }, []);

  const quickLoginDemo = useCallback(async () => {
    await login(DEMO_LOGIN_PHONE, DEMO_LOGIN_PASSWORD);
  }, [login]);

  const toggleHideBalance = useCallback(() => {
    setIsBalanceHidden((prev) => !prev);
  }, []);

  const refreshBalance = useCallback(async () => {
    if (!state.isAuthenticated) return;
    setIsRefreshingBalance(true);
    await new Promise((r) => setTimeout(r, 600));
    const diff = Math.random() > 0.5 ? 50 : -25;
    dispatch({
      type: "replace",
      state: {
        ...state,
        balance: +(state.balance + diff).toFixed(2),
        diamonds: Math.max(0, state.diamonds + diff),
      },
    });
    setIsRefreshingBalance(false);
  }, [state]);

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: state.isAuthenticated,
      isLoading,
      isBalanceHidden,
      isRefreshingBalance,
      state,
      dispatch,
      login,
      register,
      logout,
      toggleHideBalance,
      refreshBalance,
      quickLoginDemo,
    }),
    [
      user,
      state,
      isLoading,
      isBalanceHidden,
      isRefreshingBalance,
      login,
      register,
      logout,
      toggleHideBalance,
      refreshBalance,
      quickLoginDemo,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth ต้องใช้ภายใน AuthProvider");
  }
  return context;
}
