import AuthLayout from '@/components/auth/AuthLayout';
import GuestRedirect from '@/components/auth/GuestRedirect';
import RegisterForm from '@/components/auth/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up | InterVue',
  description: 'Create your free InterVue account to access top IT jobs and practice interviews with AI.',
};

export default function RegisterPage() {
  return (
    <AuthLayout title="Sign up for InterVue" subtitle="Create a free account to explore top tech jobs and AI tools.">
      <GuestRedirect />
      <RegisterForm />
    </AuthLayout>
  );
}
