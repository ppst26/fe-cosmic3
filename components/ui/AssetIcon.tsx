import Image from "next/image";

type AssetIconProps = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
};

/** ไอคอนจาก `/public` — ใช้แทน Lucide เมื่อมี asset */
export function AssetIcon({ src, alt, size = 28, className = "" }: AssetIconProps) {
  return (
    <span
      className={`relative inline-block shrink-0 ${className}`.trim()}
      style={{ width: size, height: size }}
    >
      <Image src={src} alt={alt} fill sizes={`${size}px`} className="object-contain" />
    </span>
  );
}
