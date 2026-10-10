"use client";

import { MobileMenuDialog } from "@/components/MobileMenuDialog";
import { useAuthUI } from "@/context/AuthUIContext";
import { useCouponUI } from "@/context/CouponUIContext";
import { useDeposit } from "@/context/DepositContext";
import { useMenuUI } from "@/context/MenuUIContext";

export function GlobalMobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useMenuUI();
  const { openLogin, openRegister } = useAuthUI();
  const { openDeposit, openWithdraw } = useDeposit();
  const { openCoupon } = useCouponUI();

  return (
    <MobileMenuDialog
      isOpen={isMobileMenuOpen}
      onClose={closeMobileMenu}
      onOpenLogin={() => {
        closeMobileMenu();
        openLogin();
      }}
      onOpenRegister={() => {
        closeMobileMenu();
        openRegister();
      }}
      onOpenDeposit={() => {
        closeMobileMenu();
        openDeposit();
      }}
      onOpenWithdraw={() => {
        closeMobileMenu();
        openWithdraw();
      }}
      onOpenCoupon={() => {
        closeMobileMenu();
        openCoupon();
      }}
    />
  );
}
