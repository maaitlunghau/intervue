'use client';

import EmailVerificationBanner from '@/components/auth/EmailVerificationBanner';
import { buttonClassName } from '@/components/ui/Button';
import { ROLES } from '@/constants/auth';
import { RECRUITER_NAV_LINKS } from '@/constants/header';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { ArrowLeft, Menu, PlusCircle, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import HeaderAccountActions from './header/HeaderAccountActions';
import CvMegaMenu from './header/megamenu/CvMegaMenu';
import GuidesMegaMenu from './header/megamenu/GuidesMegaMenu';
import JobsMegaMenu from './header/megamenu/JobsMegaMenu';
import NavMegaMenu from './header/megamenu/NavMegaMenu';
import ToolsMegaMenu from './header/megamenu/ToolsMegaMenu';
import MobileNavDrawer from './header/MobileNavDrawer';
import RecruiterEntryButton from './header/RecruiterEntryButton';

const NAV_LINK_CLASS =
  'text-title-sm text-on-surface hover:text-primary hover:bg-surface-container-low ease-standard flex h-10 items-center rounded-full px-4 font-medium whitespace-nowrap transition-colors duration-150';

interface HeaderProps {
  portal?: 'candidate' | 'recruiter';
}

export default function Header({ portal = 'candidate' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, hasRole } = useAuth();
  const pathname = usePathname() || '';
  const isRecruiterPortal = portal === 'recruiter';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const recruiterPostJobHref =
    user && hasRole(ROLES.RECRUITER)
      ? ROUTES.RECRUITER_JOBS_CREATE
      : `${ROUTES.RECRUITER_LOGIN}?redirect=${encodeURIComponent(ROUTES.RECRUITER_JOBS_CREATE)}`;

  return (
    <header
      className={cn(
        'bg-surface border-outline-variant ease-standard sticky top-0 z-50 w-full border-b transition-shadow duration-200',
        isScrolled && 'shadow-elevation-1',
      )}
    >
      <EmailVerificationBanner />
      <div
        className={cn(
          'container-page ease-standard flex w-full items-center justify-between transition-[height] duration-200',
          isScrolled ? 'h-16' : 'h-18',
        )}
      >
        <div className="flex items-center gap-8">
          <Link
            href={isRecruiterPortal ? ROUTES.RECRUITER_LANDING : ROUTES.HOME}
            className="flex shrink-0 items-center gap-3"
          >
            <Image
              src="/intervue-logo.png"
              alt="InterVue"
              width={176}
              height={48}
              priority
              className="h-10 w-auto object-contain"
            />
            {isRecruiterPortal && (
              <span className="bg-primary-container text-on-primary-container text-label-md rounded-shape-sm px-2 py-1">
                Recruiter
              </span>
            )}
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {isRecruiterPortal ? (
              RECRUITER_NAV_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className={NAV_LINK_CLASS}>
                  {item.label}
                </Link>
              ))
            ) : (
              <>
                <NavMegaMenu
                  label="Jobs"
                  isActive={pathname.startsWith('/jobs')}
                  alignClass="left-0 w-[1060px] xl:w-[1140px]"
                >
                  {({ close }) => <JobsMegaMenu onClose={close} />}
                </NavMegaMenu>

                <NavMegaMenu
                  label="Create CV"
                  isActive={pathname.startsWith('/cv') || pathname.startsWith('/profile')}
                  alignClass="-left-20 xl:left-0 w-[840px] xl:w-[880px]"
                >
                  {({ close }) => <CvMegaMenu onClose={close} />}
                </NavMegaMenu>

                <NavMegaMenu
                  label="Career guides"
                  isActive={pathname.startsWith('/career-orientation') || pathname.startsWith('/blog')}
                  alignClass="-left-44 xl:-left-20 w-[800px] xl:w-[840px]"
                >
                  {({ close }) => <GuidesMegaMenu onClose={close} />}
                </NavMegaMenu>

                <NavMegaMenu
                  label="Tools & Help"
                  badge="NEW"
                  isActive={pathname.startsWith('/tools') || pathname.startsWith('/mock-interview')}
                  alignClass="-left-72 lg:-left-72 xl:-left-60 w-[900px] xl:w-[960px]"
                >
                  {({ close }) => <ToolsMegaMenu onClose={close} />}
                </NavMegaMenu>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 md:gap-4.5">
          {isRecruiterPortal && (
            <>
              <Link href={ROUTES.HOME} className={`${NAV_LINK_CLASS} hidden xl:flex`}>
                <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
                For job seekers
              </Link>
            </>
          )}

          <HeaderAccountActions portal={portal} />

          {!isRecruiterPortal && (
            <>
              <div className="bg-surface-container-high hidden h-6 w-px md:block" aria-hidden="true" />
              <RecruiterEntryButton />
            </>
          )}

          {isRecruiterPortal && (
            <Link
              href={recruiterPostJobHref}
              className={buttonClassName({ size: 'md', className: 'hidden gap-2 sm:inline-flex' })}
            >
              <PlusCircle className="h-4 w-4" aria-hidden />
              Post a job
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="state-layer text-on-surface flex h-12 w-12 cursor-pointer items-center justify-center rounded-full lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </div>

      <MobileNavDrawer portal={portal} isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}
