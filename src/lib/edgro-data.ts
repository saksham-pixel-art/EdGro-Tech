export type University = {
  slug: string;
  name: string;
  /** @deprecated Use API UniversityDto.shortName instead */
  short: string;
  city: string;
  /** @deprecated Use API UniversityDto.naacGrade instead */
  naac: string;
  hue: number;
  /** @deprecated Use API UniversityDto.primaryImage instead */
  image?: string;
  logo?: string;
  established: number;
  programs: number;
  feesRange: string;
  placement: string;
  alumni: string;
  highlights: string[];
  accreditations: string[];
  placementPartners: number;
  placementCompanies?: string[];
  courses: UniversityCourse[];
  tag?: "Recommended" | "Premium" | "Popular" | "Best ROI";
};

export type UniversityCourse = {
  name: string;
  type: "UG" | "PG";
  duration: string;
  fee: string;
};

export const UNIVERSITIES: University[] = [
  {
    slug: "amity",
    name: "Amity University Online",
    short: "AU",
    city: "Noida",
    naac: "A+",
    hue: 38,
    image: "/universities/amity/primary.png",

    established: 2005,
    programs: 8,
    feesRange: "₹1.01L – ₹2.75L",
    placement: "₹7.8 LPA",
    alumni: "180K+",

    accreditations: ["NAAC", "WES", "QS WUR", "NIRF", "AICTE", "AIU", "UGC"],
    placementPartners: 13,
    placementCompanies: ["Apple", "TCS", "Siemens", "HCLTech", "Amazon", "Unilever", "Accenture", "Google", "Grant Thornton", "KPMG", "Wipro", "Barclays", "Cisco"],
    highlights: ["WES Accepted (US & Canada)", "Online MBA #1 in India", "300+ Hiring Partners"],
    tag: "Popular",
    courses: [
      { name: "Master of Business Administration", type: "PG", duration: "2 years", fee: "₹2,07,000" },
      { name: "Master of Computer Applications", type: "PG", duration: "2 years", fee: "₹1,83,080" },
      { name: "Bachelor of Commerce", type: "UG", duration: "3 years", fee: "₹1,01,200" },
      { name: "Bachelor of Business Administration", type: "UG", duration: "3 years", fee: "₹1,75,120" },
      { name: "Master of Science", type: "PG", duration: "2 years", fee: "₹2,75,000" },
      { name: "Bachelor of Computer Applications", type: "UG", duration: "3 years", fee: "₹1,54,000" },
      { name: "Master of Arts", type: "PG", duration: "2 years", fee: "₹1,50,000" },
      { name: "Master of Commerce", type: "PG", duration: "2 years", fee: "₹1,50,000" },
    ],
  },
  {
    slug: "dy-patil-pune",
    name: "D.Y. Patil University",
    short: "DYP",
    city: "Pune",
    naac: "A++",
    hue: 270,
    image: "/universities/dy-patil-pune/primary.png",

    established: 2003,
    programs: 4,
    feesRange: "₹1.40L – ₹2.50L",
    placement: "₹4.76 LPA avg · ₹10.5 LPA max",
    alumni: "95K+",

    accreditations: ["NAAC A++", "WES", "NIRF", "AICTE", "AIU", "UGC"],
    placementPartners: 9,
    placementCompanies: ["MRF", "Tech Mahindra", "Birlasoft", "WeVOIS", "Tata Motors", "TCS", "NoBroker", "eClerx", "EY"],
    highlights: ["NAAC A++ (3.64 score)", "NIRF Rank 41", "300+ Hiring Partners"],
    tag: "Premium",
    courses: [
      { name: "MBA (Working Professional)", type: "PG", duration: "2 years", fee: "₹2,50,000" },
      { name: "Bachelor of Business Administration", type: "UG", duration: "3 years", fee: "₹1,45,400" },
      { name: "Master of Computer Application", type: "PG", duration: "2 years", fee: "₹1,40,000" },
      { name: "Master of Business Administration", type: "PG", duration: "2 years", fee: "₹1,89,400" },
    ],
  },
  {
    slug: "lpu",
    name: "Lovely Professional University",
    short: "LPU",
    city: "Phagwara",
    naac: "A++",
    hue: 320,
    image: "/universities/lpu/primary.png",

    established: 2005,
    programs: 8,
    feesRange: "₹80K – ₹2.00L",
    placement: "₹8.6 LPA",
    alumni: "300K+",

    accreditations: ["NAAC A++", "WES", "NIRF", "AICTE", "AIU", "UGC"],
    placementPartners: 15,
    placementCompanies: ["DeltaX", "Solar Square", "Hero Vired", "Bajaj Finserv", "Codeyoung", "Axis Bank", "Cvent", "Scaler", "Jaro Education", "HDFC Bank", "Mindenious", "Amazon", "IntelliPaat", "Myntra", "EaseMyTrip"],
    highlights: ["NAAC A++", "Largest Campus", "AICTE Approved MBA & MCA"],
    courses: [
      { name: "Master of Business Administration", type: "PG", duration: "2 years", fee: "₹2,00,000" },
      { name: "Master of Computer Applications", type: "PG", duration: "2 years", fee: "₹1,60,000" },
      { name: "Bachelor of Computer Applications", type: "UG", duration: "3 years", fee: "₹1,50,000" },
      { name: "Bachelor of Business Administration", type: "UG", duration: "3 years", fee: "₹1,50,000" },
      { name: "Master of Commerce", type: "PG", duration: "2 years", fee: "₹1,00,000" },
      { name: "Bachelor of Arts", type: "UG", duration: "3 years", fee: "₹1,20,000" },
      { name: "Master of Science", type: "PG", duration: "2 years", fee: "₹1,00,000" },
      { name: "Master of Arts", type: "PG", duration: "2 years", fee: "₹80,000" },
    ],
  },
  {
    slug: "muj",
    name: "Manipal University Jaipur",
    short: "MUJ",
    city: "Jaipur",
    naac: "A++",
    hue: 28,
    image: "/universities/muj/primary.png",

    established: 2011,
    programs: 7,
    feesRange: "₹80K – ₹1.80L",
    placement: "₹8.2 LPA",
    alumni: "60K+",

    accreditations: ["NAAC A++", "NIRF", "UGC", "NBA", "WES", "QS-WUR"],
    placementPartners: 18,
    placementCompanies: ["IntelliPaat", "LTIMindtree", "Rippling", "Manipal Hospitals", "Medi Assist", "Lenskart", "Accenture", "TeamLease", "Sutherland", "NoBroker", "HexaHealth", "Fincare", "CarDekho", "PlanetSpark", "Equiniti", "HP", "Sukoon", "Jaro Education"],
    highlights: ["100+ Fortune 500 Recruiters", "13 Career Electives", "No-Cost EMI"],
    tag: "Recommended",
    courses: [
      { name: "Master of Business Administration", type: "PG", duration: "2 years", fee: "₹1,80,000" },
      { name: "Bachelor of Business Administration", type: "UG", duration: "3 years", fee: "₹1,39,500" },
      { name: "Master of Computer Application", type: "PG", duration: "2 years", fee: "₹1,58,000" },
      { name: "Bachelor of Computer Application", type: "UG", duration: "3 years", fee: "₹1,39,500" },
      { name: "Master of Arts", type: "PG", duration: "2 years", fee: "₹80,000" },
      { name: "Bachelor of Commerce", type: "UG", duration: "3 years", fee: "₹99,000" },
      { name: "Master of Commerce", type: "PG", duration: "2 years", fee: "₹1,08,000" },
    ],
  },
  {
    slug: "nmims",
    name: "NMIMS University Online",
    short: "NM",
    city: "Mumbai",
    naac: "A+",
    hue: 240,
    image: "/universities/nmims/primary.png",

    established: 1981,
    programs: 4,
    feesRange: "₹94K – ₹4.00L",
    placement: "₹9.6 LPA",
    alumni: "120K+",

    accreditations: ["NAAC A+", "UGC", "NIRF"],
    placementPartners: 7,
    placementCompanies: ["Milkbasket", "Zalaris India", "IndiaMart", "Bajaj Electricals", "Wockhardt", "ToneTag", "G4S"],
    highlights: ["500+ Hiring Partners", "Harvard Business Publishing Curriculum", "140+ IIM/IIT Faculty"],
    tag: "Premium",
    courses: [
      { name: "MBA (Working Professionals)", type: "PG", duration: "2 years", fee: "₹4,00,000" },
      { name: "Master of Business Administration", type: "PG", duration: "2 years", fee: "₹1,96,000" },
      { name: "Bachelor of Business Administration", type: "UG", duration: "3 years", fee: "₹1,31,000" },
      { name: "Bachelor of Commerce", type: "UG", duration: "3 years", fee: "₹94,000" },
    ],
  },
  {
    slug: "niu",
    name: "Noida International University",
    short: "NIU",
    city: "Greater Noida",
    naac: "A+",
    hue: 160,
    image: "/universities/sharda/primary.png",

    established: 2010,
    programs: 8,
    feesRange: "₹75K – ₹1.18L",
    placement: "₹6.5 LPA",
    alumni: "40K+",

    accreditations: ["NAAC A+", "UGC", "NABH", "NIRF", "QS", "NBA"],
    placementPartners: 9,
    placementCompanies: ["Flipkart", "Jio", "Paytm", "TCS", "DeltaX", "Wipro", "RTDS Technologies", "Reliance Industries", "Times of India"],
    highlights: ["75-Acre Campus", "Students from 64 Countries", "200+ Recruiters"],
    courses: [
      { name: "Master of Science", type: "PG", duration: "2 years", fee: "₹1,08,000" },
      { name: "Bachelor of Commerce", type: "UG", duration: "3 years", fee: "₹75,000" },
      { name: "Bachelor of Computer Applications", type: "UG", duration: "3 years", fee: "₹1,08,000" },
      { name: "Bachelor of Business Administration", type: "UG", duration: "3 years", fee: "₹1,08,000" },
      { name: "Master of Arts", type: "PG", duration: "2 years", fee: "₹1,08,000" },
      { name: "Master of Commerce", type: "PG", duration: "2 years", fee: "₹80,000" },
      { name: "Online MBA", type: "PG", duration: "2 years", fee: "₹1,18,000" },
      { name: "Online MCA", type: "PG", duration: "2 years", fee: "₹1,18,000" },
    ],
  },
  {
    slug: "shoolini",
    name: "Shoolini University Online",
    short: "SHU",
    city: "Solan",
    naac: "A+",
    hue: 110,
    image: "/universities/shoolini/primary.png",

    established: 2009,
    programs: 8,
    feesRange: "₹80K – ₹1.80L",
    placement: "₹6.6 LPA",
    alumni: "30K+",

    accreditations: ["NIRF", "QS WUR", "NAAC", "UGC"],
    placementPartners: 12,
    placementCompanies: ["ICICI Bank", "Ericsson", "Hindustan Unilever", "Decathlon", "LG", "Nestlé", "Zydus", "Biocon", "L&T", "Orange Business", "Cure.fit", "OneScore"],
    highlights: ["#1 Private University QS & THE 2023-24", "Pay After Placement MBA", "2000+ Hiring Partners"],
    courses: [
      { name: "Bachelor of Commerce (B.Com)", type: "UG", duration: "3 years", fee: "₹85,000" },
      { name: "Bachelor of Computer Application (BCA)", type: "UG", duration: "3 years", fee: "₹85,200" },
      { name: "Executive MBA", type: "PG", duration: "2 years", fee: "₹1,80,000" },
      { name: "Online MBA", type: "PG", duration: "2 years", fee: "₹1,20,000" },
      { name: "Master of Computer Applications", type: "PG", duration: "2 years", fee: "₹1,20,000" },
      { name: "Master of Science", type: "PG", duration: "2 years", fee: "₹1,20,000" },
      { name: "Master of Arts", type: "PG", duration: "2 years", fee: "₹80,000" },
      { name: "Bachelor of Business Administration", type: "UG", duration: "3 years", fee: "₹85,200" },
    ],
  },
  {
    slug: "smu",
    name: "Sikkim Manipal University",
    short: "SMU",
    city: "Gangtok",
    naac: "A+",
    hue: 210,
    image: "/universities/smu/primary.png",

    established: 1995,
    programs: 6,
    feesRange: "₹75K – ₹1.10L",
    placement: "₹3.56 LPA avg · ₹6 LPA max",
    alumni: "180K+",

    accreditations: ["UGC", "NIRF", "NAAC A+", "AICTE", "IIRF", "THE WEEK", "QS-WUR"],
    placementPartners: 12,
    placementCompanies: ["Goldman Sachs", "LTIMindtree", "Jaro Education", "NoBroker", "Manipal Hospitals", "Accenture", "Diageo", "PlanetSpark", "Lenskart", "Fincare", "IntelliPaat", "HP"],
    highlights: ["Manipal Group", "UGC-DEB Approved", "First PPP University in NE India"],
    tag: "Best ROI",
    courses: [
      { name: "Bachelor of Commerce (B.Com)", type: "UG", duration: "3 years", fee: "₹75,000" },
      { name: "Bachelor of Arts (BA)", type: "UG", duration: "3 years", fee: "₹75,000" },
      { name: "Master of Arts (MA)", type: "PG", duration: "2 years", fee: "₹75,000" },
      { name: "Master of Commerce (M.Com)", type: "PG", duration: "2 years", fee: "₹75,000" },
      { name: "Master of Business Administration", type: "PG", duration: "2 years", fee: "₹1,10,000" },
      { name: "Master of Computer Applications", type: "PG", duration: "2 years", fee: "₹98,000" },
    ],
  },
  {
    slug: "uttaranchal",
    name: "Uttaranchal University",
    short: "UU",
    city: "Dehradun",
    naac: "A+",
    hue: 60,
    image: "/universities/uttaranchal/primary.png",

    established: 2013,
    programs: 5,
    feesRange: "₹61.2K – ₹1.02L",
    placement: "₹6.4 LPA",
    alumni: "35K+",

    accreditations: ["UGC", "AICTE", "NAAC A+", "AIU", "WES"],
    placementPartners: 6,
    placementCompanies: ["Amazon", "Accenture", "Infosys", "TCS", "Cognizant", "Capgemini"],
    highlights: ["Affordable Fees", "IBM & ACCA Tie-ups", "24/7 LMS Access"],
    tag: "Best ROI",
    courses: [
      { name: "Online BA", type: "UG", duration: "3 years", fee: "₹61,200" },
      { name: "Online BCA", type: "UG", duration: "3 years", fee: "₹1,02,000" },
      { name: "Online MBA", type: "PG", duration: "2 years", fee: "₹98,000" },
      { name: "Online BBA", type: "UG", duration: "3 years", fee: "₹1,02,000" },
      { name: "Online MCA", type: "PG", duration: "2 years", fee: "₹96,000" },
    ],
  },
  {
    slug: "vgu",
    name: "Vivekananda Global University",
    short: "VGU",
    city: "Jaipur",
    naac: "A+",
    hue: 280,
    image: "/universities/vgu/primary.png",

    established: 2012,
    programs: 7,
    feesRange: "₹72K – ₹1.50L",
    placement: "₹4.6 LPA avg",
    alumni: "30K+",

    accreditations: ["UGC", "AICTE", "NAAC A+", "QS-WUR", "ASSOCHAM"],
    placementPartners: 7,
    placementCompanies: ["Infosys", "Amazon", "ICICI Bank", "HDFC Bank", "TCS", "Flipkart", "Deloitte"],
    highlights: ["500+ Hiring Partners", "15,000+ Students Placed", "360° Career Support"],
    courses: [
      { name: "Bachelor of Business Administration (BBA)", type: "UG", duration: "3 years", fee: "₹1,32,000" },
      { name: "Master of Arts (MA)", type: "PG", duration: "2 years", fee: "₹72,000" },
      { name: "Master of Science (M.Sc)", type: "PG", duration: "2 years", fee: "₹72,000" },
      { name: "Master of Computer Application (MCA)", type: "PG", duration: "2 years", fee: "₹1,50,000" },
      { name: "Master of Business Administration", type: "PG", duration: "2 years", fee: "₹1,50,000" },
      { name: "Bachelor of Arts (BA)", type: "UG", duration: "3 years", fee: "₹72,000" },
      { name: "Bachelor of Computer Application (BCA)", type: "UG", duration: "3 years", fee: "₹1,32,000" },
    ],
  },
];

