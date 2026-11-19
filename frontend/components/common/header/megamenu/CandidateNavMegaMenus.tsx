'use client';

import { useDismissable } from '@/hooks/useDismissable';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import CvMegaMenu from './CvMegaMenu';
import GuidesMegaMenu from './GuidesMegaMenu';
import JobsMegaMenu from './JobsMegaMenu';
import ToolsMegaMenu from './ToolsMegaMenu';

type MenuKey = 'jobs' | 'cv' | 'guides' | 'tools';

interface MenuItemConfig {
  id: MenuKey;
  label: string;
  badge?: string;
  isActive: (pathname: string) => boolean;
}

const MENU_ITEMS: MenuItemConfig[] = [
  {
    id: 'jobs',
    label: 'Jobs',
    isActive: (pathname) => pathname.startsWith('/jobs'),
  },
  {
    id: 'cv',
    label: 'Create CV',
    isActive: (pathname) => pathname.startsWith('/cv') || pathname.startsWith('/profile'),
  },
  {
    id: 'guides',
    label: 'Career guides',
    isActive: (pathname) => pathname.startsWith('/career-orientation') || pathname.startsWith('/blog'),
  },
  {
    id: 'tools',
    label: 'Tools & Help',
    badge: 'NEW',
    isActive: (pathname) => pathname.startsWith('/tools') || pathname.startsWith('/mock-interview'),
  },
];

const DEFAULT_DIMENSIONS: Record<MenuKey, { width: number; height: number }> = {
  jobs: { width: 1060, height: 440 },
  cv: { width: 840, height: 368 },
  guides: { width: 800, height: 395 },
  tools: { width: 900, height: 360 },
};

interface CandidateNavMegaMenusProps {
  pathname: string;
}

