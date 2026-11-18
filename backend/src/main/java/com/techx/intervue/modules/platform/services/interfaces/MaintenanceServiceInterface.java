package com.techx.intervue.modules.platform.services.interfaces;

import com.techx.intervue.modules.platform.requests.SaveMaintenanceRequest;
import com.techx.intervue.modules.platform.resources.MaintenanceSettingsResource;
import com.techx.intervue.modules.platform.resources.MaintenanceStatusResource;

public interface MaintenanceServiceInterface {

    MaintenanceStatusResource currentStatus();

    MaintenanceSettingsResource currentSettings();

    MaintenanceSettingsResource save(SaveMaintenanceRequest request, Long adminUserId);

    boolean isEnabled();
}
