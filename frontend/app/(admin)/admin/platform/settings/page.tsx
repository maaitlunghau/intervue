import AdminPlatformSettingsPageClient from '@/components/admin/platform/settings/AdminPlatformSettingsPageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Platform Settings | InterVue Admin',
  description: 'Manage legal identity, payment rules, maintenance mode, security policies, and integrations.',
};

export default function AdminPlatformSettingsPage() {
  return <AdminPlatformSettingsPageClient />;
}
