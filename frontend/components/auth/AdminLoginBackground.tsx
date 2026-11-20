import React from 'react';

export default function AdminLoginBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {/* Layer 1: Ambient Luminous Radiant Glows */}
      <div className="absolute -top-40 -left-20 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.28),rgba(16,185,129,0.1),transparent_70%)] blur-3xl" />
      <div className="absolute -right-24 -bottom-48 h-[750px] w-[750px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,177,79,0.22),rgba(5,150,105,0.06),transparent_70%)] blur-3xl" />
      <div className="absolute top-1/4 right-[20%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(167,243,208,0.35),rgba(209,250,229,0.1),transparent_70%)] blur-2xl" />

      {/* Layer 2: Frosted Glass Spherical Bubbles with Specular Rim Light */}
      <div className="absolute -bottom-24 left-[10%] h-[380px] w-[380px] rounded-full border border-white/80 bg-gradient-to-tr from-white/70 via-emerald-50/50 to-white/30 shadow-[inset_0_2px_6px_rgba(255,255,255,0.9),0_20px_50px_rgba(0,177,79,0.08)] backdrop-blur-md sm:left-[16%] sm:h-[460px] sm:w-[460px]" />
      <div className="absolute top-12 left-[3%] h-72 w-72 rounded-full border border-emerald-200/50 bg-gradient-to-b from-white/60 via-emerald-100/35 to-transparent shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_12px_32px_rgba(0,177,79,0.05)] backdrop-blur-xs sm:h-84 sm:w-84" />
      <div className="absolute top-1/3 right-[30%] h-48 w-48 rounded-full border border-white/70 bg-gradient-to-br from-white/80 via-emerald-50/40 to-white/20 shadow-sm backdrop-blur-xs" />
      <div className="absolute bottom-1/4 left-[44%] h-24 w-24 rounded-full border border-white/80 bg-gradient-to-tr from-emerald-200/40 to-white/60 shadow-xs backdrop-blur-xs" />

      {/* Layer 3: High-Tech Enterprise Radar Waves & Curved Paths (SVG) */}
      <svg
        className="absolute top-1/2 left-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 opacity-[0.22]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="orbit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00b14f" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#34d399" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00b14f" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle
          cx="600"
          cy="600"
          r="240"
          fill="none"
          stroke="url(#orbit-grad)"
          strokeWidth="1.2"
          strokeDasharray="6 8"
        />
        <circle cx="600" cy="600" r="380" fill="none" stroke="#00b14f" strokeWidth="1" strokeOpacity="0.3" />
        <circle
          cx="600"
          cy="600"
          r="520"
          fill="none"
          stroke="#00b14f"
          strokeWidth="1"
          strokeDasharray="3 9"
          strokeOpacity="0.25"
        />
        <path
          d="M -200 400 C 200 200, 600 700, 1000 450 C 1200 350, 1400 500, 1600 400"
          fill="none"
          stroke="#00b14f"
          strokeWidth="1.5"
          strokeOpacity="0.2"
        />
        <path
          d="M -200 480 C 250 280, 650 780, 1050 530 C 1250 430, 1450 580, 1650 480"
          fill="none"
          stroke="#34d399"
          strokeWidth="1"
          strokeOpacity="0.15"
        />
      </svg>

      {/* Layer 4: Micro Dot Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] bg-size-[32px_32px] opacity-[0.06]" />
    </div>
  );
}
