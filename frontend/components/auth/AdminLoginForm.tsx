'use client';

import { adminAuthApi } from '@/apiRequest/admin-auth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import { isApiError } from '@/lib/api-error';
import { toAdminSession } from '@/lib/auth-portal';
import { useAuthStore } from '@/store/auth.store';
import { ArrowLeft, ArrowRight, CheckCircle2, KeyRound, Lock, Mail, Smartphone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/admin/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // 2FA Challenge State
  const [is2FAStage, setIs2FAStage] = useState(false);
  const [tempToken, setTempToken] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [useBackupCode, setUseBackupCode] = useState(false);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both your administrator email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await adminAuthApi.login({ email, password });

      if (res.requiresTwoFactorSetup && res.tempToken) {
        toast.info('Mandatory Two-Factor Authentication setup required. Redirecting to security setup...');
        sessionStorage.setItem('admin_2fa_setup_token', res.tempToken);
        router.push(`/admin/two-factor/setup?redirect=${encodeURIComponent(redirectUrl)}`);
        return;
      }

      if (res.requiresTwoFactor && res.tempToken) {
        setTempToken(res.tempToken);
        setIs2FAStage(true);
        toast.info('Please enter your Two-Factor Authentication (2FA) code to continue.');
        return;
      }

      if (res.accessToken && res.admin) {
        useAuthStore.getState().setSession(toAdminSession(res), 'admin');
        toast.success('Admin authentication successful! Welcome to the Admin Console.');
        router.push(redirectUrl);
      }
    } catch (err) {
      if (isApiError(err)) {
        if (err.code === 'ADMIN_ACCESS_REQUIRED' || err.status === 403) {
          setErrorMsg('Access denied: This account does not possess Administrator privileges.');
        } else if (err.code === 'INVALID_CREDENTIALS' || err.status === 401) {
          setErrorMsg('Invalid credentials. Please verify your email and password.');
        } else {
          setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
        }
      } else {
        setErrorMsg('Unable to connect to security gateway. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FAVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!twoFactorCode.trim()) {
      setErrorMsg(
        useBackupCode ? 'Please enter your recovery backup code.' : 'Please enter the 6-digit verification code.',
      );
      return;
    }

    setIsLoading(true);
    try {
      const res = await adminAuthApi.verifyTwoFactor({
        tempToken,
        code: twoFactorCode.trim(),
      });

      if (res.accessToken && res.admin) {
        useAuthStore.getState().setSession(toAdminSession(res), 'admin');
        toast.success('Two-factor verification confirmed. Welcome, Administrator.');
        router.push(redirectUrl);
      }
    } catch (err) {
      if (isApiError(err)) {
        setErrorMsg(err.message || 'Invalid or expired verification code.');
      } else {
        setErrorMsg('Verification error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-[430px]">
      {/* Decorative 3D tilted card accent behind top-right corner */}
      <div
        aria-hidden="true"
        className="absolute -top-4 -right-4 z-0 h-28 w-28 -rotate-12 rounded-3xl bg-gradient-to-tr from-[#00b14f] via-[#10b981] to-[#34d399] opacity-90 shadow-xl shadow-emerald-600/30 transition-transform duration-500 hover:rotate-[-6deg] sm:-top-5 sm:-right-5"
      />

      {/* Decorative subtle ambient soft glow */}
      <div
        aria-hidden="true"
        className="absolute -bottom-8 -left-8 z-0 h-36 w-36 rounded-full bg-emerald-200/60 blur-2xl"
      />

      {/* Floating Glassmorphic Login Card */}
      <div className="relative z-10 w-full rounded-[28px] border border-white/95 bg-white/92 p-7 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08),0_0_1px_1px_rgba(255,255,255,0.95)] backdrop-blur-2xl sm:rounded-[32px] sm:p-8">
        {/* Card Header with official transparent InterVue brand logo */}
        <div className="mx-auto mb-4 flex flex-col items-center text-center">
          <Image
            src="/intervue-logo-transparent.png"
            alt="InterVue"
            width={190}
            height={52}
            priority
            className="mb-2.5 h-10 w-auto object-contain sm:h-11"
          />
          <h2 className="text-center text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">Admin Portal</h2>
          <p className="mt-1 mb-5 text-center text-xs font-medium text-slate-500">
            Secure Digital Access • Management System
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50/80 p-3 text-xs font-semibold text-rose-700">
            <span className="shrink-0 font-bold">⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {!is2FAStage ? (
          /* ================= PASSWORD LOGIN FORM ================= */
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">Username</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                autoFocus
                autoComplete="email"
                inputSize="compact"
                radius="md"
                leftIcon={<Mail className="h-4 w-4 text-[#00b14f]" />}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">Password</label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                inputSize="compact"
                radius="md"
                leftIcon={<Lock className="h-4 w-4 text-[#00b14f]" />}
              />
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#00b14f] focus:ring-[#00b14f]"
                />
                <span>Remember me</span>
              </label>
              <Link
                href="mailto:security@intervue.vn?subject=Admin%20Password%20Assistance"
                className="text-xs font-medium text-[#00b14f] transition hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="mt-2 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00b14f] to-[#009643] text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:from-[#009643] hover:to-[#007a36] active:scale-[0.99] disabled:opacity-60"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Sign in securely
            </Button>

            {/* Trust Badges under button matching inspiration */}
            <div className="mt-4 flex items-center justify-center gap-3 pt-1 text-[11px] font-medium text-slate-500">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-[#00b14f]" />
                Secure Login
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Lock className="h-3 w-3 text-slate-400" />
                SSL Protected
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <KeyRound className="h-3 w-3 text-slate-400" />
                256-bit TLS
              </span>
            </div>
          </form>
        ) : (
          /* ================= TWO-FACTOR AUTHENTICATION FORM ================= */
          <form onSubmit={handle2FAVerify} className="space-y-4">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-[#00b14f]">
                {useBackupCode ? <KeyRound className="h-5 w-5" /> : <Smartphone className="h-5 w-5" />}
              </div>
              <h3 className="mt-2 text-sm font-bold text-slate-800">
                {useBackupCode ? 'Enter Backup Recovery Code' : 'Two-Factor Authentication'}
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">
                {useBackupCode
                  ? 'Enter one of your 8-character backup recovery codes.'
                  : 'Enter the 6-digit code from your authenticator app.'}
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                {useBackupCode ? 'Backup Recovery Code' : '6-Digit Verification Code'}
              </label>
              <Input
                type="text"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                placeholder={useBackupCode ? '8912-4019' : '123456'}
                required
                autoFocus
                inputSize="compact"
                radius="md"
                maxLength={useBackupCode ? 12 : 6}
                className="text-center font-mono text-xl font-bold tracking-widest text-[#00b14f]"
              />
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="mt-2 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00b14f] to-[#009643] text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:from-[#009643] hover:to-[#007a36] active:scale-[0.99] disabled:opacity-60"
              rightIcon={<CheckCircle2 className="h-4 w-4" />}
            >
              Verify & Complete Sign In
            </Button>

            <div className="flex items-center justify-between pt-1 text-xs">
              <button
                type="button"
                onClick={() => {
                  setUseBackupCode(!useBackupCode);
                  setTwoFactorCode('');
                  setErrorMsg('');
                }}
                className="cursor-pointer font-semibold text-[#00b14f] hover:underline"
              >
                {useBackupCode ? 'Use authenticator app' : 'Use backup recovery code'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIs2FAStage(false);
                  setTempToken('');
                  setTwoFactorCode('');
                  setErrorMsg('');
                }}
                className="flex cursor-pointer items-center gap-1 font-semibold text-slate-500 hover:text-slate-800"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Note under card */}
      <p className="mt-4 text-center text-xs text-slate-500">
        By signing in you agree to the Portal&apos;s{' '}
        <Link href="/terms" className="font-medium text-[#00b14f] hover:underline">
          Terms
        </Link>{' '}
        &{' '}
        <Link href="/privacy" className="font-medium text-[#00b14f] hover:underline">
          Security Policy
        </Link>
        .
      </p>
    </div>
  );
}
