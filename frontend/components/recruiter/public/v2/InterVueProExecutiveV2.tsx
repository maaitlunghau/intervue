'use client';

import { ArrowRight, Check, Crown, Headphones, Lock, ShieldCheck, Zap } from 'lucide-react';

interface InterVueProExecutiveV2Props {
  onOpenConsultModal?: () => void;
}

export default function InterVueProExecutiveV2({ onOpenConsultModal }: InterVueProExecutiveV2Props) {
  return (
    <section
      aria-label="InterVue Pro Executive Space"
      className="border-b border-[#E5E7EB] bg-[#0C121D] py-16 text-white sm:py-24"
    >
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold text-amber-300">
            <Crown className="h-3.5 w-3.5 text-amber-400" />
            <span>INTERVUE PRO • EXECUTIVE TECH SUITE</span>
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-4xl">
            Tuyển dụng Lập trình viên cấp cao &amp; <span className="text-amber-400">Tech Lead</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
            Không gian tuyển dụng bảo mật danh tính chuyên biệt, kết nối các tập đoàn công nghệ lớn với những chuyên gia
            hàng đầu (Senior, Tech Lead, Solution Architect, VP of Engineering).
          </p>
        </div>

        {/* Pro Card Layout */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-b from-[#141E2E] to-[#0E1522] p-6 shadow-2xl sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left Column: 2 Main Features */}
            <div className="space-y-6 lg:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-amber-400/50">
                <div className="flex items-center gap-2.5 text-xs font-black tracking-wider text-amber-300 uppercase">
                  <ShieldCheck className="h-5 w-5 text-amber-400" />
                  <span>BẢO MẬT DANH TÍNH HAI CHIỀU NGHIÊM NGẶT</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                  Các chuyên gia cấp cao có thể an tâm bật chế độ tìm việc ẩn danh. Thông tin liên hệ chỉ được chia sẻ
                  khi ứng viên đồng ý kết nối với doanh nghiệp của bạn, loại bỏ rủi ro lộ tin với công ty hiện tại.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-amber-400/50">
                <div className="flex items-center gap-2.5 text-xs font-black tracking-wider text-amber-300 uppercase">
                  <Zap className="h-5 w-5 text-amber-400" />
                  <span>ĐÁNH GIÁ NĂNG LỰC KIẾN TRÚC &amp; QUẢN TRỊ DỰ ÁN</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                  Hồ sơ được thẩm định bởi bài test System Design, High-load Optimization và kinh nghiệm dẫn dắt đội ngũ
                  kỹ thuật. Đảm bảo ứng viên có khả năng gánh vác các bài toán kiến trúc công nghệ phức tạp.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={onOpenConsultModal}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-amber-400 px-8 py-3.5 text-xs font-black text-slate-950 shadow-md transition-all hover:bg-amber-300 sm:text-sm"
                >
                  <Headphones className="h-4 w-4" />
                  <span>Tư vấn dịch vụ InterVue Pro</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <span className="text-xs text-slate-400">
                  Phí dịch vụ thành công, bảo hành ứng viên lên tới 60 ngày.
                </span>
              </div>
            </div>

            {/* Right Column: Visual Mockup of Senior Talent Card */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-amber-400/30 bg-slate-950 p-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/20 font-black text-amber-300">
                      ST
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white">Senior Tech Lead (Ẩn danh)</span>
                        <Lock className="h-3.5 w-3.5 text-amber-400" />
                      </div>
                      <span className="text-xs text-slate-400">8+ năm kinh nghiệm • Distributed Systems</span>
                    </div>
                  </div>
                  <span className="rounded-full bg-amber-400/20 px-2.5 py-1 text-xs font-black text-amber-300">
                    Pro Verified
                  </span>
                </div>

                <div className="mt-5 space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-white/5 py-1">
                    <span className="text-slate-400">Kiến trúc:</span>
                    <span className="font-semibold text-white">Microservices, Event-Driven, Kafka</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 py-1">
                    <span className="text-slate-400">Quy mô hệ thống:</span>
                    <span className="font-semibold text-white">50M+ requests/day, 99.99% SLA</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 py-1">
                    <span className="text-slate-400">Mức lương kỳ vọng:</span>
                    <span className="font-semibold text-emerald-400">60 - 85 Triệu VND / tháng</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-400">
                  <Check className="h-4 w-4 shrink-0" />
                  <span>Đã vượt qua thẩm định năng lực System Design bởi InterVue Board</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
