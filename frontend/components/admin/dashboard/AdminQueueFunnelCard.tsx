'use client';

import { AnimatedNumber } from '@/hooks/useCountUp';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import type { AdminQueueKey, AdminQueueSummary } from '@/types/admin';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface AdminQueueFunnelCardProps {
  queues: AdminQueueSummary[];
}

interface FunnelQueueMeta {
  key: AdminQueueKey;
  label: string;
  defaultCount: number;
  slaRate: number;
  href: string;
  isUrgent?: boolean;
}

const FUNNEL_CONFIG: FunnelQueueMeta[] = [
  {
    key: 'identityVerification',
    label: 'eKYC Biometrics',
    defaultCount: 34,
    slaRate: 96,
    href: ROUTES.ADMIN_VERIFICATION_IDENTITY,
  },
  {
    key: 'businessVerification',
    label: 'Business (GPKD)',
    defaultCount: 12,
    slaRate: 92,
    href: ROUTES.ADMIN_VERIFICATION_BUSINESS,
  },
  {
    key: 'jobPosts',
    label: 'Job Moderation',
    defaultCount: 8,
    slaRate: 98,
    href: ROUTES.ADMIN_MODERATION_JOBS,
  },
  {
    key: 'reports',
    label: 'User Reports',
    defaultCount: 5,
    slaRate: 100,
    isUrgent: true,
    href: ROUTES.ADMIN_MODERATION_REPORTS,
  },
  {
    key: 'supportTickets',
    label: 'Support Tickets',
    defaultCount: 7,
    slaRate: 94,
    href: ROUTES.ADMIN_SUPPORT_TICKETS ?? '#',
  },
];

export default function AdminQueueFunnelCard({ queues }: AdminQueueFunnelCardProps) {
  const queueMap = new Map(queues.map((q) => [q.key, q.count]));
  const stages = FUNNEL_CONFIG.map((cfg) => ({
    ...cfg,
    count: queueMap.get(cfg.key) ?? cfg.defaultCount,
  }));
  const maxCount = Math.max(...stages.map((s) => s.count), 1);

  return (
    <section className="border-outline-variant dark:border-forest-800 dark:bg-forest-900 flex h-full flex-col rounded-xl border bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-navy dark:text-forest-50 text-body-lg font-bold">Operational queue funnel</h2>
          <p className="text-body-sm text-on-surface-variant dark:text-forest-400 mt-0.5">
            Active workload distribution across compliance pipelines
          </p>
        </div>

        <Link
          href={ROUTES.ADMIN_DASHBOARD}
          className="text-primary text-body-sm inline-flex shrink-0 items-center gap-1 font-semibold hover:underline"
        >
          View all queues
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <ol className="mt-6 flex flex-1 flex-col justify-between gap-4">
        {stages.map((stage) => {
          return (
            <li key={stage.key} className="grid grid-cols-[130px_1fr_auto] items-center gap-4">
              <Link
                href={stage.href}
                className={cn(
                  'text-body-sm truncate font-medium transition hover:underline',
                  stage.isUrgent
                    ? 'font-semibold text-rose-600 dark:text-rose-400'
                    : 'text-on-surface-variant dark:text-forest-300 hover:text-navy',
                )}
              >
                {stage.label}
              </Link>

              <div className="bg-surface-container-low dark:bg-forest-850 h-2.5 overflow-hidden rounded-full">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-700 ease-out',
                    stage.isUrgent ? 'bg-rose-500' : 'bg-primary',
                  )}
                  style={{ width: `${Math.max((stage.count / maxCount) * 100, 4)}%` }}
                />
              </div>

              <span className="flex w-24 items-baseline justify-end gap-2 tabular-nums">
                <span className="text-navy dark:text-forest-50 text-body-md font-bold">
                  <AnimatedNumber value={stage.count} duration={450} />
                </span>
                <span className="text-label-sm text-outline w-10 text-right">{stage.slaRate}% SLA</span>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="border-outline-variant/60 dark:border-forest-800/80 text-body-sm text-on-surface-variant dark:text-forest-400 mt-5 flex items-center justify-between border-t pt-3">
        <span>
          Overall SLA Compliance: <strong className="text-primary font-bold">96.8%</strong>
        </span>
        <span className="text-outline text-label-sm">Target turnaround: &lt; 2h</span>
      </div>
    </section>
  );
}
