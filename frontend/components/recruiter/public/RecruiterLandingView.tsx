'use client';

import Footer from '@/components/common/Footer';
import { useState } from 'react';
import AcademicTalentSection from './AcademicTalentSection';
import AiRecruitmentSuite from './AiRecruitmentSuite';
import CurvedOrbitAttraction from './CurvedOrbitAttraction';
import EnterpriseConsultSection from './EnterpriseConsultSection';
import FinalContactAndFooterCta from './FinalContactAndFooterCta';
import InterVueProExecutive from './InterVueProExecutive';
import QuickStartWithConsultForm from './QuickStartWithConsultForm';
import RecruiterConsultModal from './RecruiterConsultModal';
import RecruiterFaqAccordion from './RecruiterFaqAccordion';
import RecruiterHeader from './RecruiterHeader';
import RecruiterHero from './RecruiterHero';
import RecruiterPricingPlans from './RecruiterPricingPlans';
import SmartRecruitmentPlatform from './SmartRecruitmentPlatform';
import SocialProofAndMedia from './SocialProofAndMedia';
import TrustedPartnersTicker from './TrustedPartnersTicker';

export default function RecruiterLandingView() {
  const [consultModalOpen, setConsultModalOpen] = useState(false);

  const openConsultModal = () => setConsultModalOpen(true);
  const closeConsultModal = () => setConsultModalOpen(false);

  return (
    <div className="text-on-surface flex min-h-screen flex-col bg-[#F5FBF9] antialiased">
      {/* 1. Floating Capsule Navbar (TopCV Inspired) */}
      <RecruiterHeader onOpenConsultModal={openConsultModal} />

      <main className="flex-1">
        {/* 2. Hero Visual Scene & Key Metrics */}
        <RecruiterHero onOpenConsultModal={openConsultModal} />

        {/* 3. Trusted Enterprise Partners Ticker */}
        <TrustedPartnersTicker />

        {/* 4. Multi-channel Attraction Ecosystem (Curved Orbit Timeline) */}
        <CurvedOrbitAttraction onOpenConsultModal={openConsultModal} />

        {/* 5. Smart Recruitment Platform (Master-Detail Interactive Tabs) */}
        <SmartRecruitmentPlatform onOpenConsultModal={openConsultModal} />

        {/* 6. InterVue AI Suite (3 AI Weapons Horizontal Blocks) */}
        <AiRecruitmentSuite onOpenConsultModal={openConsultModal} />

        {/* 7. Quick 3-Step Start & In-page Consultation Form (Touchpoint 1) */}
        <QuickStartWithConsultForm />

        {/* 8. University Network & Education Code VIP Pipeline */}
        <AcademicTalentSection />

        {/* 9. InterVue Pro - Executive Tech Talent (Senior & Tech Lead) */}
        <InterVueProExecutive onOpenConsultModal={openConsultModal} />

        {/* 10. Transparent Pricing Plans (Starter, Growth Pro, Enterprise) */}
        <RecruiterPricingPlans onOpenConsultModal={openConsultModal} />

        {/* 11. Deep Green Enterprise Consultation Section (Touchpoint 2) */}
        <EnterpriseConsultSection />

        {/* 12. Tech Leaders Testimonials & Media Press Network */}
        <SocialProofAndMedia />

        {/* 13. Frequently Asked Questions (Accordion) */}
        <RecruiterFaqAccordion onOpenConsultModal={openConsultModal} />

        {/* 14. Contact Team (Touchpoint 3) & Bottom Conversion Callout */}
        <FinalContactAndFooterCta />
      </main>

      {/* 15. Standard Enterprise Footer */}
      <Footer />

      {/* Global Interactive Consultation Modal */}
      <RecruiterConsultModal isOpen={consultModalOpen} onClose={closeConsultModal} />
    </div>
  );
}
