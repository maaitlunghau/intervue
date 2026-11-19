'use client';

import { ROUTES } from '@/constants/routes';
import { CheckCircle2, Headphones, Sparkles, Users, Zap } from 'lucide-react';
import Link from 'next/link';

interface RecruiterPricingPlansV2Props {
  onOpenConsultModal?: () => void;
}

export default function RecruiterPricingPlansV2({ onOpenConsultModal }: RecruiterPricingPlansV2Props) {
  return (
    <section
      id="pricing"
      aria-label="Recruiter Pricing Plans"
      className="border-b border-[#E5E7EB] bg-white py-16 sm:py-24"
    >
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00B14F]/20 bg-[#F0FDF4] px-4 py-1.5 text-xs font-bold text-[#009D46]">
            <Zap className="h-3.5 w-3.5" />
            <span>BẢNG GIÁ DỊCH VỤ MINH BẠCH</span>
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-[#1E2837] sm:text-4xl">
            Linh hoạt cho mọi quy mô <span className="text-[#00B14F]">Doanh nghiệp công nghệ</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[#6C757D] sm:text-base">
            Bắt đầu hoàn toàn miễn phí với 3 tin đăng đầu tiên. Dễ dàng nâng cấp khi nhu cầu mở rộng quy mô đội ngũ lập
            trình viên của bạn tăng lên.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="mt-14 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
          {/* Starter Plan */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#E5E7EB] bg-[#F8F9FA] p-8 transition-all hover:border-[#00B14F]/40 hover:bg-white hover:shadow-md">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-[#1E2837]">
                <Zap className="h-3.5 w-3.5" />
                <span>ƯU ĐÃI DOANH NGHIỆP MỚI</span>
              </div>

              <h3 className="mt-4 text-2xl font-black text-[#1E2837]">Starter (Dùng thử)</h3>
              <p className="mt-1 text-xs text-[#6C757D]">Dành cho Startup hoặc Team nhỏ trải nghiệm tuyển dụng AI</p>

              <div className="mt-6 border-b border-[#E5E7EB] pb-6">
                <span className="text-4xl font-black text-[#1E2837]">0 đ</span>
                <span className="text-xs text-[#6C757D]"> / vĩnh viễn</span>
              </div>

              <ul className="mt-6 space-y-3.5 text-xs text-[#1E2837] sm:text-sm">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span className="font-bold">3 tin đăng IT miễn phí</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span className="font-bold">30 lượt AI chấm điểm CV tự động</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span>Quản lý phễu ứng viên Kanban cơ bản</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span>Duyệt tin đăng nhanh trong 24 giờ</span>
                </li>
              </ul>
            </div>

            <Link
              href={ROUTES.RECRUITER_REGISTER}
              className="mt-8 block w-full rounded-full border-2 border-[#009D46] bg-white py-3 text-center text-sm font-bold text-[#009D46] transition-all hover:bg-emerald-50"
            >
              Đăng ký miễn phí ngay
            </Link>
          </div>

          {/* Growth Pro Plan (Featured) */}
          <div className="relative flex flex-col justify-between rounded-3xl border-2 border-[#009D46] bg-white p-8 shadow-xl">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#009D46] px-4 py-1 text-xs font-bold tracking-wide text-white uppercase shadow-sm">
              PHỔ BIẾN NHẤT
            </span>

            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                <Sparkles className="h-3.5 w-3.5" />
                <span>DOANH NGHIỆP ĐANG TĂNG TRƯỞNG</span>
              </div>

              <h3 className="mt-4 text-2xl font-black text-[#1E2837]">Growth Pro</h3>
              <p className="mt-1 text-xs text-[#6C757D]">Dành cho công ty công nghệ có nhu cầu tuyển dụng liên tục</p>

              <div className="mt-6 border-b border-[#E5E7EB] pb-6">
                <span className="text-3xl font-black text-[#009D46] sm:text-4xl">1.490.000 đ</span>
                <span className="text-xs text-[#6C757D]"> / tháng</span>
              </div>

              <ul className="mt-6 space-y-3.5 text-xs text-[#1E2837] sm:text-sm">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span className="font-bold">Đăng tin tuyển dụng IT KHÔNG GIỚI HẠN</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span className="font-bold">AI sàng lọc &amp; chấm điểm CV không giới hạn</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span>Bộ câu hỏi phỏng vấn kỹ thuật gợi ý bởi AI</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span>Huy hiệu Doanh nghiệp uy tín (Top IT Company)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span>Ưu tiên hiển thị trên kết quả tìm kiếm việc làm</span>
                </li>
              </ul>
            </div>

            <Link
              href={ROUTES.RECRUITER_LOGIN}
              className="mt-8 block w-full rounded-full bg-[#009D46] py-3 text-center text-sm font-bold text-white shadow-sm transition-all hover:bg-[#00873c]"
            >
              Bắt đầu với Growth Pro
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#E5E7EB] bg-[#F8F9FA] p-8 transition-all hover:border-slate-800 hover:bg-white hover:shadow-md">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                <Users className="h-3.5 w-3.5" />
                <span>QUY MÔ LỚN &amp; TẬP ĐOÀN</span>
              </div>

              <h3 className="mt-4 text-2xl font-black text-[#1E2837]">Enterprise</h3>
              <p className="mt-1 text-xs text-[#6C757D]">Dành cho tập đoàn công nghệ và công ty phần mềm Outsource</p>

              <div className="mt-6 border-b border-[#E5E7EB] pb-6">
                <span className="text-3xl font-black text-[#1E2837]">Liên hệ báo giá</span>
              </div>

              <ul className="mt-6 space-y-3.5 text-xs text-[#1E2837] sm:text-sm">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span className="font-bold">Tích hợp phần mềm ATS nội bộ qua API/Webhook</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span className="font-bold">Mô hình AI huấn luyện riêng theo tiêu chuẩn công ty</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span>Quản lý tài khoản chuyên trách hỗ trợ 24/7</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#009D46]" />
                  <span>Hợp đồng dịch vụ &amp; Xuất hóa đơn VAT điện tử</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={onOpenConsultModal}
              className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-900 bg-slate-900 py-3 text-center text-sm font-bold text-white transition-all hover:bg-slate-800"
            >
              <Headphones className="h-4 w-4" />
              <span>Liên hệ tư vấn giải pháp</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
