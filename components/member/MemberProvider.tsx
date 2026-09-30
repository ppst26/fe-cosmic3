"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import {
  STORAGE_KEY,
  createInitialMember,
  loadMember,
  reduceMember,
} from "@/lib/member/reducer";
import type { MemberAction, MemberState } from "@/lib/member/types";

type MemberContextValue = {
  state: MemberState;
  dispatch: (action: MemberAction) => void;
};

const MemberContext = createContext<MemberContextValue | null>(null);

export function MemberProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reduceMember, null, createInitialMember);
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
      // ignore quota errors
    }
  }, [state]);

  return (
    <MemberContext.Provider value={{ state, dispatch }}>
      {children}
    </MemberContext.Provider>
  );
}

export function useMember(): MemberContextValue {
  const value = useContext(MemberContext);
  if (value === null) {
    throw new Error("useMember ต้องอยู่ใต้ MemberProvider");
  }
  return value;
}
