'use client';

import { recruiterAuthApi } from '@/apiRequest/recruiter-auth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import { recruiterRegisterSchema, type RecruiterRegisterFormData } from '@/schemas/recruiter.schema';
import { useAuthStore } from '@/store/auth.store';
import { applyFormError } from '@/utils/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, ChevronUp, Lock, Mail, Phone, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import FormErrorAlert from './FormErrorAlert';
import RecruiterGuestRedirect from './RecruiterGuestRedirect';
import RecruiterOnboarding from './RecruiterOnboarding';
import RecruiterProfileFields from './RecruiterProfileFields';
import RecruiterVerifyEmailNotice from './RecruiterVerifyEmailNotice';
import SocialAuthButtons from './SocialAuthButtons';

function getPasswordStrength(password: string) {
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const score = [hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(Boolean).length;

  if (score <= 2) {
    return {
      label: 'Weak',
      color: 'text-rose-600',
      bar: 'bg-rose-500',
      width: '25%',
    };
  }
  if (score === 3) {
    return {
      label: 'Fair',
      color: 'text-orange-600',
      bar: 'bg-orange-500',
      width: '50%',
    };
  }
  if (score === 4) {
    return {
      label: 'Good',
      color: 'text-amber-600',
      bar: 'bg-amber-500',
      width: '75%',
    };
  }
  return {
    label: 'Strong',
    color: 'text-[#00b14f]',
    bar: 'bg-[#00b14f]',
    width: '100%',
  };
}

export default function RecruiterRegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(true);
  const [registered, setRegistered] = useState<{ email: string; name: string } | null>(null);
  const [isOnboardingDone, setIsOnboardingDone] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    formState: { errors },
  } = useForm<RecruiterRegisterFormData>({
    resolver: zodResolver(recruiterRegisterSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      gender: 'MALE',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      city: '',
      districtWard: '',
      acceptTerms: false,
      acceptMarketing: true,
    },
  });

  const password = useWatch({ control, name: 'password' }) || '';
  const passwordStrength = getPasswordStrength(password);
  const acceptTerms = useWatch({ control, name: 'acceptTerms' });
  const acceptMarketing = useWatch({ control, name: 'acceptMarketing' });

  const onSubmit = handleSubmit(async (values) => {
    setIsLoading(true);
    try {
      const session = await recruiterAuthApi.register({
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        acceptTerms: values.acceptTerms,
        gender: values.gender,
        companyName: values.companyName,
        province: values.city,
        districtWard: values.districtWard,
      });
      useAuthStore.getState().setSession(session);

      setRegistered({ email: values.email, name: values.name });
    } catch (error: unknown) {
      applyFormError(error, setError, [
        'name',
        'email',
        'password',
        'confirmPassword',
        'acceptTerms',
        'companyName',
        'city',
        'gender',
        'phone',
        'districtWard',
      ]);
    } finally {
      setIsLoading(false);
    }
  });

  if (registered && isOnboardingDone) return <RecruiterVerifyEmailNotice email={registered.email} />;
  if (registered) {
    return <RecruiterOnboarding startStep="needs" name={registered.name} onFinish={() => setIsOnboardingDone(true)} />;
  }

  const renderConsentCheckboxes = (prefix: 'top' | 'bottom') => (
    <div className="space-y-3">
      <div>
        <label
          htmlFor={`${prefix}-acceptTerms`}
          className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-700 select-none"
        >
          <input
            id={`${prefix}-acceptTerms`}
            type="checkbox"
            checked={Boolean(acceptTerms)}
            onChange={(e) => setValue('acceptTerms', e.target.checked, { shouldValidate: true })}
            className="mt-0.5 h-4 w-4 cursor-pointer rounded border-slate-300 text-[#00b14f] focus:ring-[#00b14f]"
          />
          <span className="leading-snug">
            I have read and agree to InterVue&apos;s{' '}
            <Link
              href="/terms"
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="font-medium text-[#00b14f] hover:underline"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/terms"
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="font-medium text-[#00b14f] hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <p className="mt-1 ml-6.5 text-xs font-normal text-rose-600">
          * We cannot provide our services without your consent to this item.
        </p>
        {errors.acceptTerms && (
          <p className="mt-1 ml-6.5 text-xs font-medium text-rose-500">{errors.acceptTerms.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor={`${prefix}-acceptMarketing`}
          className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-700 select-none"
        >
          <input
            id={`${prefix}-acceptMarketing`}
            type="checkbox"
            checked={Boolean(acceptMarketing)}
            onChange={(e) => setValue('acceptMarketing', e.target.checked)}
            className="mt-0.5 h-4 w-4 cursor-pointer rounded border-slate-300 text-[#00b14f] focus:ring-[#00b14f]"
          />
          <span className="leading-snug">
            I agree to receive consultation and updates from InterVue for fast job posting assistance, posting
            optimization tips, important application notifications, and tailored recruitment solutions.
          </span>
        </label>
        <p className="mt-1 ml-6.5 text-xs font-normal text-[#00b14f]">
          * Recommended: Without your consent, our specialists cannot contact you to assist with fast account
          verification and timely job posting.
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <RecruiterGuestRedirect />

      {/* Brand Header */}
      <div className="mb-5 sm:mb-6">
        <Link
          href={ROUTES.RECRUITER_LANDING}
          aria-label="Back to InterVue for Employers"
          className="mb-3.5 inline-block"
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
        <h1 className="text-2xl font-bold tracking-tight text-[#00b14f] sm:text-[28px]">
          Sign up for Employer Account
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Build a competitive edge for your business with AI-powered hiring and deep recruitment funnel experience.
        </p>
      </div>

      {/* Regulations Collapsible Box */}
      <div className="mb-8 rounded-lg border border-emerald-300/80 bg-white p-6 text-sm shadow-xs transition-all sm:p-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-base font-bold text-[#00b14f]">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[#00b14f]" />
            <span>Regulations</span>
          </div>
          <button
            type="button"
            aria-label="Show or hide account regulations"
            aria-expanded={isNoticeOpen}
            aria-controls="recruiter-rules-box"
            onClick={() => setIsNoticeOpen((prev) => !prev)}
            className="cursor-pointer rounded-md p-1 text-slate-500 transition hover:bg-emerald-50 hover:text-slate-800"
          >
            {isNoticeOpen ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
          </button>
        </div>

        {isNoticeOpen && (
          <div
            id="recruiter-rules-box"
            className="mt-4 space-y-4 border-t border-emerald-200/60 pt-4 text-sm leading-[1.8] text-slate-700 sm:text-[14.5px]"
          >
            <p>
              To ensure service quality, InterVue{' '}
              <span className="font-semibold text-rose-600">
                does not allow a single user to create multiple accounts.
              </span>
            </p>
            <p>
              If a violation is detected, InterVue will terminate services for all duplicate accounts or block access to
              the entire InterVue platform.
            </p>
            <p>
              After registering an employer account and providing required information, employers may receive standard
              job posting support, except for certain positions. The number of posts and display methods are subject to
              InterVue&apos;s policies at each period.
            </p>
            <p className="pt-1 font-medium text-slate-800">
              For any inquiries, please contact our Customer Support Hotline:
            </p>
            <div className="flex items-center gap-2.5 pt-1 text-sm font-medium text-slate-800">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-[#00b14f]">
                <Phone className="h-3.5 w-3.5" />
              </span>
              <a href="tel:0812665001" className="text-base font-bold text-[#00b14f] hover:underline">
                0812.665.001
              </a>
            </div>
          </div>
        )}
      </div>

      <FormErrorAlert message={errors.root?.message} />

      <form onSubmit={onSubmit} noValidate className="space-y-8">
        {/* Section: Account */}
        <div>
          <h2 className="text-lg font-bold text-slate-900">Account</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            To provide our services to you, we need to process certain personal data in accordance with our{' '}
            <Link href="/terms" target="_blank" className="font-medium text-[#00b14f] hover:underline">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms" target="_blank" className="font-medium text-[#00b14f] hover:underline">
              Terms of Service
            </Link>
            . Please choose the purposes you agree to below:
          </p>

          <div className="mt-4">{renderConsentCheckboxes('top')}</div>

          <div className="mt-6">
            <SocialAuthButtons portal="recruiter" mode="register" acceptTerms={acceptTerms} />
          </div>

          <div className="relative my-8 flex items-center justify-center">
            <div className="w-full border-t border-slate-200" />
            <span className="absolute bg-white px-3.5 text-xs font-medium text-slate-400">Or with email</span>
          </div>

          <div className="space-y-6 sm:space-y-7">
            <div>
              <Input
                id="email"
                label="Login email *"
                type="email"
                placeholder="Email"
                autoComplete="email"
                radius="md"
                inputSize="compact"
                leftIcon={<Mail className="h-4.5 w-4.5 text-[#00b14f]" />}
                error={errors.email?.message}
                {...register('email')}
              />
              <p className="mt-1.5 text-xs leading-normal text-slate-500">
                If you register with an email that is not a corporate domain email, certain services and features on
                your account may be restricted in purchase or usage.
              </p>
            </div>

            <div>
              <PasswordInput
                id="password"
                label="Password *"
                placeholder="Password"
                autoComplete="new-password"
                radius="md"
                inputSize="compact"
                leftIcon={<Lock className="h-4.5 w-4.5 text-[#00b14f]" />}
                error={errors.password?.message}
                {...register('password')}
              />
              {password && (
                <div className="mt-2 space-y-1.5" aria-live="polite">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-500">Password strength:</span>
                    <span className={`font-semibold ${passwordStrength.color}`}>{passwordStrength.label}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.bar}`}
                      style={{ width: passwordStrength.width }}
                    />
                  </div>
                </div>
              )}
            </div>

            <PasswordInput
              id="confirmPassword"
              label="Confirm password *"
              placeholder="Confirm password"
              autoComplete="new-password"
              radius="md"
              inputSize="compact"
              leftIcon={<Lock className="h-4.5 w-4.5 text-[#00b14f]" />}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </div>
        </div>

        {/* Section: Employer information */}
        <div className="border-t border-slate-200 pt-8">
          <h2 className="mb-5 text-lg font-bold text-slate-900">Employer information</h2>
          <RecruiterProfileFields register={register} errors={errors} />
        </div>

        {/* Section: Bottom Consent Checkboxes */}
        <div className="border-t border-slate-200 pt-8">
          <p className="mb-4 text-sm leading-relaxed text-slate-600">
            To provide our services to you, we need to process certain personal data in accordance with our{' '}
            <Link href="/terms" target="_blank" className="font-medium text-[#00b14f] hover:underline">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms" target="_blank" className="font-medium text-[#00b14f] hover:underline">
              Terms of Service
            </Link>
            . Please choose the purposes you agree to below:
          </p>
          {renderConsentCheckboxes('bottom')}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={!acceptTerms}
          className={cn(
            'w-full rounded-md py-3 text-base font-bold shadow-xs transition',
            !acceptTerms
              ? 'cursor-not-allowed bg-slate-200 text-slate-400 shadow-none hover:bg-slate-200'
              : 'cursor-pointer bg-[#00b14f] text-white shadow-md shadow-[#00b14f]/25 hover:bg-[#009b45]',
          )}
        >
          Complete
        </Button>
      </form>

      {/* Footer Links */}
      <div className="mt-6 text-center text-sm font-medium text-slate-600 sm:text-base">
        <span>Already have an account? </span>
        <Link href={ROUTES.RECRUITER_LOGIN} className="font-bold text-[#00b14f] hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
