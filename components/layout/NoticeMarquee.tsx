type NoticeMarqueeProps = {
  text: string;
};

export function NoticeMarquee({ text }: NoticeMarqueeProps) {
  const line = `${text} · ${text}`;
  return (
    <div className="mx-3 mt-2 overflow-hidden rounded-[var(--radius-soft-md)] bg-[var(--notice-bg)] py-2 text-sm text-white shadow-[var(--shadow-soft-sm)]">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        <span className="px-4">{line}</span>
        <span className="px-4" aria-hidden>
          {line}
        </span>
      </div>
    </div>
  );
}
