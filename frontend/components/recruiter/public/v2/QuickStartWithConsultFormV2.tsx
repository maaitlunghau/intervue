'use client';

import { ROUTES } from '@/constants/routes';
import { ArrowRight, CheckCircle2, PhoneCall, Send, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const STEPS = [
  {
    step: '1',
    title: 'Create Recruiter Account',
    desc: 'Takes just 1 minute to set up your company profile and verify business credentials.',
  },
  {
    step: '2',
    title: 'Post Openings with AI Assistant',
    desc: 'Create professional job posts in seconds with AI-generated technical competency standards.',
  },
  {
    step: '3',
    title: 'Receive Matched CVs & Interview',
    desc: 'AI automatically benchmarks resume compatibility; connect directly 1-on-1 via chat.',
  },
];

export default function QuickStartWithConsultFormV2() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Hanoi',
    need: 'Free IT Job Posting',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section aria-label="Quick Start & Consultation" className="border-b border-[#E5E7EB] bg-[#F8F9FA] py-16 sm:py-24">
      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: 3 Steps */}
          <div className="space-y-6 lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00B14F]/20 bg-[#F0FDF4] px-4 py-1.5 text-xs font-bold text-[#009D46]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>EASY ONBOARDING</span>
            </div>

            <h2 className="text-2xl font-black tracking-tight text-[#1E2837] sm:text-4xl">
              Hire Tech Talent Successfully <br />
              <span className="text-[#00B14F]">in 3 Simple Steps</span>
            </h2>

            <p className="text-sm leading-relaxed text-[#6C757D] sm:text-base">
              No complex bureaucracy. InterVue streamlines every hiring touchpoint so your team can engage premier
              software engineers immediately.
            </p>

            <div className="space-y-4 pt-2">
              {STEPS.map((s) => (
                <div
                  key={s.step}
                  className="flex items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-4.5 shadow-2xs sm:p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#009D46] text-sm font-bold text-white shadow-xs">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1E2837]">{s.title}</h3>
                    <p className="mt-1 text-xs text-[#6C757D] sm:text-sm">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href={ROUTES.RECRUITER_REGISTER}
                className="inline-flex items-center gap-2 rounded-full bg-[#009D46] px-8 py-3 text-sm font-bold text-white shadow-xs transition-all hover:bg-[#00873c]"
              >
                <span>Create Recruiter Account</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: In-page Consultation Form (Touchpoint 1) */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-[#D1F2DF] bg-white p-6 shadow-md sm:p-10">
              <div className="border-b border-[#E5E7EB] pb-4">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  FREE 1-ON-1 CONSULTATION
                </span>
                <h3 className="mt-2 text-xl font-black text-[#1E2837] sm:text-2xl">
                  Request Custom Hiring Consultation
                </h3>
                <p className="mt-1 text-xs text-[#6C757D] sm:text-sm">
                  Our hiring solutions specialist will get in touch with you within 15 minutes.
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EBF8F1] text-[#009D46]">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="mt-4 text-lg font-black text-[#1E2837]">Request Submitted Successfully!</h4>
                  <p className="mt-2 text-xs text-[#6C757D] sm:text-sm">
                    Thank you. An InterVue specialist will contact you via phone at{' '}
                    <strong className="text-[#1E2837]">{form.phone}</strong> shortly.
                  </p>
                  <div className="mt-6">
                    <a
                      href="tel:0812665001"
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
                    >
                      <PhoneCall className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Direct Hotline: 0812.665.001</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="quick-fullname" className="block text-xs font-bold text-[#1E2837]">
                      Full Name *
                    </label>
                    <input
                      id="quick-fullname"
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins (Head of Talent)"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#D0D5DD] px-4 py-2.5 text-xs text-[#1E2837] placeholder:text-slate-400 focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="quick-phone" className="block text-xs font-bold text-[#1E2837]">
                        Contact Phone *
                      </label>
                      <input
                        id="quick-phone"
                        type="tel"
                        required
                        placeholder="+84 912 345 678"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] px-4 py-2.5 text-xs text-[#1E2837] placeholder:text-slate-400 focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="quick-email" className="block text-xs font-bold text-[#1E2837]">
                        Work Email *
                      </label>
                      <input
                        id="quick-email"
                        type="email"
                        required
                        placeholder="talent@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] px-4 py-2.5 text-xs text-[#1E2837] placeholder:text-slate-400 focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="quick-city" className="block text-xs font-bold text-[#1E2837]">
                        Location / City
                      </label>
                      <select
                        id="quick-city"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] bg-white px-4 py-2.5 text-xs text-[#1E2837] focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      >
                        <option value="Hanoi">Hanoi</option>
                        <option value="Ho Chi Minh City">Ho Chi Minh City</option>
                        <option value="Da Nang">Da Nang</option>
                        <option value="Nationwide / Remote">Nationwide / Remote</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="quick-need" className="block text-xs font-bold text-[#1E2837]">
                        Hiring Objective
                      </label>
                      <select
                        id="quick-need"
                        value={form.need}
                        onChange={(e) => setForm({ ...form, need: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] bg-white px-4 py-2.5 text-xs text-[#1E2837] focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      >
                        <option value="Free IT Job Posting">Free IT Job Posting</option>
                        <option value="Growth Pro Package">Growth Pro Package</option>
                        <option value="InterVue Pro Executive Hiring">InterVue Pro Executive Hiring</option>
                        <option value="Enterprise Custom Solution">Enterprise Custom Solution</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#009D46] py-3 text-sm font-bold text-white shadow-xs transition-all hover:bg-[#00873c]"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit Consultation Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
