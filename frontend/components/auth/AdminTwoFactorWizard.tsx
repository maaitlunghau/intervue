'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Download,
  KeyRound,
  QrCode,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export interface AdminTwoFactorWizardProps {
  setupData: {
    secret: string;
    qrCodeDataUrl: string;
    backupCodes: string[];
  };
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  hasConfirmedBackup: boolean;
  setHasConfirmedBackup: (confirmed: boolean) => void;
  isActivating: boolean;
  verifyError: string;
  onActivate: (e: React.FormEvent) => void;
  hasCopiedSecret: boolean;
  handleCopySecret: () => void;
  hasCopiedCodes: boolean;
  handleCopyCodes: () => void;
  handleDownloadCodes: () => void;
}

export default function AdminTwoFactorWizard({
  setupData,
  verificationCode,
  setVerificationCode,
  hasConfirmedBackup,
  setHasConfirmedBackup,
  isActivating,
  verifyError,
  onActivate,
  hasCopiedSecret,
  handleCopySecret,
  hasCopiedCodes,
  handleCopyCodes,
  handleDownloadCodes,
}: AdminTwoFactorWizardProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const steps = [
    { step: 1, label: 'Pair Device', icon: QrCode },
    { step: 2, label: 'Recovery Vault', icon: KeyRound },
    { step: 3, label: 'Verify & Activate', icon: ShieldCheck },
  ];

  return (
    <div className="relative w-full max-w-[580px]">
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

      {/* Floating Glassmorphic Wizard Card */}
      <div className="relative z-10 w-full rounded-[28px] border border-white/95 bg-white/92 p-7 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08),0_0_1px_1px_rgba(255,255,255,0.95)] backdrop-blur-2xl sm:rounded-[32px] sm:p-8">
        {/* Stepper Progress Bar */}
        <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-5">
          {steps.map((s, index) => {
            const isCompleted = currentStep > s.step;
            const isCurrent = currentStep === s.step;
            const Icon = s.icon;
            return (
              <React.Fragment key={s.step}>
                <div className="flex items-center gap-2.5">
                  <div
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition-all',
                      isCompleted
                        ? 'bg-emerald-100 text-[#00b14f]'
                        : isCurrent
                          ? 'bg-gradient-to-r from-[#00b14f] to-[#009643] text-white shadow-md ring-4 shadow-emerald-600/20 ring-emerald-500/10'
                          : 'bg-slate-100 text-slate-400',
                    )}
                  >
                    {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <div className="hidden sm:block">
                    <p
                      className={cn(
                        'text-[10px] font-bold tracking-wider uppercase',
                        isCurrent ? 'text-[#00b14f]' : 'text-slate-400',
                      )}
                    >
                      Step {s.step}
                    </p>
                    <p className={cn('text-xs font-bold', isCurrent ? 'text-slate-900' : 'text-slate-500')}>
                      {s.label}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'mx-2 h-0.5 flex-1 rounded-full transition-all sm:mx-3',
                      currentStep > s.step ? 'bg-[#00b14f]' : 'bg-slate-200/80',
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* ================= STEP 1: SCAN QR CODE ================= */}
        {currentStep === 1 && (
          <div className="animate-in fade-in space-y-5 duration-300">
            <div className="text-center">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                Scan QR with Authenticator
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Open Google Authenticator, Microsoft Authenticator, or 1Password to scan this QR code.
              </p>
            </div>

            {/* QR Code Container */}
            <div className="relative mx-auto flex h-44 w-44 items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-sm transition hover:shadow-md">
              {setupData.qrCodeDataUrl ? (
                <Image
                  src={setupData.qrCodeDataUrl}
                  alt="2FA QR Code"
                  width={160}
                  height={160}
                  className="h-full w-full object-contain"
                  unoptimized
                />
              ) : (
                <QrCode className="h-24 w-24 text-slate-300" />
              )}
            </div>

            {/* Manual Secret Key Fallback */}
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    Cannot scan QR? Enter key manually
                  </span>
                  <span className="mt-0.5 font-mono text-xs font-bold tracking-wider text-slate-800 select-all">
                    {setupData.secret}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopySecret}
                  className="flex cursor-pointer items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-[#00b14f] shadow-2xs transition hover:bg-emerald-50 active:scale-95"
                >
                  {hasCopiedSecret ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{hasCopiedSecret ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              <Link
                href="/admin/login"
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-slate-800"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
              </Link>
              <Button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00b14f] to-[#009643] px-6 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:from-[#009643] hover:to-[#007a36] active:scale-[0.99]"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Next: Save Recovery Codes
              </Button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: SAVE RECOVERY CODES ================= */}
        {currentStep === 2 && (
          <div className="animate-in fade-in space-y-5 duration-300">
            <div className="text-center">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                Save Emergency Recovery Codes
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Each code can be used <strong>only once</strong> if you lose your phone or authenticator app.
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-700">8 Recovery Vault Codes</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyCodes}
                  className="inline-flex cursor-pointer items-center gap-1 text-xs font-bold text-[#00b14f] transition hover:underline"
                >
                  {hasCopiedCodes ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {hasCopiedCodes ? 'Copied All' : 'Copy All'}
                </button>
                <span className="text-slate-300">•</span>
                <button
                  type="button"
                  onClick={handleDownloadCodes}
                  className="inline-flex cursor-pointer items-center gap-1 text-xs font-bold text-[#00b14f] transition hover:underline"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download (.txt)
                </button>
              </div>
            </div>

            {/* 2x4 Codes Grid */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {setupData.backupCodes.map((code, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200/90 bg-slate-50/80 px-2.5 py-2 text-center font-mono text-xs font-bold tracking-wider text-slate-800 shadow-2xs"
                >
                  {code}
                </div>
              ))}
            </div>

            {/* Confirmation Checkbox */}
            <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 text-xs transition select-none hover:bg-emerald-50/90">
              <input
                type="checkbox"
                checked={hasConfirmedBackup}
                onChange={(e) => setHasConfirmedBackup(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#00b14f] focus:ring-[#00b14f]"
              />
              <span className="font-semibold text-slate-700">
                I have securely saved these 8 emergency recovery codes in my safe storage or password manager.
              </span>
            </label>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="h-11 rounded-xl px-5 text-xs font-semibold text-slate-700"
                leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}
              >
                Previous
              </Button>
              <Button
                type="button"
                disabled={!hasConfirmedBackup}
                onClick={() => setCurrentStep(3)}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00b14f] to-[#009643] px-6 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:from-[#009643] hover:to-[#007a36] active:scale-[0.99] disabled:opacity-50"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Next: Verify Code
              </Button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: VERIFY OTP ================= */}
        {currentStep === 3 && (
          <form onSubmit={onActivate} className="animate-in fade-in space-y-5 duration-300">
            <div className="text-center">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                Enter Verification Code
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Enter the 6-digit code currently displayed in your authenticator app to activate 2FA.
              </p>
            </div>

            {/* Error Message */}
            {verifyError && (
              <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50/80 p-3 text-xs font-semibold text-rose-700">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                <span>{verifyError}</span>
              </div>
            )}

            {/* OTP Input Form */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-[#00b14f]">
                <Smartphone className="h-6 w-6" />
              </div>

              <div className="w-full max-w-xs">
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="000 000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  className="text-center font-mono text-2xl font-black tracking-[0.35em] text-[#00b14f]"
                  autoFocus
                />
              </div>

              <p className="mt-2 text-center text-[11px] text-slate-400">
                Verification codes refresh automatically every 30 seconds.
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              <Button
                type="button"
                variant="outline"
                disabled={isActivating}
                onClick={() => setCurrentStep(2)}
                className="h-11 rounded-xl px-5 text-xs font-semibold text-slate-700"
                leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}
              >
                Previous
              </Button>
              <Button
                type="submit"
                disabled={isActivating || verificationCode.length !== 6}
                isLoading={isActivating}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00b14f] to-[#009643] px-6 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:from-[#009643] hover:to-[#007a36] active:scale-[0.99] disabled:opacity-50"
                rightIcon={<CheckCircle2 className="h-4 w-4" />}
              >
                Activate 2FA & Access Console
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Note under card */}
      <p className="mt-4 text-center text-xs text-slate-500">
        By configuring 2FA you enforce multi-factor compliance under InterVue&apos;s{' '}
        <Link href="/privacy" className="font-medium text-[#00b14f] hover:underline">
          Security Policy
        </Link>
        .
      </p>
    </div>
  );
}
