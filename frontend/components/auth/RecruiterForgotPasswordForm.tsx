'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { RESEND_COOLDOWN_SECONDS } from '@/constants/auth';
import { ROUTES } from '@/constants/routes';
import { useForgotPassword } from '@/hooks/useForgotPassword';
import { ForgotPasswordFormData, forgotPasswordSchema } from '@/schemas/auth.schema';
import { applyFormError, getErrorMessage } from '@/utils/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import FormErrorAlert from './FormErrorAlert';

export default function RecruiterForgotPasswordForm() {
  const forgotPassword = useForgotPassword('recruiter');
  const [sentEmail, setSentEmail] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onTouched',
    defaultValues: { email: '' },
  });

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const onSubmit = handleSubmit((values) =>
    forgotPassword.mutate(values, {
      onSuccess: () => {
        setSentEmail(values.email);
        setCountdown(RESEND_COOLDOWN_SECONDS);
      },
      onError: (error) => applyFormError(error, setError, ['email']),
    }),
  );

  const handleResend = () => {
    if (!sentEmail || countdown > 0) return;
    forgotPassword.mutate(
      { email: sentEmail },
      {
        onSuccess: () => {
          setCountdown(RESEND_COOLDOWN_SECONDS);
          toast.success('Recovery link sent again.');
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      },
    );
  };

  return (
    <div className="w-full">
      {/* Brand Header with Back Arrow and generous spacing matching TopCV */}
      <div className="mb-10 flex items-center gap-2.5 sm:mb-12 xl:mb-14">
        <Link
          href={ROUTES.RECRUITER_LOGIN}
          aria-label="Back to sign in"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#00b14f] transition hover:bg-emerald-50 hover:text-[#009643]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Link href={ROUTES.RECRUITER_LANDING} aria-label="InterVue for Employers">
          <Image
            src="/intervue-logo.png"
            alt="InterVue"
            width={200}
            height={56}
            priority
            className="h-12 w-auto object-contain sm:h-13 xl:h-14"
          />
        </Link>
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">Forgot password</h1>
      <p className="mt-2 mb-6 text-sm leading-relaxed text-slate-600">
        Enter the email associated with your employer account and we will send you instructions to reset your password.
      </p>

      {sentEmail ? (
        <div className="space-y-4 rounded-xl border border-emerald-300/80 bg-emerald-50/60 p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-[#00b14f]">
            <CheckCircle2 className="h-7 w-7" />
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">Recovery link sent</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              If <strong className="text-slate-900">{sentEmail}</strong> is registered with an employer account, you
              will receive password reset instructions within a few minutes.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              disabled={countdown > 0 || forgotPassword.isPending}
              onClick={handleResend}
              className="cursor-pointer text-sm font-semibold text-[#00b14f] hover:underline disabled:cursor-not-allowed disabled:text-slate-400"
            >
              {countdown > 0 ? `Resend in ${countdown}s` : 'Resend email'}
            </button>
          </div>

          <div className="border-t border-emerald-200/60 pt-3">
            <Link href={ROUTES.RECRUITER_LOGIN} className="text-sm font-semibold text-[#00b14f] hover:underline">
              Back to sign in
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <FormErrorAlert message={errors.root?.message} />

          <Input
            label="Email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            inputSize="compact"
            radius="md"
            leftIcon={<Mail className="h-4 w-4 text-[#00b14f]" />}
            error={errors.email?.message}
            {...register('email')}
          />

          <Button
            type="submit"
            isLoading={forgotPassword.isPending}
            className="!mt-4 h-[42px] w-full cursor-pointer rounded-md bg-[#00b14f] text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#009643] active:scale-[0.99] disabled:opacity-60"
          >
            Reset password
          </Button>
        </form>
      )}
    </div>
  );
}
