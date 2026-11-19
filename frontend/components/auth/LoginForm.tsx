'use client';

import { ROUTES } from '@/constants/routes';
import { startCandidateSession } from '@/hooks/useCandidateSession';
import { useLogin } from '@/hooks/useLogin';
import { cn } from '@/lib/utils';
import { LoginFormData, loginSchema } from '@/schemas/auth.schema';
import { applyFormError } from '@/utils/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormErrorAlert from './FormErrorAlert';
import SocialAuthButtons from './SocialAuthButtons';
import TwoFactorChallengeModal from './TwoFactorChallengeModal';

export default function LoginForm() {
  const login = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [challengeToken, setChallengeToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit((values) =>
    login.mutate(values, {
      onSuccess: (res) => {
        if (res.requiresTwoFactor && res.tempToken) {
          setChallengeToken(res.tempToken);
        }
      },
      onError: (error) => applyFormError(error, setError, ['email', 'password']),
    }),
  );

  return (
    <div className="w-full">
      <SocialAuthButtons mode="login" />

      {/* Divider */}
      <div className="relative my-5 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#E5E7EB]" />
        </div>
        <span className="relative bg-white px-3 text-xs text-[#808894]">Or sign in with email</span>
      </div>

      <FormErrorAlert message={errors.root?.message} />

      <form onSubmit={onSubmit} noValidate className="space-y-3.5">
        {/* Email */}
        <div>
          <label htmlFor="login-email" className="mb-1 block text-xs font-semibold text-[#1E2837]">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            className={cn(
              'h-11 w-full rounded-lg border border-[#E5E7EB] bg-white px-3.5 text-sm text-[#1E2837] placeholder-[#9CA3AF] transition-colors focus:border-[#00B14F] focus:ring-1 focus:ring-[#00B14F] focus:outline-none',
              errors.email && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            )}
            {...register('email')}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label htmlFor="login-password" className="text-xs font-semibold text-[#1E2837]">
              Password
            </label>
            <Link href={ROUTES.FORGOT_PASSWORD} className="text-xs font-medium text-[#009D46] hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              autoComplete="current-password"
              className={cn(
                'h-11 w-full rounded-lg border border-[#E5E7EB] bg-white px-3.5 pr-10 text-sm text-[#1E2837] placeholder-[#9CA3AF] transition-colors focus:border-[#00B14F] focus:ring-1 focus:ring-[#00B14F] focus:outline-none',
                errors.password && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              )}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-[#9CA3AF] hover:text-[#6C757D]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={login.isPending}
          className="mt-1.5 flex h-[46px] w-full cursor-pointer items-center justify-center rounded-full bg-[#00B14F] text-sm font-bold text-white transition-all hover:bg-[#009643] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {login.isPending ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      {/* Switch to Register */}
      <div className="mt-4 text-center text-sm text-[#4B5563]">
        <span>Don&apos;t have an account? </span>
        <Link href={ROUTES.REGISTER} className="font-semibold text-[#009D46] hover:underline">
          Sign up now
        </Link>
      </div>

      {challengeToken && (
        <TwoFactorChallengeModal
          isOpen={true}
          tempToken={challengeToken}
          portal="candidate"
          onSuccess={(session) => {
            startCandidateSession(session);
            setChallengeToken(null);
          }}
          onCancel={() => setChallengeToken(null)}
        />
      )}
    </div>
  );
}
