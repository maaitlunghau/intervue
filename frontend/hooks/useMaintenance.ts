'use client';

import { adminPlatformApi } from '@/apiRequest/platform';
import type { SaveMaintenanceInput } from '@/types/platform';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const maintenanceKeys = {
  settings: ['admin', 'maintenance'] as const,
};

export function useMaintenanceSettings() {
  return useQuery({
    queryKey: maintenanceKeys.settings,
    queryFn: adminPlatformApi.getMaintenance,
  });
}

export function useUpdateMaintenance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SaveMaintenanceInput) => adminPlatformApi.updateMaintenance(input),
    onSuccess: (updated) => {
      queryClient.setQueryData(maintenanceKeys.settings, updated);
      void queryClient.invalidateQueries({ queryKey: maintenanceKeys.settings });
    },
  });
}
