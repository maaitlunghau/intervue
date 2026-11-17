package com.techx.intervue.modules.platform.resources;

import java.time.Instant;

public record MaintenanceSettingsResource(
        boolean enabled,
        String message,
        Instant estimatedResumeAt,
        Instant enabledAt,
        Long enabledBy) {}
