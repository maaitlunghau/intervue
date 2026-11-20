import { KeyRound, ShieldCheck, Smartphone } from 'lucide-react';
import React from 'react';

export default function AdminLoginHero() {
  return (
    <section className="flex flex-col justify-center lg:col-span-7">
      {/* Main Headline */}
      <h1 className="text-3xl leading-[1.18] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[46px]">
        A secure gateway to{' '}
        <span className="bg-gradient-to-r from-[#00b14f] to-[#008f3f] bg-clip-text text-transparent">
          recruitment operations.
        </span>
      </h1>

      {/* Description */}
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
        Sign in to manage platform records, monitor operations, and access secure digital administrative services
        through a unified enterprise portal built for 2026.
      </p>

      {/* Feature / Security Badges Row (3 Cards matching inspiration) */}
      <div className="mt-8 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="group flex flex-col items-start rounded-2xl border border-slate-200/80 bg-white/80 p-4.5 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-[#00b14f] transition-transform group-hover:scale-105">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="text-sm font-bold text-slate-900">Zero Trust</p>
          <p className="mt-0.5 text-xs text-slate-500">IAM Guarded</p>
        </div>

        <div className="group flex flex-col items-start rounded-2xl border border-slate-200/80 bg-white/80 p-4.5 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-[#00b14f] transition-transform group-hover:scale-105">
            <Smartphone className="h-5 w-5" />
          </div>
          <p className="text-sm font-bold text-slate-900">Biometric Ready</p>
          <p className="mt-0.5 text-xs text-slate-500">2FA Enforced</p>
        </div>

        <div className="group flex flex-col items-start rounded-2xl border border-slate-200/80 bg-white/80 p-4.5 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-[#00b14f] transition-transform group-hover:scale-105">
            <KeyRound className="h-5 w-5" />
          </div>
          <p className="text-sm font-bold text-slate-900">256-bit TLS</p>
          <p className="mt-0.5 text-xs text-slate-500">Encrypted Tunnel</p>
        </div>
      </div>
    </section>
  );
}
