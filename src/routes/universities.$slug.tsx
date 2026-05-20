import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useUniversities, useUniversity } from "@/api/queries";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UNIVERSITIES, PROGRAMS, type University, type Program } from "@/lib/edgro-data";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ChatbotWidget } from "@/components/site/ChatbotWidget";
import { CounselingModal } from "@/components/site/CounselingModal";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { useCounselingModal } from "@/hooks/use-counseling-modal";
import {
  MapPin, Star, TrendingUp, Users, BookOpen, ShieldCheck,
  GraduationCap, Clock, IndianRupee, ArrowRight, Award,
  Building2, CheckCircle2, ChevronRight, Sparkles,
  FileDown, ChevronDown,
  Phone, Calendar, BadgeCheck, Layers, CreditCard, Trophy,
  Zap,
} from "lucide-react";
import { UniversityHeroBanner } from "@/components/site/UniversityHeroBanner";

import { universitiesApi } from "@/api/client";

// ── Route ─────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/universities/$slug")({
  loader: async ({ params }) => {
    // 1. Try to find in local static array first
    let uni = UNIVERSITIES.find((u) => u.slug === params.slug);
    if (uni) return uni;

    // 2. Fallback to fetching from API dynamically
    try {
      const apiUni = await universitiesApi.get(params.slug);
      if (apiUni) {
        // Map backend DTO to dynamic University shape
        const mappedUni: University = {
          slug: apiUni.slug,
          name: apiUni.name,
          short: apiUni.shortName,
          city: apiUni.city,
          naac: apiUni.naacGrade,
          hue: apiUni.hue,
          established: apiUni.established,
          programs: apiUni.programs,
          feesRange: apiUni.feesRange,
          placement: apiUni.placement,
          alumni: apiUni.alumni,
          highlights: apiUni.highlights || [],
          accreditations: [apiUni.naacGrade, "UGC", "AICTE"],
          placementPartners: 10,
          placementCompanies: ["TCS", "Infosys", "Wipro", "Cognizant"],
          courses: [
            { name: "Master of Business Administration", type: "PG", duration: "2 years", fee: apiUni.feesRange },
            { name: "Master of Computer Applications", type: "PG", duration: "2 years", fee: apiUni.feesRange },
            { name: "Bachelor of Business Administration", type: "UG", duration: "3 years", fee: apiUni.feesRange },
            { name: "Bachelor of Computer Applications", type: "UG", duration: "3 years", fee: apiUni.feesRange }
          ],
          tag: apiUni.tag as any
        };
        return mappedUni;
      }
    } catch (e) {
      console.error("Failed to fetch university details dynamically:", e);
    }

    throw notFound();
  },
  component: UniversityDetailPage,
});

// ── Helpers ───────────────────────────────────────────────────────────────────
function getCourseShortName(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("master of business") || n.includes("mba") || n.includes("executive mba")) return "MBA";
  if (n.includes("bachelor of business") || n.includes("bba")) return "BBA";
  if (n.includes("master of computer") || n.includes("mca")) return "MCA";
  if (n.includes("bachelor of computer") || n.includes("bca")) return "BCA";
  if (n.includes("master of commerce") || n.includes("mcom") || n.includes("m.com")) return "MCom";
  if (n.includes("bachelor of commerce") || n.includes("bcom") || n.includes("b.com")) return "BCom";
  if (n.includes("master of science") || n.includes("m.sc") || n.includes("msc")) return "MSc";
  if (n.includes("master of arts") || n.includes("m.a")) return "MA";
  if (n.includes("bachelor of arts") || n.includes("b.a")) return "BA";
  if (n.includes("data science")) return "Data Science";
  if (n.includes("digital marketing")) return "Digital Marketing";
  return name.split(" ").slice(0, 2).join(" ");
}

const COURSE_ICONS: Record<string, string> = {
  MBA: "🎓", BBA: "📊", MCA: "💻", BCA: "🖥️",
  MCom: "📈", BCom: "📋", MSc: "🔬", MA: "📚",
  BA: "🎨", "Data Science": "🤖", "Digital Marketing": "📱",
};

function hueGrad(hue: number) {
  return `linear-gradient(135deg, hsl(${hue},55%,38%), hsl(${hue + 25},45%,24%))`;
}

