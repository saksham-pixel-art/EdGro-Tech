-- ============================================================
-- V6: Add Google Sheets sync tracking fields to leads table
-- sync_status: pending | synced | failed
-- synced_at:   timestamp of last successful sheet sync
-- ============================================================

ALTER TABLE leads
    ADD COLUMN sync_status  ENUM('PENDING','SYNCED','FAILED') NOT NULL DEFAULT 'PENDING' AFTER updated_at,
    ADD COLUMN synced_at    DATETIME NULL                                                AFTER sync_status;

CREATE INDEX idx_lead_sync_status ON leads (sync_status);
