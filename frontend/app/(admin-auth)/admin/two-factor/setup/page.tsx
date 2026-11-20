'use client';

import { adminAuthApi } from '@/apiRequest/admin-auth';
import AdminAuthLayout from '@/components/auth/AdminAuthLayout';
import AdminTwoFactorWizard from '@/components/auth/AdminTwoFactorWizard';
import { isApiError } from '@/lib/api-error';
import { toAdminSession } from '@/lib/auth-portal';
import { useAuthStore } from '@/store/auth.store';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import { toast } from 'sonner';

function getStoredSetupToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('admin_2fa_setup_token');
}

function AdminTwoFactorSetupContent() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/admin/dashboard';
  const tokenFromQuery = searchParams.get('tempToken');

  const {
    data: setupData,
    isLoading: isLoadingSetup,
    error: queryError,
  } = useQuery({
    queryKey: ['admin', '2fa-setup', tokenFromQuery],
    queryFn: () => {
      const token = tokenFromQuery || getStoredSetupToken();
      if (!token) throw new Error('Missing setup token');
      return adminAuthApi.setupTwoFactor(token);
    },
    retry: false,
  });

  const setupError = queryError
    ? isApiError(queryError)
      ? queryError.message
      : 'Your setup session has expired or is invalid. Please sign in again.'
    : '';

  // Wizard state
  const [hasCopiedSecret, setHasCopiedSecret] = useState(false);
  const [hasCopiedCodes, setHasCopiedCodes] = useState(false);
  const [hasConfirmedBackup, setHasConfirmedBackup] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [verifyError, setVerifyError] = useState('');

  const handleCopySecret = async () => {
    if (!setupData?.secret) return;
    try {
      await navigator.clipboard.writeText(setupData.secret);
      setHasCopiedSecret(true);
      toast.success('Secret key copied to clipboard.');
      setTimeout(() => setHasCopiedSecret(false), 2500);
    } catch {
      toast.error('Could not copy to clipboard.');
    }
  };

  const handleCopyCodes = async () => {
    if (!setupData?.backupCodes?.length) return;
    try {
      await navigator.clipboard.writeText(setupData.backupCodes.join('\n'));
      setHasCopiedCodes(true);
      toast.success('All 8 emergency recovery codes copied to clipboard.');
      setTimeout(() => setHasCopiedCodes(false), 2500);
    } catch {
      toast.error('Could not copy to clipboard.');
    }
  };

  const handleDownloadCodes = () => {
    if (!setupData?.backupCodes?.length) return;
    const content = [
      '====================================================',
      'INTERVUE FORTRESS ADMIN CONSOLE - 2FA RECOVERY CODES',
      '====================================================',
      `Generated at: ${new Date().toISOString()}`,
      '',
      'INSTRUCTIONS:',
      '1. Store this file in a secure location (password manager, encrypted drive, or printout).',
      '2. Each recovery code can only be used ONCE to access your Administrator account.',
      '3. Once used, an emergency code is burned and permanently invalidated.',
      '',
      'EMERGENCY RECOVERY CODES:',
      ...setupData.backupCodes.map((code, idx) => `  [${idx + 1}] ${code}`),
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
    toast.success('Emergency recovery codes downloaded successfully.');
  };

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyError('');

    if (!verificationCode.trim() || verificationCode.trim().length !== 6) {
      setVerifyError('Please enter the 6-digit verification code from your authenticator app.');
      return;
    }

    if (!hasConfirmedBackup) {
      setVerifyError('Please confirm that you have saved your emergency recovery codes.');
      return;
    }

    const token = tokenFromQuery || getStoredSetupToken();
    if (!token) {
      setVerifyError('Your setup session has expired or is invalid. Please sign in again.');
      return;
    }

    setIsActivating(true);
    try {
      const res = await adminAuthApi.confirmTwoFactor({
        tempToken: token,
        code: verificationCode.trim(),
      });

      if (res.accessToken && res.admin) {
        sessionStorage.removeItem('admin_2fa_setup_token');
        useAuthStore.getState().setSession(toAdminSession(res), 'admin');
        toast.success('Two-factor authentication successfully activated! Welcome, Administrator.');
        window.location.assign(redirectUrl);
      }
    } catch (err) {
      if (isApiError(err)) {
        setVerifyError(
          err.message || 'Invalid verification code. Please check your authenticator clock and try again.',
        );
      } else {
        setVerifyError('An unexpected verification error occurred. Please try again.');
      }
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <AdminAuthLayout>
      {isLoadingSetup ? (
        <div className="relative z-10 w-full max-w-[580px] rounded-[28px] border border-white/95 bg-white/92 p-12 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] backdrop-blur-2xl sm:rounded-[32px]">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-3 border-[#00b14f] border-t-transparent" />
          <p className="mt-4 text-sm font-bold text-slate-800">Initiating cryptographic 2FA setup...</p>
          <p className="mt-1 text-xs text-slate-500">Generating secure seed and emergency recovery vault.</p>
        </div>
      ) : setupError ? (
        <div className="relative z-10 w-full max-w-[580px] rounded-[28px] border border-white/95 bg-white/92 p-10 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] backdrop-blur-2xl sm:rounded-[32px]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
            <ShieldAlert className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-base font-extrabold text-slate-900">Setup Session Expired</h3>
          <p className="mx-auto mt-1.5 max-w-sm text-xs leading-relaxed text-slate-500">{setupError}</p>
          <div className="mt-6">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00b14f] to-[#009643] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition hover:from-[#009643] hover:to-[#007a36]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Admin Login
            </Link>
          </div>
        </div>
      ) : setupData ? (
        <AdminTwoFactorWizard
          setupData={setupData}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          hasConfirmedBackup={hasConfirmedBackup}
          setHasConfirmedBackup={setHasConfirmedBackup}
          isActivating={isActivating}
          verifyError={verifyError}
          onActivate={handleActivate}
          hasCopiedSecret={hasCopiedSecret}
          handleCopySecret={handleCopySecret}
          hasCopiedCodes={hasCopiedCodes}
          handleCopyCodes={handleCopyCodes}
          handleDownloadCodes={handleDownloadCodes}
        />
      ) : null}
    </AdminAuthLayout>
  );
}

export default function AdminTwoFactorSetupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#fafcf9]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#00b14f] border-t-transparent" />
        </div>
      }
    >
      <AdminTwoFactorSetupContent />
    </Suspense>
  );
}
