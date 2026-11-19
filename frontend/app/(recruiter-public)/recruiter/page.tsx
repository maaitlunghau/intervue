import RecruiterLandingViewV2 from '@/components/recruiter/public/v2/RecruiterLandingViewV2';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'InterVue for Employers – AI-Powered IT Recruitment Platform',
  description:
    'AI-powered IT recruitment platform: Instant CV-to-JD matching, tiered technical interview questionnaires, and direct connections to 50,000+ verified software engineers.',
};

export default function RecruiterLandingPage() {
  return <RecruiterLandingViewV2 />;
}
