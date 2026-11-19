import AuthLayout from '@/components/auth/AuthLayout';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset password | InterVue',
  description: 'Create a new password for your InterVue account.',
  robots: { index: false },
};

type ResetPasswordPageProps = { searchParams: Promise<{ token?: string }> };

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token } = await searchParams;

  return (
    <AuthLayout title="Reset password" subtitle="Create a new password for your InterVue account.">
      <ResetPasswordForm token={token} />
    </AuthLayout>
  );
}
