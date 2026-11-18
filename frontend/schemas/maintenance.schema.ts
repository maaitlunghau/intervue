import type { MaintenanceSettings, SaveMaintenanceInput } from '@/types/platform';
import { z } from 'zod';

export const MAINTENANCE_MESSAGE_MAX_LENGTH = 500;

export const maintenanceSchema = z.object({
  enabled: z.boolean(),
  message: z
    .string()
    .max(MAINTENANCE_MESSAGE_MAX_LENGTH, `Keep the message under ${MAINTENANCE_MESSAGE_MAX_LENGTH} characters.`),
  estimatedResumeAt: z.string(),
});

export type MaintenanceFormData = z.infer<typeof maintenanceSchema>;

// <input type="datetime-local"> speaks local wall-clock time with no zone, while the API
// stores UTC instants, so both directions have to go through the Date constructor.
function toLocalInputValue(iso: string | null): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const offsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

function toIsoInstant(localValue: string): string | null {
  const trimmed = localValue.trim();
  if (!trimmed) return null;
  const date = new Date(trimmed);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function toMaintenanceFormDefaults(settings: MaintenanceSettings): MaintenanceFormData {
  return {
    enabled: settings.enabled,
    message: settings.message ?? '',
    estimatedResumeAt: toLocalInputValue(settings.estimatedResumeAt),
  };
}

export function toSaveMaintenancePayload(data: MaintenanceFormData): SaveMaintenanceInput {
  return {
    enabled: data.enabled,
    message: data.message.trim() || null,
    estimatedResumeAt: toIsoInstant(data.estimatedResumeAt),
  };
}
