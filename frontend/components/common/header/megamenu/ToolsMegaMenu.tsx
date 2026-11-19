'use client';

import { ArrowRight, Code2, Cpu, LucideIcon, Mail, PhoneCall, Rocket, ShieldCheck, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ToolsMegaMenuProps {
  onClose: () => void;
}

interface AssessmentToolItem {
  label: string;
  desc: string;
  href: string;
  icon: LucideIcon;
  iconBg: string;
}

const ASSESSMENT_TOOLS: AssessmentToolItem[] = [
  {
    label: 'AI Technical Question Bank',
    desc: '500+ curated interview questions by level',
    href: '/candidate/mock-interviews',
    icon: Cpu,
    iconBg: 'bg-emerald-50 text-[#009D46]',
  },
  {
    label: 'Career Path Assessment',
    desc: 'Ikigai test & tech domain recommendations',
    href: '/career-orientation',
    icon: Rocket,
    iconBg: 'bg-emerald-50 text-[#009D46]',
  },
  {
    label: 'Verified Developer Badge',
    desc: 'eKYC identity check for priority shortlisting',
    href: '/candidate/identity-verification',
    icon: ShieldCheck,
    iconBg: 'bg-emerald-50 text-[#009D46]',
  },
  {
    label: 'System Design Benchmark',
    desc: 'Architecture scenarios for Senior & Lead',
    href: '/candidate/mock-interviews',
    icon: Code2,
    iconBg: 'bg-emerald-50 text-[#009D46]',
  },
];

const FINANCIAL_TOOLS = [
  {
    label: 'Gross to Net Salary Calculator',
    desc: 'Compliant with 2026 social insurance regulations',
    href: '/blog/che-do-luong-thuong/cach-tinh-luong-gross-sang-net-chuan-quy-dinh-moi-2026',
    img: '/tools/gross-net.png',
  },
  {
    label: 'Personal Income Tax (PIT)',
    desc: 'Progressive tax rate estimation & deductions',
    href: '/blog/che-do-luong-thuong',
    img: '/tools/thu-nhap-ca-nhan.png',
  },
  {
    label: 'Overtime (OT) Pay Calculator',
    desc: 'Overtime, weekend and night shift compensation',
    href: '/blog/che-do-luong-thuong/cach-tinh-tien-lam-them-gio-overtime-ot-chuan-luat',
    img: '/tools/lai-suat-kep.png',
  },
  {
    label: 'Social Insurance & Benefits',
    desc: 'One-time insurance and severance pay guide',
    href: '/blog/che-do-luong-thuong/quy-dinh-bao-hiem-xa-hoi-bhxh-nguoi-lao-dong-can-biet-2026',
    img: '/tools/bao-hiem-xa-hoi-mot-lan.png',
  },
];

export default function ToolsMegaMenu({ onClose }: ToolsMegaMenuProps) {
  return (
    <div className="grid grid-cols-12 gap-6 p-5 sm:p-6 xl:gap-7">
      {/* Column 1: Career Assessment Tools (4 cols) */}
      <div className="col-span-12 sm:col-span-6 lg:col-span-4 lg:border-r lg:border-[#E5E7EB] lg:pr-5">
        <span className="mb-2.5 block text-[11px] font-bold tracking-widest text-[#6C757D] uppercase">
          SKILL &amp; CAREER ASSESSMENT
        </span>

        <ul className="space-y-1">
          {ASSESSMENT_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <li key={tool.label}>
                <Link
                  href={tool.href}
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-[#F8F9FA]"
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${tool.iconBg}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-[#1E2837] transition-colors group-hover:text-[#009D46]">
                      {tool.label}
                    </span>
                    <p className="truncate text-xs text-[#6C757D]">{tool.desc}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-3 border-t border-[#E5E7EB] pt-2.5">
          <Link
            href="/career-orientation"
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-bold text-[#009D46] hover:underline"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Discover your career path ➔</span>
          </Link>
        </div>
      </div>

      {/* Column 2: Financial Calculators (4 cols) */}
      <div className="col-span-12 sm:col-span-6 lg:col-span-4 lg:border-r lg:border-[#E5E7EB] lg:pr-5">
        <span className="mb-2.5 block text-[11px] font-bold tracking-widest text-[#6C757D] uppercase">
          FINANCIAL &amp; SALARY UTILITIES
        </span>

        <ul className="space-y-1">
          {FINANCIAL_TOOLS.map((tool) => (
            <li key={tool.label}>
              <Link
                href={tool.href}
                onClick={onClose}
                className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-[#F8F9FA]"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 p-1 group-hover:bg-emerald-50">
                  <Image src={tool.img} alt={tool.label} width={28} height={28} className="h-6 w-6 object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-[#1E2837] transition-colors group-hover:text-[#009D46]">
                    {tool.label}
                  </span>
                  <p className="truncate text-xs text-[#6C757D]">{tool.desc}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-3 border-t border-[#E5E7EB] pt-2.5">
          <Link
            href="/blog/che-do-luong-thuong"
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-bold text-[#009D46] hover:underline"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>View all compensation guides ➔</span>
          </Link>
        </div>
      </div>

      {/* Column 3: Candidate Support (Clean, simple & friendly without image) */}
      <div className="col-span-12 flex flex-col justify-between lg:col-span-4">
        <div>
          <span className="mb-2.5 block text-[11px] font-bold tracking-widest text-[#6C757D] uppercase">
            CANDIDATE SUPPORT
          </span>

          <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F9FA] p-3.5">
            <h4 className="text-sm font-bold text-[#1E2837]">InterVue Help &amp; Support</h4>
            <p className="mt-1 text-xs leading-relaxed text-[#6C757D]">
              Need assistance with your job applications, CV review scoring, or interview preparation?
            </p>

            <div className="mt-3 space-y-2 border-t border-[#E5E7EB] pt-2.5">
              <a
                href="tel:0812665001"
                className="group flex items-center gap-2.5 text-xs font-semibold text-[#1E2837] transition-colors hover:text-[#009D46]"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#009D46] transition-colors group-hover:bg-emerald-100">
                  <PhoneCall className="h-3.5 w-3.5" />
                </div>
                <div>
                  <span className="block text-[11px] text-[#6C757D]">Hotline Support</span>
                  <span className="text-xs font-bold text-[#1E2837] group-hover:text-[#009D46]">0812.665.001</span>
                </div>
              </a>

              <a
                href="mailto:hotro@intervue.vn"
                className="group flex items-center gap-2.5 text-xs font-semibold text-[#1E2837] transition-colors hover:text-[#009D46]"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <div>
                  <span className="block text-[11px] text-[#6C757D]">Email Support</span>
                  <span className="text-xs font-bold text-[#1E2837] group-hover:text-[#009D46]">hotro@intervue.vn</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-3 border-t border-[#E5E7EB] pt-2.5">
          <a
            href="mailto:hotro@intervue.vn"
            onClick={onClose}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-[#009D46] py-2 text-xs font-bold text-white shadow-2xs transition-colors hover:bg-[#00873c]"
          >
            <span>Send Support Message</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
