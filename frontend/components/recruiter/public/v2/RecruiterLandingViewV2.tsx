'use client';

import Footer from '@/components/common/Footer';
import { useState } from 'react';
import AcademicTalentSectionV2 from './AcademicTalentSectionV2';
import AiRecruitmentSuiteV2 from './AiRecruitmentSuiteV2';
import CurvedOrbitAttractionV2 from './CurvedOrbitAttractionV2';
import EnterpriseConsultSectionV2 from './EnterpriseConsultSectionV2';
import FinalContactAndFooterCtaV2 from './FinalContactAndFooterCtaV2';
import InterVueProExecutiveV2 from './InterVueProExecutiveV2';
import QuickStartWithConsultFormV2 from './QuickStartWithConsultFormV2';
import RecruiterConsultModalV2 from './RecruiterConsultModalV2';
import RecruiterFaqAccordionV2 from './RecruiterFaqAccordionV2';
import RecruiterHeaderV2 from './RecruiterHeaderV2';
import RecruiterHeroV2 from './RecruiterHeroV2';
import RecruiterPricingPlansV2 from './RecruiterPricingPlansV2';
import SmartRecruitmentPlatformV2 from './SmartRecruitmentPlatformV2';
import SocialProofAndMediaV2 from './SocialProofAndMediaV2';
import TrustedPartnersTickerV2 from './TrustedPartnersTickerV2';

export default function RecruiterLandingViewV2() {
  const [consultModalOpen, setConsultModalOpen] = useState(false);

  const openConsultModal = () => setConsultModalOpen(true);
  const closeConsultModal = () => setConsultModalOpen(false);

  return (
    <div className="text-on-surface flex min-h-screen flex-col bg-[#F5FBF9] antialiased">
      {/* 1. Floating Capsule Navbar (TopCV Inspired) */}
      <RecruiterHeaderV2 onOpenConsultModal={openConsultModal} />

      <main className="flex-1">
        {/* 2. Hero Visual Scene & Key Metrics */}
        <RecruiterHeroV2 onOpenConsultModal={openConsultModal} />

        {/* 3. Trusted Enterprise Partners Ticker */}
        <TrustedPartnersTickerV2 />

        {/* 4. Multi-channel Attraction Ecosystem (Curved Orbit Timeline) */}
        <CurvedOrbitAttractionV2 onOpenConsultModal={openConsultModal} />

        {/* 5. Smart Recruitment Platform (Master-Detail Interactive Tabs) */}
        <SmartRecruitmentPlatformV2 onOpenConsultModal={openConsultModal} />

        {/* 6. InterVue AI Suite (3 AI Weapons Horizontal Blocks) */}
        <AiRecruitmentSuiteV2 onOpenConsultModal={openConsultModal} />

        {/* 7. Quick 3-Step Start & In-page Consultation Form (Touchpoint 1) */}
        <QuickStartWithConsultFormV2 />

        {/* 8. University Network & Education Code VIP Pipeline */}
        <AcademicTalentSectionV2 />

        {/* 9. InterVue Pro - Executive Tech Talent (Senior & Tech Lead) */}
        <InterVueProExecutiveV2 onOpenConsultModal={openConsultModal} />

        {/* 10. Transparent Pricing Plans (Starter, Growth Pro, Enterprise) */}
        <RecruiterPricingPlansV2 onOpenConsultModal={openConsultModal} />

        {/* 11. Deep Green Enterprise Consultation Section (Touchpoint 2) */}
        <EnterpriseConsultSectionV2 />

        {/* 12. Tech Leaders Testimonials & Media Press Network */}
        <SocialProofAndMediaV2 />

        {/* 13. Frequently Asked Questions (Accordion) */}
        <RecruiterFaqAccordionV2 onOpenConsultModal={openConsultModal} />

        {/* 14. Contact Team (Touchpoint 3) & Bottom Conversion Callout */}
        <FinalContactAndFooterCtaV2 />
      </main>

      {/* 15. Standard Enterprise Footer */}
      <Footer />

      {/* Global Interactive Consultation Modal */}
      <RecruiterConsultModalV2 isOpen={consultModalOpen} onClose={closeConsultModal} />
    </div>
  );
}
