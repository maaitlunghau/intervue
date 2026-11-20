import RecruiterTrustDeviceCard from '@/components/auth/RecruiterTrustDeviceCard';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Tin cậy thiết bị này? | InterVue Tuyển Dụng',
  description: 'Xác nhận mức độ tin cậy thiết bị cho phiên đăng nhập nhà tuyển dụng InterVue.',
};

export default function RecruiterTrustDevicePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8fafc]" />}>
      <RecruiterTrustDeviceCard />
    </Suspense>
  );
}
