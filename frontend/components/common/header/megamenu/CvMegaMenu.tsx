'use client';

import { ROUTES } from '@/constants/routes';
import {
  BookOpen,
  Briefcase,
  Code2,
  Cpu,
  FileText,
  FolderOpen,
  GraduationCap,
  LucideIcon,
  MessageSquareCode,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CvMegaMenuProps {
  onClose: () => void;
}

interface TemplateItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const TEMPLATES: TemplateItem[] = [
  {
    label: 'Simple & Clean CV',
    href: '/cv-templates/mau-don-gian',
    icon: FileText,
  },
  {
    label: 'Professional Senior CV',
    href: '/cv-templates/mau-chuyen-nghiep',
    icon: Briefcase,
  },
  {
    label: 'Harvard Tech Format',
    href: '/cv-templates/all',
    icon: GraduationCap,
  },
  {
    label: 'Modern Tech Portfolio',
    href: '/cv-templates/all',
    icon: Code2,
  },
];

interface AiToolItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const AI_TOOLS: AiToolItem[] = [
  {
    href: '/cv-review',
    label: 'AI CV Scoring & Review',
    icon: Cpu,
  },
  {
    href: ROUTES.CANDIDATE_MOCK_INTERVIEWS,
    label: 'AI Mock Interview',
    icon: MessageSquareCode,
  },
  {
    href: ROUTES.CANDIDATE_CVS,
    label: 'Manage My CVs',
    icon: FolderOpen,
  },
  {
    href: ROUTES.CANDIDATE_PROFILE,
    label: 'Candidate Profile',
    icon: UserCheck,
  },
  {
    href: '/blog/bi-kip-tim-viec/bi-quyet-viet-cv-chuan-ats-chinh-phuc-nha-tuyen-dung-2026',
    label: 'IT CV Writing Handbook',
    icon: BookOpen,
  },
];

export default function CvMegaMenu({ onClose }: CvMegaMenuProps) {
  return (
    <div className="grid grid-cols-12 gap-5 p-5 sm:p-6 xl:gap-6">
      {/* Column 1: CV Templates (4 cols) */}
      <div className="col-span-12 sm:col-span-6 lg:col-span-4 lg:border-r lg:border-[#E5E7EB] lg:pr-5">
        <span className="mb-2.5 block text-[11px] font-bold tracking-widest text-[#6C757D] uppercase">
          CV TEMPLATES BY STYLE
        </span>

        <ul className="space-y-0.5">
          {TEMPLATES.map((tpl) => {
            const Icon = tpl.icon;
            return (
              <li key={tpl.label}>
                <Link
                  href={tpl.href}
                  onClick={onClose}
                  className="group flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 transition-colors hover:bg-[#F8F9FA]"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#009D46] transition-colors group-hover:bg-emerald-100">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold text-[#1E2837] transition-colors group-hover:text-[#009D46]">
                    {tpl.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-3 border-t border-[#E5E7EB] pt-2.5">
          <Link
            href="/cv-templates"
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-bold text-[#009D46] hover:underline"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Browse all 20+ templates ➔</span>
          </Link>
        </div>
      </div>

      {/* Column 2: AI CV & Interview Suite (4 cols) */}
      <div className="col-span-12 sm:col-span-6 lg:col-span-4 lg:border-r lg:border-[#E5E7EB] lg:pr-5">
        <span className="mb-2.5 block text-[11px] font-bold tracking-widest text-[#6C757D] uppercase">
          AI CV &amp; INTERVIEW SUITE
        </span>

        <ul className="space-y-0.5">
          {AI_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <li key={tool.label}>
                <Link
                  href={tool.href}
                  onClick={onClose}
                  className="group flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 transition-colors hover:bg-[#F8F9FA]"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#009D46] transition-colors group-hover:bg-emerald-100">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold text-[#1E2837] transition-colors group-hover:text-[#009D46]">
                    {tool.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Column 3: Featured Card (4 cols - clean layout with cv-builder-desktop.png) */}
      <div className="col-span-12 flex flex-col justify-between lg:col-span-4">
        <Link href="/cv-review" onClick={onClose} className="group block">
          <div className="flex h-36 w-full items-center justify-center rounded-xl border border-[#E5E7EB] bg-gradient-to-b from-[#F0FDF4]/60 to-[#F8F9FA] p-3">
            <Image
              src="/cv-builder-desktop.png"
              alt="AI CV Builder & Review"
              width={438}
              height={648}
              className="h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="mt-3 space-y-1">
            <h4 className="text-[13.5px] font-bold text-[#1E2837] transition-colors group-hover:text-[#009D46]">
              Instant AI CV Review
            </h4>
            <p className="text-xs leading-relaxed text-[#6C757D]">
              Benchmark your CV against real Tech Lead standards: framework compatibility, STAR formatting, and ATS
              scoring.
            </p>
            <span className="inline-flex items-center gap-1 pt-1 text-xs font-bold text-[#009D46] group-hover:underline">
              Score My CV Now ➔
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
