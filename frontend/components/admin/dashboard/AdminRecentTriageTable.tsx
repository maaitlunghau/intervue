'use client';

import { WORK_ITEM_KIND_CHIP, WORK_ITEM_KIND_LABEL } from '@/constants/admin-work';
import { cn } from '@/lib/utils';
import type { AdminWorkItem, AdminWorkItemKind } from '@/types/admin';
import { Check, ChevronDown, Clock, Inbox, X } from 'lucide-react';
import { useState } from 'react';
import AdminJobReviewQueue from './AdminJobReviewQueue';

interface AdminRecentTriageTableProps {
  items: AdminWorkItem[];
  initialKind?: AdminWorkItemKind;
  onApprove: (item: AdminWorkItem) => void;
  onReject: (item: AdminWorkItem) => void;
}

export default function AdminRecentTriageTable({
  items,
  initialKind,
  onApprove,
  onReject,
}: AdminRecentTriageTableProps) {
  const [kindFilter, setKindFilter] = useState<AdminWorkItemKind | 'all'>(initialKind ?? 'all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const kinds = Array.from(new Set<AdminWorkItemKind>([...items.map((item) => item.kind), 'jobPost']));
  const visible = kindFilter === 'all' ? items : items.filter((item) => item.kind === kindFilter);

  const chipClass = (isActive: boolean) =>
    cn(
      'cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
      isActive
        ? 'bg-primary text-white shadow-2xs'
        : 'text-on-surface-variant hover:bg-surface-container-high dark:text-forest-300 dark:hover:bg-forest-800',
    );

  const filterChips = (
    <div className="bg-surface-container-low dark:bg-forest-850 flex flex-wrap items-center gap-1.5 rounded-lg p-1">
      <button type="button" onClick={() => setKindFilter('all')} className={chipClass(kindFilter === 'all')}>
        All ({items.length})
      </button>

      {kinds.map((kind) => {
        const count = items.filter((item) => item.kind === kind).length;
        return (
          <button
            key={kind}
            type="button"
            onClick={() => setKindFilter(kind)}
            className={chipClass(kindFilter === kind)}
          >
            {WORK_ITEM_KIND_LABEL[kind]} {count > 0 && `(${count})`}
          </button>
        );
      })}
    </div>
  );

  if (kindFilter === 'jobPost') {
    return (
      <div className="space-y-4">
        {filterChips}
        <AdminJobReviewQueue />
      </div>
    );
  }

  return (
    <section className="border-outline-variant dark:border-forest-800 dark:bg-forest-900 rounded-xl border bg-white p-6 shadow-xs">
      <div className="border-outline-variant/60 dark:border-forest-800/80 flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-navy dark:text-forest-50 text-body-lg font-bold">Latest submissions for review</h2>
          <p className="text-body-sm text-on-surface-variant dark:text-forest-400 mt-0.5">
            Operational triage desk with inline 1-click decision capability
          </p>
        </div>

        {filterChips}
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
          <Inbox className="text-outline h-8 w-8" />
          <p className="text-navy dark:text-forest-50 text-body-md font-bold">
            {items.length === 0 ? 'Everything here is handled' : 'Nothing left in this filter'}
          </p>
          <p className="text-body-sm text-outline">
            {items.length === 0
              ? 'New submissions will appear here as they arrive.'
              : 'Switch back to All to see the rest of the queue.'}
          </p>
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <div className="min-w-180">
            {/* Table Header */}
            <div className="border-outline-variant dark:border-forest-800 text-label-sm text-outline grid grid-cols-[2fr_1.2fr_3fr_1.5fr_auto] items-center gap-4 border-b px-3 pb-3 font-semibold tracking-wide uppercase">
              <span>Candidate / Entity</span>
              <span>Queue Type</span>
              <span>Compliance Context</span>
              <span>Waiting / SLA</span>
              <span className="text-right">Decision</span>
            </div>

            {/* Table Rows */}
            <div className="dark:divide-forest-800/60 divide-y divide-[#f1f5f9]">
              {visible.map((item) => {
                const isExpanded = expandedId === item.id;

                return (
                  <div key={item.id} className="transition-colors">
                    <div
                      className={cn(
                        'hover:bg-surface-container-low/60 dark:hover:bg-forest-850/60 grid grid-cols-[2fr_1.2fr_3fr_1.5fr_auto] items-center gap-4 rounded-lg px-3 py-3.5 transition',
                        isExpanded && 'bg-surface-container-low/40 dark:bg-forest-850/40',
                      )}
                    >
                      {/* Entity */}
                      <div className="min-w-0">
                        <p className="text-navy dark:text-forest-50 text-body-md truncate font-bold">{item.subject}</p>
                        <p className="text-label-sm text-outline truncate">{item.submittedAt}</p>
                      </div>

                      {/* Queue Type Chip */}
                      <div>
                        <span
                          className={cn(
                            'text-label-sm inline-flex items-center rounded-md px-2 py-0.5 font-bold tracking-wide uppercase ring-1 ring-inset',
                            WORK_ITEM_KIND_CHIP[item.kind],
                          )}
                        >
                          {WORK_ITEM_KIND_LABEL[item.kind]}
                        </span>
                      </div>

                      {/* Trigger Context */}
                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={() => setExpandedId(isExpanded ? null : item.id)}
                          className="text-body-sm text-on-surface-variant dark:text-forest-300 hover:text-navy dark:hover:text-forest-50 group flex cursor-pointer items-center gap-1.5 text-left"
                        >
                          <span className="truncate">{item.context}</span>
                          <ChevronDown
                            className={cn(
                              'text-outline h-3.5 w-3.5 shrink-0 transition-transform',
                              isExpanded && 'rotate-180',
                            )}
                          />
                        </button>
                      </div>

                      {/* Waiting / SLA */}
                      <div className="text-label-sm text-outline flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{item.waitingLabel} ago</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onApprove(item)}
                          title="Quick Approve"
                          className="bg-primary hover:bg-primary-hover flex h-8 cursor-pointer items-center gap-1 rounded-lg px-2.5 text-xs font-semibold text-white shadow-2xs transition"
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>Approve</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onReject(item)}
                          title="Reject with reason"
                          className="flex h-8 cursor-pointer items-center gap-1 rounded-lg border border-rose-200 px-2.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 dark:border-rose-800 dark:hover:bg-rose-950/40"
                        >
                          <X className="h-3.5 w-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>

                    {/* Inline Expanded Facts Drawer */}
                    {isExpanded && item.facts.length > 0 && (
                      <div className="bg-surface-container-low/50 dark:bg-forest-850/50 border-outline-variant/60 dark:border-forest-800 mx-3 mt-1 mb-3 rounded-lg border p-3">
                        <p className="text-label-sm text-outline mb-2 font-bold tracking-wider uppercase">
                          Inspection facts:
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-3 lg:grid-cols-5">
                          {item.facts.map((fact) => (
                            <div
                              key={fact.label}
                              className="dark:bg-forest-900 border-outline-variant/60 dark:border-forest-800 rounded border bg-white p-2"
                            >
                              <span className="text-outline block text-[10px] font-medium">{fact.label}</span>
                              <strong className="text-navy dark:text-forest-100 mt-0.5 block truncate font-bold">
                                {fact.value}
                              </strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
