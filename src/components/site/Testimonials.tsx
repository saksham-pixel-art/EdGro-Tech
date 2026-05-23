import { Star, Quote } from "lucide-react";
import { Reveal } from "./Reveal";

const TESTIMONIALS = [
  {
    name: "Aarav Sharma",
    role: "MBA, Amity University Online",
    content: "EdGro Tech made the entire admission process seamless. Their AI counselor helped me find the perfect MBA program, and their human experts guided me through the fee structures. I'm now placed at a top MNC!",
    rating: 5,
    image: "/images/testimonials/student_1.png"
  },
  {
    name: "Priya Patel",
    role: "BBA, Manipal University Jaipur",
    content: "I was confused about which university to choose for my BBA. The comparison tools and transparent fee structures on EdGro Tech gave me the confidence to make the right choice. Highly recommended!",
    rating: 5,
    image: "/images/testimonials/student_2.png"
  },
  {
    name: "Rahul Desai",
    role: "MCA, Shoolini University",
    content: "The end-to-end support is real. From document verification to getting my admission letter, it took just a few days. Their lifetime career support is an incredible bonus that no one else offers.",
    rating: 5,
    image: "/images/testimonials/student_3.png"
  }
];

export function Testimonials() {
  return (
    <section className="relative py-24 lg:py-32 bg-ink border-y border-border overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Student Success Stories</div>
          <h2 className="font-display text-4xl lg:text-5xl leading-tight mb-5">
            Hear from our <span className="text-gradient-gold-anim">Alumni</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Discover how EdGro Tech has transformed careers by helping students secure admissions in top-tier universities.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, idx) => (
            <Reveal
              key={testimonial.name}
              delay={(Math.min(idx % 3 + 1, 3) as 1 | 2 | 3)}
              className="group relative rounded-2xl border border-border bg-card p-8 hover:border-gold/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-gold/10 group-hover:text-gold/20 transition-colors" />
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-gold/20 shrink-0 bg-muted">
                  <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="font-display text-sm group-hover:text-gold transition-colors">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                "{testimonial.content}"
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