export type Program = {
  slug: string;
  name: string;
  category: string;
  tag: string;
  desc: string;
  feesRange: string;
  duration: string;
  universities: number;
  eligibility: string;
  outcomes: string[];
  specializations: string[];
};

export const PROGRAMS: Program[] = [
  {
    slug: "online-mba",
    name: "Online MBA",
    category: "Postgraduate",
    tag: "Most Popular",
    desc: "Industry-aligned MBA with 22+ specializations, live mentors, and capstone projects designed for working professionals.",
    feesRange: "₹85K – ₹4.0L",
    duration: "24 months",
    universities: 18,
    eligibility: "Bachelor's degree, 50%+",
    outcomes: ["Manager / Sr. Manager roles", "Avg ₹8.4 LPA placement", "Cross-functional skills"],
    specializations: [
      "General Management",
      "Marketing Management",
      "Finance Management",
      "Human Resource Management",
      "Business Analytics",
      "Data Science",
      "Digital Marketing Management",
      "International Business Management",
      "Operations Management",
      "Hospital & Healthcare Management",
      "Information Technology",
      "Logistics & Supply Chain",
      "FinTech Management",
      "Blockchain Management",
      "Agri Business Management",
      "Project Management",
      "Digital Entrepreneurship",
      "Human Resource Analytics",
      "International Finance",
      "Dual Specialization",
      "Banking & Financial Services",
      "Entrepreneurship & Leadership",
    ],
  },
  {
    slug: "online-bba",
    name: "Online BBA",
    category: "Undergraduate",
    tag: "Career Starter",
    desc: "UGC-approved bachelor's degree built for 12th pass-outs and early career professionals to build management foundations.",
    feesRange: "₹55K – ₹1.6L",
    duration: "36 months",
    universities: 14,
    eligibility: "12th pass, any stream",
    outcomes: ["Entry-level management", "Pathway to MBA", "Industry exposure"],
    specializations: [
      "General Management",
      "Marketing Management",
      "Finance Management",
      "Human Resource Management",
      "E-Commerce Management",
      "Banking, Financial Services & Insurance",
      "International Business Management",
      "IT & System Management",
      "Retail Management",
      "Shipping & Logistics Management",
      "Engineering & Project Management",
    ],
  },
  {
    slug: "data-science",
    name: "Data Science & AI",
    category: "Postgraduate",
    tag: "High ROI",
    desc: "PG programs co-designed with industry. Python, ML, deep learning, and end-to-end project portfolio.",
    feesRange: "₹95K – ₹2.8L",
    duration: "12–24 months",
    universities: 9,
    eligibility: "Graduate, basic math",
    outcomes: ["Data Scientist roles", "Avg ₹12 LPA placement", "Portfolio of 6 projects"],
    specializations: [
      "Machine Learning & AI",
      "Data Analytics",
      "Data Engineering",
      "Business Analytics",
      "Deep Learning",
      "NLP & Computer Vision",
      "MLOps",
      "Analytics & Data Science (MBA)",
      "Business Intelligence & Analytics",
    ],
  },
  {
    slug: "online-bca",
    name: "Online BCA",
    category: "Undergraduate",
    tag: "Tech Path",
    desc: "Bachelor of Computer Applications — programming foundations, web/app dev, databases, and software engineering.",
    feesRange: "₹45K – ₹1.54L",
    duration: "36 months",
    universities: 12,
    eligibility: "12th with Math/CS",
    outcomes: ["Software Developer entry", "Pathway to MCA/MS", "Tech career launchpad"],
    specializations: [
      "Cloud Security",
      "Data Analytics",
      "Data Engineering",
      "Financial Technology & AI",
      "Software Engineering",
      "General",
    ],
  },
  {
    slug: "online-mca",
    name: "Online MCA",
    category: "Postgraduate",
    tag: "Tech Pro",
    desc: "Master of Computer Applications — advanced software architecture, cloud, distributed systems, and AI.",
    feesRange: "₹95K – ₹2.75L",
    duration: "24 months",
    universities: 11,
    eligibility: "BCA/B.Sc(IT) or BE",
    outcomes: ["Sr. Developer roles", "Avg ₹9 LPA placement", "Tech leadership prep"],
    specializations: [
      "Machine Learning & Artificial Intelligence",
      "Blockchain Technology & Management",
      "Financial Technology & AI",
      "ML & AI with TCS",
      "Cyber Security",
      "Computer Science & IT",
      "Data Science",
      "Full Stack Web Development",
      "AR / VR",
    ],
  },
  {
    slug: "online-bcom",
    name: "Online BCom",
    category: "Undergraduate",
    tag: "Foundation",
    desc: "Commerce degree covering accounting, finance, taxation, and business law — flexible, online, UGC-approved.",
    feesRange: "₹35K – ₹1.2L",
    duration: "36 months",
    universities: 16,
    eligibility: "12th pass",
    outcomes: ["Accounting roles", "CA/CS pathway", "Banking entry"],
    specializations: [
      "General",
      "Accounting & Finance",
      "Corporate Accounting (CA-Ind Benchmarked)",
      "International Finance & Accounting (ACCA)",
      "Banking & Insurance",
      "Taxation",
    ],
  },
  {
    slug: "online-mcom",
    name: "Online MCom",
    category: "Postgraduate",
    tag: "Specialize",
    desc: "Master of Commerce for advanced finance, accounting, and economics expertise. Pairs well with CA / CS.",
    feesRange: "₹45K – ₹1.2L",
    duration: "24 months",
    universities: 13,
    eligibility: "BCom or equivalent",
    outcomes: ["Sr. Accountant", "Finance Analyst", "Academic pathway"],
    specializations: [
      "Financial Management",
      "Accounting & Finance",
      "International Finance (ACCA Accredited)",
      "Banking",
      "International Business",
    ],
  },
  {
    slug: "digital-marketing",
    name: "PG Digital Marketing",
    category: "Certification",
    tag: "Trending",
    desc: "Hands-on certification in SEO, performance marketing, social, content, and analytics with live campaign work.",
    feesRange: "₹65K – ₹1.4L",
    duration: "11 months",
    universities: 7,
    eligibility: "Graduate",
    outcomes: ["Digital Marketing Mgr", "Avg ₹7 LPA placement", "Agency-ready portfolio"],
    specializations: ["SEO", "Paid Media", "Content", "Analytics", "Social Media"],
  },
];

