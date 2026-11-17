'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Switch } from '@/components/ui/Switch';
import { useUpdateMaintenance } from '@/hooks/useMaintenance';
import { cn } from '@/lib/utils';
import {
  MAINTENANCE_MESSAGE_MAX_LENGTH,
  maintenanceSchema,
  toMaintenanceFormDefaults,
  toSaveMaintenancePayload,
  type MaintenanceFormData,
} from '@/schemas/maintenance.schema';
import type { MaintenanceSettings } from '@/types/platform';
import { applyFormError, getErrorMessage } from '@/utils/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { TriangleAlert } from 'lucide-react';
import { useId, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

interface AdminMaintenanceSettingsViewProps {
  initial: MaintenanceSettings;
}

const INPUT_DARK_CLASS =
  'dark:border-forest-700 dark:bg-forest-950 dark:text-forest-50 dark:placeholder:text-forest-400';

const INPUT_CLASS = cn(
  'border-outline-variant text-body-md text-navy w-full rounded-xl border bg-white px-3.5 py-2.5 outline-none focus:border-primary',
  INPUT_DARK_CLASS,
);

const MAINTENANCE_FIELDS: ReadonlyArray<keyof MaintenanceFormData> = ['enabled', 'message', 'estimatedResumeAt'];

function formatElapsed(enabledAt: string): string {
  const started = new Date(enabledAt).getTime();
  if (Number.isNaN(started)) return '';
  const minutes = Math.max(0, Math.floor((Date.now() - started) / 60_000));
  const hours = Math.floor(minutes / 60);
  return hours > 0 ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
}

export default function AdminMaintenanceSettingsView({ initial }: AdminMaintenanceSettingsViewProps) {
  const formId = useId();
  const [serverState, setServerState] = useState(initial);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const update = useUpdateMaintenance();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<MaintenanceFormData>({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: toMaintenanceFormDefaults(initial),
  });

  const enabled = useWatch({ control, name: 'enabled' });
  const message = useWatch({ control, name: 'message' });

  const persist = async (values: MaintenanceFormData) => {
    try {
      const next = await update.mutateAsync(toSaveMaintenancePayload(values));
      setServerState(next);
      reset(toMaintenanceFormDefaults(next));
      toast.success(next.enabled ? 'Maintenance mode is now ON.' : 'Maintenance mode is now OFF.');
    } catch (cause) {
      applyFormError<MaintenanceFormData>(cause, setError, MAINTENANCE_FIELDS);
      toast.error(getErrorMessage(cause));
    }
  };

  // Closing the site is the direction worth a second look; reopening it is the safe one.
  const onSubmit = async (values: MaintenanceFormData) => {
    if (values.enabled && !serverState.enabled) {
      setConfirmOpen(true);
      return;
    }
    await persist(values);
  };

  return (
    <div className="space-y-5 pb-16">
      <AdminPageHeader description="Close the platform to candidates and recruiters while you upgrade. The admin area stays reachable." />

      {serverState.enabled && (
        <div className="flex flex-wrap items-center gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-500/40 dark:bg-amber-500/10">
          <TriangleAlert className="h-4.5 w-4.5 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-body-sm font-semibold text-amber-800 dark:text-amber-300">
            The site is currently closed to candidates and recruiters
            {serverState.enabledAt && ` — on for ${formatElapsed(serverState.enabledAt)}`}.
          </p>
        </div>
      )}

      <form
        id={formId}
        onSubmit={handleSubmit(onSubmit)}
        className="dark:border-forest-800 dark:bg-forest-900 border-outline-variant space-y-5 rounded-2xl border bg-white p-5 shadow-xs"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-navy dark:text-forest-50 text-body-md font-bold">Maintenance mode</p>
            <p className="dark:text-forest-300 text-body-sm text-on-surface-variant mt-0.5">
              When on, every candidate, recruiter and guest page shows the maintenance notice.
            </p>
          </div>
          <Controller
            control={control}
            name="enabled"
            render={({ field }) => (
              <Switch checked={field.value} onChange={field.onChange} ariaLabel="Toggle maintenance mode" />
            )}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor={`${formId}-message`} className="text-navy dark:text-forest-100 text-body-sm font-semibold">
            Custom message <span className="text-outline font-normal">(optional)</span>
          </label>
          <textarea
            id={`${formId}-message`}
            rows={3}
            maxLength={MAINTENANCE_MESSAGE_MAX_LENGTH}
            placeholder="Leave empty to use the default apology line."
            className={cn(INPUT_CLASS, 'resize-y')}
            {...register('message')}
          />
          <div className="flex items-center justify-between">
            <p className="text-label-sm text-red-600">{errors.message?.message}</p>
            <p className="text-label-sm text-outline">
              {(message ?? '').length}/{MAINTENANCE_MESSAGE_MAX_LENGTH}
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor={`${formId}-resume`} className="text-navy dark:text-forest-100 text-body-sm font-semibold">
            Estimated resume time <span className="text-outline font-normal">(optional)</span>
          </label>
          <input
            id={`${formId}-resume`}
            type="datetime-local"
            className={INPUT_CLASS}
            {...register('estimatedResumeAt')}
          />
          <p className="text-label-sm text-outline">
            Shown on the notice and used for the Retry-After header. Leave empty to omit the line.
          </p>
        </div>

        {errors.root?.message && <p className="text-body-sm text-red-600">{errors.root.message}</p>}

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || !isDirty}>
            {enabled ? 'Save and close the site' : 'Save'}
          </Button>
        </div>
      </form>

      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Close the site to everyone?"
        description="Candidates and recruiters will immediately lose access to every page until you switch maintenance back off. Only the admin area stays reachable."
        maxWidth="md"
        footer={
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit(async (values) => {
                setConfirmOpen(false);
                await persist(values);
              })}
            >
              Yes, turn it on
            </Button>
          </div>
        }
      >
        <p className="dark:text-forest-300 text-body-sm text-on-surface-variant">
          Remember to turn it off as soon as the upgrade is finished.
        </p>
      </Modal>
    </div>
  );
}
