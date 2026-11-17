import MaintenanceNotice from '@/components/maintenance/MaintenanceNotice';
import { env } from '@/config/env';
import { ROUTES } from '@/constants/routes';
import type { MaintenanceStatus } from '@/types/platform';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Under maintenance — InterVue',
  robots: { index: false, follow: false },
};

const OFFLINE_STATUS: MaintenanceStatus = { enabled: false, message: null, estimatedResumeAt: null };

// The shared apiRequest client reads the Zustand auth store and window.location, so it cannot
// run here. This endpoint is public, so a plain fetch is all the page needs.
async function readStatus(): Promise<MaintenanceStatus> {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/platform/maintenance`, { cache: 'no-store' });
    if (!response.ok) return OFFLINE_STATUS;
    const payload = await response.json();
    return (payload?.data as MaintenanceStatus) ?? OFFLINE_STATUS;
  } catch {
    return OFFLINE_STATUS;
  }
}

export default async function MaintenancePage() {
  const status = await readStatus();
  if (!status.enabled) redirect(ROUTES.HOME);

  return <MaintenanceNotice status={status} />;
}
