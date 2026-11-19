'use client';

import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  FileText,
  Headphones,
  Layers,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface SmartRecruitmentPlatformProps {
  onOpenConsultModal?: () => void;
}

const SRP_TABS = [
  {
    id: 'job-posting',
    icon: FileText,
    label: 'AI Job Posting',
    title: 'Smart AI Job Editor Optimized for Tech SEO',
    desc: 'Publish tech job openings instantly with AI assistance. Automatically standardize skills, frameworks, and benchmark competitive market compensation.',
    benefits: [
      'Generates tailored JDs across engineering tracks (Frontend, Backend, DevOps, AI, Mobile)',
      'Automatic technical SEO optimization ranks your openings high on Google & AI search engines',
      'Automated boost during peak developer browsing hours',
    ],
    tag: '3.5x More Applications',
  },
  {
    id: 'talent-search',
    icon: Search,
    label: 'Proactive Talent Sourcing',
    title: 'Directly Source Engineers by Tech Stack',
    desc: 'Actively engage high-caliber software talent without waiting for applicants. Deep filtering by framework, years of experience, and salary expectations.',
    benefits: [
      'Granular filters: Programming languages, cloud platforms, databases, architecture',
      'Real-time AI Match scores displayed directly on candidate profiles',
      '100% eKYC-verified identities, eliminating fake profiles and ghosting',
    ],
    tag: '50,000+ Verified Profiles',
  },
  {
    id: 'connect-chat',
    icon: MessageSquare,
    label: 'InterVue Connect (1-on-1 Chat)',
    title: 'Instant Real-time Candidate Engagement',
    desc: 'Eliminate slow email turnaround. Message software engineers directly 1-on-1, discuss technical requirements, and schedule interviews instantly.',
    benefits: [
      'Over 85% response rate within 24 hours',
      'Send technical interview invites and receive instant RSVPs within the chat',
      'End-to-end encrypted communication protecting hiring team and candidate privacy',
    ],
    tag: '24-Hour Response Rate',
  },
  {
    id: 'employer-branding',
    icon: Sparkles,
    label: 'Employer Tech Branding',
    title: 'Position Your Engineering Brand Front & Center',
    desc: 'Elevate employer brand reputation within the developer community through sponsored tech banners and verified company profile pages.',
    benefits: [
      'Exclusive engineering showcase page (Company Tech Profile)',
      'Prominent sponsored banner placements on homepage and job directories',
      '5x higher trust and engagement from senior engineers and engineering leads',
    ],
    tag: '5x Higher Visibility',
  },
  {
    id: 'ats-integration',
    icon: Layers,
    label: 'ATS Kanban & API Integration',
    title: 'Visual Hiring Pipeline & Bi-directional Sync',
    desc: 'Track candidates across a fluid Kanban pipeline. Effortlessly synchronize hiring stages with your internal ATS via standardized RESTful APIs.',
    benefits: [
      'Intuitive drag-and-drop Kanban: New, AI Matched, Interview, Offer, Hired',
      'Automated scoring and layered technical interview questions tailored to candidate depth',
      'Webhook & API support for seamless integration with enterprise ATS solutions',
    ],
    tag: 'Save 70% Screening Time',
  },
];

