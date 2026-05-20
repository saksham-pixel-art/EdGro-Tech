/**
 * TrustStrip — Premium Partner Universities Section
 * EdGro Tech | Redesigned: no cropping, no overlap, premium carousel
 */
import { motion } from "framer-motion";
import { ShieldCheck, Award, GraduationCap, BookCheck, MapPin, Star, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { useUniversities } from "@/api/queries";

// ── Accreditation badges ──────────────────────────────────────────────────────
const BADGES = [
  { icon: ShieldCheck, label: "UGC-DEB Approved" },
  { icon: Award,       label: "NAAC A+ Partners" },
  { icon: BookCheck,   label: "AICTE Recognized" },
  { icon: GraduationCap, label: "WES Accepted" },
];

// ── Stats strip ───────────────────────────────────────────────────────────────
const STATS = [
  { value: "30+",    label: "Partner Universities" },
  { value: "200+",   label: "Online Programs" },
  { value: "12,400+",label: "Students Enrolled" },
  { value: "NAAC A+",label: "Minimum Grade" },
];

// ── University Card ───────────────────────────────────────────────────────────
function UniCard({ u, style }: { u: any; style?: React.CSSProperties }) {
  return (
    <Link
      to="/universities/$slug"
      params={{ slug: u.slug }}
      style={style}
      className="group flex-shrink-0 w-[260px] sm:w-[280px] rounded-2xl border border-white/[0.08]
                 bg-[#141820] overflow-hidden
                 hover:border-[#C6904D]/50 hover:-translate-y-1.5
                 transition-all duration-300 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)]
                 hover:shadow-[0_8px_32px_-8px_rgba(198,144,77,0.2)]"
    >
      {/* Image */}
      <div className="relative h-[148px] overflow-hidden bg-[#0d1117] flex-shrink-0">
        <img
          src={u.primaryImage}
          alt={`${u.name} campus`}
          loading="lazy"
          decoding="async"
          width={280}
          height={148}
          className="absolute inset-0 h-full w-full object-cover
                     transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141820] via-[#141820]/50 to-transparent" />

        {/* Short name */}
        <div className="absolute bottom-2.5 left-3.5 font-display text-2xl text-white/95 tracking-wider drop-shadow-lg">
          {u.shortName}
        </div>

        {/* Tag badge */}
        {u.tag && (
          <div className="absolute top-3 left-3 text-[9px] uppercase tracking-wider px-2 py-0.5
                          rounded-full bg-[#C6904D]/90 text-[#1F1F1F] font-bold">
            {u.tag}
          </div>
        )}

        {/* NAAC badge */}
        <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5
                        rounded-full bg-black/60 backdrop-blur-sm border border-[#C6904D]/30
                        text-[10px] text-[#C6904D] font-semibold">
          <Star className="h-2.5 w-2.5 fill-[#C6904D]" />
          NAAC {u.naacGrade}
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-3.5">
        <h3 className="font-display text-[15px] leading-snug mb-1.5
                       text-white/90 group-hover:text-[#E0A86A] transition-colors">
          {u.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-white/40">
            <MapPin className="h-3 w-3 text-[#C6904D]/60" />
            {u.city}
          </div>
          <div className="text-[11px] text-white/30">
            {u.programs}+ programs
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Infinite marquee row (CSS-based, no JS animation loop) ────────────────────
function MarqueeRow({ items, reverse = false }: { items: any[]; reverse?: boolean }) {
  // Triple the items so the loop is seamless at any viewport width
  const tripled = [...items, ...items, ...items];
  const duration = items.length * 8; // ~8s per card

  return (
    <div className="flex overflow-hidden" style={{ maskImage: "none" }}>
      <div
        className="flex gap-4 shrink-0"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee-forward"} ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {tripled.map((u, i) => (
          <UniCard key={`${u.slug}-${i}`} u={u} />
        ))}
      </div>
    </div>
  );
}

// ── Main TrustStrip ───────────────────────────────────────────────────────────
export function TrustStrip() {
  const { data: universities = [] } = useUniversities();
  const row1 = universities.slice(0, Math.ceil(universities.length / 2));
  const row2 = universities.slice(Math.ceil(universities.length / 2));

  return (
    <section
      id="universities"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d1117 0%, #111620 50%, #0d1117 100%)" }}
    >
      {/* Background glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px]
                      bg-[#C6904D]/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r
                      from-transparent via-[#C6904D]/20 to-transparent" />

      {/* ── Section header ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
        <Reveal className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                          border border-[#C6904D]/25 bg-[#C6904D]/[0.06] mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C6904D] animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#C6904D] font-semibold">
              Trusted University Partners
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            Learn from India's{" "}
            <span className="text-gradient-gold-anim">Top Universities</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-base leading-relaxed">
            Explore online and professional programs from leading accredited universities —
            all UGC-DEB approved, NAAC graded, and placement-backed.
          </p>
        </Reveal>

        {/* Accreditation badges */}
        <Reveal delay={1} className="flex flex-wrap justify-center gap-2.5 mb-14">
          {BADGES.map((b) => (
            <div
              key={b.label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                         border border-[#C6904D]/20 bg-[#C6904D]/[0.05] text-sm
                         hover:border-[#C6904D]/40 hover:bg-[#C6904D]/[0.08]
                         transition-all duration-200 cursor-default"
            >
              <b.icon className="h-3.5 w-3.5 text-[#C6904D]" />
              <span className="text-white/75 text-[13px]">{b.label}</span>
            </div>
          ))}
        </Reveal>
      </div>

      {/* ── Marquee rows ───────────────────────────────────────────────── */}
      <div className="relative mb-5">
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-40 z-10 pointer-events-none"
             style={{ background: "linear-gradient(to right, #0d1117, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 z-10 pointer-events-none"
             style={{ background: "linear-gradient(to left, #0d1117, transparent)" }} />

        <MarqueeRow items={row1} />
      </div>

      <div className="relative mb-14">
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-40 z-10 pointer-events-none"
             style={{ background: "linear-gradient(to right, #111620, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 z-10 pointer-events-none"
             style={{ background: "linear-gradient(to left, #111620, transparent)" }} />

        <MarqueeRow items={row2.length >= 3 ? row2 : universities.slice(3)} reverse />
      </div>

      {/* ── Stats strip ────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm
                          grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.06]
                          overflow-hidden mb-10">
            {STATS.map((s) => (
              <div key={s.label} className="px-6 py-5 text-center">
                <div className="font-display text-2xl lg:text-3xl text-gradient-gold mb-1">
                  {s.value}
                </div>
                <div className="text-[11px] text-white/40 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── View all CTA ─────────────────────────────────────────────── */}
        <Reveal delay={1} className="flex flex-col sm:flex-row items-center justify-between gap-4
                                      rounded-2xl border border-[#C6904D]/15 bg-[#C6904D]/[0.04]
                                      px-6 py-5">
          <div>
            <p className="text-white/80 font-medium text-sm">
              <span className="text-[#E0A86A] font-semibold">30+ partner universities</span> across India
            </p>
            <p className="text-white/35 text-xs mt-0.5">
              NAAC A+ to A++ · UGC-DEB approved · Placement-backed programs
            </p>
          </div>
          <Link
            to="/universities"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl
                       border border-[#C6904D]/30 text-[#C6904D] text-sm font-semibold
                       hover:bg-[#C6904D] hover:text-[#1F1F1F] hover:border-[#C6904D]
                       transition-all duration-200 group"
          >
            View All Universities
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </Reveal>
      </div>

      {/* ── CSS keyframes ──────────────────────────────────────────────── */}
      <style>{`
        @keyframes marquee-forward {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(calc(-100% / 3)); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
