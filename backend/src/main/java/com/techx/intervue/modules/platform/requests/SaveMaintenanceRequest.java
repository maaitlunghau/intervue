package com.techx.intervue.modules.platform.requests;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.Instant;

public record SaveMaintenanceRequest(
        @NotNull Boolean enabled, @Size(max = 500) String message, Instant estimatedResumeAt) {}
