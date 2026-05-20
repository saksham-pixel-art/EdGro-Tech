import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { MapPin, ChevronRight } from "lucide-react";
import type { MegaMenuUniversity } from "./mega-menu-data";

interface Props {
  universities: MegaMenuUniversity[];
  activeUniversity: string;
  onSelect: (slug: string) => void;
  onClose: () => void;
}

// Hue → teal-tinted gradient for university avatar fallback
function hueToGradient(hue: number) {
  return `linear-gradient(135deg, hsl(${hue}, 55%, 42%), hsl(${hue + 30}, 45%, 28%))`;
}

export function UniversityTabs({ universities, activeUniversity, onSelect, onClose }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      {/* Fade edges for scroll hint */}
      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none rounded-l-xl" />
      <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none rounded-r-xl" />

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-2 pb-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {universities.map((uni) => {
          const isActive = uni.slug === activeUniversity;
          return (
            <button
              key={uni.slug}
              onMouseEnter={() => onSelect(uni.slug)}
              onClick={() => onSelect(uni.slug)}
              className={`
                relative flex-shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl
                border transition-all duration-200 cursor-pointer group
                ${isActive
                  ? "border-[#0B6B6B]/30 bg-[#0B6B6B]/[0.06] shadow-sm"
                  : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"
                }
              `}
            >
              {/* Active underline */}
              {isActive && (
                <motion.div
                  layoutId="uni-active-underline"
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#0B6B6B]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Logo / Avatar */}
              <div className="h-7 w-7 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-gray-100">
                {uni.logo ? (
                  <img
                    src={uni.logo}
                    alt={uni.short}
                    className="h-full w-full object-contain bg-white p-0.5"
                    onError={(e) => {
                      const el = e.currentTarget;
                      el.style.display = "none";
                      el.parentElement!.style.background = hueToGradient(uni.hue);
                    }}
                  />
                ) : (
                  <div
                    className="h-full w-full flex items-center justify-center text-white text-[9px] font-bold"
                    style={{ background: hueToGradient(uni.hue) }}
                  >
                    {uni.short.slice(0, 2)}
                  </div>
                )}
              </div>

              <div className="text-left">
                <div className={`text-[12px] font-semibold leading-tight whitespace-nowrap ${isActive ? "text-[#0B6B6B]" : "text-gray-800"}`}>
                  {uni.short}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className={`text-[9px] font-bold px-1 py-0.5 rounded ${
                    uni.naac === "A++" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                  }`}>
                    NAAC {uni.naac}
                  </span>
                </div>
              </div>
            </button>
          );
        })}

        {/* View all universities */}
        <Link
          to="/universities"
          onClick={onClose}
          className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl
                     border border-dashed border-gray-200 text-gray-400
                     hover:border-[#0B6B6B]/30 hover:text-[#0B6B6B] hover:bg-[#0B6B6B]/[0.03]
                     transition-all duration-200 group"
        >
          <span className="text-[12px] font-medium whitespace-nowrap">All Universities</span>
          <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

// ── University Detail Card (shown in mega menu body) ──────────────────────────
interface UniversityCardProps {
  university: MegaMenuUniversity;
  onClose: () => void;
}

export function UniversityDetailCard({ university, onClose }: UniversityCardProps) {
  return (
    <motion.div
      key={university.slug}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-3"
    >
      {/* University header */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-[#0B6B6B]/[0.06] to-transparent border border-[#0B6B6B]/10">
        <div className="h-12 w-12 rounded-xl overflow-hidden ring-1 ring-[#0B6B6B]/20 flex-shrink-0">
          {university.logo ? (
            <img
              src={university.logo}
              alt={university.name}
              className="h-full w-full object-contain bg-white p-1"
              onError={(e) => {
                const el = e.currentTarget;
                el.style.display = "none";
                el.parentElement!.style.background = hueToGradient(university.hue);
              }}
            />
          ) : (
            <div
              className="h-full w-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: hueToGradient(university.hue) }}
            >
              {university.short.slice(0, 2)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 leading-tight">{university.name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              university.naac === "A++" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
            }`}>
              NAAC {university.naac}
            </span>
            <span className="flex items-center gap-0.5 text-[10px] text-gray-400">
              <MapPin className="h-2.5 w-2.5" />
              {university.city}
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Link
        to="/universities/$slug"
        params={{ slug: university.slug }}
        onClick={onClose}
        className="flex items-center justify-between px-4 py-3 rounded-xl
                   bg-white border border-gray-100 hover:border-[#0B6B6B]/20
                   hover:bg-[#0B6B6B]/[0.03] transition-all duration-200 group"
      >
        <span className="text-[13px] font-medium text-gray-700 group-hover:text-[#0B6B6B]">
          View University
        </span>
        <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-[#0B6B6B] group-hover:translate-x-0.5 transition-all" />
      </Link>
    </motion.div>
  );
}
