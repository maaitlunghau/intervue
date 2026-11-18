package com.techx.intervue.modules.platform.repositories;

import com.techx.intervue.modules.platform.entities.MaintenanceSettings;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaintenanceSettingsRepository extends JpaRepository<MaintenanceSettings, Long> {

    Optional<MaintenanceSettings> findFirstByOrderByIdAsc();
}
