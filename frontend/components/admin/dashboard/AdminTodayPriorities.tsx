'use client';

import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import { BadgeCheck, CheckCircle2, ChevronRight, FileText, Flag, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface PriorityItem {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tone: 'default' | 'warning' | 'urgent' | 'success';
}

const PRIORITIES: PriorityItem[] = [
  {
    id: 'p-ekyc',
    label: '34 candidates waiting on eKYC review',
    description: 'Face match scored in manual-review band (70% - 79%) · Oldest: 2h 15m',
    href: ROUTES.ADMIN_VERIFICATION_IDENTITY,
    icon: BadgeCheck,
    tone: 'warning',
  },
  {
    id: 'p-biz',
    label: '12 companies waiting for business licence',
    description: 'GPKD and authorization letters submitted · Oldest: 5h 10m',
    href: ROUTES.ADMIN_VERIFICATION_BUSINESS,
    icon: ShieldCheck,
    tone: 'default',
  },
  {
    id: 'p-report',
    label: '5 urgent user reports on recruitment scam',
    description: 'Candidates reported illegal deposit requests · Priority #1',
    href: ROUTES.ADMIN_MODERATION_REPORTS,
    icon: Flag,
    tone: 'urgent',
  },
  {
    id: 'p-job',
    label: '8 job posts pending publication review',
    description: 'Tech & Sales positions awaiting keyword compliance',
    href: ROUTES.ADMIN_MODERATION_JOBS,
    icon: FileText,
    tone: 'default',
  },
  {
    id: 'p-health',
    label: 'All core platform services operational',
    description: 'FPT.AI (380ms) · Cloudinary CDN (4.2 TB) · Maintenance Standby (Off)',
    href: ROUTES.ADMIN_PLATFORM_SETTINGS,
    icon: CheckCircle2,
    tone: 'success',
  },
];

export default function AdminTodayPriorities() {
  return (
    <section className="border-outline-variant dark:border-forest-800 dark:bg-forest-900 flex h-full flex-col rounded-xl border bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between">
        <h2 className="text-navy dark:text-forest-50 text-body-lg font-bold">Needs attention today</h2>
        <span className="text-label-sm text-outline">5 items</span>
      </div>

      <ul className="divide-outline-variant/60 dark:divide-forest-800/80 mt-3 flex-1 divide-y">
        {PRIORITIES.map((item) => {
          const Icon = item.icon;
          const isUrgent = item.tone === 'urgent';
          const isWarning = item.tone === 'warning';
          const isSuccess = item.tone === 'success';

          return (
            <li key={item.id}>
              <Link href={item.href} className="group flex items-center gap-3 py-3.5 transition">
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                    isUrgent
                      ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40'
                      : isWarning
                        ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40'
                        : isSuccess
                          ? 'bg-primary-light text-primary dark:bg-forest-850'
                          : 'bg-surface-container-low text-on-surface-variant dark:bg-forest-850 dark:text-forest-300',
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>

                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      'text-body-md truncate font-semibold transition',
                      isUrgent
                        ? 'text-rose-700 dark:text-rose-300'
                        : 'text-navy dark:text-forest-50 group-hover:text-primary',
                    )}
                  >
                    {item.label}
                  </p>
                  <p className="text-label-sm text-on-surface-variant dark:text-forest-400 truncate">
                    {item.description}
                  </p>
                </div>

                <ChevronRight className="text-outline group-hover:text-navy dark:group-hover:text-forest-50 h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
