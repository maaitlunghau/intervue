import RecruiterAuthSplitLayout from '@/components/auth/RecruiterAuthSplitLayout';
import RecruiterGuestRedirect from '@/components/auth/RecruiterGuestRedirect';
import RecruiterLoginForm from '@/components/auth/RecruiterLoginForm';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Employer sign in | InterVue AI',
  description: 'Sign in to the InterVue employer portal to manage job posts and screen candidates with AI assistance.',
};

export default function RecruiterLoginPage() {
  return (
    <RecruiterAuthSplitLayout contentMaxWidth="max-w-[520px] sm:max-w-[540px] xl:max-w-[560px]">
      <RecruiterGuestRedirect />
      <Suspense fallback={<div className="h-40 animate-pulse rounded-xl bg-slate-100" />}>
        <RecruiterLoginForm />
      </Suspense>
    </RecruiterAuthSplitLayout>
  );
}
