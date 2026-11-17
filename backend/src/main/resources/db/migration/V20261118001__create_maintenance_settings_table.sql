CREATE TABLE maintenance_settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    enabled BOOLEAN NOT NULL DEFAULT FALSE,
    message VARCHAR(500) NULL,
    estimated_resume_at TIMESTAMP NULL,
    enabled_at TIMESTAMP NULL,
    enabled_by BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_maintenance_settings_enabled_by FOREIGN KEY (enabled_by) REFERENCES users (id) ON DELETE SET NULL
);

INSERT INTO maintenance_settings (enabled, created_at, updated_at)
VALUES (FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
