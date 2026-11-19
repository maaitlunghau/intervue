'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface MegaMenuCardProps {
  imageSrc: string;
  imageAlt: string;
  badge: string;
  badgeColor?: 'emerald' | 'amber' | 'blue' | 'purple';
  title: string;
  description: string;
  href: string;
  ctaText: string;
  onItemClick?: () => void;
}

const BADGE_COLORS = {
  emerald: 'bg-[#00B14F] text-white',
  amber: 'bg-amber-500 text-white',
  blue: 'bg-blue-600 text-white',
  purple: 'bg-purple-600 text-white',
};

export default function MegaMenuCard({
  imageSrc,
  imageAlt,
  badge,
  badgeColor = 'emerald',
  title,
  description,
  href,
  ctaText,
  onItemClick,
}: MegaMenuCardProps) {
  return (
    <Link
      href={href}
      onClick={onItemClick}
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F8F9FA] p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00B14F]/40 hover:bg-white hover:shadow-md"
    >
      <div>
        {/* Thumbnail Image Container */}
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 280px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Badge */}
          <span
            className={`absolute top-2.5 left-2.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase shadow-sm ${BADGE_COLORS[badgeColor]}`}
          >
            {badge}
          </span>
        </div>

        {/* Content */}
        <div className="mt-3.5">
          <h4 className="text-[14px] font-bold text-[#1E2837] transition-colors group-hover:text-[#00B14F]">{title}</h4>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#6C757D]">{description}</p>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="mt-3.5 flex items-center gap-1.5 border-t border-[#E5E7EB] pt-3 text-xs font-bold text-[#009D46] transition-colors group-hover:text-[#00873c]">
        <span>{ctaText}</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
