'use client';

import { DEFAULT_GENERAL_SETTINGS } from '@/constants/platform-settings';
import type { PlatformGeneralSettings } from '@/types/platform';
import { Building2, Check, Headphones, MapPin, RotateCcw, Save } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const STORAGE_KEY = 'intervue_admin_general_settings';

export default function GeneralSettingsTab() {
  const [form, setForm] = useState<PlatformGeneralSettings>(() => {
    if (typeof window === 'undefined') return DEFAULT_GENERAL_SETTINGS;
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      return cached ? JSON.parse(cached) : DEFAULT_GENERAL_SETTINGS;
    } catch {
      return DEFAULT_GENERAL_SETTINGS;
    }
  });
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof PlatformGeneralSettings, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
        setIsSaved(true);
        toast.success('General settings and contact information saved successfully.');
      } catch {
        toast.error('Failed to save general settings.');
      } finally {
        setIsSubmitting(false);
      }
    }, 400);
  };

  const handleReset = () => {
    setForm(DEFAULT_GENERAL_SETTINGS);
    try {
      localStorage.removeItem(STORAGE_KEY);
      toast.info('General settings restored to defaults.');
      setIsSaved(false);
    } catch {
      // Ignore
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Block 1: Corporate Legal Identity & Brand Information */}
      <div className="border-outline-variant dark:border-forest-800 dark:bg-forest-900 rounded-xl border bg-white p-6 shadow-xs">
        <div className="border-outline-variant/60 dark:border-forest-800/80 mb-5 flex items-center gap-3 border-b pb-4">
          <span className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-lg">
            <Building2 className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-navy dark:text-forest-50 text-body-lg font-bold">Legal Identity & Branding</h3>
            <p className="text-body-sm text-on-surface-variant dark:text-forest-400">
              Corporate organization details appearing across official notices, invoices, and system footers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-navy dark:text-forest-100 text-body-sm block font-semibold">
              Full Corporate Legal Entity Name
            </label>
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              className="border-outline-variant text-body-md text-navy dark:text-forest-50 dark:bg-forest-950 focus:border-primary mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 transition outline-none"
              placeholder="e.g. InterVue Vietnam Joint Stock Company"
              required
            />
          </div>

          <div>
            <label className="text-navy dark:text-forest-100 text-body-sm block font-semibold">
              Platform Brand Name
            </label>
            <input
              type="text"
              value={form.brandName}
              onChange={(e) => handleChange('brandName', e.target.value)}
              className="border-outline-variant text-body-md text-navy dark:text-forest-50 dark:bg-forest-950 focus:border-primary mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 transition outline-none"
              placeholder="e.g. InterVue - AI-Assisted Recruitment Platform"
              required
            />
          </div>

          <div>
            <label className="text-navy dark:text-forest-100 text-body-sm block font-semibold">
              Enterprise Tax Identification Number (MST)
            </label>
            <input
              type="text"
              value={form.taxCode}
              onChange={(e) => handleChange('taxCode', e.target.value)}
              className="border-outline-variant text-body-md text-navy dark:text-forest-50 dark:bg-forest-950 focus:border-primary mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 transition outline-none"
              placeholder="e.g. 0318294719"
              required
            />
          </div>
        </div>
      </div>

      {/* Block 2: Support Channels & User Care */}
      <div className="border-outline-variant dark:border-forest-800 dark:bg-forest-900 rounded-xl border bg-white p-6 shadow-xs">
        <div className="border-outline-variant/60 dark:border-forest-800/80 mb-5 flex items-center gap-3 border-b pb-4">
          <span className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-lg">
            <Headphones className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-navy dark:text-forest-50 text-body-lg font-bold">Customer Support & Help Channels</h3>
            <p className="text-body-sm text-on-surface-variant dark:text-forest-400">
              Official channels for resolving candidate/recruiter inquiries and processing fraud allegations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="text-navy dark:text-forest-100 text-body-sm block font-semibold">
              Support & Inquiries Hotline
            </label>
            <input
              type="text"
              value={form.supportHotline}
              onChange={(e) => handleChange('supportHotline', e.target.value)}
              className="border-outline-variant text-body-md text-navy dark:text-forest-50 dark:bg-forest-950 focus:border-primary mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 transition outline-none"
              placeholder="e.g. 0704 618 714"
              required
            />
            <p className="text-outline text-label-sm mt-1">Displayed on the platform helpdesk and public footer.</p>
          </div>

          <div>
            <label className="text-navy dark:text-forest-100 text-body-sm block font-semibold">
              Customer Support Email
            </label>
            <input
              type="email"
              value={form.supportEmail}
              onChange={(e) => handleChange('supportEmail', e.target.value)}
              className="border-outline-variant text-body-md text-navy dark:text-forest-50 dark:bg-forest-950 focus:border-primary mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 transition outline-none"
              placeholder="e.g. support@intervue.com"
              required
            />
            <p className="text-outline text-label-sm mt-1">General inquiries and recruitment consultation requests.</p>
          </div>

          <div className="md:col-span-2">
            <label className="text-navy dark:text-forest-100 text-body-sm block font-semibold">
              Anti-Fraud & Recruitment Scam Abuse Email
            </label>
            <input
              type="email"
              value={form.abuseEmail}
              onChange={(e) => handleChange('abuseEmail', e.target.value)}
              className="border-outline-variant text-body-md text-navy dark:text-forest-50 dark:bg-forest-950 focus:border-primary mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 transition outline-none"
              placeholder="e.g. fraud-report@intervue.com"
              required
            />
            <p className="text-outline text-label-sm mt-1">
              Directly routes candidate extortion, fake job post, or identity theft reports into Priority #1 triage.
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="text-navy dark:text-forest-100 text-body-sm block font-semibold">
              Official Headquarters Address
            </label>
            <div className="relative mt-1.5">
              <input
                type="text"
                value={form.headquartersAddress}
                onChange={(e) => handleChange('headquartersAddress', e.target.value)}
                className="border-outline-variant text-body-md text-navy dark:text-forest-50 dark:bg-forest-950 focus:border-primary w-full rounded-lg border bg-white px-3.5 py-2.5 pr-10 transition outline-none"
                placeholder="e.g. Floor 12, FPT Tower, 10 Pham Van Bach, Cau Giay, Hanoi, Vietnam"
                required
              />
              <MapPin className="text-outline absolute top-3 right-3.5 h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Block 3: Regional & Currency Standards */}
      <div className="border-outline-variant dark:border-forest-800 dark:bg-forest-900 rounded-xl border bg-white p-6 shadow-xs">
        <h3 className="text-navy dark:text-forest-50 text-body-lg font-bold">Regional & Currency Standards</h3>
        <p className="text-body-sm text-on-surface-variant dark:text-forest-400 mt-0.5 mb-5">
          System-wide standards for datetime formatting, billing invoices, and localization.
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="text-navy dark:text-forest-100 text-body-sm block font-semibold">System Timezone</label>
            <input
              type="text"
              value={form.defaultTimezone}
              disabled
              className="border-outline-variant text-body-md text-on-surface-variant dark:text-forest-400 bg-surface-container-low dark:bg-forest-850 mt-1.5 w-full cursor-not-allowed rounded-lg border px-3.5 py-2.5"
            />
            <p className="text-outline text-label-sm mt-1">Fixed to Vietnam standard operational timezone.</p>
          </div>

          <div>
            <label className="text-navy dark:text-forest-100 text-body-sm block font-semibold">Primary Currency</label>
            <input
              type="text"
              value={form.defaultCurrency}
              disabled
              className="border-outline-variant text-body-md text-on-surface-variant dark:text-forest-400 bg-surface-container-low dark:bg-forest-850 mt-1.5 w-full cursor-not-allowed rounded-lg border px-3.5 py-2.5"
            />
            <p className="text-outline text-label-sm mt-1">Official transactional currency for services and orders.</p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="border-outline-variant/80 dark:border-forest-800 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
        <div className="text-on-surface-variant dark:text-forest-400 flex items-center gap-2 text-xs">
          {isSaved && (
            <span className="text-primary inline-flex items-center gap-1 font-semibold">
              <Check className="h-4 w-4" /> All changes saved
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="border-outline-variant dark:border-forest-700 bg-surface-container-low dark:bg-forest-850 hover:bg-surface-container-high dark:hover:bg-forest-800 text-navy dark:text-forest-100 text-body-sm inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-4 py-2 font-semibold transition"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset to Defaults</span>
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary-hover text-body-sm inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-5 py-2 font-semibold text-white shadow-2xs transition active:scale-[0.98]"
          >
            <Save className="h-4 w-4" />
            <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
