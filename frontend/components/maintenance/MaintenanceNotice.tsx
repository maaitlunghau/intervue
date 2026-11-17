import WorkZoneBarrier from '@/components/maintenance/WorkZoneBarrier';
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

export default function MaintenanceNotice({ status }: MaintenanceNoticeProps) {
  const resumeAt = status.estimatedResumeAt ? formatResumeTime(status.estimatedResumeAt) : null;

  return (
    <main className="flex min-h-screen justify-center bg-white">
      {/* The root layout mounts the chatbot everywhere; its API is blocked here anyway. */}
      <style>{`[data-support-chatbot]{display:none}`}</style>

      <div className="w-full max-w-[1180px] px-6 pt-18 pb-12 text-center">
        <Image
          src="/intervue-logo.png"
          alt="InterVue"
          width={220}
          height={60}
          priority
          className="mx-auto mb-11 h-13 w-auto object-contain"
        />

        <h1 className="text-navy text-[clamp(30px,4.6vw,52px)] leading-[1.2] font-extrabold tracking-[-0.6px]">
          The website is under maintenance for a system upgrade
        </h1>

        <div className="mt-7 space-y-3.5 text-[clamp(15px,1.45vw,19px)] leading-[1.75] text-[#6f7882]">
          {resumeAt && (
            <p>
              We expect to be back online at <strong className="text-navy font-bold">{resumeAt}</strong>.
            </p>
          )}
          <p>{status.message ?? DEFAULT_MESSAGE}</p>
          <p className="pt-2 text-[#9aa3ab]">— InterVue</p>
        </div>

        <WorkZoneBarrier className="mx-auto mt-13 w-[min(700px,88vw)]" />

        <hr className="mx-auto mt-14 max-w-[900px] border-t border-[#e9eaec]" />
      </div>
    </main>
  );
}
