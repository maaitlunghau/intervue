import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface AuthLayoutProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  titleClassName?: string;
  children: ReactNode;
}

export function InterVueLogo() {
  return (
    <div className="flex items-center justify-center">
      <Link href={ROUTES.HOME} className="inline-flex items-center">
        <Image
          src="/intervue-logo.png"
          alt="InterVue"
          width={200}
          height={54}
          priority
          className="h-11 w-auto object-contain sm:h-12"
        />
      </Link>
    </div>
  );
}

export default function AuthLayout({ title, subtitle, showLogo = true, titleClassName, children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-x-hidden bg-[#F8F9FA] text-[#1E2837]">
      {/* Pattern at the left (pointing right >) */}
      <div className="pointer-events-none fixed top-1/2 left-0 z-0 hidden -translate-y-1/2 select-none lg:block">
        <Image
          src="/hero-left-pattern.png"
          alt=""
          width={180}
          height={540}
          priority
          className="h-[460px] w-auto object-contain"
        />
      </div>

      {/* Pattern at the right (mirrored: pointing left <) */}
      <div className="pointer-events-none fixed top-1/2 right-0 z-0 hidden -translate-y-1/2 scale-x-[-1] select-none lg:block">
        <Image
          src="/hero-left-pattern.png"
          alt=""
          width={180}
          height={540}
          priority
          className="h-[460px] w-auto object-contain"
        />
      </div>

      {/* Main card */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-4 sm:py-6">
        <div className="w-full max-w-[540px] rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:max-w-[560px] sm:rounded-3xl sm:p-8 sm:py-7">
          <header className={cn('text-center', showLogo ? 'mb-4 sm:mb-5' : 'mb-5 sm:mb-6')}>
            {showLogo && <InterVueLogo />}
            {title && (
              <h1
                className={cn(
                  'font-bold sm:text-[22px]',
                  showLogo ? 'mt-2.5 text-xl text-[#1E2837]' : 'text-2xl text-[#00B14F]',
                  titleClassName,
                )}
              >
                {title}
              </h1>
            )}
            {subtitle && <p className="mt-1 text-xs text-[#6C757D] sm:text-sm">{subtitle}</p>}
          </header>

          {children}
        </div>
      </main>

      {/* Copyright at bottom */}
      <footer className="relative z-10 py-3 text-center text-xs text-[#808894] sm:py-4">
        © 2026. All Rights Reserved. InterVue Vietnam JSC.
      </footer>
    </div>
  );
}
