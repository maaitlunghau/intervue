'use client';

import { CheckCircle2, PhoneCall, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function EnterpriseConsultSectionV2() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    teamSize: '10 - 50 engineers',
    need: 'Comprehensive Enterprise Solution',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      aria-label="Enterprise Solutions Consultation"
      className="border-b border-[#E5E7EB] bg-[#006C3B] py-16 text-white sm:py-24"
    >
      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Visual & Value Pitch */}
          <div className="space-y-6 lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-emerald-200 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              <span>PARTNERING WITH TECH ENTERPRISES</span>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
              Which solution is the perfect fit for your enterprise?
            </h2>

            <p className="text-sm leading-relaxed text-emerald-100 sm:text-base">
              Every IT enterprise has unique hiring challenges. InterVue&apos;s team of tech recruitment specialists
              will evaluate your actual needs and design a tailored talent roadmap optimized for your budget.
            </p>

            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <span className="block text-2xl font-black text-emerald-300">24 Hours</span>
                <span className="mt-1 block text-xs text-emerald-100">Average candidate interview turnaround</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <span className="block text-2xl font-black text-emerald-300">94%</span>
                <span className="mt-1 block text-xs text-emerald-100">AI technical skill matching precision</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-200">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              <span>Committed to strict recruitment confidentiality &amp; dedicated 24/7 support.</span>
            </div>
          </div>

          {/* Right Column: In-page Enterprise Consultation Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-white/20 bg-white p-6 text-[#1E2837] shadow-2xl sm:p-10">
              <div className="border-b border-[#E5E7EB] pb-4">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  VIP ENTERPRISE CONSULTATION
                </span>
                <h3 className="mt-2 text-xl font-black text-[#1E2837] sm:text-2xl">Request In-Depth Consultation</h3>
                <p className="mt-1 text-xs text-[#6C757D] sm:text-sm">
                  We will deliver tailored solution proposals and detailed pricing directly to your inbox.
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EBF8F1] text-[#009D46]">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="mt-4 text-lg font-black text-[#1E2837]">Request Submitted Successfully!</h4>
                  <p className="mt-2 text-xs text-[#6C757D] sm:text-sm">
                    Our enterprise account specialist will reach out to{' '}
                    <strong className="text-[#1E2837]">{form.fullName}</strong> ({form.company}) shortly.
                  </p>
                  <div className="mt-6">
                    <a
                      href="tel:0812665001"
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
                    >
                      <PhoneCall className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Enterprise Hotline: (+84) 812.665.001</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ent-name" className="block text-xs font-bold text-[#1E2837]">
                        Full Name *
                      </label>
                      <input
                        id="ent-name"
                        type="text"
                        required
                        placeholder="Alex Johnson"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] px-4 py-2.5 text-xs text-[#1E2837] focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="ent-company" className="block text-xs font-bold text-[#1E2837]">
                        Company / Enterprise Name *
                      </label>
                      <input
                        id="ent-company"
                        type="text"
                        required
                        placeholder="e.g. FPT Software, Tech Corp"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] px-4 py-2.5 text-xs text-[#1E2837] focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ent-phone" className="block text-xs font-bold text-[#1E2837]">
                        Phone Number *
                      </label>
                      <input
                        id="ent-phone"
                        type="tel"
                        required
                        placeholder="+84 912 345 678"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] px-4 py-2.5 text-xs text-[#1E2837] focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="ent-email" className="block text-xs font-bold text-[#1E2837]">
                        Work Email *
                      </label>
                      <input
                        id="ent-email"
                        type="email"
                        required
                        placeholder="contact@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] px-4 py-2.5 text-xs text-[#1E2837] focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ent-size" className="block text-xs font-bold text-[#1E2837]">
                        Hiring Scale This Year
                      </label>
                      <select
                        id="ent-size"
                        value={form.teamSize}
                        onChange={(e) => setForm({ ...form, teamSize: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] bg-white px-4 py-2.5 text-xs text-[#1E2837] focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      >
                        <option value="Under 10 engineers">Under 10 engineers</option>
                        <option value="10 - 50 engineers">10 - 50 engineers</option>
                        <option value="50 - 200 engineers">50 - 200 engineers</option>
                        <option value="Over 200 engineers (Large Scale)">Over 200 engineers (Large Scale)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="ent-need" className="block text-xs font-bold text-[#1E2837]">
                        Solution of Interest
                      </label>
                      <select
                        id="ent-need"
                        value={form.need}
                        onChange={(e) => setForm({ ...form, need: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] bg-white px-4 py-2.5 text-xs text-[#1E2837] focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      >
                        <option value="Comprehensive Enterprise Solution">Comprehensive Enterprise Solution</option>
                        <option value="InterVue Pro Executive Search">InterVue Pro Executive Search</option>
                        <option value="Internal ATS API Integration">Internal ATS API Integration</option>
                        <option value="Academic & Education Code Partnership">
                          Academic &amp; Education Code Partnership
                        </option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#009D46] py-3 text-sm font-bold text-white shadow-xs transition-all hover:bg-[#00873c]"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Consultation Request</span>
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
