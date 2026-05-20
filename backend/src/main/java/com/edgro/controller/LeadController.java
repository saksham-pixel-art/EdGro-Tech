package com.edgro.controller;

import com.edgro.dto.ApiResponse;
import com.edgro.dto.LeadRequest;
import com.edgro.model.Lead;
import com.edgro.service.LeadService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    @PostMapping("/leads")
    public ResponseEntity<ApiResponse<Void>> submit(
            @Valid @RequestBody LeadRequest req,
            HttpServletRequest httpRequest) {
        leadService.submit(req, getClientIp(httpRequest));
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Thanks! Our counselor will call you within 24 hours.", null));
    }

    @GetMapping("/admin/leads")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','COUNSELOR')")
    public ResponseEntity<ApiResponse<Page<Lead>>> list(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<Lead> leads = leadService.findAll(search, status,
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
        return ResponseEntity.ok(ApiResponse.ok(leads));
    }

    @PatchMapping("/admin/leads/{id}/status")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','COUNSELOR')")
    public ResponseEntity<ApiResponse<Lead>> updateStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestParam(required = false) String notes) {
        Lead.LeadStatus leadStatus = Lead.LeadStatus.valueOf(status.toUpperCase());
        return ResponseEntity.ok(ApiResponse.ok(leadService.updateStatus(id, leadStatus, notes)));
    }

    private String getClientIp(HttpServletRequest request) {
        String xff = request.getHeader("X-Forwarded-For");
        return (xff != null && !xff.isBlank()) ? xff.split(",")[0].trim() : request.getRemoteAddr();
    }
}
