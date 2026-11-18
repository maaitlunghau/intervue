package com.techx.intervue.modules.platform.services.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.techx.intervue.modules.platform.resources.MaintenanceStatusResource;
import java.time.Duration;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class MaintenanceSettingsCache {

    private static final String KEY = "cache:platform:maintenance";
    private static final Duration TTL = Duration.ofSeconds(30);

    private final StringRedisTemplate redis;
    private final ObjectMapper objectMapper;

    public MaintenanceStatusResource get() {
        try {
            String cached = redis.opsForValue().get(KEY);
            if (cached == null) {
                return null;
            }
            return objectMapper.readValue(cached, MaintenanceStatusResource.class);
        } catch (JsonProcessingException e) {
            log.warn("Discarding unreadable maintenance status cache: {}", e.getMessage());
            return null;
        } catch (RuntimeException e) {
            log.warn("Could not read the maintenance status cache: {}", e.getMessage());
            return null;
        }
    }

    public void put(MaintenanceStatusResource status) {
        try {
            redis.opsForValue().set(KEY, objectMapper.writeValueAsString(status), TTL);
        } catch (JsonProcessingException | RuntimeException e) {
            log.warn("Could not cache the maintenance status: {}", e.getMessage());
        }
    }

    public void evict() {
        try {
            redis.delete(KEY);
        } catch (RuntimeException e) {
            log.warn("Could not evict the maintenance status cache: {}", e.getMessage());
        }
    }
}
