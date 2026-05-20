ALTER TABLE universities MODIFY COLUMN tag ENUM('Recommended', 'Premium', 'Popular', 'Best ROI', 'BestROI');
UPDATE universities SET tag = 'BestROI' WHERE tag = 'Best ROI';
ALTER TABLE universities MODIFY COLUMN tag ENUM('Recommended', 'Premium', 'Popular', 'BestROI');
