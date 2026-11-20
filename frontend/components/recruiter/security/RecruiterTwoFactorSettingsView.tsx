'use client';

import { recruiterTwoFactorApi } from '@/apiRequest/two-factor';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import PasswordInput from '@/components/ui/PasswordInput';
import { isApiError } from '@/lib/api-error';
import { cn } from '@/lib/utils';
import type { TrustedDevice, TwoFactorSetup, TwoFactorStatus } from '@/types/auth';
import { formatDate } from '@/utils/datetime';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  Globe,
  Laptop,
  QrCode,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { AccountSettingsLayout } from '../company/AccountSettingsLayout';

export default function RecruiterTwoFactorSettingsView() {
  const queryClient = useQueryClient();

  // Status query
  const { data: status, isLoading: isStatusLoading } = useQuery<TwoFactorStatus>({
    queryKey: ['recruiter-two-factor-status'],
    queryFn: recruiterTwoFactorApi.getStatus,
  });

  const isEnabled = status?.enabled ?? false;

  // Setup initiate query (only active if 2FA is NOT enabled)
  const { data: setupData } = useQuery<TwoFactorSetup>({
    queryKey: ['recruiter-two-factor-setup'],
    queryFn: recruiterTwoFactorApi.setup,
    enabled: !isEnabled && !isStatusLoading,
  });

  // Trusted devices query
  const { data: trustedDevices, isLoading: isDevicesLoading } = useQuery<TrustedDevice[]>({
    queryKey: ['recruiter-trusted-devices'],
    queryFn: recruiterTwoFactorApi.getTrustedDevices,
    enabled: isEnabled,
  });

  // Setup state
  const [otpCode, setOtpCode] = useState('');
  const [hasConfirmedBackup, setHasConfirmedBackup] = useState(false);
  const [isCopiedKey, setIsCopiedKey] = useState(false);
  const [isCopiedBackup, setIsCopiedBackup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Disable modal state
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [disablePassword, setDisablePassword] = useState('');
  const [disableError, setDisableError] = useState('');

  // Reconfigure modal state
  const [showReconfigureModal, setShowReconfigureModal] = useState(false);
  const [reconfigureStep, setReconfigureStep] = useState<'password' | 'qr'>('password');
  const [reconfigurePassword, setReconfigurePassword] = useState('');
  const [reconfigureOtp, setReconfigureOtp] = useState('');
  const [reconfigureSetupData, setReconfigureSetupData] = useState<TwoFactorSetup | null>(null);
  const [reconfigureError, setReconfigureError] = useState('');
  const [isReconfiguring, setIsReconfiguring] = useState(false);

  // Regenerate codes modal state
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);
  const [regenerateStep, setRegenerateStep] = useState<'password' | 'codes'>('password');
  const [regeneratePassword, setRegeneratePassword] = useState('');
  const [newBackupCodes, setNewBackupCodes] = useState<string[]>([]);
  const [regenerateError, setRegenerateError] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isCopiedNewCodes, setIsCopiedNewCodes] = useState(false);

  // Mutations
  const revokeDeviceMutation = useMutation({
    mutationFn: (id: number) => recruiterTwoFactorApi.revokeTrustedDevice(id),
    onSuccess: () => {
      toast.success('Đã thu hồi thiết bị tin cậy.');
      queryClient.invalidateQueries({ queryKey: ['recruiter-trusted-devices'] });
    },
    onError: () => toast.error('Không thể thu hồi thiết bị.'),
  });

  const revokeAllDevicesMutation = useMutation({
    mutationFn: () => recruiterTwoFactorApi.revokeAllTrustedDevices(),
    onSuccess: () => {
      toast.success('Đã thu hồi tất cả thiết bị tin cậy.');
      queryClient.invalidateQueries({ queryKey: ['recruiter-trusted-devices'] });
    },
    onError: () => toast.error('Không thể thu hồi danh sách thiết bị.'),
  });

  // Copy manual key
  const handleCopyKey = () => {
    if (setupData?.secret) {
      navigator.clipboard.writeText(setupData.secret);
      setIsCopiedKey(true);
      setTimeout(() => setIsCopiedKey(false), 2000);
    }
  };

  // Copy initial backup codes
  const handleCopyBackupCodes = () => {
    if (setupData?.backupCodes) {
      navigator.clipboard.writeText(setupData.backupCodes.join('\n'));
      setIsCopiedBackup(true);
      setTimeout(() => setIsCopiedBackup(false), 2000);
    }
  };

  // Download backup codes as .txt
  const handleDownloadBackupCodes = () => {
    if (setupData?.backupCodes) {
      const element = document.createElement('a');
      const file = new Blob([setupData.backupCodes.join('\n')], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'intervue-recruiter-recovery-codes.txt';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  // Verify and enable 2FA initial setup
  const handleVerifyAndEnable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) {
      setErrorMsg('Vui lòng nhập đầy đủ 6 chữ số mã xác thực.');
      return;
    }
    if (!hasConfirmedBackup) {
      setErrorMsg('Vui lòng xác nhận bạn đã lưu trữ 8 mã khôi phục an toàn.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await recruiterTwoFactorApi.confirm(otpCode);
      toast.success('Đã kích hoạt xác thực 2 bước (2FA) thành công!');
      queryClient.invalidateQueries({ queryKey: ['recruiter-two-factor-status'] });
      queryClient.invalidateQueries({ queryKey: ['recruiter-trusted-devices'] });
      setOtpCode('');
    } catch (err) {
      setErrorMsg(isApiError(err) ? err.message : 'Mã xác thực không hợp lệ hoặc đã hết hạn.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Disable 2FA
  const handleDisable2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisableError('');
    setIsSubmitting(true);
    try {
      await recruiterTwoFactorApi.disable(disablePassword);
      toast.success('Đã tắt xác thực hai yếu tố.');
      setShowDisableModal(false);
      setDisablePassword('');
      queryClient.invalidateQueries({ queryKey: ['recruiter-two-factor-status'] });
      queryClient.invalidateQueries({ queryKey: ['recruiter-two-factor-setup'] });
    } catch (err) {
      setDisableError(isApiError(err) ? err.message : 'Mật khẩu tài khoản không chính xác.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Initiate reconfigure
  const handleInitiateReconfigure = async (e: React.FormEvent) => {
    e.preventDefault();
    setReconfigureError('');
    setIsReconfiguring(true);
    try {
      const res = await recruiterTwoFactorApi.initiateReconfigure(reconfigurePassword);
      setReconfigureSetupData(res);
      setReconfigureStep('qr');
      setReconfigurePassword('');
    } catch (err) {
      setReconfigureError(isApiError(err) ? err.message : 'Mật khẩu không chính xác.');
    } finally {
      setIsReconfiguring(false);
    }
  };

  // Confirm reconfigure
  const handleConfirmReconfigure = async (e: React.FormEvent) => {
    e.preventDefault();
    setReconfigureError('');
    setIsReconfiguring(true);
    try {
      await recruiterTwoFactorApi.confirmReconfigure(reconfigureOtp);
      toast.success('Đã cập nhật thiết bị xác thực mới thành công!');
      setShowReconfigureModal(false);
      setReconfigureStep('password');
      setReconfigureOtp('');
      setReconfigureSetupData(null);
      queryClient.invalidateQueries({ queryKey: ['recruiter-two-factor-status'] });
    } catch (err) {
      setReconfigureError(isApiError(err) ? err.message : 'Mã xác thực không hợp lệ.');
    } finally {
      setIsReconfiguring(false);
    }
  };

  // Regenerate recovery codes
  const handleRegenerateCodes = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegenerateError('');
    setIsRegenerating(true);
    try {
      const codes = await recruiterTwoFactorApi.regenerateRecoveryCodes(regeneratePassword);
      setNewBackupCodes(codes);
      setRegenerateStep('codes');
      setRegeneratePassword('');
      queryClient.invalidateQueries({ queryKey: ['recruiter-two-factor-status'] });
    } catch (err) {
      setRegenerateError(isApiError(err) ? err.message : 'Mật khẩu không chính xác.');
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <AccountSettingsLayout activeTab="two-factor" pageTitle="Two-Factor Authentication">
      <div className="space-y-6">
        {/* Error alert */}
        {errorMsg && (
          <div className="flex items-center gap-2.5 rounded-lg border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {isStatusLoading ? (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center shadow-2xs">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
            <p className="mt-3 text-xs font-semibold text-slate-500">Checking security status...</p>
          </div>
        ) : isEnabled ? (
          /* ======================================================== */
          /* RECRUITER 2FA ACTIVE STATE (TOPCV UNIFIED STYLE)          */
          /* ======================================================== */
          <div className="space-y-6">
            {/* Top Status Card matching Image 4 */}
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-5 shadow-2xs">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-2xs">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-slate-800">Two-Factor Authentication is Active</h2>
                      <span className="inline-flex items-center rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
                        Active
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">
                      Your employer account is protected with 2FA. Untrusted devices will be challenged for a 6-digit
                      code.
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDisableError('');
                      setShowDisableModal(true);
                    }}
                    className="border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                  >
                    Disable 2FA
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 1: Authenticator Application */}
            <div className="flex items-start gap-3.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-2xs">
                1
              </div>
              <div className="flex-1 rounded-lg border border-slate-200 bg-white p-5 shadow-2xs">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-800">Authenticator Application</h3>
                      <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                        Connected
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      Generates 6-digit codes on your phone (Google Authenticator, Microsoft Authenticator, 1Password,
                      Authy).
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setReconfigureError('');
                      setShowReconfigureModal(true);
                    }}
                    className="shrink-0 text-xs font-semibold"
                  >
                    Change Device
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 2: Emergency Recovery Codes */}
            <div className="flex items-start gap-3.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-2xs">
                2
              </div>
              <div className="flex-1 rounded-lg border border-slate-200 bg-white p-5 shadow-2xs">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-800">Emergency Recovery Codes</h3>
                      <span
                        className={cn(
                          'rounded-md px-2 py-0.5 text-[11px] font-semibold',
                          (status?.remainingBackupCodes ?? 8) <= 2
                            ? 'border border-amber-200 bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700',
                        )}
                      >
                        {status?.remainingBackupCodes ?? 8} of 8 remaining
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      Single-use emergency codes to access your account if your mobile phone is unavailable.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setRegenerateError('');
                      setShowRegenerateModal(true);
                    }}
                    className="shrink-0 text-xs font-semibold"
                  >
                    Regenerate Codes
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 3: Trusted Browsers & Workstations */}
            <div className="flex items-start gap-3.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-2xs">
                3
              </div>
              <div className="flex-1 rounded-lg border border-slate-200 bg-white p-5 shadow-2xs">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Trusted Browsers & Workstations</h3>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Browsers remembered for 30 days that bypass two-factor verification at sign in.
                    </p>
                  </div>

                  {trustedDevices && trustedDevices.length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      isLoading={revokeAllDevicesMutation.isPending}
                      onClick={() => revokeAllDevicesMutation.mutate()}
                      className="shrink-0 border-rose-200 bg-rose-50 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                    >
                      Revoke all trusted devices
                    </Button>
                  )}
                </div>

                <div className="mt-4 space-y-2.5">
                  {isDevicesLoading ? (
                    <div className="space-y-2.5" aria-busy="true">
                      <div className="h-14 animate-pulse rounded-lg bg-slate-100" />
                      <div className="h-14 animate-pulse rounded-lg bg-slate-100" />
                    </div>
                  ) : !trustedDevices || trustedDevices.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50/60 p-5 text-center text-xs text-slate-500">
                      No trusted browsers recorded yet. Check &quot;Tin cậy thiết bị này&quot; after sign in to remember
                      your workstation.
                    </div>
                  ) : (
                    trustedDevices.map((device) => (
                      <div
                        key={device.id}
                        className={cn(
                          'flex items-center justify-between gap-3 rounded-lg border p-3.5 transition',
                          device.current
                            ? 'border-emerald-200 bg-emerald-50/40'
                            : 'border-slate-100 bg-slate-50 hover:bg-white',
                        )}
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div
                            className={cn(
                              'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                              device.current ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500',
                            )}
                          >
                            <Laptop className="h-4 w-4" />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="truncate text-xs font-bold text-slate-800">{device.deviceName}</span>
                              {device.current && (
                                <span className="shrink-0 rounded-full bg-emerald-600 px-2 py-0.5 text-[9px] font-bold text-white">
                                  This browser
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-slate-500">
                              <span className="flex items-center gap-1">
                                <Globe className="h-3 w-3 text-slate-400" />
                                {device.ipAddress}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-slate-400" />
                                Expires: {formatDate(device.expiresAt)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {!device.current && (
                          <button
                            type="button"
                            disabled={revokeDeviceMutation.isPending}
                            onClick={() => revokeDeviceMutation.mutate(device.id)}
                            className="shrink-0 cursor-pointer text-xs font-bold text-rose-600 hover:underline disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* RECRUITER 2FA INACTIVE / SETUP STATE (TOPCV UNIFIED)      */
          /* ======================================================== */
          <div className="space-y-6">
            {/* Setup Header Banner */}
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">
                    Pair an authenticator application with your account
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Supports Google Authenticator, 1Password, Microsoft Authenticator & Authy.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 1: Scan QR Code */}
            <div className="flex items-start gap-3.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-2xs">
                1
              </div>
              <div className="flex-1 rounded-lg border border-slate-200 bg-white p-5 shadow-2xs">
                <h3 className="text-sm font-bold text-slate-800">Scan the QR code with your authenticator app</h3>
                <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs">
                    {setupData?.qrCodeDataUrl ? (
                      <Image
                        src={setupData.qrCodeDataUrl}
                        alt="2FA QR Code"
                        width={150}
                        height={150}
                        unoptimized
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-xs text-slate-400">
                        <QrCode className="h-8 w-8 animate-pulse text-slate-300" />
                        <span className="mt-2 text-[11px]">Generating QR...</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <p className="text-xs text-slate-500">
                      If you cannot scan the QR code, copy and paste this manual secret key into your app:
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <code className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs font-bold text-slate-800 select-all">
                        {setupData?.secret || 'Generating key...'}
                      </code>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleCopyKey}
                        leftIcon={
                          isCopiedKey ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )
                        }
                        className="text-xs"
                      >
                        {isCopiedKey ? 'Copied' : 'Copy key'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Emergency Recovery Codes */}
            {setupData?.backupCodes && setupData.backupCodes.length > 0 && (
              <div className="flex items-start gap-3.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-2xs">
                  2
                </div>
                <div className="flex-1 rounded-lg border border-slate-200 bg-white p-5 shadow-2xs">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Save your emergency recovery codes</h3>
                      <p className="text-xs text-slate-500">
                        Each code can be used once if you ever lose access to your phone or authenticator app.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleCopyBackupCodes}
                        leftIcon={
                          isCopiedBackup ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )
                        }
                        className="text-xs"
                      >
                        {isCopiedBackup ? 'Copied' : 'Copy all'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleDownloadBackupCodes}
                        leftIcon={<Download className="h-3.5 w-3.5" />}
                        className="text-xs"
                      >
                        Download .txt
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg border border-slate-100 bg-slate-50 p-3 font-mono text-xs font-bold text-slate-700 sm:grid-cols-4">
                    {setupData.backupCodes.map((code, idx) => (
                      <div key={idx} className="rounded-md border border-slate-200 bg-white p-2 text-center shadow-2xs">
                        {code}
                      </div>
                    ))}
                  </div>

                  <label className="mt-3.5 flex cursor-pointer items-start gap-2 text-xs text-slate-600 select-none">
                    <input
                      type="checkbox"
                      checked={hasConfirmedBackup}
                      onChange={(e) => setHasConfirmedBackup(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>I have securely saved these 8 emergency recovery codes in a safe vault.</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Enter 6-digit Code */}
            <div className="flex items-start gap-3.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-2xs">
                3
              </div>
              <div className="flex-1 rounded-lg border border-slate-200 bg-white p-5 shadow-2xs">
                <h3 className="text-sm font-bold text-slate-800">Enter 6-digit verification code to activate</h3>
                <form onSubmit={handleVerifyAndEnable} className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    maxLength={6}
                    required
                    className="w-44 text-center font-mono text-base font-bold tracking-widest text-slate-900"
                  />
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    className="bg-emerald-600 text-xs font-bold hover:bg-emerald-500"
                    leftIcon={<CheckCircle2 className="h-4 w-4" />}
                  >
                    Activate Two-Factor Authentication
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Disable 2FA Modal */}
      {showDisableModal && (
        <Modal
          isOpen={showDisableModal}
          onClose={() => setShowDisableModal(false)}
          title="Disable Two-Factor Authentication"
          maxWidth="sm"
        >
          <div className="space-y-4">
            <p className="text-xs leading-relaxed text-slate-500">
              Your account security will be lowered. Untrusted browsers will no longer be challenged. Please enter your
              password to confirm.
            </p>

            {disableError && (
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs font-semibold text-rose-800">
                {disableError}
              </div>
            )}

            <form onSubmit={handleDisable2FA} className="space-y-4">
              <PasswordInput
                value={disablePassword}
                onChange={(e) => setDisablePassword(e.target.value)}
                placeholder="Enter your current password"
                required
                autoFocus
              />

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowDisableModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="danger" size="sm" isLoading={isSubmitting}>
                  Confirm and Disable
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* Reconfigure Modal */}
      {showReconfigureModal && (
        <Modal
          isOpen={showReconfigureModal}
          onClose={() => {
            setShowReconfigureModal(false);
            setReconfigureStep('password');
            setReconfigurePassword('');
            setReconfigureOtp('');
            setReconfigureSetupData(null);
          }}
          title="Reconfigure Authenticator App"
          maxWidth="md"
        >
          {reconfigureStep === 'password' ? (
            <form onSubmit={handleInitiateReconfigure} className="space-y-4">
              <p className="text-xs text-slate-500">
                To link a new phone or authenticator app, please confirm your current account password.
              </p>

              {reconfigureError && (
                <div className="rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs font-semibold text-rose-800">
                  {reconfigureError}
                </div>
              )}

              <PasswordInput
                label="Current Password"
                value={reconfigurePassword}
                onChange={(e) => setReconfigurePassword(e.target.value)}
                placeholder="Enter your current password"
                required
                autoFocus
              />

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowReconfigureModal(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  isLoading={isReconfiguring}
                  className="bg-emerald-600 font-bold hover:bg-emerald-500"
                >
                  Continue
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleConfirmReconfigure} className="space-y-4">
              <p className="text-xs text-slate-500">
                Scan the new QR code with your authenticator app and enter the 6-digit code below:
              </p>

              {reconfigureError && (
                <div className="rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs font-semibold text-rose-800">
                  {reconfigureError}
                </div>
              )}

              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white p-2 shadow-2xs">
                  {reconfigureSetupData?.qrCodeDataUrl ? (
                    <Image
                      src={reconfigureSetupData.qrCodeDataUrl}
                      alt="Reconfigure QR Code"
                      width={112}
                      height={112}
                      unoptimized
                      className="h-full w-full object-contain"
                    />
                  ) : null}
                </div>

                <div className="flex-1 space-y-1.5">
                  <div className="text-xs text-slate-500">Manual secret key:</div>
                  <code className="block rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-xs font-bold text-slate-800 select-all">
                    {reconfigureSetupData?.secret}
                  </code>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-slate-600 uppercase">
                  6-Digit Verification Code
                </label>
                <div className="mt-1.5">
                  <Input
                    type="text"
                    value={reconfigureOtp}
                    onChange={(e) => setReconfigureOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    maxLength={6}
                    required
                    autoFocus
                    className="text-center font-mono text-base font-bold tracking-widest text-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowReconfigureModal(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  isLoading={isReconfiguring}
                  className="bg-emerald-600 font-bold hover:bg-emerald-500"
                >
                  Confirm and Switch Key
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}

      {/* Regenerate Recovery Codes Modal */}
      {showRegenerateModal && (
        <Modal
          isOpen={showRegenerateModal}
          onClose={() => {
            setShowRegenerateModal(false);
            setRegenerateStep('password');
            setRegeneratePassword('');
            setNewBackupCodes([]);
          }}
          title="Regenerate Emergency Recovery Codes"
          maxWidth="md"
        >
          {regenerateStep === 'password' ? (
            <form onSubmit={handleRegenerateCodes} className="space-y-4">
              <p className="text-xs leading-relaxed text-slate-500">
                Regenerating new recovery codes will permanently invalidate and burn all previous codes. Enter your
                password to proceed.
              </p>

              {regenerateError && (
                <div className="rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs font-semibold text-rose-800">
                  {regenerateError}
                </div>
              )}

              <PasswordInput
                label="Account Password"
                value={regeneratePassword}
                onChange={(e) => setRegeneratePassword(e.target.value)}
                placeholder="Enter your account password"
                required
                autoFocus
              />

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowRegenerateModal(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  isLoading={isRegenerating}
                  className="bg-emerald-600 font-bold hover:bg-emerald-500"
                >
                  Regenerate Codes
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs font-semibold text-amber-800">
                Your old recovery codes have been revoked. Please save these 8 fresh codes immediately.
              </div>

              <div className="grid grid-cols-2 gap-2 rounded-lg border border-slate-100 bg-slate-50 p-3 font-mono text-xs font-bold text-slate-800 sm:grid-cols-4">
                {newBackupCodes.map((code, idx) => (
                  <div key={idx} className="rounded-md border border-slate-200 bg-white p-2 text-center shadow-2xs">
                    {code}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(newBackupCodes.join('\n'));
                      setIsCopiedNewCodes(true);
                      setTimeout(() => setIsCopiedNewCodes(false), 2000);
                    }}
                    leftIcon={
                      isCopiedNewCodes ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )
                    }
                    className="text-xs"
                  >
                    {isCopiedNewCodes ? 'Copied' : 'Copy all'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const element = document.createElement('a');
                      const file = new Blob([newBackupCodes.join('\n')], { type: 'text/plain' });
                      element.href = URL.createObjectURL(file);
                      element.download = 'intervue-recruiter-fresh-recovery-codes.txt';
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }}
                    leftIcon={<Download className="h-3.5 w-3.5" />}
                    className="text-xs"
                  >
                    Download .txt
                  </Button>
                </div>

                <Button
                  type="button"
                  size="sm"
                  className="bg-emerald-600 font-bold hover:bg-emerald-500"
                  onClick={() => setShowRegenerateModal(false)}
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </AccountSettingsLayout>
  );
}
