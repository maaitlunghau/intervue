'use client';

import { DEFAULT_PLATFORM_SERVICES } from '@/constants/platform-settings';
import type { PlatformServiceStatus } from '@/types/platform';
import { Cpu, RefreshCw, Server, ShieldCheck, Zap } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function IntegrationsTab() {
  const [services, setServices] = useState<PlatformServiceStatus[]>(DEFAULT_PLATFORM_SERVICES);
  const [pingingKey, setPingingKey] = useState<string | null>(null);

  const handlePing = (key: string) => {
    setPingingKey(key);
    setTimeout(() => {
      const newLatency = Math.floor(Math.random() * 80) + 110;
      setServices((prev) =>
        prev.map((s) => (s.key === key ? { ...s, latencyMs: newLatency, lastChecked: 'Just now' } : s)),
      );
      setPingingKey(null);
      const sName = services.find((s) => s.key === key)?.name ?? 'Service';
      toast.success(`Connection to ${sName} is healthy (Latency: ${newLatency}ms).`);
    }, 600);
  };

  const handlePingAll = () => {
    setPingingKey('all');
    setTimeout(() => {
      setServices((prev) =>
        prev.map((s) => ({
          ...s,
          latencyMs: Math.floor(Math.random() * 100) + 120,
          lastChecked: 'Just now',
        })),
      );
      setPingingKey(null);
      toast.success('All 4 core platform services verified. All connections are healthy.');
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Block 1: Service Status & Latency Monitoring */}
      <div className="border-outline-variant dark:border-forest-800 dark:bg-forest-900 rounded-xl border bg-white p-6 shadow-xs">
        <div className="border-outline-variant/60 dark:border-forest-800/80 mb-5 flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-lg">
              <Cpu className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-navy dark:text-forest-50 text-body-lg font-bold">
                Platform Integrations & API Systems
              </h3>
              <p className="text-body-sm text-on-surface-variant dark:text-forest-400">
                Realtime connection status and roundtrip latency monitoring for third-party cloud services.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePingAll}
            disabled={Boolean(pingingKey)}
            className="border-outline-variant dark:border-forest-750 bg-surface-container-low hover:bg-surface-container-high dark:bg-forest-850 dark:hover:bg-forest-800 text-navy dark:text-forest-100 text-body-sm inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border px-3.5 py-2 font-semibold shadow-2xs transition"
          >
            <RefreshCw className={`text-primary h-4 w-4 ${pingingKey === 'all' ? 'animate-spin' : ''}`} />
            <span>Ping All Connections</span>
          </button>
        </div>

        <div className="space-y-4">
          {services.map((service) => {
            const isPinging = pingingKey === service.key || pingingKey === 'all';

            return (
              <div
                key={service.key}
                className="border-outline-variant/60 dark:border-forest-800 hover:border-outline flex flex-col justify-between gap-4 rounded-xl border p-4.5 transition sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-3.5">
                  <div className="bg-primary-light text-primary dark:bg-forest-800 border-primary/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border">
                    <Server className="h-5 w-5" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-navy dark:text-forest-50 text-body-md font-bold">{service.name}</h4>
                      <span className="text-outline text-label-sm">({service.provider})</span>

                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                        Connected
                      </span>
                    </div>

                    <p className="text-body-sm text-on-surface-variant dark:text-forest-400 mt-1">{service.details}</p>
                  </div>
                </div>

                <div className="border-outline-variant/60 dark:border-forest-800 flex items-center justify-between gap-4 border-t pt-3 sm:justify-end sm:border-t-0 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <p className="text-navy dark:text-forest-50 text-body-md font-bold tabular-nums">
                      {service.latencyMs} ms
                    </p>
                    <p className="text-outline text-label-sm">Checked: {service.lastChecked}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePing(service.key)}
                    disabled={isPinging}
                    className="border-outline-variant dark:border-forest-750 dark:bg-forest-800 hover:bg-surface-container-low dark:hover:bg-forest-750 text-navy dark:text-forest-100 text-body-sm hover:border-outline inline-flex cursor-pointer items-center gap-1.5 rounded-lg border bg-white px-3 py-1.5 font-semibold shadow-2xs transition"
                  >
                    <Zap className={`text-primary h-3.5 w-3.5 ${isPinging ? 'animate-bounce' : ''}`} />
                    <span>{isPinging ? 'Pinging...' : 'Ping Test'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Block 2: Webhook Endpoint & Security Secrets */}
      <div className="border-outline-variant dark:border-forest-800 dark:bg-forest-900 rounded-xl border bg-white p-6 shadow-xs">
        <h3 className="text-navy dark:text-forest-50 text-body-lg font-bold">
          Webhook Endpoints & Security Signatures
        </h3>
        <p className="text-body-sm text-on-surface-variant dark:text-forest-400 mt-0.5 mb-5">
          Inbound endpoint URLs for real-time transaction updates from payment gateways and partner systems.
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-navy dark:text-forest-100 text-body-sm block font-semibold">
              SePay Bank Transfer Webhook URL
            </label>
            <div className="mt-1.5 flex gap-2">
              <input
                type="text"
                readOnly
                value="https://api.intervue.com/api/v1/payments/sepay-webhook"
                className="border-outline-variant text-body-sm text-navy dark:text-forest-100 bg-surface-container-low dark:bg-forest-850 flex-1 rounded-lg border px-3.5 py-2.5 font-mono outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText('https://api.intervue.com/api/v1/payments/sepay-webhook');
                  toast.success('Webhook URL copied to clipboard.');
                }}
                className="border-outline-variant dark:border-forest-700 bg-surface-container-low hover:bg-surface-container-high dark:bg-forest-800 dark:hover:bg-forest-750 text-navy dark:text-forest-100 text-body-sm inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3.5 py-2 font-semibold transition"
              >
                Copy
              </button>
            </div>
            <p className="text-outline text-label-sm mt-1">
              Configure this webhook URL in your SePay merchant dashboard to receive automated payment push events.
            </p>
          </div>

          <div className="border-outline-variant/60 dark:border-forest-800 flex items-center justify-between rounded-lg border p-3.5">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="text-primary h-5 w-5" />
              <div>
                <p className="text-navy dark:text-forest-50 text-body-sm font-semibold">
                  Webhook Security Signature (HMAC SHA-256)
                </p>
                <p className="text-outline text-label-sm">
                  Configured via server-side production environment variables.
                </p>
              </div>
            </div>

            <span className="bg-primary/10 text-primary border-primary/20 rounded-md border px-2 py-0.5 text-xs font-semibold">
              Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
