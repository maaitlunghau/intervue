package com.techx.intervue.modules.platform.controllers;

import com.techx.intervue.controllers.BaseController;
import com.techx.intervue.modules.platform.resources.MaintenanceStatusResource;
import com.techx.intervue.modules.platform.services.interfaces.MaintenanceServiceInterface;
import com.techx.intervue.resources.ApiResource;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/platform")
@RequiredArgsConstructor
public class PublicMaintenanceController extends BaseController {

    private final MaintenanceServiceInterface maintenanceService;

    @GetMapping("/maintenance")
    public ResponseEntity<ApiResource<MaintenanceStatusResource>> status() {
        return ok(maintenanceService.currentStatus(), "Maintenance status retrieved successfully!");
    }
}
