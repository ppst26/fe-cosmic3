"use client";

import Image from "next/image";
import type { LobbyGame } from "@/data/homeLobby";
import { SheetFrame } from "@/components/wallet/SheetFrame";

export function ProviderPickerSheet({
  isOpen,
  categoryLabel,
  providers,
  selectedId,
  onSelect,
  onClose,
}: {
  isOpen: boolean;
  categoryLabel: string;
  providers: LobbyGame[];
  selectedId: number | null;
  onSelect: (provider: LobbyGame) => void;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <SheetFrame title={`เลือกค่าย · ${categoryLabel}`} onClose={onClose}>
      <ul className="max-h-[min(60vh,420px)] space-y-1 overflow-y-auto pr-0.5">
        {providers.map((provider) => {
          const active = provider.id === selectedId;
          return (
            <li key={provider.id}>
              <button
                type="button"
                onClick={() => {
                  onSelect(provider);
                  onClose();
                }}
                className={`flex w-full items-center gap-3 rounded-xl border-0 px-2 py-2 text-left cursor-pointer transition-colors ${
                  active
                    ? "bg-[var(--brand-soft)] ring-1 ring-[var(--brand)]/35"
                    : "bg-[var(--soft-card)] hover:bg-[var(--brand-soft)]/60"
                }`}
              >
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={provider.image}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <span className="min-w-0 flex-1 truncate text-sm font-bold text-[var(--text-on-light)]">
                  {provider.title}
                </span>
                {active ? (
                  <span className="shrink-0 text-[11px] font-bold text-[var(--brand-strong)]">
                    กำลังดู
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
      {providers.length === 0 ? (
        <p className="py-6 text-center text-sm text-[var(--text-muted)]">ไม่มีค่ายในหมวดนี้</p>
      ) : null}
    </SheetFrame>
  );
}
