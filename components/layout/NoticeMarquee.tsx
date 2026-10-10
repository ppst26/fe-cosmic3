type NoticeMarqueeProps = {
  text: string;
};

export function NoticeMarquee({ text }: NoticeMarqueeProps) {
  const line = `${text} · ${text}`;
  return (
    <div className="flex w-full items-center overflow-hidden border-t border-white/10 bg-[#050608] py-2 text-sm text-white">
      <span className="shrink-0 pl-4 pr-2 font-semibold text-[var(--brand)]">
        ประกาศ :
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
