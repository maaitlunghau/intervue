'use client';

import { ROUTES } from '@/constants/routes';
import { CheckCircle2, Headphones, Sparkles, Users, Zap } from 'lucide-react';
import Link from 'next/link';

interface RecruiterPricingPlansProps {
  onOpenConsultModal?: () => void;
}

export default function RecruiterPricingPlans({ onOpenConsultModal }: RecruiterPricingPlansProps) {
  return (
    <section
      id="pricing"
      aria-label="Recruiter Pricing Plans"
      className="border-b border-[#E5E7EB] bg-white py-16 sm:py-24"
    >
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00B14F]/20 bg-[#F0FDF4] px-4 py-1.5 text-xs font-bold text-[#009D46]">
            <Zap className="h-3.5 w-3.5" />
            <span>TRANSPARENT PRICING PLANS</span>
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-[#1E2837] sm:text-4xl">
            Flexible for Tech Enterprises <span className="text-[#00B14F]">of Any Scale</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[#6C757D] sm:text-base">
            Start completely free with 3 job postings. Easily upgrade as your software engineering hiring demands scale.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="mt-14 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
          {/* Starter Plan */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#E5E7EB] bg-[#F8F9FA] p-8 transition-all hover:border-[#00B14F]/40 hover:bg-white hover:shadow-md">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-[#1E2837]">
                <Zap className="h-3.5 w-3.5" />
                <span>NEW ENTERPRISE TRIAL</span>
              </div>

              <h3 className="mt-4 text-2xl font-black text-[#1E2837]">Starter (Trial)</h3>
              <p className="mt-1 text-xs text-[#6C757D]">
                For startups and small teams exploring AI-driven recruitment
              </p>

              <div className="mt-6 border-b border-[#E5E7EB] pb-6">
                <span className="text-4xl font-black text-[#1E2837]">0 VND</span>
                <span className="text-xs text-[#6C757D]"> / forever</span>
              </div>

              <ul className="mt-6 space-y-3.5 text-xs text-[#1E2837] sm:text-sm">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span className="font-bold">3 free IT job postings</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span className="font-bold">30 automated AI CV scoring runs</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span>Basic Kanban candidate pipeline management</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span>Fast 24-hour job posting approval</span>
                </li>
              </ul>
            </div>

            <Link
              href={ROUTES.RECRUITER_REGISTER}
              className="mt-8 block w-full rounded-full border-2 border-[#009D46] bg-white py-3 text-center text-sm font-bold text-[#009D46] transition-all hover:bg-emerald-50"
            >
              Get Started for Free
            </Link>
          </div>

          {/* Growth Pro Plan (Featured) */}
          <div className="relative flex flex-col justify-between rounded-3xl border-2 border-[#009D46] bg-white p-8 shadow-xl">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#009D46] px-4 py-1 text-xs font-bold tracking-wide text-white uppercase shadow-sm">
              MOST POPULAR
            </span>

            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                <Sparkles className="h-3.5 w-3.5" />
                <span>SCALING TECH ENTERPRISES</span>
              </div>

              <h3 className="mt-4 text-2xl font-black text-[#1E2837]">Growth Pro</h3>
              <p className="mt-1 text-xs text-[#6C757D]">For technology companies with continuous hiring needs</p>

              <div className="mt-6 border-b border-[#E5E7EB] pb-6">
                <span className="text-3xl font-black text-[#009D46] sm:text-4xl">1,490,000 VND</span>
                <span className="text-xs text-[#6C757D]"> / month</span>
              </div>

              <ul className="mt-6 space-y-3.5 text-xs text-[#1E2837] sm:text-sm">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span className="font-bold">UNLIMITED IT job postings</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span className="font-bold">Unlimited AI CV screening &amp; scoring</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span>AI-suggested technical interview questionnaires</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span>Top IT Company verified employer badge</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span>Priority ranking in job search results</span>
                </li>
              </ul>
            </div>

            <Link
              href={ROUTES.RECRUITER_LOGIN}
              className="mt-8 block w-full rounded-full bg-[#009D46] py-3 text-center text-sm font-bold text-white shadow-sm transition-all hover:bg-[#00873c]"
            >
              Start with Growth Pro
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#E5E7EB] bg-[#F8F9FA] p-8 transition-all hover:border-slate-800 hover:bg-white hover:shadow-md">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                <Users className="h-3.5 w-3.5" />
                <span>LARGE ENTERPRISE &amp; CONGLOMERATES</span>
              </div>

              <h3 className="mt-4 text-2xl font-black text-[#1E2837]">Enterprise</h3>
              <p className="mt-1 text-xs text-[#6C757D]">
                For technology corporations and software outsourcing enterprises
              </p>

              <div className="mt-6 border-b border-[#E5E7EB] pb-6">
                <span className="text-3xl font-black text-[#1E2837]">Custom Quote</span>
              </div>

              <ul className="mt-6 space-y-3.5 text-xs text-[#1E2837] sm:text-sm">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span className="font-bold">Internal ATS integration via API / Webhooks</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span className="font-bold">Custom AI models fine-tuned to company standards</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span>Dedicated Account Manager &amp; 24/7 priority support</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span>Enterprise Service Agreement &amp; VAT invoicing</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={onOpenConsultModal}
              className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-900 bg-slate-900 py-3 text-center text-sm font-bold text-white transition-all hover:bg-slate-800"
            >
              <Headphones className="h-4 w-4" />
              <span>Contact Solutions Consultant</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
