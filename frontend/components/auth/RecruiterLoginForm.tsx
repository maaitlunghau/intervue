'use client';

import { recruiterAuthApi } from '@/apiRequest/recruiter-auth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import { REDIRECT_PARAM, ROUTES } from '@/constants/routes';
import { toRecruiterSession } from '@/lib/auth-portal';
import { LoginFormData, loginSchema } from '@/schemas/auth.schema';
import { useAuthStore } from '@/store/auth.store';
import { applyFormError } from '@/utils/error';
import { sanitizeRedirect } from '@/utils/redirect';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import FormErrorAlert from './FormErrorAlert';
import SocialAuthButtons from './SocialAuthButtons';

export default function RecruiterLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = handleSubmit(async (values) => {
    setIsLoading(true);
    try {
      const res = await recruiterAuthApi.login(values);
      if (res.requiresTwoFactor && res.tempToken) {
        sessionStorage.setItem('recruiter_2fa_temp_token', res.tempToken);
        sessionStorage.setItem('recruiter_2fa_email', values.email);
        const redirectParam = searchParams?.get(REDIRECT_PARAM);
        const target = redirectParam
          ? `${ROUTES.RECRUITER_TWO_FACTOR}?${REDIRECT_PARAM}=${encodeURIComponent(redirectParam)}`
          : ROUTES.RECRUITER_TWO_FACTOR;
        router.push(target);
        return;
      }
      const session = toRecruiterSession(res);
      useAuthStore.getState().setSession(session, 'recruiter');
      toast.success('Signed in to the recruiter portal.');
      router.replace(sanitizeRedirect(searchParams?.get(REDIRECT_PARAM), ROUTES.RECRUITER_DASHBOARD));
    } catch (error: unknown) {
      applyFormError(error, setError, ['email', 'password']);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="w-full">
      {/* Brand Header with generous spacing matching TopCV */}
      <div className="mb-6">
        <Link
          href={ROUTES.RECRUITER_LANDING}
          aria-label="Back to InterVue for Employers"
          className="mb-10 inline-block sm:mb-12 xl:mb-14"
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
        <h1 className="text-2xl font-bold tracking-tight text-[#00b14f] sm:text-[28px]">Welcome back</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Build a competitive edge for your business with AI-powered hiring and deep recruitment funnel experience.
        </p>
      </div>

      {/* Google Login Button */}
      <div className="my-5">
        <SocialAuthButtons portal="recruiter" mode="login" />
      </div>

      {/* Divider */}
      <div className="relative my-6 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <span className="relative bg-white px-3 text-xs text-slate-400 sm:text-[13px]">Or sign in with email</span>
      </div>

      <FormErrorAlert message={errors.root?.message} />

      <form onSubmit={onSubmit} noValidate className="space-y-4">
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

        <div>
          <PasswordInput
            label="Password"
            id="recruiter-login-password"
            placeholder="Password"
            autoComplete="current-password"
            inputSize="compact"
            radius="md"
            leftIcon={<Lock className="h-4 w-4 text-[#00b14f]" />}
            error={errors.password?.message}
            {...register('password')}
          />
          <div className="mt-1.5 flex justify-end">
            <Link
              href={ROUTES.RECRUITER_FORGOT_PASSWORD}
              className="text-sm font-medium text-[#00b14f] transition-colors hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          className="!mt-3 h-[42px] w-full cursor-pointer rounded-md bg-[#00b14f] text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#009643] active:scale-[0.99] disabled:opacity-60"
        >
          Sign in
        </Button>
      </form>

      {/* Switch to Register */}
      <div className="mt-6 text-center text-sm text-slate-600">
        <span>Don&apos;t have an account? </span>
        <Link href={ROUTES.RECRUITER_REGISTER} className="font-semibold text-[#00b14f] hover:underline">
          Sign up now
        </Link>
      </div>
    </div>
  );
}
