import AdminMaintenanceSettingsPageClient from '@/components/admin/platform/AdminMaintenanceSettingsPageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Platform Settings | InterVue Admin',
  description: 'Maintenance mode for the candidate and recruiter side of the platform.',
};

export default function AdminPlatformSettingsPage() {
  return <AdminMaintenanceSettingsPageClient />;
}
