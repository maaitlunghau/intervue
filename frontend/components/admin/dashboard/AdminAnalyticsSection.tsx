'use client';

import { AnimatedNumber } from '@/hooks/useCountUp';
import { BarChart3, TrendingUp, Users, Building2, FileCheck2, ShieldCheck } from 'lucide-react';

interface AdminAnalyticsSectionProps {
  timeRange: 'today' | '7days' | '30days';
}

interface DailyThroughput {
  day: string;
  received: number;
  resolved: number;
}

const THROUGHPUT_DATA: Record<'today' | '7days' | '30days', DailyThroughput[]> = {
  today: [
    { day: '08:00', received: 4, resolved: 3 },
    { day: '10:00', received: 12, resolved: 10 },
    { day: '12:00', received: 8, resolved: 7 },
    { day: '14:00', received: 15, resolved: 14 },
    { day: '16:00', received: 11, resolved: 12 },
    { day: '18:00', received: 9, resolved: 8 },
  ],
  '7days': [
    { day: 'Mon', received: 22, resolved: 20 },
    { day: 'Tue', received: 28, resolved: 26 },
    { day: 'Wed', received: 35, resolved: 32 },
    { day: 'Thu', received: 30, resolved: 28 },
    { day: 'Fri', received: 42, resolved: 38 },
    { day: 'Sat', received: 18, resolved: 16 },
    { day: 'Sun', received: 14, resolved: 15 },
  ],
  '30days': [
    { day: 'Week 1', received: 140, resolved: 132 },
    { day: 'Week 2', received: 165, resolved: 158 },
    { day: 'Week 3', received: 180, resolved: 172 },
    { day: 'Week 4', received: 195, resolved: 189 },
  ],
};

