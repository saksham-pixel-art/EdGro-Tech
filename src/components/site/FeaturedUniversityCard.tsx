import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { type UniversityDto } from "@/api/client";

export function FeaturedUniversityCard({ u }: { u: UniversityDto }) {
  return (
    <Link to="/universities/$slug" params={{ slug: u.slug }} className="block h-full">
      <motion.div
        whileHover={{ y: -8 }}
        className="group relative h-[400px] w-full min-w-[300px] rounded-3xl overflow-hidden shadow-elegant cursor-pointer border border-border bg-card"
      >
        <img
          src={u.primaryImage}
          alt={u.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
        
        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
          <div className="flex justify-between items-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal/80 backdrop-blur-md border border-gold/40 text-xs text-gold font-bold shadow-sm">
              <Star className="h-3 w-3 fill-gold" /> NAAC {u.naacGrade}
            </div>
            {u.tag && (
              <div className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-gold text-charcoal font-bold shadow-lg">
                {u.tag}
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-display text-2xl lg:text-3xl text-white mb-2 leading-tight drop-shadow-md group-hover:text-gold transition-colors duration-300">
              {u.name}
            </h3>
            <div className="flex items-center justify-between text-white/80">
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <MapPin className="h-4 w-4 text-gold" /> {u.city}
              </div>
              <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center border border-gold/30 group-hover:bg-gold group-hover:text-charcoal transition-colors">
                <ArrowRight className="h-4 w-4 text-gold group-hover:text-charcoal" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
