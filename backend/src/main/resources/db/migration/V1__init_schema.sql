-- ============================================================
-- EdGro Tech — Initial Database Schema
-- V1: Core tables for universities, programs, leads, contacts
-- ============================================================

-- ── Universities ─────────────────────────────────────────────
CREATE TABLE universities (
    id          BIGINT          NOT NULL AUTO_INCREMENT,
    slug        VARCHAR(100)    NOT NULL,
    name        VARCHAR(200)    NOT NULL,
    short_name  VARCHAR(20)     NOT NULL,
    city        VARCHAR(100)    NOT NULL,
    naac_grade  VARCHAR(10)     NOT NULL,
    hue         INT             NOT NULL DEFAULT 0,
    image_url   VARCHAR(500),
    established INT,
    programs    INT             NOT NULL DEFAULT 0,
    fees_min    DECIMAL(12,2),
    fees_max    DECIMAL(12,2),
    placement   VARCHAR(50),
    alumni      VARCHAR(50),
    tag         ENUM('Recommended','Premium','Popular','Best ROI'),
    active      TINYINT(1)      NOT NULL DEFAULT 1,
    created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY uq_university_slug (slug),
    INDEX idx_university_city (city),
    INDEX idx_university_naac (naac_grade),
    INDEX idx_university_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── University Highlights (1-to-many) ────────────────────────
CREATE TABLE university_highlights (
    id              BIGINT      NOT NULL AUTO_INCREMENT,
    university_id   BIGINT      NOT NULL,
    highlight       VARCHAR(200) NOT NULL,
    sort_order      INT         NOT NULL DEFAULT 0,

    PRIMARY KEY (id),
    INDEX idx_uh_university (university_id),
    CONSTRAINT fk_uh_university FOREIGN KEY (university_id)
        REFERENCES universities(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Programs ─────────────────────────────────────────────────
CREATE TABLE programs (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    slug            VARCHAR(100)    NOT NULL,
    name            VARCHAR(200)    NOT NULL,
    category        ENUM('Undergraduate','Postgraduate','Certification') NOT NULL,
    tag             VARCHAR(50),
    description     TEXT,
    fees_min        DECIMAL(12,2),
    fees_max        DECIMAL(12,2),
    duration        VARCHAR(50),
    university_count INT            NOT NULL DEFAULT 0,
    eligibility     VARCHAR(300),
    active          TINYINT(1)      NOT NULL DEFAULT 1,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY uq_program_slug (slug),
    INDEX idx_program_category (category),
    INDEX idx_program_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Program Outcomes ─────────────────────────────────────────
CREATE TABLE program_outcomes (
    id          BIGINT      NOT NULL AUTO_INCREMENT,
    program_id  BIGINT      NOT NULL,
    outcome     VARCHAR(300) NOT NULL,
    sort_order  INT         NOT NULL DEFAULT 0,

    PRIMARY KEY (id),
    INDEX idx_po_program (program_id),
    CONSTRAINT fk_po_program FOREIGN KEY (program_id)
        REFERENCES programs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Program Specializations ──────────────────────────────────
CREATE TABLE program_specializations (
    id              BIGINT      NOT NULL AUTO_INCREMENT,
    program_id      BIGINT      NOT NULL,
    specialization  VARCHAR(200) NOT NULL,
    sort_order      INT         NOT NULL DEFAULT 0,

    PRIMARY KEY (id),
    INDEX idx_ps_program (program_id),
    CONSTRAINT fk_ps_program FOREIGN KEY (program_id)
        REFERENCES programs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── University ↔ Program (many-to-many) ──────────────────────
CREATE TABLE university_programs (
    university_id   BIGINT NOT NULL,
    program_id      BIGINT NOT NULL,

    PRIMARY KEY (university_id, program_id),
    CONSTRAINT fk_up_university FOREIGN KEY (university_id)
        REFERENCES universities(id) ON DELETE CASCADE,
    CONSTRAINT fk_up_program FOREIGN KEY (program_id)
        REFERENCES programs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Lead Submissions ─────────────────────────────────────────
CREATE TABLE leads (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    name            VARCHAR(100)    NOT NULL,
    phone           VARCHAR(20)     NOT NULL,
    email           VARCHAR(200),
    course_interest VARCHAR(200),
    source          VARCHAR(100)    DEFAULT 'website',
    utm_source      VARCHAR(100),
    utm_medium      VARCHAR(100),
    utm_campaign    VARCHAR(100),
    status          ENUM('new','contacted','qualified','enrolled','lost')
                    NOT NULL DEFAULT 'new',
    notes           TEXT,
    ip_address      VARCHAR(45),
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    INDEX idx_lead_phone (phone),
    INDEX idx_lead_status (status),
    INDEX idx_lead_created (created_at),
    INDEX idx_lead_source (source)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Contact Messages ─────────────────────────────────────────
CREATE TABLE contact_messages (
    id          BIGINT          NOT NULL AUTO_INCREMENT,
    name        VARCHAR(100)    NOT NULL,
    email       VARCHAR(200)    NOT NULL,
    phone       VARCHAR(20),
    subject     VARCHAR(300),
    message     TEXT            NOT NULL,
    read_at     DATETIME,
    ip_address  VARCHAR(45),
    created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    INDEX idx_cm_email (email),
    INDEX idx_cm_created (created_at),
    INDEX idx_cm_read (read_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Admin Users ──────────────────────────────────────────────
CREATE TABLE admin_users (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    email           VARCHAR(200)    NOT NULL,
    password_hash   VARCHAR(255)    NOT NULL,
    full_name       VARCHAR(100),
    role            ENUM('SUPER_ADMIN','ADMIN','COUNSELOR') NOT NULL DEFAULT 'COUNSELOR',
    active          TINYINT(1)      NOT NULL DEFAULT 1,
    last_login_at   DATETIME,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY uq_admin_email (email),
    INDEX idx_admin_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Testimonials ─────────────────────────────────────────────
CREATE TABLE testimonials (
    id          BIGINT          NOT NULL AUTO_INCREMENT,
    name        VARCHAR(100)    NOT NULL,
    role        VARCHAR(200),
    university  VARCHAR(200),
    program     VARCHAR(200),
    content     TEXT            NOT NULL,
    rating      TINYINT         NOT NULL DEFAULT 5,
    avatar_url  VARCHAR(500),
    active      TINYINT(1)      NOT NULL DEFAULT 1,
    sort_order  INT             NOT NULL DEFAULT 0,
    created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    INDEX idx_testimonial_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
