/**
 * PartnerUniversities — Infinite Marquee University Showcase
 * Two rows of university cards scrolling left ↔ right continuously.
 * Row 1: left  (→ direction)
 * Row 2: right (← direction, reversed)
 */

import { useState } from "react";
import {
  Star, MapPin, ShieldCheck, Award, BookCheck,
  GraduationCap, ArrowRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { useUniversities } from "@/api/queries";
import { type UniversityDto } from "@/api/client";
import { UNIVERSITIES } from "@/lib/edgro-data";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const BADGES = [
  { icon: ShieldCheck,   label: "UGC-DEB Approved" },
  { icon: Award,         label: "NAAC A+ Partners" },
  { icon: BookCheck,     label: "AICTE Recognized" },
  { icon: GraduationCap, label: "WES Accepted" },
];

// ─────────────────────────────────────────────────────────────────────────────
// SINGLE MARQUEE CARD
// ─────────────────────────────────────────────────────────────────────────────
function MarqueeCard({ u }: { u: UniversityDto }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      to="/universities/$slug"
      params={{ slug: u.slug }}
      aria-label={`View ${u.name}`}
      className="group relative flex-shrink-0 w-[260px] rounded-2xl overflow-hidden
                 border border-white/[0.08] hover:border-gold/50
                 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.8)]
                 hover:shadow-[0_12px_40px_-8px_rgba(198,144,77,0.25)]
                 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
      style={{ willChange: "transform" }}
    >
      {/* ── Photo / gradient header ─────────────────────────────────── */}
      <div className="relative h-[170px] overflow-hidden bg-[#0d1017]">

        {/* Hue gradient base — always visible */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(145deg,
              hsl(${u.hue},52%,24%) 0%,
              hsl(${u.hue + 18},42%,15%) 55%,
              hsl(${u.hue - 8},32%,9%) 100%)`,
            opacity: loaded ? 0 : 1,
            transition: "opacity 0.7s",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 30% 40%,
              hsl(${u.hue},58%,32%) 0%, transparent 60%)`,
            opacity: loaded ? 0 : 0.45,
            transition: "opacity 0.7s",
          }}
        />

        {/* Campus photo */}
        {u.primaryImage && (
          <img
            src={u.primaryImage}
            alt={`${u.name} campus`}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover
                        transition-all duration-700
                        group-hover:scale-105 group-hover:brightness-110
                        ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        )}

        {/* Cinematic dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10]/95 via-[#0a0c10]/35 to-transparent" />

        {/* Gold atmosphere on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100
                     transition-opacity duration-600 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 100%, rgba(198,144,77,0.13) 0%, transparent 65%)",
          }}
        />

        {/* Gold border glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                     transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(198,144,77,0.4), 0 0 24px -4px rgba(198,144,77,0.2)",
          }}
        />

        {/* NAAC badge */}
        <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1
                        px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md
                        border border-gold/35 text-[10px] text-gold font-semibold
                        shadow-[0_0_10px_rgba(198,144,77,0.2)]">
          <Star className="h-2.5 w-2.5 fill-gold shrink-0" />
          NAAC {u.naacGrade}
        </div>

        {/* Tag badge */}
        {u.tag && (
          <div className="absolute top-3 left-3 z-10 text-[9px] uppercase
                          tracking-[0.12em] px-2.5 py-1 rounded-full
                          bg-gold/90 text-[#1a1208] font-bold
                          shadow-[0_0_14px_rgba(198,144,77,0.5)]">
            {u.tag}
          </div>
        )}

        {/* Short name */}
        <div className="absolute bottom-3 left-4 z-10">
          <span className="font-display text-[2rem] tracking-[0.1em] text-white/90
                           group-hover:text-white transition-colors duration-300
                           drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {u.shortName}
          </span>
        </div>
      </div>

      {/* ── Card body ────────────────────────────────────────────────── */}
      <div className="relative px-4 pt-3 pb-4 bg-[#0a0c10] border-t border-white/[0.05]">
        {/* Sliding gold accent line */}
        <div className="absolute top-0 left-0 h-px w-0 group-hover:w-full
                        bg-gradient-to-r from-transparent via-gold/50 to-transparent
                        transition-all duration-700 ease-out" />

        <p className="text-[13.5px] font-semibold text-white/90 leading-snug mb-1.5
                      group-hover:text-gold transition-colors duration-300 line-clamp-1">
          {u.name}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-white/40">
            <MapPin className="h-3 w-3 text-gold/50 shrink-0" />
            <span>{u.city}</span>
          </div>
          <span className="text-[10px] text-white/30 tabular-nums">
            {u.programs}+ programs
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MARQUEE ROW — infinite CSS scroll, pauses on hover
// ─────────────────────────────────────────────────────────────────────────────
function MarqueeRow({
  items,
  reverse = false,
  speed = 40,
}: {
  items: UniversityDto[];
  reverse?: boolean;
  speed?: number; // seconds per full loop
}) {
  // Triple the items so the loop is seamless at any viewport width
  const tripled = [...items, ...items, ...items];

  return (
    <div
      className="flex overflow-hidden group/row"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        className="flex gap-4 shrink-0"
        style={{
          animation: `${reverse ? "marquee-rtl" : "marquee-ltr"} ${speed}s linear infinite`,
          willChange: "transform",
          // Pause on row hover
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
        }}
      >
        {tripled.map((u, i) => (
          <MarqueeCard key={`${u.slug}-${i}`} u={u} />
        ))}
      </div>

      {/* Keyframes injected inline */}
      <style>{`
        @keyframes marquee-ltr {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes marquee-rtl {
          0%   { transform: translateX(calc(-100% / 3)); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON ROW
// ─────────────────────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex-shrink-0 w-[260px] rounded-2xl overflow-hidden border border-white/[0.05] animate-pulse">
          <div className="h-[170px] bg-white/[0.04]" />
          <div className="px-4 pt-3 pb-4 bg-[#0a0c10] space-y-2">
            <div className="h-3 w-3/4 rounded bg-white/[0.06]" />
            <div className="h-2.5 w-1/2 rounded bg-white/[0.04]" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export function PartnerUniversities() {
  const { data: apiUniversities = [], isLoading } = useUniversities();

  // Static fallback when backend is offline
  const staticFallback: UniversityDto[] = UNIVERSITIES.map((u) => ({
    id: 0,
    slug: u.slug,
    name: u.name,
    shortName: u.short,
    city: u.city,
    naacGrade: u.naac,
    hue: u.hue,
    primaryImage: u.image ?? "",
    heroImage: "",
    thumbnailImage: "",
    logo: u.logo,
    established: u.established,
    programs: u.programs,
    feesMin: 0,
    feesMax: 0,
    feesRange: u.feesRange,
    placement: u.placement,
    alumni: u.alumni,
    tag: u.tag as UniversityDto["tag"],
    highlights: u.highlights,
  }));

  const universities = apiUniversities.length > 0 ? apiUniversities : staticFallback;

  // Split into two rows
  const mid  = Math.ceil(universities.length / 2);
  const row1 = universities.slice(0, mid);
  const row2 = universities.slice(mid).length >= 3
    ? universities.slice(mid)
    : universities.slice(3); // fallback if too few

  return (
    <section
      id="partner-universities"
      className="relative py-20 lg:py-28 overflow-hidden border-b border-border"
      style={{
        background:
          "linear-gradient(180deg, #09090d 0%, #0d1017 30%, #0f1219 65%, #0d1017 100%)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px]
                   rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(198,144,77,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Edge fade bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(198,144,77,0.15), transparent)",
        }}
      />
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-[0.18] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">

        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <Reveal className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6
                          border border-gold/25 bg-gold/[0.07]">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
              Trusted Partnerships
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-[3.25rem]
                         leading-[1.1] tracking-tight mb-5">
            Admissions to India's{" "}
            <span className="text-gradient-gold-anim">most respected</span>
            {" "}universities
          </h2>

          <p className="text-white/50 max-w-lg mx-auto text-base leading-relaxed">
            30+ partner universities, 200+ programs, one team to guide you end-to-end.
          </p>
        </Reveal>

        {/* ── ACCREDITATION BADGES ───────────────────────────────────── */}
        <Reveal delay={1} className="flex flex-wrap justify-center gap-2.5 mb-12">
          {BADGES.map((b) => (
            <motion.div
              key={b.label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-default
                         border border-gold/20 bg-gold/[0.05]
                         hover:border-gold/40 hover:bg-gold/[0.09]
                         transition-all duration-300"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <b.icon className="h-3.5 w-3.5 text-gold shrink-0" />
              <span className="text-[13px] text-white/75 font-medium whitespace-nowrap">
                {b.label}
              </span>
            </motion.div>
          ))}
        </Reveal>
      </div>

      {/* ── MARQUEE ROWS — full bleed, no max-w constraint ─────────────── */}
      {isLoading ? (
        <div className="space-y-4 px-5 lg:px-8 mb-10">
          <SkeletonRow />
          <SkeletonRow />
        </div>
      ) : (
        <div className="space-y-4 mb-10">
          <MarqueeRow items={row1} reverse={false} speed={35} />
          <MarqueeRow items={row2} reverse={true}  speed={40} />
        </div>
      )}

      {/* ── FOOTER BAR ─────────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal delay={2}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4
                          rounded-2xl border border-gold/[0.12] bg-gold/[0.04]
                          px-6 py-4 backdrop-blur-sm">
            <p className="text-sm text-white/50 text-center sm:text-left">
              <span className="text-gold/80 font-semibold">30+</span>{" "}
              partner universities across India
              <span className="mx-2 text-white/20">·</span>
              <span className="text-white/35">NAAC A+ to A++ · UGC-DEB approved</span>
            </p>

            <Link
              to="/universities"
              className="flex-shrink-0 inline-flex items-center gap-2
                         px-5 py-2.5 rounded-xl text-sm font-semibold
                         border border-gold/30 text-gold
                         hover:bg-gold hover:text-[#1a1208] hover:border-gold
                         transition-all duration-300 group"
            >
              View All Universities
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
