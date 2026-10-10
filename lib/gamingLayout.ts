/** อยู่หน้ารายเกมในค่าย (มี segment หลัง basePath) */
export function isGamingProviderDetailPath(pathname: string, basePath: string): boolean {
  if (pathname === basePath) return false;
  if (!pathname.startsWith(`${basePath}/`)) return false;
  const tail = pathname.slice(basePath.length + 1);
  return tail.length > 0 && !tail.includes("/");
}
