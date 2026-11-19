'use client';

import { ROUTES } from '@/constants/routes';
import { ArrowRight, CheckCircle2, PhoneCall, Send, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const STEPS = [
  {
    step: '1',
    title: 'Đăng ký tài khoản Nhà tuyển dụng',
    desc: 'Chỉ mất 1 phút để tạo tài khoản doanh nghiệp và xác thực thông tin nhanh chóng.',
  },
  {
    step: '2',
    title: 'Đăng tin tuyển dụng cùng trợ lý AI',
    desc: 'Khởi tạo tin đăng chuyên nghiệp, AI tự động gợi ý bộ tiêu chí kỹ thuật chuẩn xác.',
  },
  {
    step: '3',
    title: 'Tiếp nhận CV và kết nối phỏng vấn',
    desc: 'AI tự động chấm điểm độ khớp của CV, chat 1-1 trực tiếp với ứng viên trên hệ thống.',
  },
];

export default function QuickStartWithConsultFormV2() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Hà Nội',
    need: 'Đăng tin tuyển dụng IT miễn phí',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section aria-label="Quick Start & Consultation" className="border-b border-[#E5E7EB] bg-[#F8F9FA] py-16 sm:py-24">
      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: 3 Steps */}
          <div className="space-y-6 lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00B14F]/20 bg-[#F0FDF4] px-4 py-1.5 text-xs font-bold text-[#009D46]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>BẮT ĐẦU DỄ DÀNG</span>
            </div>

            <h2 className="text-2xl font-black tracking-tight text-[#1E2837] sm:text-4xl">
              Tuyển dụng IT thành công <br />
              <span className="text-[#00B14F]">chỉ với 3 bước đơn giản</span>
            </h2>

            <p className="text-sm leading-relaxed text-[#6C757D] sm:text-base">
              Không cần quy trình phức tạp. InterVue tối ưu hóa mọi điểm chạm để doanh nghiệp có thể tiếp cận ngay những
              kỹ sư phần mềm chất lượng cao nhất.
            </p>

            <div className="space-y-4 pt-2">
              {STEPS.map((s) => (
                <div
                  key={s.step}
                  className="flex items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-4.5 shadow-2xs sm:p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#009D46] text-sm font-bold text-white shadow-xs">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1E2837]">{s.title}</h3>
                    <p className="mt-1 text-xs text-[#6C757D] sm:text-sm">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href={ROUTES.RECRUITER_REGISTER}
                className="inline-flex items-center gap-2 rounded-full bg-[#009D46] px-8 py-3 text-sm font-bold text-white shadow-xs transition-all hover:bg-[#00873c]"
              >
                <span>Đăng ký tài khoản ngay</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: In-page Consultation Form (Touchpoint 1) */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-[#D1F2DF] bg-white p-6 shadow-md sm:p-10">
              <div className="border-b border-[#E5E7EB] pb-4">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  TƯ VẤN MIỄN PHÍ 1-ON-1
                </span>
                <h3 className="mt-2 text-xl font-black text-[#1E2837] sm:text-2xl">Đăng ký nhận tư vấn tuyển dụng</h3>
                <p className="mt-1 text-xs text-[#6C757D] sm:text-sm">
                  Chuyên viên giải pháp của InterVue sẽ liên hệ hỗ trợ bạn trong vòng 15 phút.
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EBF8F1] text-[#009D46]">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="mt-4 text-lg font-black text-[#1E2837]">Gửi yêu cầu thành công!</h4>
                  <p className="mt-2 text-xs text-[#6C757D] sm:text-sm">
                    Cảm ơn bạn. Chuyên viên InterVue sẽ gọi điện hỗ trợ cho bạn qua số điện thoại{' '}
                    <strong className="text-[#1E2837]">{form.phone}</strong> sớm nhất.
                  </p>
                  <div className="mt-6">
                    <a
                      href="tel:0812665001"
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
                    >
                      <PhoneCall className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Hotline hỗ trợ nhanh: 0812.665.001</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="quick-fullname" className="block text-xs font-bold text-[#1E2837]">
                      Họ và tên của bạn *
                    </label>
                    <input
                      id="quick-fullname"
                      type="text"
                      required
                      placeholder="vd: Nguyễn Thị Mai Lan (HR Manager)"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#D0D5DD] px-4 py-2.5 text-xs text-[#1E2837] placeholder:text-slate-400 focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="quick-phone" className="block text-xs font-bold text-[#1E2837]">
                        Số điện thoại liên hệ *
                      </label>
                      <input
                        id="quick-phone"
                        type="tel"
                        required
                        placeholder="0912 345 678"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] px-4 py-2.5 text-xs text-[#1E2837] placeholder:text-slate-400 focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="quick-email" className="block text-xs font-bold text-[#1E2837]">
                        Email công ty *
                      </label>
                      <input
                        id="quick-email"
                        type="email"
                        required
                        placeholder="hr@congty.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] px-4 py-2.5 text-xs text-[#1E2837] placeholder:text-slate-400 focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="quick-city" className="block text-xs font-bold text-[#1E2837]">
                        Khu vực / Tỉnh thành
                      </label>
                      <select
                        id="quick-city"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] bg-white px-4 py-2.5 text-xs text-[#1E2837] focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      >
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                        <option value="Đà Nẵng">Đà Nẵng</option>
                        <option value="Toàn quốc / Remote">Toàn quốc / Remote</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="quick-need" className="block text-xs font-bold text-[#1E2837]">
                        Nhu cầu tuyển dụng
                      </label>
                      <select
                        id="quick-need"
                        value={form.need}
                        onChange={(e) => setForm({ ...form, need: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] bg-white px-4 py-2.5 text-xs text-[#1E2837] focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      >
                        <option value="Đăng tin tuyển dụng IT miễn phí">Đăng tin IT miễn phí</option>
                        <option value="Gói tuyển dụng Growth Pro">Gói tuyển dụng Growth Pro</option>
                        <option value="Săn nhân sự cấp cao InterVue Pro">Tuyển dụng InterVue Pro</option>
                        <option value="Giải pháp Doanh nghiệp lớn (Enterprise)">Giải pháp Enterprise</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#009D46] py-3 text-sm font-bold text-white shadow-xs transition-all hover:bg-[#00873c]"
                  >
                    <Send className="h-4 w-4" />
                    <span>Đăng ký nhận tư vấn ngay</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
