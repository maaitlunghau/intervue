'use client';

import { useDismissable } from '@/hooks/useDismissable';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { ReactNode, useCallback, useEffect, useId, useRef, useState } from 'react';

interface NavMegaMenuProps {
  label: string;
  isActive?: boolean;
  alignClass?: string;
  badge?: string;
  children: (helpers: { close: () => void }) => ReactNode;
}

export default function NavMegaMenu({
  label,
  isActive = false,
  alignClass = 'left-0',
  badge,
  children,
}: NavMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useDismissable(containerRef, isOpen, () => setIsOpen(false));

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div ref={containerRef} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'group text-title-sm ease-standard flex h-10 cursor-pointer items-center gap-1.5 rounded-full px-3.5 font-medium whitespace-nowrap transition-colors duration-150 sm:px-4',
          isOpen || isActive ? 'font-bold text-[#009D46]' : 'text-[#1E2837] hover:text-[#009D46]',
        )}
      >
        <span>{label}</span>
        {badge && (
          <span className="py-0.2 rounded-full bg-emerald-100 px-1.5 text-[9px] font-bold text-[#009D46]">{badge}</span>
        )}
        <ChevronDown
          className={cn(
            'h-4 w-4 text-[#6C757D] transition-transform duration-200 group-hover:text-[#009D46]',
            (isOpen || isActive) && 'rotate-180 text-[#009D46]',
          )}
          aria-hidden
        />
      </button>

      {isOpen && (
        <div
          id={menuId}
          className={cn(
            'animate-fade-in-up absolute top-full z-50 mt-2.5 max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all',
            alignClass,
          )}
        >
          {children({ close: handleClose })}
        </div>
      )}
    </div>
  );
}
