-- ============================================================
-- EdGro Tech — Centralized Image Architecture
-- V9: Add primary_image, hero_image, thumbnail_image columns
--     Rename: name → university_name  (was added in V1 as `name`)
--             banner_image → hero_image (was added in V7 as `banner_image`)
-- ============================================================

-- Step 1: Rename `name` → `university_name`
ALTER TABLE universities
    CHANGE COLUMN `name` `university_name` VARCHAR(200) NOT NULL;

-- Step 2: Rename `image_url` → `primary_image`
ALTER TABLE universities
    CHANGE COLUMN `image_url` `primary_image` VARCHAR(500) DEFAULT NULL;

-- Step 3: Rename `banner_image` → `hero_image`
ALTER TABLE universities
    CHANGE COLUMN `banner_image` `hero_image` VARCHAR(500) DEFAULT NULL;

-- Step 4: Add `thumbnail_image` column (only if not already present)
ALTER TABLE universities
    ADD COLUMN `thumbnail_image` VARCHAR(500) DEFAULT NULL AFTER `hero_image`;
