"use client";

import { ActivitiesScreen } from "@/components/activities/ActivitiesScreen";
import { SubPageShell } from "@/components/layout/SubPageShell";

export default function ActivitiesPage() {
  return (
    <SubPageShell title="กิจกรรม" nav="events" requiresAuth>
      <ActivitiesScreen />
    </SubPageShell>
  );
}
