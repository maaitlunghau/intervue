'use client';

import { CheckCircle2, PhoneCall, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function EnterpriseConsultSectionV2() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    teamSize: '10 - 50 kỹ sư',
    need: 'Gói giải pháp Doanh nghiệp toàn diện',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      aria-label="Enterprise Solutions Consultation"
      className="border-b border-[#E5E7EB] bg-[#006C3B] py-16 text-white sm:py-24"
    >
      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Visual & Value Pitch */}
          <div className="space-y-6 lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-emerald-200 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              <span>ĐỒNG HÀNH CÙNG DOANH NGHIỆP CÔNG NGHỆ</span>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
              Đâu là giải pháp phù hợp nhất cho Doanh nghiệp của bạn?
            </h2>

            <p className="text-sm leading-relaxed text-emerald-100 sm:text-base">
              Mỗi doanh nghiệp IT đều có bài toán tuyển dụng riêng. Đội ngũ chuyên gia của InterVue sẽ phân tích nhu cầu
              thực tế và thiết kế lộ trình thu hút nhân tài tối ưu ngân sách nhất.
            </p>

            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <span className="block text-2xl font-black text-emerald-300">24 Giờ</span>
                <span className="mt-1 block text-xs text-emerald-100">Thời gian trung bình kết nối ứng viên</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <span className="block text-2xl font-black text-emerald-300">94%</span>
                <span className="mt-1 block text-xs text-emerald-100">Độ chính xác so khớp kỹ năng AI</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-200">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              <span>Cam kết bảo mật thông tin tuyển dụng &amp; đồng hành hỗ trợ 24/7.</span>
            </div>
          </div>

          {/* Right Column: In-page Enterprise Consultation Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-white/20 bg-white p-6 text-[#1E2837] shadow-2xl sm:p-10">
              <div className="border-b border-[#E5E7EB] pb-4">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  TƯ VẤN DOANH NGHIỆP VIP
                </span>
                <h3 className="mt-2 text-xl font-black text-[#1E2837] sm:text-2xl">
                  Để lại thông tin nhận tư vấn chuyên sâu
                </h3>
                <p className="mt-1 text-xs text-[#6C757D] sm:text-sm">
                  Chúng tôi sẽ gửi đề xuất gói giải pháp và bảng giá chi tiết qua email.
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EBF8F1] text-[#009D46]">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="mt-4 text-lg font-black text-[#1E2837]">Đã nhận yêu cầu thành công!</h4>
                  <p className="mt-2 text-xs text-[#6C757D] sm:text-sm">
                    Chuyên viên phụ trách khách hàng doanh nghiệp sẽ liên hệ với{' '}
                    <strong className="text-[#1E2837]">{form.fullName}</strong> ({form.company}) trong thời gian sớm
                    nhất.
                  </p>
                  <div className="mt-6">
                    <a
                      href="tel:0812665001"
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
                    >
                      <PhoneCall className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Hotline doanh nghiệp: 0812.665.001</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ent-name" className="block text-xs font-bold text-[#1E2837]">
                        Họ và tên của bạn *
                      </label>
                      <input
                        id="ent-name"
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] px-4 py-2.5 text-xs text-[#1E2837] focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="ent-company" className="block text-xs font-bold text-[#1E2837]">
                        Tên công ty / Doanh nghiệp *
                      </label>
                      <input
                        id="ent-company"
                        type="text"
                        required
                        placeholder="vd: FPT Software, Tech Corp"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] px-4 py-2.5 text-xs text-[#1E2837] focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ent-phone" className="block text-xs font-bold text-[#1E2837]">
                        Số điện thoại *
                      </label>
                      <input
                        id="ent-phone"
                        type="tel"
                        required
                        placeholder="0912 345 678"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] px-4 py-2.5 text-xs text-[#1E2837] focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="ent-email" className="block text-xs font-bold text-[#1E2837]">
                        Email công việc *
                      </label>
                      <input
                        id="ent-email"
                        type="email"
                        required
                        placeholder="contact@congty.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] px-4 py-2.5 text-xs text-[#1E2837] focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ent-size" className="block text-xs font-bold text-[#1E2837]">
                        Quy mô tuyển dụng năm nay
                      </label>
                      <select
                        id="ent-size"
                        value={form.teamSize}
                        onChange={(e) => setForm({ ...form, teamSize: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] bg-white px-4 py-2.5 text-xs text-[#1E2837] focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      >
                        <option value="Dưới 10 kỹ sư">Dưới 10 kỹ sư</option>
                        <option value="10 - 50 kỹ sư">10 - 50 kỹ sư</option>
                        <option value="50 - 200 kỹ sư">50 - 200 kỹ sư</option>
                        <option value="Trên 200 kỹ sư (Quy mô lớn)">Trên 200 kỹ sư (Quy mô lớn)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="ent-need" className="block text-xs font-bold text-[#1E2837]">
                        Giải pháp quan tâm
                      </label>
                      <select
                        id="ent-need"
                        value={form.need}
                        onChange={(e) => setForm({ ...form, need: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D0D5DD] bg-white px-4 py-2.5 text-xs text-[#1E2837] focus:border-[#00B14F] focus:ring-2 focus:ring-[#00B14F]/20 focus:outline-none sm:text-sm"
                      >
                        <option value="Gói giải pháp Doanh nghiệp toàn diện">Gói giải pháp Enterprise</option>
                        <option value="Săn nhân sự cấp cao InterVue Pro">Tuyển dụng InterVue Pro</option>
                        <option value="Tích hợp ATS nội bộ qua API">Tích hợp ATS qua API</option>
                        <option value="Hợp tác trường ĐH & Education Code">Hợp tác trường ĐH (Academic)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#009D46] py-3 text-sm font-bold text-white shadow-xs transition-all hover:bg-[#00873c]"
                  >
                    <Send className="h-4 w-4" />
                    <span>Gửi yêu cầu tư vấn Doanh nghiệp</span>
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
