'use client';

import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface GuidesMegaMenuProps {
  onClose: () => void;
}

const CATEGORIES = [
  {
    label: 'Career Orientation',
    href: '/blog/dinh-huong-nghe-nghiep',
  },
  {
    label: 'Job Search Tips',
    href: '/blog/bi-kip-tim-viec',
  },
  {
    label: 'Salary & Compensation',
    href: '/blog/che-do-luong-thuong',
  },
  {
    label: 'Engineering Insights',
    href: '/blog/kien-thuc-chuyen-nganh',
  },
  {
    label: 'Tech Market & Hiring Trends',
    href: '/blog/dinh-huong-nghe-nghiep',
  },
  {
    label: 'Interactive Career Path',
    href: '/career-orientation',
  },
];

const FEATURED_ARTICLES = [
  {
    title: 'Understanding Tech Sales & Business Development in 2026',
    excerpt: 'Key skillsets, commission structures, and career advancement paths from BDR to VP of Sales.',
    href: '/blog/dinh-huong-nghe-nghiep/dinh-huong-nghe-nghiep-nganh-kinh-doanh-sales',
    img: '/blog/featured-sales-career.jpg',
  },
  {
    title: 'How Much Do Software Engineers Make? 2026 IT Salary Benchmark',
    excerpt: 'Comprehensive salary breakdown across Junior, Senior, and Lead levels across Vietnam & remote hubs.',
    href: '/blog/che-do-luong-thuong',
    img: '/blog/featured-it-salary.jpg',
  },
];

export default function GuidesMegaMenu({ onClose }: GuidesMegaMenuProps) {
  return (
    <div className="grid grid-cols-12 gap-5 p-5 sm:p-6 xl:gap-6">
      {/* Column 1: Career Topics (single-line text links, no icons or descriptions) */}
      <div className="col-span-12 sm:col-span-5 lg:col-span-4 lg:border-r lg:border-[#E5E7EB] lg:pr-5">
        <span className="mb-2.5 block text-[11px] font-bold tracking-widest text-[#6C757D] uppercase">
          CAREER TOPICS
        </span>

        <ul className="space-y-0.5">
          {CATEGORIES.map((cat) => (
            <li key={cat.label}>
              <Link
                href={cat.href}
                onClick={onClose}
                className="group flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm font-medium text-[#4A5568] transition-colors hover:bg-[#F8F9FA] hover:text-[#009D46]"
              >
                <span>{cat.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-3 border-t border-[#E5E7EB] pt-2.5">
          <Link
            href="/blog"
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-bold text-[#009D46] hover:underline"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>View all career guides ➔</span>
          </Link>
        </div>
      </div>

      {/* Column 2: Featured Articles stacked vertically (TopCV style) */}
      <div className="col-span-12 flex flex-col justify-between sm:col-span-7 lg:col-span-8">
        <div>
          <span className="mb-2.5 block text-[11px] font-bold tracking-widest text-[#6C757D] uppercase">
            FEATURED ARTICLES
          </span>

          <div className="space-y-2">
            {FEATURED_ARTICLES.map((article) => (
              <Link
                key={article.title}
                href={article.href}
                onClick={onClose}
                className="group flex items-center gap-3.5 rounded-xl p-2 transition-colors hover:bg-[#F8F9FA]"
              >
                <div className="relative h-18 w-28 shrink-0 overflow-hidden rounded-lg border border-[#E5E7EB] bg-slate-100 sm:h-20 sm:w-32">
                  <Image
                    src={article.img}
                    alt={article.title}
                    fill
                    sizes="128px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <h5 className="line-clamp-2 text-[13px] font-bold text-[#1E2837] transition-colors group-hover:text-[#009D46]">
                    {article.title}
                  </h5>
                  <p className="line-clamp-2 text-xs leading-relaxed text-[#6C757D]">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-2.5 border-t border-[#E5E7EB] pt-2.5">
          <Link
            href="/blog"
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-bold text-[#009D46] hover:underline"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Explore all featured articles ➔</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
