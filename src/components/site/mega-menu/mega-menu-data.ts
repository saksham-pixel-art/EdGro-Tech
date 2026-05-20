/**
 * Mega Menu Data — EdGro Tech
 * University → Courses → Specializations (fully dynamic, JSON-driven)
 */

// ── Types ─────────────────────────────────────────────────────────────────────
export type MegaMenuSpecialization = {
  label: string;
  slug: string;
  isNew?: boolean;
  isTrending?: boolean;
};

export type MegaMenuCourse = {
  slug: string;
  label: string;
  icon: string;
  degree: "UG" | "PG" | "Cert";
  duration: string;
  feesRange: string;
  count: number;
  specializations: MegaMenuSpecialization[];
};

export type MegaMenuUniversity = {
  slug: string;
  name: string;
  short: string;
  naac: string;
  city: string;
  logo?: string;
  hue: number;
  established: number;
  placement: string;
  courses: MegaMenuCourse[];
};

export type CourseCategory = {
  slug: string;
  label: string;
  icon: string;
  description: string;
  degree: "UG" | "PG" | "Cert";
  courses: {
    name: string;
    universities: number;
    trending?: boolean;
    isNew?: boolean;
    programSlug: string;
  }[];
};

// ── Shared specialization pools ───────────────────────────────────────────────
const MBA_SPECS: MegaMenuSpecialization[] = [
  { label: "General Management",           slug: "general-management" },
  { label: "Marketing Management",         slug: "marketing-management",   isTrending: true },
  { label: "Finance Management",           slug: "finance-management" },
  { label: "Human Resource Management",    slug: "hrm" },
  { label: "Business Analytics",           slug: "business-analytics",     isTrending: true },
  { label: "Data Science",                 slug: "data-science",           isNew: true },
  { label: "Digital Marketing",            slug: "digital-marketing-mgmt", isTrending: true },
  { label: "International Business",       slug: "international-business" },
  { label: "Operations Management",        slug: "operations-management" },
  { label: "Hospital & Healthcare",        slug: "healthcare-management" },
  { label: "FinTech Management",           slug: "fintech-management",     isNew: true },
  { label: "Blockchain Management",        slug: "blockchain-management",  isNew: true },
  { label: "Banking & Financial Services", slug: "banking-financial" },
  { label: "Entrepreneurship",             slug: "entrepreneurship" },
  { label: "International Finance",        slug: "international-finance" },
  { label: "HR Analytics",                 slug: "hr-analytics",           isNew: true },
  { label: "Logistics & Supply Chain",     slug: "logistics-scm" },
  { label: "Project Management",           slug: "project-management" },
];

const BBA_SPECS: MegaMenuSpecialization[] = [
  { label: "General Management",           slug: "general-management" },
  { label: "Marketing Management",         slug: "marketing-management",   isTrending: true },
  { label: "Finance Management",           slug: "finance-management" },
  { label: "Human Resource Management",    slug: "hrm" },
  { label: "E-Commerce Management",        slug: "ecommerce-management",   isTrending: true },
  { label: "BFSI",                         slug: "bfsi" },
  { label: "International Business",       slug: "international-business" },
  { label: "IT & System Management",       slug: "it-system-management" },
  { label: "Retail Management",            slug: "retail-management" },
  { label: "Shipping & Logistics",         slug: "shipping-logistics" },
];

const MCA_SPECS: MegaMenuSpecialization[] = [
  { label: "Machine Learning & AI",        slug: "ml-ai",                  isTrending: true },
  { label: "Blockchain Technology",        slug: "blockchain",             isNew: true },
  { label: "Financial Technology & AI",    slug: "fintech-ai",             isNew: true },
  { label: "ML & AI with TCS",             slug: "ml-ai-tcs",              isTrending: true },
  { label: "Cyber Security",               slug: "cyber-security" },
  { label: "Computer Science & IT",        slug: "cs-it" },
  { label: "Data Science",                 slug: "data-science",           isTrending: true },
  { label: "Full Stack Web Dev",           slug: "full-stack",             isTrending: true },
  { label: "AR / VR",                      slug: "ar-vr",                  isNew: true },
];

