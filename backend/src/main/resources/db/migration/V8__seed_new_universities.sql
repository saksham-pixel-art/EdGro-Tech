-- ============================================================
-- EdGro Tech — Scalable University Ecosystem
-- V8: Seed newly added universities
-- ============================================================

INSERT IGNORE INTO universities (slug, name, short_name, city, naac_grade, hue, active, programs, fees_min, fees_max) VALUES
('andhra-university', 'Andhra University', 'AU', 'Visakhapatnam', 'A', 210, 1, 10, 50000, 200000),
('chandigarh-university', 'Chandigarh University', 'CU', 'Chandigarh', 'A+', 15, 1, 20, 100000, 500000),
('dy-patil-mumbai', 'DY Patil University Mumbai', 'DY Patil', 'Mumbai', 'A', 0, 1, 15, 150000, 600000),
('galgotias-university', 'Galgotias University', 'GU', 'Greater Noida', 'A+', 45, 1, 18, 120000, 450000),
('gla-university', 'GLA University', 'GLA', 'Mathura', 'A+', 30, 1, 12, 110000, 400000),
('kurukshetra-university', 'Kurukshetra University', 'KUK', 'Kurukshetra', 'A+', 230, 1, 14, 60000, 250000),
('mahe', 'Manipal Academy of Higher Education', 'MAHE', 'Manipal', 'A++', 10, 1, 25, 200000, 800000),
('op-jindal-university', 'OP Jindal Global University', 'JGU', 'Sonipat', 'A', 60, 1, 10, 300000, 1200000),
('parul-university', 'Parul University', 'PU', 'Vadodara', 'A++', 340, 1, 22, 100000, 500000);

-- Note: We can expand courses, specializations, faqs and university_stats 
-- using the new tables added in V7.
