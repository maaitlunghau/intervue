'use client';

import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface RecruiterFaqAccordionV2Props {
  onOpenConsultModal?: () => void;
}

const FAQS = [
  {
    q: 'How does InterVue differ from general job boards on the market?',
    a: 'InterVue is 100% focused exclusively on Information Technology (IT). Our domain-tuned AI deeply comprehends programming languages, modern frameworks, and cloud architectures. Moreover, 100% of candidate profiles undergo automated identity verification, eliminating phantom CV spam and reducing initial technical screening hours by up to 60%.',
  },
  {
    q: 'Can new enterprises post IT jobs for free?',
    a: 'Absolutely! Every new employer account registered on InterVue is instantly activated with our perpetual Starter Plan, offering 3 free IT job postings, 30 automated AI CV scoring runs, and full access to our Kanban candidate pipeline management dashboard.',
  },
  {
    q: 'What are the key advantages of Growth Pro and Enterprise plans?',
    a: 'Paid plans (Growth Pro, Enterprise) unlock unlimited job listings and AI CV screenings, AI-generated tiered technical interview questionnaires, verified Top IT Company branding badges, and prioritized ranking on the candidate job feed to maximize talent reach.',
  },
  {
    q: 'How fast can we connect and schedule interviews with software developers?',
    a: 'Through InterVue Connect (direct 1-on-1 real-time messaging between verified employers and candidates), candidate response rates exceed 85%, and the average turnaround from message sent to confirmed interview is under 24 hours—eliminating days of waiting for cold email replies.',
  },
  {
    q: 'What integrations does the Enterprise tier support?',
    a: 'The Enterprise package provides bi-directional RESTful APIs and Webhooks to sync seamlessly with your internal Applicant Tracking System (ATS), supports custom AI evaluation criteria aligned with company tech standards, and includes dedicated 24/7 account management with electronic VAT invoicing.',
  },
];

export default function RecruiterFaqAccordionV2({ onOpenConsultModal }: RecruiterFaqAccordionV2Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section aria-label="Frequently Asked Questions" className="border-b border-[#E5E7EB] bg-[#F8F9FA] py-16 sm:py-24">
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00B14F]/20 bg-[#F0FDF4] px-4 py-1.5 text-xs font-bold text-[#009D46]">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS (FAQ)</span>
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-[#1E2837] sm:text-4xl">
            Answering Key Questions for <span className="text-[#00B14F]">Tech Recruiters</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[#6C757D] sm:text-base">
            Frequently asked questions about job posting policies, pricing, AI matching algorithms, and candidate
            engagement on InterVue.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mx-auto mt-12 max-w-3xl space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-200 hover:border-[#00B14F]/40"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full cursor-pointer items-center justify-between p-5 text-left sm:p-6"
                >
                  <span className="pr-4 text-sm font-bold text-[#1E2837] sm:text-base">{faq.q}</span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#009D46] text-white' : 'bg-[#F8F9FA] text-[#6C757D]'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-[#E5E7EB] px-5 py-4.5 text-xs leading-relaxed text-[#6C757D] sm:px-6 sm:py-5 sm:text-sm sm:leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA trigger */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#6C757D] sm:text-sm">
            Have more questions and need personalized consultation?{' '}
            <button
              type="button"
              onClick={onOpenConsultModal}
              className="cursor-pointer font-bold text-[#009D46] underline hover:text-[#00873c]"
            >
              Contact a recruitment consultant now ➔
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