export default function SmartRecruitmentPlatform({ onOpenConsultModal }: SmartRecruitmentPlatformProps) {
  const [activeTabId, setActiveTabId] = useState(SRP_TABS[0].id);
  const activeTab = SRP_TABS.find((t) => t.id === activeTabId) ?? SRP_TABS[0];

  return (
    <section
      id="solutions"
      aria-label="Smart Recruitment Platform"
      className="border-b border-[#E5E7EB] bg-[#F8F9FA] py-16 sm:py-24"
    >
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00B14F]/20 bg-[#F0FDF4] px-4 py-1.5 text-xs font-bold text-[#009D46]">
            <Bot className="h-3.5 w-3.5" />
            <span>INTERVUE SMART RECRUITMENT PLATFORM (SRP)</span>
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-[#1E2837] sm:text-4xl">
            Comprehensive IT Recruitment Platform <span className="text-[#00B14F]">Powered by AI</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[#6C757D] sm:text-base">
            An end-to-end technology ecosystem solving every tech hiring challenge: from sourcing and technical
            screening to interviews and high-performance candidate management.
          </p>
        </div>

        {/* Master-Detail Tabs Layout */}
        <div className="mt-14 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left: 5 Nav Tabs */}
          <div className="flex flex-col justify-between space-y-3 lg:col-span-5">
            {SRP_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabId(tab.id)}
                  className={cn(
                    'group flex w-full cursor-pointer items-center justify-between rounded-2xl border p-4.5 text-left transition-all duration-200 sm:p-5',
                    isActive
                      ? 'border-[#00B14F] bg-white shadow-md ring-1 ring-[#00B14F]/20'
                      : 'border-[#E5E7EB] bg-white/70 hover:border-[#00B14F]/40 hover:bg-white',
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors',
                        isActive
                          ? 'bg-[#009D46] text-white shadow-xs'
                          : 'bg-[#F0FDF4] text-[#009D46] group-hover:bg-[#009D46] group-hover:text-white',
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span
                        className={cn(
                          'block text-sm font-bold sm:text-base',
                          isActive ? 'text-[#1E2837]' : 'text-[#344054]',
                        )}
                      >
                        {tab.label}
                      </span>
                      <span className="text-xs font-semibold text-[#009D46]">{tab.tag}</span>
                    </div>
                  </div>

                  <ChevronRight
                    className={cn(
                      'h-5 w-5 transition-transform duration-200',
                      isActive ? 'rotate-90 text-[#009D46]' : 'text-slate-400 group-hover:text-slate-600',
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Rich Interactive Mockup Dashboard */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#D1F2DF] bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
            {/* Top Detail Meta */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E7EB] pb-5">
                <div>
                  <span className="text-xs font-bold text-[#009D46] uppercase">Specialized Solution</span>
                  <h3 className="mt-1 text-xl font-black text-[#1E2837] sm:text-2xl">{activeTab.title}</h3>
                </div>
                <span className="rounded-full border border-[#D1F2DF] bg-[#F0FDF4] px-3 py-1 text-xs font-bold text-[#009D46]">
                  {activeTab.tag}
                </span>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-[#6C757D] sm:text-sm sm:leading-relaxed">
                {activeTab.desc}
              </p>

              {/* Benefits Checklist */}
              <ul className="mt-5 space-y-2.5">
                {activeTab.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#1E2837] sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#009D46]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dynamic Interactive Software Mockup depending on active Tab */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F8F9FA] p-4 sm:p-5">
              {activeTabId === 'job-posting' && (
                <div className="space-y-3 font-sans">
                  <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-3 w-3 rounded-full bg-red-400" />
                      <span className="flex h-3 w-3 rounded-full bg-amber-400" />
                      <span className="flex h-3 w-3 rounded-full bg-emerald-400" />
                      <span className="ml-2 text-xs font-bold text-[#1E2837]">InterVue AI Job Editor</span>
                    </div>
                    <span className="flex items-center gap-1 rounded-md bg-[#009D46] px-2 py-0.5 text-[10px] font-bold text-white">
                      <Sparkles className="h-3 w-3" />
                      AI SEO 98/100
                    </span>
                  </div>

                  <div className="rounded-xl border border-[#E5E7EB] bg-white p-3.5 shadow-2xs">
                    <p className="text-xs font-bold text-[#1E2837]">Senior Fullstack Engineer (Go / React / K8s)</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-[#009D46]">
                        Golang
                      </span>
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-[#009D46]">
                        React 19
                      </span>
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-[#009D46]">
                        Kubernetes
                      </span>
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-[#009D46]">
                        PostgreSQL
                      </span>
                      <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-700">
                        40 - 55M VND
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-emerald-50/80 p-3 text-xs text-[#009D46]">
                    <div className="flex items-center gap-2 font-semibold">
                      <Bot className="h-4 w-4" />
                      <span>12 technical screening criteria automatically suggested</span>
                    </div>
                    <span className="cursor-pointer font-bold underline">Preview Job Post</span>
                  </div>
                </div>
              )}

              {activeTabId === 'talent-search' && (
                <div className="space-y-3 font-sans">
                  <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2.5">
                    <span className="text-xs font-bold text-[#1E2837]">Direct Candidate Search</span>
                    <span className="text-[11px] font-bold text-[#009D46]">Found 1,420 matched profiles</span>
                  </div>

                  <div className="rounded-xl border border-[#D1F2DF] bg-white p-3.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                          TH
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-[#1E2837]">Tran Huy Hoang</span>
                            <span className="py-0.2 flex items-center gap-0.5 rounded-full bg-emerald-100 px-1.5 text-[9px] font-bold text-emerald-800">
                              <ShieldCheck className="h-3 w-3" /> eKYC Verified
                            </span>
                          </div>
                          <span className="text-[11px] text-[#6C757D]">
                            Senior DevOps &amp; Cloud Architect • 5 yrs exp
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-black text-[#009D46]">
                          96% Match
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTabId === 'connect-chat' && (
                <div className="space-y-2.5 font-sans">
                  <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      <span className="text-xs font-bold text-[#1E2837]">InterVue Connect 1-on-1</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Online</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="rounded-xl border border-[#E5E7EB] bg-white p-2.5 text-[#1E2837]">
                      Hi there! We reviewed your Kubernetes &amp; Go profile on InterVue. Very impressive track record!
                    </div>
                    <div className="ml-auto w-4/5 rounded-xl bg-[#009D46] p-2.5 text-white">
                      Hello! I am actively exploring senior backend roles. I would love to interview this Thursday!
                    </div>
                  </div>
                </div>
              )}

              {activeTabId === 'employer-branding' && (
                <div className="space-y-3 font-sans">
                  <div className="rounded-xl border border-amber-300/60 bg-gradient-to-r from-amber-50 to-emerald-50 p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                        TOP IT EMPLOYER 2026
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700">45,000+ Impressions</span>
                    </div>
                    <h4 className="mt-2 text-xs font-bold text-[#1E2837]">Homepage Banner &amp; Engineering Profile</h4>
                    <p className="mt-1 text-[11px] text-[#6C757D]">
                      Build maximum credibility when recruiting Senior Engineers, Tech Leads, and Architects.
                    </p>
                  </div>
                </div>
              )}

              {activeTabId === 'ats-integration' && (
                <div className="space-y-2 font-sans">
                  <div className="flex items-center justify-between pb-1 text-xs font-bold text-[#1E2837]">
                    <span>Candidate Pipeline Kanban</span>
                    <span className="text-[#009D46]">Auto Sync via API</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                    <div className="rounded-lg border border-[#E5E7EB] bg-white p-2">Applied (14)</div>
                    <div className="rounded-lg border border-[#D1F2DF] bg-emerald-50 p-2 text-[#009D46]">
                      85%+ Match (8)
                    </div>
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-2 text-blue-700">Interview (4)</div>
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-2 text-amber-700">Offer (2)</div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#E5E7EB] pt-5">
              <span className="text-xs font-semibold text-[#6C757D]">
                End-to-end solutions from job posting and active search to pipeline management.
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenConsultModal}
                  className="cursor-pointer rounded-full border border-[#00B14F] px-4.5 py-2 text-xs font-bold text-[#00B14F] transition-all hover:bg-emerald-50"
                >
                  <Headphones className="mr-1.5 inline-block h-3.5 w-3.5" />
                  <span>Request Consultation</span>
                </button>

                <Link
                  href={ROUTES.RECRUITER_REGISTER}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#009D46] px-5 py-2 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#00873c]"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
