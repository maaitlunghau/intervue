'use client';

import {
  hasActiveDescendant,
  isNavItemActive,
  itemPendingCount,
  sectionPendingCount,
  visibleSections,
} from '@/lib/admin-nav';
import { cn } from '@/lib/utils';
import type { AdminNavItem, AdminPermission, AdminQueueCounts } from '@/types/admin';
import { ROUTES } from '@/constants/routes';
import { useUnreadCount } from '@/hooks/useNotifications';
import { ChevronDown, KeyRound, Lock, ShieldAlert, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

interface AdminSidebarProps {
  isCollapsed: boolean;
  queueCounts: AdminQueueCounts;
  twoFactorEnabled: boolean;
  adminName?: string;
  adminEmail?: string;
  permissions?: AdminPermission[];
  onNavigate?: () => void;
  onExpand?: () => void;
  className?: string;
}

export default function AdminSidebar({
  isCollapsed,
  queueCounts,
  twoFactorEnabled,
  adminName,
  adminEmail,
  permissions,
  onNavigate,
  onExpand,
  className,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [toggled, setToggled] = useState<Record<string, boolean>>({});
  const { total: unreadNotificationsCount } = useUnreadCount('admin');

  const sections = useMemo(() => visibleSections(permissions), [permissions]);

  const renderBadge = (count: number, isAction: boolean, isNotification = false) =>
    count > 0 ? (
      <span
        className={cn(
          'text-label-sm shrink-0 rounded-full px-2 py-0.5 font-bold tabular-nums',
          isNotification
            ? 'bg-rose-500 text-white shadow-2xs'
            : isAction
              ? 'dark:bg-forest-800 dark:text-forest-200 bg-surface-container-high text-on-surface-variant'
              : 'dark:bg-forest-850 dark:text-forest-300 bg-surface-container-high text-on-surface-variant',
        )}
      >
        {count > 99 ? '99+' : count}
      </span>
    ) : null;

  const renderItem = (item: AdminNavItem, isAction: boolean, isChild = false) => {
    const Icon = item.icon;
    const isNotification = item.href === ROUTES.ADMIN_NOTIFICATIONS;
    const pending = isNotification ? unreadNotificationsCount : itemPendingCount(item, queueCounts);
    const isActive = isNavItemActive(item.href, pathname);
    const hasChildren = Boolean(item.children?.length) && !item.href;

    if (hasChildren) {
      const isExpanded = toggled[item.label] ?? hasActiveDescendant(item, pathname);

      if (isCollapsed) {
        return (
          <button
            key={item.label}
            type="button"
            onClick={onExpand}
            title={item.label}
            className="dark:text-forest-300 dark:hover:bg-forest-850 text-on-surface-variant hover:bg-surface-container-low flex w-full cursor-pointer items-center justify-center rounded-xl px-2 py-2.5 transition"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full">
              {Icon && <Icon className="h-5 w-5" />}
              {pending > 0 && <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-amber-500" />}
            </span>
          </button>
        );
      }

      return (
        <div key={item.label}>
          <button
            type="button"
            onClick={() => setToggled((prev) => ({ ...prev, [item.label]: !isExpanded }))}
            aria-expanded={isExpanded}
            className="dark:text-forest-200 dark:hover:bg-forest-850 text-body-md text-on-surface-variant hover:bg-surface-container-low flex w-full cursor-pointer items-center justify-between rounded-xl px-2.5 py-2.5 font-medium transition"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="dark:text-forest-300 text-on-surface-variant flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                {Icon && <Icon className="h-4.5 w-4.5" />}
              </span>
              <span className="truncate">{item.label}</span>
            </span>

            <span className="flex shrink-0 items-center gap-1.5">
              {renderBadge(pending, isAction, isNotification)}
              <ChevronDown
                className={cn(
                  'dark:text-forest-400 text-outline h-3.5 w-3.5 transition-transform',
                  isExpanded && 'rotate-180',
                )}
              />
            </span>
          </button>

          {isExpanded && (
            <div className="dark:border-forest-800 border-outline-variant mt-1.5 mb-1 ml-[26px] space-y-1.5 border-l pl-3">
              {item.children?.map((child) => renderItem(child, isAction, true))}
            </div>
          )}
        </div>
      );
    }

    if (isCollapsed) {
      if (item.comingSoon) {
        return (
          <div
            key={item.label}
            title={`${item.label} — coming soon`}
            className="dark:text-forest-400 text-outline flex items-center justify-center rounded-xl px-2 py-2.5"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full">
              {Icon && <Icon className="h-5 w-5" />}
              {pending > 0 && <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-amber-500" />}
            </span>
          </div>
        );
      }

      return (
        <Link
          key={item.label}
          href={item.href ?? '#'}
          onClick={onNavigate}
          title={item.label}
          className={cn(
            'flex items-center justify-center rounded-xl px-2 py-2.5 transition',
            isActive
              ? 'text-primary'
              : 'dark:text-forest-300 dark:hover:bg-forest-850 text-on-surface-variant hover:bg-surface-container-low',
          )}
        >
          <span
            className={cn(
              'relative flex h-9 w-9 items-center justify-center rounded-full',
              isActive && 'bg-primary/10 text-primary',
            )}
          >
            {Icon && <Icon className="h-5 w-5" />}
            {pending > 0 && (
              <span
                className={cn(
                  'dark:ring-forest-900 absolute top-0.5 right-0.5 h-2 w-2 rounded-full ring-2 ring-white',
                  isNotification ? 'bg-primary' : 'bg-amber-500',
                )}
              />
            )}
          </span>
        </Link>
      );
    }

    const rowClass = cn(
      'flex items-center justify-between rounded-xl text-body-md transition',
      isChild ? 'px-3 py-2.5' : 'px-2.5 py-2.5',
    );

    if (item.comingSoon) {
      return (
        <div
          key={item.label}
          title="Not built yet"
          className={cn(rowClass, 'dark:text-forest-400 text-outline cursor-not-allowed font-medium')}
        >
          <span className="flex min-w-0 items-center gap-3">
            {!isChild && (
              <span className="dark:text-forest-400 text-outline flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                {Icon && <Icon className="h-4.5 w-4.5" />}
              </span>
            )}
            <span className="truncate">{item.label}</span>
          </span>

          <span className="flex shrink-0 items-center gap-1.5">
            {renderBadge(pending, isAction, isNotification)}
            {!isChild && (
              <span className="dark:bg-forest-850 dark:text-forest-300 bg-surface-container-high text-label-sm text-on-surface-variant rounded-full px-2 py-0.5 font-semibold">
                Coming soon
              </span>
            )}
          </span>
        </div>
      );
    }

    return (
      <Link
        key={item.label}
        href={item.href ?? '#'}
        onClick={onNavigate}
        className={cn(
          rowClass,
          isActive
            ? 'text-primary font-bold'
            : 'dark:text-forest-200 dark:hover:bg-forest-850 text-on-surface-variant hover:bg-surface-container-low font-medium',
        )}
      >
        <span className="flex min-w-0 items-center gap-3">
          {!isChild && (
            <span
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors',
                isActive ? 'bg-primary/10 text-primary' : 'dark:text-forest-300 text-on-surface-variant',
              )}
            >
              {Icon && <Icon className="h-4.5 w-4.5" />}
            </span>
          )}
          <span className="truncate">{item.label}</span>
        </span>

        {renderBadge(pending, isAction, isNotification)}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        'scrollbar-on-hover dark:bg-forest-900 shrink-0 bg-white',
        isCollapsed ? 'lg:w-20' : 'lg:w-72',
        className,
      )}
    >
      <div className={isCollapsed ? 'flex justify-center p-3' : 'p-3.5 pb-2'}>
        <div
          className={cn(
            !isCollapsed &&
              'dark:border-forest-800 dark:bg-forest-850/60 border-outline-variant/80 bg-surface-container-lowest rounded-xl border p-3 shadow-2xs',
          )}
        >
          <div className={isCollapsed ? '' : 'flex items-center gap-3'}>
            <div className="relative shrink-0">
              <div
                className={cn(
                  'bg-primary-light text-primary-deep dark:bg-forest-800 dark:text-forest-200 border-primary/20 flex shrink-0 items-center justify-center rounded-xl border font-bold',
                  isCollapsed ? 'h-10 w-10 text-base' : 'h-11 w-11 text-base',
                )}
              >
                {adminName?.charAt(0).toUpperCase()}
              </div>
              <span
                className="dark:border-forest-900 bg-primary absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-white"
                title="Active administrator session"
              />
            </div>

            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-navy dark:text-forest-50 text-body-md truncate font-bold">{adminName}</h3>
                </div>
                <p className="text-label-sm text-on-surface-variant dark:text-forest-400 truncate">
                  {adminEmail || 'admin@intervue.com'}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <span className="bg-primary/10 text-primary border-primary/20 inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-semibold">
                    <ShieldCheck className="h-3 w-3" />
                    Super Admin
                  </span>
                  <span className="bg-surface-container-high text-on-surface-variant dark:bg-forest-800 dark:text-forest-300 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium">
                    Full Access
                  </span>
                </div>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <div className="dark:border-forest-800 border-outline-variant/60 mt-3 space-y-2 border-t pt-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant dark:text-forest-400">Security assurance:</span>
                {twoFactorEnabled ? (
                  <span className="text-primary inline-flex items-center gap-1 font-semibold">
                    <Lock className="text-primary h-3 w-3" />
                    2FA Enforced
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-semibold text-rose-600">
                    <ShieldAlert className="h-3 w-3 text-rose-600" />
                    2FA Off
                  </span>
                )}
              </div>

              {twoFactorEnabled ? (
                <div className="flex items-center gap-2 pt-0.5">
                  <Link
                    href={ROUTES.ADMIN_PLATFORM_SETTINGS}
                    onClick={onNavigate}
                    className="border-outline-variant dark:border-forest-750 bg-surface-container-low hover:bg-surface-container-high dark:bg-forest-800 dark:hover:bg-forest-750 text-navy dark:text-forest-100 hover:border-outline text-body-sm flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 font-semibold shadow-2xs transition"
                  >
                    <SlidersHorizontal className="text-primary h-3.5 w-3.5" />
                    <span>Platform Settings</span>
                  </Link>

                  <Link
                    href={ROUTES.ADMIN_ACCOUNT_SECURITY}
                    onClick={onNavigate}
                    title="Account security & 2FA credentials"
                    className="border-outline-variant dark:border-forest-750 bg-surface-container-low hover:bg-surface-container-high dark:bg-forest-800 dark:hover:bg-forest-750 text-on-surface-variant dark:text-forest-200 hover:text-navy hover:border-outline flex items-center justify-center rounded-lg border p-1.5 shadow-2xs transition"
                  >
                    <KeyRound className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                <Link
                  href={ROUTES.ADMIN_ACCOUNT_SECURITY}
                  onClick={onNavigate}
                  className="text-body-sm flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-3 py-1.5 font-semibold text-white shadow-2xs transition hover:bg-amber-600"
                >
                  <ShieldAlert className="h-4 w-4" />
                  <span>Enable 2FA Protection</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {sections.length === 0 && !isCollapsed && (
        <p className="text-body-sm text-outline px-5 py-4">No section matches.</p>
      )}

      {sections.map((section, sectionIndex) => {
        const isAction = section.tone === 'action';
        const sectionTotal = sectionPendingCount(section, queueCounts);

        return (
          <nav key={section.id} aria-label={section.title} className="space-y-0.5 px-2 py-1">
            {sectionIndex > 0 && <div className="dark:border-forest-800 border-outline-variant mx-1 my-2 border-t" />}

            {!isCollapsed && (
              <div className="flex items-center justify-between gap-2 px-2.5 pt-1.5 pb-1">
                <span className="text-label-sm text-outline truncate font-bold tracking-wider uppercase">
                  {section.title}
                </span>

                {isAction && sectionTotal > 0 && (
                  <span className="text-primary bg-primary-light dark:bg-forest-800 border-primary/20 rounded-full border px-2 py-0.5 text-[10px] font-bold tabular-nums">
                    {sectionTotal} pending
                  </span>
                )}
              </div>
            )}

            {section.items.map((item) => renderItem(item, isAction))}
          </nav>
        );
      })}

      {!isCollapsed && (
        <div className="dark:border-forest-800 border-outline-variant text-label-sm mt-4 space-y-1 border-t px-4 pt-4 pb-5">
          {/* TODO: wire to real legal routes once they exist */}
          <a href="#" className="text-primary block hover:underline">
            Privacy policy
          </a>
          <a href="#" className="text-primary block hover:underline">
            Cookie policy
          </a>
          <a href="#" className="text-primary block hover:underline">
            Terms of service
          </a>
          <p className="text-outline pt-2">Version 1.0.0</p>
          <p className="text-outline">© 2024 - 2026 InterVue Vietnam JSC. All rights reserved.</p>
        </div>
      )}
    </aside>
  );
}
