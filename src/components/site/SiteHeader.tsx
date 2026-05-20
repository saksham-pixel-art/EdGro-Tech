/**
 * SiteHeader — Premium Mega-Menu Navbar v2
 * EdGro Tech | Dark gold theme | Separate Universities + Courses menus
 */
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Menu, ChevronDown, GraduationCap, BookOpen, Sparkles, Bot } from "lucide-react";

import logo from "@/assets/edgro-logo-new.png";
import { Button } from "@/components/ui/button";
import { CounselingModal } from "@/components/site/CounselingModal";
import { useCounselingModal } from "@/hooks/use-counseling-modal";
import { UniversityMegaMenu } from "@/components/site/mega-menu/UniversityMegaMenu";
import { CoursesMegaMenu } from "@/components/site/mega-menu/CoursesMegaMenu";
import { MobileMenu } from "@/components/site/mega-menu/MobileMenu";
import { UNIVERSITIES, PROGRAMS } from "@/lib/edgro-data";

// ── Types ─────────────────────────────────────────────────────────────────────
type ActiveMenu = "universities" | "courses" | null;

// ── Search overlay ────────────────────────────────────────────────────────────
function SearchOverlay({ onClose }: { onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    
    const unis = UNIVERSITIES.filter(u => 
      u.name.toLowerCase().includes(q) || 
      u.short.toLowerCase().includes(q) ||
      u.city.toLowerCase().includes(q)
    ).slice(0, 3);
    
    const progs = PROGRAMS.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    ).slice(0, 3);
    
    return { universities: unis, programs: progs };
  }, [query]);

  const popular = [
    "MBA in Business Analytics",
    "MCA in ML & AI",
    "BCA Cloud Security",
    "Online MBA NMIMS",
    "Data Science LPU",
    "MBA FinTech",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.97 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/[0.1]"
        style={{ background: "linear-gradient(145deg, #1a1f2e 0%, #141820 100%)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.08]">
          <Search className="h-5 w-5 text-white/30 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search universities, programs, specializations…"
            className="flex-1 text-base text-white/90 placeholder-white/25 outline-none bg-transparent"
          />
          <button onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
            <X className="h-4 w-4 text-white/40" />
          </button>
        </div>

        {/* Results Body */}
        {!results ? (
          <div className="px-5 py-4">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/25 font-semibold mb-3">
              Popular Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {popular.map((q) => (
                <button key={q}
                        onClick={() => setQuery(q)}
                        className="px-3 py-1.5 rounded-full text-[12px] font-medium
                                   bg-white/[0.05] text-white/50 border border-white/[0.08]
                                   hover:bg-[#C6904D]/[0.1] hover:text-[#C6904D] hover:border-[#C6904D]/25
                                   transition-all duration-150">
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="px-5 py-4 flex flex-col gap-5">
            {/* Universities */}
            {results.universities.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/25 font-semibold mb-3">
                  Universities
                </p>
                <div className="flex flex-col gap-1">
                  {results.universities.map(u => (
                    <Link key={u.slug} to="/universities/$slug" params={{ slug: u.slug }} onClick={onClose}
                          className="flex items-center gap-3 px-3 py-2 -mx-3 rounded-xl hover:bg-white/[0.05] transition-colors group">
                      <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-1 overflow-hidden shrink-0">
                        {(u as any).logo ? <img src={(u as any).logo} alt={u.short} className="h-full w-full object-contain" /> : <GraduationCap className="h-4 w-4 text-white/50" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-white group-hover:text-[#C6904D] transition-colors truncate">{u.name}</div>
                        <div className="text-[11px] text-white/50 truncate">{u.city} • NAAC {u.naac}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Programs */}
            {results.programs.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/25 font-semibold mb-3">
                  Programs
                </p>
                <div className="flex flex-col gap-1">
                  {results.programs.map(p => (
                    <Link key={p.slug} to="/programs/$slug" params={{ slug: p.slug }} onClick={onClose}
                          className="flex items-center gap-3 px-3 py-2 -mx-3 rounded-xl hover:bg-white/[0.05] transition-colors group">
                      <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <BookOpen className="h-4 w-4 text-white/50" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-white group-hover:text-[#C6904D] transition-colors truncate">{p.name}</div>
                        <div className="text-[11px] text-white/50 truncate">{p.category}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {results.universities.length === 0 && results.programs.length === 0 && (
              <div className="py-4 text-center text-sm text-white/50">
                No results found for "{query}"
              </div>
            )}
          </div>
        )}

        {/* Quick links */}
        <div className="px-5 pb-4 flex items-center gap-3 border-t border-white/[0.08] pt-4">
          <Link to="/universities" onClick={onClose}
                className="flex items-center gap-1.5 text-[12px] text-white/35 hover:text-[#C6904D] transition-colors">
            <GraduationCap className="h-3.5 w-3.5" /> All Universities
          </Link>
          <span className="text-white/15">·</span>
          <Link to="/programs" onClick={onClose}
                className="flex items-center gap-1.5 text-[12px] text-white/35 hover:text-[#C6904D] transition-colors">
            <BookOpen className="h-3.5 w-3.5" /> All Programs
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── NavButton (mega trigger) ──────────────────────────────────────────────────
interface NavButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

function NavButton({ label, icon, isActive, onMouseEnter, onMouseLeave, onClick }: NavButtonProps) {
  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium
                  transition-all duration-200 group
                  ${isActive
                    ? "text-white bg-white/[0.07]"
                    : "text-white/55 hover:text-white hover:bg-white/[0.05]"
                  }`}
    >
      <span className={`transition-colors ${isActive ? "text-[#C6904D]" : "text-white/35 group-hover:text-white/60"}`}>
        {icon}
      </span>
      {label}
      <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.2 }}>
        <ChevronDown className="h-3.5 w-3.5 opacity-40" />
      </motion.div>

      {/* Gold underline */}
      {isActive && (
        <motion.div
          layoutId={`nav-underline-${label}`}
          className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
          style={{ background: "linear-gradient(90deg, #C6904D, #E0A86A)" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </button>
  );
}

// ── Main SiteHeader ───────────────────────────────────────────────────────────
export function SiteHeader() {
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { open: modalOpen, openModal, closeModal } = useCounselingModal();
  const routerState = useRouterState();

  // Scroll shadow
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [routerState.location.pathname]);

  const openMenu = useCallback((menu: ActiveMenu) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(menu);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 130);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const closeMenu = useCallback(() => setActiveMenu(null), []);

  return (
    <>
      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "shadow-[0_1px_0_0_rgba(255,255,255,0.05),0_12px_40px_-8px_rgba(0,0,0,0.6)]"
            : "border-b border-white/[0.05]"
        }`}
        style={{ background: scrolled ? "rgba(13,17,23,0.97)" : "rgba(13,17,23,0.88)", backdropFilter: "blur(20px)" }}
      >
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8 h-[72px] flex items-center justify-between">

          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-3.5 group flex-shrink-0">
            {/* CSS Crop to extract just the EG Icon */}
            <div className="h-11 w-11 rounded-lg overflow-hidden border border-white/10 bg-[#0a0a0a] flex items-start justify-center shadow-[0_0_15px_rgba(198,144,77,0.05)] group-hover:border-[#C6904D]/40 transition-colors duration-300">
              <img src={logo} alt="EdGro Tech" className="w-[145%] max-w-none h-auto -mt-1.5" />
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-[19px] leading-none tracking-tight">
                <span className="text-gradient-gold drop-shadow-sm">EdGro</span>
                <span className="text-white/90"> Tech</span>
              </div>
              <div className="text-[9px] uppercase tracking-[0.32em] text-white/40 mt-1 font-medium">
                Private Limited
              </div>
            </div>
          </Link>

          {/* ── Desktop nav ──────────────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {/* Universities trigger */}
            <NavButton
              label="Universities"
              icon={<GraduationCap className="h-3.5 w-3.5" />}
              isActive={activeMenu === "universities"}
              onMouseEnter={() => openMenu("universities")}
              onMouseLeave={scheduleClose}
              onClick={() => setActiveMenu(p => p === "universities" ? null : "universities")}
            />

            {/* Courses trigger */}
            <NavButton
              label="Courses"
              icon={<BookOpen className="h-3.5 w-3.5" />}
              isActive={activeMenu === "courses"}
              onMouseEnter={() => openMenu("courses")}
              onMouseLeave={scheduleClose}
              onClick={() => setActiveMenu(p => p === "courses" ? null : "courses")}
            />

            {/* Static links */}
            {[
              { label: "Compare", to: "/compare" as const },
              { label: "Blog",    to: "/blog"    as const },
              { label: "About",   to: "/about"   as const },
              { label: "Contact", to: "/contact" as const },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative px-3.5 py-2 rounded-xl text-sm font-medium text-white/55
                           hover:text-white hover:bg-white/[0.05] transition-all duration-200"
                activeProps={{ className: "text-white bg-white/[0.07]" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ── Right actions ─────────────────────────────────────────── */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center justify-center h-9 w-9 rounded-xl
                         text-white/40 hover:text-white hover:bg-white/[0.06]
                         transition-all duration-200"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* AI Assistant pill */}
            <button
              onClick={openModal}
              className="hidden md:flex items-center gap-1.5 h-9 px-3.5 rounded-xl text-[12px] font-medium
                         text-white/50 border border-white/[0.08] hover:border-[#C6904D]/30
                         hover:text-[#C6904D] hover:bg-[#C6904D]/[0.06] transition-all duration-200"
            >
              <Bot className="h-3.5 w-3.5" />
              AI Counselor
            </button>

            {/* CTA */}
            <Button
              variant="premium"
              size="sm"
              className="hidden sm:inline-flex text-[13px] px-4 h-9"
              onClick={openModal}
            >
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Free Counseling
            </Button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="lg:hidden flex items-center justify-center h-9 w-9 rounded-xl
                         text-white/55 hover:text-white hover:bg-white/[0.06]
                         transition-all duration-200"
              aria-label="Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div key="x"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Mega menus (desktop) ──────────────────────────────────────── */}
        <div
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          className="relative"
        >
          <UniversityMegaMenu isOpen={activeMenu === "universities"} onClose={closeMenu} />
          <CoursesMegaMenu    isOpen={activeMenu === "courses"}      onClose={closeMenu} />
        </div>

        {/* ── Mobile menu ───────────────────────────────────────────────── */}
        <MobileMenu
          isOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          onCounselingOpen={openModal}
        />
      </header>

      {/* ── Search overlay ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {searchOpen && <SearchOverlay key="search" onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>

      {/* ── Counseling modal ────────────────────────────────────────────── */}
      <CounselingModal open={modalOpen} onClose={closeModal} />
    </>
  );
}