const BCA_SPECS: MegaMenuSpecialization[] = [
  { label: "Cloud Security",               slug: "cloud-security",         isNew: true },
  { label: "Data Analytics",               slug: "data-analytics",         isTrending: true },
  { label: "Data Engineering",             slug: "data-engineering",       isNew: true },
  { label: "Financial Technology & AI",    slug: "fintech-ai",             isNew: true },
  { label: "Software Engineering",         slug: "software-engineering" },
  { label: "General",                      slug: "general" },
];

const MCOM_SPECS: MegaMenuSpecialization[] = [
  { label: "Financial Management",         slug: "financial-management" },
  { label: "Accounting & Finance",         slug: "accounting-finance" },
  { label: "International Finance (ACCA)", slug: "intl-finance-acca",      isTrending: true },
  { label: "Banking",                      slug: "banking" },
  { label: "International Business",       slug: "international-business" },
];

const BCOM_SPECS: MegaMenuSpecialization[] = [
  { label: "General",                      slug: "general" },
  { label: "Accounting & Finance",         slug: "accounting-finance" },
  { label: "Corporate Accounting (CA)",    slug: "corporate-accounting",   isTrending: true },
  { label: "International Finance (ACCA)", slug: "intl-finance-acca",      isTrending: true },
  { label: "Banking & Insurance",          slug: "banking-insurance" },
  { label: "Taxation",                     slug: "taxation" },
];

const DS_SPECS: MegaMenuSpecialization[] = [
  { label: "Machine Learning & AI",        slug: "ml-ai",                  isTrending: true },
  { label: "Data Analytics",               slug: "data-analytics",         isTrending: true },
  { label: "Data Engineering",             slug: "data-engineering",       isNew: true },
  { label: "Business Analytics",           slug: "business-analytics" },
  { label: "Deep Learning",                slug: "deep-learning" },
  { label: "NLP & Computer Vision",        slug: "nlp-cv",                 isNew: true },
  { label: "MLOps",                        slug: "mlops",                  isNew: true },
  { label: "Business Intelligence",        slug: "bi-analytics" },
];

const DM_SPECS: MegaMenuSpecialization[] = [
  { label: "SEO & Content Marketing",      slug: "seo-content",            isTrending: true },
  { label: "Paid Media & Performance",     slug: "paid-media" },
  { label: "Social Media Marketing",       slug: "social-media",           isTrending: true },
  { label: "Web Analytics",                slug: "web-analytics" },
  { label: "Brand Management",             slug: "brand-management" },
];

