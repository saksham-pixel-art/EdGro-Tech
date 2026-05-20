-- ============================================================
-- V4: Make email NOT NULL on leads table
-- ============================================================

-- Set a placeholder for any existing rows that have no email
-- (prevents migration failure on existing data)
UPDATE leads SET email = CONCAT('unknown-', id, '@placeholder.edgro') WHERE email IS NULL OR email = '';

ALTER TABLE leads
    MODIFY COLUMN email VARCHAR(200) NOT NULL;

-- Index email for dedup and lookup
CREATE INDEX idx_lead_email ON leads (email);
