'use client';

import HeaderAccountActions from '@/components/common/header/HeaderAccountActions';
import MobileNavDrawer from '@/components/common/header/MobileNavDrawer';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Briefcase, Check, ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface RecruiterHeaderProps {
  onOpenConsultModal?: () => void;
}

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
];

export default function RecruiterHeader({ onOpenConsultModal }: RecruiterHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'vi' | 'en'>('en');
  const { user, status } = useAuth();
  const isSignedIn = status === 'authenticated' && Boolean(user);

  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) ?? LANGUAGES[0];

  return (
    <header className="pointer-events-none sticky top-0 z-50 w-full px-4 pt-3.5 pb-2 sm:px-6">
      {/* Floating Centered Pill / Capsule Navbar */}
      <div className="pointer-events-auto mx-auto flex h-[64px] w-full max-w-[1280px] items-center justify-between rounded-full border border-[#E5E7EB] bg-white px-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] sm:px-6">
        {/* Left: InterVue Brand Logo & Navigation Links */}
        <div className="flex items-center gap-4 xl:gap-8">
          <Link href={ROUTES.RECRUITER_LANDING} className="flex shrink-0 items-center">
            <Image
              src="/intervue-logo.png"
              alt="InterVue"
              width={140}
              height={36}
              priority
              className="h-8 w-auto object-contain sm:h-9"
            />
          </Link>

          {/* Desktop Navigation Links - Single line guaranteed */}
          <nav aria-label="Recruiter navigation" className="hidden items-center gap-1 lg:flex xl:gap-1.5">
            <Link
              href="#recruiter-hero"
              className="rounded-full px-3 py-2 text-[14px] font-medium whitespace-nowrap text-[#263A4D] transition-colors hover:text-[#00B14F]"
            >
              Solutions
            </Link>
            <Link
              href="#pricing"
              className="rounded-full px-3 py-2 text-[14px] font-medium whitespace-nowrap text-[#263A4D] transition-colors hover:text-[#00B14F]"
            >
              Pricing
            </Link>
            <button
              type="button"
              onClick={onOpenConsultModal}
              className="cursor-pointer rounded-full px-3 py-2 text-[14px] font-medium whitespace-nowrap text-[#263A4D] transition-colors hover:text-[#00B14F]"
            >
              Contact
            </button>
            <Link
              href="/faq"
              className="rounded-full px-3 py-2 text-[14px] font-medium whitespace-nowrap text-[#263A4D] transition-colors hover:text-[#00B14F]"
            >
              Support
            </Link>
            <Link
              href="/blog"
              className="rounded-full px-3 py-2 text-[14px] font-medium whitespace-nowrap text-[#263A4D] transition-colors hover:text-[#00B14F]"
            >
              Blog
            </Link>
          </nav>
        </div>

        {/* Right: Language Selector, Switch to Job Seeker & Auth Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Selector Dropdown */}
          <div className="relative" ref={langMenuRef}>
            <button
              type="button"
              onClick={() => setLangMenuOpen((prev) => !prev)}
              aria-label="Select language"
              aria-expanded={langMenuOpen}
              className="flex h-9.5 cursor-pointer items-center gap-1.5 rounded-full border border-[#D0D5DD] bg-[#F9FAFB] px-3 text-xs font-semibold whitespace-nowrap text-[#344054] shadow-2xs transition-colors hover:border-[#00B14F] hover:bg-white sm:h-10 sm:px-3.5 sm:text-sm"
            >
              <span className="text-base leading-none sm:text-lg">{activeLangObj.flag}</span>
              <ChevronDown
                className={cn('h-3.5 w-3.5 text-slate-500 transition-transform', langMenuOpen && 'rotate-180')}
              />
            </button>

            {langMenuOpen && (
              <div className="border-outline-variant absolute right-0 mt-2 w-40 overflow-hidden rounded-2xl border bg-white p-1.5 shadow-lg">
                {LANGUAGES.map((lang) => {
                  const isSelected = currentLang === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setCurrentLang(lang.code as 'vi' | 'en');
                        setLangMenuOpen(false);
                      }}
                      className={cn(
                        'flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                        isSelected
                          ? 'bg-primary-container text-primary font-bold'
                          : 'text-navy hover:bg-surface-container-low',
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-lg leading-none">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                      {isSelected && <Check className="text-primary h-4 w-4" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Switch to Candidate Portal Button */}
          <Link
            href={ROUTES.HOME}
            className="hidden h-9.5 items-center gap-1.5 rounded-full bg-[#F2F4F7] px-3.5 text-[13px] font-semibold whitespace-nowrap text-[#344054] shadow-2xs transition-colors hover:bg-[#E4E7EC] sm:inline-flex sm:h-10 sm:px-4 sm:text-[14px]"
          >
            <Briefcase className="h-3.5 w-3.5 text-[#475467] sm:h-4 sm:w-4" />
            <span>For Job Seekers</span>
          </Link>

          {/* Auth Actions: Guest vs Signed-in */}
          {isSignedIn ? (
            <HeaderAccountActions portal="recruiter" />
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href={ROUTES.RECRUITER_LOGIN}
                className="hidden h-9.5 items-center rounded-full border border-gray-200 bg-white px-4 text-[13px] font-semibold whitespace-nowrap text-[#00B14F] shadow-2xs transition-all hover:border-[#00B14F] hover:bg-emerald-50/50 sm:inline-flex sm:h-10 sm:px-4.5 sm:text-[14px]"
              >
                Sign In
              </Link>
              <Link
                href={ROUTES.RECRUITER_REGISTER}
                className="inline-flex h-9.5 items-center gap-1 rounded-full bg-[#00B14F] px-4 text-[13px] font-bold whitespace-nowrap text-white shadow-2xs transition-all hover:bg-[#009643] sm:h-10 sm:px-4.5 sm:text-[14px]"
              >
                <span>Sign Up</span>
                <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </div>
          )}

          {/* Mobile Navigation Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="text-navy hover:bg-surface-container-low flex h-9 w-9 cursor-pointer items-center justify-center rounded-full lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <MobileNavDrawer portal="recruiter" isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}
