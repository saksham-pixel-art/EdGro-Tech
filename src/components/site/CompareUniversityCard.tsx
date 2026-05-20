import { Star, MapPin, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type UniversityDto } from "@/api/client";
import { motion } from "framer-motion";

export function CompareUniversityCard({
  u,
  onApply,
}: {
  u: UniversityDto;
  onApply: () => void;
}) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-gold/30 transition-all duration-300 shadow-[var(--shadow-card)] flex flex-col h-full"
    >
      {/* Dynamic Image Header */}
      <div className="relative h-32 overflow-hidden bg-charcoal">
        <img
          src={u.primaryImage}
          alt={`${u.name} campus`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1113] via-[#0F1113]/40 to-transparent" />
        
        {/* Logo if available */}
        {u.logo && (
          <div className="absolute -bottom-4 left-4 h-12 w-12 rounded-xl border border-border bg-background p-1.5 shadow-lg z-10">
            <img src={u.logo} alt="Logo" className="h-full w-full object-contain" />
          </div>
        )}
      </div>

      <div className="p-5 pt-6 flex flex-col flex-1">
        <div className="text-[10px] uppercase tracking-wider text-gold mb-2 flex items-center gap-1.5">
          <Star className="h-3 w-3 fill-gold" /> {u.naacGrade} · NAAC
        </div>
        
        <div className="font-display text-lg mb-2 leading-tight group-hover:text-gold transition-colors">
          {u.name}
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 pb-4 border-b border-border/50">
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {u.city}</span>
          <span className="text-border">·</span>
          <span className="flex items-center gap-1 text-emerald-400"><TrendingUp className="h-3 w-3" /> {u.placement}</span>
        </div>

        <div className="space-y-2 text-xs text-muted-foreground mb-6 flex-1">
          {u.highlights.slice(0, 3).map((h) => (
            <div key={h} className="flex items-start gap-1.5">
              <Sparkles className="h-3 w-3 text-gold/60 mt-0.5 shrink-0" />
              <span>{h}</span>
            </div>
          ))}
        </div>
        
        <Button variant="premium" size="sm" className="w-full mt-auto group-hover:shadow-[0_0_15px_rgba(198,144,77,0.2)] transition-shadow" onClick={onApply}>
          Apply to {u.shortName}
        </Button>
      </div>
    </motion.div>
  );
}
