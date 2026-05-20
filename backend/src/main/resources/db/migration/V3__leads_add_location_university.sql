-- ============================================================
-- V3: Add city, state, preferred_university to leads table
-- ============================================================

ALTER TABLE leads
    ADD COLUMN city                VARCHAR(100)  NULL AFTER email,
    ADD COLUMN state               VARCHAR(100)  NULL AFTER city,
    ADD COLUMN preferred_university VARCHAR(200) NULL AFTER state;

-- Index state for filtering leads by region
CREATE INDEX idx_lead_state ON leads (state);
