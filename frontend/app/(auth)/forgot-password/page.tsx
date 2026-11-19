import AuthLayout from '@/components/auth/AuthLayout';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import GuestRedirect from '@/components/auth/GuestRedirect';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot password | InterVue',
  description: 'Recover your InterVue account password quickly and securely.',
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout showLogo={false} title="Forgot password">
      <GuestRedirect />
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
