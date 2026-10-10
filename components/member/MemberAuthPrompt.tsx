"use client";

type MemberAuthPromptProps = {
  title?: string;
  description?: string;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
};

export function MemberAuthPrompt({
  title = "เข้าสู่ระบบเพื่อใช้งาน",
  description = "สมัครหรือเข้าสู่ระบบเพื่อดูยอด รับรางวัล และใช้สิทธิ์สมาชิก",
  onOpenLogin,
  onOpenRegister,
}: MemberAuthPromptProps) {
  return (
    <section className="soft-panel space-y-3 p-4 text-center">
      <p className="text-base font-bold text-[var(--text-on-light)]">{title}</p>
      <p className="text-sm text-[var(--text-muted)]">{description}</p>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onOpenRegister}
          className="soft-btn-outline h-11 text-sm font-semibold"
        >
          สมัครสมาชิก
        </button>
        <button
          type="button"
          onClick={onOpenLogin}
          className="soft-btn-primary h-11 text-sm font-semibold"
        >
          เข้าสู่ระบบ
        </button>
      </div>
    </section>
  );
}
