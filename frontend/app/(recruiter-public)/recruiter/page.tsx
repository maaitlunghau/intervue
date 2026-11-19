import RecruiterLandingView from '@/components/recruiter/public/RecruiterLandingView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'InterVue for Employers – AI-Powered IT Recruitment Platform',
  description:
    'AI-powered IT recruitment platform: Instant CV-to-JD matching, tiered technical interview questionnaires, and direct connections to 50,000+ verified software engineers.',
};

export default function RecruiterLandingPage() {
  return <RecruiterLandingView />;
}
