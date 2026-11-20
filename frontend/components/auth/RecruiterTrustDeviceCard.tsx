'use client';

import { recruiterTwoFactorApi } from '@/apiRequest/two-factor';
import Button from '@/components/ui/Button';
import { REDIRECT_PARAM, ROUTES } from '@/constants/routes';
import { resolveClientDeviceLabel } from '@/utils/device';
import { sanitizeRedirect } from '@/utils/redirect';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function RecruiterTrustDeviceCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [deviceLabel] = useState(() => resolveClientDeviceLabel());
  const [isTrusting, setIsTrusting] = useState(false);

  const getDestination = () => {
    return sanitizeRedirect(searchParams?.get(REDIRECT_PARAM), ROUTES.RECRUITER_DASHBOARD);
  };

  const handleTrustDevice = async () => {
    setIsTrusting(true);
    try {
      await recruiterTwoFactorApi.trustCurrentDevice();
      toast.success('Thiết bị này đã được tin cậy trong 30 ngày.');
    } catch {
      toast.info('Đã đăng nhập thành công.');
    } finally {
      setIsTrusting(false);
      router.replace(getDestination());
    }
  };

  const handleAlwaysVerify = () => {
    toast.success('Đã đăng nhập thành công.');
    router.replace(getDestination());
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-2xl flex-col items-center text-center">
        {/* Large Transparent InterVue Brand Logo matching eSMS style */}
        <Link href={ROUTES.RECRUITER_LANDING} aria-label="InterVue" className="mb-6 inline-block">
          <Image
            src="/intervue-logo-transparent.png"
            alt="InterVue"
            width={260}
            height={75}
            priority
            className="h-14 w-auto object-contain sm:h-16 md:h-18"
          />
        </Link>

        {/* Heading on a single, well-proportioned line */}
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-[28px]">
          Bạn đã đăng nhập. Tin cậy thiết bị này?
        </h1>

        {/* Descriptive Copy with authentic typography and spacing */}
        <div className="mt-4 max-w-xl text-center text-sm leading-relaxed text-slate-600 sm:text-[14.5px]">
          <p>
            Để đăng nhập nhanh hơn, hãy tin cậy thiết bị này.
            <br />
            Như vậy, từ giờ trở đi, bạn có thể bỏ qua bước xác nhận đó là bạn.
          </p>
          <p className="mt-2 text-slate-500">
            Nếu người khác có quyền truy cập vào thiết bị này, tốt nhất là bạn hãy luôn xác nhận đó là mình.
          </p>
        </div>

        {/* Large & Prominent Security Illustration matching eSMS composition */}
        <div className="my-8 flex w-full items-center justify-center">
          <div className="relative flex w-full max-w-[480px] items-center justify-center sm:max-w-[540px]">
            {/* Custom SVG Illustration crafted to match eSMS visual weight */}
            <svg
              viewBox="0 0 480 290"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-auto max-h-[300px] w-full"
            >
              {/* Left Foliage / Plant Framing */}
              <g opacity="0.85">
                <path d="M75 190 C60 145 85 105 110 120 C115 145 95 195 75 190 Z" fill="#81c784" opacity="0.5" />
                <path d="M50 205 C35 165 60 135 85 150 C90 170 70 215 50 205 Z" fill="#a5d6a7" opacity="0.6" />
                <circle cx="85" cy="155" r="32" fill="#e8f5e9" opacity="0.6" />
              </g>

              {/* Right Foliage / Plant Framing */}
              <g opacity="0.85">
                <path d="M405 190 C420 145 395 105 370 120 C365 145 385 195 405 190 Z" fill="#81c784" opacity="0.5" />
                <path d="M430 205 C445 165 420 135 395 150 C390 170 410 215 430 205 Z" fill="#a5d6a7" opacity="0.6" />
                <circle cx="395" cy="155" r="32" fill="#e8f5e9" opacity="0.6" />
              </g>

              {/* Main Desktop Monitor Outer Frame */}
              <rect x="100" y="22" width="280" height="186" rx="12" fill="#334155" />
              {/* Monitor Inner Screen */}
              <rect x="108" y="30" width="264" height="170" rx="6" fill="#f8fafc" />

              {/* Window Header Bar */}
              <rect x="108" y="30" width="264" height="26" rx="6" fill="#f1f5f9" />
              {/* Header 3 Action Dots (macOS style) */}
              <circle cx="124" cy="43" r="3.5" fill="#f87171" />
              <circle cx="136" cy="43" r="3.5" fill="#fbbf24" />
              <circle cx="148" cy="43" r="3.5" fill="#34d399" />

              {/* Window Content Background Layout Lines */}
              <rect x="122" y="70" width="65" height="114" rx="4" fill="#e2e8f0" opacity="0.5" />
              <rect x="198" y="70" width="160" height="30" rx="4" fill="#e2e8f0" opacity="0.4" />
              <rect x="198" y="110" width="160" height="74" rx="4" fill="#e2e8f0" opacity="0.3" />

              {/* Recruiter / Agent Character in front of the screen */}
              {/* Head Base */}
              <circle cx="240" cy="138" r="34" fill="#fed7aa" />
              {/* Hair */}
              <path
                d="M206 138 C206 106 220 95 240 95 C260 95 274 106 274 138 C274 125 268 112 256 112 C248 112 245 116 240 116 C235 116 232 112 224 112 C212 112 206 125 206 138 Z"
                fill="#1e293b"
              />
              {/* Hair Strands on sides */}
              <path d="M206 132 C205 145 208 155 212 160 C210 150 208 140 208 132 Z" fill="#1e293b" />
              <path d="M274 132 C275 145 272 155 268 160 C270 150 272 140 272 132 Z" fill="#1e293b" />

              {/* Headset Band */}
              <path
                d="M211 135 C211 110 222 102 240 102 C258 102 269 110 269 135"
                stroke="#00b14f"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Headset Ear Cushions */}
              <rect x="207" y="128" width="6" height="14" rx="3" fill="#00b14f" />
              <rect x="267" y="128" width="6" height="14" rx="3" fill="#00b14f" />
              {/* Headset Microphone */}
              <path d="M210 138 Q212 155 228 156" stroke="#00b14f" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="229" cy="156" r="2.5" fill="#00b14f" />

              {/* Character Shoulders / Torso in InterVue Green */}
              <path d="M195 208 C195 178 210 170 240 170 C270 170 285 178 285 208 Z" fill="#00b14f" />
              {/* Collar detail */}
              <path d="M232 170 L240 182 L248 170 Z" fill="#fed7aa" />

              {/* Floating Green Speech Bubble with 3 Dots (...) */}
              <g transform="translate(286, 92)">
                {/* Bubble Shape */}
                <rect x="0" y="0" width="54" height="38" rx="19" fill="#00b14f" />
                <path d="M12 32 L4 44 L22 36 Z" fill="#00b14f" />
                {/* Three White Dots */}
                <circle cx="18" cy="19" r="3.5" fill="#ffffff" />
                <circle cx="27" cy="19" r="3.5" fill="#ffffff" />
                <circle cx="36" cy="19" r="3.5" fill="#ffffff" />
              </g>

              {/* Laptop Keyboard / Base Front */}
              <path
                d="M140 208 L340 208 C345 208 349 212 347 217 L335 238 C334 240 331 242 328 242 L152 242 C149 242 146 240 145 238 L133 217 C131 212 135 208 140 208 Z"
                fill="#cbd5e1"
              />
              <rect x="216" y="214" width="48" height="18" rx="3" fill="#e2e8f0" />

              {/* Clean Ground Shadow */}
              <ellipse cx="240" cy="248" rx="170" ry="10" fill="#e2e8f0" opacity="0.75" />
            </svg>
          </div>
        </div>

        {/* Workstation Detection Label matching eSMS */}
        <p className="text-xs font-medium text-slate-500">{deviceLabel}</p>

        {/* Management Hint Footnote with italic link matching eSMS */}
        <p className="mt-2 text-xs text-slate-500">
          Bạn cũng có thể quản lý các thiết bị đang tin cậy trong phần{' '}
          <Link href={ROUTES.RECRUITER_ACCOUNT_TWO_FACTOR} className="text-[#00b14f] italic transition hover:underline">
            Phiên đăng nhập
          </Link>
        </p>

        {/* Dual Action Buttons matching eSMS side-by-side layout and styling */}
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            type="button"
            isLoading={isTrusting}
            onClick={handleTrustDevice}
            className="h-12 w-full cursor-pointer rounded-xl bg-[#00b14f] px-8 text-xs font-bold tracking-wide text-white uppercase shadow-sm transition-all hover:bg-[#009643] active:scale-[0.99] disabled:opacity-60 sm:w-auto sm:text-sm"
          >
            Tin cậy thiết bị này
          </Button>

          <button
            type="button"
            onClick={handleAlwaysVerify}
            className="h-12 w-full cursor-pointer rounded-xl bg-[#f1f5f9] px-8 text-xs font-bold tracking-wide text-slate-700 uppercase transition-all hover:bg-[#e2e8f0] active:scale-[0.99] sm:w-auto sm:text-sm"
          >
            Luôn xác nhận đó là tôi
          </button>
        </div>
      </div>
    </div>
  );
}
