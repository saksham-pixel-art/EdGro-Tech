import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturedUniversityCard } from "@/components/site/FeaturedUniversityCard";
import { useUniversities } from "@/api/queries";

export function UniversityCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: universities = [] } = useUniversities();

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const featured = universities.filter(u => u.tag === "Premium" || u.tag === "Recommended" || u.tag === "Popular");

  if (featured.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-background overflow-hidden border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-10 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-gold/60" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-medium">Top Ranked</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl leading-tight">
            Featured <span className="text-gradient-gold">Universities</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Explore our most highly sought-after university partners, renowned for their academic excellence and world-class placements.
          </p>
        </div>
        
        <div className="hidden sm:flex gap-2">
          <Button variant="outline" size="icon" onClick={() => scroll("left")} className="h-10 w-10 rounded-full border-border hover:border-gold hover:text-gold transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => scroll("right")} className="h-10 w-10 rounded-full border-border hover:border-gold hover:text-gold transition-colors">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featured.map((u) => (
            <div key={u.slug} className="snap-start shrink-0 w-[85vw] sm:w-[350px] lg:w-[400px]">
              <FeaturedUniversityCard u={u} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
