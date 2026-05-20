import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { GraduationCap, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { AnimatePresence as AP } from "framer-motion";

import {
  MEGA_UNIVERSITIES,
  MEGA_COURSES,
  MEGA_SPECIALIZATIONS,
} from "./mega-menu-data";
import { UniversityTabs, UniversityDetailCard } from "./UniversityTabs";
import { CourseSidebar } from "./CourseSidebar";
import { SpecializationGrid } from "./SpecializationGrid";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const panelVariants = {
  hidden: {
    opacity: 0,
    y: -12,
    scale: 0.985,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.99,
    transition: { duration: 0.16, ease: [0.4, 0, 1, 1] },
  },
};

export function MegaMenu({ isOpen, onClose }: Props) {
  const [activeUniversity, setActiveUniversity] = useState(MEGA_UNIVERSITIES[0].slug);
  const [activeCourse, setActiveCourse] = useState(MEGA_COURSES[0].slug);

  const handleCourseSelect = useCallback((slug: string) => {
    setActiveCourse(slug);
  }, []);

  const handleUniversitySelect = useCallback((slug: string) => {
    setActiveUniversity(slug);
  }, []);

  const activeUni = MEGA_UNIVERSITIES.find((u) => u.slug === activeUniversity)!;
  const activeCourseData = MEGA_COURSES.find((c) => c.slug === activeCourse)!;
  const specializations = MEGA_SPECIALIZATIONS[activeCourse] ?? [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mega-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[80px] bg-black/20 backdrop-blur-[2px] z-30"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="mega-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-0 right-0 top-full z-40 mx-4 lg:mx-8 xl:mx-auto xl:max-w-7xl"
            style={{ transformOrigin: "top center" }}
          >
            <div className="bg-white rounded-2xl shadow-[0_24px_80px_-12px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06)] overflow-hidden">

              {/* ── Top bar: University tabs ─────────────────────────────── */}
              <div className="px-5 pt-5 pb-4 border-b border-gray-100 bg-gray-50/60">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="h-4 w-4 text-[#0B6B6B]" />
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[#0B6B6B] font-semibold">
                      Partner Universities
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-gray-200" />
                  <Link
                    to="/universities"
                    onClick={onClose}
                    className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-[#0B6B6B] transition-colors group"
                  >
                    View all 30+
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
                <UniversityTabs
                  universities={MEGA_UNIVERSITIES}
                  activeUniversity={activeUniversity}
                  onSelect={handleUniversitySelect}
                  onClose={onClose}
                />
              </div>

              {/* ── Body: 3-column layout ────────────────────────────────── */}
              <div className="grid grid-cols-[200px_1fr_1fr] lg:grid-cols-[220px_1fr_1.4fr] min-h-[380px]">

                {/* Col 1 — Course sidebar */}
                <div className="border-r border-gray-100 px-3 py-5 bg-gray-50/40">
                  <CourseSidebar
                    courses={MEGA_COURSES}
                    activeCourse={activeCourse}
                    onSelect={handleCourseSelect}
                  />

                  {/* Quick links */}
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-semibold px-3 mb-2">
                      Quick Links
                    </p>
                    {[
                      { label: "Compare Universities", to: "/compare" as const },
                      { label: "Free Counseling", to: "/" as const },
                    ].map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={onClose}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-gray-500
                                   hover:text-[#0B6B6B] hover:bg-[#0B6B6B]/[0.04] transition-all duration-150"
                      >
                        <span className="h-1 w-1 rounded-full bg-gray-300" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Col 2 — Specializations */}
                <div className="border-r border-gray-100 px-5 py-5 overflow-y-auto max-h-[480px]">
                  <SpecializationGrid
                    courseSlug={activeCourse}
                    courseLabel={activeCourseData.label}
                    specializations={specializations}
                    onClose={onClose}
                  />
                </div>

                {/* Col 3 — University detail + featured */}
                <div className="px-5 py-5 flex flex-col gap-5">
                  {/* University card */}
                  <AP mode="wait">
                    <UniversityDetailCard
                      key={activeUniversity}
                      university={activeUni}
                      onClose={onClose}
                    />
                  </AP>

                  {/* Divider */}
                  <div className="h-px bg-gray-100" />

                  {/* Featured highlight */}
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-3">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                      <span className="text-[11px] uppercase tracking-[0.18em] text-amber-600 font-semibold">
                        Trending Now
                      </span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: "MBA in Business Analytics", badge: "🔥 Hot", slug: "online-mba" },
                        { label: "MCA in ML & AI with TCS",   badge: "⭐ New", slug: "online-mca" },
                        { label: "BCA in Cloud Security",     badge: "🚀 Rising", slug: "online-bca" },
                      ].map((item) => (
                        <Link
                          key={item.slug + item.label}
                          to="/programs/$slug"
                          params={{ slug: item.slug }}
                          onClick={onClose}
                          className="flex items-center justify-between p-3 rounded-xl border border-gray-100
                                     hover:border-[#0B6B6B]/20 hover:bg-[#0B6B6B]/[0.03]
                                     transition-all duration-200 group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#0B6B6B]/40 group-hover:bg-[#0B6B6B] transition-colors flex-shrink-0" />
                            <span className="text-[12px] text-gray-700 group-hover:text-gray-900 font-medium">
                              {item.label}
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2">{item.badge}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="mt-auto pt-3 border-t border-gray-100">
                    <Link
                      to="/universities"
                      onClick={onClose}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-xl
                                 border border-[#0B6B6B]/20 text-[#0B6B6B]
                                 hover:bg-[#0B6B6B] hover:text-white hover:border-[#0B6B6B]
                                 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span className="text-[13px] font-semibold">Browse All Universities</span>
                      </div>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* ── Footer strip ─────────────────────────────────────────── */}
              <div className="px-5 py-3 bg-gradient-to-r from-[#0B6B6B]/[0.04] to-transparent border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {["30+ Universities", "8 Programs", "60+ Specializations", "Free Counseling"].map((tag) => (
                    <span key={tag} className="flex items-center gap-1.5 text-[11px] text-gray-400">
                      <span className="h-1 w-1 rounded-full bg-[#0B6B6B]/50" />
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="text-[11px] font-semibold text-[#0B6B6B] hover:underline"
                >
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
