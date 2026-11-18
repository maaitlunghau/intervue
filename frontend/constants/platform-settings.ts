import type {
  PlatformGeneralSettings,
  PlatformSecurityPolicy,
  PlatformServiceStatus,
  PlatformSettingsTab,
} from '@/types/platform';
import { Building2, CreditCard, Wrench, ShieldCheck, Cpu } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface PlatformTabMeta {
  id: PlatformSettingsTab;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  description: string;
}

export const PLATFORM_SETTINGS_TABS: PlatformTabMeta[] = [
  {
    id: 'general',
    label: 'General & Contact Info',
    shortLabel: 'General',
    icon: Building2,
    description:
      'Configure corporate legal identity, branding, customer service hotline, and platform support channels.',
  },
  {
    id: 'payment',
    label: 'Payment & Billing Rules',
    shortLabel: 'Billing',
    icon: CreditCard,
    description: 'Configure VAT tax rates, SePay beneficiary bank accounts, order lifecycles, and auto-reconciliation.',
  },
  {
    id: 'maintenance',
    label: 'Maintenance Mode',
    shortLabel: 'Maintenance',
    icon: Wrench,
    description:
      'Temporarily close the candidate and recruiter portals for safe server upgrades and database migrations.',
  },
  {
    id: 'security',
    label: 'Security & Access Policy',
    shortLabel: 'Security',
    icon: ShieldCheck,
    description:
      'Configure platform-wide 2FA enforcement, administrative session idle timeouts, and brute-force protection.',
  },
  {
    id: 'integrations',
    label: 'Platform Services & APIs',
    shortLabel: 'Integrations',
    icon: Cpu,
    description:
      'Monitor live connection health, ping latency, and webhooks for FPT.AI, Cloudinary, SePay, and Mailer.',
  },
];

export const DEFAULT_GENERAL_SETTINGS: PlatformGeneralSettings = {
  companyName: 'InterVue Vietnam Joint Stock Company',
  brandName: 'InterVue - AI-Assisted Recruitment Platform',
  taxCode: '0318294719',
  supportHotline: '0704 618 714',
  supportEmail: 'support@intervue.com',
  abuseEmail: 'fraud-report@intervue.com',
  headquartersAddress: 'Floor 12, FPT Tower, 10 Pham Van Bach, Cau Giay, Hanoi, Vietnam',
  defaultTimezone: 'Asia/Ho_Chi_Minh (GMT+7)',
  defaultCurrency: 'VND (₫)',
};

export const DEFAULT_SECURITY_POLICY: PlatformSecurityPolicy = {
  enforceAdminTwoFactor: true,
  enforceRecruiterCheckoutTwoFactor: false,
  sessionTimeoutMinutes: 60,
  maxLoginAttempts: 5,
  ipWhitelistingEnabled: false,
};

export const DEFAULT_PLATFORM_SERVICES: PlatformServiceStatus[] = [
  {
    key: 'fpt-ai',
    name: 'FPT.AI Biometric OCR',
    provider: 'FPT Corporation',
    status: 'connected',
    latencyMs: 380,
    lastChecked: 'Just now',
    details: '99.4% National ID card OCR accuracy · Automated facial biometric liveness verification pipeline active',
  },
  {
    key: 'cloudinary',
    name: 'Cloudinary Media CDN',
    provider: 'Cloudinary Inc.',
    status: 'connected',
    latencyMs: 120,
    lastChecked: '2 mins ago',
    details: 'Storage: 4.2 TB / 10 TB quota · Automated avatar compression & PDF CV thumbnail rendering',
  },
  {
    key: 'sepay',
    name: 'SePay Payment Gateway',
    provider: 'SePay Vietnam',
    status: 'connected',
    latencyMs: 240,
    lastChecked: '1 min ago',
    details: 'Webhook listener operational · Realtime bank balance change reconciliation active',
  },
  {
    key: 'smtp',
    name: 'Transactional Mailer (SMTP / Resend)',
    provider: 'Resend & AWS SES',
    status: 'connected',
    latencyMs: 180,
    lastChecked: 'Just now',
    details: '99.8% delivery success rate · Transactional OTP codes and interview calendar invitations',
  },
];
