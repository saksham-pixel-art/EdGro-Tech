-- ============================================================
-- EdGro Tech — V12: Remove Universities
-- Removes Jain University Online and Jamia Hamdard University
-- ============================================================

DELETE FROM universities WHERE slug IN ('jain-online', 'jamia');