// ── Program → University mapping ─────────────────────────────────────────────
// Maps each program slug to the university slugs that offer it,
// along with the exact course name and fee from the PDF.
export type ProgramUniversityEntry = {
  universitySlug: string;
  courseName: string;
  fee: string;
  duration: string;
  type: "UG" | "PG";
};

export const PROGRAM_UNIVERSITIES: Record<string, ProgramUniversityEntry[]> = {
  "online-mba": [
    { universitySlug: "amity",       courseName: "Master of Business Administration",          fee: "₹2,07,000", duration: "2 years", type: "PG" },
    { universitySlug: "dy-patil-pune", courseName: "Master of Business Administration",        fee: "₹1,89,400", duration: "2 years", type: "PG" },
    { universitySlug: "dy-patil-pune", courseName: "MBA (Working Professional)",               fee: "₹2,50,000", duration: "2 years", type: "PG" },
    { universitySlug: "lpu",         courseName: "Master of Business Administration",          fee: "₹2,00,000", duration: "2 years", type: "PG" },
    { universitySlug: "muj",         courseName: "Master of Business Administration",          fee: "₹1,80,000", duration: "2 years", type: "PG" },
    { universitySlug: "nmims",       courseName: "Master of Business Administration",          fee: "₹1,96,000", duration: "2 years", type: "PG" },
    { universitySlug: "nmims",       courseName: "MBA (Working Professionals)",                fee: "₹4,00,000", duration: "2 years", type: "PG" },
    { universitySlug: "niu",         courseName: "Online MBA",                                 fee: "₹1,18,000", duration: "2 years", type: "PG" },
    { universitySlug: "shoolini",    courseName: "Online MBA",                                 fee: "₹1,20,000", duration: "2 years", type: "PG" },
    { universitySlug: "shoolini",    courseName: "Executive MBA",                              fee: "₹1,80,000", duration: "2 years", type: "PG" },
    { universitySlug: "smu",         courseName: "Master of Business Administration",          fee: "₹1,10,000", duration: "2 years", type: "PG" },
    { universitySlug: "uttaranchal", courseName: "Online MBA",                                 fee: "₹98,000",   duration: "2 years", type: "PG" },
    { universitySlug: "vgu",         courseName: "Master of Business Administration",          fee: "₹1,50,000", duration: "2 years", type: "PG" },
  ],
  "online-bba": [
    { universitySlug: "amity",       courseName: "Bachelor of Business Administration",        fee: "₹1,75,120", duration: "3 years", type: "UG" },
    { universitySlug: "dy-patil-pune", courseName: "Bachelor of Business Administration",      fee: "₹1,45,400", duration: "3 years", type: "UG" },
    { universitySlug: "lpu",         courseName: "Bachelor of Business Administration",        fee: "₹1,50,000", duration: "3 years", type: "UG" },
    { universitySlug: "muj",         courseName: "Bachelor of Business Administration",        fee: "₹1,39,500", duration: "3 years", type: "UG" },
    { universitySlug: "nmims",       courseName: "Bachelor of Business Administration",        fee: "₹1,31,000", duration: "3 years", type: "UG" },
    { universitySlug: "niu",         courseName: "Bachelor of Business Administration",        fee: "₹1,08,000", duration: "3 years", type: "UG" },
    { universitySlug: "shoolini",    courseName: "Bachelor of Business Administration",        fee: "₹85,200",   duration: "3 years", type: "UG" },
    { universitySlug: "uttaranchal", courseName: "Online BBA",                                 fee: "₹1,02,000", duration: "3 years", type: "UG" },
    { universitySlug: "vgu",         courseName: "Bachelor of Business Administration (BBA)",  fee: "₹1,32,000", duration: "3 years", type: "UG" },
  ],
  "online-bca": [
    { universitySlug: "amity",       courseName: "Bachelor of Computer Applications",          fee: "₹1,54,000", duration: "3 years", type: "UG" },
    { universitySlug: "lpu",         courseName: "Bachelor of Computer Applications",          fee: "₹1,50,000", duration: "3 years", type: "UG" },
    { universitySlug: "muj",         courseName: "Bachelor of Computer Application",           fee: "₹1,39,500", duration: "3 years", type: "UG" },
    { universitySlug: "niu",         courseName: "Bachelor of Computer Applications",          fee: "₹1,08,000", duration: "3 years", type: "UG" },
    { universitySlug: "shoolini",    courseName: "Bachelor of Computer Application (BCA)",     fee: "₹85,200",   duration: "3 years", type: "UG" },
    { universitySlug: "uttaranchal", courseName: "Online BCA",                                 fee: "₹1,02,000", duration: "3 years", type: "UG" },
    { universitySlug: "vgu",         courseName: "Bachelor of Computer Application (BCA)",     fee: "₹1,32,000", duration: "3 years", type: "UG" },
  ],
  "online-mca": [
    { universitySlug: "amity",       courseName: "Master of Computer Applications",            fee: "₹1,83,080", duration: "2 years", type: "PG" },
    { universitySlug: "dy-patil-pune", courseName: "Master of Computer Application",           fee: "₹1,40,000", duration: "2 years", type: "PG" },
    { universitySlug: "lpu",         courseName: "Master of Computer Applications",            fee: "₹1,60,000", duration: "2 years", type: "PG" },
    { universitySlug: "muj",         courseName: "Master of Computer Application",             fee: "₹1,58,000", duration: "2 years", type: "PG" },
    { universitySlug: "niu",         courseName: "Online MCA",                                 fee: "₹1,18,000", duration: "2 years", type: "PG" },
    { universitySlug: "shoolini",    courseName: "Master of Computer Applications",            fee: "₹1,20,000", duration: "2 years", type: "PG" },
    { universitySlug: "smu",         courseName: "Master of Computer Applications",            fee: "₹98,000",   duration: "2 years", type: "PG" },
    { universitySlug: "uttaranchal", courseName: "Online MCA",                                 fee: "₹96,000",   duration: "2 years", type: "PG" },
    { universitySlug: "vgu",         courseName: "Master of Computer Application (MCA)",       fee: "₹1,50,000", duration: "2 years", type: "PG" },
  ],
  "online-bcom": [
    { universitySlug: "amity",       courseName: "Bachelor of Commerce",                       fee: "₹1,01,200", duration: "3 years", type: "UG" },
    { universitySlug: "muj",         courseName: "Bachelor of Commerce",                       fee: "₹99,000",   duration: "3 years", type: "UG" },
    { universitySlug: "nmims",       courseName: "Bachelor of Commerce",                       fee: "₹94,000",   duration: "3 years", type: "UG" },
    { universitySlug: "niu",         courseName: "Bachelor of Commerce",                       fee: "₹75,000",   duration: "3 years", type: "UG" },
    { universitySlug: "shoolini",    courseName: "Bachelor of Commerce (B.Com)",               fee: "₹85,000",   duration: "3 years", type: "UG" },
    { universitySlug: "smu",         courseName: "Bachelor of Commerce (B.Com)",               fee: "₹75,000",   duration: "3 years", type: "UG" },
  ],
  "online-mcom": [
    { universitySlug: "amity",       courseName: "Master of Commerce",                         fee: "₹1,50,000", duration: "2 years", type: "PG" },
    { universitySlug: "lpu",         courseName: "Master of Commerce",                         fee: "₹1,00,000", duration: "2 years", type: "PG" },
    { universitySlug: "muj",         courseName: "Master of Commerce",                         fee: "₹1,08,000", duration: "2 years", type: "PG" },
    { universitySlug: "niu",         courseName: "Master of Commerce",                         fee: "₹80,000",   duration: "2 years", type: "PG" },
    { universitySlug: "smu",         courseName: "Master of Commerce (M.Com)",                 fee: "₹75,000",   duration: "2 years", type: "PG" },
  ],
  "data-science": [
    { universitySlug: "lpu",         courseName: "Master of Science",                          fee: "₹1,00,000", duration: "2 years", type: "PG" },
    { universitySlug: "shoolini",    courseName: "Master of Science",                          fee: "₹1,20,000", duration: "2 years", type: "PG" },
    { universitySlug: "niu",         courseName: "Master of Science",                          fee: "₹1,08,000", duration: "2 years", type: "PG" },
    { universitySlug: "amity",       courseName: "Master of Science",                          fee: "₹2,75,000", duration: "2 years", type: "PG" },
  ],
  "digital-marketing": [
    { universitySlug: "amity",       courseName: "Master of Business Administration",          fee: "₹2,07,000", duration: "2 years", type: "PG" },
    { universitySlug: "muj",         courseName: "Master of Business Administration",          fee: "₹1,80,000", duration: "2 years", type: "PG" },
    { universitySlug: "lpu",         courseName: "Master of Business Administration",          fee: "₹2,00,000", duration: "2 years", type: "PG" },
  ],
};