export default function CandidateNavMegaMenus({ pathname }: CandidateNavMegaMenusProps) {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>(DEFAULT_DIMENSIONS.jobs);
  const [prevPathname, setPrevPathname] = useState(pathname);

  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const baseMenuId = useId();

  const jobsRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLDivElement>(null);
  const guidesRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  // Sync state if pathname changes (route navigation occurred)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    setActiveMenu(null);
  }

  const clearAllTimers = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = null;
    }
  }, []);

  const handleForceClose = useCallback(() => {
    clearAllTimers();
    setIsOpen(false);
    setActiveMenu(null);
  }, [clearAllTimers]);

  useDismissable(containerRef, isOpen, handleForceClose);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  const updateDimensionsForMenu = useCallback((key: MenuKey) => {
    const refs: Record<MenuKey, React.RefObject<HTMLDivElement | null>> = {
      jobs: jobsRef,
      cv: cvRef,
      guides: guidesRef,
      tools: toolsRef,
    };
    const el = refs[key]?.current;
    if (el && el.offsetWidth > 0 && el.offsetHeight > 0) {
      setDimensions({
        width: el.offsetWidth,
        height: el.offsetHeight,
      });
    } else {
      setDimensions(DEFAULT_DIMENSIONS[key]);
    }
  }, []);

  // Update dimensions whenever activeMenu changes
  useEffect(() => {
    if (activeMenu) {
      updateDimensionsForMenu(activeMenu);
    }
  }, [activeMenu, updateDimensionsForMenu]);

  // Window resize observer to adapt dimensions if screen breakpoint changes
  useEffect(() => {
    const handleResize = () => {
      if (activeMenu) {
        updateDimensionsForMenu(activeMenu);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [activeMenu, updateDimensionsForMenu]);

  const handleItemMouseEnter = (id: MenuKey) => {
    clearAllTimers();
    setActiveMenu(id);
    setIsOpen(true);
    updateDimensionsForMenu(id);
  };

  const handleItemMouseLeave = () => {
    clearAllTimers();
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      // Wait for exit transition (240ms) before clearing activeMenu
      exitTimeoutRef.current = setTimeout(() => {
        setActiveMenu(null);
      }, 240);
    }, 160);
  };

  const handleDropdownMouseEnter = () => {
    clearAllTimers();
  };

  const handleDropdownMouseLeave = () => {
    handleItemMouseLeave();
  };

  const handleButtonClick = (id: MenuKey) => {
    if (isOpen && activeMenu === id) {
      handleForceClose();
    } else {
      handleItemMouseEnter(id);
    }
  };

  return (
    <div ref={containerRef} className="relative flex items-center gap-1">
      {/* Navigation Buttons */}
      {MENU_ITEMS.map((item) => {
        const isItemActive = item.isActive(pathname);
        const isMenuOpen = isOpen && activeMenu === item.id;
        const buttonId = `${baseMenuId}-${item.id}-btn`;
        const menuId = `${baseMenuId}-${item.id}-menu`;

        return (
          <div key={item.id} onMouseEnter={() => handleItemMouseEnter(item.id)} onMouseLeave={handleItemMouseLeave}>
            <button
              id={buttonId}
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls={menuId}
              onClick={() => handleButtonClick(item.id)}
              className={cn(
                'group text-title-sm ease-standard flex h-10 cursor-pointer items-center gap-1.5 rounded-full px-3.5 font-medium whitespace-nowrap transition-colors duration-150 sm:px-4',
                isMenuOpen || isItemActive ? 'font-bold text-[#009D46]' : 'text-[#1E2837] hover:text-[#009D46]',
              )}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="py-0.2 rounded-full bg-emerald-100 px-1.5 text-[9px] font-bold text-[#009D46]">
                  {item.badge}
                </span>
              )}
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-[#6C757D] transition-transform duration-200 group-hover:text-[#009D46]',
                  (isMenuOpen || isItemActive) && 'rotate-180 text-[#009D46]',
                )}
                aria-hidden
              />
            </button>
          </div>
        );
      })}

      {/* Single Morphing Dropdown Shell */}
      <div
        role="region"
        aria-label="Navigation mega menu"
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
        className={cn(
          'megamenu-shell absolute top-full left-0 z-50 mt-2.5 max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1)]',
          "before:absolute before:-top-3.5 before:right-0 before:left-0 before:h-3.5 before:content-['']",
          isOpen
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-2 scale-[0.98] opacity-0',
        )}
        style={{
          width: dimensions.width ? `${dimensions.width}px` : undefined,
          height: dimensions.height ? `${dimensions.height}px` : undefined,
        }}
      >
        <div className="relative h-full w-full">
          {/* Jobs Panel */}
          <div
            ref={jobsRef}
            className={cn(
              'absolute top-0 left-0 w-[1060px] transition-opacity duration-240 ease-out xl:w-[1140px]',
              activeMenu === 'jobs'
                ? 'pointer-events-auto z-10 opacity-100'
                : 'pointer-events-none invisible z-0 opacity-0',
            )}
          >
            <JobsMegaMenu onClose={handleForceClose} />
          </div>

          {/* CV Panel */}
          <div
            ref={cvRef}
            className={cn(
              'absolute top-0 left-0 w-[840px] transition-opacity duration-240 ease-out xl:w-[880px]',
              activeMenu === 'cv'
                ? 'pointer-events-auto z-10 opacity-100'
                : 'pointer-events-none invisible z-0 opacity-0',
            )}
          >
            <CvMegaMenu onClose={handleForceClose} />
          </div>

          {/* Guides Panel */}
          <div
            ref={guidesRef}
            className={cn(
              'absolute top-0 left-0 w-[800px] transition-opacity duration-240 ease-out xl:w-[840px]',
              activeMenu === 'guides'
                ? 'pointer-events-auto z-10 opacity-100'
                : 'pointer-events-none invisible z-0 opacity-0',
            )}
          >
            <GuidesMegaMenu onClose={handleForceClose} />
          </div>

          {/* Tools Panel */}
          <div
            ref={toolsRef}
            className={cn(
              'absolute top-0 left-0 w-[900px] transition-opacity duration-240 ease-out xl:w-[960px]',
              activeMenu === 'tools'
                ? 'pointer-events-auto z-10 opacity-100'
                : 'pointer-events-none invisible z-0 opacity-0',
            )}
          >
            <ToolsMegaMenu onClose={handleForceClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
