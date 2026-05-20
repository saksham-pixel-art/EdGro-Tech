-- ============================================================
-- EdGro Tech — V5: Enrich program specializations from EduKyu
-- Adds detailed per-university specialization data scraped from
-- EduKyu's public course and specialization report (May 2026).
-- Universities covered: Amity, D.Y. Patil, Jain Online, Jamia,
--                       Lovely Professional University
-- ============================================================

-- ── Clear existing generic specializations for enriched programs ─────────────
-- We replace the generic seeds with richer, university-sourced data.
DELETE FROM program_specializations WHERE program_id IN (1,2,3,4,5,6,7);

-- ── Re-insert enriched specializations ───────────────────────────────────────

-- ── Online MBA (program_id = 1) ───────────────────────────────────────────────
-- Aggregated from: Amity (9), D.Y. Patil (15), Jain Online (12), Jamia (4), LPU (12)
INSERT INTO program_specializations (program_id, specialization, sort_order) VALUES
(1, 'General Management',                0),
(1, 'Marketing Management',              1),
(1, 'Finance Management',                2),
(1, 'Human Resource Management',         3),
(1, 'Business Analytics',                4),
(1, 'Data Science',                      5),
(1, 'Digital Marketing Management',      6),
(1, 'International Business Management', 7),
(1, 'Operations Management',             8),
(1, 'Hospital & Healthcare Management',  9),
(1, 'Information Technology',            10),
(1, 'Logistics & Supply Chain',          11),
(1, 'FinTech Management',                12),
(1, 'Blockchain Management',             13),
(1, 'Agri Business Management',          14),
(1, 'Project Management',                15),
(1, 'Digital Entrepreneurship',          16),
(1, 'Human Resource Analytics',          17),
(1, 'International Finance',             18),
(1, 'Dual Specialization',               19),
(1, 'Banking & Financial Services',      20),
(1, 'Entrepreneurship & Leadership',     21);

-- ── Online BBA (program_id = 2) ───────────────────────────────────────────────
-- Aggregated from: Amity (1), D.Y. Patil (9), Jain Online (4), Jamia (1), LPU (1)
INSERT INTO program_specializations (program_id, specialization, sort_order) VALUES
(2, 'General Management',                0),
(2, 'Marketing Management',              1),
(2, 'Finance Management',                2),
(2, 'Human Resource Management',         3),
(2, 'E-Commerce Management',             4),
(2, 'Banking, Financial Services & Insurance', 5),
(2, 'International Business Management', 6),
(2, 'IT & System Management',            7),
(2, 'Retail Management',                 8),
(2, 'Shipping & Logistics Management',   9),
(2, 'Engineering & Project Management',  10);

-- ── Data Science & AI (program_id = 3) ───────────────────────────────────────
-- Aggregated from: Amity BCA/MCA, LPU MCA/MBA, Jain MBA
INSERT INTO program_specializations (program_id, specialization, sort_order) VALUES
(3, 'Machine Learning & AI',             0),
(3, 'Data Analytics',                    1),
(3, 'Data Engineering',                  2),
(3, 'Business Analytics',                3),
(3, 'Deep Learning',                     4),
(3, 'NLP & Computer Vision',             5),
(3, 'MLOps',                             6),
(3, 'Analytics & Data Science (MBA)',    7),
(3, 'Business Intelligence & Analytics', 8);

-- ── Online BCA (program_id = 4) ───────────────────────────────────────────────
-- Aggregated from: Amity BCA (6 specializations)
INSERT INTO program_specializations (program_id, specialization, sort_order) VALUES
(4, 'Cloud Security',                    0),
(4, 'Data Analytics',                    1),
(4, 'Data Engineering',                  2),
(4, 'Financial Technology & AI',         3),
(4, 'Software Engineering',              4),
(4, 'General',                           5);

-- ── Online MCA (program_id = 5) ───────────────────────────────────────────────
-- Aggregated from: Amity MCA (4), Jain MCA (2), LPU MCA (5)
INSERT INTO program_specializations (program_id, specialization, sort_order) VALUES
(5, 'Machine Learning & Artificial Intelligence', 0),
(5, 'Blockchain Technology & Management',         1),
(5, 'Financial Technology & AI',                  2),
(5, 'ML & AI with TCS',                           3),
(5, 'Cyber Security',                             4),
(5, 'Computer Science & IT',                      5),
(5, 'Data Science',                               6),
(5, 'Full Stack Web Development',                 7),
(5, 'AR / VR',                                    8);

-- ── Online BCom (program_id = 6) ─────────────────────────────────────────────
-- Aggregated from: Amity BCom (1), Jain BCom (3), Jamia BCom (1)
INSERT INTO program_specializations (program_id, specialization, sort_order) VALUES
(6, 'General',                                    0),
(6, 'Accounting & Finance',                       1),
(6, 'Corporate Accounting (CA-Ind Benchmarked)',  2),
(6, 'International Finance & Accounting (ACCA)',  3),
(6, 'Banking & Insurance',                        4),
(6, 'Taxation',                                   5);

-- ── Online MCom (program_id = 7) ─────────────────────────────────────────────
-- Aggregated from: Amity MCom (1), Jain MCom (2)
INSERT INTO program_specializations (program_id, specialization, sort_order) VALUES
(7, 'Financial Management',                       0),
(7, 'Accounting & Finance',                       1),
(7, 'International Finance (ACCA Accredited)',    2),
(7, 'Banking',                                    3),
(7, 'International Business',                     4);

-- ── Update program university_count to reflect richer data ───────────────────
UPDATE programs SET university_count = 18 WHERE id = 1;  -- MBA
UPDATE programs SET university_count = 14 WHERE id = 2;  -- BBA
UPDATE programs SET university_count = 9  WHERE id = 3;  -- Data Science
UPDATE programs SET university_count = 12 WHERE id = 4;  -- BCA
UPDATE programs SET university_count = 11 WHERE id = 5;  -- MCA
UPDATE programs SET university_count = 16 WHERE id = 6;  -- BCom
UPDATE programs SET university_count = 13 WHERE id = 7;  -- MCom

-- ── Add Jamia as a university (not in V2 seed) ────────────────────────────────
INSERT IGNORE INTO universities
    (slug, name, short_name, city, naac_grade, hue, image_url, established, programs, fees_min, fees_max, placement, alumni, tag, active)
VALUES
    ('jamia', 'Jamia Hamdard University', 'JHU', 'New Delhi', 'A+', 170,
     'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80&auto=format&fit=crop',
     1906, 8, 40000, 120000, '₹5.8 LPA', '80K+', NULL, 1);

-- Highlights for Jamia
INSERT IGNORE INTO university_highlights (university_id, highlight, sort_order)
SELECT id, 'UGC Approved', 0 FROM universities WHERE slug = 'jamia';
INSERT IGNORE INTO university_highlights (university_id, highlight, sort_order)
SELECT id, 'Heritage University (est. 1906)', 1 FROM universities WHERE slug = 'jamia';
INSERT IGNORE INTO university_highlights (university_id, highlight, sort_order)
SELECT id, 'Affordable Fees', 2 FROM universities WHERE slug = 'jamia';
