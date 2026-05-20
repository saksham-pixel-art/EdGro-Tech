/**
 * LegalPageLayout — shared shell for all legal/policy pages.
 * Provides: hero, sticky TOC sidebar, reading progress bar,
 * section rendering, and consistent Edgro Tech branding.
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Clock, ArrowUp } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ChatbotWidget } from "@/components/site/ChatbotWidget";
import { Toaster } from "@/components/ui/sonner";

// ── Types ─────────────────────────────────────────────────────────────────────
export interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface LegalPageProps {
  badge: string;           // e.g. "Privacy Policy"
  title: React.ReactNode;  // headline — can include <span> for gold word
  subtitle: string;
  lastUpdated: string;     // e.g. "January 1, 2025"
  effectiveDate: string;
  sections: LegalSection[];
  warningNote?: string;    // optional top-level warning box
}

// ── Reading progress bar ──────────────────────────────────────────────────────
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-gold-deep via-gold to-gold-soft transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// ── Sticky TOC ────────────────────────────────────────────────────────────────
function TableOfContents({
  sections,
  activeId,
}: {
  sections: LegalSection[];
  activeId: string;
}) {
  return (
    <nav className="sticky top-24 space-y-1" aria-label="Table of contents">
      <p className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold mb-4">
        Contents
      </p>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all duration-200 group
            ${activeId === s.id
              ? "bg-gold/10 text-gold border border-gold/25"
              : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
            }`}
        >
          <ChevronRight
            className={`h-3 w-3 shrink-0 transition-transform duration-200
              ${activeId === s.id ? "text-gold" : "text-muted-foreground/40 group-hover:translate-x-0.5"}`}
          />
          <span className="leading-snug">{s.title}</span>
        </a>
      ))}
    </nav>
  );
}

// ── Back to top ───────────────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() { setVisible(window.scrollY > 600); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-6 z-40 h-10 w-10 rounded-full
                 border border-gold/30 bg-card/90 backdrop-blur-sm
                 flex items-center justify-center text-gold
                 hover:bg-gold hover:text-charcoal hover:border-gold
                 transition-all duration-300 shadow-[var(--shadow-card)]"
      aria-label="Back to top"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}

// ── Info / Warning card ───────────────────────────────────────────────────────
export function InfoCard({
  children,
  variant = "info",
}: {
  children: React.ReactNode;
  variant?: "info" | "warning" | "important";
}) {
  const styles = {
    info: "border-gold/20 bg-gold/[0.05] text-gold/80",
    warning: "border-amber-500/25 bg-amber-500/[0.06] text-amber-400/90",
    important: "border-red-500/20 bg-red-500/[0.05] text-red-400/80",
  };
  const icons = { info: "ℹ️", warning: "⚠️", important: "🔴" };

  return (
    <div className={`rounded-xl border px-5 py-4 text-sm leading-relaxed my-5 ${styles[variant]}`}>
      <span className="mr-2">{icons[variant]}</span>
      {children}
    </div>
  );
}

// ── Section block ─────────────────────────────────────────────────────────────
export function LegalSectionBlock({ section }: { section: LegalSection }) {
  return (
    <div
      id={section.id}
      className="scroll-mt-28 rounded-2xl border border-border bg-card p-7 lg:p-9
                 hover:border-gold/20 transition-colors duration-300"
    >
      <h2 className="font-display text-xl lg:text-2xl mb-5 text-foreground leading-snug">
        {section.title}
      </h2>
      <div className="prose-legal">{section.content}</div>
    </div>
  );
}

// ── Prose helpers (exported for use in page files) ────────────────────────────
export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground leading-relaxed mb-4 last:mb-0">{children}</p>;
}

export function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="space-y-2 mb-4 last:mb-0">
      {children}
    </ul>
  );
}

export function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold/60 shrink-0" />
      <span>{children}</span>
    </li>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[13px] font-semibold text-foreground/90 uppercase tracking-wider mb-2 mt-5 first:mt-0">
      {children}
    </h3>
  );
}

export function Highlight({ children }: { children: React.ReactNode }) {
  return <strong className="text-foreground font-semibold">{children}</strong>;
}

// ── Main layout ───────────────────────────────────────────────────────────────
export function LegalPageLayout({
  badge,
  title,
  subtitle,
  lastUpdated,
  effectiveDate,
  sections,
  warningNote,
}: LegalPageProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection observer to track active section
  useEffect(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [sections]);

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <SiteHeader />

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative pt-20 pb-14 lg:pt-32 lg:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
          <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-gold">{badge}</span>
            </div>

            <div className="text-[11px] uppercase tracking-[0.3em] text-gold mb-4 font-semibold">
              Legal & Compliance
            </div>

            <h1 className="font-display text-4xl lg:text-6xl leading-tight max-w-3xl mb-5">
              {title}
            </h1>

            <p className="text-muted-foreground max-w-2xl leading-relaxed mb-8">
              {subtitle}
            </p>

            {/* Meta badges */}
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                              border border-gold/20 bg-gold/[0.06] text-xs text-gold font-medium">
                <Clock className="h-3 w-3" />
                Last updated: {lastUpdated}
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                              border border-border bg-card text-xs text-muted-foreground">
                Effective: {effectiveDate}
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                              border border-border bg-card text-xs text-muted-foreground">
                Jurisdiction: India
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTENT ──────────────────────────────────────────────────── */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12 xl:gap-16">

              {/* Sticky TOC — desktop only */}
              <aside className="hidden lg:block">
                <TableOfContents sections={sections} activeId={activeId} />
              </aside>

              {/* Main content */}
              <div className="space-y-5 min-w-0">
                {/* Optional warning note */}
                {warningNote && (
                  <InfoCard variant="important">{warningNote}</InfoCard>
                )}

                {sections.map((s) => (
                  <LegalSectionBlock key={s.id} section={s} />
                ))}

                {/* Contact footer */}
                <div className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.06] to-transparent p-7">
                  <h3 className="font-display text-lg mb-2">Questions about this policy?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contact our compliance team at{" "}
                    <a href="mailto:hr@edgrotech.in" className="text-gold hover:underline">
                      hr@edgrotech.in
                    </a>{" "}
                    or call{" "}
                    <a href="tel:+918796346455" className="text-gold hover:underline">
                      +91 87963 46455
                    </a>
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gold
                               hover:underline transition-colors"
                  >
                    Contact Us <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ChatbotWidget />
      <BackToTop />
      <Toaster position="top-center" />
    </div>
  );
}
