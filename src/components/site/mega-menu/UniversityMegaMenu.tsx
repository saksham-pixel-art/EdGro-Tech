/**
 * UniversityMegaMenu — Dark premium panel
 * University → Courses → Specializations (fully dynamic)
 */
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, TrendingUp, Sparkles, ChevronRight, Star } from "lucide-react";
import { MEGA_UNIVERSITIES, type MegaMenuUniversity } from "./mega-menu-data";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// ── Animations ────────────────────────────────────────────────────────────────
const panel = {
  hidden: { opacity: 0, y: -16, scale: 0.982 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -8, scale: 0.992, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
};

const fadeSlide = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, x: 10, transition: { duration: 0.14 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } },
};

const specItem = {
  hidden:  { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function hueGrad(hue: number) {
  return `linear-gradient(135deg, hsl(${hue},55%,38%), hsl(${hue + 25},45%,24%))`;
}

function NaacBadge({ grade }: { grade: string }) {
  const isPP = grade === "A++";
  return (
    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
      isPP ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
           : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
    }`}>
      NAAC {grade}
    </span>
  );
}

// ── University logo/avatar ────────────────────────────────────────────────────
function UniAvatar({ uni, size = "sm" }: { uni: MegaMenuUniversity; size?: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? "h-14 w-14" : size === "md" ? "h-10 w-10" : "h-8 w-8";
  const text = size === "lg" ? "text-sm" : "text-[10px]";
  return (
    <div className={`${dim} rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-white/10`}>
      {uni.logo ? (
        <img
          src={uni.logo}
          alt={uni.short}
          className="h-full w-full object-cover bg-white/5"
          onError={(e) => {
            const el = e.currentTarget;
            el.style.display = "none";
            (el.parentElement as HTMLElement).style.background = hueGrad(uni.hue);
          }}
        />
      ) : (
        <div className={`h-full w-full flex items-center justify-center text-white ${text} font-bold`}
             style={{ background: hueGrad(uni.hue) }}>
          {uni.short.slice(0, 2)}
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function UniversityMegaMenu({ isOpen, onClose }: Props) {
  const [activeUniSlug, setActiveUniSlug] = useState(MEGA_UNIVERSITIES[0].slug);
  const [activeCourseSlug, setActiveCourseSlug] = useState(MEGA_UNIVERSITIES[0].courses[0].slug);

  const activeUni = MEGA_UNIVERSITIES.find(u => u.slug === activeUniSlug)!;
  const activeCourse = activeUni.courses.find(c => c.slug === activeCourseSlug)
    ?? activeUni.courses[0];

  const selectUni = useCallback((slug: string) => {
    setActiveUniSlug(slug);
    const uni = MEGA_UNIVERSITIES.find(u => u.slug === slug)!;
    setActiveCourseSlug(uni.courses[0].slug);
  }, []);

  const selectCourse = useCallback((slug: string) => {
    setActiveCourseSlug(slug);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="uni-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[72px] z-30 bg-black/50 backdrop-blur-[3px]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="uni-panel"
            variants={panel} initial="hidden" animate="visible" exit="exit"
            className="absolute left-0 right-0 top-full z-40 mx-4 lg:mx-6 xl:mx-auto xl:max-w-[1200px]"
            style={{ transformOrigin: "top center" }}
          >
            <div className="rounded-2xl overflow-hidden border border-white/[0.08]"
                 style={{ background: "linear-gradient(145deg, #141820 0%, #0f1318 60%, #111620 100%)" }}
            >
              {/* ── University selector strip ─────────────────────────── */}
              <div className="px-5 pt-5 pb-4 border-b border-white/[0.06]"
                   style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)" }}>
                <div className="flex items-center gap-3 mb-3.5">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#C6904D] font-semibold">
                    Partner Universities
                  </span>
                  <div className="h-px flex-1 bg-white/[0.06]" />
                  <Link to="/universities" onClick={onClose}
                        className="flex items-center gap-1 text-[11px] text-white/30 hover:text-[#C6904D] transition-colors group">
                    View all 30+
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                {/* Scrollable university tabs */}
                <div className="flex gap-2 overflow-x-auto pb-1"
                     style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  {MEGA_UNIVERSITIES.map((uni) => {
                    const isActive = uni.slug === activeUniSlug;
                    return (
                      <button
                        key={uni.slug}
                        onMouseEnter={() => selectUni(uni.slug)}
                        onClick={() => selectUni(uni.slug)}
                        className={`relative flex-shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl
                                    border transition-all duration-200 cursor-pointer group
                                    ${isActive
                                      ? "border-[#C6904D]/40 bg-[#C6904D]/[0.08]"
                                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]"
                                    }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="uni-tab-glow"
                            className="absolute inset-0 rounded-xl"
                            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(198,144,77,0.12) 0%, transparent 70%)" }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <UniAvatar uni={uni} size="sm" />
                        <div className="text-left relative">
                          <div className={`text-[12px] font-semibold leading-tight whitespace-nowrap
                                          ${isActive ? "text-[#E0A86A]" : "text-white/70 group-hover:text-white/90"}`}>
                            {uni.short}
                          </div>
                          <NaacBadge grade={uni.naac} />
                        </div>
                        {isActive && (
                          <motion.div
                            layoutId="uni-tab-underline"
                            className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                            style={{ background: "linear-gradient(90deg, #C6904D, #E0A86A)" }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── 3-column body ─────────────────────────────────────── */}
              <div className="grid grid-cols-[200px_1fr_1.5fr] lg:grid-cols-[220px_1fr_1.6fr] min-h-[400px]">

                {/* Col 1 — Course sidebar */}
                <div className="border-r border-white/[0.06] px-3 py-5"
                     style={{ background: "rgba(255,255,255,0.015)" }}>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold px-3 mb-3">
                    Programs
                  </p>

                  {/* No AnimatePresence wrapper — just render directly so items are always visible */}
                  <div>
                    {activeUni.courses.map((course) => {
                      const isActive = course.slug === activeCourseSlug;
                      return (
                        <button
                          key={course.slug}
                          onMouseEnter={() => selectCourse(course.slug)}
                          onClick={() => selectCourse(course.slug)}
                          className={`relative w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl
                                      text-left transition-all duration-200 cursor-pointer group mb-0.5
                                      ${isActive
                                        ? "bg-[#C6904D]/[0.14] text-[#E0A86A]"
                                        : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                                      }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="course-active-bar"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                              style={{ background: "linear-gradient(180deg, #E0A86A, #C6904D)" }}
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                          )}
                          <div className="flex items-center gap-2.5 pl-1">
                            <span className="text-base leading-none">{course.icon}</span>
                            <div>
                              <div className={`text-[13px] font-medium leading-tight ${isActive ? "text-[#E0A86A]" : "text-white/80"}`}>
                                {course.label}
                              </div>
                              <div className="text-[10px] text-white/35 mt-0.5">{course.duration}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md
                                            ${isActive
                                              ? "bg-[#C6904D]/25 text-[#C6904D]"
                                              : "bg-white/[0.08] text-white/40 group-hover:bg-white/[0.14] group-hover:text-white/70"
                                            }`}>
                              {course.count}
                            </span>
                            <ChevronRight className={`h-3 w-3 transition-all ${isActive ? "text-[#C6904D]" : "text-white/30 group-hover:text-white/60"}`} />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick links */}
                  <div className="mt-5 pt-4 border-t border-white/[0.06]">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-semibold px-3 mb-2">
                      Quick Links
                    </p>
                    {[
                      { label: "Compare Universities", to: "/compare" as const },
                      { label: "Free Counseling",      to: "/" as const },
                    ].map((link) => (
                      <Link key={link.to} to={link.to} onClick={onClose}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-white/50
                                       hover:text-[#C6904D] hover:bg-[#C6904D]/[0.06] transition-all duration-150">
                        <span className="h-1 w-1 rounded-full bg-white/30" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Col 2 — Specializations */}
                <div className="border-r border-white/[0.06] px-5 py-5 overflow-y-auto max-h-[480px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeUniSlug}-${activeCourseSlug}`}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-[#C6904D] font-semibold mb-0.5">
                            Specializations
                          </p>
                          <h3 className="text-sm font-semibold text-white/90">
                            {activeCourse.label} — {activeUni.short}
                          </h3>
                          <p className="text-[11px] text-white/35 mt-0.5">
                            {activeCourse.feesRange} · {activeCourse.duration}
                          </p>
                        </div>
                        <Link to="/programs/$slug" params={{ slug: activeCourse.slug }} onClick={onClose}
                              className="flex items-center gap-1 text-[11px] text-[#C6904D] hover:text-[#E0A86A] transition-colors group">
                          View all
                          <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>

                      {/* Grid */}
                      <motion.div
                        variants={stagger} initial="hidden" animate="visible"
                        className="grid grid-cols-2 gap-1.5"
                      >
                        {activeCourse.specializations.map((spec) => (
                          <motion.div key={spec.slug} variants={specItem}>
                            <Link
                              to="/programs/$slug" params={{ slug: activeCourse.slug }} onClick={onClose}
                              className="group flex items-start gap-2 p-2.5 rounded-xl border border-transparent
                                         hover:border-[#C6904D]/20 hover:bg-[#C6904D]/[0.05]
                                         transition-all duration-200 cursor-pointer"
                            >
                              <div className="mt-1 h-1.5 w-1.5 rounded-full bg-[#C6904D]/30 flex-shrink-0
                                              group-hover:bg-[#C6904D] transition-colors" />
                              <div className="flex-1 min-w-0">
                                <span className="text-[12px] text-white/60 group-hover:text-white/90
                                                 font-medium leading-snug transition-colors line-clamp-2">
                                  {spec.label}
                                </span>
                                <div className="flex gap-1 mt-1 flex-wrap">
                                  {spec.isNew && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full
                                                     bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                                      New
                                    </span>
                                  )}
                                  {spec.isTrending && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full
                                                     bg-[#C6904D]/15 text-[#C6904D] border border-[#C6904D]/20">
                                      🔥 Hot
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* CTA */}
                      <div className="mt-4 pt-4 border-t border-white/[0.06]">
                        <Link to="/programs/$slug" params={{ slug: activeCourse.slug }} onClick={onClose}
                              className="flex items-center justify-between w-full px-4 py-3 rounded-xl
                                         border border-[#C6904D]/25 text-[#C6904D]
                                         hover:bg-[#C6904D]/[0.08] hover:border-[#C6904D]/40
                                         transition-all duration-200 group">
                          <span className="text-[13px] font-semibold">
                            Explore {activeCourse.label} Programs
                          </span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Col 3 — University detail */}
                <div className="px-5 py-5 flex flex-col gap-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeUniSlug}
                      variants={fadeSlide} initial="hidden" animate="visible" exit="exit"
                      className="flex flex-col gap-4 h-full"
                    >
                      {/* University card */}
                      <div className="p-4 rounded-xl border border-white/[0.08]"
                           style={{ background: `radial-gradient(ellipse at 30% 20%, hsl(${activeUni.hue},40%,20%) 0%, rgba(255,255,255,0.02) 60%)` }}>
                        <div className="flex items-start gap-3 mb-3">
                          <UniAvatar uni={activeUni} size="md" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-white/90 leading-tight">{activeUni.name}</h4>
                            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                              <NaacBadge grade={activeUni.naac} />
                              <span className="flex items-center gap-1 text-[10px] text-white/35">
                                <MapPin className="h-2.5 w-2.5" />{activeUni.city}
                              </span>
                              <span className="text-[10px] text-white/35">Est. {activeUni.established}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                          <div className="flex-1">
                            <div className="text-[10px] text-white/30 mb-0.5">Avg Placement</div>
                            <div className="text-sm font-bold text-[#E0A86A]">{activeUni.placement}</div>
                          </div>
                          <div className="flex-1">
                            <div className="text-[10px] text-white/30 mb-0.5">Programs</div>
                            <div className="text-sm font-bold text-white/80">{activeUni.courses.length} Courses</div>
                          </div>
                          <Link to="/universities/$slug" params={{ slug: activeUni.slug }} onClick={onClose}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-semibold
                                           text-[#C6904D] border border-[#C6904D]/25
                                           hover:bg-[#C6904D]/[0.1] hover:border-[#C6904D]/40
                                           transition-all duration-200 group">
                            View
                            <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>

                      {/* Trending programs */}
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 mb-3">
                          <Sparkles className="h-3.5 w-3.5 text-[#C6904D]" />
                          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6904D] font-semibold">
                            Trending Now
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          {[
                            { label: "MBA in Business Analytics", badge: "🔥 Hot",    slug: "online-mba" },
                            { label: "MCA in ML & AI with TCS",   badge: "⭐ New",    slug: "online-mca" },
                            { label: "BCA in Cloud Security",     badge: "🚀 Rising", slug: "online-bca" },
                          ].map((item) => (
                            <Link key={item.label} to="/programs/$slug" params={{ slug: item.slug }} onClick={onClose}
                                  className="flex items-center justify-between p-2.5 rounded-xl border border-white/[0.05]
                                             hover:border-[#C6904D]/20 hover:bg-[#C6904D]/[0.04]
                                             transition-all duration-200 group cursor-pointer">
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#C6904D]/30 group-hover:bg-[#C6904D] transition-colors flex-shrink-0" />
                                <span className="text-[12px] text-white/55 group-hover:text-white/85 font-medium">
                                  {item.label}
                                </span>
                              </div>
                              <span className="text-[10px] text-white/25 flex-shrink-0 ml-2">{item.badge}</span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Bottom CTA */}
                      <div className="mt-auto pt-3 border-t border-white/[0.06]">
                        <Link to="/universities" onClick={onClose}
                              className="flex items-center justify-between w-full px-4 py-3 rounded-xl
                                         transition-all duration-200 group"
                              style={{ background: "linear-gradient(135deg, rgba(198,144,77,0.15) 0%, rgba(198,144,77,0.06) 100%)",
                                       border: "1px solid rgba(198,144,77,0.25)" }}>
                          <span className="text-[13px] font-semibold text-[#E0A86A]">Browse All Universities</span>
                          <ArrowRight className="h-4 w-4 text-[#C6904D] group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* ── Footer strip ─────────────────────────────────────── */}
              <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between"
                   style={{ background: "rgba(255,255,255,0.015)" }}>
                <div className="flex items-center gap-5">
                  {[
                    { icon: <Star className="h-3 w-3" />, label: "30+ Universities" },
                    { icon: <TrendingUp className="h-3 w-3" />, label: "60+ Specializations" },
                    { icon: <Sparkles className="h-3 w-3" />, label: "Free AI Counseling" },
                  ].map((tag) => (
                    <span key={tag.label} className="flex items-center gap-1.5 text-[11px] text-white/25">
                      <span className="text-[#C6904D]/60">{tag.icon}</span>
                      {tag.label}
                    </span>
                  ))}
                </div>
                <Link to="/contact" onClick={onClose}
                      className="text-[11px] font-semibold text-[#C6904D] hover:text-[#E0A86A] transition-colors">
                  Talk to a Counselor →
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
