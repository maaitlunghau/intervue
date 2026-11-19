'use client';

import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  FileText,
  Headphones,
  Layers,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface SmartRecruitmentPlatformV2Props {
  onOpenConsultModal?: () => void;
}

const SRP_TABS = [
  {
    id: 'job-posting',
    icon: FileText,
    label: 'Đăng tin tuyển dụng IT',
    title: 'Đăng tin thông minh cùng AI tối ưu chuẩn SEO',
    desc: 'Khởi tạo tin tuyển dụng nhanh chóng với sự hỗ trợ của AI. Tự động chuẩn hóa kỹ năng, framework và đề xuất mức lương thị trường cạnh tranh.',
    benefits: [
      'Gợi ý JD chuẩn xác theo từng ngôn ngữ và vị trí (Frontend, Backend, DevOps, AI)',
      'Tự động tối ưu hóa từ khóa kỹ thuật giúp tin đạt vị trí cao trên Google & AI Search',
      'Đẩy TOP tự động vào các khung giờ vàng nhiều lập trình viên truy cập nhất',
    ],
    tag: 'Tăng 3.5x lượt ứng tuyển',
  },
  {
    id: 'talent-search',
    icon: Search,
    label: 'Săn hồ sơ IT chủ động',
    title: 'Tìm kiếm nhân tài công nghệ theo Tech Stack',
    desc: 'Chủ động tiếp cận kho hồ sơ IT chất lượng cao mà không cần chờ đợi ứng viên nộp đơn. Bộ lọc sâu theo framework, số năm kinh nghiệm và mức lương.',
    benefits: [
      'Bộ lọc chuyên sâu: Ngôn ngữ lập trình, Cloud platform, Database, Architecture',
      'Điểm số AI Matching hiển thị trực tiếp trên từng hồ sơ ứng viên',
      '100% ứng viên đã xác thực danh tính eKYC, hạn chế tối đa hồ sơ ảo',
    ],
    tag: '50.000+ Hồ sơ đã xác thực',
  },
  {
    id: 'connect-chat',
    icon: MessageSquare,
    label: 'InterVue Connect (Chat 1-1)',
    title: 'Kết nối và phỏng vấn trực tiếp tức thì',
    desc: 'Phá bỏ rào cản gửi email truyền thống với tỷ lệ phản hồi thấp. Nhắn tin trực tiếp 1-1 với lập trình viên, trao đổi kỹ thuật và đặt lịch phỏng vấn.',
    benefits: [
      'Tỷ lệ phản hồi tin nhắn đạt trên 85% trong vòng 24 giờ',
      'Gửi thư mời phỏng vấn kỹ thuật và nhận xác nhận trực tiếp trong khung chat',
      'Bảo mật thông tin trao đổi giữa nhà tuyển dụng và ứng viên',
    ],
    tag: 'Phản hồi trong 24 giờ',
  },
  {
    id: 'employer-branding',
    icon: Sparkles,
    label: 'Truyền thông thương hiệu',
    title: 'Định vị thương hiệu Nhà tuyển dụng công nghệ',
    desc: 'Gia tăng độ nhận diện thương hiệu tuyển dụng trong mắt cộng đồng lập trình viên thông qua hệ thống Banner tài trợ và chuyên trang Company Profile.',
    benefits: [
      'Chuyên trang tuyển dụng độc quyền (Company Tech Profile) chuẩn công nghệ',
      'Vị trí Banner tài trợ nổi bật trên trang chủ và trang danh mục việc làm',
      'Tăng 5 lần mức độ tin cậy và thu hút các kỹ sư phần mềm cấp cao',
    ],
    tag: 'Tăng 5x độ nhận diện',
  },
  {
    id: 'ats-integration',
    icon: Layers,
    label: 'ATS Kanban & Tích hợp API',
    title: 'Quản trị phễu tuyển dụng và đồng bộ dữ liệu',
    desc: 'Theo dõi hành trình ứng viên trực quan trên bảng Kanban. Dễ dàng đồng bộ trạng thái hồ sơ về hệ thống quản lý nội bộ qua RESTful API chuẩn hóa.',
    benefits: [
      'Phễu Kanban kéo thả mượt mà: Mới nộp, Khớp AI, Phỏng vấn, Offer, Tuyển dụng',
      'Chấm điểm và phân tầng câu hỏi phỏng vấn theo kinh nghiệm ứng viên',
      'Hỗ trợ Webhook và API kết nối thông suốt với phần mềm ATS doanh nghiệp',
    ],
    tag: 'Tiết kiệm 70% thời gian',
  },
];