// ── University data with per-university courses ───────────────────────────────
export const MEGA_UNIVERSITIES: MegaMenuUniversity[] = [
  {
    slug: "nmims",
    name: "NMIMS University",
    short: "NMIMS",
    naac: "A+",
    city: "Mumbai",
    hue: 240,
    established: 1981,
    placement: "₹9.6 LPA",
    logo: "/universities/nmims/primary.png",
    courses: [
      { slug: "online-mba", label: "MBA", icon: "🎓", degree: "PG", duration: "2 yrs", feesRange: "₹1.96L–₹4L", count: 4, specializations: MBA_SPECS.slice(0, 8) },
      { slug: "online-bba", label: "BBA", icon: "📊", degree: "UG", duration: "3 yrs", feesRange: "₹1.31L", count: 2, specializations: BBA_SPECS.slice(0, 4) },
      { slug: "online-bcom", label: "BCom", icon: "📋", degree: "UG", duration: "3 yrs", feesRange: "₹94K", count: 1, specializations: BCOM_SPECS.slice(0, 3) },
    ],
  },
  {
    slug: "amity",
    name: "Amity University Online",
    short: "AU",
    naac: "A+",
    city: "Noida",
    hue: 38,
    established: 2005,
    placement: "₹7.8 LPA",
    logo: "/universities/amity/primary.png",
    courses: [
      { slug: "online-mba", label: "MBA", icon: "🎓", degree: "PG", duration: "2 yrs", feesRange: "₹1.99L–₹3.29L", count: 9, specializations: MBA_SPECS.slice(0, 9) },
      { slug: "online-mca", label: "MCA", icon: "💻", degree: "PG", duration: "2 yrs", feesRange: "₹1.70L–₹2.75L", count: 4, specializations: MCA_SPECS },
      { slug: "online-bca", label: "BCA", icon: "🖥️", degree: "UG", duration: "3 yrs", feesRange: "₹2.25L–₹2.50L", count: 6, specializations: BCA_SPECS },
      { slug: "online-bba", label: "BBA", icon: "📊", degree: "UG", duration: "3 yrs", feesRange: "₹1.75L", count: 1, specializations: BBA_SPECS.slice(0, 4) },
      { slug: "online-bcom", label: "BCom", icon: "📋", degree: "UG", duration: "3 yrs", feesRange: "₹1.01L", count: 1, specializations: BCOM_SPECS.slice(0, 2) },
      { slug: "online-mcom", label: "MCom", icon: "📈", degree: "PG", duration: "2 yrs", feesRange: "₹1.20L", count: 1, specializations: MCOM_SPECS },
    ],
  },
  {
    slug: "lpu",
    name: "Lovely Professional University",
    short: "LPU",
    naac: "A++",
    city: "Phagwara",
    hue: 320,
    established: 2005,
    placement: "₹8.6 LPA",
    logo: "/universities/lpu/primary.png",
    courses: [
      { slug: "online-mba", label: "MBA", icon: "🎓", degree: "PG", duration: "2 yrs", feesRange: "₹1.46L–₹2.00L", count: 12, specializations: MBA_SPECS },
      { slug: "online-mca", label: "MCA", icon: "💻", degree: "PG", duration: "2 yrs", feesRange: "₹1.08L–₹1.60L", count: 5, specializations: MCA_SPECS },
      { slug: "online-bca", label: "BCA", icon: "🖥️", degree: "UG", duration: "3 yrs", feesRange: "₹1.50L", count: 1, specializations: BCA_SPECS.slice(0, 3) },
      { slug: "online-bba", label: "BBA", icon: "📊", degree: "UG", duration: "3 yrs", feesRange: "₹1.50L", count: 1, specializations: BBA_SPECS.slice(0, 5) },
      { slug: "online-mcom", label: "MCom", icon: "📈", degree: "PG", duration: "2 yrs", feesRange: "₹1.00L", count: 1, specializations: MCOM_SPECS },
      { slug: "data-science", label: "Data Science", icon: "🤖", degree: "PG", duration: "2 yrs", feesRange: "₹1.00L", count: 3, specializations: DS_SPECS },
    ],
  },
  {
    slug: "chandigarh",
    name: "Chandigarh University",
    short: "CU",
    naac: "A+",
    city: "Mohali",
    hue: 15,
    established: 2012,
    placement: "₹9.54 LPA",
    logo: "/universities/chandigarh/primary.png",
    courses: [
      { slug: "online-mba", label: "MBA", icon: "🎓", degree: "PG", duration: "2 yrs", feesRange: "₹1.50L", count: 10, specializations: MBA_SPECS.slice(0, 10) },
      { slug: "online-mca", label: "MCA", icon: "💻", degree: "PG", duration: "2 yrs", feesRange: "₹1.20L", count: 4, specializations: MCA_SPECS.slice(0, 4) },
      { slug: "online-bca", label: "BCA", icon: "🖥️", degree: "UG", duration: "3 yrs", feesRange: "₹1.35L", count: 1, specializations: BCA_SPECS.slice(0, 3) },
      { slug: "online-bba", label: "BBA", icon: "📊", degree: "UG", duration: "3 yrs", feesRange: "₹1.50L", count: 4, specializations: BBA_SPECS.slice(0, 6) },
    ],
  },
  {
    slug: "muj",
    name: "Manipal University Jaipur",
    short: "MUJ",
    naac: "A++",
    city: "Jaipur",
    hue: 28,
    established: 2011,
    placement: "₹8.2 LPA",
    logo: "/universities/muj/primary.png",
    courses: [
      { slug: "online-mba", label: "MBA", icon: "🎓", degree: "PG", duration: "2 yrs", feesRange: "₹1.80L", count: 8, specializations: MBA_SPECS.slice(0, 8) },
      { slug: "online-mca", label: "MCA", icon: "💻", degree: "PG", duration: "2 yrs", feesRange: "₹1.58L", count: 3, specializations: MCA_SPECS.slice(0, 4) },
      { slug: "online-bca", label: "BCA", icon: "🖥️", degree: "UG", duration: "3 yrs", feesRange: "₹1.39L", count: 2, specializations: BCA_SPECS.slice(0, 3) },
      { slug: "online-bba", label: "BBA", icon: "📊", degree: "UG", duration: "3 yrs", feesRange: "₹1.39L", count: 3, specializations: BBA_SPECS.slice(0, 5) },
      { slug: "online-bcom", label: "BCom", icon: "📋", degree: "UG", duration: "3 yrs", feesRange: "₹99K", count: 1, specializations: BCOM_SPECS.slice(0, 3) },
      { slug: "online-mcom", label: "MCom", icon: "📈", degree: "PG", duration: "2 yrs", feesRange: "₹1.08L", count: 1, specializations: MCOM_SPECS.slice(0, 3) },
    ],
  },
  {
    slug: "shoolini",
    name: "Shoolini University",
    short: "SHU",
    naac: "A+",
    city: "Solan",
    hue: 110,
    established: 2009,
    placement: "₹6.6 LPA",
    logo: "/universities/shoolini/primary.png",
    courses: [
      { slug: "online-mba", label: "MBA", icon: "🎓", degree: "PG", duration: "2 yrs", feesRange: "₹1.20L–₹1.80L", count: 6, specializations: MBA_SPECS.slice(0, 6) },
      { slug: "online-mca", label: "MCA", icon: "💻", degree: "PG", duration: "2 yrs", feesRange: "₹1.20L", count: 2, specializations: MCA_SPECS.slice(0, 4) },
      { slug: "online-bca", label: "BCA", icon: "🖥️", degree: "UG", duration: "3 yrs", feesRange: "₹85.2K", count: 1, specializations: BCA_SPECS.slice(0, 3) },
      { slug: "online-bba", label: "BBA", icon: "📊", degree: "UG", duration: "3 yrs", feesRange: "₹85.2K", count: 1, specializations: BBA_SPECS.slice(0, 4) },
      { slug: "online-bcom", label: "BCom", icon: "📋", degree: "UG", duration: "3 yrs", feesRange: "₹85K", count: 1, specializations: BCOM_SPECS.slice(0, 3) },
      { slug: "data-science", label: "Data Science", icon: "🤖", degree: "PG", duration: "2 yrs", feesRange: "₹1.20L", count: 2, specializations: DS_SPECS.slice(0, 5) },
    ],
  },
  {
    slug: "dy-patil-pune",
    name: "D.Y. Patil University",
    short: "DYP",
    naac: "A++",
    city: "Pune",
    hue: 270,
    established: 2003,
    placement: "₹8.1 LPA",
    logo: "/universities/dy-patil-pune/primary.png",
    courses: [
      { slug: "online-mba", label: "MBA", icon: "🎓", degree: "PG", duration: "2 yrs", feesRange: "₹1.45L–₹2.50L", count: 15, specializations: MBA_SPECS },
      { slug: "online-bba", label: "BBA", icon: "📊", degree: "UG", duration: "3 yrs", feesRange: "₹1.45L", count: 9, specializations: BBA_SPECS },
      { slug: "online-mca", label: "MCA", icon: "💻", degree: "PG", duration: "2 yrs", feesRange: "₹1.40L", count: 2, specializations: MCA_SPECS.slice(0, 4) },
    ],
  },
  {
    slug: "smu",
    name: "Sikkim Manipal University",
    short: "SMU",
    naac: "A+",
    city: "Gangtok",
    hue: 210,
    established: 1995,
    placement: "₹6.2 LPA",
    logo: "/universities/smu/primary.png",
    courses: [
      { slug: "online-mba", label: "MBA", icon: "🎓", degree: "PG", duration: "2 yrs", feesRange: "₹1.10L", count: 5, specializations: MBA_SPECS.slice(0, 5) },
      { slug: "online-mca", label: "MCA", icon: "💻", degree: "PG", duration: "2 yrs", feesRange: "₹98K", count: 2, specializations: MCA_SPECS.slice(0, 4) },
      { slug: "online-bcom", label: "BCom", icon: "📋", degree: "UG", duration: "3 yrs", feesRange: "₹75K", count: 1, specializations: BCOM_SPECS.slice(0, 2) },
      { slug: "online-mcom", label: "MCom", icon: "📈", degree: "PG", duration: "2 yrs", feesRange: "₹75K", count: 1, specializations: MCOM_SPECS.slice(0, 3) },
    ],
  },
];

