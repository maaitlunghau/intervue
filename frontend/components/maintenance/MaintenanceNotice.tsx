import MaintenanceCablePlugs from '@/components/maintenance/MaintenanceCablePlugs';
import type { MaintenanceStatus } from '@/types/platform';
import Image from 'next/image';

type MaintenanceNoticeProps = { status: MaintenanceStatus };

const DEFAULT_MESSAGE = 'Sorry for the inconvenience. Please check back after that time. Thank you so much!';

function formatResumeTime(iso: string): string | null {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(date);
}

function isTimePassed(iso: string | null): boolean {
  if (!iso) return false;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return false;
  return date.getTime() < Date.now();
}

export default function MaintenanceNotice({ status }: MaintenanceNoticeProps) {
  const isOverdue = isTimePassed(status.estimatedResumeAt);
  const resumeAt = status.estimatedResumeAt ? formatResumeTime(status.estimatedResumeAt) : null;

  return (
    <main className="flex min-h-screen w-full justify-center bg-white px-4 pt-14 pb-12 sm:px-6 sm:pt-20 lg:pt-24">
      {/* The root layout mounts the chatbot everywhere; its API is blocked here anyway. */}
      <style>{`[data-support-chatbot]{display:none}`}</style>

      <div className="w-full max-w-4xl text-center">
        {/* Brand Logo */}
        <div className="mb-7 flex justify-center sm:mb-9">
          <Image
            src="/intervue-logo.png"
            alt="InterVue"
            width={220}
            height={56}
            priority
            className="h-10 w-auto object-contain sm:h-12"
          />
        </div>

        {/* 1-Line Heading: Positioned Top-Center, stays on 1 line on desktop and tablet */}
        <h1 className="text-navy text-2xl leading-snug font-bold tracking-tight whitespace-normal sm:text-3xl sm:whitespace-nowrap lg:text-[32px]">
          The website is under maintenance for a system upgrade
        </h1>

        {/* Subtext description */}
        <div className="mx-auto mt-4 max-w-2xl space-y-1.5 text-sm leading-relaxed text-[#6f7882] sm:mt-5 sm:max-w-3xl sm:space-y-2 sm:text-base">
          {resumeAt &&
            (isOverdue ? (
              <p className="font-medium whitespace-normal text-amber-700 sm:whitespace-nowrap">
                We are finalizing the upgrade and expect to be back online shortly.
              </p>
            ) : (
              <p className="whitespace-normal sm:whitespace-nowrap">
                We expect to be back online at <strong className="text-navy font-bold">{resumeAt}</strong>.
              </p>
            ))}
          <p className="whitespace-normal sm:whitespace-nowrap">{status.message ?? DEFAULT_MESSAGE}</p>
          <p className="pt-1 text-xs font-medium text-[#9aa3ab] sm:text-sm">— InterVue Team</p>
        </div>

        {/* Graphic: Prominent Two Flat Tech Plugs Disconnected (TopCV Benchmark) */}
        <div className="mt-10 flex justify-center sm:mt-14">
          <MaintenanceCablePlugs className="w-full max-w-[680px] sm:max-w-[760px]" />
        </div>

        {/* Subtle Horizontal Divider Line */}
        <hr className="mx-auto mt-10 max-w-[760px] border-t border-[#f1f5f9] sm:mt-14" />
      </div>
    </main>
  );
}
