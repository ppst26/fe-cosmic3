type FloatingControlsProps = {
  onOpenTheme?: () => void;
  onOpenChat?: () => void;
};

export function FloatingControls({ onOpenTheme, onOpenChat }: FloatingControlsProps) {
  return (
    <div className="pointer-events-none fixed bottom-20 right-3 z-40 flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={onOpenTheme}
        className="pointer-events-auto flex items-center gap-1 rounded-l-[var(--radius-soft-lg)] bg-[var(--header)] py-2 pl-3 pr-2 text-[10px] font-medium text-white shadow-[var(--shadow-soft)]"
      >
        <span aria-hidden>⚙</span>
        <span className="rotate-180 [writing-mode:vertical-rl]">ปรับแต่ง</span>
      </button>
      <button
        type="button"
        onClick={onOpenChat}
        className="soft-card pointer-events-auto flex flex-col items-center gap-0.5 px-2.5 py-2 text-[10px] font-medium text-[var(--text-on-light)]"
      >
        <span className="text-lg" aria-hidden>
          🎧
        </span>
        ติดต่อ
      </button>
    </div>
  );
}