export default function SmartRecruitmentPlatformV2({ onOpenConsultModal }: SmartRecruitmentPlatformV2Props) {
  const [activeTabId, setActiveTabId] = useState(SRP_TABS[0].id);
  const activeTab = SRP_TABS.find((t) => t.id === activeTabId) ?? SRP_TABS[0];

  return (
    <section
      id="solutions"
      aria-label="Smart Recruitment Platform"
      className="border-b border-[#E5E7EB] bg-[#F8F9FA] py-16 sm:py-24"
    >
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00B14F]/20 bg-[#F0FDF4] px-4 py-1.5 text-xs font-bold text-[#009D46]">
            <Bot className="h-3.5 w-3.5" />
            <span>INTERVUE SMART RECRUITMENT PLATFORM (SRP)</span>
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-[#1E2837] sm:text-4xl">
            Nền tảng tuyển dụng IT toàn diện <span className="text-[#00B14F]">ứng dụng AI</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[#6C757D] sm:text-base">
            Hệ sinh thái công nghệ khép kín giải quyết trọn vẹn bài toán tuyển dụng IT: từ tạo nguồn hồ sơ, sàng lọc kỹ
            thuật, đến phỏng vấn và quản trị ứng viên hiệu suất cao.
          </p>
        </div>

        {/* Master-Detail Tabs Layout */}
        <div className="mt-14 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left: 5 Nav Tabs */}
          <div className="flex flex-col justify-between space-y-3 lg:col-span-5">
            {SRP_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabId(tab.id)}
                  className={cn(
                    'group flex w-full cursor-pointer items-center justify-between rounded-2xl border p-4.5 text-left transition-all duration-200 sm:p-5',
                    isActive
                      ? 'border-[#00B14F] bg-white shadow-md ring-1 ring-[#00B14F]/20'
                      : 'border-[#E5E7EB] bg-white/70 hover:border-[#00B14F]/40 hover:bg-white',
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors',
                        isActive
                          ? 'bg-[#009D46] text-white shadow-xs'
                          : 'bg-[#F0FDF4] text-[#009D46] group-hover:bg-[#009D46] group-hover:text-white',
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span
                        className={cn(
                          'block text-sm font-bold sm:text-base',
                          isActive ? 'text-[#1E2837]' : 'text-[#344054]',
                        )}
                      >
                        {tab.label}
                      </span>
                      <span className="text-xs font-semibold text-[#009D46]">{tab.tag}</span>
                    </div>
                  </div>

                  <ChevronRight
                    className={cn(
                      'h-5 w-5 transition-transform duration-200',
                      isActive ? 'rotate-90 text-[#009D46]' : 'text-slate-400 group-hover:text-slate-600',
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Rich Interactive Mockup Dashboard */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#D1F2DF] bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
            {/* Top Detail Meta */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E7EB] pb-5">
                <div>
                  <span className="text-xs font-bold text-[#009D46] uppercase">Giải pháp chuyên sâu</span>
                  <h3 className="mt-1 text-xl font-black text-[#1E2837] sm:text-2xl">{activeTab.title}</h3>
                </div>
                <span className="rounded-full border border-[#D1F2DF] bg-[#F0FDF4] px-3 py-1 text-xs font-bold text-[#009D46]">
                  {activeTab.tag}
                </span>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-[#6C757D] sm:text-sm sm:leading-relaxed">
                {activeTab.desc}
              </p>

              {/* Benefits Checklist */}
              <ul className="mt-5 space-y-2.5">
                {activeTab.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#1E2837] sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#009D46]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dynamic Interactive Software Mockup depending on active Tab */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F8F9FA] p-4 sm:p-5">
              {activeTabId === 'job-posting' && (
                <div className="space-y-3 font-sans">
                  <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-3 w-3 rounded-full bg-red-400" />
                      <span className="flex h-3 w-3 rounded-full bg-amber-400" />
                      <span className="flex h-3 w-3 rounded-full bg-emerald-400" />
                      <span className="ml-2 text-xs font-bold text-[#1E2837]">InterVue AI Job Editor</span>
                    </div>
                    <span className="flex items-center gap-1 rounded-md bg-[#009D46] px-2 py-0.5 text-[10px] font-bold text-white">
                      <Sparkles className="h-3 w-3" />
                      AI SEO 98/100
                    </span>
                  </div>

                  <div className="rounded-xl border border-[#E5E7EB] bg-white p-3.5 shadow-2xs">
                    <p className="text-xs font-bold text-[#1E2837]">Senior Fullstack Engineer (Go / React / K8s)</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-[#009D46]">
                        Golang
                      </span>
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-[#009D46]">
                        React 19
                      </span>
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-[#009D46]">
                        Kubernetes
                      </span>
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-[#009D46]">
                        PostgreSQL
                      </span>
                      <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-700">
                        40 - 55M VND
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-emerald-50/80 p-3 text-xs text-[#009D46]">
                    <div className="flex items-center gap-2 font-semibold">
                      <Bot className="h-4 w-4" />
                      <span>Đã gợi ý 12 tiêu chí sàng lọc kỹ thuật tự động</span>
                    </div>
                    <span className="cursor-pointer font-bold underline">Xem trước tin đăng</span>
                  </div>
                </div>
              )}

              {activeTabId === 'talent-search' && (
                <div className="space-y-3 font-sans">
                  <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2.5">
                    <span className="text-xs font-bold text-[#1E2837]">Tìm kiếm lập trình viên chủ động</span>
                    <span className="text-[11px] font-bold text-[#009D46]">Tìm thấy 1.420 hồ sơ phù hợp</span>
                  </div>

                  <div className="rounded-xl border border-[#D1F2DF] bg-white p-3.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                          TH
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-[#1E2837]">Trần Huy Hoàng</span>
                            <span className="py-0.2 flex items-center gap-0.5 rounded-full bg-emerald-100 px-1.5 text-[9px] font-bold text-emerald-800">
                              <ShieldCheck className="h-3 w-3" /> eKYC Verified
                            </span>
                          </div>
                          <span className="text-[11px] text-[#6C757D]">Senior DevOps & Cloud Architect • 5 năm kn</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-black text-[#009D46]">
                          96% Match
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTabId === 'connect-chat' && (
                <div className="space-y-2.5 font-sans">
                  <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      <span className="text-xs font-bold text-[#1E2837]">InterVue Connect 1-on-1</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Trực tuyến</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="rounded-xl border border-[#E5E7EB] bg-white p-2.5 text-[#1E2837]">
                      Chào bạn! Chúng tôi đã xem qua profile Kubernetes & Go của bạn trên InterVue. Rất ấn tượng!
                    </div>
                    <div className="ml-auto w-4/5 rounded-xl bg-[#009D46] p-2.5 text-white">
                      Dạ em chào anh/chị! Em đang sẵn sàng cho cơ hội mới. Em có thể phỏng vấn vào thứ Năm này ạ!
                    </div>
                  </div>
                </div>
              )}

              {activeTabId === 'employer-branding' && (
                <div className="space-y-3 font-sans">
                  <div className="rounded-xl border border-amber-300/60 bg-gradient-to-r from-amber-50 to-emerald-50 p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                        TOP IT EMPLOYER 2026
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700">45.000+ Lượt tiếp cận</span>
                    </div>
                    <h4 className="mt-2 text-xs font-bold text-[#1E2837]">Banner Trang Chủ & Chuyên trang Công Nghệ</h4>
                    <p className="mt-1 text-[11px] text-[#6C757D]">
                      Gia tăng sự tin cậy tuyệt đối khi tuyển các vị trí nhân sự IT cấp cao và Tech Lead.
                    </p>
                  </div>
                </div>
              )}

              {activeTabId === 'ats-integration' && (
                <div className="space-y-2 font-sans">
                  <div className="flex items-center justify-between pb-1 text-xs font-bold text-[#1E2837]">
                    <span>Phễu ứng viên Kanban</span>
                    <span className="text-[#009D46]">Tự động đồng bộ API</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                    <div className="rounded-lg border border-[#E5E7EB] bg-white p-2">Mới nộp (14)</div>
                    <div className="rounded-lg border border-[#D1F2DF] bg-emerald-50 p-2 text-[#009D46]">
                      Khớp 85%+ (8)
                    </div>
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-2 text-blue-700">Phỏng vấn (4)</div>
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-2 text-amber-700">Offer (2)</div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#E5E7EB] pt-5">
              <span className="text-xs font-semibold text-[#6C757D]">
                Đầy đủ giải pháp từ đăng tin, tìm kiếm, đến quản trị ứng viên.
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenConsultModal}
                  className="cursor-pointer rounded-full border border-[#00B14F] px-4.5 py-2 text-xs font-bold text-[#00B14F] transition-all hover:bg-emerald-50"
                >
                  <Headphones className="mr-1.5 inline-block h-3.5 w-3.5" />
                  <span>Tư vấn giải pháp</span>
                </button>

                <Link
                  href={ROUTES.RECRUITER_REGISTER}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#009D46] px-5 py-2 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#00873c]"
                >
                  <span>Dùng thử miễn phí</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
