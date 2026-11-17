export interface MaintenanceStatus {
  enabled: boolean;
  message: string | null;
  estimatedResumeAt: string | null;
}

export interface MaintenanceSettings extends MaintenanceStatus {
  enabledAt: string | null;
  enabledBy: number | null;
}

export interface SaveMaintenanceInput {
  enabled: boolean;
  message: string | null;
  estimatedResumeAt: string | null;
}
