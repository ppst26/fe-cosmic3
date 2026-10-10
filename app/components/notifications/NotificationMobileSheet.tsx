"use client";

import React from "react";
import { OverlayPanel } from "@/app/components/ui/OverlayPanel";
import { NotificationCenterPanel } from "./NotificationCenterPanel";
import { useT } from "@/lib/i18n/I18nProvider";

interface NotificationMobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Sheet แจ้งเตือนมือถือ — เปิดจากไอคอนกระดิ่ง */
export function NotificationMobileSheet({ isOpen, onClose }: NotificationMobileSheetProps) {
  const t = useT("common");
  return (
    <OverlayPanel
      open={isOpen}
      onClose={onClose}
      zClassName="z-[110]"
      title={t("notifications.title")}
      closeLabel={t("notifications.close")}
    >
      <NotificationCenterPanel variant="sheet" />
    </OverlayPanel>
  );
}
