"use client";

import { ChevronDown, ChevronLeft, ExternalLink } from "lucide-react";

type ListModeProps = {
  mode: "list";
  categoryLabel: string;
  providerCount: number;
};

type DrillModeProps = {
  mode: "drill";
  providerTitle: string;
  gameCount: number;
  onBackToProviders: () => void;
  onOpenPicker: () => void;
  onOpenFullPage?: () => void;
};

export type LobbyContextBarProps = ListModeProps | DrillModeProps;

export function LobbyContextBar(props: LobbyContextBarProps) {
  if (props.mode === "list") {
    return (
      <div
        className="flex min-h-11 items-center justify-between gap-2 rounded-[var(--radius-soft-md)] bg-[var(--soft-card-elevated)] px-3 py-2 shadow-[var(--shadow-soft-sm)]"
        aria-label="ตำแหน่งในล็อบบี้"
      >
        <p className="truncate text-sm font-extrabold text-[var(--text-on-light)]">
          {props.categoryLabel}
        </p>
        <span className="shrink-0 rounded-full bg-[var(--brand-soft)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--brand-strong)]">
          {props.providerCount} ค่าย
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-11 items-center gap-2 rounded-[var(--radius-soft-md)] bg-[var(--soft-card-elevated)] px-2 py-1.5 shadow-[var(--shadow-soft-sm)]"
      aria-label="ตำแหน่งในค่ายเกม"
    >
      <button
        type="button"
        onClick={props.onBackToProviders}
        className="flex max-w-[38%] shrink-0 items-center gap-0.5 rounded-lg bg-[var(--brand-soft)] px-2 py-1.5 text-[11px] font-bold leading-tight text-[var(--brand-strong)] border-0 cursor-pointer sm:max-w-none sm:text-xs"
      >
        <ChevronLeft className="h-4 w-4 shrink-0" />
        <span className="truncate">ค่ายทั้งหมด</span>
      </button>

      <div className="min-w-0 flex-1 text-center">
        <p className="truncate text-sm font-extrabold text-[var(--text-on-light)]">
          {props.providerTitle}
        </p>
        <p className="text-[10px] font-medium text-[var(--text-muted)]">{props.gameCount} เกม</p>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {props.onOpenFullPage ? (
          <button
            type="button"
            onClick={props.onOpenFullPage}
            aria-label="เปิดหน้าค่ายเต็ม"
            className="flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-[var(--soft-card)] text-[var(--text-muted)] cursor-pointer hover:text-[var(--brand-strong)]"
          >
            <ExternalLink className="h-4 w-4" />
          </button>
        ) : null}
        <button
          type="button"
          onClick={props.onOpenPicker}
          className="flex items-center gap-0.5 rounded-lg bg-[var(--brand)] px-2.5 py-1.5 text-[11px] font-bold text-white border-0 cursor-pointer sm:text-xs"
        >
          เปลี่ยนค่าย
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
