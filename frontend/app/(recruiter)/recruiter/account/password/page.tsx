import RecruiterChangePasswordSettingsView from '@/components/recruiter/security/RecruiterChangePasswordSettingsView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change password | InterVue Recruiter',
  description: 'Change your account password securely with strong encryption standards.',
};

export default function RecruiterPasswordPage() {
  return <RecruiterChangePasswordSettingsView />;
}
