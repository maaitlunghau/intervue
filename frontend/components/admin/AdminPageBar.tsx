'use client';

import { buildAdminBreadcrumb, isRouteAvailable } from '@/lib/admin-nav';
import type { AdminPermission } from '@/types/admin';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminPageBarSlotRef } from './AdminPageBarContext';

interface AdminPageBarProps {
  permissions?: AdminPermission[];
}

export default function AdminPageBar({ permissions }: AdminPageBarProps) {
  const pathname = usePathname();
  const slotRef = useAdminPageBarSlotRef();
  const trail = buildAdminBreadcrumb(pathname, permissions);
  const title = trail.at(-1)?.label ?? 'Admin';

  return (
    <div className="dark:border-forest-800 dark:bg-forest-900 border-outline-variant sticky top-16 z-30 border-b bg-white px-4 py-3 transition-colors sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Page Title */}
        <div className="min-w-0 flex-1">
          <h1 className="text-navy dark:text-forest-50 font-display truncate text-xl font-bold tracking-tight">
            {title}
          </h1>
        </div>

        {/* Right: Breadcrumb Trail & Slot Actions */}
        <div className="flex shrink-0 items-center gap-3">
          <nav aria-label="Breadcrumb" className="text-body-sm flex items-center gap-2 font-medium sm:text-sm">
            {trail.map((entry, index) => {
              const isLast = index === trail.length - 1;

              return (
                <span key={`${entry.label}-${index}`} className="flex items-center gap-2">
                  {index > 0 && <ChevronRight className="text-outline h-3.5 w-3.5 shrink-0" aria-hidden="true" />}

                  {entry.href && !isLast && isRouteAvailable(entry.href) ? (
                    <Link
                      href={entry.href}
                      className="text-on-surface-variant hover:text-navy dark:text-forest-300 dark:hover:text-forest-50 transition-colors hover:underline"
                    >
                      {entry.label}
                    </Link>
                  ) : (
                    <span
                      className={isLast ? 'text-primary font-bold' : 'text-on-surface-variant dark:text-forest-400'}
                    >
                      {entry.label}
                    </span>
                  )}
                </span>
              );
            })}
          </nav>

          <div ref={slotRef} className="flex shrink-0 items-center gap-2 empty:hidden" />
        </div>
      </div>
    </div>
  );
}
