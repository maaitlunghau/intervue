'use client';

import { CheckCircle2, Quote, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';

const TESTIMONIALS = [
  {
    name: 'Nguyễn Thị Mai Lan',
    role: 'Head of Talent Acquisition',
    company: 'FPT Software',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    tag: 'AI CV Matcher',
    metric: 'Rút ngắn 60% thời gian lọc CV',
    content:
      'Với tính năng AI CV Matcher của InterVue, đội ngũ tuyển dụng của chúng tôi đã rút ngắn đáng kể thời gian sàng lọc ban đầu cho các vị trí Senior Fullstack và DevOps. Khả năng đối chiếu chuẩn xác từng framework rất ấn tượng!',
  },
  {
    name: 'Trần Đức Huy',
    role: 'Engineering Manager',
    company: 'Techcombank Digital',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    tag: 'Structured Technical Interview',
    metric: 'Tăng 94% độ khớp kỹ thuật',
    content:
      'Bộ câu hỏi phỏng vấn kỹ thuật phân tầng được AI gợi ý bám sát thực tế dự án của từng ứng viên, giúp vòng phỏng vấn chuyên môn diễn ra chính xác, chuyên sâu và tiết kiệm thời gian quý báu cho dàn Tech Lead.',
  },
  {
    name: 'Lê Hoàng Yến',
    role: 'HR Director',
    company: 'VNG Corporation',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    tag: 'InterVue Pro & Connect',
    metric: 'Tiếp cận Senior AI Talent',
    content:
      'Tính năng tìm kiếm lập trình viên chủ động mang lại nguồn ứng viên cực kỳ chất lượng, đặc biệt là các chuyên gia AI/ML vốn rất khan hiếm trên thị trường. Cơ chế chat 1-1 trên InterVue Connect phản hồi cực nhanh!',
  },
];

const PRESS_OUTLETS = [
  { name: 'VTV Digital', tag: 'Đài Truyền hình Việt Nam' },
  { name: 'VnExpress', tag: 'Báo điện tử nhiều người đọc nhất' },
  { name: 'CafeF', tag: 'Kênh tài chính & Doanh nghiệp' },
  { name: 'GenK', tag: 'Chuyên trang Công nghệ hàng đầu' },
  { name: 'Dân Trí', tag: 'Báo điện tử uy tín' },
  { name: 'Doanh Nhân Việt Nam', tag: 'Tạp chí kinh tế' },
];

export default function SocialProofAndMediaV2() {
  return (
    <section aria-label="Customer Success and Press" className="border-b border-[#E5E7EB] bg-white py-16 sm:py-24">
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00B14F]/20 bg-[#F0FDF4] px-4 py-1.5 text-xs font-bold text-[#009D46]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>ĐÁNH GIÁ TỪ DOANH NGHIỆP</span>
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-[#1E2837] sm:text-4xl">
            Các chuyên gia công nghệ <span className="text-[#00B14F]">nói gì về InterVue?</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[#6C757D] sm:text-base">
            Lắng nghe chia sẻ thực tế từ các Giám đốc nhân sự và Tech Lead tại các tập đoàn công nghệ hàng đầu Việt Nam.
          </p>
        </div>

        {/* Testimonials 3 Columns Grid */}
        <div className="mt-14 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.name}
              className="flex flex-col justify-between rounded-3xl border border-[#E5E7EB] bg-[#F8F9FA] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#00B14F]/40 hover:bg-white hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="h-7 w-7 text-emerald-400/40" />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                    {item.tag}
                  </span>
                  <span className="rounded-full border border-[#D1F2DF] bg-white px-2.5 py-0.5 text-[11px] font-bold text-[#009D46]">
                    {item.metric}
                  </span>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-[#4A5568] sm:text-sm sm:leading-relaxed">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              <div className="mt-6 border-t border-[#E5E7EB] pt-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={48}
                    height={48}
                    unoptimized
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-[#00B14F]/30"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-[#1E2837]">{item.name}</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#009D46]" />
                    </div>
                    <p className="text-xs text-[#6C757D]">
                      {item.role} • <strong className="text-[#1E2837]">{item.company}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Media & Press Network */}
        <div className="mt-16 border-t border-[#E5E7EB] pt-12">
          <p className="text-center text-xs font-bold tracking-widest text-[#6C757D] uppercase">
            BÁO CHÍ VÀ CỘNG ĐỒNG CÔNG NGHỆ NÓI VỀ INTERVUE
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            {PRESS_OUTLETS.map((press) => (
              <div
                key={press.name}
                className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F8F9FA] px-4 py-2.5 transition-all hover:border-[#00B14F]/40 hover:bg-white hover:shadow-2xs"
              >
                <span className="text-sm font-black text-[#1E2837]">{press.name}</span>
                <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-[#6C757D]">
                  {press.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
