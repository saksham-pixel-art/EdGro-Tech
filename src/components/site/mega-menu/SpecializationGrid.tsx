import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { MegaMenuSpecialization } from "./mega-menu-data";

interface Props {
  courseSlug: string;
  courseLabel: string;
  specializations: MegaMenuSpecialization[];
  onClose: () => void;
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.035, delayChildren: 0.05 },
  },
  exit: {},
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
  exit:   { opacity: 0, y: -4, transition: { duration: 0.12 } },
};

export function SpecializationGrid({ courseSlug, courseLabel, specializations, onClose }: Props) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#0B6B6B] font-semibold mb-0.5">
            Specializations
          </p>
          <h3 className="text-base font-semibold text-gray-900 leading-tight">
            {courseLabel}
          </h3>
        </div>
        <Link
          to="/programs/$slug"
          params={{ slug: courseSlug }}
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs font-medium text-[#0B6B6B] hover:text-[#094f4f] transition-colors group"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={courseSlug}
          variants={container}
          initial="hidden"
          animate="show"
          exit="exit"
          className="grid grid-cols-2 gap-2 flex-1 content-start"
        >
          {specializations.map((spec) => (
            <motion.div key={spec.slug} variants={item}>
              <Link
                to="/programs/$slug"
                params={{ slug: courseSlug }}
                onClick={onClose}
                className="group flex items-start gap-2.5 p-3 rounded-xl border border-transparent
                           hover:border-[#0B6B6B]/15 hover:bg-[#0B6B6B]/[0.04]
                           transition-all duration-200 cursor-pointer"
              >
                <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-[#0B6B6B]/40 flex-shrink-0 group-hover:bg-[#0B6B6B] transition-colors" />
                <div className="flex-1 min-w-0">
                  <span className="text-[13px] text-gray-700 group-hover:text-gray-900 font-medium leading-snug transition-colors line-clamp-2">
                    {spec.label}
                  </span>
                  <div className="flex gap-1.5 mt-1 flex-wrap">
                    {spec.isNew && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide bg-emerald-50 text-emerald-600 border border-emerald-100">
                        New
                      </span>
                    )}
                    {spec.isTrending && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide bg-amber-50 text-amber-600 border border-amber-100">
                        🔥 Hot
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Footer CTA */}
      <div className="mt-5 pt-4 border-t border-gray-100">
        <Link
          to="/programs/$slug"
          params={{ slug: courseSlug }}
          onClick={onClose}
          className="flex items-center justify-between w-full px-4 py-3 rounded-xl
                     bg-gradient-to-r from-[#0B6B6B] to-[#0d8080]
                     text-white text-sm font-semibold
                     hover:from-[#094f4f] hover:to-[#0B6B6B]
                     transition-all duration-200 shadow-sm hover:shadow-md group"
        >
          <span>Explore {courseLabel} Programs</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
