/**
 * CoursesMegaMenu — Dark premium panel for course discovery
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, TrendingUp, Sparkles, BookOpen } from "lucide-react";
import { COURSE_CATEGORIES, type CourseCategory } from "./mega-menu-data";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const panel = {
  hidden: { opacity: 0, y: -16, scale: 0.982 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -8, scale: 0.992, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
};

const fadeIn = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
};

const DEGREE_COLORS: Record<string, string> = {
  PG:   "bg-purple-500/15 text-purple-400 border-purple-500/25",
  UG:   "bg-blue-500/15 text-blue-400 border-blue-500/25",
  Cert: "bg-amber-500/15 text-amber-400 border-amber-500/25",
};

export function CoursesMegaMenu({ isOpen, onClose }: Props) {
  const [activeCategory, setActiveCategory] = useState(COURSE_CATEGORIES[0].slug);
  const cat = COURSE_CATEGORIES.find(c => c.slug === activeCategory)!;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="courses-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[72px] z-30 bg-black/50 backdrop-blur-[3px]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="courses-panel"
            variants={panel} initial="hidden" animate="visible" exit="exit"
            className="absolute left-0 right-0 top-full z-40 mx-4 lg:mx-6 xl:mx-auto xl:max-w-[1100px]"
            style={{ transformOrigin: "top center" }}
          >
            <div className="rounded-2xl overflow-hidden border border-white/[0.08]"
                 style={{ background: "linear-gradient(145deg, #141820 0%, #0f1318 60%, #111620 100%)" }}>

              {/* ── Header ───────────────────────────────────────────── */}
              <div className="px-6 pt-5 pb-4 border-b border-white/[0.06] flex items-center justify-between"
                   style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#C6904D]" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[#C6904D] font-semibold">
                    Explore Programs
                  </span>
                </div>
                <Link to="/programs" onClick={onClose}
                      className="flex items-center gap-1 text-[11px] text-white/30 hover:text-[#C6904D] transition-colors group">
                  Browse all programs
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* ── Body: 2-column ───────────────────────────────────── */}
              <div className="grid grid-cols-[220px_1fr]">

                {/* Left — Category tabs */}
                <div className="border-r border-white/[0.06] px-3 py-5"
                     style={{ background: "rgba(255,255,255,0.015)" }}>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-semibold px-3 mb-3">
                    By Domain
                  </p>
                  {COURSE_CATEGORIES.map((c) => {
                    const isActive = c.slug === activeCategory;
                    return (
                      <button
                        key={c.slug}
                        onMouseEnter={() => setActiveCategory(c.slug)}
                        onClick={() => setActiveCategory(c.slug)}
                        className={`relative w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl
                                    text-left transition-all duration-200 cursor-pointer group mb-0.5
                                    ${isActive
                                      ? "bg-[#C6904D]/[0.1] text-[#E0A86A]"
                                      : "text-white/45 hover:bg-white/[0.04] hover:text-white/75"
                                    }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="cat-active-bar"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                            style={{ background: "linear-gradient(180deg, #E0A86A, #C6904D)" }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <div className="flex items-center gap-2.5 pl-1">
                          <span className="text-base">{c.icon}</span>
                          <div>
                            <div className={`text-[13px] font-medium ${isActive ? "text-[#E0A86A]" : ""}`}>
                              {c.label}
                            </div>
                            <div className="text-[10px] text-white/25 mt-0.5 leading-tight">{c.description}</div>
                          </div>
                        </div>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border flex-shrink-0
                                         ${DEGREE_COLORS[c.degree]}`}>
                          {c.degree}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Right — Course cards */}
                <div className="px-6 py-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCategory}
                      variants={stagger} initial="hidden" animate="visible" exit="hidden"
                    >
                      {/* Category header */}
                      <motion.div variants={fadeIn} className="mb-5">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{cat.icon}</span>
                          <h3 className="text-base font-semibold text-white/90">{cat.label} Programs</h3>
                        </div>
                        <p className="text-[12px] text-white/35">{cat.description}</p>
                      </motion.div>

                      {/* Course grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {cat.courses.map((course) => (
                          <motion.div key={course.name} variants={fadeIn}>
                            <Link
                              to="/programs/$slug" params={{ slug: course.programSlug }} onClick={onClose}
                              className="group flex flex-col gap-2 p-4 rounded-xl border border-white/[0.06]
                                         hover:border-[#C6904D]/25 hover:bg-[#C6904D]/[0.04]
                                         transition-all duration-200 cursor-pointer"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <span className="text-[13px] font-semibold text-white/80 group-hover:text-white/95
                                                 leading-snug transition-colors">
                                  {course.name}
                                </span>
                                <div className="flex gap-1 flex-shrink-0">
                                  {course.trending && (
                                    <span className="flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full
                                                     bg-[#C6904D]/15 text-[#C6904D] border border-[#C6904D]/20">
                                      <TrendingUp className="h-2.5 w-2.5" />Hot
                                    </span>
                                  )}
                                  {course.isNew && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full
                                                     bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                                      New
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] text-white/30">
                                  {course.universities} universities
                                </span>
                                <ArrowRight className="h-3.5 w-3.5 text-white/20 group-hover:text-[#C6904D]
                                                       group-hover:translate-x-0.5 transition-all duration-200" />
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>

                      {/* Category CTA */}
                      <motion.div variants={fadeIn} className="mt-4">
                        <Link to="/programs" onClick={onClose}
                              className="flex items-center justify-between w-full px-4 py-3 rounded-xl
                                         border border-[#C6904D]/20 text-[#C6904D]
                                         hover:bg-[#C6904D]/[0.08] hover:border-[#C6904D]/35
                                         transition-all duration-200 group">
                          <span className="text-[13px] font-semibold">
                            View all {cat.label} programs
                          </span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* ── Footer ───────────────────────────────────────────── */}
              <div className="px-6 py-3 border-t border-white/[0.06] flex items-center justify-between"
                   style={{ background: "rgba(255,255,255,0.015)" }}>
                <div className="flex items-center gap-5">
                  {["8 Program Types", "60+ Specializations", "UGC Approved"].map((tag) => (
                    <span key={tag} className="flex items-center gap-1.5 text-[11px] text-white/25">
                      <Sparkles className="h-2.5 w-2.5 text-[#C6904D]/50" />
                      {tag}
                    </span>
                  ))}
                </div>
                <Link to="/contact" onClick={onClose}
                      className="text-[11px] font-semibold text-[#C6904D] hover:text-[#E0A86A] transition-colors">
                  Get Free Counseling →
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
