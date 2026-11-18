export interface MaintenanceStatus {
  enabled: boolean;
  message: string | null;
  estimatedResumeAt: string | null;
}

export interface MaintenanceSettings extends MaintenanceStatus {
  enabledAt: string | null;
  enabledBy: number | null;
}

export interface SaveMaintenanceInput {
  enabled: boolean;
  message: string | null;
  estimatedResumeAt: string | null;
}

export type PlatformSettingsTab = 'general' | 'payment' | 'maintenance' | 'security' | 'integrations';

export interface PlatformGeneralSettings {
  companyName: string;
  brandName: string;
  taxCode: string;
  supportHotline: string;
  supportEmail: string;
  abuseEmail: string;
  headquartersAddress: string;
  defaultTimezone: string;
  defaultCurrency: string;
}

export interface PlatformSecurityPolicy {
  enforceAdminTwoFactor: boolean;
  enforceRecruiterCheckoutTwoFactor: boolean;
  sessionTimeoutMinutes: number;
  maxLoginAttempts: number;
  ipWhitelistingEnabled: boolean;
}

export interface PlatformServiceStatus {
  key: string;
  name: string;
  provider: string;
  status: 'connected' | 'degraded' | 'disconnected';
  latencyMs: number;
  lastChecked: string;
  details: string;
}
