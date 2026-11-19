'use client';

import { ROUTES } from '@/constants/routes';
import { Bell, Bookmark, Calendar, FileCheck2, MapPin, Search, ShieldCheck, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface JobsMegaMenuProps {
  onClose: () => void;
}

const PRIMARY_JOB_LINKS = [
  {
    href: ROUTES.JOBS,
    label: 'Find all IT jobs',
    icon: Search,
  },
  {
    href: ROUTES.JOBS_NEAR_ME,
    label: 'Jobs near me',
    icon: MapPin,
  },
  {
    href: ROUTES.CANDIDATE_JOB_ALERTS,
    label: 'AI job alerts',
    icon: Bell,
  },
  {
    href: ROUTES.CANDIDATE_SAVED_JOBS,
    label: 'Saved jobs',
    icon: Bookmark,
  },
  {
    href: ROUTES.CANDIDATE_APPLIED_JOBS,
    label: 'Applied jobs',
    icon: FileCheck2,
  },
  {
    href: ROUTES.CANDIDATE_INTERVIEWS,
    label: 'Interview schedule',
    icon: Calendar,
  },
  {
    href: ROUTES.CANDIDATE_IDENTITY_VERIFICATION,
    label: 'Identity verification',
    icon: ShieldCheck,
  },
];

const ROLES = [
  { label: 'Backend Engineer', href: '/jobs?keyword=Backend' },
  { label: 'Frontend Developer', href: '/jobs?keyword=Frontend' },
  { label: 'Fullstack Engineer', href: '/jobs?keyword=Fullstack' },
  { label: 'DevOps & Cloud', href: '/jobs?keyword=DevOps' },
  { label: 'AI / ML Engineer', href: '/jobs?keyword=AI' },
  { label: 'Mobile Developer', href: '/jobs?keyword=Mobile' },
  { label: 'QA / QC Tester', href: '/jobs?keyword=QA' },
  { label: 'Data Engineer', href: '/jobs?keyword=Data' },
];

const LOCATIONS = [
  { label: 'Ho Chi Minh City', href: '/jobs?location=hcm' },
  { label: 'Hanoi Tech Hub', href: '/jobs?location=hanoi' },
  { label: 'Da Nang & Central', href: '/jobs?location=danang' },
  { label: 'Remote / Hybrid Work', href: '/jobs?location=remote' },
  { label: 'Top IT Companies', href: '/companies' },
];

const PREMIUM_PROGRAMS = [
  { label: 'High-Salary Roles ($2,000+)', href: '/jobs?keyword=Senior' },
  { label: 'Tech Lead & Architect Jobs', href: '/jobs?keyword=Lead' },
  { label: 'Global Remote Companies', href: '/jobs?location=remote' },
];

export default function JobsMegaMenu({ onClose }: JobsMegaMenuProps) {
  return (
    <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:gap-5 xl:gap-6">
      {/* Column 1: Core Exploration (compact ~230px) */}
      <div className="w-full shrink-0 lg:w-[230px] lg:border-r lg:border-[#E5E7EB] lg:pr-4">
        <span className="mb-2.5 block text-[11px] font-bold tracking-widest text-[#6C757D] uppercase">
          JOB EXPLORATION
        </span>

        <ul className="space-y-0.5">
          {PRIMARY_JOB_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 transition-colors hover:bg-[#F8F9FA]"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#009D46] transition-colors group-hover:bg-emerald-100">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold text-[#1E2837] transition-colors group-hover:text-[#009D46]">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Column 2: Tech Roles (compact ~200px) */}
      <div className="w-full shrink-0 lg:w-[200px] lg:border-r lg:border-[#E5E7EB] lg:pr-4">
        <span className="mb-2.5 block text-[11px] font-bold tracking-widest text-[#6C757D] uppercase">
          JOBS BY TECH STACK
        </span>

        <div className="space-y-0.5">
          {ROLES.map((role) => (
            <Link
              key={role.label}
              href={role.href}
              onClick={onClose}
              className="group flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm font-medium text-[#4A5568] transition-colors hover:bg-[#F8F9FA] hover:text-[#009D46]"
            >
              <span>{role.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Column 3: Hubs & Modes (compact ~210px) */}
      <div className="w-full shrink-0 lg:w-[210px] lg:border-r lg:border-[#E5E7EB] lg:pr-4">
        <span className="mb-2.5 block text-[11px] font-bold tracking-widest text-[#6C757D] uppercase">
          HUBS &amp; MODES
        </span>

        <div className="space-y-0.5">
          {LOCATIONS.map((loc) => (
            <Link
              key={loc.label}
              href={loc.href}
              onClick={onClose}
              className="group flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm font-medium text-[#4A5568] transition-colors hover:bg-[#F8F9FA] hover:text-[#009D46]"
            >
              <span className="truncate">{loc.label}</span>
            </Link>
          ))}
        </div>

        <div className="mt-3 border-t border-[#E5E7EB] pt-2.5">
          <Link
            href={ROUTES.JOBS}
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-bold text-[#009D46] hover:underline"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>View all filters ➔</span>
          </Link>
        </div>
      </div>

      {/* Column 4: Career Advancement & Large Featured Banner (flex-1 to give maximum space to the banner) */}
      <div className="flex w-full min-w-0 flex-1 flex-col justify-between">
        <div>
          <span className="mb-2.5 block text-[11px] font-bold tracking-widest text-[#6C757D] uppercase">
            CAREER ADVANCEMENT
          </span>

          <div className="space-y-0.5">
            {PREMIUM_PROGRAMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="group flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm font-medium text-[#4A5568] transition-colors hover:bg-[#F8F9FA] hover:text-[#009D46]"
              >
                <span>{item.label}</span>
                <span className="text-[#9CA3AF] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[#009D46]">
                  ➔
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Large Banner at the bottom */}
        <div className="mt-3 border-t border-[#E5E7EB] pt-2.5">
          <Link
            href={ROUTES.JOBS}
            onClick={onClose}
            className="group relative block overflow-hidden rounded-xl border border-[#E5E7EB] bg-slate-50 shadow-xs transition-all hover:border-emerald-300 hover:shadow-md"
          >
            <Image
              src="/banner-jobs-fincareer.jpg"
              alt="Đã đến lúc nâng tầm thu nhập - InterVue"
              width={1024}
              height={359}
              className="h-auto w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
