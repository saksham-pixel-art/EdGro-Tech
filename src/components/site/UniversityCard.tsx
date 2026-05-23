import { Link, useNavigate } from "@tanstack/react-router";
import { MapPin, Star, TrendingUp, Users, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type UniversityDto } from "@/api/client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";

export function UniversityCard({
  u,
  onApply,
}: {
  u: UniversityDto;
  onApply?: () => void;
}) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group rounded-2xl border border-border bg-card overflow-hidden
                 hover:border-gold/50 transition-all duration-500
                 shadow-[var(--shadow-card)] hover:shadow-[0_8px_30px_rgba(198,144,77,0.15)] flex flex-col cursor-pointer"
      onClick={() => navigate({ to: "/universities/$slug", params: { slug: u.slug } })}
      role="article"
      aria-label={u.name}
    >
      {/* ── Image with 16:9 Aspect Ratio and Shimmer Effect ──────────────────────── */}
      <div className="relative aspect-video overflow-hidden bg-charcoal flex-shrink-0">
        <Image
          src={u.primaryImage}
          alt={`${u.name} campus`}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
          containerClassName="absolute inset-0 h-full w-full"
        />
        {/* Soft dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1113]/90 via-[#0F1113]/30 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent" />

        {/* Short name */}
        <div className="absolute bottom-4 left-5 font-display text-2xl lg:text-3xl text-white tracking-wider drop-shadow-md">
          {u.shortName}
        </div>

        {/* Tag badge */}
        {u.tag && (
          <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.1em] px-2.5 py-1
                          rounded-full bg-gold text-charcoal font-bold shadow-[0_0_10px_rgba(198,144,77,0.5)]">
            {u.tag}
          </div>
        )}

        {/* NAAC badge */}
        <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1
                        rounded-full bg-charcoal/60 backdrop-blur-md border border-gold/40 text-[10px] text-gold font-medium">
          <Star className="h-3 w-3 fill-gold text-gold" /> NAAC {u.naacGrade}
        </div>

        {/* Hover overlay with smooth fade */}
        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100
                        transition-opacity duration-500 flex items-center justify-center pointer-events-none">
          <span className="bg-charcoal/80 backdrop-blur-sm text-gold text-xs font-semibold
                           px-5 py-2.5 rounded-full border border-gold/40 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            View Campus Details →
          </span>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div className="p-6 flex flex-col flex-1 relative z-10 bg-card">
        <h3 className="font-display text-xl leading-tight mb-2 group-hover:text-gold transition-colors duration-300">
          {u.name}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-5">
          <MapPin className="h-3.5 w-3.5" /> {u.city}
          <span className="text-border">·</span>
          <span>Est. {u.established}</span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 text-xs border-t border-border pt-5 mb-5">
          <Stat icon={BookOpen}   label="Programs"      value={`${u.programs}+`} />
          <Stat icon={TrendingUp} label="Avg Placement" value={u.placement || "N/A"} />
          <Stat icon={Users}      label="Alumni"        value={u.alumni || "10K+"} />
          <Stat icon={Star}       label="Fees From"     value={u.feesRange ? u.feesRange.split("–")[0].trim() : "TBD"} />
        </div>

        {/* ── Action buttons ─────────────────────────────────────────── */}
        <div
          className="mt-auto flex gap-3 pt-2"
          onClick={(e) => e.stopPropagation()}
        >
          {onApply && (
            <Button
              variant="premium"
              size="sm"
              className="flex-1 shadow-[var(--shadow-gold)] group-hover:brightness-110 transition-all"
              onClick={onApply}
            >
              Apply Now
            </Button>
          )}

          <Button asChild variant="outlineGold" size="sm" className="flex-1">
            <Link
              to="/universities/$slug"
              params={{ slug: u.slug }}
              className="flex items-center justify-center gap-1.5 w-full"
            >
              Explore <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Stat cell ─────────────────────────────────────────────────────────────────
function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] uppercase tracking-wider mb-1">
        <Icon className="h-3.5 w-3.5 text-gold/80" /> {label}
      </div>
      <div className="text-foreground font-medium truncate">{value}</div>
    </div>
  );
}
