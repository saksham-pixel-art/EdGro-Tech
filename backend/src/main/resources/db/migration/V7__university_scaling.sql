-- ============================================================
-- EdGro Tech — Scalable University Ecosystem
-- V7: Add dynamic courses, specializations, stats, faqs
-- ============================================================

-- ── 1. Update Universities Table ─────────────────────────────
ALTER TABLE universities
    ADD COLUMN logo VARCHAR(500) AFTER slug,
    ADD COLUMN banner_image VARCHAR(500) AFTER logo,
    ADD COLUMN description TEXT AFTER banner_image,
    ADD COLUMN accreditation VARCHAR(200) AFTER description,
    ADD COLUMN ranking VARCHAR(100) AFTER accreditation,
    ADD COLUMN location VARCHAR(200) AFTER ranking,
    ADD COLUMN website_url VARCHAR(500) AFTER location;

-- ── 2. Courses Table ─────────────────────────────────────────
CREATE TABLE courses (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    university_id   BIGINT          NOT NULL,
    course_name     VARCHAR(200)    NOT NULL,
    degree_type     VARCHAR(100)    NOT NULL,
    duration        VARCHAR(50),
    eligibility     TEXT,
    total_fees      DECIMAL(12,2),
    study_mode      VARCHAR(100),
    placement_support TINYINT(1)    NOT NULL DEFAULT 1,
    active          TINYINT(1)      NOT NULL DEFAULT 1,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    INDEX idx_course_university (university_id),
    CONSTRAINT fk_course_university FOREIGN KEY (university_id)
        REFERENCES universities(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── 3. Specializations Table ─────────────────────────────────
CREATE TABLE specializations (
    id                  BIGINT          NOT NULL AUTO_INCREMENT,
    course_id           BIGINT          NOT NULL,
    specialization_name VARCHAR(200)    NOT NULL,
    specialization_slug VARCHAR(200)    NOT NULL,
    description         TEXT,
    average_salary      VARCHAR(100),
    career_opportunities TEXT,
    skills_covered      TEXT,
    active              TINYINT(1)      NOT NULL DEFAULT 1,
    created_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY uq_specialization_slug (specialization_slug, course_id),
    INDEX idx_spec_course (course_id),
    CONSTRAINT fk_spec_course FOREIGN KEY (course_id)
        REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── 4. University Stats Table ────────────────────────────────
CREATE TABLE university_stats (
    university_id        BIGINT NOT NULL,
    placement_percentage DECIMAL(5,2),
    avg_package          VARCHAR(50),
    highest_package      VARCHAR(50),
    recruiters           TEXT,
    approvals            TEXT,

    PRIMARY KEY (university_id),
    CONSTRAINT fk_stat_university FOREIGN KEY (university_id)
        REFERENCES universities(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── 5. FAQs Table ────────────────────────────────────────────
CREATE TABLE faqs (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    university_id   BIGINT          NOT NULL,
    question        TEXT            NOT NULL,
    answer          TEXT            NOT NULL,
    sort_order      INT             NOT NULL DEFAULT 0,

    PRIMARY KEY (id),
    INDEX idx_faq_university (university_id),
    CONSTRAINT fk_faq_university FOREIGN KEY (university_id)
        REFERENCES universities(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
