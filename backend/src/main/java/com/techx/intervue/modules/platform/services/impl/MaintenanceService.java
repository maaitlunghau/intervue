package com.techx.intervue.modules.platform.services.impl;

import com.techx.intervue.exceptions.AppException;
import com.techx.intervue.exceptions.ErrorCode;
import com.techx.intervue.modules.platform.entities.MaintenanceSettings;
import com.techx.intervue.modules.platform.mappers.MaintenanceMapper;
import com.techx.intervue.modules.platform.repositories.MaintenanceSettingsRepository;
import com.techx.intervue.modules.platform.requests.SaveMaintenanceRequest;
import com.techx.intervue.modules.platform.resources.MaintenanceSettingsResource;
import com.techx.intervue.modules.platform.resources.MaintenanceStatusResource;
import com.techx.intervue.modules.platform.services.interfaces.MaintenanceServiceInterface;
import java.time.Instant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MaintenanceService implements MaintenanceServiceInterface {

    private final MaintenanceSettingsRepository settingsRepository;
    private final MaintenanceSettingsCache settingsCache;
    private final MaintenanceMapper maintenanceMapper;

    @Override
    @Transactional(readOnly = true)
    public MaintenanceStatusResource currentStatus() {
        MaintenanceStatusResource cached = settingsCache.get();
        if (cached != null) {
            return cached;
        }
        MaintenanceStatusResource loaded = maintenanceMapper.toStatus(requireSettings());
        settingsCache.put(loaded);
        return loaded;
    }

    @Override
    @Transactional(readOnly = true)
    public MaintenanceSettingsResource currentSettings() {
        return maintenanceMapper.toSettings(requireSettings());
    }

    @Override
    @Transactional
    public MaintenanceSettingsResource save(SaveMaintenanceRequest request, Long adminUserId) {
        MaintenanceSettings settings = requireSettings();
        boolean wasEnabled = Boolean.TRUE.equals(settings.getEnabled());
        boolean nowEnabled = Boolean.TRUE.equals(request.enabled());

        settings.setEnabled(nowEnabled);
        settings.setMessage(blankToNull(request.message()));
        settings.setEstimatedResumeAt(request.estimatedResumeAt());

        // Only the off -> on transition stamps the clock, so editing the message never resets it.
        if (nowEnabled && !wasEnabled) {
            settings.setEnabledAt(Instant.now());
            settings.setEnabledBy(adminUserId);
        } else if (!nowEnabled) {
            settings.setEnabledAt(null);
            settings.setEnabledBy(null);
        }

        MaintenanceSettings saved = settingsRepository.save(settings);
        settingsCache.evict();
        return maintenanceMapper.toSettings(saved);
    }

    @Override
    public boolean isEnabled() {
        return currentStatus().enabled();
    }

    private MaintenanceSettings requireSettings() {
        return settingsRepository
                .findFirstByOrderByIdAsc()
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
