package com.edgro.controller;

import com.edgro.dto.ApiResponse;
import com.edgro.dto.ContactRequest;
import com.edgro.model.ContactMessage;
import com.edgro.service.ContactService;
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
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/contact")
    public ResponseEntity<ApiResponse<Void>> submit(
            @Valid @RequestBody ContactRequest req,
            HttpServletRequest httpRequest) {
        contactService.submit(req, getClientIp(httpRequest));
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Message received! We'll get back to you within 24 hours.", null));
    }

    @GetMapping("/admin/messages")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<ApiResponse<Page<ContactMessage>>> list(
            @RequestParam(defaultValue = "false") boolean unreadOnly,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<ContactMessage> messages = unreadOnly
                ? contactService.findUnread(pageable)
                : contactService.findAll(pageable);
        return ResponseEntity.ok(ApiResponse.ok(messages));
    }

    @PatchMapping("/admin/messages/{id}/read")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<ApiResponse<ContactMessage>> markRead(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(contactService.markRead(id)));
    }

    private String getClientIp(HttpServletRequest request) {
        String xff = request.getHeader("X-Forwarded-For");
        return (xff != null && !xff.isBlank()) ? xff.split(",")[0].trim() : request.getRemoteAddr();
    }
}
