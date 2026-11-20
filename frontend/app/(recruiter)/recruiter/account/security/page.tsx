import RecruiterAccountSecuritySettingsView from '@/components/recruiter/security/RecruiterAccountSecuritySettingsView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account security | InterVue Recruiter',
  description: 'Manage account security, active sessions and the devices that access it.',
};

export default function RecruiterSecurityPage() {
  return <RecruiterAccountSecuritySettingsView />;
}
