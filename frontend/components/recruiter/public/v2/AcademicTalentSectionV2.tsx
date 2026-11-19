'use client';

import { Award, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const UNIVERSITIES = [
  { code: 'HUST', name: 'Đại học Bách Khoa Hà Nội', logo: '/srp/university/hust.png' },
  { code: 'VNU', name: 'Đại học Quốc gia Hà Nội', logo: '/srp/university/vnu.png' },
  { code: 'VNUHCM', name: 'Đại học Quốc gia TP.HCM', logo: '/srp/university/vnuhcm.png' },
  { code: 'FTU', name: 'Đại học Ngoại Thương', logo: '/srp/university/ftu.png' },
  { code: 'NEU', name: 'Đại học Kinh tế Quốc dân', logo: '/srp/university/neu.png' },
  { code: 'TMU', name: 'Đại học Thương Mại', logo: '/srp/university/tmu.png' },
  { code: 'UEH', name: 'Đại học Kinh tế TP.HCM', logo: '/srp/university/ueh.png' },
];

const COLLAB_MODULES = [
  {
    title: 'CỔNG VIỆC LÀM IT ĐỘC QUYỀN THEO TRƯỜNG',
    subtitle: 'Kênh tuyển dụng thực tập sinh và kỹ sư phần mềm trẻ',
    desc: 'Hợp tác cùng Ban giám hiệu và Đoàn trường xây dựng chuyên trang việc làm mang thương hiệu nhà trường, kết nối sinh viên IT trực tiếp với doanh nghiệp.',
    badge: 'Chuyên trang Đại học',
    img: '/market-bg.jpg',
  },
  {
    title: 'TECH JOB FAIR & KÝ KẾT DOANH NGHIỆP',
    subtitle: 'Ngày hội việc làm công nghệ và phỏng vấn sơ loại on-site',
    desc: 'Đồng tổ chức các sự kiện Tech Job Fair thường niên tại các trường ĐH công nghệ hàng đầu, nơi các tài năng trẻ tham gia phỏng vấn trực tiếp tại gian hàng.',
    badge: 'Sự kiện quy mô lớn',
    img: '/banner-recruitment-1.jpg',
  },
  {
    title: 'EDUCATION CODE VIP & AI MOCK INTERVIEW',
    subtitle: 'Đào tạo kỹ năng thực chiến và cấp mã định danh sinh viên xuất sắc',
    desc: 'Tổ chức workshop tối ưu hóa CV chuẩn ATS quốc tế, luyện phỏng vấn AI Mock Interview và cấp mã định danh Education Code cho Top 5% sinh viên tiêu biểu.',
    badge: 'Tính năng Độc quyền',
    img: '/landing/banner-bot.jpg',
  },
];

export default function AcademicTalentSectionV2() {
  const [activeTab, setActiveTab] = useState(0);
  const current = COLLAB_MODULES[activeTab] ?? COLLAB_MODULES[0];

  return (
    <section aria-label="Academic Talent Network" className="border-b border-[#E5E7EB] bg-white py-16 sm:py-24">
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00B14F]/20 bg-[#F0FDF4] px-4 py-1.5 text-xs font-bold text-[#009D46]">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>INTERVUE ACADEMIC &amp; EDUCATION CODE</span>
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-[#1E2837] sm:text-4xl">
            Mạng lưới Đại học đối tác &amp; <span className="text-[#00B14F]">Pipeline Tài năng trẻ IT</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[#6C757D] sm:text-base">
            InterVue đồng hành cùng hơn 15+ trường Đại học đào tạo Công nghệ thông tin hàng đầu Việt Nam, giúp doanh
            nghiệp tiếp cận sớm nguồn sinh viên xuất sắc và thực tập sinh tài năng.
          </p>
        </div>

        {/* University Logos Row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {UNIVERSITIES.map((univ) => (
            <div key={univ.code} className="group flex flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-[#F8F9FA] p-2.5 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-[#00B14F]/50 group-hover:bg-white group-hover:shadow-sm sm:h-18 sm:w-18">
                <Image
                  src={univ.logo}
                  alt={univ.name}
                  width={52}
                  height={52}
                  className="max-h-12 max-w-full object-contain"
                />
              </div>
              <span className="text-xs font-bold text-[#6C757D] transition-colors group-hover:text-[#00B14F]">
                {univ.code}
              </span>
            </div>
          ))}
        </div>

        {/* Main Content Card: Left Tabs + Right Photo Showcase */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-[#D1F2DF] bg-[#F8F9FA] p-6 sm:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left 3 Tabs */}
            <div className="space-y-3 lg:col-span-7">
              {COLLAB_MODULES.map((mod, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={mod.title}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`w-full cursor-pointer rounded-2xl border p-5 text-left transition-all duration-200 ${
                      isActive
                        ? 'border-[#00B14F] bg-white shadow-md ring-1 ring-[#00B14F]/20'
                        : 'border-[#E5E7EB] bg-white/70 hover:border-[#00B14F]/40 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black tracking-wide text-[#009D46] uppercase">{mod.title}</span>
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                        {mod.badge}
                      </span>
                    </div>

                    <h3 className="mt-2 text-base font-bold text-[#1E2837] sm:text-lg">{mod.subtitle}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#6C757D] sm:text-sm">{mod.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Right Photo Frame */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-slate-900 shadow-md">
                <div className="relative h-64 w-full sm:h-80">
                  <Image
                    src={current.img}
                    alt={current.subtitle}
                    fill
                    className="object-cover opacity-85 transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  <div className="absolute right-4 bottom-4 left-4 text-white">
                    <span className="inline-block rounded-md bg-[#009D46] px-2.5 py-0.5 text-xs font-bold text-white">
                      {current.badge}
                    </span>
                    <h4 className="mt-2 text-sm font-bold text-white sm:text-base">{current.subtitle}</h4>
                    <p className="mt-1 text-xs text-slate-300">{current.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exclusive Education Code VIP Spotlight */}
        <div className="mt-8 rounded-2xl border border-amber-300/60 bg-gradient-to-r from-amber-50 via-white to-emerald-50 p-5 sm:p-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-slate-900 shadow-xs">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black text-[#1E2837] sm:text-base">
                    Tính năng độc quyền: Education Code VIP Pipeline
                  </h4>
                  <span className="rounded-full bg-amber-200/70 px-2 py-0.5 text-[10px] font-extrabold text-amber-900">
                    Sắp ra mắt
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-[#6C757D]">
                  Cấp mã định danh hồ sơ cho sinh viên IT có thành tích GPA xuất sắc, đồ án capstone đạt giải và vượt
                  qua bài test kỹ thuật của InterVue.
                </p>
              </div>
            </div>

            <span className="shrink-0 rounded-full border border-amber-300 bg-white px-4 py-2 text-xs font-bold text-amber-900 shadow-2xs">
              Tiếp cận nguồn tài năng trẻ sớm 6 tháng
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
