'use client';

import AdminDataGate from '@/components/admin/AdminDataGate';
import { adminPaymentApi } from '@/apiRequest/admin-payment';
import { adminTwoFactorApi } from '@/apiRequest/admin-auth';
import { adminPlatformApi } from '@/apiRequest/platform';
import { useAdminResource } from '@/hooks/useAdminResource';
import { useCallback } from 'react';
import AdminPlatformSettingsView from './AdminPlatformSettingsView';

export default function AdminPlatformSettingsPageClient() {
  const load = useCallback(async () => {
    const [maintenance, billing, banks, twoFactorStatus] = await Promise.all([
      adminPlatformApi.getMaintenance(),
      adminPaymentApi.getSettings(),
      adminPaymentApi.getBanks(),
      adminTwoFactorApi.getStatus().catch(() => ({ enabled: true })),
    ]);

    return {
      maintenance,
      billing,
      banks,
      twoFactorEnabled: Boolean(twoFactorStatus.enabled),
    };
  }, []);

  const { data, status, error, reload } = useAdminResource(load);

  return (
    <AdminDataGate status={status} error={error} onRetry={reload}>
      {data && (
        <AdminPlatformSettingsView
          initialMaintenance={data.maintenance}
          initialBilling={data.billing}
          banks={data.banks}
          personalTwoFactorEnabled={data.twoFactorEnabled}
        />
      )}
    </AdminDataGate>
  );
}
