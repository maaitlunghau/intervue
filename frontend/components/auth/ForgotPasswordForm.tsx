'use client';

import { RESEND_COOLDOWN_SECONDS } from '@/constants/auth';
import { useForgotPassword } from '@/hooks/useForgotPassword';
import { AUTH_PORTAL_ROUTES, type AuthPortal } from '@/lib/auth-portal';
import { cn } from '@/lib/utils';
import { ForgotPasswordFormData, forgotPasswordSchema } from '@/schemas/auth.schema';
import { applyFormError, getErrorMessage } from '@/utils/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Mail } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import FormErrorAlert from './FormErrorAlert';

type ForgotPasswordFormProps = { portal?: AuthPortal };

export default function ForgotPasswordForm({ portal = 'candidate' }: ForgotPasswordFormProps) {
  const routes = AUTH_PORTAL_ROUTES[portal];
  const forgotPassword = useForgotPassword(portal);
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
      {sentEmail ? (
        <div className="space-y-4 rounded-2xl border border-[#00B14F]/30 bg-emerald-50/70 p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-[#009D46]">
            <CheckCircle2 className="h-7 w-7" />
          </div>

          <div>
            <h3 className="text-base font-bold text-[#1E2837]">Recovery link sent</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#4B5563]">
              If <strong>{sentEmail}</strong> is registered with InterVue, you will receive a password reset link within
              a few minutes.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              disabled={countdown > 0 || forgotPassword.isPending}
              onClick={handleResend}
              className="text-sm font-semibold text-[#009D46] transition-colors enabled:cursor-pointer enabled:hover:underline disabled:cursor-not-allowed disabled:text-[#9CA3AF]"
            >
              {countdown > 0 ? `Resend in ${countdown}s` : 'Resend email'}
            </button>
          </div>

          <div className="border-t border-emerald-100 pt-2">
            <Link href={routes.login} className="text-sm font-semibold text-[#009D46] hover:underline">
              Back to sign in
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <FormErrorAlert message={errors.root?.message} />

          {/* Email input with leading Mail icon */}
          <div>
            <label htmlFor="forgot-email" className="mb-1.5 block text-xs font-semibold text-[#1E2837]">
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4.5 w-4.5 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                id="forgot-email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                className={cn(
                  'h-11 w-full rounded-lg border border-[#E5E7EB] bg-white pr-3.5 pl-10.5 text-sm text-[#1E2837] placeholder-[#9CA3AF] transition-colors focus:border-[#00B14F] focus:ring-1 focus:ring-[#00B14F] focus:outline-none',
                  errors.email && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                )}
                {...register('email')}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          {/* Agreement note matching TopCV */}
          <p className="text-xs leading-relaxed text-[#6C757D]">
            By resetting your password, you agree to our{' '}
            <Link href="/terms-of-service" className="font-medium text-[#009D46] hover:underline" target="_blank">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="font-medium text-[#009D46] hover:underline" target="_blank">
              Privacy Policy
            </Link>
            .
          </p>

          {/* Submit button */}
          <button
            type="submit"
            disabled={forgotPassword.isPending}
            className="flex h-[46px] w-full cursor-pointer items-center justify-center rounded-full bg-[#00B14F] text-sm font-bold text-white transition-all hover:bg-[#009643] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {forgotPassword.isPending ? 'Sending recovery link...' : 'Reset password'}
          </button>

          {/* Bottom row: Back to sign in (left) & Create new account (right) */}
          <div className="flex items-center justify-between pt-1 text-xs text-[#009D46] sm:text-sm">
            <Link href={routes.login} className="font-semibold hover:underline">
              Back to sign in
            </Link>
            <Link href={routes.register} className="font-semibold hover:underline">
              Create new account
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
