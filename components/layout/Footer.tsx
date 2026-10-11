"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import Link from "@/lib/i18n/navigation";
import { useT } from "@/lib/i18n/I18nProvider";
import { BrandLogo } from "@/components/brand/BrandLogo";

export function Footer() {
  const t = useT("nav");
  const banks = [
    { name: "KBANK", color: "bg-emerald-600" },
    { name: "SCB", color: "bg-emerald-700" },
    { name: "BBL", color: "bg-blue-800" },
    { name: "KTB", color: "bg-sky-500" },
    { name: "TTB", color: "bg-blue-600" },
    { name: "TrueMoney", color: "bg-orange-500" },
  ];

  const licenses = [
    "PAGCOR LICENSE",
    "BMM TESTLABS",
    "MALTA GAMING AUTHORITY",
    "CURACAO eGAMING",
    "eCOGRA CERTIFIED",
    `18+ ${t("footer.playResponsibly")}`,
  ];

  return (
    <footer aria-label={t("footer.label")} className="mt-auto w-full border-t border-white/10 bg-[var(--footer)] pt-10 pb-14 text-xs text-white/75">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-6">
        <div className="grid grid-cols-1 gap-8 border-b border-white/10 pb-8 md:grid-cols-12">
          <div className="space-y-3 md:col-span-5">
            <BrandLogo size="lg" />
            <p className="max-w-md leading-relaxed text-white/70">{t("footer.tagline")}</p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <h4 className="text-sm font-bold tracking-wide text-white">{t("desktop.gameCategories")}</h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/slots" className="hover:text-white">{t("footer.link.slots")}</Link>
              </li>
              <li>
                <Link href="/casino" className="hover:text-white">{t("footer.link.liveCasino")}</Link>
              </li>
              <li>
                <Link href="/sports" className="hover:text-white">{t("footer.link.sports")}</Link>
              </li>
              <li>
                <Link href="/lottery" className="hover:text-white">{t("footer.link.lottery")}</Link>
              </li>
              <li>
                <Link href="/fish" className="hover:text-white">{t("footer.link.fishing")}</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2 md:col-span-2">
            <h4 className="text-sm font-bold tracking-wide text-white">{t("footer.columns.services")}</h4>
            <ul className="space-y-1.5">
              <li><a href="#rules" className="hover:text-white">{t("footer.link.terms")}</a></li>
              <li><a href="#privacy" className="hover:text-white">{t("footer.link.privacy")}</a></li>
              <li><a href="#faq" className="hover:text-white">{t("footer.link.helpCenter")}</a></li>
              <li><a href="#contact" className="hover:text-white">{t("footer.link.contactUs")}</a></li>
            </ul>
          </div>

          <div className="space-y-3 md:col-span-3">
            <h4 className="text-sm font-bold tracking-wide text-white">{t("footer.paymentMethods")}</h4>
            <div className="flex flex-wrap gap-2">
              {banks.map((b) => (
                <div
                  key={b.name}
                  className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white/85"
                >
                  <span className={`h-2 w-2 rounded-full ${b.color}`} />
                  <span>{b.name}</span>
                </div>
              ))}
            </div>
            
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 border-b border-white/10 py-5 sm:gap-4">
          {licenses.map((lic) => (
            <div
              key={lic}
              className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-wider text-white/70"
            >
              <ShieldCheck className="h-3 w-3" aria-hidden />
              {lic}
            </div>
          ))}
        </div>

        <div className="pt-5 text-center text-[11px] text-white/55">
          <p>© 2026 CMB-Jupiter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
