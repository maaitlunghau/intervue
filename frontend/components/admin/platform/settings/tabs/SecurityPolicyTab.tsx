'use client';

import Switch from '@/components/ui/Switch';
import { DEFAULT_SECURITY_POLICY } from '@/constants/platform-settings';
import { ROUTES } from '@/constants/routes';
import type { PlatformSecurityPolicy } from '@/types/platform';
import { ArrowRight, Check, KeyRound, Lock, RotateCcw, Save, ShieldAlert, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

const STORAGE_KEY = 'intervue_admin_security_policy';

interface SecurityPolicyTabProps {
  personalTwoFactorEnabled?: boolean;
}

export default function SecurityPolicyTab({ personalTwoFactorEnabled = true }: SecurityPolicyTabProps) {
  const [policy, setPolicy] = useState<PlatformSecurityPolicy>(() => {
    if (typeof window === 'undefined') return DEFAULT_SECURITY_POLICY;
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      return cached ? JSON.parse(cached) : DEFAULT_SECURITY_POLICY;
    } catch {
      return DEFAULT_SECURITY_POLICY;
    }
  });
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggle = (field: keyof PlatformSecurityPolicy) => {
    setPolicy((prev) => ({ ...prev, [field]: !prev[field] }));
    setIsSaved(false);
  };

  const handleSelectChange = (field: keyof PlatformSecurityPolicy, value: number) => {
    setPolicy((prev) => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(policy));
        setIsSaved(true);
        toast.success('Platform-wide security policies updated successfully.');
      } catch {
        toast.error('Failed to save security policies.');
      } finally {
        setIsSubmitting(false);
      }
    }, 400);
  };

  const handleReset = () => {
    setPolicy(DEFAULT_SECURITY_POLICY);
    try {
      localStorage.removeItem(STORAGE_KEY);
      toast.info('Security policies restored to defaults.');
      setIsSaved(false);
    } catch {
      // Ignore
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Block 1: Platform-wide 2FA Enforcement Policy */}
      <div className="border-outline-variant dark:border-forest-800 dark:bg-forest-900 rounded-xl border bg-white p-6 shadow-xs">
        <div className="border-outline-variant/60 dark:border-forest-800/80 mb-5 flex items-center gap-3 border-b pb-4">
          <span className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-lg">
            <Lock className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-navy dark:text-forest-50 text-body-lg font-bold">
              Platform-wide 2FA Enforcement Policy
            </h3>
            <p className="text-body-sm text-on-surface-variant dark:text-forest-400">
              Enforce two-factor authentication via Authenticator app across key platform user roles.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-outline-variant/60 dark:border-forest-800 flex items-start justify-between gap-4 rounded-lg border p-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-navy dark:text-forest-50 text-body-md font-semibold">
                  Enforce 2FA for all Administrators
                </span>
                <span className="bg-primary/10 text-primary border-primary/20 rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                  Highly Recommended
                </span>
              </div>
              <p className="text-body-sm text-on-surface-variant dark:text-forest-400">
                All accounts with access to the Admin Console must have 2FA enabled. Accounts without 2FA will be
                prompted to set it up before proceeding.
              </p>
            </div>

            <Switch
              checked={policy.enforceAdminTwoFactor}
              onChange={() => handleToggle('enforceAdminTwoFactor')}
              aria-label="Enforce Admin 2FA"
            />
          </div>

          <div className="border-outline-variant/60 dark:border-forest-800 flex items-start justify-between gap-4 rounded-lg border p-4">
            <div className="space-y-1">
              <span className="text-navy dark:text-forest-50 text-body-md font-semibold">
                Require 2FA for Recruiters on high-value checkouts
              </span>
              <p className="text-body-sm text-on-surface-variant dark:text-forest-400">
                Prompt for an OTP verification code when recruiters purchase service packages exceeding 5,000,000 VND to
                prevent unauthorized billing.
              </p>
            </div>

            <Switch
              checked={policy.enforceRecruiterCheckoutTwoFactor}
              onChange={() => handleToggle('enforceRecruiterCheckoutTwoFactor')}
              aria-label="Enforce Recruiter Checkout 2FA"
            />
          </div>
        </div>
      </div>

      {/* Block 2: Session Lifecycle & Brute-Force Protection */}
      <div className="border-outline-variant dark:border-forest-800 dark:bg-forest-900 rounded-xl border bg-white p-6 shadow-xs">
        <div className="border-outline-variant/60 dark:border-forest-800/80 mb-5 flex items-center gap-3 border-b pb-4">
          <span className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-lg">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-navy dark:text-forest-50 text-body-lg font-bold">
              Session Lifecycle & Brute-Force Protection
            </h3>
            <p className="text-body-sm text-on-surface-variant dark:text-forest-400">
              Control administrative session expiration timeouts and limit consecutive failed login attempts.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="text-navy dark:text-forest-100 text-body-sm block font-semibold">
              Session Inactivity Idle Timeout
            </label>
            <select
              value={policy.sessionTimeoutMinutes}
              onChange={(e) => handleSelectChange('sessionTimeoutMinutes', Number(e.target.value))}
              className="border-outline-variant text-body-md text-navy dark:text-forest-50 dark:bg-forest-950 focus:border-primary mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 transition outline-none"
            >
              <option value={15}>15 minutes (Maximum Security)</option>
              <option value={30}>30 minutes (Standard)</option>
              <option value={60}>60 minutes (Recommended)</option>
              <option value={120}>2 hours (Flexible)</option>
              <option value={240}>4 hours (Extended Shift)</option>
            </select>
            <p className="text-outline text-label-sm mt-1">
              Automatically signs out administrative sessions after the specified duration of inactivity.
            </p>
          </div>

          <div>
            <label className="text-navy dark:text-forest-100 text-body-sm block font-semibold">
              Max Failed Login Attempts Before Lockout
            </label>
            <select
              value={policy.maxLoginAttempts}
              onChange={(e) => handleSelectChange('maxLoginAttempts', Number(e.target.value))}
              className="border-outline-variant text-body-md text-navy dark:text-forest-50 dark:bg-forest-950 focus:border-primary mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 transition outline-none"
            >
              <option value={3}>3 attempts (Strict)</option>
              <option value={5}>5 attempts (Recommended)</option>
              <option value={10}>10 attempts (Lenient)</option>
            </select>
            <p className="text-outline text-label-sm mt-1">
              Temporarily locks the account for 15 minutes and dispatches an unusual sign-in alert email.
            </p>
          </div>
        </div>
      </div>

      {/* Block 3: Personal Account Security Shortcut */}
      <div className="dark:border-forest-800 dark:bg-forest-850/50 border-outline-variant/80 bg-surface-container-low/40 rounded-xl border p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-primary-light text-primary border-primary/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border">
              <KeyRound className="h-5 w-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-navy dark:text-forest-50 text-body-md font-bold">Your Personal Account Security</h4>
                {personalTwoFactorEnabled ? (
                  <span className="text-primary inline-flex items-center gap-1 text-xs font-semibold">
                    <ShieldCheck className="h-3.5 w-3.5" /> 2FA Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600">
                    <ShieldAlert className="h-3.5 w-3.5" /> 2FA Disabled
                  </span>
                )}
              </div>
              <p className="text-body-sm text-on-surface-variant dark:text-forest-400">
                Manage your personal password, Authenticator credentials, and active device sessions.
              </p>
            </div>
          </div>

          <Link
            href={ROUTES.ADMIN_ACCOUNT_SECURITY}
            className="border-outline-variant dark:border-forest-750 dark:bg-forest-800 hover:bg-surface-container-high dark:hover:bg-forest-750 text-navy dark:text-forest-100 text-body-sm inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border bg-white px-4 py-2 font-semibold shadow-2xs transition"
          >
            <span>Personal Security Settings</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Action Footer */}
      <div className="border-outline-variant/80 dark:border-forest-800 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
        <div className="text-on-surface-variant dark:text-forest-400 flex items-center gap-2 text-xs">
          {isSaved && (
            <span className="text-primary inline-flex items-center gap-1 font-semibold">
              <Check className="h-4 w-4" /> Security policies up to date
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="border-outline-variant dark:border-forest-700 bg-surface-container-low dark:bg-forest-850 hover:bg-surface-container-high dark:hover:bg-forest-800 text-navy dark:text-forest-100 text-body-sm inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 font-semibold transition"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset to Defaults</span>
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary-hover text-body-sm inline-flex items-center gap-1.5 rounded-lg px-5 py-2 font-semibold text-white shadow-2xs transition active:scale-[0.98]"
          >
            <Save className="h-4 w-4" />
            <span>{isSubmitting ? 'Saving...' : 'Save Policies'}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
