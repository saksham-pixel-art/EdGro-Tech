package com.edgro.service;

import com.edgro.dto.AuthRequest;
import com.edgro.dto.AuthResponse;
import com.edgro.exception.UnauthorizedException;
import com.edgro.model.AdminUser;
import com.edgro.repository.AdminUserRepository;
import com.edgro.security.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(AdminUserRepository adminUserRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse login(AuthRequest req) {
        AdminUser user = adminUserRepository.findByEmailAndActiveTrue(req.getEmail().toLowerCase())
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new UnauthorizedException("Invalid credentials");
        }

        user.setLastLoginAt(LocalDateTime.now());
        adminUserRepository.save(user);

        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());
        log.info("Admin login: email={}, role={}", user.getEmail(), user.getRole());

        return new AuthResponse(token, user.getEmail(), user.getFullName(), user.getRole().name());
    }
}
