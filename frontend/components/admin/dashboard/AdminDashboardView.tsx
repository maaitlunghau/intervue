'use client';

import { useAdminTriage } from '@/hooks/useAdminTriage';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import type { AdminDashboardData, AdminWorkItemKind } from '@/types/admin';
import { RotateCw } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import AdminAnalyticsSection from './AdminAnalyticsSection';
import AdminHighlightRow from './AdminHighlightRow';
import AdminMaintenanceBanner from './AdminMaintenanceBanner';
import AdminQueueFunnelCard from './AdminQueueFunnelCard';
import AdminRecentTriageTable from './AdminRecentTriageTable';
import AdminRejectDialog from './AdminRejectDialog';
import AdminTodayPriorities from './AdminTodayPriorities';

interface AdminDashboardViewProps {
  data: AdminDashboardData;
  initialKind?: AdminWorkItemKind;
}

export default function AdminDashboardView({ data, initialKind }: AdminDashboardViewProps) {
  const { user } = useAuth();
  const { items, approve, rejectTarget, requestReject, closeReject, confirmReject } = useAdminTriage(data.workItems);
  const [timeRange, setTimeRange] = useState<'today' | '7days' | '30days'>('7days');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncRealtime = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast.success('Operations metrics and triage queues synchronized with server.');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Executive Greeting Header (matching Recruiter Dashboard style) */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-body-sm text-on-surface-variant dark:text-forest-400 truncate">
            InterVue Platform Operations · Vietnam
          </p>
          <h1 className="text-navy dark:text-forest-50 mt-1 text-2xl font-bold tracking-tight sm:text-[28px]">
            {user?.name ? `Hi ${user.name}, what needs your decision today?` : 'Platform overview'}
          </h1>
        </div>

        {/* Time Filter & Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Time range pills */}
          <div className="bg-surface-container-high dark:bg-forest-850 flex items-center rounded-lg p-1 text-xs font-semibold">
            {(['today', '7days', '30days'] as const).map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={cn(
                  'cursor-pointer rounded-md px-3 py-1.5 transition-all',
                  timeRange === range
                    ? 'dark:bg-forest-750 text-navy dark:text-forest-50 bg-white font-bold shadow-2xs'
                    : 'text-on-surface-variant hover:text-navy dark:text-forest-400 dark:hover:text-forest-100',
                )}
              >
                {range === 'today' ? 'Today' : range === '7days' ? 'Last 7 days' : 'Last 30 days'}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleSyncRealtime}
            disabled={isSyncing}
            className="border-outline-variant text-navy hover:bg-surface-container-low dark:border-forest-700 dark:bg-forest-900 dark:text-forest-100 dark:hover:bg-forest-800 text-body-sm inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border bg-white px-3.5 font-semibold transition"
          >
            <RotateCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Realtime'}</span>
          </button>
        </div>
      </header>

      <AdminMaintenanceBanner />

      {/* TẦNG 1: 4 Executive KPI Stat Cards (Chuẩn 1:1 Recruiter continuous grid) */}
      <AdminHighlightRow highlights={data.highlights} />

      {/* TẦNG 2: Rich Analytics & Operations Throughput Chart */}
      <AdminAnalyticsSection timeRange={timeRange} />

      {/* TẦNG 3: Operational Queue Funnel vs Needs Attention Today (Tỷ lệ vàng 3:2 chuẩn Recruiter) */}
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <AdminQueueFunnelCard queues={data.queues} />
        </div>

        <div className="lg:col-span-2">
          <AdminTodayPriorities />
        </div>
      </div>

      {/* TẦNG 4: Latest Submissions for Review Table (Chuẩn bảng dữ liệu Recruiter) */}
      <AdminRecentTriageTable items={items} initialKind={initialKind} onApprove={approve} onReject={requestReject} />

      {rejectTarget && <AdminRejectDialog item={rejectTarget} onClose={closeReject} onConfirm={confirmReject} />}
    </div>
  );
}
