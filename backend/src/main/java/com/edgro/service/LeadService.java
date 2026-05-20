package com.edgro.service;

import com.edgro.dto.LeadRequest;
import com.edgro.exception.DuplicateLeadException;
import com.edgro.exception.ResourceNotFoundException;
import com.edgro.model.Lead;
import com.edgro.repository.LeadRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class LeadService {

    private static final Logger log = LoggerFactory.getLogger(LeadService.class);

    private final LeadRepository leadRepository;
    private final GoogleSheetsService sheetsService;

    public LeadService(LeadRepository leadRepository, GoogleSheetsService sheetsService) {
        this.leadRepository = leadRepository;
        this.sheetsService = sheetsService;
    }

    /**
     * DATABASE-FIRST lead submission:
     * 1. Duplicate check
     * 2. Save to MySQL (primary truth)
     * 3. Trigger async Google Sheets sync (non-blocking)
     */
    @Transactional
    public Lead submit(LeadRequest req, String ipAddress) {
        boolean recentExists = leadRepository.existsByPhoneAndCreatedAtAfter(
                req.getPhone(), LocalDateTime.now().minusHours(24));
        if (recentExists) {
            throw new DuplicateLeadException(
                "A request from this number was already received. Our counselor will contact you shortly.");
        }

        Lead lead = new Lead();
        lead.setName(req.getName().trim());
        lead.setPhone(req.getPhone().trim());
        lead.setEmail(req.getEmail() != null ? req.getEmail().trim() : null);
        lead.setCity(req.getCity() != null ? req.getCity().trim() : null);
        lead.setState(req.getState() != null ? req.getState().trim() : null);
        lead.setPreferredUniversity(req.getPreferredUniversity());
        lead.setCourseInterest(req.getCourseInterest());
        lead.setSource(req.getSource() != null ? req.getSource() : "website");
        lead.setUtmSource(req.getUtmSource());
        lead.setUtmMedium(req.getUtmMedium());
        lead.setUtmCampaign(req.getUtmCampaign());
        lead.setIpAddress(ipAddress);
        lead.setStatus(Lead.LeadStatus.NEW);
        lead.setSyncStatus(Lead.SyncStatus.PENDING);

        // ── STEP 1: Save to database (primary source of truth) ──────────
        Lead saved = leadRepository.save(lead);
        log.info("Lead saved to DB: id={}, phone={}, course={}", saved.getId(), saved.getPhone(), saved.getCourseInterest());

        // ── STEP 2: Async Google Sheets sync (non-blocking) ─────────────
        syncToSheetsAsync(saved.getId());

        return saved;
    }

    /**
     * Asynchronously pushes the saved lead to Google Sheets.
     * Runs in a separate thread — never blocks the HTTP response.
     * Updates sync_status to SYNCED or FAILED in DB.
     */
    @Async
    public void syncToSheetsAsync(Long leadId) {
        // Load fresh within this new transaction context
        leadRepository.findById(leadId).ifPresent(lead -> {
            try {
                sheetsService.appendLead(lead);
                lead.setSyncStatus(Lead.SyncStatus.SYNCED);
                lead.setSyncedAt(LocalDateTime.now());
                leadRepository.save(lead);
                log.info("Google Sheets sync SUCCESS for lead id={}", leadId);
            } catch (Exception ex) {
                lead.setSyncStatus(Lead.SyncStatus.FAILED);
                leadRepository.save(lead);
                log.error("Google Sheets sync FAILED for lead id={}: {} — will retry via scheduler",
                        leadId, ex.getMessage());
            }
        });
    }

    @Transactional(readOnly = true)
    public Page<Lead> findAll(String search, String status, Pageable pageable) {
        Lead.LeadStatus leadStatus = null;
        if (status != null && !status.isBlank()) {
            try {
                leadStatus = Lead.LeadStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException ignored) {}
        }
        return leadRepository.search(
                search != null && !search.isBlank() ? search.trim() : null,
                leadStatus, pageable);
    }

    @Transactional
    public Lead updateStatus(Long id, Lead.LeadStatus newStatus, String notes) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found: " + id));
        lead.setStatus(newStatus);
        if (notes != null) lead.setNotes(notes);
        return leadRepository.save(lead);
    }
}
