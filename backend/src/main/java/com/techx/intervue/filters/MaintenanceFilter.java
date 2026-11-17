package com.techx.intervue.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.techx.intervue.exceptions.ErrorCode;
import com.techx.intervue.modules.platform.services.interfaces.MaintenanceServiceInterface;
import com.techx.intervue.resources.ApiResource;
import com.techx.intervue.resources.ErrorResource;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class MaintenanceFilter extends OncePerRequestFilter {

    private static final String ADMIN_ROLE = "ROLE_ADMIN";
    private static final long RETRY_AFTER_SECONDS = 600;

    // Admin login/refresh arrive with no token, so role alone cannot let them through.
    private static final List<String> ALWAYS_ALLOWED_PREFIXES =
            List.of("/api/v1/platform/maintenance", "/api/v1/admin/", "/api/v1/auth/", "/ping");

    private final MaintenanceServiceInterface maintenanceService;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        if (isAllowed(request) || !maintenanceService.isEnabled()) {
            filterChain.doFilter(request, response);
            return;
        }

        reject(response);
    }

    private boolean isAllowed(HttpServletRequest request) {
        // A preflight carries no Authorization header; blocking it locks the admin UI out.
        if (HttpMethod.OPTIONS.matches(request.getMethod())) {
            return true;
        }
        if (isAdmin()) {
            return true;
        }
        String path = request.getRequestURI();
        return ALWAYS_ALLOWED_PREFIXES.stream().anyMatch(path::startsWith);
    }

    private boolean isAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null
                && authentication.isAuthenticated()
                && authentication.getAuthorities().stream()
                        .anyMatch(authority -> ADMIN_ROLE.equals(authority.getAuthority()));
    }

    private void reject(HttpServletResponse response) throws IOException {
        ErrorResource error =
                ErrorResource.builder().code(ErrorCode.MAINTENANCE_MODE_ACTIVE.name()).build();
        response.setStatus(ErrorCode.MAINTENANCE_MODE_ACTIVE.getStatus().value());
        response.setHeader(HttpHeaders.RETRY_AFTER, String.valueOf(RETRY_AFTER_SECONDS));
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.getWriter()
                .write(
                        objectMapper.writeValueAsString(
                                ApiResource.error(
                                        error, ErrorCode.MAINTENANCE_MODE_ACTIVE.getMessage())));
    }
}
