'use client';

import { CheckCircle2, Mail, PhoneCall, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function FinalContactAndFooterCtaV2() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* 2-Column Contact Section (Touchpoint 3) */}
      <section
        aria-label="Contact InterVue Team"
        className="border-b border-[#E5E7EB] bg-[#0E3D23] py-16 text-white sm:py-24"
      >
        <div className="container-page">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left Contact Information */}
            <div className="space-y-6 lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-emerald-200">
                <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
                <span>KẾT NỐI TRỰC TIẾP</span>
              </div>

              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Trao đổi trực tiếp cùng <br />
                <span className="text-emerald-300">Đội ngũ chuyên gia InterVue</span>
              </h2>

              <p className="text-sm leading-relaxed text-emerald-100 sm:text-base">
                Chúng tôi luôn sẵn sàng lắng nghe mọi thách thức tuyển dụng công nghệ của doanh nghiệp bạn và đưa ra
                giải pháp phù hợp nhất trong vòng 24 giờ.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4.5 backdrop-blur-sm sm:p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-400 text-slate-900 shadow-xs">
                    <PhoneCall className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-200">Hotline tư vấn Nhà tuyển dụng (Giờ hành chính)</span>
                    <a
                      href="tel:0812665001"
                      className="block text-lg font-black text-white hover:text-emerald-300 sm:text-xl"
                    >
                      0812.665.001
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4.5 backdrop-blur-sm sm:p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-400 text-slate-900 shadow-xs">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-200">Hòm thư giải pháp Doanh nghiệp</span>
                    <a
                      href="mailto:cskh@intervue.vn"
                      className="block text-lg font-black text-white hover:text-emerald-300 sm:text-xl"
                    >
                      cskh@intervue.vn
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Fast Consultation Card (In-page Lead Form 3) */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-white/20 bg-white p-6 text-[#1E2837] shadow-2xl sm:p-10">
                <div className="border-b border-[#E5E7EB] pb-4">
                  <h3 className="text-xl font-black text-[#1E2837] sm:text-2xl">Gửi yêu cầu hỗ trợ nhanh</h3>
                  <p className="mt-1 text-xs text-[#6C757D] sm:text-sm">
                    Để lại thông tin và nội dung bạn cần hỗ trợ, chuyên viên sẽ phản hồi ngay.
                  </p>
                </div>

                {submitted ? (
                  <div className="py-8 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EBF8F1] text-[#009D46]">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h4 className="mt-4 text-lg font-black text-[#1E2837]">Gửi thành công!</h4>
                    <p className="mt-2 text-xs text-[#6C757D] sm:text-sm">
                      Chúng tôi đã nhận được thông tin từ bạn và sẽ liên hệ hỗ trợ qua số điện thoại{' '}
                      <strong className="text-[#1E2837]">{form.phone}</strong>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="final-name" className="block text-xs font-bold text-[#1E2837]">
                        Họ và tên của bạn *
                      </label>
                      <input
                        id="final-name"
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] px-4 py-2.5 text-xs text-[#1E2837] focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="final-phone" className="block text-xs font-bold text-[#1E2837]">
                          Số điện thoại *
                        </label>
                        <input
                          id="final-phone"
                          type="tel"
                          required
                          placeholder="0912 345 678"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="mt-1 w-full rounded-xl border border-[#D0D5DD] px-4 py-2.5 text-xs text-[#1E2837] focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="final-email" className="block text-xs font-bold text-[#1E2837]">
                          Email công ty *
                        </label>
                        <input
                          id="final-email"
                          type="email"
                          required
                          placeholder="hr@congty.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="mt-1 w-full rounded-xl border border-[#D0D5DD] px-4 py-2.5 text-xs text-[#1E2837] focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="final-message" className="block text-xs font-bold text-[#1E2837]">
                        Nội dung cần tư vấn
                      </label>
                      <textarea
                        id="final-message"
                        rows={3}
                        placeholder="vd: Công ty tôi cần tuyển 5 Senior Java và 2 DevOps trong tháng tới..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] px-4 py-2.5 text-xs text-[#1E2837] focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#009D46] py-3 text-sm font-bold text-white shadow-xs transition-all hover:bg-[#00873c]"
                    >
                      <Send className="h-4 w-4" />
                      <span>Gửi yêu cầu trao đổi</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