export default function AdminAnalyticsSection({ timeRange }: AdminAnalyticsSectionProps) {
  const chartData = THROUGHPUT_DATA[timeRange];
  const maxVal = Math.max(...chartData.flatMap((d) => [d.received, d.resolved]), 1);

  const totalReceived = chartData.reduce((s, d) => s + d.received, 0);
  const totalResolved = chartData.reduce((s, d) => s + d.resolved, 0);

  return (
    <section className="border-outline-variant dark:border-forest-800 dark:bg-forest-900 grid grid-cols-1 items-stretch gap-6 rounded-xl border bg-white p-6 shadow-xs lg:grid-cols-5">
      {/* Left: Interactive Operations Throughput Chart (3 cols / 60%) */}
      <div className="flex flex-col justify-between lg:col-span-3">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="text-primary h-4.5 w-4.5" />
                <h2 className="text-navy dark:text-forest-50 text-body-lg font-bold">
                  Operations & compliance throughput
                </h2>
              </div>
              <p className="text-body-sm text-on-surface-variant dark:text-forest-400 mt-0.5">
                Comparison of incoming queue items vs resolved decisions
              </p>
            </div>

            {/* Legend */}
            <div className="text-label-sm flex items-center gap-3 font-semibold">
              <span className="text-navy dark:text-forest-100 flex items-center gap-1.5">
                <span className="bg-primary h-2.5 w-2.5 rounded-sm" />
                Resolved (<AnimatedNumber value={totalResolved} duration={400} />)
              </span>
              <span className="text-on-surface-variant dark:text-forest-400 flex items-center gap-1.5">
                <span className="dark:bg-forest-700 h-2.5 w-2.5 rounded-sm bg-slate-300" />
                Received (<AnimatedNumber value={totalReceived} duration={400} />)
              </span>
            </div>
          </div>

          {/* Bar Chart Bars */}
          <div className="mt-6 flex h-44 items-end gap-3 pt-4 sm:gap-6">
            {chartData.map((d) => {
              const resHeight = Math.max((d.resolved / maxVal) * 100, 6);
              const recHeight = Math.max((d.received / maxVal) * 100, 6);

              return (
                <div key={d.day} className="group relative flex flex-1 flex-col items-center gap-1.5">
                  <div className="flex h-36 w-full items-end justify-center gap-1 sm:gap-1.5">
                    {/* Received Bar */}
                    <div
                      style={{ height: `${recHeight}%` }}
                      className="dark:bg-forest-750 w-full max-w-3.5 origin-bottom rounded-t bg-slate-200 transition-all duration-500 ease-out group-hover:bg-slate-300"
                      title={`Received: ${d.received}`}
                    />
                    {/* Resolved Bar */}
                    <div
                      style={{ height: `${resHeight}%` }}
                      className="bg-primary hover:bg-primary-hover w-full max-w-3.5 origin-bottom rounded-t transition-all duration-500 ease-out"
                      title={`Resolved: ${d.resolved}`}
                    />
                  </div>
                  <span className="text-label-sm text-outline group-hover:text-navy dark:group-hover:text-forest-100 font-medium">
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-outline-variant/60 dark:border-forest-800/80 text-body-sm text-on-surface-variant dark:text-forest-400 mt-4 flex flex-wrap items-center justify-between gap-2 border-t pt-3">
          <span className="text-primary flex items-center gap-1.5 font-semibold">
            <TrendingUp className="h-4 w-4" />
            Resolution velocity: +18.4% vs previous period
          </span>
          <span className="text-outline text-label-sm">Average turnaround: 1.4 hours</span>
        </div>
      </div>

      {/* Right: Ecosystem Scale & Health Metrics (2 cols / 40%) */}
      <div className="border-outline-variant dark:border-forest-800 flex flex-col justify-between border-t pt-5 lg:col-span-2 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
        <div>
          <h3 className="text-navy dark:text-forest-50 text-body-md font-bold">Platform scale & health</h3>
          <p className="text-body-sm text-on-surface-variant dark:text-forest-400 mt-0.5">
            Key operational metrics across the InterVue network
          </p>

          <div className="mt-4 space-y-3.5">
            <div className="bg-surface-container-low/60 dark:bg-forest-850/60 border-outline-variant/60 dark:border-forest-800 flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2.5">
                <span className="bg-primary-light text-primary flex h-8 w-8 items-center justify-center rounded-lg">
                  <Users className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-label-sm text-on-surface-variant dark:text-forest-400 font-medium">
                    Registered accounts
                  </p>
                  <p className="text-navy dark:text-forest-50 text-body-md font-bold tabular-nums">
                    <AnimatedNumber value={28450} duration={500} />
                  </p>
                </div>
              </div>
              <span className="text-label-sm text-primary font-semibold">↑ 340 new</span>
            </div>

            <div className="bg-surface-container-low/60 dark:bg-forest-850/60 border-outline-variant/60 dark:border-forest-800 flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40">
                  <Building2 className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-label-sm text-on-surface-variant dark:text-forest-400 font-medium">
                    Verified enterprises
                  </p>
                  <p className="text-navy dark:text-forest-50 text-body-md font-bold tabular-nums">
                    <AnimatedNumber value={1120} duration={500} /> (88.4%)
                  </p>
                </div>
              </div>
              <span className="text-label-sm text-primary font-semibold">↑ 24 verified</span>
            </div>

            <div className="bg-surface-container-low/60 dark:bg-forest-850/60 border-outline-variant/60 dark:border-forest-800 flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40">
                  <FileCheck2 className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-label-sm text-on-surface-variant dark:text-forest-400 font-medium">
                    Monthly CV flow
                  </p>
                  <p className="text-navy dark:text-forest-50 text-body-md font-bold tabular-nums">
                    <AnimatedNumber value={8940} duration={500} /> CVs
                  </p>
                </div>
              </div>
              <span className="text-label-sm text-primary font-semibold">↑ 14.2% MoM</span>
            </div>

            <div className="bg-surface-container-low/60 dark:bg-forest-850/60 border-outline-variant/60 dark:border-forest-800 flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/40">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-label-sm text-on-surface-variant dark:text-forest-400 font-medium">
                    Platform fraud rate
                  </p>
                  <p className="text-navy dark:text-forest-50 text-body-md font-bold tabular-nums">
                    <AnimatedNumber value={0.12} decimals={2} duration={500} />%
                  </p>
                </div>
              </div>
              <span className="text-label-sm text-primary font-semibold">Healthy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
