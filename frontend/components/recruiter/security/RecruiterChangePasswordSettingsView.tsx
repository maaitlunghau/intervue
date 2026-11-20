'use client';

import FormErrorAlert from '@/components/auth/FormErrorAlert';
import Button from '@/components/ui/Button';
import PasswordInput from '@/components/ui/PasswordInput';
import { ROUTES } from '@/constants/routes';
import { useChangePassword } from '@/hooks/useAccountSecurity';
import { changePasswordSchema, type ChangePasswordFormData } from '@/schemas/auth.schema';
import { applyFormError } from '@/utils/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info, KeyRound, Lock } from 'lucide-react';
import Link from 'next/link';
import { useForm, useWatch } from 'react-hook-form';
import { AccountSettingsLayout } from '../company/AccountSettingsLayout';
import PasswordRequirements, { PasswordStrengthMeter } from '@/components/account/security/PasswordRequirements';

const EMPTY_FORM: ChangePasswordFormData = { currentPassword: '', password: '', confirmPassword: '' };

export default function RecruiterChangePasswordSettingsView() {
  const changePassword = useChangePassword('recruiter');

  const {
    register,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onTouched',
    defaultValues: EMPTY_FORM,
  });

  const password = useWatch({ control, name: 'password' });

  const onSubmit = handleSubmit((values) =>
    changePassword.mutate(values, {
      onSuccess: () => reset(EMPTY_FORM),
      onError: (error) => applyFormError(error, setError, ['currentPassword', 'password', 'confirmPassword']),
    }),
  );

  const handleCancel = () => {
    reset(EMPTY_FORM);
    clearErrors();
  };

  return (
    <AccountSettingsLayout activeTab="password" pageTitle="Change Password">
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">Change Password</h2>
          </div>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            To keep your recruiter account, candidate profiles and hiring data secure, choose a strong password.
          </p>
        </div>

        {/* Form Container (Full Width to Fill Available Content Space) */}
        <div className="w-full space-y-5">
          <FormErrorAlert message={errors.root?.message} />

          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <div>
              <PasswordInput
                label="Current password"
                placeholder="Enter your current password"
                autoComplete="current-password"
                error={errors.currentPassword?.message}
                {...register('currentPassword')}
              />
              <div className="mt-1.5 text-right">
                <Link
                  href={ROUTES.RECRUITER_FORGOT_PASSWORD}
                  className="text-xs font-semibold text-emerald-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <PasswordInput
                label="New password"
                placeholder="Enter a new password"
                autoComplete="new-password"
                error={errors.password?.message}
                {...register('password')}
              />
              <PasswordStrengthMeter password={password} />
            </div>

            <PasswordInput
              label="Confirm new password"
              placeholder="Re-enter the new password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <PasswordRequirements password={password} />

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
              <Info className="h-4 w-4 shrink-0 text-slate-400" />
              <span>Changing your password will automatically sign you out of all other devices.</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={changePassword.isPending}
                leftIcon={<Lock className="h-4 w-4" />}
              >
                Update password
              </Button>

              <Button type="button" variant="outline" size="md" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AccountSettingsLayout>
  );
}
