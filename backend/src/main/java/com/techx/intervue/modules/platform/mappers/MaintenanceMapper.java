package com.techx.intervue.modules.platform.mappers;

import com.techx.intervue.modules.platform.entities.MaintenanceSettings;
import com.techx.intervue.modules.platform.resources.MaintenanceSettingsResource;
import com.techx.intervue.modules.platform.resources.MaintenanceStatusResource;
import org.springframework.stereotype.Component;

@Component
public class MaintenanceMapper {

    public MaintenanceStatusResource toStatus(MaintenanceSettings entity) {
        return new MaintenanceStatusResource(
                Boolean.TRUE.equals(entity.getEnabled()),
                entity.getMessage(),
                entity.getEstimatedResumeAt());
    }

    public MaintenanceSettingsResource toSettings(MaintenanceSettings entity) {
        return new MaintenanceSettingsResource(
                Boolean.TRUE.equals(entity.getEnabled()),
                entity.getMessage(),
                entity.getEstimatedResumeAt(),
                entity.getEnabledAt(),
                entity.getEnabledBy());
    }
}
