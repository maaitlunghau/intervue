import AuthLayout from '@/components/auth/AuthLayout';
import GuestRedirect from '@/components/auth/GuestRedirect';
import LoginForm from '@/components/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in | InterVue',
  description: 'Sign in to InterVue to explore top tech jobs and access your ATS-ready CV tools.',
};

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome back">
      <GuestRedirect />
      <LoginForm />
    </AuthLayout>
  );
}
