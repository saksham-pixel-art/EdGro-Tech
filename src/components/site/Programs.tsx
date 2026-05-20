import { Briefcase, Code2, GraduationCap, Laptop, Clock, IndianRupee, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

const PROGRAMS = [
  {
    icon: Briefcase,
    slug: "online-mba",
    name: "Online MBA",
    tag: "Most Popular",
    desc: "Specializations in Marketing, Finance, HR, Business Analytics & more.",
    fees: "₹85K – ₹2.4L",
    duration: "24 months",
    universities: 14,
  },
  {
    icon: GraduationCap,
    slug: "online-bba",
    name: "Online BBA",
    tag: "Career Starter",
    desc: "UGC-approved bachelor's for working students and 12th pass-outs.",
    fees: "₹85K – ₹1.75L",
    duration: "36 months",
    universities: 10,
  },
  {
    icon: Code2,
    slug: "online-mca",
    name: "Online MCA",
    tag: "Tech Pro",
    desc: "Advanced software, cloud, AI/ML, and full-stack skills for IT careers.",
    fees: "₹95K – ₹2.75L",
    duration: "24 months",
    universities: 11,
  },
  {
    icon: Laptop,
    slug: "online-bca",
    name: "Online BCA",
    tag: "Tech Path",
    desc: "BCA from top NAAC-accredited universities — 100% online.",
    fees: "₹85K – ₹1.54L",
    duration: "36 months",
    universities: 8,
  },
];

export function Programs() {
  return (
    <section id="programs" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
              Discover Programs
            </div>
            <h2 className="font-display text-4xl lg:text-5xl leading-tight">
              Pick the right path. <br />
              <span className="text-gradient-gold-anim">We'll handle the rest.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Filter by fees, duration, eligibility & mode. Our experts shortlist
            the best-fit university for your career goal in 24 hours.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROGRAMS.map((p, idx) => (
            <Reveal
              key={p.name}
              delay={(Math.min(idx + 1, 4) as 1 | 2 | 3 | 4)}
            >
              <Link
                to="/programs/$slug"
                params={{ slug: p.slug }}
                className="group relative rounded-2xl border border-border bg-card p-6 hover:border-gold/40 transition-all hover:-translate-y-1 hover:shadow-card tilt-card flex flex-col h-full block"
              >
                <div className="absolute top-5 right-5 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/20">
                  {p.tag}
                </div>

                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gold/25 to-transparent border border-gold/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <p.icon className="h-5 w-5 text-gold" />
                </div>

                <h3 className="font-display text-xl mb-2 group-hover:text-gold transition-colors">{p.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.desc}</p>

                <div className="space-y-2 text-xs text-muted-foreground border-t border-border pt-4 mt-auto">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-3.5 w-3.5 text-gold" /> {p.fees}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-gold" /> {p.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-3.5 w-3.5 text-gold" /> {p.universities} universities
                  </div>
                </div>

                <div className="mt-4 inline-flex items-center text-sm text-gold opacity-80 group-hover:opacity-100">
                  View Universities <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outlineGold" size="lg">
            <Link to="/programs">Browse all 200+ programs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
