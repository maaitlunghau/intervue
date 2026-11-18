'use client';

import AdminMaintenanceSettingsView from '@/components/admin/platform/AdminMaintenanceSettingsView';
import type { MaintenanceSettings } from '@/types/platform';

interface MaintenanceSettingsTabProps {
  initial: MaintenanceSettings;
}

export default function MaintenanceSettingsTab({ initial }: MaintenanceSettingsTabProps) {
  return (
    <div className="space-y-6">
      <AdminMaintenanceSettingsView initial={initial} />
    </div>
  );
}
