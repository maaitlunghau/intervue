import { Sparkline } from '@/components/ui/Sparkline';
import { HIGHLIGHT_ICON } from '@/constants/admin-work';
import { cn } from '@/lib/utils';
import type { AdminHighlight } from '@/types/admin';

interface AdminHighlightRowProps {
  highlights: AdminHighlight[];
}

const STAT_SPARKLINES: Record<string, number[]> = {
  waiting: [35, 42, 38, 55, 75],
  oldest: [1, 2, 1, 3, 1],
  resolved: [12, 15, 14, 16, 18],
  autoApproved: [78, 80, 82, 85, 86],
};

const STAT_TAGS: Record<string, string> = {
  waiting: 'SLA 2h',
  oldest: 'Priority',
  resolved: 'Staffed',
  autoApproved: 'FPT.AI',
};

const STAT_TRENDS: Record<string, { label: string; isPositive: boolean }> = {
  waiting: { label: '↑ 12% vs yesterday', isPositive: false },
  oldest: { label: 'Within 24h limit', isPositive: true },
  resolved: { label: '↑ 22% vs yesterday', isPositive: true },
  autoApproved: { label: '↑ 4.2% vs last week', isPositive: true },
};

export default function AdminHighlightRow({ highlights }: AdminHighlightRowProps) {
  return (
    <section className="border-outline-variant dark:border-forest-800 dark:bg-forest-800 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-[#e9eaec] lg:grid-cols-4">
      {highlights.map((highlight) => {
        const Icon = HIGHLIGHT_ICON[highlight.key];
        const sparkline = STAT_SPARKLINES[highlight.key] ?? [20, 30, 45, 60, 80];
        const tag = STAT_TAGS[highlight.key];
        const trend = STAT_TRENDS[highlight.key];

        return (
          <div
            key={highlight.key}
            className="dark:bg-forest-900 dark:hover:bg-forest-850/60 flex flex-col justify-between bg-white p-5 transition hover:bg-slate-50/50 sm:p-6"
          >
            <div>
              <div className="text-body-sm flex items-center justify-between font-medium">
                <span className="text-on-surface-variant dark:text-forest-300 flex items-center gap-1.5 font-medium">
                  {Icon && <Icon className="text-outline h-4 w-4" />}
                  {highlight.label}
                </span>
                {tag && (
                  <span className="bg-surface-container-high text-on-surface-variant dark:bg-forest-800 dark:text-forest-200 inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold">
                    {tag}
                  </span>
                )}
              </div>

              <div className="mt-2.5 flex items-end justify-between gap-3">
                <p className="text-navy dark:text-forest-50 text-3xl font-bold tracking-tight tabular-nums">
                  {highlight.value}
                </p>

                <Sparkline values={sparkline} className="h-7 w-16 shrink-0" />
              </div>
            </div>

            <div className="border-outline-variant/60 dark:border-forest-800/80 text-label-sm mt-3 flex items-center justify-between border-t pt-2.5">
              <span className="text-outline truncate">{highlight.caption}</span>
              {trend && (
                <span
                  className={cn(
                    'shrink-0 font-semibold',
                    trend.isPositive ? 'text-primary' : 'text-amber-600 dark:text-amber-400',
                  )}
                >
                  {trend.label}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
