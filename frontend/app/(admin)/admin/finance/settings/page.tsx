import { redirect } from 'next/navigation';

export default function AdminPaymentSettingsPage() {
  redirect('/admin/platform/settings?tab=payment');
}
