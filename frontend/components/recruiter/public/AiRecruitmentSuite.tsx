'use client';

import { ROUTES } from '@/constants/routes';
import { ArrowRight, CheckCircle2, Cpu, Headphones } from 'lucide-react';
import Link from 'next/link';

interface AiRecruitmentSuiteProps {
  onOpenConsultModal?: () => void;
}

const AI_BLOCKS = [
  {
    step: '01',
    badge: 'AI JD GENERATOR',
    title: 'AI generates and validates job descriptions automatically',
    desc: 'No deep engineering background required for HR. InterVue AI automatically recommends technical competencies, responsibilities, and perks matched to specific programming stacks.',
    features: [
      'Generates professional tech JDs in seconds by entering a role title (e.g. Backend Go, Frontend React)',
      'Automatically parses, cleans, and structures copied job postings',
      'Benchmarks competitive salary ranges against the Vietnamese and Southeast Asian tech market',
    ],
    highlight: 'Save 85% of JD creation time',
    mockupType: 'jd',
  },
  {
    step: '02',
    badge: 'AI CV SCORING & MATCHING',
    title: 'AI scores candidate CV compatibility framework by framework',
    desc: 'Our AI inspects hands-on project depth, architecture exposure, and benchmarks directly against job requirements to yield objective match percentages.',
    features: [
      'Scores compatibility down to individual frameworks and tools (Docker, K8s, Redis, Spring Boot, React)',
      'Instantly ranks incoming candidates from highest to lowest match upon submission',
      'Generates objective summaries of each candidate’s technical strengths and gaps',
    ],
    highlight: 'Up to 94% technical match accuracy',
    mockupType: 'cv',
  },
  {
    step: '03',
    badge: 'AI CANDIDATE RECOMMENDATION',
    title: 'AI proactively recommends matching candidates for your openings',
    desc: 'The moment your job post goes live, AI algorithms query our pool of 50,000+ verified tech candidates to recommend the most suitable software engineers.',
    features: [
      'Proactively engage candidates actively open to new career opportunities',
      'Customizable candidate personas: years of experience, location, remote preference, salary range',
      'Real-time candidate profile data enriched with verified skills and project achievements',
    ],
    highlight: 'Connect with matched candidates within 24 hours',
    mockupType: 'recommend',
  },
];

