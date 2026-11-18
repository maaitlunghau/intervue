package com.techx.intervue.modules.platform.resources;

import java.time.Instant;

public record MaintenanceStatusResource(
        boolean enabled, String message, Instant estimatedResumeAt) {}
