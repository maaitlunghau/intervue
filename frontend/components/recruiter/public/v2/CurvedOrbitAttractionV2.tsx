'use client';

import { ROUTES } from '@/constants/routes';
import { ArrowRight, Bot, Code2, Globe2, Headphones, Layers, Smartphone, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface CurvedOrbitAttractionV2Props {
  onOpenConsultModal?: () => void;
}

const CHANNELS = [
  {
    step: '01',
    icon: Layers,
    title: 'Thousands of IT opportunities updated daily',
    desc: 'Covering all seniority levels from Intern and Junior to Senior, Tech Lead, and Solution Architect across Product, Outsourcing, and Tech Unicorns.',
    badge: 'All Tech Levels',
  },
  {
    step: '02',
    icon: Globe2,
    title: 'Placing job openings where developers actively search',
    desc: 'Optimized for top rankings on Google Search, GitHub Community, Stack Overflow, and next-generation AI Answer Engines.',
    badge: 'SEO & AI Discovery',
  },
  {
    step: '03',
    icon: Smartphone,
    title: 'Web & Mobile apps engineered for seamless candidate experience',
    desc: 'Candidates receive real-time push alerts for relevant openings and apply with one click using synchronized profiles.',
    badge: 'Omnichannel',
  },
  {
    step: '04',
    icon: Bot,
    title: 'Automated recommendations powered by AI Matching',
    desc: 'Deep neural algorithms analyze tech stacks, frameworks, and project complexity to deliver precision job recommendations.',
    badge: 'AI Matching',
  },
  {
    step: '05',
    icon: Code2,
    title: 'Deep engagement with developer communities & tech universities',
    desc: 'Direct presence at tech meetups, hackathons, open-source repositories, and a network of 15+ top STEM universities.',
    badge: 'Tech Community',
  },
  {
    step: '06',
    icon: Sparkles,
    title: 'Comprehensive AI-driven career development tools',
    desc: 'ATS-compliant AI CV Builder and technical Mock Interview simulations attract tens of thousands of active engineers daily.',
    badge: 'AI Career Tools',
  },
];

export default function CurvedOrbitAttractionV2({ onOpenConsultModal }: CurvedOrbitAttractionV2Props) {
  return (
    <section aria-label="Candidate Attraction Ecosystem" className="border-b border-[#E5E7EB] bg-white py-16 sm:py-24">
      <div className="container-page">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00B14F]/20 bg-[#F0FDF4] px-4 py-1.5 text-xs font-bold text-[#009D46]">
            <Globe2 className="h-3.5 w-3.5" />
            <span>SPECIALIZED MULTI-CHANNEL TECH ECOSYSTEM</span>
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-[#1E2837] sm:text-4xl">
            How InterVue Attracts <span className="text-[#00B14F]">Top IT Talent</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[#6C757D] sm:text-base">
            Over 50,000+ software engineers and developers rely on InterVue every day to discover opportunities, sharpen
            their skills, and advance their tech careers.
          </p>
        </div>

        {/* Orbit Layout: Left Globe Metric & Right Curved Timeline */}
        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: 3D Holographic Globe Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto flex max-w-md flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#D1F2DF] bg-gradient-to-b from-[#F4FBF7] via-white to-[#F0FDF4] p-8 text-center shadow-sm sm:p-10">
              {/* Subtle ambient decorative ring */}
              <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#00B14F]/10 blur-3xl" />
              <div className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl" />

              {/* Glowing Orb Sphere Container */}
              <div className="relative flex h-60 w-60 items-center justify-center sm:h-72 sm:w-72">
                {/* Orbit Rings */}
                <div className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full border-2 border-dashed border-[#00B14F]/25" />
                <div className="absolute inset-4 animate-[spin_25s_linear_infinite_reverse] rounded-full border border-[#00B14F]/20" />

                {/* Central Floating Metric Badge */}
                <div className="relative z-10 flex h-40 w-40 flex-col items-center justify-center rounded-full border-2 border-[#00B14F]/30 bg-white/95 p-4 shadow-[0_8px_30px_rgba(0,177,79,0.15)] backdrop-blur-md">
                  <span className="text-3xl font-black tracking-tight text-[#009D46] sm:text-4xl">50,000+</span>
                  <span className="mt-1 text-center text-xs font-bold text-[#1E2837]">
                    Tech Talents <br />
                    Ready to Apply
                  </span>
                </div>
              </div>

              {/* Real-time Indicator Pill */}
              <div className="mt-6 flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-xs font-semibold text-[#1E2837] shadow-2xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00B14F] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00B14F]" />
                </span>
                <span>Real-time eKYC-verified candidate profiles</span>
              </div>
            </div>
          </div>

          {/* Right: Curved Orbit Timeline Cards */}
          <div className="space-y-4 lg:col-span-7">
            <div className="relative border-l-2 border-[#D1F2DF] pl-6 sm:pl-8">
              {CHANNELS.map((ch) => {
                const Icon = ch.icon;
                return (
                  <div key={ch.step} className="group relative mb-6 last:mb-0">
                    {/* Node Bullet on Timeline */}
                    <div className="absolute -left-[35px] flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#009D46] text-xs font-bold text-white shadow-sm transition-transform duration-200 group-hover:scale-110 sm:-left-[43px] sm:h-9 sm:w-9">
                      {ch.step}
                    </div>

                    {/* Card Content */}
                    <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8F9FA] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00B14F]/50 hover:bg-white hover:shadow-md sm:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EBF8F1] text-[#009D46]">
                            <Icon className="h-4 w-4" />
                          </div>
                          <h3 className="text-base font-bold text-[#1E2837] transition-colors group-hover:text-[#009D46]">
                            {ch.title}
                          </h3>
                        </div>
                        <span className="rounded-full border border-[#D1F2DF] bg-white px-2.5 py-0.5 text-[11px] font-bold text-[#009D46]">
                          {ch.badge}
                        </span>
                      </div>
                      <p className="mt-2.5 text-xs leading-relaxed text-[#6C757D] sm:text-sm sm:leading-relaxed">
                        {ch.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section Conversion Banner */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-[#D1F2DF] bg-gradient-to-r from-[#F4FBF7] via-white to-[#F0FDF4] p-6 sm:p-8">
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <div>
              <p className="text-base font-extrabold text-[#1E2837] sm:text-lg">
                An expansive IT talent ecosystem connecting your openings to the right engineers at the right time.
              </p>
              <p className="mt-1 text-xs text-[#6C757D] sm:text-sm">
                Shorten interview lead time by 3x and reduce tech sourcing costs by up to 60%.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={onOpenConsultModal}
                className="flex cursor-pointer items-center gap-1.5 rounded-full border border-[#00B14F] bg-white px-5 py-2.5 text-xs font-bold text-[#00B14F] transition-all hover:bg-emerald-50 sm:text-sm"
              >
                <Headphones className="h-4 w-4" />
                <span>Request Consultation</span>
              </button>

              <Link
                href={ROUTES.RECRUITER_REGISTER}
                className="flex items-center gap-1.5 rounded-full bg-[#009D46] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#00873c] sm:text-sm"
              >
                <span>Get Started Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
