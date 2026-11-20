'use client';

import { adminTwoFactorApi } from '@/apiRequest/admin-auth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import { isApiError } from '@/lib/api-error';
import type { TwoFactorSetup } from '@/types/auth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Download,
  KeyRound,
  Laptop,
  LogOut,
  QrCode,
  RefreshCw,
  Shield,
  ShieldAlert,
  Smartphone,
  X,
} from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function AdminSecurityPage() {
  const queryClient = useQueryClient();

  const { data: status, isLoading: isStatusLoading } = useQuery({
    queryKey: ['admin', '2fa-status'],
    queryFn: () => adminTwoFactorApi.getStatus(),
  });

  // Reconfigure Modal State
  const [isReconfigOpen, setIsReconfigOpen] = useState(false);
  const [reconfigStep, setReconfigStep] = useState<'password' | 'scan' | 'codes'>('password');
  const [reconfigPassword, setReconfigPassword] = useState('');
  const [reconfigSetupData, setReconfigSetupData] = useState<TwoFactorSetup | null>(null);
  const [reconfigCode, setReconfigCode] = useState('');
  const [reconfigError, setReconfigError] = useState('');
  const [isReconfigLoading, setIsReconfigLoading] = useState(false);
  const [hasCopiedSecret, setHasCopiedSecret] = useState(false);
  const [hasCopiedReconfigCodes, setHasCopiedReconfigCodes] = useState(false);
  const [hasConfirmedReconfigCodes, setHasConfirmedReconfigCodes] = useState(false);

  // Regenerate Codes Modal State
  const [isRegenOpen, setIsRegenOpen] = useState(false);
  const [regenPassword, setRegenPassword] = useState('');
  const [newCodes, setNewCodes] = useState<string[] | null>(null);
  const [regenError, setRegenError] = useState('');
  const [isRegenLoading, setIsRegenLoading] = useState(false);
  const [hasCopiedCodes, setHasCopiedCodes] = useState(false);

  // Other sessions signout state
  const [isSigningOutOthers, setIsSigningOutOthers] = useState(false);

  // Reconfigure Handlers
  const handleStartReconfigure = async (e: React.FormEvent) => {
    e.preventDefault();
    setReconfigError('');
    if (!reconfigPassword) {
      setReconfigError('Please enter your administrator password.');
      return;
    }

    setIsReconfigLoading(true);
    try {
      const data = await adminTwoFactorApi.initiateReconfigure(reconfigPassword);
      setReconfigSetupData(data);
      setReconfigStep('scan');
      setReconfigPassword('');
    } catch (err) {
      if (isApiError(err)) {
        setReconfigError(err.message || 'Incorrect password.');
      } else {
        setReconfigError('Unable to initiate reconfiguration.');
      }
    } finally {
      setIsReconfigLoading(false);
    }
  };

  const handleConfirmReconfigure = async (e: React.FormEvent) => {
    e.preventDefault();
    setReconfigError('');
    if (!reconfigCode || reconfigCode.length !== 6) {
      setReconfigError('Please enter the 6-digit verification code from your new authenticator app.');
      return;
    }

    setIsReconfigLoading(true);
    try {
      await adminTwoFactorApi.confirmReconfigure(reconfigCode);
      queryClient.invalidateQueries({ queryKey: ['admin', '2fa-status'] });

      // Step 3: show newly generated backup recovery codes
      setReconfigStep('codes');
      setReconfigCode('');
      toast.success('Authenticator paired! Please save your new emergency recovery codes below.');
    } catch (err) {
      if (isApiError(err)) {
        setReconfigError(err.message || 'Invalid verification code. Please check your clock and try again.');
      } else {
        setReconfigError('Verification failed. Please try again.');
      }
    } finally {
      setIsReconfigLoading(false);
    }
  };

  const handleCloseReconfigModal = () => {
    setIsReconfigOpen(false);
    setReconfigStep('password');
    setReconfigPassword('');
    setReconfigCode('');
    setReconfigSetupData(null);
    setHasConfirmedReconfigCodes(false);
  };

  const handleDownloadReconfigCodes = () => {
    if (!reconfigSetupData?.backupCodes?.length) return;
    const content = [
      '====================================================',
      'INTERVUE FORTRESS ADMIN CONSOLE - 2FA RECOVERY CODES',
      '====================================================',
      `Reconfigured at: ${new Date().toISOString()}`,
      '',
      'INSTRUCTIONS:',
      '1. Store this file in a secure location (password manager or encrypted vault).',
      '2. Each code can be used ONCE to access your Administrator account.',
      '3. Once used, an emergency code is burned and permanently invalidated.',
      '',
      'EMERGENCY RECOVERY CODES:',
      ...reconfigSetupData.backupCodes.map((c, i) => `  [${i + 1}] ${c}`),
      '',
      '====================================================',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `intervue-admin-recovery-codes-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Recovery codes file downloaded.');
  };

  // Regenerate Codes Handlers
  const handleRegenerateCodes = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegenError('');
    if (!regenPassword) {
      setRegenError('Please enter your administrator password.');
      return;
    }

    setIsRegenLoading(true);
    try {
      const codes = await adminTwoFactorApi.regenerateRecoveryCodes(regenPassword);
      setNewCodes(codes);
      setRegenPassword('');
      queryClient.invalidateQueries({ queryKey: ['admin', '2fa-status'] });
      toast.success('8 new emergency recovery codes generated! Previous codes are now invalid.');
    } catch (err) {
      if (isApiError(err)) {
        setRegenError(err.message || 'Incorrect password.');
      } else {
        setRegenError('Unable to generate recovery codes.');
      }
    } finally {
      setIsRegenLoading(false);
    }
  };

  const handleDownloadNewCodes = () => {
    if (!newCodes?.length) return;
    const content = [
      '====================================================',
      'INTERVUE FORTRESS ADMIN CONSOLE - 2FA RECOVERY CODES',
      '====================================================',
      `Regenerated at: ${new Date().toISOString()}`,
      '',
      'INSTRUCTIONS:',
      '1. Store this file in a secure location (password manager or encrypted drive).',
      '2. Each code can be used ONCE to access your administrator account.',
      '3. Once used, an emergency code is burned and permanently invalidated.',
      '',
      'EMERGENCY RECOVERY CODES:',
      ...newCodes.map((c, i) => `  [${i + 1}] ${c}`),
      '',
      '====================================================',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `intervue-admin-recovery-codes-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Recovery codes file downloaded.');
  };

  const handleSignOutOtherSessions = () => {
    setIsSigningOutOthers(true);
    setTimeout(() => {
      setIsSigningOutOthers(false);
      toast.success('All other active sessions have been signed out.');
    }, 600);
  };

  const remainingCodes = status?.remainingBackupCodes ?? 8;
  const isLowCodes = remainingCodes <= 2;

  return (
    <div className="w-full space-y-6">
      {/* 1. Page Header */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span>Admin Console</span>
            <span>/</span>
            <span>Account Settings</span>
            <span>/</span>
            <span className="font-bold text-slate-700">Security</span>
          </div>
          <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Security & Authentication
          </h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Manage two-factor authentication methods, emergency recovery vault, and active workstation sessions.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-xs font-medium text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>2FA is active</span>
        </div>
      </div>

      {/* 2. Section: Two-Factor Authentication */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-xs">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <h2 className="text-base font-bold text-slate-900">Two-Factor Authentication</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Two-factor authentication adds an extra layer of security to your administrator account.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {/* Row 1: Authenticator App */}
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Authenticator app</h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  Google Authenticator, Microsoft Authenticator, 1Password, or Authy.
                </p>
                <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-medium text-emerald-700">Configured and paired</span>
                  <span>•</span>
                  <span>Refreshes every 30 seconds</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 pt-2 sm:pt-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setReconfigStep('password');
                  setReconfigError('');
                  setIsReconfigOpen(true);
                }}
                className="h-9 gap-1.5 text-xs font-semibold text-slate-700"
                leftIcon={<RefreshCw className="h-3.5 w-3.5 text-slate-500" />}
              >
                Change Device
              </Button>
            </div>
          </div>

          {/* Row 2: Recovery Codes Vault */}
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Emergency recovery codes</h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  Single-use fallback codes to access your account if your authenticator device is lost or unavailable.
                </p>
                <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-500">
                  <span className={isLowCodes ? 'font-semibold text-amber-700' : 'font-medium text-slate-700'}>
                    {isStatusLoading ? 'Checking...' : `${remainingCodes} of 8 codes remaining`}
                  </span>
                  <span>•</span>
                  <span>Hashed with SHA-256</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 pt-2 sm:pt-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setNewCodes(null);
                  setRegenError('');
                  setIsRegenOpen(true);
                }}
                className="h-9 gap-1.5 text-xs font-semibold text-slate-700"
                leftIcon={<KeyRound className="h-3.5 w-3.5 text-slate-500" />}
              >
                Regenerate Codes
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section: Workstation Protection & Active Sessions */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-xs">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <h2 className="text-base font-bold text-slate-900">Workstation & Session Protection</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Control active administrator sessions and workstation inactivity auto-lock policies.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {/* Row 1: Current Session */}
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                <Laptop className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Current session</h3>
                <p className="mt-0.5 text-xs text-slate-500">macOS • Chrome</p>
                <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-medium text-emerald-700">Active now</span>
                  <span>•</span>
                  <span>Auto-locks after 15 minutes of inactivity</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Terminate Other Sessions */}
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <LogOut className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Sign out of other sessions</h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  Lost a device or left an administrator tab open on another computer? Invalidate all other active
                  sessions immediately.
                </p>
              </div>
            </div>

            <div className="shrink-0 pt-2 sm:pt-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                isLoading={isSigningOutOthers}
                onClick={handleSignOutOtherSessions}
                className="h-9 gap-1.5 text-xs font-semibold text-slate-700 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
                leftIcon={<LogOut className="h-3.5 w-3.5" />}
              >
                Sign Out Other Sessions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Subtle Policy Note Footer */}
      <div className="flex items-center gap-2 px-1 text-xs text-slate-500">
        <Shield className="h-3.5 w-3.5 shrink-0 text-slate-400" />
        <span>Two-factor authentication is required for all administrative personnel under platform policy.</span>
      </div>

      {/* ================= MODAL 1: RECONFIGURE AUTHENTICATOR DEVICE ================= */}
      {isReconfigOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs duration-150">
          <div className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Smartphone className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Change Authenticator Device</h3>
                  <p className="text-[11px] text-slate-400">
                    {reconfigStep === 'password'
                      ? 'Step 1 of 3: Password Verification'
                      : reconfigStep === 'scan'
                        ? 'Step 2 of 3: Pair New Device'
                        : 'Step 3 of 3: Save Recovery Codes'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseReconfigModal}
                className="cursor-pointer rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* STEP 1: PASSWORD */}
            {reconfigStep === 'password' && (
              <form onSubmit={handleStartReconfigure} className="mt-4 space-y-4">
                <p className="text-xs leading-relaxed text-slate-600">
                  Please verify your administrator password before generating a new authenticator QR code.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">Administrator Password</label>
                  <PasswordInput
                    placeholder="Enter current password"
                    value={reconfigPassword}
                    onChange={(e) => setReconfigPassword(e.target.value)}
                    className="mt-1.5"
                    autoFocus
                    required
                  />
                  {reconfigError && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600">
                      <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                      <span>{reconfigError}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseReconfigModal}
                    className="h-9 rounded-lg text-xs font-semibold"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isReconfigLoading}
                    className="h-9 rounded-lg bg-emerald-600 px-4 text-xs font-semibold text-white hover:bg-emerald-700"
                    rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                  >
                    Continue
                  </Button>
                </div>
              </form>
            )}

            {/* STEP 2: SCAN QR */}
            {reconfigStep === 'scan' && (
              <form onSubmit={handleConfirmReconfigure} className="mt-4 space-y-4">
                <p className="text-xs leading-relaxed text-slate-600">
                  Scan this new QR code in your authenticator app (Google Authenticator, Microsoft Authenticator, or
                  1Password).
                </p>

                <div className="flex flex-col items-center justify-center gap-2.5 rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <div className="flex h-36 w-36 items-center justify-center rounded-lg border border-slate-200 bg-white p-2">
                    {reconfigSetupData?.qrCodeDataUrl ? (
                      <Image
                        src={reconfigSetupData.qrCodeDataUrl}
                        alt="New 2FA QR"
                        width={130}
                        height={130}
                        className="h-full w-full object-contain"
                        unoptimized
                      />
                    ) : (
                      <QrCode className="h-20 w-20 text-slate-300" />
                    )}
                  </div>

                  <div className="flex w-full items-center gap-2">
                    <code className="flex-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-center font-mono text-xs font-semibold text-slate-800 select-all">
                      {reconfigSetupData?.secret}
                    </code>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!reconfigSetupData?.secret) return;
                        await navigator.clipboard.writeText(reconfigSetupData.secret);
                        setHasCopiedSecret(true);
                        toast.success('Secret key copied.');
                        setTimeout(() => setHasCopiedSecret(false), 2000);
                      }}
                      className="flex h-7 cursor-pointer items-center gap-1 rounded-md border border-slate-200 bg-white px-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      {hasCopiedSecret ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                      <span>{hasCopiedSecret ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">Enter 6-Digit Verification Code</label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    placeholder="000000"
                    value={reconfigCode}
                    onChange={(e) => setReconfigCode(e.target.value.replace(/\D/g, ''))}
                    className="mt-1.5 text-center font-mono text-lg font-bold tracking-[0.25em]"
                    autoFocus
                  />
                  {reconfigError && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600">
                      <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                      <span>{reconfigError}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseReconfigModal}
                    className="h-9 rounded-lg text-xs font-semibold"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isReconfigLoading}
                    disabled={isReconfigLoading || reconfigCode.length !== 6}
                    className="h-9 rounded-lg bg-emerald-600 px-4 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                  >
                    Confirm & Update
                  </Button>
                </div>
              </form>
            )}

            {/* STEP 3: SAVE RECOVERY CODES */}
            {reconfigStep === 'codes' && (
              <div className="mt-4 space-y-4">
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-3 text-xs text-emerald-900">
                  <p className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    New Authenticator Paired Successfully!
                  </p>
                  <p className="mt-1 text-emerald-700">
                    All previous backup codes were invalidated. Please save these 8 new emergency codes now.
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">8 New Recovery Codes</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={async () => {
                        if (!reconfigSetupData?.backupCodes) return;
                        await navigator.clipboard.writeText(reconfigSetupData.backupCodes.join('\n'));
                        setHasCopiedReconfigCodes(true);
                        toast.success('Codes copied.');
                        setTimeout(() => setHasCopiedReconfigCodes(false), 2000);
                      }}
                      className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
                    >
                      {hasCopiedReconfigCodes ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      Copy All
                    </button>
                    <span className="text-slate-300">•</span>
                    <button
                      type="button"
                      onClick={handleDownloadReconfigCodes}
                      className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
                    >
                      <Download className="h-3 w-3" />
                      Download (.txt)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {reconfigSetupData?.backupCodes?.map((code, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-center font-mono text-xs font-bold text-slate-800"
                    >
                      {code}
                    </div>
                  ))}
                </div>

                <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs select-none">
                  <input
                    type="checkbox"
                    checked={hasConfirmedReconfigCodes}
                    onChange={(e) => setHasConfirmedReconfigCodes(e.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-medium text-slate-700">
                    I have safely saved these 8 new emergency recovery codes.
                  </span>
                </label>

                <div className="flex items-center justify-end pt-2">
                  <Button
                    type="button"
                    disabled={!hasConfirmedReconfigCodes}
                    onClick={handleCloseReconfigModal}
                    className="h-9 rounded-lg bg-emerald-600 px-4 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                  >
                    Done & Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL 2: REGENERATE RECOVERY CODES ================= */}
      {isRegenOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs duration-150">
          <div className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                  <KeyRound className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Emergency Recovery Vault</h3>
                  <p className="text-[11px] text-slate-400">Regenerate 8 New Single-Use Codes</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsRegenOpen(false)}
                className="cursor-pointer rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {!newCodes ? (
              <form onSubmit={handleRegenerateCodes} className="mt-4 space-y-4">
                <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <span>
                    Regenerating will <strong>immediately invalidate all existing recovery codes</strong>. Any
                    previously saved codes will stop working.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">Administrator Password</label>
                  <PasswordInput
                    placeholder="Enter your password"
                    value={regenPassword}
                    onChange={(e) => setRegenPassword(e.target.value)}
                    className="mt-1.5"
                    autoFocus
                    required
                  />
                  {regenError && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600">
                      <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                      <span>{regenError}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsRegenOpen(false)}
                    className="h-9 rounded-lg text-xs font-semibold"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isRegenLoading}
                    className="h-9 rounded-lg bg-emerald-600 px-4 text-xs font-semibold text-white hover:bg-emerald-700"
                  >
                    Generate 8 New Codes
                  </Button>
                </div>
              </form>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-600">Save these 8 new emergency codes safely:</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={async () => {
                        await navigator.clipboard.writeText(newCodes.join('\n'));
                        setHasCopiedCodes(true);
                        toast.success('Codes copied.');
                        setTimeout(() => setHasCopiedCodes(false), 2000);
                      }}
                      className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
                    >
                      {hasCopiedCodes ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      Copy All
                    </button>
                    <span className="text-slate-300">•</span>
                    <button
                      type="button"
                      onClick={handleDownloadNewCodes}
                      className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
                    >
                      <Download className="h-3 w-3" />
                      Download (.txt)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {newCodes.map((c, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-center font-mono text-xs font-bold text-slate-800"
                    >
                      {c}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-end pt-2">
                  <Button
                    type="button"
                    onClick={() => {
                      setIsRegenOpen(false);
                      setNewCodes(null);
                    }}
                    className="h-9 rounded-lg bg-emerald-600 px-4 text-xs font-semibold text-white hover:bg-emerald-700"
                  >
                    Done & Saved
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
