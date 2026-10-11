import Image from "next/image";
import { cn } from "@/lib/utils";

export const BRAND_LOGO_SRC = "/cosmic-dark.png";
export const BRAND_LOGO_ALT = "cosmicbet";

const SIZE = {
  sm: { className: "h-7", width: 112, height: 28 },
  md: { className: "h-8", width: 128, height: 32 },
  lg: { className: "h-10", width: 160, height: 40 },
} as const;

type BrandLogoProps = {
  size?: keyof typeof SIZE;
  className?: string;
  priority?: boolean;
};

/** โลโก้แบรนด์ (cosmicbet) — ใช้บนพื้นเข้ม */
export function BrandLogo({ size = "md", className, priority }: BrandLogoProps) {
  const dim = SIZE[size];
  return (
    <Image
      src={BRAND_LOGO_SRC}
      alt={BRAND_LOGO_ALT}
      width={dim.width}
      height={dim.height}
      priority={priority}
      className={cn("w-auto shrink-0 object-contain object-left", dim.className, className)}
    />
  );
}