function getUniSpecializations(uni: University, programs: Program[]) {
  const results: { programName: string; programSlug: string; specs: string[]; outcomes: string[]; feesRange: string; duration: string }[] = [];
  const seen = new Set<string>();
  for (const prog of programs) {
    const hasMatch = uni.courses.some((c) => {
      const short = getCourseShortName(c.name);
      return (
        prog.name.toLowerCase().includes(short.toLowerCase()) ||
        short.toLowerCase().includes((prog.name.split(" ")[1] ?? "").toLowerCase())
      );
    });
    if (hasMatch && prog.specializations.length > 0 && !seen.has(prog.slug)) {
      seen.add(prog.slug);
      results.push({
        programName: prog.name,
        programSlug: prog.slug,
        specs: prog.specializations,
        outcomes: prog.outcomes,
        feesRange: prog.feesRange,
        duration: prog.duration,
      });
    }
  }
  return results;
}

// Career outcomes data per program type
const CAREER_OUTCOMES: Record<string, { role: string; salary: string; icon: string }[]> = {
  MBA: [
    { role: "Business Analyst", salary: "₹8–14 LPA", icon: "📊" },
    { role: "Marketing Manager", salary: "₹7–12 LPA", icon: "📣" },
    { role: "Finance Manager", salary: "₹9–16 LPA", icon: "💰" },
    { role: "HR Manager", salary: "₹6–11 LPA", icon: "👥" },
    { role: "Operations Manager", salary: "₹8–13 LPA", icon: "⚙️" },
    { role: "Product Manager", salary: "₹12–22 LPA", icon: "🚀" },
  ],
  MCA: [
    { role: "Software Engineer", salary: "₹7–15 LPA", icon: "💻" },
    { role: "Full Stack Developer", salary: "₹8–18 LPA", icon: "🌐" },
    { role: "Data Engineer", salary: "₹9–16 LPA", icon: "🔧" },
    { role: "Cloud Architect", salary: "₹14–25 LPA", icon: "☁️" },
    { role: "AI/ML Engineer", salary: "₹12–22 LPA", icon: "🤖" },
    { role: "DevOps Engineer", salary: "₹10–20 LPA", icon: "🔄" },
  ],
  BCA: [
    { role: "Junior Developer", salary: "₹3–6 LPA", icon: "💻" },
    { role: "Web Developer", salary: "₹4–8 LPA", icon: "🌐" },
    { role: "IT Support", salary: "₹3–5 LPA", icon: "🛠️" },
    { role: "QA Tester", salary: "₹3–6 LPA", icon: "✅" },
    { role: "Database Admin", salary: "₹4–7 LPA", icon: "🗄️" },
    { role: "Network Engineer", salary: "₹4–8 LPA", icon: "🔗" },
  ],
  BBA: [
    { role: "Management Trainee", salary: "₹3–6 LPA", icon: "📋" },
    { role: "Sales Executive", salary: "₹3–7 LPA", icon: "📈" },
    { role: "HR Executive", salary: "₹3–5 LPA", icon: "👥" },
    { role: "Marketing Executive", salary: "₹3–6 LPA", icon: "📣" },
    { role: "Business Dev Exec", salary: "₹4–8 LPA", icon: "🤝" },
    { role: "Operations Exec", salary: "₹3–6 LPA", icon: "⚙️" },
  ],
};

function getCareerOutcomes(uni: University) {
  for (const course of uni.courses) {
    const short = getCourseShortName(course.name);
    if (CAREER_OUTCOMES[short]) return { program: short, outcomes: CAREER_OUTCOMES[short] };
  }
  return { program: "MBA", outcomes: CAREER_OUTCOMES["MBA"] };
}

const ADMISSION_STEPS = [
  { icon: Sparkles,     title: "Free Counseling",        desc: "Talk to our expert advisor", time: "Day 1" },
  { icon: FileDown,     title: "Application",            desc: "Fill & submit online form",  time: "Day 2–3" },
  { icon: ShieldCheck,  title: "Document Verification",  desc: "Upload required documents",  time: "Day 3–5" },
  { icon: IndianRupee,  title: "Fee Payment",            desc: "Secure online payment",      time: "Day 5–7" },
  { icon: CheckCircle2, title: "Admission Confirmed",    desc: "Get your offer letter",      time: "Day 7–10" },
];

