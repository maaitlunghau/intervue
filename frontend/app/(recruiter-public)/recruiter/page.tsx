import RecruiterLandingViewV2 from '@/components/recruiter/public/v2/RecruiterLandingViewV2';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'InterVue for Employers – AI-Powered IT Recruitment Platform',
  description:
    'Nền tảng tuyển dụng IT ứng dụng AI: So khớp CV với JD tức thì, tạo bộ câu hỏi phỏng vấn phân tầng và kết nối trực tiếp với hơn 50.000+ kỹ sư phần mềm đã qua xác thực eKYC.',
};

export default function RecruiterLandingPage() {
  return <RecruiterLandingViewV2 />;
}
