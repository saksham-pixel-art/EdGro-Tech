import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Star, MapPin, BadgeCheck, CheckCircle2, Sparkles, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type University } from "@/lib/edgro-data";

export function UniversityHeroBanner({
  uni,
  onCounselingOpen,
  dynamicImage,
  dynamicLogo,
}: {
  uni: University;
  onCounselingOpen: () => void;
  dynamicImage?: string;
  dynamicLogo?: string;
}) {
  return (
    <div className="relative overflow-hidden min-h-[500px] flex items-center group">
      {/* ── Background image with overlay and shimmer ──────────────────────── */}
      <div className="absolute inset-0 bg-charcoal">
        <img
          src={dynamicImage || (uni as any).image}
          alt={uni.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          loading="eager"
        />
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background:
              "linear-gradient(to right, rgba(15,17,19,0.98) 0%, rgba(15,17,19,0.92) 40%, rgba(15,17,19,0.6) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute inset-0 bg-aurora opacity-30 pointer-events-none mix-blend-overlay" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-3xl relative">
          {/* Subtle glow behind content */}
          <div className="absolute -inset-10 bg-gold/5 blur-3xl rounded-full pointer-events-none" />
          
          <nav className="relative flex items-center gap-2 text-xs text-muted-foreground mb-6 backdrop-blur-sm bg-background/20 w-fit px-3 py-1.5 rounded-full border border-white/5">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/universities" className="hover:text-gold transition-colors">Universities</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{uni.short}</span>
          </nav>

          {uni.tag && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-bold tracking-wider mb-5 shadow-[0_0_15px_rgba(198,144,77,0.3)]"
            >
              <Star className="h-3 w-3 fill-gold" />
              {uni.tag.toUpperCase()}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center gap-5 mb-5"
          >
            {(dynamicLogo || (uni as any).logo) && (
              <div className="h-16 w-16 lg:h-24 lg:w-24 rounded-2xl overflow-hidden border border-gold/20 bg-white/5 flex-shrink-0 backdrop-blur-md shadow-xl group-hover:border-gold/50 transition-colors duration-500">
                <img src={dynamicLogo || (uni as any).logo} alt={`${uni.name} logo`} className="h-full w-full object-contain p-2 lg:p-3" />
              </div>
            )}
            <div>
              <h1 className="font-display text-4xl lg:text-6xl leading-tight text-white drop-shadow-md">
                {uni.name}
              </h1>
              <div className="flex items-center gap-3 mt-3 text-sm text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-gold" />
                  {uni.city}
                </span>
                <span className="text-border">·</span>
                <span>Est. {uni.established}</span>
              </div>
            </div>
          </motion.div>

          {/* Accreditations */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-wrap gap-2 mb-7"
          >
            {/* NAAC Grade specifically highlighted */}
            <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-gold/50 bg-gold/20 text-gold font-bold shadow-sm">
              <BadgeCheck className="h-3.5 w-3.5" />
              NAAC {uni.naac}
            </span>
            {uni.highlights?.slice(0, 4).map((acc) => (
              <span
                key={acc}
                className="flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-foreground/90 font-medium backdrop-blur-md hover:border-gold/30 hover:bg-gold/5 transition-colors"
              >
                {acc}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-wrap gap-4"
          >
            <Button variant="premium" size="xl" onClick={onCounselingOpen} className="glow-gold font-semibold shadow-xl">
              <Sparkles className="h-4 w-4 mr-2" />
              Get Free Counseling
            </Button>
            <Button variant="outlineGold" size="xl" onClick={onCounselingOpen} className="bg-background/40 backdrop-blur-md">
              <Phone className="h-4 w-4 mr-2" />
              Request Callback
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