// EMI breakdown helper
function getEmiOptions(feeStr: string) {
  const match = feeStr.match(/[\d,]+/g);
  if (!match) return [];
  const fees = match.map((s) => parseInt(s.replace(/,/g, ""), 10)).filter(Boolean);
  const minFee = Math.min(...fees);
  const maxFee = Math.max(...fees);
  const avg = Math.round((minFee + maxFee) / 2);
  return [
    { months: 6,  emi: Math.round(avg / 6),  label: "6 months" },
    { months: 12, emi: Math.round(avg / 12), label: "12 months" },
    { months: 24, emi: Math.round(avg / 24), label: "24 months" },
  ];
}

function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

// ── Sub-components ────────────────────────────────────────────────────────────

/** Animated stat card */
function StatCard({
  icon: Icon,
  label,
  value,
  valueClass = "text-foreground",
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  valueClass?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-border bg-card p-5 hover:border-gold/40 transition-all duration-300 group"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="h-8 w-8 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
          <Icon className="h-4 w-4 text-gold" />
        </div>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</span>
      </div>
      <div className={`font-display text-xl font-semibold leading-tight ${valueClass}`}>{value}</div>
    </motion.div>
  );
}

/** Sticky counseling sidebar */
function CounselingSidebar({ uni, onOpen }: { uni: University; onOpen: () => void }) {
  return (
    <div className="rounded-2xl border border-gold/20 bg-card overflow-hidden shadow-[var(--shadow-card)]">
      {/* Header */}
      <div
        className="px-5 py-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a1208 0%, #0F1113 100%)" }}
      >
        <div className="absolute inset-0 bg-aurora opacity-60" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-medium">Limited Seats</span>
          </div>
          <h3 className="font-display text-lg text-white leading-tight">
            Get Free Admission Counseling
          </h3>
          <p className="text-xs text-white/50 mt-1">Expert guidance · No spam · 24hr response</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-3">
        <Button variant="premium" size="lg" className="w-full text-sm" onClick={onOpen}>
          <Sparkles className="h-4 w-4 mr-2" />
          Book Free Counseling
        </Button>
        <Button variant="outlineGold" size="lg" className="w-full text-sm" onClick={onOpen}>
          <Phone className="h-4 w-4 mr-2" />
          Request a Callback
        </Button>

        {/* Quick info */}
        <div className="pt-2 space-y-2.5 border-t border-border">
          {[
            { icon: Calendar, text: "Admissions open for 2025–26" },
            { icon: ShieldCheck, text: "UGC-DEB approved programs" },
            { icon: BadgeCheck, text: `NAAC ${uni.naac} accredited` },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 text-xs text-muted-foreground">
              <Icon className="h-3.5 w-3.5 text-gold shrink-0" />
              {text}
            </div>
          ))}
        </div>

        {/* Trust */}
        <div className="pt-2 border-t border-border text-center">
          <p className="text-[10px] text-muted-foreground">Trusted by <strong className="text-foreground">12,400+</strong> students</p>
        </div>
      </div>
    </div>
  );
}

