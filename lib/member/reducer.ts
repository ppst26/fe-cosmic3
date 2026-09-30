import { MEMBER } from "@/data/member";
import type { MemberAction, MemberState, Transaction } from "@/lib/member/types";

export const STORAGE_KEY = "sport-member-v1";

export function createInitialMember(): MemberState {
  return {
    displayName: MEMBER.displayName,
    username: MEMBER.username,
    phone: MEMBER.phone,
    password: MEMBER.password,
    balance: MEMBER.balance,
    diamonds: MEMBER.diamonds,
    isAuthenticated: false,
    tickets: 1,
    promoOptIn: false,
    referralEarnings: 1280,
    lineId: "",
    birthDate: "",
    banks: [
      {
        id: "b1",
        bankName: "ธนาคาร กรุงไทย",
        accountNumber: "6613717223",
        accountHolder: "-",
        primary: false,
        status: "pending",
      },
      {
        id: "b2",
        bankName: "ธนาคาร ไทยพาณิชย์",
        accountNumber: "0910170778",
        accountHolder: MEMBER.displayName,
        primary: true,
        status: "verified",
      },
    ],
    transactions: [
      { id: "d1", kind: "deposit", amount: 1000, status: "สำเร็จ", at: "2026-09-28" },
      { id: "w1", kind: "withdraw", amount: 500, status: "สำเร็จ", at: "2026-09-27" },
      { id: "d2", kind: "deposit", amount: 300, status: "รอดำเนินการ", at: "2026-09-26" },
      { id: "p1", kind: "promotion", amount: 100, status: "สำเร็จ", at: "2026-09-25" },
      { id: "bet1", kind: "bet", amount: 200, status: "สำเร็จ", at: "2026-09-24" },
    ],
    cashbackClaims: [{ id: "h1", tab: "play", amount: 45.2, at: "2026-09-28" }],
    cashbackPlay: 45.2,
    cashbackLoss: 10,
    lotterySlips: [],
    favoriteGameIds: [],
    shopRedeemsToday: 1,
    claimedActivityIds: [],
    checkedInToday: false,
    wheelHistory: [],
    wheelWinners: ["คุณเอ ได้รับ 50 บาท"],
  };
}

export function loadMember(): MemberState {
  if (typeof window === "undefined") {
    return createInitialMember();
  }
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (raw === null) {
    return createInitialMember();
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || typeof (parsed as MemberState).balance !== "number") {
      sessionStorage.removeItem(STORAGE_KEY);
      return createInitialMember();
    }
    return parsed as MemberState;
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return createInitialMember();
  }
}

function withTx(state: MemberState, kind: Transaction["kind"], amount: number, at: string): MemberState {
  return {
    ...state,
    transactions: [{ id: `tx-${kind}-${at}-${state.transactions.length}`, kind, amount, status: "สำเร็จ", at }, ...state.transactions],
  };
}

export function reduceMember(state: MemberState, action: MemberAction): MemberState {
  switch (action.type) {
    case "replace":
      return action.state;
    case "signUp":
      return { ...state, displayName: action.displayName, phone: action.phone, password: action.password, isAuthenticated: true };
    case "loginSuccess":
      return { ...state, username: action.username, isAuthenticated: true };
    case "logout":
      return { ...state, username: "", isAuthenticated: false };
    case "deposit":
      return withTx({ ...state, balance: state.balance + action.amount }, "deposit", action.amount, action.at);
    case "withdraw":
      return withTx({ ...state, balance: state.balance - action.amount }, "withdraw", action.amount, action.at);
    case "couponCredit":
      return withTx({ ...state, balance: state.balance + action.amount }, "promotion", action.amount, action.at);
    case "couponGems":
      return { ...state, diamonds: state.diamonds + action.amount };
    case "setPromoOptIn":
      return { ...state, promoOptIn: action.value };
    case "claimActivity":
      return withTx(
        { ...state, balance: state.balance + action.reward, claimedActivityIds: [...state.claimedActivityIds, action.id] },
        "promotion",
        action.reward,
        action.at,
      );
    case "checkIn":
      return { ...state, diamonds: state.diamonds + action.diamonds, checkedInToday: true };
    case "claimCashback": {
      const amount = action.tab === "play" ? state.cashbackPlay : state.cashbackLoss;
      const next = withTx({ ...state, balance: state.balance + amount }, "promotion", amount, action.at);
      return {
        ...next,
        cashbackPlay: action.tab === "play" ? 0 : state.cashbackPlay,
        cashbackLoss: action.tab === "loss" ? 0 : state.cashbackLoss,
        cashbackClaims: [{ id: `cb-${action.at}-${state.cashbackClaims.length}`, tab: action.tab, amount, at: action.at }, ...state.cashbackClaims],
      };
    }
    case "redeemShop":
      return { ...state, diamonds: state.diamonds - action.cost, balance: state.balance + action.credits, shopRedeemsToday: state.shopRedeemsToday + 1 };
    case "spinWheel":
      return {
        ...state,
        tickets: action.method === "ticket" ? state.tickets - 1 : state.tickets,
        diamonds: state.diamonds - (action.method === "gems" ? 50 : 0) + action.gems,
        balance: state.balance + action.credit,
        wheelHistory: [{ id: `wh-${action.at}-${state.wheelHistory.length}`, prize: action.prize, at: action.at }, ...state.wheelHistory],
        wheelWinners: [`${state.displayName} ได้รับ ${action.prize}`, ...state.wheelWinners],
      };
    case "toggleFavorite":
      return {
        ...state,
        favoriteGameIds: state.favoriteGameIds.includes(action.gameId)
          ? state.favoriteGameIds.filter((id) => id !== action.gameId)
          : [...state.favoriteGameIds, action.gameId],
      };
    case "addBank":
      return { ...state, banks: [...state.banks, { ...action.bank, primary: false }] };
    case "setPrimaryBank":
      return { ...state, banks: state.banks.map((bank) => ({ ...bank, primary: bank.id === action.id })) };
    case "changePassword":
      return { ...state, password: action.password };
    case "updateProfile":
      return { ...state, lineId: action.lineId, birthDate: action.birthDate };
    case "withdrawReferral":
      return withTx({ ...state, balance: state.balance + state.referralEarnings, referralEarnings: 0 }, "promotion", state.referralEarnings, action.at);
    case "confirmSlip":
      return { ...state, balance: state.balance - action.slip.total, lotterySlips: [action.slip, ...state.lotterySlips] };
    default:
      return state;
  }
}
