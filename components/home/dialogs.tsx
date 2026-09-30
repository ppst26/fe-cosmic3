"use client";

import type { WalletSubTab, WalletTab } from "@/data/homeLobby";

type DialogFrameProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

function DialogFrame({ title, onClose, children }: DialogFrameProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-3 sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-md rounded-[var(--radius-soft-xl)] bg-[var(--soft-card-elevated)] p-4 shadow-[var(--shadow-soft)]"
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-[var(--text-on-light)]">{title}</h2>
          <button type="button" onClick={onClose} className="h-9 w-9 rounded-full bg-[var(--soft-card)] text-lg">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function WalletDialog({
  tab,
  subTab,
  onClose,
  onChange,
}: {
  tab: WalletTab;
  subTab: WalletSubTab;
  onClose: () => void;
  onChange: (next: { tab: WalletTab; subTab: WalletSubTab }) => void;
}) {
  return (
    <DialogFrame title="กระเป๋าเงิน" onClose={onClose}>
      <div className="mb-3 flex gap-2">
        {(
          [
            ["deposit-withdraw", "ฝาก/ถอน"],
            ["promo", "โปรโมชั่น"],
            ["history", "ประวัติ"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange({ tab: key, subTab })}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              tab === key ? "bg-[var(--brand)] text-white" : "bg-[var(--soft-card)] text-[var(--text-muted)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === "deposit-withdraw" ? (
        <div className="flex gap-2">
          {(["deposit", "withdraw"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => onChange({ tab, subTab: key })}
              className={`h-10 flex-1 rounded-[var(--radius-soft-sm)] text-sm font-semibold ${
                subTab === key ? "soft-btn-primary" : "bg-[var(--soft-card)] text-[var(--text-on-light)]"
              }`}
            >
              {key === "deposit" ? "ฝากเงิน" : "ถอนเงิน"}
            </button>
          ))}
        </div>
      ) : (
        <p className="rounded-[var(--radius-soft-md)] bg-[var(--soft-card)] p-3 text-sm text-[var(--text-muted)]">
          {tab === "promo" ? "รายการโปรโมชั่นที่รับได้จะแสดงที่นี่" : "ประวัติฝากถอนจะแสดงที่นี่"}
        </p>
      )}
    </DialogFrame>
  );
}

export function InfoDialog({
  title,
  message,
  onClose,
}: {
  title: string;
  message: string;
  onClose: () => void;
}) {
  return (
    <DialogFrame title={title} onClose={onClose}>
      <p className="text-sm text-[var(--text-on-light)]">{message}</p>
    </DialogFrame>
  );
}
