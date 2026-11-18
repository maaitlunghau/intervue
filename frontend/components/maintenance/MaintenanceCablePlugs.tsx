import { cn } from '@/lib/utils';

type MaintenanceCablePlugsProps = { className?: string };

export default function MaintenanceCablePlugs({ className }: MaintenanceCablePlugsProps) {
  return (
    <svg
      viewBox="0 0 760 130"
      role="img"
      aria-label="System maintenance connection"
      className={cn('h-auto w-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.03)]', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ================= LEFT SIDE (INFRASTRUCTURE / BLUE) ================= */}
      {/* Left Cable with smooth S-curve down */}
      <path d="M20 42 H170 C195 42 205 66 230 66 H290" stroke="#93c5fd" strokeWidth="10" strokeLinecap="round" />

      {/* Left Plug Base / Cord Guard */}
      <rect x="286" y="56" width="12" height="20" rx="3" fill="#2563eb" />

      {/* Left Plug Body */}
      <rect x="296" y="44" width="48" height="44" rx="8" fill="#2563eb" />
      {/* Left Plug Grip Stripes / Accent */}
      <rect x="300" y="48" width="16" height="36" rx="4" fill="#1d4ed8" />
      <rect x="320" y="48" width="8" height="36" rx="2" fill="#3b82f6" opacity="0.6" />

      {/* Left Male Metal Pins */}
      <rect x="344" y="50" width="18" height="8" rx="2.5" fill="#60a5fa" />
      <rect x="344" y="74" width="18" height="8" rx="2.5" fill="#60a5fa" />

      {/* Top Left Bracket Arc (Blue) */}
      <path d="M352 30 C352 35 356 39 362 39" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
      {/* Bottom Left Bracket Arc (Blue) */}
      <path d="M352 102 C352 97 356 93 362 93" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />

      {/* ================= RIGHT SIDE (INTERVUE / BRAND GREEN) ================= */}
      {/* Top Right Bracket Arc (Green) */}
      <path d="M398 39 C404 39 408 35 408 30" stroke="#00b14f" strokeWidth="4" strokeLinecap="round" />
      {/* Bottom Right Bracket Arc (Green) */}
      <path d="M398 93 C404 93 408 97 408 102" stroke="#00b14f" strokeWidth="4" strokeLinecap="round" />

      {/* Right Female Connector Housing / Receptor Slots */}
      <rect x="396" y="50" width="14" height="8" rx="2" fill="#10b981" />
      <rect x="396" y="74" width="14" height="8" rx="2" fill="#10b981" />

      {/* Right Plug Body */}
      <rect x="408" y="44" width="50" height="44" rx="8" fill="#00b14f" />
      {/* Right Plug Grip Stripes / Accent */}
      <rect x="412" y="48" width="18" height="36" rx="4" fill="#008c3e" />
      <rect x="434" y="48" width="10" height="36" rx="2" fill="#059669" opacity="0.6" />

      {/* Right Plug Base / Cord Guard */}
      <rect x="456" y="56" width="12" height="20" rx="3" fill="#008c3e" />

      {/* Right Cable with smooth S-curve up */}
      <path d="M466 66 H526 C551 66 561 42 586 42 H740" stroke="#86efac" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}