export default function AiRecruitmentSuite({ onOpenConsultModal }: AiRecruitmentSuiteProps) {
  return (
    <section aria-label="AI Recruitment Suite" className="border-b border-[#E5E7EB] bg-white py-16 sm:py-24">
      <div className="container-page">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00B14F]/20 bg-[#F0FDF4] px-4 py-1.5 text-xs font-bold text-[#009D46]">
            <Cpu className="h-3.5 w-3.5" />
            <span>PROPRIETARY AI CAPABILITIES</span>
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-[#1E2837] sm:text-4xl">
            The AI Trio Reshaping <span className="text-[#00B14F]">Tech Recruitment</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[#6C757D] sm:text-base">
            <em>&ldquo;InterVue AI suggests with intelligence — Recruiters decide with confidence.&rdquo;</em> Eliminate
            90% of tedious manual screening and administrative tasks for HR and Engineering Leads.
          </p>
        </div>

        {/* 3 Horizontal Blocks Stack */}
        <div className="mt-14 space-y-10">
          {AI_BLOCKS.map((block) => (
            <div
              key={block.step}
              className="group overflow-hidden rounded-3xl border border-[#E5E7EB] bg-[#F8F9FA] p-6 transition-all duration-300 hover:border-[#00B14F]/50 hover:bg-white hover:shadow-lg sm:p-10"
            >
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                {/* Left Description Column */}
                <div className="space-y-4 lg:col-span-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#009D46] text-xs font-bold text-white">
                      {block.step}
                    </span>
                    <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800">
                      {block.badge}
                    </span>
                    <span className="text-xs font-semibold text-[#009D46]">{block.highlight}</span>
                  </div>

                  <h3 className="text-xl font-black text-[#1E2837] sm:text-2xl">{block.title}</h3>

                  <p className="text-xs leading-relaxed text-[#6C757D] sm:text-sm sm:leading-relaxed">{block.desc}</p>

                  <ul className="mt-4 space-y-2.5">
                    {block.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#1E2837] sm:text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#009D46]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Interactive Visual Simulation */}
                <div className="lg:col-span-5">
                  <div className="relative overflow-hidden rounded-2xl border border-[#D1F2DF] bg-white p-5 shadow-sm">
                    {block.mockupType === 'jd' && (
                      <div className="space-y-3 font-sans text-xs">
                        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                          <span className="font-bold text-[#1E2837]">InterVue AI Job Editor</span>
                          <span className="rounded bg-emerald-50 px-2 py-0.5 font-bold text-[#009D46]">
                            Ready in 30s
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          <div className="h-3 w-3/4 rounded bg-slate-200" />
                          <div className="h-3 w-full rounded bg-slate-100" />
                          <div className="h-3 w-5/6 rounded bg-slate-100" />
                        </div>
                        <div className="rounded-lg bg-emerald-50/80 p-2.5 text-[11px] text-[#009D46]">
                          ✓ 8 layered technical interview questions added
                        </div>
                      </div>
                    )}

                    {block.mockupType === 'cv' && (
                      <div className="space-y-3 font-sans text-xs">
                        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                          <span className="font-bold text-[#1E2837]">CV Skill Match Breakdown</span>
                          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-black text-emerald-800">
                            94% Match
                          </span>
                        </div>
                        <div className="space-y-2 text-[11px]">
                          <div>
                            <div className="flex justify-between font-semibold text-[#1E2837]">
                              <span>Microservices Architecture &amp; Go</span>
                              <span className="text-[#009D46]">100%</span>
                            </div>
                            <div className="mt-1 h-2 w-full rounded-full bg-slate-100">
                              <div className="h-2 rounded-full bg-[#009D46]" style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between font-semibold text-[#1E2837]">
                              <span>Kubernetes &amp; CI/CD Cloud</span>
                              <span className="text-[#009D46]">90%</span>
                            </div>
                            <div className="mt-1 h-2 w-full rounded-full bg-slate-100">
                              <div className="h-2 rounded-full bg-[#009D46]" style={{ width: '90%' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {block.mockupType === 'recommend' && (
                      <div className="space-y-2.5 font-sans text-xs">
                        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                          <span className="font-bold text-[#1E2837]">Top AI-Recommended Candidates</span>
                          <span className="text-[10px] font-bold text-[#009D46]">Updated 2 mins ago</span>
                        </div>
                        {[
                          { name: 'Alex Nguyen', role: 'Senior Go Engineer', score: '98%' },
                          { name: 'Sarah Tran', role: 'Fullstack React/Node Specialist', score: '94%' },
                          { name: 'David Le', role: 'DevOps & SRE Architect', score: '92%' },
                        ].map((dev, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between rounded-lg border border-[#E5E7EB] bg-[#F8F9FA] p-2"
                          >
                            <div>
                              <p className="font-bold text-[#1E2837]">{dev.name}</p>
                              <p className="text-[10px] text-[#6C757D]">{dev.role}</p>
                            </div>
                            <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-black text-[#009D46]">
                              {dev.score}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Row */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={onOpenConsultModal}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-[#00B14F] bg-white px-7 py-3 text-xs font-bold text-[#00B14F] transition-all hover:bg-emerald-50 sm:text-sm"
          >
            <Headphones className="h-4 w-4" />
            <span>Consult with AI Experts</span>
          </button>

          <Link
            href={ROUTES.RECRUITER_REGISTER}
            className="flex items-center gap-2 rounded-full bg-[#009D46] px-8 py-3 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#00873c] sm:text-sm"
          >
            <span>Try AI Sourcing Free</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
