'use client';

import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  duration?: number;
  startValue?: number;
  decimals?: number;
  separator?: boolean;
  prefix?: string;
  suffix?: string;
  enabled?: boolean;
}

const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

export function useCountUp(targetValue: number, options: UseCountUpOptions = {}): string {
  const {
    duration = 450,
    startValue = 0,
    decimals = 0,
    separator = true,
    prefix = '',
    suffix = '',
    enabled = true,
  } = options;

  const [displayValue, setDisplayValue] = useState<number>(startValue);
  const startValRef = useRef(startValue);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const frameId = requestAnimationFrame(() => setDisplayValue(targetValue));
      return () => cancelAnimationFrame(frameId);
    }

    const start = startValRef.current;
    const end = targetValue;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = start + (end - start) * easedProgress;

      setDisplayValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
        startValRef.current = end;
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [targetValue, duration, enabled]);

  const valueToFormat = enabled ? displayValue : targetValue;
  const fixed = valueToFormat.toFixed(decimals);
  const parts = fixed.split('.');
  if (separator) {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  const formatted = parts.join('.');

  return `${prefix}${formatted}${suffix}`;
}

export function AnimatedNumber({
  value,
  duration = 450,
  decimals = 0,
  separator = true,
  prefix = '',
  suffix = '',
  className = '',
}: {
  value: number;
  duration?: number;
  decimals?: number;
  separator?: boolean;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const formatted = useCountUp(value, { duration, decimals, separator, prefix, suffix });
  return <span className={`tabular-nums ${className}`}>{formatted}</span>;
}
