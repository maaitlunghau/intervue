'use client';

import { recruiterAuthApi } from '@/apiRequest/recruiter-auth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { REDIRECT_PARAM, ROUTES } from '@/constants/routes';
import { isApiError } from '@/lib/api-error';
import { useAuthStore } from '@/store/auth.store';
import { ArrowLeft, CheckCircle2, KeyRound, Smartphone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import FormErrorAlert from './FormErrorAlert';

export default function RecruiterTwoFactorChallengeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [code, setCode] = useState('');
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('recruiter_2fa_temp_token') : null;
    if (!token) {
      router.replace(ROUTES.RECRUITER_LOGIN);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!code.trim()) {
      setErrorMsg(useBackupCode ? 'Vui lòng nhập mã khôi phục khẩn cấp.' : 'Vui lòng nhập mã xác thực gồm 6 chữ số.');
      return;
    }

    const token = typeof window !== 'undefined' ? sessionStorage.getItem('recruiter_2fa_temp_token') : null;
    if (!token) {
      router.replace(ROUTES.RECRUITER_LOGIN);
      return;
    }

    setIsLoading(true);
    try {
      const session = await recruiterAuthApi.verifyTwoFactor({
        tempToken: token,
        code: code.trim(),
        trustDevice: false,
      });

      useAuthStore.getState().setSession(session, 'recruiter');
      sessionStorage.removeItem('recruiter_2fa_temp_token');
      sessionStorage.removeItem('recruiter_2fa_email');
      toast.success('Xác thực 2FA thành công.');

      const redirectParam = searchParams?.get(REDIRECT_PARAM);
      const trustUrl = redirectParam
        ? `${ROUTES.RECRUITER_TRUST_DEVICE}?${REDIRECT_PARAM}=${encodeURIComponent(redirectParam)}`
        : ROUTES.RECRUITER_TRUST_DEVICE;

      router.replace(trustUrl);
    } catch (err: unknown) {
      if (isApiError(err)) {
        const detail = err.details?.[0]?.message;
        setErrorMsg(detail || err.message || 'Mã xác thực không chính xác hoặc đã hết hạn.');
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Không thể kết nối đến hệ thống xác thực. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    sessionStorage.removeItem('recruiter_2fa_temp_token');
    sessionStorage.removeItem('recruiter_2fa_email');
    router.replace(ROUTES.RECRUITER_LOGIN);
  };

  return (
    <div className="w-full">
      {/* Brand Header matching Recruiter Login Layout */}
      <div className="mb-6">
        <Link
          href={ROUTES.RECRUITER_LANDING}
          aria-label="Back to InterVue for Employers"
          className="mb-8 inline-block sm:mb-10 xl:mb-12"
        >
          <Image
            src="/intervue-logo.png"
            alt="InterVue"
            width={200}
            height={56}
            priority
            className="h-12 w-auto object-contain sm:h-13 xl:h-14"
          />
        </Link>

        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#00b14f]">
            {useBackupCode ? <KeyRound className="h-5 w-5" /> : <Smartphone className="h-5 w-5" />}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#00b14f] sm:text-[28px]">
              {useBackupCode ? 'Nhập mã khôi phục khẩn cấp' : 'Xác thực hai yếu tố (2FA)'}
            </h1>
          </div>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {useBackupCode
            ? 'Nhập một trong các mã khôi phục gồm 8 ký tự bạn đã lưu trữ an toàn khi cài đặt xác thực 2 bước.'
            : 'Tài khoản của bạn được bảo vệ với 2FA. Vui lòng nhập mã gồm 6 chữ số từ ứng dụng Google Authenticator hoặc ứng dụng OTP trên điện thoại.'}
        </p>
      </div>

      <FormErrorAlert message={errorMsg} />

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">
            {useBackupCode ? 'Mã khôi phục (8 ký tự)' : 'Mã xác thực gồm 6 chữ số'}
          </label>
          <Input
            type="text"
            inputMode={useBackupCode ? 'text' : 'numeric'}
            value={code}
            onChange={(e) => {
              const val = useBackupCode ? e.target.value : e.target.value.replace(/\D/g, '');
              setCode(val);
            }}
            placeholder={useBackupCode ? 'vd: 8912-4019' : '123456'}
            autoComplete="one-time-code"
            autoFocus
            maxLength={useBackupCode ? 12 : 6}
            inputSize="compact"
            radius="md"
            className="text-center font-mono text-xl font-bold tracking-widest text-[#00b14f] sm:text-2xl"
          />
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          className="!mt-4 h-[44px] w-full cursor-pointer rounded-md bg-[#00b14f] text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#009643] active:scale-[0.99] disabled:opacity-60"
          rightIcon={<CheckCircle2 className="h-4 w-4" />}
        >
          Xác nhận và tiếp tục
        </Button>
      </form>

      {/* Alternative actions */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5 text-xs">
        <button
          type="button"
          onClick={() => {
            setUseBackupCode(!useBackupCode);
            setCode('');
            setErrorMsg('');
          }}
          className="cursor-pointer font-semibold text-[#00b14f] hover:underline"
        >
          {useBackupCode ? 'Dùng mã từ ứng dụng xác thực' : 'Sử dụng mã khôi phục khẩn cấp'}
        </button>

        <button
          type="button"
          onClick={handleBackToLogin}
          className="flex cursor-pointer items-center gap-1.5 font-semibold text-slate-500 transition hover:text-slate-800"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Quay lại đăng nhập
        </button>
      </div>
    </div>
  );
}
