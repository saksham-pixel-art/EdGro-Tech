import { motion } from "framer-motion";
import type { MegaMenuCourse } from "./mega-menu-data";

interface Props {
  courses: MegaMenuCourse[];
  activeCourse: string;
  onSelect: (slug: string) => void;
}

export function CourseSidebar({ courses, activeCourse, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold px-3 mb-2">
        Programs
      </p>
      {courses.map((course) => {
        const isActive = course.slug === activeCourse;
        return (
          <button
            key={course.slug}
            onMouseEnter={() => onSelect(course.slug)}
            onClick={() => onSelect(course.slug)}
            className={`
              relative flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl
              text-left transition-all duration-200 group cursor-pointer
              ${isActive
                ? "bg-[#0B6B6B]/10 text-[#0B6B6B]"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }
            `}
          >
            {/* Active indicator bar */}
            {isActive && (
              <motion.div
                layoutId="course-active-bar"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-[#0B6B6B]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            <div className="flex items-center gap-2.5 pl-1">
              <span className="text-base leading-none">{course.icon}</span>
              <span className={`text-[13px] font-medium leading-tight ${isActive ? "text-[#0B6B6B]" : ""}`}>
                {course.label}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className={`
                text-[10px] font-semibold px-1.5 py-0.5 rounded-full
                ${isActive
                  ? "bg-[#0B6B6B]/15 text-[#0B6B6B]"
                  : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                }
              `}>
                {course.count}
              </span>
              <svg
                className={`h-3 w-3 transition-transform duration-200 ${isActive ? "translate-x-0.5 text-[#0B6B6B]" : "text-gray-300 group-hover:text-gray-400"}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        );
      })}
    </div>
  );
}
