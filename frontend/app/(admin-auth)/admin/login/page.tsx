import AdminAuthLayout from '@/components/auth/AdminAuthLayout';
import AdminLoginForm from '@/components/auth/AdminLoginForm';
import AdminLoginHero from '@/components/auth/AdminLoginHero';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Admin Portal | InterVue AI',
  description: 'Secure enterprise administration gateway for InterVue recruitment platform.',
};

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fafcf9]" />}>
      <AdminAuthLayout hero={<AdminLoginHero />}>
        <AdminLoginForm />
      </AdminAuthLayout>
    </Suspense>
  );
}
