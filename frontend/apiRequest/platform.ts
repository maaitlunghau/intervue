import { request } from '@/apiRequest/http';
import type { MaintenanceSettings, MaintenanceStatus, SaveMaintenanceInput } from '@/types/platform';

export const platformApi = {
  getStatus: () => request<MaintenanceStatus>('/platform/maintenance'),
};

export const adminPlatformApi = {
  getMaintenance: () => request<MaintenanceSettings>('/admin/platform/maintenance'),

  updateMaintenance: (data: SaveMaintenanceInput) =>
    request<MaintenanceSettings>('/admin/platform/maintenance', { method: 'PUT', body: data }),
};
