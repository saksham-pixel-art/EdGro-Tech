-- ============================================================
-- EdGro Tech — Seed Data (migrated from frontend edgro-data.ts)
-- ============================================================

-- ── Universities ─────────────────────────────────────────────
INSERT INTO universities (slug, name, short_name, city, naac_grade, hue, image_url, established, programs, fees_min, fees_max, placement, alumni, tag) VALUES
('amity',        'Amity University',              'AU',   'Noida',          'A+',  38,  'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80&auto=format&fit=crop', 2005, 24, 140000, 240000, '₹7.8 LPA', '180K+', 'Popular'),
('andhra',       'Andhra University',             'AU',   'Visakhapatnam',  'A+',  200, 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80&auto=format&fit=crop', 1926, 18, 55000,  120000, '₹6.4 LPA', '200K+', 'Best ROI'),
('chandigarh',   'Chandigarh University',         'CU',   'Chandigarh',     'A+',  14,  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80&auto=format&fit=crop', 2012, 22, 120000, 200000, '₹7.2 LPA', '120K+', NULL),
('dy-patil-mumbai','DY Patil University Mumbai',  'DYP',  'Mumbai',         'A++', 350, 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80&auto=format&fit=crop', 2002, 16, 160000, 260000, '₹8.4 LPA', '85K+',  'Premium'),
('dy-patil-pune','DY Patil University Pune',      'DYP',  'Pune',           'A++', 270, 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80&auto=format&fit=crop', 2003, 19, 150000, 250000, '₹8.1 LPA', '95K+',  NULL),
('galgotias',    'Galgotias University',          'GU',   'Greater Noida',  'A+',  160, 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=800&q=80&auto=format&fit=crop', 2011, 20, 110000, 190000, '₹7.0 LPA', '60K+',  NULL),
('gla',          'GLA University',                'GLA',  'Mathura',        'A+',  50,  'https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=800&q=80&auto=format&fit=crop', 2010, 17, 85000,  160000, '₹6.8 LPA', '55K+',  NULL),
('jain-online',  'Jain University Online',        'JU',   'Bengaluru',      'A++', 220, 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&q=80&auto=format&fit=crop', 1990, 21, 95000,  180000, '₹7.6 LPA', '150K+', NULL),
('kurukshetra',  'Kurukshetra University',        'KU',   'Kurukshetra',    'A+',  90,  'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&q=80&auto=format&fit=crop', 1956, 14, 40000,  95000,  '₹5.8 LPA', '300K+', 'Best ROI'),
('lpu',          'Lovely Professional University','LPU',  'Phagwara',       'A++', 320, 'https://images.unsplash.com/photo-1583373834259-46cc92173cb7?w=800&q=80&auto=format&fit=crop', 2005, 25, 140000, 230000, '₹8.6 LPA', '300K+', NULL),
('mahe',         'MAHE Manipal',                  'MAHE', 'Manipal',        'A++', 180, 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80&auto=format&fit=crop', 1953, 23, 180000, 300000, '₹9.2 LPA', '250K+', 'Premium'),
('muj',          'Manipal University Jaipur',     'MUJ',  'Jaipur',         'A+',  28,  'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80&auto=format&fit=crop', 2011, 20, 150000, 220000, '₹8.2 LPA', '60K+',  'Recommended'),
('nmims',        'NMIMS University',              'NM',   'Mumbai',         'A++', 240, 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80&auto=format&fit=crop', 1981, 18, 200000, 320000, '₹9.6 LPA', '120K+', 'Premium'),
('opjindal',     'OP Jindal University',          'OPJ',  'Sonipat',        'A+',  12,  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80&auto=format&fit=crop', 2009, 15, 180000, 280000, '₹8.8 LPA', '40K+',  NULL),
('parul',        'Parul University',              'PU',   'Vadodara',       'A++', 140, 'https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=800&q=80&auto=format&fit=crop', 2009, 22, 95000,  170000, '₹7.0 LPA', '75K+',  NULL),
('sharda',       'Sharda University',             'SU',   'Greater Noida',  'A+',  300, 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=800&q=80&auto=format&fit=crop', 2009, 20, 120000, 200000, '₹7.4 LPA', '70K+',  NULL),
('shoolini',     'Shoolini University',           'SHU',  'Solan',          'A+',  110, 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&q=80&auto=format&fit=crop', 2009, 13, 100000, 180000, '₹6.6 LPA', '30K+',  NULL),
('smu',          'Sikkim Manipal University',     'SMU',  'Gangtok',        'A+',  210, 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&q=80&auto=format&fit=crop', 1995, 16, 70000,  140000, '₹6.2 LPA', '180K+', NULL),
('upes',         'UPES University',               'UPES', 'Dehradun',       'A',   20,  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80&auto=format&fit=crop', 2003, 17, 160000, 240000, '₹8.0 LPA', '55K+',  NULL),
('uttaranchal',  'Uttaranchal University',        'UU',   'Dehradun',       'A+',  60,  'https://images.unsplash.com/photo-1583373834259-46cc92173cb7?w=800&q=80&auto=format&fit=crop', 2013, 14, 70000,  140000, '₹6.4 LPA', '35K+',  NULL),
('vgu',          'Vivekananda Global University', 'VGU',  'Jaipur',         'A+',  280, 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80&auto=format&fit=crop', 2012, 15, 85000,  160000, '₹6.8 LPA', '30K+',  NULL);

-- ── University Highlights ─────────────────────────────────────
INSERT INTO university_highlights (university_id, highlight, sort_order) VALUES
(1,'WES Accepted',0),(1,'EQUIS Member',1),(1,'Global Tie-ups',2),
(2,'Century-old legacy',0),(2,'UGC-DEB',1),(2,'Affordable',2),
(3,'QS Ranked',0),(3,'AICTE',1),(3,'Industry Mentors',2),
(4,'NAAC A++',0),(4,'Mumbai Hub',1),(4,'Premium Faculty',2),
(5,'NAAC A++',0),(5,'Pune IT Belt',1),(5,'Top Recruiters',2),
(6,'NCR Location',0),(6,'Industry Labs',1),(6,'Live Projects',2),
(7,'AICTE',0),(7,'Tech Focus',1),(7,'Affordable',2),
(8,'NAAC A++',0),(8,'Bengaluru Tech',1),(8,'Startup Cell',2),
(9,'State-Recognized',0),(9,'Most Affordable',1),(9,'Heritage',2),
(10,'NAAC A++',0),(10,'Largest Campus',1),(10,'Global Alumni',2),
(11,'Institute of Eminence',0),(11,'QS Top 1000',1),(11,'Premium',2),
(12,'Manipal Brand',0),(12,'Modern Campus',1),(12,'Industry Tie-ups',2),
(13,'NAAC A++',0),(13,'Top B-school',1),(13,'Mumbai HQ',2),
(14,'Research-led',0),(14,'Global Faculty',1),(14,'Liberal Arts',2),
(15,'NAAC A++',0),(15,'Multi-disciplinary',1),(15,'Healthcare',2),
(16,'International Students',0),(16,'AICTE',1),(16,'NCR',2),
(17,'#1 Pvt Research',0),(17,'Patents Focus',1),(17,'Hill Campus',2),
(18,'Manipal Group',0),(18,'UGC-DEB',1),(18,'Working Pros',2),
(19,'Energy Specialization',0),(19,'QS Ranked',1),(19,'Industry',2),
(20,'Affordable',0),(20,'Hill Campus',1),(20,'Law Focus',2),
(21,'Tech-focused',0),(21,'Affordable',1),(21,'Modern Campus',2);

-- ── Programs ─────────────────────────────────────────────────
INSERT INTO programs (slug, name, category, tag, description, fees_min, fees_max, duration, university_count, eligibility) VALUES
('online-mba',       'Online MBA',            'Postgraduate',   'Most Popular',  'Industry-aligned MBA with 12+ specializations, live mentors, and capstone projects designed for working professionals.', 85000,  240000, '24 months',   18, 'Bachelor''s degree, 50%+'),
('online-bba',       'Online BBA',            'Undergraduate',  'Career Starter','UGC-approved bachelor''s degree built for 12th pass-outs and early career professionals to build management foundations.', 55000,  160000, '36 months',   14, '12th pass, any stream'),
('data-science',     'Data Science & AI',     'Postgraduate',   'High ROI',      'PG programs co-designed with industry. Python, ML, deep learning, and end-to-end project portfolio.',                    95000,  280000, '12–24 months', 9, 'Graduate, basic math'),
('online-bca',       'Online BCA',            'Undergraduate',  'Tech Path',     'Bachelor of Computer Applications — programming foundations, web/app dev, databases, and software engineering.',          45000,  140000, '36 months',   12, '12th with Math/CS'),
('online-mca',       'Online MCA',            'Postgraduate',   'Tech Pro',      'Master of Computer Applications — advanced software architecture, cloud, distributed systems, and AI.',                   95000,  200000, '24 months',   11, 'BCA/B.Sc(IT) or BE'),
('online-bcom',      'Online BCom',           'Undergraduate',  'Foundation',    'Commerce degree covering accounting, finance, taxation, and business law — flexible, online, UGC-approved.',               35000,  95000,  '36 months',   16, '12th pass'),
('online-mcom',      'Online MCom',           'Postgraduate',   'Specialize',    'Master of Commerce for advanced finance, accounting, and economics expertise. Pairs well with CA / CS.',                  45000,  120000, '24 months',   13, 'BCom or equivalent'),
('digital-marketing','PG Digital Marketing',  'Certification',  'Trending',      'Hands-on certification in SEO, performance marketing, social, content, and analytics with live campaign work.',            65000,  140000, '11 months',    7, 'Graduate');

-- ── Program Outcomes ─────────────────────────────────────────
INSERT INTO program_outcomes (program_id, outcome, sort_order) VALUES
(1,'Manager / Sr. Manager roles',0),(1,'Avg ₹8.4 LPA placement',1),(1,'Cross-functional skills',2),
(2,'Entry-level management',0),(2,'Pathway to MBA',1),(2,'Industry exposure',2),
(3,'Data Scientist roles',0),(3,'Avg ₹12 LPA placement',1),(3,'Portfolio of 6 projects',2),
(4,'Software Developer entry',0),(4,'Pathway to MCA/MS',1),(4,'Tech career launchpad',2),
(5,'Sr. Developer roles',0),(5,'Avg ₹9 LPA placement',1),(5,'Tech leadership prep',2),
(6,'Accounting roles',0),(6,'CA/CS pathway',1),(6,'Banking entry',2),
(7,'Sr. Accountant',0),(7,'Finance Analyst',1),(7,'Academic pathway',2),
(8,'Digital Marketing Mgr',0),(8,'Avg ₹7 LPA placement',1),(8,'Agency-ready portfolio',2);

-- ── Program Specializations ──────────────────────────────────
INSERT INTO program_specializations (program_id, specialization, sort_order) VALUES
(1,'Marketing',0),(1,'Finance',1),(1,'HR',2),(1,'Operations',3),(1,'Business Analytics',4),(1,'IT',5),(1,'International Business',6),(1,'Healthcare',7),
(2,'General Mgmt',0),(2,'Marketing',1),(2,'Finance',2),(2,'Digital Business',3),
(3,'Machine Learning',0),(3,'Deep Learning',1),(3,'NLP',2),(3,'Computer Vision',3),(3,'MLOps',4),
(4,'Full Stack',0),(4,'Cloud Computing',1),(4,'Cyber Security',2),(4,'AI Foundations',3),
(5,'Cloud',0),(5,'Cyber Security',1),(5,'Data Analytics',2),(5,'Full Stack',3),
(6,'Accounting',0),(6,'Banking & Insurance',1),(6,'Taxation',2),(6,'Finance',3),
(7,'Finance',0),(7,'Accounting',1),(7,'Banking',2),(7,'International Business',3),
(8,'SEO',0),(8,'Paid Media',1),(8,'Content',2),(8,'Analytics',3),(8,'Social Media',4);

-- ── Testimonials ─────────────────────────────────────────────
INSERT INTO testimonials (name, role, university, program, content, rating, active, sort_order) VALUES
('Priya Sharma',   'Marketing Manager at Infosys',    'NMIMS University',          'Online MBA',        'EdGro made the entire admission process seamless. I got into NMIMS with a scholarship I didn''t even know I was eligible for. My salary jumped from ₹4.2L to ₹9.8L within 18 months of completing my MBA.', 5, 1, 0),
('Rahul Verma',    'Data Scientist at Flipkart',       'MAHE Manipal',              'Data Science & AI', 'The AI counselor helped me shortlist the right program in minutes. MAHE''s Data Science curriculum was exactly what I needed. Placed at Flipkart at ₹14 LPA — best decision of my career.', 5, 1, 1),
('Ananya Patel',   'Finance Analyst at HDFC Bank',     'Chandigarh University',     'Online MBA',        'I was skeptical about online degrees but EdGro''s counselor walked me through every detail — accreditation, placement records, alumni network. CU''s MBA gave me the credibility I needed.', 5, 1, 2);

-- ── Default Admin User (password: Admin@123 — CHANGE IN PRODUCTION) ──────────
-- BCrypt hash of 'Admin@123'
INSERT INTO admin_users (email, password_hash, full_name, role) VALUES
('admin@edgrotech.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMqJqhN3uXWndYmhGnBIbHqnGi', 'EdGro Admin', 'SUPER_ADMIN');
