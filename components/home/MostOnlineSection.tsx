"use client";

import Image from "next/image";
import Link from "@/lib/i18n/navigation";
import { Users } from "lucide-react";
import { useT } from "@/lib/i18n/I18nProvider";
import { useFluctuatingOnlineCount } from "@/app/hooks/useFluctuatingOnlineCount";
import { toSportHref } from "@/lib/gamingRoutes";
import type { MostOnlineLobbyItem } from "@/app/types/lobby";
import { HomePageSection } from "./HomePageSection";

/** ตัวเลขออนไลน์ขยับช้า ๆ ต่อการ์ด — hook เดียวกับ glass */
function MostOnlineCount({ item }: { item: MostOnlineLobbyItem }) {
  const count = useFluctuatingOnlineCount({ id: item.id, onlineCount: item.onlineCount });
  return <span>{count.toLocaleString("en-US")}</span>;
}

/** แถบออนไลน์มากที่สุด — ข้อมูลจาก lobby API (LobbyContent.mostOnline) */
export function MostOnlineSection({ items }: { items: MostOnlineLobbyItem[] }) {
  const t = useT("home");
  if (items.length === 0) return null;

  return (
    <HomePageSection title={t("mostOnline.title")} icon="🔥">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.id}
            href={toSportHref(item.href)}
            aria-label={`${item.brandName} — ${item.tagline}`}
            className="group soft-card flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden soft-panel-bg">
              <Image
                src={item.coverSrc}
                alt=""
                fill
                sizes="(max-width: 767px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"
                aria-hidden
              />
              <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-1.5 p-2">
                <div className="min-w-0">
                  <p className="truncate text-xs font-black text-white sm:text-sm">{item.brandName}</p>
                  <p className="truncate text-[9px] font-bold uppercase tracking-wider text-white/70">
                    {item.tagline}
                  </p>
                </div>
                {item.showHot ? (
                  <span className="shrink-0 rounded-full bg-[#ef4444] px-2 py-0.5 text-[10px] font-black text-white">
                    🔥 HOT
                  </span>
                ) : null}
              </div>
            </div>

            <div className="flex items-center justify-between gap-1 px-2.5 py-2 text-[11px] font-bold sm:text-xs">
              <span className="flex items-center gap-1 text-[#ef4444]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ef4444]" aria-hidden />
                ออนไลน์
              </span>
              <span className="flex items-center gap-1 rounded-full bg-[#ef4444]/10 px-2 py-0.5 text-[#ef4444]">
                <Users className="h-3 w-3" aria-hidden />
                <MostOnlineCount item={item} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </HomePageSection>
  );
}
