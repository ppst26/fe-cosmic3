"use client";

import { useT } from "@/lib/i18n/I18nProvider";

type NoticeMarqueeProps = {
  /** ประกาศวิ่งจาก lobby API (LobbyContent.announcements) */
  messages: readonly string[];
};

export function NoticeMarquee({ messages }: NoticeMarqueeProps) {
  const t = useT("home");
  if (messages.length === 0) return null;
  const text = messages.join(" • ");
  const line = `${text} · ${text}`;

  return (
    <div
      className="flex w-full items-center overflow-hidden border-t border-white/10 bg-[#050608] py-2 text-sm text-white"
      aria-label={t("announcement.ariaLabel")}
    >
      <span className="shrink-0 pl-4 pr-2 font-semibold text-[var(--brand)]">
        {t("announcement.label")} :
      </span>
      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          <span className="pr-8">{line}</span>
          <span className="pr-8" aria-hidden>
            {line}
          </span>
        </div>
      </div>
    </div>
  );
}
