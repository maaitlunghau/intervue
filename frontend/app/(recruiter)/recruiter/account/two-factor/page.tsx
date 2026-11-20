import RecruiterTwoFactorSettingsView from '@/components/recruiter/security/RecruiterTwoFactorSettingsView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Two-factor authentication | InterVue Recruiter',
  description: 'Manage two-factor security for your recruiter account.',
};

export default function RecruiterTwoFactorPage() {
  return <RecruiterTwoFactorSettingsView />;
}
