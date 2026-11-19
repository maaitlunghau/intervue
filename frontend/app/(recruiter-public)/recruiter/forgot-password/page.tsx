import RecruiterAuthSplitLayout from '@/components/auth/RecruiterAuthSplitLayout';
import RecruiterForgotPasswordForm from '@/components/auth/RecruiterForgotPasswordForm';
import RecruiterGuestRedirect from '@/components/auth/RecruiterGuestRedirect';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot employer password | InterVue AI',
  description: 'Recover access to your InterVue employer account.',
};

export default function RecruiterForgotPasswordPage() {
  return (
    <RecruiterAuthSplitLayout contentMaxWidth="max-w-[520px] sm:max-w-[540px] xl:max-w-[560px]">
      <RecruiterGuestRedirect />
      <RecruiterForgotPasswordForm />
    </RecruiterAuthSplitLayout>
  );
}
