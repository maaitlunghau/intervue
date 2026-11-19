'use client';

import { ROLES } from '@/constants/auth';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { ArrowRight, Headphones } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface RecruiterHeroV2Props {
  onOpenConsultModal: () => void;
}

const HERO_STATS = [
  { value: '50.000+', label: 'Ứng viên IT tiềm năng' },
  { value: '94%', label: 'Độ chính xác so khớp AI' },
  { value: '1.200+', label: 'Doanh nghiệp tin dùng' },
  { value: '24 Giờ', label: 'Thời gian kết nối phỏng vấn' },
];

export default function RecruiterHeroV2({ onOpenConsultModal }: RecruiterHeroV2Props) {
  const { user, hasRole } = useAuth();
  const isRecruiter = user && hasRole(ROLES.RECRUITER);

  const postJobUrl = isRecruiter
    ? ROUTES.RECRUITER_JOBS_CREATE
    : `${ROUTES.RECRUITER_LOGIN}?redirect=${encodeURIComponent(ROUTES.RECRUITER_JOBS_CREATE)}`;

  return (
    <>
      {/* Hero Visual Scene Section with floating header offset */}
      <section
        id="recruiter-hero-v2"
        aria-label="Recruiter Introduction Hero"
        className="relative -mt-[86px] h-[540px] overflow-hidden bg-[#F5FBF9] bg-contain bg-bottom bg-no-repeat pt-[108px] sm:h-[610px] sm:pt-[118px] md:bg-cover lg:h-[670px] lg:pt-[126px]"
        style={{
          backgroundImage: "url('/intervue-hero-scene-desktop.png')",
        }}
      >
        {/* Subtle Tech Ribbon Pattern on Left */}
        <div className="pointer-events-none absolute top-16 left-1 z-0 hidden sm:block lg:top-24 lg:left-4">
          <Image
            src="/hero-left-pattern.png"
            alt=""
            width={114}
            height={310}
            className="h-[180px] w-[65px] opacity-75 lg:h-[290px] lg:w-[105px]"
          />
        </div>

        {/* Subtle Tech Ribbon Pattern on Right */}
        <div className="pointer-events-none absolute top-16 right-1 z-0 hidden sm:block lg:top-24 lg:right-4">
          <Image
            src="/hero-left-pattern.png"
            alt=""
            width={114}
            height={310}
            className="h-[180px] w-[65px] -scale-x-100 opacity-65 lg:h-[290px] lg:w-[105px]"
          />
        </div>

        {/* Centered Headlines & Buttons Overlay */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1080px] flex-col items-center px-4 text-center">
          <h1 className="m-0 text-3xl font-extrabold tracking-tight text-[#263A4D] sm:text-4xl lg:text-[42px] lg:leading-[50px]">
            Tuyển dụng Nhân tài IT phù hợp <span className="text-[#0B933E]">cùng AI</span>
          </h1>

          <p className="mt-2 text-base font-semibold text-[#0B933E] sm:text-xl lg:text-[24px] lg:leading-[32px]">
            Tiếp cận hơn 50.000+ kỹ sư phần mềm &amp; lập trình viên đang tìm việc
          </p>

          <div className="mt-5 flex w-full max-w-[340px] flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-5">
            <button
              type="button"
              onClick={onOpenConsultModal}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#263A4D] px-8 py-3 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a2936] hover:shadow-md sm:w-auto sm:text-base"
            >
              <Headphones className="h-4 w-4" />
              <span>Tư vấn tuyển dụng</span>
            </button>

            <Link
              href={postJobUrl}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#009D46] px-8 py-3 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#00873c] hover:shadow-md sm:w-auto sm:text-base"
            >
              <span>Đăng tin ngay</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Docked Stats Bar (Fits directly in viewport under the scene) */}
      <section aria-label="Key Platform Metrics" className="border-t border-b border-[#D6E5DC] bg-white py-5 lg:py-6">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-y-4 divide-y divide-[#D6E5DC] text-center sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center px-4">
                <p className="font-display text-2xl font-black tracking-tight text-[#009D46] sm:text-3xl lg:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-semibold text-[#303235] sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
