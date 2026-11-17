'use client';

import { ROUTES } from '@/constants/routes';
import { useMaintenanceSettings } from '@/hooks/useMaintenance';
import { ArrowRight, TriangleAlert } from 'lucide-react';
import Link from 'next/link';

function formatElapsed(enabledAt: string): string | null {
  const started = new Date(enabledAt).getTime();
  if (Number.isNaN(started)) return null;
  const minutes = Math.max(0, Math.floor((Date.now() - started) / 60_000));
  const hours = Math.floor(minutes / 60);
  return hours > 0 ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
}

export default function AdminMaintenanceBanner() {
  const { data } = useMaintenanceSettings();

  if (!data?.enabled) return null;

  const elapsed = data.enabledAt ? formatElapsed(data.enabledAt) : null;

  return (
    <section className="flex flex-wrap items-center gap-3.5 rounded-2xl border border-amber-300 bg-amber-50 px-4.5 py-4 dark:border-amber-500/40 dark:bg-amber-500/10">
      <span className="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
        <TriangleAlert className="h-5 w-5" />
      </span>

      <div className="min-w-0 flex-1 basis-80">
        <p className="flex flex-wrap items-center gap-2 text-[15px] font-extrabold text-amber-900 dark:text-amber-200">
          <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-amber-600 dark:bg-amber-400" />
          Maintenance mode is ON
          {elapsed && (
            <span className="text-label-sm rounded-full bg-amber-100 px-2.5 py-0.5 font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
              {elapsed}
            </span>
          )}
        </p>
        <p className="text-body-sm mt-1 leading-relaxed text-amber-800 dark:text-amber-300/90">
          Candidates and recruiters cannot reach any page right now. Remember to switch this off once the upgrade is
          finished.
        </p>
      </div>

      <Link
        href={ROUTES.ADMIN_PLATFORM_SETTINGS}
        className="text-body-sm inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-700 px-4.5 py-2.5 font-bold text-white transition-colors hover:bg-amber-800"
      >
        <span>Turn it off</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </section>
  );
}
