'use client';

import AdminPaymentSettingsView from '@/components/admin/finance/AdminPaymentSettingsView';
import type { BillingSettings, SupportedBank } from '@/types/admin-payment';

interface PaymentSettingsTabProps {
  initial: BillingSettings;
  banks: SupportedBank[];
}

export default function PaymentSettingsTab({ initial, banks }: PaymentSettingsTabProps) {
  return (
    <div className="space-y-6">
      <AdminPaymentSettingsView initial={initial} banks={banks} />
    </div>
  );
}
