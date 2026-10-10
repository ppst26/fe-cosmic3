"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { WalletModal } from "@/components/WalletModal";
import { useAuth } from "@/context/AuthContext";

type WalletMainTab = "deposit-withdraw" | "promo" | "history";
type WalletActionSubTab = "deposit" | "withdraw";
type WalletHistorySubTab = "deposit-history" | "withdraw-history";

interface DepositContextValue {
  openDeposit: () => void;
  closeDeposit: () => void;
  openWithdraw: () => void;
  openWalletPromo: () => void;
  openWalletHistory: (subTab?: WalletHistorySubTab) => void;
  isOpen: boolean;
}

const DepositContext = createContext<DepositContextValue | null>(null);

function localToday(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function DepositProvider({ children }: { children: React.ReactNode }) {
  const { dispatch } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [mainTab, setMainTab] = useState<WalletMainTab>("deposit-withdraw");
  const [actionSubTab, setActionSubTab] = useState<WalletActionSubTab>("deposit");
  const [historySubTab, setHistorySubTab] = useState<WalletHistorySubTab>("deposit-history");

  const openDeposit = useCallback(() => {
    setMainTab("deposit-withdraw");
    setActionSubTab("deposit");
    setIsOpen(true);
  }, []);

  const openWithdraw = useCallback(() => {
    setMainTab("deposit-withdraw");
    setActionSubTab("withdraw");
    setIsOpen(true);
  }, []);

  const openWalletPromo = useCallback(() => {
    setMainTab("promo");
    setIsOpen(true);
  }, []);

  const openWalletHistory = useCallback((subTab: WalletHistorySubTab = "deposit-history") => {
    setMainTab("history");
    setHistorySubTab(subTab);
    setIsOpen(true);
  }, []);

  const closeDeposit = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onDepositCompleted = useCallback(
    (amount: number) => {
      dispatch({ type: "deposit", amount, at: localToday() });
    },
    [dispatch],
  );

  const onWithdrawCompleted = useCallback(
    (amount: number) => {
      dispatch({ type: "withdraw", amount, at: localToday() });
    },
    [dispatch],
  );

  const value = useMemo(
    () => ({
      openDeposit,
      closeDeposit,
      openWithdraw,
      openWalletPromo,
      openWalletHistory,
      isOpen,
    }),
    [isOpen, openDeposit, closeDeposit, openWithdraw, openWalletPromo, openWalletHistory],
  );

  return (
    <DepositContext.Provider value={value}>
      {children}
      <WalletModal
        isOpen={isOpen}
        onClose={closeDeposit}
        initialTab={mainTab}
        initialSubTab={actionSubTab}
        initialHistorySubTab={historySubTab}
        onDepositCompleted={onDepositCompleted}
        onWithdrawCompleted={onWithdrawCompleted}
      />
    </DepositContext.Provider>
  );
}

export function useDeposit(): DepositContextValue {
  const ctx = useContext(DepositContext);
  if (!ctx) {
    throw new Error("useDeposit ต้องใช้ภายใน DepositProvider");
  }
  return ctx;
}
