import { cn } from '@/lib/utils';

type WorkZoneBarrierProps = { className?: string };

export default function WorkZoneBarrier({ className }: WorkZoneBarrierProps) {
  return (
    <svg viewBox="0 0 720 270" role="img" aria-label="Work zone barrier" className={cn('h-auto w-full', className)}>
      <defs>
        <pattern
          id="maintenance-hazard-stripes"
          width="34"
          height="34"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="34" height="34" fill="#00b14f" />
          <rect width="17" height="34" fill="#212f3f" />
        </pattern>
      </defs>

      <ellipse cx="360" cy="246" rx="190" ry="15" fill="#e6f7ee" />
      <rect
        x="-40"
        y="52"
        width="800"
        height="26"
        fill="url(#maintenance-hazard-stripes)"
        opacity="0.22"
        transform="rotate(-5 360 65)"
      />
      <path d="M351 54h18l44 156h-106z" fill="#00b14f" />
      <path d="M355 54h10l5 20h-20z" fill="#06503b" />
      <path d="M333 104h54l11 36h-76z" fill="#ffffff" />
      <rect x="286" y="206" width="148" height="26" rx="11" fill="#06503b" />
      <rect
        x="-40"
        y="148"
        width="800"
        height="38"
        fill="url(#maintenance-hazard-stripes)"
        transform="rotate(4 360 167)"
      />
    </svg>
  );
}
