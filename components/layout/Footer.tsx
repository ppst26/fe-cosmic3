"use client";

import React from "react";
import Link from "@/lib/i18n/navigation";

export function Footer() {
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
    "18+ RESPONSIBLE GAMING",
  ];

  return (
    <footer className="mt-auto w-full border-t border-white/10 bg-[var(--footer)] pt-10 pb-14 text-xs text-white/75">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-6">
        <div className="grid grid-cols-1 gap-8 border-b border-white/10 pb-8 md:grid-cols-12">
          <div className="space-y-3 md:col-span-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand)] font-black text-white">
                XG
              </div>
              <span className="text-xl font-black tracking-wider text-white">
                XGAMBET <span className="text-[var(--brand)]">PRO</span>
              </span>
            </div>
            <p className="max-w-md leading-relaxed text-white/70">
              ศูนย์รวมความบันเทิงเกมออนไลน์ชั้นนำระดับเอเชีย เว็บตรงมาตรฐานสากล
              บริการเกมสล็อต คาสิโนสด กีฬา หวย และอาร์เคดครบวงจร
              ระบบฝาก-ถอนอัตโนมัติ รวดเร็ว มั่นคง และปลอดภัยสูงสุด 24 ชั่วโมง
            </p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <h4 className="text-sm font-bold tracking-wide text-white">หมวดหมู่เกม</h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/slots" className="hover:text-[var(--brand)]">สล็อตออนไลน์</Link>
              </li>
              <li>
                <Link href="/casino" className="hover:text-[var(--brand)]">คาสิโนสด</Link>
              </li>
              <li>
                <Link href="/sports" className="hover:text-[var(--brand)]">เดิมพันกีฬา</Link>
              </li>
              <li>
                <Link href="/lottery" className="hover:text-[var(--brand)]">หวยออนไลน์</Link>
              </li>
              <li>
                <Link href="/fish" className="hover:text-[var(--brand)]">เกมยิงปลา</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2 md:col-span-2">
            <h4 className="text-sm font-bold tracking-wide text-white">บริการช่วยเหลือ</h4>
            <ul className="space-y-1.5">
              <li><a href="#rules" className="hover:text-[var(--brand)]">กฎและกติกา</a></li>
              <li><a href="#privacy" className="hover:text-[var(--brand)]">นโยบายความเป็นส่วนตัว</a></li>
              <li><a href="#faq" className="hover:text-[var(--brand)]">คำถามที่พบบ่อย</a></li>
              <li><a href="#contact" className="hover:text-[var(--brand)]">ติดต่อแอดมิน 24 ชม.</a></li>
            </ul>
          </div>

          <div className="space-y-3 md:col-span-3">
            <h4 className="text-sm font-bold tracking-wide text-white">ระบบธนาคารที่รองรับ</h4>
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
            <p className="text-[11px] text-white/55">
              รองรับระบบ Auto Banking และ TrueMoney Wallet รวดเร็วใน 3 วินาที
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 border-b border-white/10 py-5 sm:gap-4">
          {licenses.map((lic) => (
            <div
              key={lic}
              className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-wider text-white/70"
            >
              🔒 {lic}
            </div>
          ))}
        </div>

        <div className="pt-5 text-center text-[11px] text-white/55">
          <p>© 2026 XGAMBET / LEGEND PRO. All rights reserved. Powered by CTMX Platform.</p>
        </div>
      </div>
    </footer>
  );
}