// ── Courses mega menu categories ──────────────────────────────────────────────
export const COURSE_CATEGORIES: CourseCategory[] = [
  {
    slug: "management",
    label: "Management",
    icon: "🎓",
    description: "Business & leadership degrees for career growth",
    degree: "PG",
    courses: [
      { name: "Online MBA",          universities: 18, trending: true,  programSlug: "online-mba" },
      { name: "Online BBA",          universities: 14,                  programSlug: "online-bba" },
      { name: "Executive MBA",       universities: 6,  trending: true,  programSlug: "online-mba" },
      { name: "MBA Dual Spec",       universities: 4,  isNew: true,     programSlug: "online-mba" },
    ],
  },
  {
    slug: "technology",
    label: "Technology",
    icon: "💻",
    description: "Computer science & software engineering programs",
    degree: "UG",
    courses: [
      { name: "Online MCA",          universities: 11, trending: true,  programSlug: "online-mca" },
      { name: "Online BCA",          universities: 12,                  programSlug: "online-bca" },
      { name: "MCA in ML & AI",      universities: 5,  trending: true,  programSlug: "online-mca" },
      { name: "BCA Cloud Security",  universities: 3,  isNew: true,     programSlug: "online-bca" },
    ],
  },
  {
    slug: "data-ai",
    label: "Data & AI",
    icon: "🤖",
    description: "Data science, ML, and artificial intelligence",
    degree: "PG",
    courses: [
      { name: "Data Science & AI",   universities: 9,  trending: true,  programSlug: "data-science" },
      { name: "Business Analytics",  universities: 7,  trending: true,  programSlug: "data-science" },
      { name: "ML Engineering",      universities: 5,  isNew: true,     programSlug: "data-science" },
      { name: "Data Engineering",    universities: 4,  isNew: true,     programSlug: "data-science" },
    ],
  },
  {
    slug: "commerce",
    label: "Commerce",
    icon: "📈",
    description: "Finance, accounting & commerce degrees",
    degree: "UG",
    courses: [
      { name: "Online BCom",         universities: 16,                  programSlug: "online-bcom" },
      { name: "Online MCom",         universities: 13,                  programSlug: "online-mcom" },
      { name: "BCom (ACCA)",         universities: 4,  trending: true,  programSlug: "online-bcom" },
      { name: "MCom Finance Mgmt",   universities: 5,                   programSlug: "online-mcom" },
    ],
  },
  {
    slug: "marketing",
    label: "Marketing",
    icon: "📱",
    description: "Digital marketing & brand management",
    degree: "Cert",
    courses: [
      { name: "PG Digital Marketing",universities: 7,  trending: true,  programSlug: "digital-marketing" },
      { name: "MBA Digital Marketing",universities: 8,  trending: true,  programSlug: "online-mba" },
      { name: "SEO & Content",       universities: 5,                   programSlug: "digital-marketing" },
      { name: "Performance Marketing",universities: 4, isNew: true,     programSlug: "digital-marketing" },
    ],
  },
  {
    slug: "finance",
    label: "Finance",
    icon: "💰",
    description: "Banking, fintech & financial management",
    degree: "PG",
    courses: [
      { name: "MBA Finance",         universities: 14,                  programSlug: "online-mba" },
      { name: "MBA FinTech",         universities: 6,  isNew: true,     programSlug: "online-mba" },
      { name: "MBA International Finance", universities: 5, trending: true, programSlug: "online-mba" },
      { name: "MCom Financial Mgmt", universities: 8,                   programSlug: "online-mcom" },
    ],
  },
];

// ── Flat course list (for backwards compat) ───────────────────────────────────
export const MEGA_COURSES = [
  { slug: "online-mba",        label: "MBA",              icon: "🎓", count: 22 },
  { slug: "online-bba",        label: "BBA",              icon: "📊", count: 11 },
  { slug: "online-mca",        label: "MCA",              icon: "💻", count: 9  },
  { slug: "online-bca",        label: "BCA",              icon: "🖥️", count: 6  },
  { slug: "online-mcom",       label: "MCom",             icon: "📈", count: 5  },
  { slug: "online-bcom",       label: "BCom",             icon: "📋", count: 6  },
  { slug: "data-science",      label: "Data Science",     icon: "🤖", count: 9  },
  { slug: "digital-marketing", label: "Digital Marketing",icon: "📱", count: 5  },
];
