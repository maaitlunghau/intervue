package com.techx.intervue.modules.platform.controllers;

import com.techx.intervue.controllers.BaseController;
import com.techx.intervue.modules.platform.requests.SaveMaintenanceRequest;
import com.techx.intervue.modules.platform.resources.MaintenanceSettingsResource;
import com.techx.intervue.modules.platform.services.interfaces.MaintenanceServiceInterface;
import com.techx.intervue.modules.user.resources.CustomUserDetails;
import com.techx.intervue.resources.ApiResource;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/platform")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminMaintenanceController extends BaseController {

    private final MaintenanceServiceInterface maintenanceService;

    @GetMapping("/maintenance")
    public ResponseEntity<ApiResource<MaintenanceSettingsResource>> settings() {
        return ok(
                maintenanceService.currentSettings(),
                "Maintenance settings retrieved successfully!");
    }

    @PutMapping("/maintenance")
    public ResponseEntity<ApiResource<MaintenanceSettingsResource>> update(
            @Valid @RequestBody SaveMaintenanceRequest request,
            @AuthenticationPrincipal CustomUserDetails principal) {
        return ok(
                maintenanceService.save(request, principal.getId()),
                "Maintenance settings saved successfully!");
    }
}
