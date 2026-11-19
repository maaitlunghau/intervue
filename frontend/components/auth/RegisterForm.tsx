'use client';

import { authApiFor } from '@/apiRequest/auth-portal';
import { OAUTH_REDIRECT_STORAGE_KEY } from '@/constants/auth';
import { REDIRECT_PARAM, ROUTES } from '@/constants/routes';
import { useRegister } from '@/hooks/useRegister';
import { cn } from '@/lib/utils';
import { RegisterFormData, registerSchema } from '@/schemas/auth.schema';
import { applyFormError, getErrorMessage } from '@/utils/error';
import { sanitizeRedirect } from '@/utils/redirect';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import FormErrorAlert from './FormErrorAlert';
import { FacebookIcon, GoogleIcon, LinkedinIcon } from './SocialIcons';

const FORM_FIELDS = ['name', 'email', 'password', 'confirmPassword', 'acceptTerms'] as const;

export default function RegisterForm() {
  const [registerMode, setRegisterMode] = useState<'social' | 'email'>('social');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerAccount = useRegister();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', password: '', confirmPassword: '', acceptTerms: false },
  });

  const authorizeGoogle = useMutation({
    mutationFn: () => authApiFor('candidate').oauthAuthorize('google', { intent: 'REGISTER', acceptTerms: true }),
    onSuccess: ({ authorizationUrl }) => {
      const target = new URLSearchParams(window.location.search).get(REDIRECT_PARAM);
      const redirect = sanitizeRedirect(target, ROUTES.HOME);
      if (target && redirect !== ROUTES.HOME) sessionStorage.setItem(OAUTH_REDIRECT_STORAGE_KEY, redirect);
      else sessionStorage.removeItem(OAUTH_REDIRECT_STORAGE_KEY);
      window.location.assign(authorizationUrl);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const handleComingSoon = (providerName: string) => {
    toast.info(`Sign in with ${providerName} is coming soon!`);
  };

  const onSubmit = handleSubmit((values) =>
    registerAccount.mutate(values, { onError: (error) => applyFormError(error, setError, FORM_FIELDS) }),
  );

  return (
    <div className="w-full">
      {registerMode === 'social' ? (
        /* State 1: Quick Social Registration */
        <div className="space-y-4">
          <div className="space-y-2.5">
            {/* Google */}
            <button
              type="button"
              disabled={authorizeGoogle.isPending || authorizeGoogle.isSuccess}
              onClick={() => authorizeGoogle.mutate()}
              className="flex h-11 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border border-[#E5E7EB] bg-white text-sm font-semibold text-[#1E2837] transition hover:bg-slate-50 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <GoogleIcon />
              <span>
                {authorizeGoogle.isPending || authorizeGoogle.isSuccess ? 'Redirecting...' : 'Sign up with Google'}
              </span>
            </button>

            {/* Facebook & LinkedIn */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleComingSoon('Facebook')}
                className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#E5E7EB] bg-white text-sm font-semibold text-[#1E2837] transition hover:bg-slate-50 active:scale-[0.99]"
              >
                <FacebookIcon />
                <span>Facebook</span>
              </button>

              <button
                type="button"
                onClick={() => handleComingSoon('LinkedIn')}
                className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#E5E7EB] bg-white text-sm font-semibold text-[#1E2837] transition hover:bg-slate-50 active:scale-[0.99]"
              >
                <LinkedinIcon />
                <span>LinkedIn</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E7EB]" />
            </div>
            <span className="relative bg-white px-3 text-xs text-[#808894]">Or</span>
          </div>

          {/* Button to switch to Email Registration */}
          <button
            type="button"
            onClick={() => setRegisterMode('email')}
            className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#E5E7EB] bg-white text-sm font-semibold text-[#1E2837] transition hover:bg-slate-50 active:scale-[0.99]"
          >
            <Mail className="h-4.5 w-4.5 text-[#6C757D]" />
            <span>Sign up with Email</span>
          </button>
        </div>
      ) : (
        /* State 2: Email Registration Form (Individual row per input) */
        <div className="space-y-3.5">
          <FormErrorAlert message={errors.root?.message} />

          <form onSubmit={onSubmit} noValidate className="space-y-3">
            {/* Full Name */}
            <div>
              <label htmlFor="register-name" className="mb-1 block text-xs font-semibold text-[#1E2837]">
                Full name
              </label>
              <input
                id="register-name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                className={cn(
                  'h-10.5 w-full rounded-lg border border-[#E5E7EB] bg-white px-3.5 text-sm text-[#1E2837] placeholder-[#9CA3AF] transition-colors focus:border-[#00B14F] focus:ring-1 focus:ring-[#00B14F] focus:outline-none',
                  errors.name && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                )}
                {...register('name')}
              />
              {errors.name && <p className="mt-0.5 text-xs text-red-500">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="register-email" className="mb-1 block text-xs font-semibold text-[#1E2837]">
                Email
              </label>
              <input
                id="register-email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                className={cn(
                  'h-10.5 w-full rounded-lg border border-[#E5E7EB] bg-white px-3.5 text-sm text-[#1E2837] placeholder-[#9CA3AF] transition-colors focus:border-[#00B14F] focus:ring-1 focus:ring-[#00B14F] focus:outline-none',
                  errors.email && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                )}
                {...register('email')}
              />
              {errors.email && <p className="mt-0.5 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="register-password" className="mb-1 block text-xs font-semibold text-[#1E2837]">
                Password
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  className={cn(
                    'h-10.5 w-full rounded-lg border border-[#E5E7EB] bg-white px-3.5 pr-10 text-sm text-[#1E2837] placeholder-[#9CA3AF] transition-colors focus:border-[#00B14F] focus:ring-1 focus:ring-[#00B14F] focus:outline-none',
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
              {errors.password && <p className="mt-0.5 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="register-confirm-password" className="mb-1 block text-xs font-semibold text-[#1E2837]">
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  className={cn(
                    'h-10.5 w-full rounded-lg border border-[#E5E7EB] bg-white px-3.5 pr-10 text-sm text-[#1E2837] placeholder-[#9CA3AF] transition-colors focus:border-[#00B14F] focus:ring-1 focus:ring-[#00B14F] focus:outline-none',
                    errors.confirmPassword && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                  )}
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-[#9CA3AF] hover:text-[#6C757D]"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-0.5 text-xs text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Terms & Privacy Policy Checkbox */}
            <div className="pt-0.5">
              <label className="flex cursor-pointer items-start gap-2.5 text-xs text-[#4B5563] select-none">
                <input
                  type="checkbox"
                  className="mt-0.5 h-3.5 w-3.5 rounded border-[#D1D5DB] text-[#00B14F] focus:ring-[#00B14F]"
                  {...register('acceptTerms')}
                />
                <span>
                  I have read and agree to the{' '}
                  <Link
                    href="/terms-of-service"
                    className="font-semibold text-[#009D46] hover:underline"
                    target="_blank"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy-policy" className="font-semibold text-[#009D46] hover:underline" target="_blank">
                    Privacy Policy
                  </Link>{' '}
                  of InterVue (Required)
                </span>
              </label>
              {errors.acceptTerms && <p className="mt-0.5 text-xs text-red-500">{errors.acceptTerms.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={registerAccount.isPending}
              className="mt-1 flex h-[46px] w-full cursor-pointer items-center justify-center rounded-full bg-[#00B14F] text-sm font-bold text-white transition-all hover:bg-[#009643] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {registerAccount.isPending ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-3 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E7EB]" />
            </div>
            <span className="relative bg-white px-3 text-xs text-[#808894]">Or</span>
          </div>

          {/* Button to switch back to Social Registration */}
          <button
            type="button"
            onClick={() => setRegisterMode('social')}
            className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#E5E7EB] bg-white text-sm font-semibold text-[#1E2837] transition hover:bg-slate-50 active:scale-[0.99]"
          >
            <span>Sign up with social accounts</span>
          </button>
        </div>
      )}

      {/* Switch to Login */}
      <div className="mt-4 text-center text-sm text-[#4B5563]">
        <span>Already have an account? </span>
        <Link href={ROUTES.LOGIN} className="font-semibold text-[#009D46] hover:underline">
          Sign in now
        </Link>
      </div>
    </div>
  );
}
