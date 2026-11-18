'use client';

import { WORK_ITEM_KIND_LABEL } from '@/constants/admin-work';
import { cn } from '@/lib/utils';
import type { AdminWorkItem, AdminWorkItemKind } from '@/types/admin';
import { Inbox } from 'lucide-react';
import { useState } from 'react';
import AdminJobReviewQueue from './AdminJobReviewQueue';
import AdminWorkItemRow from './AdminWorkItemRow';

interface AdminWorklistProps {
  items: AdminWorkItem[];
  initialKind?: AdminWorkItemKind;
  onApprove: (item: AdminWorkItem) => void;
  onReject: (item: AdminWorkItem) => void;
}

export default function AdminWorklist({ items, initialKind, onApprove, onReject }: AdminWorklistProps) {
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
    <div className="bg-surface-container-low dark:bg-forest-850 flex flex-wrap items-center gap-1.5 rounded-xl p-1">
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
      <div className="space-y-3">
        {filterChips}
        <AdminJobReviewQueue />
      </div>
    );
  }

  return (
    <section className="dark:border-forest-800 dark:bg-forest-900 border-outline-variant overflow-hidden rounded-2xl border bg-white shadow-xs">
      <header className="dark:border-forest-800 border-outline-variant flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4">
        <div>
          <h2 className="text-navy dark:text-forest-50 font-display text-base font-bold">
            Rapid Triage Desk (Duyệt nhanh hồ sơ tiếp theo)
          </h2>
          <p className="dark:text-forest-300 text-on-surface-variant mt-0.5 text-xs">
            Xử lý tác vụ trực tiếp mà không cần chuyển trang sâu ({visible.length} hồ sơ hiển thị)
          </p>
        </div>

        {filterChips}
      </header>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
          <Inbox className="text-outline h-7 w-7" />
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
        <ul className="dark:divide-forest-800 divide-y divide-[#f1f5f9]">
          {visible.map((item) => (
            <AdminWorkItemRow
              key={item.id}
              item={item}
              isExpanded={expandedId === item.id}
              onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
              onApprove={() => onApprove(item)}
              onReject={() => onReject(item)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
