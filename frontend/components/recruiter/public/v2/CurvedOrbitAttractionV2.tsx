'use client';

import { ROUTES } from '@/constants/routes';
import { ArrowRight, Bot, Code2, Globe2, Headphones, Layers, Smartphone, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface CurvedOrbitAttractionV2Props {
  onOpenConsultModal?: () => void;
}

const CHANNELS = [
  {
    step: '01',
    icon: Layers,
    title: 'Hàng ngàn việc làm IT cập nhật liên tục mỗi ngày',
    desc: 'Đa dạng mọi cấp độ từ Intern, Junior đến Senior, Tech Lead, Architect tại các công ty Outsourcing, Product và Tech Unicorn.',
    badge: 'Mọi Level IT',
  },
  {
    step: '02',
    icon: Globe2,
    title: 'Đưa việc làm đến đúng nơi Lập trình viên tìm kiếm',
    desc: 'Tối ưu hóa hiển thị hàng đầu trên Google Search, GitHub Community và các nền tảng AI Answer Engine hàng đầu.',
    badge: 'SEO & AI Search',
  },
  {
    step: '03',
    icon: Smartphone,
    title: 'Ứng dụng Web & Mobile tối ưu trải nghiệm ứng viên',
    desc: 'Ứng viên nhận thông báo việc làm phù hợp tức thì qua Notification và ứng tuyển nhanh chóng với CV đã được đồng bộ.',
    badge: 'Đa nền tảng',
  },
  {
    step: '04',
    icon: Bot,
    title: 'Tự động gợi ý việc làm chuẩn xác bằng AI Matching',
    desc: 'Thuật toán AI tự động phân tích sâu Tech Stack, Framework và độ tương thích dự án thực tế để đề xuất việc làm chuẩn xác.',
    badge: 'AI Matching',
  },
  {
    step: '05',
    icon: Code2,
    title: 'Tiếp cận cộng đồng Lập trình viên & Trường Đại học IT',
    desc: 'Hiện diện trực tiếp tại các diễn đàn Tech, GitHub Repositories, các buổi Tech Talk và mạng lưới 15+ trường ĐH công nghệ hàng đầu.',
    badge: 'Mạng lưới Tech',
  },
  {
    step: '06',
    icon: Sparkles,
    title: 'Hệ sinh thái công cụ hỗ trợ phát triển sự nghiệp IT',
    desc: 'Cung cấp AI CV Builder chuẩn ATS quốc tế và AI Mock Interview kỹ thuật, thu hút hàng chục ngàn nhân tài IT luyện tập mỗi ngày.',
    badge: 'AI Career Tools',
  },
];

export default function CurvedOrbitAttractionV2({ onOpenConsultModal }: CurvedOrbitAttractionV2Props) {
  return (
    <section aria-label="Candidate Attraction Ecosystem" className="border-b border-[#E5E7EB] bg-white py-16 sm:py-24">
      <div className="container-page">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00B14F]/20 bg-[#F0FDF4] px-4 py-1.5 text-xs font-bold text-[#009D46]">
            <Globe2 className="h-3.5 w-3.5" />
            <span>HỆ SINH THÁI ĐA KÊNH CHUYÊN SÂU IT</span>
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-[#1E2837] sm:text-4xl">
            InterVue thu hút ứng viên IT <span className="text-[#00B14F]">như thế nào?</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[#6C757D] sm:text-base">
            Hơn 50.000+ kỹ sư phần mềm và lập trình viên sử dụng InterVue để tìm kiếm cơ hội mới, rèn luyện kỹ năng và
            xây dựng sự nghiệp công nghệ vững chắc mỗi ngày.
          </p>
        </div>

        {/* Orbit Layout: Left Globe Metric & Right Curved Timeline */}
        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: 3D Holographic Globe Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto flex max-w-md flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#D1F2DF] bg-gradient-to-b from-[#F4FBF7] via-white to-[#F0FDF4] p-8 text-center shadow-sm sm:p-10">
              {/* Subtle ambient decorative ring */}
              <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#00B14F]/10 blur-3xl" />
              <div className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl" />

              {/* Glowing Orb Sphere Container */}
              <div className="relative flex h-60 w-60 items-center justify-center sm:h-72 sm:w-72">
                {/* Orbit Rings */}
                <div className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full border-2 border-dashed border-[#00B14F]/25" />
                <div className="absolute inset-4 animate-[spin_25s_linear_infinite_reverse] rounded-full border border-[#00B14F]/20" />

                {/* Central Floating Metric Badge */}
                <div className="relative z-10 flex h-40 w-40 flex-col items-center justify-center rounded-full border-2 border-[#00B14F]/30 bg-white/95 p-4 shadow-[0_8px_30px_rgba(0,177,79,0.15)] backdrop-blur-md">
                  <span className="text-3xl font-black tracking-tight text-[#009D46] sm:text-4xl">50.000+</span>
                  <span className="mt-1 text-center text-xs font-bold text-[#1E2837]">
                    Nhân tài IT <br />
                    sẵn sàng ứng tuyển
                  </span>
                </div>
              </div>

              {/* Real-time Indicator Pill */}
              <div className="mt-6 flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-xs font-semibold text-[#1E2837] shadow-2xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00B14F] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00B14F]" />
                </span>
                <span>Dữ liệu hồ sơ xác thực theo thời gian thực</span>
              </div>
            </div>
          </div>

          {/* Right: Curved Orbit Timeline Cards */}
          <div className="space-y-4 lg:col-span-7">
            <div className="relative border-l-2 border-[#D1F2DF] pl-6 sm:pl-8">
              {CHANNELS.map((ch) => {
                const Icon = ch.icon;
                return (
                  <div key={ch.step} className="group relative mb-6 last:mb-0">
                    {/* Node Bullet on Timeline */}
                    <div className="absolute -left-[35px] flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#009D46] text-xs font-bold text-white shadow-sm transition-transform duration-200 group-hover:scale-110 sm:-left-[43px] sm:h-9 sm:w-9">
                      {ch.step}
                    </div>

                    {/* Card Content */}
                    <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8F9FA] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00B14F]/50 hover:bg-white hover:shadow-md sm:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EBF8F1] text-[#009D46]">
                            <Icon className="h-4 w-4" />
                          </div>
                          <h3 className="text-base font-bold text-[#1E2837] transition-colors group-hover:text-[#009D46]">
                            {ch.title}
                          </h3>
                        </div>
                        <span className="rounded-full border border-[#D1F2DF] bg-white px-2.5 py-0.5 text-[11px] font-bold text-[#009D46]">
                          {ch.badge}
                        </span>
                      </div>
                      <p className="mt-2.5 text-xs leading-relaxed text-[#6C757D] sm:text-sm sm:leading-relaxed">
                        {ch.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section Conversion Banner */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-[#D1F2DF] bg-gradient-to-r from-[#F4FBF7] via-white to-[#F0FDF4] p-6 sm:p-8">
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <div>
              <p className="text-base font-extrabold text-[#1E2837] sm:text-lg">
                Hệ sinh thái ứng viên IT rộng lớn giúp tin tuyển dụng tiếp cận đúng người, đúng thời điểm.
              </p>
              <p className="mt-1 text-xs text-[#6C757D] sm:text-sm">
                Rút ngắn 3 lần thời gian phỏng vấn và giảm tới 60% chi phí tìm nguồn ứng viên công nghệ.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={onOpenConsultModal}
                className="flex cursor-pointer items-center gap-1.5 rounded-full border border-[#00B14F] bg-white px-5 py-2.5 text-xs font-bold text-[#00B14F] transition-all hover:bg-emerald-50 sm:text-sm"
              >
                <Headphones className="h-4 w-4" />
                <span>Tư vấn tuyển dụng</span>
              </button>

              <Link
                href={ROUTES.RECRUITER_REGISTER}
                className="flex items-center gap-1.5 rounded-full bg-[#009D46] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#00873c] sm:text-sm"
              >
                <span>Đăng ký ngay</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
