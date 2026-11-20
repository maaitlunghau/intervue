import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import AdminLoginBackground from './AdminLoginBackground';

interface AdminAuthLayoutProps {
  hero?: ReactNode;
  children: ReactNode;
}

export default function AdminAuthLayout({ hero, children }: AdminAuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between overflow-x-hidden bg-[#fafcf9] bg-gradient-to-br from-[#fbfdfa] via-[#f2f8f3] to-[#eaf5ed] text-slate-800 antialiased select-none">
      {/* Background Decorative Layer */}
      <AdminLoginBackground />

      {/* Top Navigation Bar with Official Transparent Logo */}
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-6 sm:px-10 sm:pt-8">
        <Link href="/" aria-label="InterVue Home" className="inline-block transition-transform hover:scale-[1.02]">
          <Image
            src="/intervue-logo-transparent.png"
            alt="InterVue"
            width={220}
            height={60}
            priority
            className="h-11 w-auto object-contain sm:h-12 lg:h-13"
          />
        </Link>
      </header>

      {/* Main Content: Split or Centered */}
      <main className="relative z-10 mx-auto my-auto w-full max-w-7xl px-6 py-8 sm:px-10 sm:py-10">
        {hero ? (
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
            {hero}
            <section className="flex justify-center lg:col-span-5 lg:justify-end">{children}</section>
          </div>
        ) : (
          <section className="mx-auto flex w-full max-w-2xl justify-center">{children}</section>
        )}
      </main>

      {/* Page Footer with Subtle Border */}
      <footer className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 border-t border-slate-200/70 px-6 pt-5 pb-6 text-xs font-medium text-slate-500 sm:flex-row sm:px-10 sm:pb-8">
        <p>© 2026 InterVue Platform Portal. All rights reserved.</p>
        <p>
          Powered by <span className="font-semibold text-slate-700">InterVue Enterprise Security</span>
        </p>
      </footer>
    </div>
  );
}
