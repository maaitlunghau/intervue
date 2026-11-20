'use client';

import { recruiterTwoFactorApi } from '@/apiRequest/two-factor';
import AccountEmailRow from '@/components/account/security/AccountEmailRow';
import AccountPhoneRow from '@/components/account/security/AccountPhoneRow';
import ActiveSessionsCard from '@/components/account/security/ActiveSessionsCard';
import DeleteAccountCard from '@/components/account/security/DeleteAccountCard';
import SecurityAlertsCard from '@/components/account/security/SecurityAlertsCard';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, KeyRound, ShieldCheck, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { AccountSettingsLayout } from '../company/AccountSettingsLayout';

export default function RecruiterAccountSecuritySettingsView() {
  const { user } = useAuth();
  const email = user?.email ?? '';
  const emailVerified = user?.emailVerified ?? false;
  const phone = user?.phone ?? '';
  const phoneVerified = user?.phoneVerified ?? false;

  const { data: twoFactorStatus } = useQuery({
    queryKey: ['recruiter', 'two-factor-status'],
    queryFn: () => recruiterTwoFactorApi.getStatus(),
  });
  const is2FaEnabled = twoFactorStatus?.enabled ?? false;

  return (
    <AccountSettingsLayout activeTab="security" pageTitle="Account Security">
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">Account Security</h2>
          </div>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Manage your credentials, recovery contacts, two-factor authentication and active sessions.
          </p>
        </div>

        {/* Core Protection Settings */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-2xs">
          <h3 className="text-sm font-bold text-slate-900 sm:text-base">Core Protection Settings</h3>

          <div className="mt-4 divide-y divide-slate-200">
            <AccountEmailRow portal="recruiter" email={email} verified={emailVerified} />

            <AccountPhoneRow portal="recruiter" phone={phone} verified={phoneVerified} />

            {/* Password Row */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Sign-in password</div>
                  <div className="text-xs text-slate-500">Regularly updated for recruiter account protection</div>
                </div>
              </div>
              <Link
                href={ROUTES.RECRUITER_ACCOUNT_PASSWORD}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline"
              >
                <span>Change password</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* 2FA Row */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-start gap-3.5">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    is2FaEnabled ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}
                >
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">Two-factor authentication (2FA)</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                        is2FaEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {is2FaEnabled ? 'Active' : 'Not active'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Requires a 6-digit verification code from Google or Microsoft Authenticator
                  </div>
                </div>
              </div>
              <Link
                href={ROUTES.RECRUITER_ACCOUNT_TWO_FACTOR}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline"
              >
                <span>{is2FaEnabled ? 'Manage 2FA' : 'Enable now'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <ActiveSessionsCard portal="recruiter" className="rounded-lg border-slate-200 shadow-2xs" />

        {/* Security Alerts */}
        <SecurityAlertsCard email={email} className="rounded-lg border-slate-200 shadow-2xs" />

        {/* Delete Account */}
        <DeleteAccountCard portal="recruiter" className="rounded-lg border-rose-200 shadow-2xs" />
      </div>
    </AccountSettingsLayout>
  );
}
