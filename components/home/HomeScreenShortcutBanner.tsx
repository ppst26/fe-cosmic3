"use client";

import { useToast } from "@/context/ToastContext";

function AndroidIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path
        d="M17.6 11.48l1.84-3.18c.16-.31.04-.69-.26-.85a.61.61 0 0 0-.83.22l-1.88 3.24a11.43 11.43 0 0 0-8.94 0L5.65 7.67a.61.61 0 0 0-.84-.22c-.3.16-.42.54-.26.85l1.84 3.18C3.16 13.27 1 16.73 1 21h22c0-4.27-2.16-7.73-5.4-9.52zM7 19c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path
        d="M16.365 1.43c0 1.14-.42 2.19-1.19 3.01-.84.9-2.04 1.42-3.22 1.34-.14-1.09.45-2.23 1.22-3.01.84-.92 2.28-1.48 3.19-1.34zM20.88 17.17c-.57 1.3-.85 1.88-1.58 3.03-1.02 1.58-2.46 3.55-4.25 3.56-1.59.01-2.01-1.03-4.19-1.02-2.18.01-2.64 1.03-4.23 1.02-1.79-.01-3.14-1.62-4.16-3.2-2.86-4.38-3.16-9.51-1.4-12.23 1.24-1.9 3.2-3.01 5.14-3.01 1.91 0 3.11 1.03 4.69 1.03 1.51 0 2.43-1.03 4.61-1.03 1.65 0 3.4.9 4.64 2.45-4.08 2.22-3.42 7.98.68 9.4z"
      />
    </svg>
  );
}

export function HomeScreenShortcutBanner() {
  const { showToast } = useToast();

  function showInstallHint(platform: "android" | "ios") {
    const message =
      platform === "ios"
        ? "แตะปุ่มแชร์ใน Safari แล้วเลือก \"เพิ่มไปที่หน้าจอโฮม\""
        : "เปิดเมนู Chrome แล้วเลือก \"เพิ่มไปที่หน้าจอหลัก\" หรือ \"ติดตั้งแอป\"";
    showToast(message, "info", 6000);
  }

  return (
    <section className="mt-4 px-3 pb-6 md:px-6" aria-labelledby="home-shortcut-title">
      <h2
        id="home-shortcut-title"
        className="mb-2 text-sm font-bold text-[var(--text-on-light)]"
      >
        เพิ่มปุ่มลัดหน้าโฮม
      </h2>

      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#2a2a30] via-[#1c1c22] to-[#121218] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:p-5"
      >
        <div className="flex items-stretch gap-3 sm:gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-[#ff9a3c] to-[var(--brand)] text-xs font-extrabold text-white shadow-md">
              XG
            </div>

            <p className="mt-3 text-base font-extrabold text-white sm:text-lg">
              เพิ่มปุ่มลัดได้แล้ววันนี้!
            </p>
            <p className="mt-1 text-xs leading-relaxed text-white/65 sm:text-sm">
              เข้าเล่นเร็วขึ้น เพิ่มไอคอนบนหน้าจอโฮมของคุณ
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => showInstallHint("android")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs font-semibold text-white/75 border-solid cursor-pointer hover:bg-black/55"
              >
                <AndroidIcon />
                Android
              </button>
              <button
                type="button"
                onClick={() => showInstallHint("ios")}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--brand)] bg-black/50 px-3 py-2 text-xs font-semibold text-white cursor-pointer shadow-[0_0_12px_rgba(245,135,30,0.35)] hover:bg-black/65"
              >
                <AppleIcon />
                iOS
              </button>
            </div>
          </div>

          <div className="relative hidden w-[108px] shrink-0 sm:block sm:w-[120px]">
            <div
              className="absolute inset-y-2 right-0 aspect-square w-full rounded-full border-[3px] border-[var(--brand)] bg-gradient-to-br from-[#3d2814] via-[#1a1410] to-[#0d0d10] shadow-[0_0_24px_rgba(245,135,30,0.45)]"
              aria-hidden
            >
              <div className="flex h-full flex-col items-center justify-center px-2 text-center">
                <span className="text-lg font-extrabold leading-none text-[var(--brand)]">XG</span>
                <span className="mt-1 text-[9px] font-bold tracking-wide text-white/80">
                  XGAMBET
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
