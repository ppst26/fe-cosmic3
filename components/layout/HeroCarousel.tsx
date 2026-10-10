type HeroCarouselProps = {
  className?: string;
};

export function HeroCarousel({ className = "" }: HeroCarouselProps) {
  return (
    <section
      className={`relative w-full overflow-hidden bg-[#ebebeb] ${className}`.trim()}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(0,0,0,0.04) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.04) 75%),
            linear-gradient(45deg, rgba(0,0,0,0.04) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.04) 75%)
          `,
          backgroundSize: "28px 28px",
          backgroundPosition: "0 0, 14px 14px",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[min(100%,520px)] bg-gradient-to-l from-[#ffb84d]/55 via-[#ff9a2e]/25 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[190px] max-w-[1200px] items-stretch md:min-h-[280px] lg:min-h-[320px]">
        <div className="relative z-[1] flex min-w-0 flex-1 flex-col justify-center gap-2 px-4 py-6 md:px-10 md:py-10">
          <h1 className="text-xl font-extrabold uppercase leading-[1.1] tracking-wide text-[#515151] md:text-4xl lg:text-[2.75rem]">
            Solid Sports Platform
          </h1>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8e8e8e] md:text-base md:text-[var(--brand)]">
            Bet your champion team
          </p>
          <button
            type="button"
            className="mt-2 w-fit rounded-lg border-2 border-[var(--brand)] bg-white px-6 py-2 text-sm font-bold uppercase tracking-wide text-[var(--brand)]"
          >
            Join now
          </button>
        </div>

        <div className="relative min-h-[120px] w-[42%] max-w-[420px] sm:min-h-[190px] sm:w-[48%]" aria-hidden>
          <HeroSportsVisual />
        </div>
      </div>

      <div className="relative z-[1] flex justify-center gap-1.5 pb-3">
        <span className="h-1 w-5 rounded-sm bg-[#515151]" />
        <span className="h-1 w-5 rounded-sm bg-[#c4c4c4]" />
        <span className="h-1 w-5 rounded-sm bg-[#c4c4c4]" />
      </div>
    </section>
  );
}

function HeroSportsVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute bottom-0 right-2 h-[88%] w-[42%] rounded-lg bg-gradient-to-t from-[#1a2744]/80 to-[#2c4563]/40" />
      <div
        className="absolute bottom-4 right-[38%] h-24 w-16 rounded-md bg-gradient-to-b from-[#facc15] to-[#ca8a04] opacity-90"
        style={{ clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)" }}
      />
      <span className="absolute bottom-8 right-[12%] text-6xl drop-shadow-lg">🏆</span>
      <span className="absolute bottom-16 right-[28%] text-4xl opacity-90">⚽</span>
      <span className="absolute bottom-20 right-[8%] text-3xl blur-[1px] opacity-70">⚽</span>
      <span className="absolute bottom-2 right-[22%] text-5xl">🧑‍🦱</span>
      <span className="absolute bottom-6 right-[48%] text-4xl">👕</span>
    </div>
  );
}
