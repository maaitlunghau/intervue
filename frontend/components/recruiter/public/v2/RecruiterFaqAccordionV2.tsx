'use client';

import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface RecruiterFaqAccordionV2Props {
  onOpenConsultModal?: () => void;
}

const FAQS = [
  {
    q: 'InterVue khác gì so với các trang tuyển dụng tổng hợp trên thị trường?',
    a: 'InterVue tập trung 100% chuyên sâu vào ngành Công nghệ Thông tin (IT). Hệ thống AI được tinh chỉnh để đọc hiểu sâu các ngôn ngữ lập trình, framework, cloud architecture, đồng thời 100% hồ sơ ứng viên được xác thực danh tính eKYC, hạn chế tối đa tình trạng rải CV ảo và giúp nhà tuyển dụng tiết kiệm tới 60% thời gian sàng lọc kỹ thuật.',
  },
  {
    q: 'Doanh nghiệp mới có được đăng tin tuyển dụng IT miễn phí không?',
    a: 'Hoàn toàn có! Mọi doanh nghiệp mới khi đăng ký tài khoản tại InterVue đều được kích hoạt ngay gói Starter với 3 tin đăng tuyển dụng IT miễn phí vĩnh viễn và 30 lượt AI chấm điểm CV tự động, trải nghiệm đầy đủ bảng Kanban quản trị ứng viên.',
  },
  {
    q: 'Đăng tin miễn phí và các gói dịch vụ trả phí khác nhau như thế nào?',
    a: 'Gói trả phí (Growth Pro, Enterprise) cung cấp số lượng tin đăng và lượt sàng lọc AI không giới hạn, tính năng gợi ý bộ câu hỏi phỏng vấn kỹ thuật phân tầng theo từng level, huy hiệu Doanh nghiệp uy tín (Top IT Company), và vị trí ưu tiên hiển thị trên trang chủ để tiếp cận tối đa ứng viên.',
  },
  {
    q: 'Thời gian kết nối phỏng vấn với lập trình viên mất bao lâu?',
    a: 'Nhờ tính năng InterVue Connect (Chat trực tiếp 1-1 giữa nhà tuyển dụng và ứng viên), tỷ lệ phản hồi đạt trên 85% và thời gian trung bình từ lúc gửi tin nhắn đến khi chốt lịch phỏng vấn là dưới 24 giờ, thay vì phải chờ đợi phản hồi email kéo dài nhiều ngày.',
  },
  {
    q: 'Gói Doanh nghiệp Enterprise hỗ trợ tích hợp với những hệ thống nào?',
    a: 'Gói Enterprise cung cấp RESTful API và Webhook để đồng bộ hai chiều trực tiếp với hệ thống phần mềm quản trị nhân sự nội bộ (ATS) của doanh nghiệp, hỗ trợ tùy chỉnh tiêu chí chấm điểm AI theo chuẩn công ty, đồng thời xuất hóa đơn VAT điện tử và có chuyên viên hỗ trợ riêng 24/7.',
  },
];

export default function RecruiterFaqAccordionV2({ onOpenConsultModal }: RecruiterFaqAccordionV2Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section aria-label="Frequently Asked Questions" className="border-b border-[#E5E7EB] bg-[#F8F9FA] py-16 sm:py-24">
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00B14F]/20 bg-[#F0FDF4] px-4 py-1.5 text-xs font-bold text-[#009D46]">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>CÂU HỎI THƯỜNG GẶP (FAQ)</span>
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-[#1E2837] sm:text-4xl">
            Giải đáp băn khoăn của <span className="text-[#00B14F]">Nhà tuyển dụng</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[#6C757D] sm:text-base">
            Tổng hợp các thắc mắc phổ biến nhất về chính sách đăng tin, chi phí, công nghệ AI và cách kết nối ứng viên
            IT tại InterVue.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mx-auto mt-12 max-w-3xl space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-200 hover:border-[#00B14F]/40"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full cursor-pointer items-center justify-between p-5 text-left sm:p-6"
                >
                  <span className="pr-4 text-sm font-bold text-[#1E2837] sm:text-base">{faq.q}</span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#009D46] text-white' : 'bg-[#F8F9FA] text-[#6C757D]'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-[#E5E7EB] px-5 py-4.5 text-xs leading-relaxed text-[#6C757D] sm:px-6 sm:py-5 sm:text-sm sm:leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA trigger */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#6C757D] sm:text-sm">
            Bạn vẫn còn câu hỏi khác cần được tư vấn chi tiết?{' '}
            <button
              type="button"
              onClick={onOpenConsultModal}
              className="cursor-pointer font-bold text-[#009D46] underline hover:text-[#00873c]"
            >
              Liên hệ với chuyên viên tư vấn ngay ➔
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
