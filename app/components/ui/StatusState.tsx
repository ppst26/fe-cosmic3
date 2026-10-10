import Link from "next/link";
import type { ReactNode } from "react";

type StatusAction = { label: string; href?: string; onClick?: () => void };

/** หน้าสถานะเต็มจอ (404 / error / loading) — พื้นและการ์ดใช้ token ของ sport (Orange Light Solid) */
export function StatusPageShell({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-[70dvh] w-full items-center justify-center bg-[var(--body)] px-4 py-10">
      {children}
    </main>
  );
}

function ActionButton({ action, primary }: { action: StatusAction; primary?: boolean }) {
  const className = `${primary ? "soft-btn-primary" : "soft-btn-outline"} inline-flex min-h-11 items-center justify-center px-5 text-sm font-semibold`;
  if (action.href) {
    return (
      <Link href={action.href} className={className}>
        {action.label}
      </Link>
    );
  }
  return (
    <button type="button" onClick={action.onClick} className={className}>
      {action.label}
    </button>
  );
}

export function StatusState({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  code,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  primaryAction?: StatusAction;
  secondaryAction?: StatusAction;
  /** รหัสอ้างอิง (เช่น error digest) */
  code?: string;
  className?: string;
}) {
  return (
    <section
      role="status"
      className={`soft-panel flex w-full max-w-sm flex-col items-center gap-3 px-6 py-8 text-center ${className ?? ""}`}
    >
      {icon ? (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-soft)] text-[var(--brand-strong)]">
          {icon}
        </div>
      ) : null}
      <h1 className="text-lg font-semibold text-[var(--text-on-light)]">{title}</h1>
      {description ? <p className="text-sm text-[var(--text-muted)]">{description}</p> : null}
      {primaryAction || secondaryAction ? (
        <div className="mt-2 flex w-full flex-col gap-2">
          {primaryAction ? <ActionButton action={primaryAction} primary /> : null}
          {secondaryAction ? <ActionButton action={secondaryAction} /> : null}
        </div>
      ) : null}
      {code ? <p className="text-xs text-[var(--text-muted)]">รหัสอ้างอิง: {code}</p> : null}
    </section>
  );
}

export function ErrorState(props: Parameters<typeof StatusState>[0]) {
  return <StatusState {...props} />;
}

export function EmptyState(props: Parameters<typeof StatusState>[0]) {
  return <StatusState {...props} />;
}

export function LoadingState({ label, className }: { label: string; className?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center gap-3 py-6 text-[var(--text-muted)] ${className ?? ""}`}
    >
      <span
        aria-hidden
        className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--soft-surface)] border-t-[var(--brand)]"
      />
      <span className="text-sm">{label}</span>
    </div>
  );
}
