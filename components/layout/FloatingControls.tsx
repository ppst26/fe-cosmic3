"use client";

import Link from "@/lib/i18n/navigation";
import { useT } from "@/lib/i18n/I18nProvider";

type FloatingControlsProps = {
  /** ถ้าไม่ส่ง จะลิงก์ไป /support เหมือนปุ่มติดต่อของ BottomNav */
  onOpenChat?: () => void;
};

export function FloatingControls({ onOpenChat }: FloatingControlsProps) {
  const t = useT("nav");
  const content = (
    <>
      <span className="text-lg" aria-hidden>
        🎧
      </span>
      {t("bottomNav.contact")}
    </>
  );
  const className =
    "soft-card pointer-events-auto flex flex-col items-center gap-0.5 px-2.5 py-2 text-[10px] font-medium text-[var(--text-on-light)] no-underline";

  return (
    <div className="pointer-events-none fixed bottom-20 right-3 z-40 flex flex-col items-end gap-2">
      {onOpenChat ? (
        <button type="button" onClick={onOpenChat} className={`${className} cursor-pointer border-0`}>
          {content}
        </button>
      ) : (
        <Link href="/support" className={className}>
          {content}
        </Link>
      )}
    </div>
  );
}
