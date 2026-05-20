package com.edgro.service;

import com.edgro.model.Lead;
import com.edgro.repository.LeadRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Background scheduler that retries Google Sheets sync for leads
 * that previously failed (sync_status = FAILED) or are still PENDING.
 *
 * Runs every 5 minutes. This ensures zero data loss even if the
 * Sheets API was temporarily unavailable during submission.
 */
@Component
public class SyncRetryScheduler {

    private static final Logger log = LoggerFactory.getLogger(SyncRetryScheduler.class);

    private final LeadRepository leadRepository;
    private final GoogleSheetsService sheetsService;

    public SyncRetryScheduler(LeadRepository leadRepository, GoogleSheetsService sheetsService) {
        this.leadRepository = leadRepository;
        this.sheetsService = sheetsService;
    }

    /**
     * Retry FAILED leads every 5 minutes.
     * Also picks up any PENDING leads that were somehow missed (e.g. server restart).
     */
    @Scheduled(fixedDelay = 5 * 60 * 1000)   // 5 min
    @Transactional
    public void retryFailedSyncs() {
        List<Lead> unsynced = leadRepository.findBySyncStatusIn(
                List.of(Lead.SyncStatus.FAILED, Lead.SyncStatus.PENDING));

        if (unsynced.isEmpty()) return;

        log.info("SyncRetryScheduler: found {} unsynced lead(s), attempting retry...", unsynced.size());

        for (Lead lead : unsynced) {
            try {
                sheetsService.appendLead(lead);
                lead.setSyncStatus(Lead.SyncStatus.SYNCED);
                lead.setSyncedAt(LocalDateTime.now());
                leadRepository.save(lead);
                log.info("Retry sync SUCCESS for lead id={}", lead.getId());
            } catch (Exception ex) {
                lead.setSyncStatus(Lead.SyncStatus.FAILED);
                leadRepository.save(lead);
                log.error("Retry sync FAILED for lead id={}: {}", lead.getId(), ex.getMessage());
            }
        }
    }
}