/** Course type pill */
function CourseTypePill({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
        active
          ? "bg-gold/15 border border-gold/40 text-gold"
          : "bg-card border border-border text-muted-foreground hover:border-gold/20 hover:text-foreground"
      }`}
    >
      <span className="text-base">{icon}</span>
      <span className="flex-1">{label}</span>
      {active && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
    </button>
  );
}

/** Specialization expandable card */
function SpecCard({
  spec,
  expanded,
  onToggle,
}: {
  spec: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      className={`rounded-xl border transition-all duration-200 overflow-hidden cursor-pointer ${
        expanded
          ? "border-gold/40 bg-gold/5"
          : "border-border bg-card hover:border-gold/20"
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium">{spec}</span>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-4 pb-4 pt-1 border-t border-gold/10">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Specialization in <strong className="text-foreground">{spec}</strong> equips you with
                industry-relevant skills, live projects, and mentorship from domain experts.
                Graduates are placed in top companies across India and globally.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {["Live Projects", "Industry Mentors", "Placement Support", "Certification"].map((tag) => (
                  <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-gold/10 text-gold border border-gold/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-14 lg:py-20 ${className}`}>
      {children}
    </section>
  );
}

function SectionHeading({ label, title, sub }: { label: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-px w-8 bg-gold/60" />
        <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-medium">{label}</span>
      </div>
      <h2 className="font-display text-3xl lg:text-4xl leading-tight">{title}</h2>
      {sub && <p className="text-muted-foreground mt-2 max-w-xl">{sub}</p>}
    </div>
  );
}

// ── Section Components ────────────────────────────────────────────────────────


function CourseExplorer({
  uni,
  allCourseShorts,
  activeCourse,
  setActiveCourse,
  activeProgSpec,
  expandedSpec,
  setExpandedSpec,
}: {
  uni: University;
  allCourseShorts: string[];
  activeCourse: string;
  setActiveCourse: (c: string) => void;
  activeProgSpec: { programName: string; programSlug: string; specs: string[]; outcomes: string[]; feesRange: string; duration: string } | undefined;
  expandedSpec: string | null;
  setExpandedSpec: (s: string | null) => void;
}) {
  // Get course details for active course
  const activeCourseData = uni.courses.filter(
    (c) => getCourseShortName(c.name) === activeCourse
  );

  return (
    <div className="grid lg:grid-cols-[220px_1fr] gap-6">
      {/* Left: course type pills */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-3">
          Program Type
        </p>
        {allCourseShorts.map((short) => (
          <CourseTypePill
            key={short}
            label={short}
            icon={COURSE_ICONS[short] ?? "📚"}
            active={activeCourse === short}
            onClick={() => setActiveCourse(short)}
          />
        ))}
      </div>

      {/* Right: specialization cards */}
      <div>
        {/* Course header */}
        <div className="rounded-2xl border border-border bg-card p-5 mb-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{COURSE_ICONS[activeCourse] ?? "📚"}</span>
                <h3 className="font-display text-xl">{activeCourse}</h3>
              </div>
              {activeCourseData[0] && (
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-gold" />
                    {activeCourseData[0].duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <IndianRupee className="h-3.5 w-3.5 text-gold" />
                    {activeCourseData[0].fee}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-gold" />
                    {activeCourseData[0].type === "PG" ? "Postgraduate" : "Undergraduate"}
                  </span>
                </div>
              )}
            </div>
            {activeProgSpec && (
              <span className="text-xs px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold">
                {activeProgSpec.specs.length} Specializations
              </span>
            )}
          </div>
        </div>

        {/* Specializations */}
        {activeProgSpec && activeProgSpec.specs.length > 0 ? (
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">
              Available Specializations — click to expand
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {activeProgSpec.specs.map((spec) => (
                <SpecCard
                  key={spec}
                  spec={spec}
                  expanded={expandedSpec === spec}
                  onToggle={() => setExpandedSpec(expandedSpec === spec ? null : spec)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground text-sm">
            Specialization details coming soon. Contact our counselor for more info.
          </div>
        )}
      </div>
    </div>
  );
}

function CareerOutcomesSection({
  outcomes,
  placement,
}: {
  outcomes: { role: string; salary: string; icon: string }[];
  placement: string;
}) {
  return (
    <div>
      {/* Placement highlight */}
      <div
        className="rounded-2xl p-5 mb-8 flex items-center gap-4 border border-gold/20"
        style={{ background: "linear-gradient(135deg, rgba(198,144,77,0.08) 0%, rgba(198,144,77,0.03) 100%)" }}
      >
        <div className="h-12 w-12 rounded-xl bg-gold/15 flex items-center justify-center shrink-0">
          <Trophy className="h-6 w-6 text-gold" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Average Placement Package</p>
          <p className="font-display text-2xl text-gradient-gold mt-0.5">{placement}</p>
        </div>
      </div>

      {/* Job roles grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {outcomes.map((item, i) => (
          <motion.div
            key={item.role}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-border bg-card p-4 hover:border-gold/30 transition-all duration-200 group"
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="text-sm font-medium leading-tight mb-1">{item.role}</p>
            <p className="text-xs text-gold font-medium">{item.salary}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FeesSection({
  uni,
  emiOptions,
  onCounselingOpen,
}: {
  uni: University;
  emiOptions: { months: number; emi: number; label: string }[];
  onCounselingOpen: () => void;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Course fees table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-medium text-sm">Program-wise Fee Structure</h3>
        </div>
        <div className="divide-y divide-border">
          {uni.courses.map((course) => (
            <div key={course.name} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
              <div>
                <p className="text-sm font-medium leading-tight">{course.name}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{course.type}</span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />{course.duration}
                  </span>
                </div>
              </div>
              <span className="text-sm font-semibold text-gold shrink-0 ml-4">{course.fee}</span>
            </div>
          ))}
        </div>
      </div>

      {/* EMI breakdown */}
      <div className="space-y-4">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-4 w-4 text-gold" />
            <h3 className="font-medium text-sm">EMI Options (0% Interest)</h3>
          </div>
          <div className="space-y-3">
            {emiOptions.map((opt) => (
              <div
                key={opt.months}
                className="flex items-center justify-between p-3 rounded-xl border border-border hover:border-gold/30 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium">{opt.label}</p>
                  <p className="text-xs text-muted-foreground">No-cost EMI</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-semibold text-gold">{formatINR(opt.emi)}/mo</p>
                  <p className="text-[10px] text-muted-foreground">approx.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scholarship note */}
        <div
          className="rounded-2xl p-4 border border-gold/20"
          style={{ background: "linear-gradient(135deg, rgba(198,144,77,0.06) 0%, transparent 100%)" }}
        >
          <div className="flex items-start gap-3">
            <Zap className="h-4 w-4 text-gold shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Scholarship Available</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Merit-based scholarships up to 30% off. Talk to our counselor to check eligibility.
              </p>
              <button
                onClick={onCounselingOpen}
                className="text-xs text-gold hover:underline mt-2 flex items-center gap-1"
              >
                Check Eligibility <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdmissionTimeline({ onCounselingOpen }: { onCounselingOpen: () => void }) {
  return (
    <div>
      {/* Desktop: horizontal timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Connector line */}
          <div className="absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          <div className="grid grid-cols-5 gap-4">
            {ADMISSION_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Step circle */}
                  <div
                    className="relative h-16 w-16 rounded-2xl flex items-center justify-center mb-4 border border-gold/30"
                    style={{ background: "linear-gradient(135deg, rgba(198,144,77,0.15), rgba(198,144,77,0.05))" }}
                  >
                    <Icon className="h-6 w-6 text-gold" />
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-gold text-[10px] font-bold text-charcoal flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-sm font-semibold mb-1">{step.title}</p>
                  <p className="text-xs text-muted-foreground mb-1">{step.desc}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20">
                    {step.time}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden space-y-4">
        {ADMISSION_STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-gold" />
                </div>
                {i < ADMISSION_STEPS.length - 1 && (
                  <div className="w-px flex-1 bg-gold/15 mt-2" />
                )}
              </div>
              <div className="pb-4">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold">{step.title}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20">
                    {step.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <Button variant="premium" size="lg" onClick={onCounselingOpen} className="glow-gold">
          <Sparkles className="h-4 w-4 mr-2" />
          Start Your Admission Journey
        </Button>
        <p className="text-xs text-muted-foreground mt-2">Free counseling · No commitment · 24hr response</p>
      </div>
    </div>
  );
}

function PlacementCompanies({ companies }: { companies: string[] }) {
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {companies.map((company, i) => (
          <motion.div
            key={company}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:border-gold/30 hover:bg-gold/5 transition-all duration-200 group"
          >
            <Building2 className="h-3.5 w-3.5 text-muted-foreground group-hover:text-gold transition-colors" />
            <span className="text-sm font-medium">{company}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function RelatedUniversities({ universities }: { universities: University[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      {universities.map((u, i) => (
        <motion.div
          key={u.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to="/universities/$slug"
            params={{ slug: u.slug }}
            className="block rounded-2xl border border-border bg-card overflow-hidden hover:border-gold/30 transition-all duration-300 group"
          >
            {/* Image */}
            <div className="relative h-36 overflow-hidden">
              <img
                src={(u as any).primaryImage}
                alt={u.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              {u.tag && (
                <span className="absolute top-3 left-3 text-[10px] px-2 py-0.5 rounded-full bg-gold/90 text-charcoal font-semibold">
                  {u.tag}
                </span>
              )}
              {(u as any).logo && (
                <div className="absolute bottom-3 left-3 h-8 w-8 rounded-lg overflow-hidden bg-white/10 border border-white/20">
                  <img src={(u as any).logo} alt={u.short} className="h-full w-full object-contain p-1" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-display text-base leading-tight mb-1 group-hover:text-gold transition-colors">
                {u.name}
              </h3>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />{u.city}
                </span>
                <span className="flex items-center gap-1">
                  <Award className="h-3 w-3 text-gold" />{u.naac}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{u.feesRange}</span>
                <span className="text-xs text-gold flex items-center gap-1 font-medium">
                  Explore <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
function UniversityDetailPage() {
  const uni = Route.useLoaderData() as University;
  const { open: modalOpen, openModal, closeModal } = useCounselingModal();

  // Course explorer state
  const allCourseShorts = Array.from(new Set(uni.courses.map((c) => getCourseShortName(c.name))));
  const [activeCourse, setActiveCourse] = useState(allCourseShorts[0] ?? "MBA");
  const [expandedSpec, setExpandedSpec] = useState<string | null>(null);

  // Specializations for active course
  const uniSpecs = getUniSpecializations(uni, PROGRAMS);
  const activeProgSpec = uniSpecs.find((s) => {
    const short = getCourseShortName(s.programName);
    return short === activeCourse || s.programName.toLowerCase().includes(activeCourse.toLowerCase());
  }) ?? uniSpecs[0];

  // Career outcomes
  const { program: careerProgram, outcomes: careerOutcomes } = getCareerOutcomes(uni);

  // EMI options
  const emiOptions = getEmiOptions(uni.feesRange);

  // Related universities (same NAAC grade, different slug, max 3)
  const { data: allApiUnis = [] } = useUniversities();
  const related = UNIVERSITIES.filter(
    (u) => u.slug !== uni.slug && u.naac === uni.naac
  ).slice(0, 3).map(u => {
      const apiU = allApiUnis.find(a => a.slug === u.slug);
      return { ...u, primaryImage: apiU?.primaryImage || u.image || "", logo: apiU?.logo || u.logo };
  });

  const { data: apiUni } = useUniversity(uni.slug);

  // Sticky bottom bar visibility
  const heroRef = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
        <div ref={heroRef}>
          <UniversityHeroBanner
            uni={uni}
            onCounselingOpen={openModal}
            dynamicImage={apiUni?.heroImage || apiUni?.primaryImage}
            dynamicLogo={apiUni?.logo}
          />
        </div>

        {/* ── 2. QUICK STATS ───────────────────────────────────────────────── */}
        <Section id="stats" className="bg-ink/40">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <StatCard icon={Award}       label="NAAC Grade"         value={uni.naac}              valueClass="text-gradient-gold" delay={0} />
              <StatCard icon={TrendingUp}  label="Avg Placement"      value={uni.placement}         delay={0.05} />
              <StatCard icon={IndianRupee} label="Fees Range"         value={uni.feesRange}         delay={0.1} />
              <StatCard icon={Users}       label="Alumni Network"     value={uni.alumni}            delay={0.15} />
              <StatCard icon={BookOpen}    label="Programs"           value={`${uni.programs}+`}    delay={0.2} />
              <StatCard icon={Building2}   label="Hiring Partners"    value={`${uni.placementPartners}+`} delay={0.25} />
            </div>
          </div>
        </Section>

        {/* ── Main content + sidebar ────────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-10 xl:gap-14">

            {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
            <div className="min-w-0">

              {/* ── 3. COURSE & SPECIALIZATION EXPLORER ─────────────────── */}
              <Section id="courses">
                <SectionHeading
                  label="Programs"
                  title={<>Course <span className="text-gradient-gold">& Specialization</span> Explorer</>}
                  sub="Browse all programs offered and dive into available specializations."
                />
                <CourseExplorer
                  uni={uni}
                  allCourseShorts={allCourseShorts}
                  activeCourse={activeCourse}
                  setActiveCourse={(c) => { setActiveCourse(c); setExpandedSpec(null); }}
                  activeProgSpec={activeProgSpec}
                  expandedSpec={expandedSpec}
                  setExpandedSpec={setExpandedSpec}
                />
              </Section>

              {/* ── 4. CAREER OUTCOMES ──────────────────────────────────── */}
              <Section id="careers" className="border-t border-border">
                <SectionHeading
                  label="Career Outcomes"
                  title={<>Where Our <span className="text-gradient-gold">Graduates</span> Work</>}
                  sub={`Top job roles and salary ranges for ${careerProgram} graduates from ${uni.short}.`}
                />
                <CareerOutcomesSection outcomes={careerOutcomes} placement={uni.placement} />
              </Section>

              {/* ── 5. FEES & EMI ───────────────────────────────────────── */}
              <Section id="fees" className="border-t border-border">
                <SectionHeading
                  label="Fees & Financing"
                  title={<>Fees <span className="text-gradient-gold">&amp; EMI</span> Breakdown</>}
                  sub="Transparent fee structure with flexible EMI options to make quality education accessible."
                />
                <FeesSection uni={uni} emiOptions={emiOptions} onCounselingOpen={openModal} />
              </Section>

              {/* ── 6. ADMISSION PROCESS ────────────────────────────────── */}
              <Section id="admission" className="border-t border-border">
                <SectionHeading
                  label="Admission"
                  title={<>Simple <span className="text-gradient-gold">5-Step</span> Admission Process</>}
                  sub="From counseling to offer letter — we guide you every step of the way."
                />
                <AdmissionTimeline onCounselingOpen={openModal} />
              </Section>

              {/* ── 7. PLACEMENT COMPANIES ──────────────────────────────── */}
              {uni.placementCompanies && uni.placementCompanies.length > 0 && (
                <Section id="placements" className="border-t border-border">
                  <SectionHeading
                    label="Placements"
                    title={<>Top <span className="text-gradient-gold">Hiring</span> Companies</>}
                    sub={`${uni.placementPartners}+ companies actively recruit ${uni.short} graduates.`}
                  />
                  <PlacementCompanies companies={uni.placementCompanies} />
                </Section>
              )}

            </div>

            {/* ── RIGHT SIDEBAR ────────────────────────────────────────────── */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <CounselingSidebar uni={uni} onOpen={openModal} />

                {/* Accreditations */}
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">
                    Accreditations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {uni.accreditations.map((acc) => (
                      <span
                        key={acc}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-gold/30 bg-gold/8 text-gold font-medium"
                      >
                        {acc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">
                    Key Highlights
                  </h4>
                  <ul className="space-y-2.5">
                    {uni.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Compare CTA */}
                <Link
                  to="/compare"
                  className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 hover:border-gold/30 transition-colors group"
                >
                  <div>
                    <p className="text-sm font-medium">Compare Universities</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Side-by-side comparison</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
                </Link>
              </div>
            </aside>

          </div>
        </div>

        {/* ── 8. RELATED UNIVERSITIES ──────────────────────────────────────── */}
        {related.length > 0 && (
          <Section className="border-t border-border bg-ink/30">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <SectionHeading
                label="Explore More"
                title={<>Similar <span className="text-gradient-gold">Universities</span></>}
                sub={`Other NAAC ${uni.naac} universities you might be interested in.`}
              />
              <RelatedUniversities universities={related} />
            </div>
          </Section>
        )}

      </main>

      <SiteFooter />
      <ChatbotWidget />
      <CounselingModal open={modalOpen} onClose={closeModal} />
      <Toaster position="top-center" />

      {/* ── 9. STICKY MOBILE CTA BAR ─────────────────────────────────────── */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-3 border-t border-border"
            style={{ background: "rgba(15,17,19,0.97)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex gap-2">
              <Button variant="outlineGold" className="flex-1 h-12 text-sm" onClick={openModal}>
                <Phone className="h-4 w-4 mr-1.5" />
                Callback
              </Button>
              <Button variant="premium" className="flex-1 h-12 text-sm" onClick={openModal}>
                <Sparkles className="h-4 w-4 mr-1.5" />
                Free Counseling
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
