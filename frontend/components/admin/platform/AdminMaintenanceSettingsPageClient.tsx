'use client';

import AdminDataGate from '@/components/admin/AdminDataGate';
import AdminMaintenanceSettingsView from '@/components/admin/platform/AdminMaintenanceSettingsView';
import { adminPlatformApi } from '@/apiRequest/platform';
import { useAdminResource } from '@/hooks/useAdminResource';
import { useCallback } from 'react';

export default function AdminMaintenanceSettingsPageClient() {
  const load = useCallback(() => adminPlatformApi.getMaintenance(), []);
  const { data, status, error, reload } = useAdminResource(load);

  return (
    <AdminDataGate status={status} error={error} onRetry={reload}>
      {data && <AdminMaintenanceSettingsView initial={data} />}
    </AdminDataGate>
  );
}
