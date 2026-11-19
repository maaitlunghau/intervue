'use client';

import { ROUTES } from '@/constants/routes';
import { Award, FileText, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white text-[#4A5568] antialiased">
      {/* TẦNG 1: BRANDING, STORE DOWNLOADS, SOCIAL, NAVIGATION LINKS & QR CODE */}
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.85fr_1.05fr_0.95fr_1.15fr_auto] lg:gap-12 xl:gap-16">
          {/* Cột 1: Logo, Slogan, Mô tả, App Store/Google Play, Mạng xã hội */}
          <div className="space-y-6 lg:pr-6">
            <Link href={ROUTES.HOME} className="inline-block">
              <Image
                src="/intervue-logo.png"
                alt="InterVue"
                width={196}
                height={54}
                className="h-12 w-auto object-contain sm:h-[70px]"
                priority
              />
            </Link>

            <p className="text-[15px] font-bold text-[#00B14F]">Tiếp lợi thế, nối thành công</p>

            <p className="max-w-md text-[14px] leading-relaxed text-[#4A5568]">
              Tuyendung.intervue.vn là nền tảng đăng tin tuyển dụng IT ứng dụng AI dành riêng cho Doanh nghiệp, thuộc hệ
              sinh thái InterVue HR Tech. Nếu bạn là người tìm việc, vui lòng truy cập cổng thông tin ứng viên tại{' '}
              <strong className="text-[#1E2837]">www.intervue.vn</strong>.
            </p>

            {/* Ứng dụng tải xuống - Luôn nằm ngang 1 dòng */}
            <div className="pt-1">
              <p className="text-[15px] font-bold text-[#1E2837]">Ứng dụng tải xuống</p>
              <div className="mt-3.5 flex items-center gap-3.5 whitespace-nowrap">
                {/* App Store Button */}
                <a
                  href="#"
                  aria-label="Available on the App Store"
                  className="shrink-0 transition-transform hover:scale-[1.03]"
                >
                  <Image
                    src="/app-store-badge.png"
                    alt="Available on the App Store"
                    width={142}
                    height={42}
                    className="h-[42px] w-auto object-contain shadow-xs"
                  />
                </a>

                {/* Google Play Button */}
                <a
                  href="#"
                  aria-label="Get it on Google Play"
                  className="shrink-0 transition-transform hover:scale-[1.03]"
                >
                  <Image
                    src="/google-play-badge.png"
                    alt="Get it on Google Play"
                    width={142}
                    height={42}
                    className="h-[42px] w-auto object-contain shadow-xs"
                  />
                </a>
              </div>
            </div>

            {/* Cộng đồng InterVue - Icon to hơn và dãn cách thoải mái */}
            <div className="pt-2">
              <p className="text-[15px] font-bold text-[#1E2837]">Cộng đồng InterVue</p>
              <div className="mt-3.5 flex items-center gap-3.5">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook InterVue"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-2xs transition-transform hover:scale-110 hover:opacity-95"
                >
                  <svg className="h-5.5 w-5.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn InterVue"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0A66C2] text-white shadow-2xs transition-transform hover:scale-110 hover:opacity-95"
                >
                  <svg className="h-5.5 w-5.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube InterVue"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF0000] text-white shadow-2xs transition-transform hover:scale-110 hover:opacity-95"
                >
                  <svg className="h-5.5 w-5.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* Zalo */}
                <a
                  href="https://zalo.me"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Zalo InterVue"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-2xs transition-transform hover:scale-110 hover:opacity-95"
                >
                  <span className="text-[13.5px] font-black tracking-tight">Zalo</span>
                </a>
              </div>
            </div>
          </div>

          {/* Cột 2: Dịch vụ & Giải pháp */}
          <div className="space-y-4">
            <h3 className="text-[16px] font-bold text-[#1E2837]">Dịch vụ &amp; Giải pháp</h3>
            <ul className="space-y-3.5 text-[14.5px]">
              <li>
                <Link href="#solutions" className="transition-colors hover:text-[#00B14F]">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="transition-colors hover:text-[#00B14F]">
                  Bảng giá dịch vụ
                </Link>
              </li>
              <li>
                <Link href="#solutions" className="transition-colors hover:text-[#00B14F]">
                  Hỗ trợ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-[#00B14F]">
                  Cẩm nang tuyển dụng
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="transition-colors hover:text-[#00B14F]">
                  Chương trình InterVue Rewards
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Về InterVue */}
          <div className="space-y-4">
            <h3 className="text-[16px] font-bold text-[#1E2837]">Về InterVue</h3>
            <ul className="space-y-3.5 text-[14.5px]">
              <li>
                <Link href="/gioi-thieu" className="transition-colors hover:text-[#00B14F]">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href={ROUTES.JOBS} className="transition-colors hover:text-[#00B14F]">
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-[#00B14F]">
                  Góc báo chí
                </Link>
              </li>
              <li>
                <Link href="#university" className="transition-colors hover:text-[#00B14F]">
                  Mạng lưới Đại học đối tác
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Thông tin & Pháp lý */}
          <div className="space-y-4">
            <h3 className="text-[16px] font-bold text-[#1E2837]">Thông tin &amp; Pháp lý</h3>
            <ul className="space-y-3.5 text-[14.5px]">
              <li>
                <Link href="/data-processing-agreement" className="transition-colors hover:text-[#00B14F]">
                  Quy chế hoạt động
                </Link>
              </li>
              <li>
                <Link href="/data-processing-agreement" className="transition-colors hover:text-[#00B14F]">
                  Điều khoản dịch vụ
                </Link>
              </li>
              <li>
                <Link href="/data-processing-agreement" className="transition-colors hover:text-[#00B14F]">
                  Chính sách quyền riêng tư
                </Link>
              </li>
              <li>
                <Link href="/data-processing-agreement" className="transition-colors hover:text-[#00B14F]">
                  Chính sách cookie
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#00B14F] bg-white px-5 py-2.5 text-[14px] font-semibold text-[#00B14F] shadow-2xs transition-all duration-200 hover:bg-[#00B14F] hover:text-white"
              >
                <span>Cài đặt cookie ➔</span>
              </button>
            </div>
          </div>

          {/* Cột 5: Mã QR Code - Không viền box, chữ intervue.vn xanh lá */}
          <div className="flex flex-col items-start lg:items-center">
            <Image
              src="/intervue-qr.png"
              alt="QR Code intervue.vn"
              width={104}
              height={104}
              className="h-[104px] w-[104px] object-contain"
            />
            <span className="mt-3 cursor-pointer text-center text-[14px] font-bold text-[#00B14F] transition-colors hover:underline">
              intervue.vn
            </span>
          </div>
        </div>
      </div>

      {/* TẦNG 2: THÔNG TIN PHÁP LÝ, TRỤ SỞ & CHỨNG NHẬN (TOPCV MATCH) */}
      <div className="border-t border-[#E5E7EB] bg-white py-10 lg:py-12">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            {/* Pháp lý & Trụ sở với Green Icons */}
            <div className="space-y-3 text-[14px] leading-relaxed text-[#4A5568]">
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[#00B14F]" />
                <p>
                  <strong className="font-semibold text-[#1E2837]">Đăng ký kinh doanh số:</strong> 0107307178 do Sở
                  KH&amp;ĐT TP. Hà Nội cấp ngày 18/01/2024
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Award className="mt-0.5 h-5 w-5 shrink-0 text-[#00B14F]" />
                <p>
                  <strong className="font-semibold text-[#1E2837]">Giấy phép hoạt động:</strong> 18/SLĐTBXH-GP cấp bởi
                  Bộ Lao động - Thương binh và Xã hội
                </p>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#00B14F]" />
                <p>
                  <strong className="font-semibold text-[#1E2837]">Trụ sở HN:</strong> Tòa nhà InterVue Tower, Số 47
                  Nguyễn Tuân, P. Thanh Xuân Trung, Q. Thanh Xuân, TP. Hà Nội
                </p>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#00B14F]" />
                <p>
                  <strong className="font-semibold text-[#1E2837]">Chi nhánh HCM:</strong> Tòa nhà Tech Innovation
                  Center, Số 24C Phan Đăng Lưu, P. Gia Định, TP. Hồ Chí Minh
                </p>
              </div>
            </div>

            {/* Chứng nhận Google for Startups & DMCA Official Badges */}
            <div className="flex shrink-0 items-center gap-8 sm:gap-10">
              {/* Google for Startups Accelerator 2020 Official Badge */}
              <div className="flex items-center">
                <Image
                  src="/google-for-startups.png"
                  alt="Google for Startups Accelerator 2020"
                  width={210}
                  height={48}
                  className="h-[48px] w-auto object-contain"
                />
              </div>

              {/* DMCA Protected Official Badge */}
              <div className="flex items-center">
                <Image
                  src="/dmca-protected.png"
                  alt="DMCA.com Protected"
                  width={56}
                  height={62}
                  className="h-[56px] w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TẦNG 3: HỆ SINH THÁI HR TECH CỦA INTERVUE (TOPCV MATCH) */}
      <div className="border-t border-[#E5E7EB] bg-white py-12 lg:py-14">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h3 className="mb-8 text-center text-[16.5px] font-bold text-[#1E2837]">Hệ sinh thái HR Tech của InterVue</h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5">
            {/* Card 1: InterVue */}
            <div className="group flex min-h-[100px] items-center justify-between rounded-2xl border border-[#D1F2DF] bg-gradient-to-r from-[#F4FAF6] to-white p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
              <div className="flex-1 pr-2.5">
                <span className="block text-[14.5px] font-bold text-[#009D46]">InterVue</span>
                <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-[#6C757D]">
                  Nền tảng công nghệ tuyển dụng thông minh InterVue
                </p>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F8EE] text-[#00B14F]">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>

            {/* Card 2: InterVue Pro */}
            <div className="group flex min-h-[100px] items-center justify-between rounded-2xl border border-[#FEF0C7] bg-gradient-to-r from-[#FFFAEB] to-white p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
              <div className="flex-1 pr-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[14.5px] font-bold text-[#93370D]">InterVue</span>
                  <span className="py-0.2 rounded bg-amber-400 px-1.5 text-[9px] font-black text-slate-950 uppercase">
                    Pro
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-[#6C757D]">
                  Kết nối ứng viên chất - doanh nghiệp hàng đầu
                </p>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
            </div>

            {/* Card 3: InterVue Mock */}
            <div className="group flex min-h-[100px] items-center justify-between rounded-2xl border border-[#FEDF89]/70 bg-gradient-to-r from-[#FFF6ED] to-white p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
              <div className="flex-1 pr-2.5">
                <span className="block text-[14.5px] font-bold text-[#C4320A]">InterVue Mock</span>
                <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-[#6C757D]">
                  Luyện phỏng vấn kỹ thuật &amp; đánh giá năng lực AI
                </p>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
            </div>

            {/* Card 4: InterVue Code */}
            <div className="group flex min-h-[100px] items-center justify-between rounded-2xl border border-[#D1E9FF] bg-gradient-to-r from-[#F0F8FF] to-white p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
              <div className="flex-1 pr-2.5">
                <span className="block text-[14.5px] font-bold text-[#026AA2]">InterVue Code</span>
                <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-[#6C757D]">
                  Đánh giá coding &amp; System Design thực chiến
                </p>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
            </div>

            {/* Card 5: InterVue ATS */}
            <div className="group flex min-h-[100px] items-center justify-between rounded-2xl border border-[#A6F4C5]/80 bg-gradient-to-r from-[#EDFCF2] to-white p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
              <div className="flex-1 pr-2.5">
                <span className="block text-[14.5px] font-bold text-[#05603A]">InterVue ATS</span>
                <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-[#6C757D]">
                  Giải pháp quản trị tuyển dụng hiệu suất cao
                </p>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TẦNG 4: BẢN QUYỀN (BOTTOM COPYRIGHT) */}
      <div className="bg-white py-6 text-center">
        <p className="text-[13px] font-bold text-[#6C757D]">
          &copy; 2024 - {new Date().getFullYear()} InterVue Vietnam JSC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
