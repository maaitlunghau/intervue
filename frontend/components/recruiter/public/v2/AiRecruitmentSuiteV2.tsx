'use client';

import { ROUTES } from '@/constants/routes';
import { ArrowRight, CheckCircle2, Cpu, Headphones } from 'lucide-react';
import Link from 'next/link';

interface AiRecruitmentSuiteV2Props {
  onOpenConsultModal?: () => void;
}

const AI_BLOCKS = [
  {
    step: '01',
    badge: 'AI JD GENERATOR',
    title: 'AI gợi ý và kiểm duyệt nội dung tin đăng tự động',
    desc: 'Không cần lo lắng nếu HR không rành kỹ thuật sâu. InterVue AI tự động gợi ý bộ kỹ năng, trách nhiệm và đãi ngộ theo đúng chuẩn của từng ngôn ngữ lập trình.',
    features: [
      'Tự động sinh JD chuyên nghiệp chỉ bằng cách nhập chức danh (vd: Backend Go, Frontend React)',
      'Tự động bóc tách và phân loại trường thông tin khi bạn copy-paste JD có sẵn',
      'Đề xuất mức lương cạnh tranh theo mặt bằng thị trường IT Việt Nam',
    ],
    highlight: 'Tiết kiệm 85% thời gian tạo tin tuyển dụng',
    mockupType: 'jd',
  },
  {
    step: '02',
    badge: 'AI CV SCORING & MATCHING',
    title: 'AI chấm điểm độ phù hợp của CV theo từng Framework',
    desc: 'Hệ thống AI bóc tách sâu kinh nghiệm thực tế, project architecture và đối chiếu trực tiếp với yêu cầu tuyển dụng để cho ra điểm số % Matching khách quan.',
    features: [
      'Chấm điểm % tương thích chính xác đến từng framework, công nghệ (Docker, K8s, Redis, Spring Boot)',
      'Tự động xếp hạng ứng viên từ cao xuống thấp ngay khi nhận CV',
      'Đưa ra nhận xét khách quan về điểm mạnh và khoảng trống kỹ thuật của từng ứng viên',
    ],
    highlight: 'Độ chính xác so khớp kỹ thuật lên tới 94%',
    mockupType: 'cv',
  },
  {
    step: '03',
    badge: 'AI CANDIDATE RECOMMENDATION',
    title: 'AI tự động đề xuất ứng viên tiềm năng cho tin tuyển dụng',
    desc: 'Ngay khi tin tuyển dụng của bạn được kích hoạt, thuật toán AI sẽ tự động rà soát kho hơn 50.000+ nhân tài IT để đề xuất danh sách kỹ sư phù hợp nhất.',
    features: [
      'Chủ động kết nối với các ứng viên đang bật chế độ tìm việc tương thích nhất',
      'Tùy chỉnh linh hoạt chân dung ứng viên: số năm kinh nghiệm, khu vực, mức lương mong muốn',
      'Dữ liệu hồ sơ cập nhật theo thời gian thực từ các dự án và chứng chỉ thực tế',
    ],
    highlight: 'Kết nối ứng viên phù hợp trong vòng 24 giờ',
    mockupType: 'recommend',
  },
];

