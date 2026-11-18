'use client';

import NotificationDropdown from '@/components/common/NotificationDropdown';
import { ROUTES } from '@/constants/routes';
import { useAdminTheme } from '@/hooks/useAdminTheme';
import { useAuth } from '@/hooks/useAuth';
import { useUnreadCount } from '@/hooks/useNotifications';
import type { AdminQueueCounts } from '@/types/admin';
import { Bell, ChevronDown, Menu, Moon, Search, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import AdminUserMenuDropdown from './AdminUserMenuDropdown';

interface AdminTopBarProps {
  queueCounts?: AdminQueueCounts;
  onToggleSidebar: () => void;
  onOpenMobileNav: () => void;
  onOpenPalette?: () => void;
}

const ICON_BUTTON_CLASS =
  'text-on-surface-variant dark:text-forest-300 hover:text-navy dark:hover:text-forest-50 hover:bg-surface-container-low dark:hover:bg-forest-800 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl transition-colors';

export default function AdminTopBar({ onToggleSidebar, onOpenMobileNav, onOpenPalette }: AdminTopBarProps) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useAdminTheme();
  const { total: unreadNotifications } = useUnreadCount('admin');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="dark:bg-forest-900 border-outline-variant dark:border-forest-800 sticky top-0 z-40 w-full border-b bg-white shadow-2xs transition-colors">
      <div className="flex h-16 w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onOpenMobileNav}
            aria-label="Open the menu"
            className={`${ICON_BUTTON_CLASS} lg:hidden`}
          >
            <Menu className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Toggle the menu"
            title="Toggle the menu"
            className={`${ICON_BUTTON_CLASS} hidden lg:flex`}
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link
            href={ROUTES.ADMIN_DASHBOARD}
            className="flex shrink-0 items-center gap-2.5"
            aria-label="InterVue Admin"
          >
            <Image
              src="/intervue-logo.png"
              alt="InterVue"
              width={176}
              height={48}
              priority
              className="h-10 w-auto object-contain dark:hidden"
            />
            <Image
              src="/intervue-logo-white.png"
              alt="InterVue"
              width={1588}
              height={324}
              priority
              className="hidden h-6.5 w-auto object-contain dark:block"
            />
          </Link>
        </div>

        {/* Command Palette Quick Search Bar */}
        <div className="mx-4 hidden max-w-md flex-1 md:flex">
          <button
            type="button"
            onClick={onOpenPalette}
            className="bg-surface-container-low dark:bg-forest-850 hover:bg-surface-container-high dark:hover:bg-forest-800 text-body-sm text-outline border-outline-variant dark:border-forest-700 flex w-full cursor-pointer items-center justify-between rounded-xl border py-1.5 pr-2.5 pl-3 transition"
          >
            <span className="flex items-center gap-2">
              <span className="text-outline">
                <Search className="h-4 w-4" />
              </span>
              <span className="text-on-surface-variant dark:text-forest-300 text-xs">
                Search records or press ⌘K...
              </span>
            </span>
            <kbd className="text-outline dark:bg-forest-900 border-outline-variant dark:border-forest-700 rounded border bg-white px-1.5 py-0.5 text-[10px] font-semibold shadow-2xs">
              ⌘K
            </kbd>
          </button>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2.5 sm:gap-3.5">
          <div className="bg-outline-variant dark:bg-forest-800 hidden h-5 w-px sm:block"></div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className={ICON_BUTTON_CLASS}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsNotificationOpen((prev) => !prev);
                setIsMenuOpen(false);
              }}
              title="Notifications"
              aria-label="Notifications"
              className={`relative ${ICON_BUTTON_CLASS}`}
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="dark:ring-forest-900 text-label-sm absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 font-bold text-white ring-2 ring-white">
                  {unreadNotifications > 99 ? '99+' : unreadNotifications}
                </span>
              )}
            </button>

            <NotificationDropdown
              realm="admin"
              baseRoute={ROUTES.ADMIN_NOTIFICATIONS}
              isOpen={isNotificationOpen}
              onClose={() => setIsNotificationOpen(false)}
            />
          </div>

          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Account menu"
              className="flex cursor-pointer items-center rounded-full p-0.5 transition hover:scale-105 active:scale-95"
            >
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-emerald-500 via-emerald-600 to-teal-600 text-sm font-bold text-white shadow-xs ring-2 ring-emerald-400/30">
                {user?.name.charAt(0).toUpperCase()}
                <span className="absolute -right-0.5 -bottom-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white ring-1 ring-emerald-200">
                  <ChevronDown className="h-2 w-2 stroke-[2.5] text-emerald-700" />
                </span>
              </span>
            </button>

            {isMenuOpen && <AdminUserMenuDropdown onClose={() => setIsMenuOpen(false)} />}
          </div>
        </div>
      </div>
    </header>
  );
}
