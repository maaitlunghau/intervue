import RecruiterAuthSplitLayout from '@/components/auth/RecruiterAuthSplitLayout';
import RecruiterTwoFactorChallengeForm from '@/components/auth/RecruiterTwoFactorChallengeForm';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Xác thực hai yếu tố (2FA) | InterVue Tuyển Dụng',
  description: 'Nhập mã xác thực hai yếu tố để truy cập cổng thông tin nhà tuyển dụng InterVue.',
};

export default function RecruiterTwoFactorPage() {
  return (
    <RecruiterAuthSplitLayout contentMaxWidth="max-w-[520px] sm:max-w-[540px] xl:max-w-[560px]">
      <Suspense fallback={<div className="h-40 animate-pulse rounded-xl bg-slate-100" />}>
        <RecruiterTwoFactorChallengeForm />
      </Suspense>
    </RecruiterAuthSplitLayout>
  );
}