export default function AiRecruitmentSuiteV2({ onOpenConsultModal }: AiRecruitmentSuiteV2Props) {
  return (
    <section aria-label="AI Recruitment Suite" className="border-b border-[#E5E7EB] bg-white py-16 sm:py-24">
      <div className="container-page">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00B14F]/20 bg-[#F0FDF4] px-4 py-1.5 text-xs font-bold text-[#009D46]">
            <Cpu className="h-3.5 w-3.5" />
            <span>VŨ KHÍ CÔNG NGHỆ ĐỘC QUYỀN</span>
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-[#1E2837] sm:text-4xl">
            Bộ ba công nghệ AI <span className="text-[#00B14F]">định hình tuyển dụng IT</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[#6C757D] sm:text-base">
            <em>&ldquo;InterVue AI gợi ý thông minh — Nhà tuyển dụng ra quyết định chuẩn xác.&rdquo;</em> Giúp đội ngũ
            HR và Tech Leader loại bỏ 90% công việc thủ công nhàm chán.
          </p>
        </div>

        {/* 3 Horizontal Blocks Stack */}
        <div className="mt-14 space-y-10">
          {AI_BLOCKS.map((block) => (
            <div
              key={block.step}
              className="group overflow-hidden rounded-3xl border border-[#E5E7EB] bg-[#F8F9FA] p-6 transition-all duration-300 hover:border-[#00B14F]/50 hover:bg-white hover:shadow-lg sm:p-10"
            >
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                {/* Left Description Column */}
                <div className="space-y-4 lg:col-span-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#009D46] text-xs font-bold text-white">
                      {block.step}
                    </span>
                    <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800">
                      {block.badge}
                    </span>
                    <span className="text-xs font-semibold text-[#009D46]">{block.highlight}</span>
                  </div>

                  <h3 className="text-xl font-black text-[#1E2837] sm:text-2xl">{block.title}</h3>

                  <p className="text-xs leading-relaxed text-[#6C757D] sm:text-sm sm:leading-relaxed">{block.desc}</p>

                  <ul className="mt-4 space-y-2.5">
                    {block.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#1E2837] sm:text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#009D46]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Interactive Visual Simulation */}
                <div className="lg:col-span-5">
                  <div className="relative overflow-hidden rounded-2xl border border-[#D1F2DF] bg-white p-5 shadow-sm">
                    {block.mockupType === 'jd' && (
                      <div className="space-y-3 font-sans text-xs">
                        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                          <span className="font-bold text-[#1E2837]">Tạo JD thông minh cùng AI</span>
                          <span className="rounded bg-emerald-50 px-2 py-0.5 font-bold text-[#009D46]">
                            30s hoàn tất
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          <div className="h-3 w-3/4 rounded bg-slate-200" />
                          <div className="h-3 w-full rounded bg-slate-100" />
                          <div className="h-3 w-5/6 rounded bg-slate-100" />
                        </div>
                        <div className="rounded-lg bg-emerald-50/80 p-2.5 text-[11px] text-[#009D46]">
                          ✓ Đã thêm 8 câu hỏi phỏng vấn kỹ thuật phân tầng
                        </div>
                      </div>
                    )}

                    {block.mockupType === 'cv' && (
                      <div className="space-y-3 font-sans text-xs">
                        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                          <span className="font-bold text-[#1E2837]">Độ khớp kỹ năng CV</span>
                          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-black text-emerald-800">
                            94% Match
                          </span>
                        </div>
                        <div className="space-y-2 text-[11px]">
                          <div>
                            <div className="flex justify-between font-semibold text-[#1E2837]">
                              <span>Microservices Architecture & Go</span>
                              <span className="text-[#009D46]">100%</span>
                            </div>
                            <div className="mt-1 h-2 w-full rounded-full bg-slate-100">
                              <div className="h-2 rounded-full bg-[#009D46]" style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between font-semibold text-[#1E2837]">
                              <span>Kubernetes & CI/CD Cloud</span>
                              <span className="text-[#009D46]">90%</span>
                            </div>
                            <div className="mt-1 h-2 w-full rounded-full bg-slate-100">
                              <div className="h-2 rounded-full bg-[#009D46]" style={{ width: '90%' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {block.mockupType === 'recommend' && (
                      <div className="space-y-2.5 font-sans text-xs">
                        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                          <span className="font-bold text-[#1E2837]">Top Ứng viên AI Đề xuất</span>
                          <span className="text-[10px] font-bold text-[#009D46]">Cập nhật 2 phút trước</span>
                        </div>
                        {[
                          { name: 'Nguyễn Văn A', role: 'Senior Go Engineer', score: '98%' },
                          { name: 'Trần Bảo Ngọc', role: 'Fullstack React/Node', score: '94%' },
                          { name: 'Lê Minh Tuấn', role: 'DevOps & SRE Specialist', score: '92%' },
                        ].map((dev, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between rounded-lg border border-[#E5E7EB] bg-[#F8F9FA] p-2"
                          >
                            <div>
                              <p className="font-bold text-[#1E2837]">{dev.name}</p>
                              <p className="text-[10px] text-[#6C757D]">{dev.role}</p>
                            </div>
                            <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-black text-[#009D46]">
                              {dev.score}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Row */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={onOpenConsultModal}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-[#00B14F] bg-white px-7 py-3 text-xs font-bold text-[#00B14F] transition-all hover:bg-emerald-50 sm:text-sm"
          >
            <Headphones className="h-4 w-4" />
            <span>Tư vấn công nghệ AI</span>
          </button>

          <Link
            href={ROUTES.RECRUITER_REGISTER}
            className="flex items-center gap-2 rounded-full bg-[#009D46] px-8 py-3 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#00873c] sm:text-sm"
          >
            <span>Trải nghiệm AI miễn phí</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
