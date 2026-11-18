'use client';

import { PLATFORM_SETTINGS_TABS } from '@/constants/platform-settings';
import { cn } from '@/lib/utils';
import type { BillingSettings, SupportedBank } from '@/types/admin-payment';
import type { MaintenanceSettings, PlatformSettingsTab } from '@/types/platform';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import GeneralSettingsTab from './tabs/GeneralSettingsTab';
import IntegrationsTab from './tabs/IntegrationsTab';
import MaintenanceSettingsTab from './tabs/MaintenanceSettingsTab';
import PaymentSettingsTab from './tabs/PaymentSettingsTab';
import SecurityPolicyTab from './tabs/SecurityPolicyTab';

interface AdminPlatformSettingsViewProps {
  initialMaintenance: MaintenanceSettings;
  initialBilling: BillingSettings;
  banks: SupportedBank[];
  personalTwoFactorEnabled?: boolean;
}

export default function AdminPlatformSettingsView({
  initialMaintenance,
  initialBilling,
  banks,
  personalTwoFactorEnabled = true,
}: AdminPlatformSettingsViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentParamTab = searchParams.get('tab') as PlatformSettingsTab | null;
  const validTabs: PlatformSettingsTab[] = ['general', 'payment', 'maintenance', 'security', 'integrations'];
  const defaultTab = currentParamTab && validTabs.includes(currentParamTab) ? currentParamTab : 'general';

  const [activeTab, setActiveTab] = useState<PlatformSettingsTab>(defaultTab);

  const handleSelectTab = (tab: PlatformSettingsTab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const currentTabMeta = PLATFORM_SETTINGS_TABS.find((t) => t.id === activeTab) ?? PLATFORM_SETTINGS_TABS[0];

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="border-outline-variant dark:border-forest-800 dark:bg-forest-900 flex flex-col gap-4 rounded-xl border bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-navy dark:text-forest-50 text-2xl font-bold tracking-tight">
            Platform Settings & Governance
          </h1>
          <p className="text-body-sm text-on-surface-variant dark:text-forest-400 mt-1">
            Enterprise administration hub for legal branding, payment gateways, maintenance standby, security policies,
            and integrations.
          </p>
        </div>

        {initialMaintenance.enabled && (
          <div className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-semibold text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
            <span>Platform is in Maintenance Mode</span>
          </div>
        )}
      </div>

      {/* Modern 5-Tab Navigation Bar */}
      <div className="border-outline-variant dark:border-forest-800 dark:bg-forest-900 overflow-x-auto rounded-xl border bg-white p-1.5 shadow-2xs">
        <nav className="flex min-w-max items-center gap-1.5" aria-label="Settings Tabs">
          {PLATFORM_SETTINGS_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelectTab(tab.id)}
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition-all',
                  isActive
                    ? 'bg-primary text-white shadow-2xs'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-navy dark:text-forest-300 dark:hover:bg-forest-850 dark:hover:text-forest-100',
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
                {tab.id === 'maintenance' && initialMaintenance.enabled && (
                  <span className={cn('h-1.5 w-1.5 rounded-full', isActive ? 'bg-white' : 'bg-amber-500')} />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Active Tab Description Bar */}
      <div className="text-body-sm text-on-surface-variant dark:text-forest-400 px-1">
        <p>{currentTabMeta.description}</p>
      </div>

      {/* Tab Panels */}
      <div className="mt-4">
        {activeTab === 'general' && <GeneralSettingsTab />}
        {activeTab === 'payment' && <PaymentSettingsTab initial={initialBilling} banks={banks} />}
        {activeTab === 'maintenance' && <MaintenanceSettingsTab initial={initialMaintenance} />}
        {activeTab === 'security' && <SecurityPolicyTab personalTwoFactorEnabled={personalTwoFactorEnabled} />}
        {activeTab === 'integrations' && <IntegrationsTab />}
      </div>
    </div>
  );
}
