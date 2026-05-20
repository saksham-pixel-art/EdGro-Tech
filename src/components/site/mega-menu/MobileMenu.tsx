/**
 * MobileMenu — Premium dark accordion for mobile/tablet
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronDown, GraduationCap, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { MEGA_UNIVERSITIES, COURSE_CATEGORIES } from "./mega-menu-data";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCounselingOpen: () => void;
}

const NAV_LINKS = [
  { label: "Compare", to: "/compare" as const },
  { label: "Blog",    to: "/blog"    as const },
  { label: "About",   to: "/about"   as const },
  { label: "Contact", to: "/contact" as const },
];

const slide = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, height: 0,      transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
};

export function MobileMenu({ isOpen, onClose, onCounselingOpen }: Props) {
  const [expanded, setExpanded] = useState<"universities" | "courses" | null>(null);
  const [expandedUni, setExpandedUni] = useState<string | null>(null);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  const toggle = (s: "universities" | "courses") =>
    setExpanded(p => p === s ? null : s);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          variants={slide} initial="hidden" animate="visible" exit="exit"
          className="lg:hidden overflow-hidden border-t border-white/[0.06]"
          style={{ background: "linear-gradient(180deg, #141820 0%, #0f1318 100%)" }}
        >
          <div className="px-5 py-4 space-y-0.5">

            {/* Universities */}
            <div>
              <button onClick={() => toggle("universities")}
                      className="flex items-center justify-between w-full py-3 text-sm font-medium text-white/70 hover:text-white transition-colors">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="h-4 w-4 text-[#C6904D]" />
                  Universities
                </div>
                <motion.div animate={{ rotate: expanded === "universities" ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-white/30" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expanded === "universities" && (
                  <motion.div variants={slide} initial="hidden" animate="visible" exit="exit" className="overflow-hidden">
                    <div className="pl-4 pb-3 space-y-0.5">
                      {MEGA_UNIVERSITIES.map((uni) => (
                        <div key={uni.slug}>
                          <button
                            onClick={() => setExpandedUni(p => p === uni.slug ? null : uni.slug)}
                            className="flex items-center justify-between w-full py-2.5 px-3 rounded-xl
                                       text-white/55 hover:text-white/85 hover:bg-white/[0.04]
                                       transition-all duration-150"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="h-1.5 w-1.5 rounded-full bg-[#C6904D]/40" />
                              <span className="text-[13px]">{uni.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                uni.naac === "A++" ? "bg-emerald-900/50 text-emerald-400" : "bg-blue-900/50 text-blue-400"
                              }`}>{uni.naac}</span>
                              <motion.div animate={{ rotate: expandedUni === uni.slug ? 180 : 0 }} transition={{ duration: 0.18 }}>
                                <ChevronDown className="h-3.5 w-3.5 text-white/25" />
                              </motion.div>
                            </div>
                          </button>

                          <AnimatePresence>
                            {expandedUni === uni.slug && (
                              <motion.div variants={slide} initial="hidden" animate="visible" exit="exit" className="overflow-hidden">
                                <div className="pl-8 pb-2 space-y-0.5">
                                  {uni.courses.map((course) => (
                                    <Link key={course.slug} to="/programs/$slug" params={{ slug: course.slug }} onClick={onClose}
                                          className="flex items-center justify-between py-2 px-2 rounded-lg
                                                     text-[12px] text-white/40 hover:text-white/70
                                                     hover:bg-white/[0.04] transition-all">
                                      <div className="flex items-center gap-2">
                                        <span>{course.icon}</span>
                                        <span>{course.label}</span>
                                        <span className="text-white/20">({course.feesRange})</span>
                                      </div>
                                      <ArrowRight className="h-3 w-3 text-white/20" />
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                      <Link to="/universities" onClick={onClose}
                            className="flex items-center gap-2 py-2.5 px-3 rounded-xl text-[13px] font-medium text-[#C6904D] hover:bg-[#C6904D]/[0.08] transition-all">
                        View all universities <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Courses */}
            <div>
              <button onClick={() => toggle("courses")}
                      className="flex items-center justify-between w-full py-3 text-sm font-medium text-white/70 hover:text-white transition-colors">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="h-4 w-4 text-[#C6904D]" />
                  Courses
                </div>
                <motion.div animate={{ rotate: expanded === "courses" ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-white/30" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expanded === "courses" && (
                  <motion.div variants={slide} initial="hidden" animate="visible" exit="exit" className="overflow-hidden">
                    <div className="pl-4 pb-3 space-y-0.5">
                      {COURSE_CATEGORIES.map((cat) => (
                        <div key={cat.slug}>
                          <button
                            onClick={() => setExpandedCat(p => p === cat.slug ? null : cat.slug)}
                            className="flex items-center justify-between w-full py-2.5 px-3 rounded-xl
                                       text-white/55 hover:text-white/85 hover:bg-white/[0.04]
                                       transition-all duration-150"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-sm">{cat.icon}</span>
                              <span className="text-[13px]">{cat.label}</span>
                            </div>
                            <motion.div animate={{ rotate: expandedCat === cat.slug ? 180 : 0 }} transition={{ duration: 0.18 }}>
                              <ChevronDown className="h-3.5 w-3.5 text-white/25" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {expandedCat === cat.slug && (
                              <motion.div variants={slide} initial="hidden" animate="visible" exit="exit" className="overflow-hidden">
                                <div className="pl-8 pb-2 space-y-0.5">
                                  {cat.courses.map((course) => (
                                    <Link key={course.name} to="/programs/$slug" params={{ slug: course.programSlug }} onClick={onClose}
                                          className="flex items-center justify-between py-2 px-2 rounded-lg
                                                     text-[12px] text-white/40 hover:text-white/70
                                                     hover:bg-white/[0.04] transition-all">
                                      <span>{course.name}</span>
                                      <div className="flex items-center gap-1.5">
                                        {course.trending && <span className="text-[9px] text-[#C6904D] font-bold">HOT</span>}
                                        {course.isNew && <span className="text-[9px] text-emerald-400 font-bold">NEW</span>}
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Static links */}
            <div className="pt-1 border-t border-white/[0.06]">
              {NAV_LINKS.map((link) => (
                <Link key={link.to} to={link.to} onClick={onClose}
                      className="flex items-center py-3 text-sm text-white/55 hover:text-white/85 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-3 pb-2">
              <button
                onClick={() => { onClose(); onCounselingOpen(); }}
                className="w-full py-3.5 rounded-xl text-sm font-semibold text-[#1F1F1F] transition-all active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #E0A86A 0%, #C6904D 50%, #8E5F2E 100%)" }}
              >
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Get Free Counseling
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
