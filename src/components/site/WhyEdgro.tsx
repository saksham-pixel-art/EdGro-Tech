import { ShieldCheck, Users, TrendingUp, Clock, Award, HeartHandshake } from "lucide-react";
import { Reveal } from "./Reveal";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "100% Verified Universities",
    desc: "Every partner is UGC-DEB approved and NAAC accredited. We never list diploma mills or unrecognized institutions — your degree will be valid everywhere.",
  },
  {
    icon: Users,
    title: "Human + AI Counseling",
    desc: "Our AI shortlists in minutes. Our senior counselors close the gaps. You get the speed of technology with the empathy of a real expert who's done this 10,000+ times.",
  },
  {
    icon: TrendingUp,
    title: "Outcome-First Approach",
    desc: "We recommend programs based on your career ROI, not our commission. Every suggestion is benchmarked against real placement data from our 12,400+ alumni.",
  },
  {
    icon: Clock,
    title: "End-to-End in 7 Days",
    desc: "From first call to admission letter — our team handles documents, applications, and fee submission. Most students get enrolled within a week.",
  },
  {
    icon: Award,
    title: "Transparent Fee Structure",
    desc: "No hidden charges. No surprise fees. We show you the exact university fee, EMI options, and scholarship eligibility upfront — before you commit to anything.",
  },
  {
    icon: HeartHandshake,
    title: "Lifetime Career Support",
    desc: "We don't disappear after enrollment. Resume building, mock interviews, and access to our 500+ hiring partner network — for as long as you need it.",
  },
];

export function WhyEdgro() {
  return (
    <section className="relative py-24 lg:py-32 bg-ink border-y border-border overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Why Choose Us</div>
          <h2 className="font-display text-4xl lg:text-5xl leading-tight mb-5">
            Why students choose{" "}
            <span className="text-gradient-gold-anim">EdGro Tech</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Thousands of admission platforms exist. Here's what makes EdGro Tech the one
            students trust when their career is on the line.
          </p>
        </Reveal>

        {/* Reasons grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((r, idx) => (
            <Reveal
              key={r.title}
              delay={(Math.min(idx % 3 + 1, 3) as 1 | 2 | 3)}
              className="group relative rounded-2xl border border-border bg-card p-7 hover:border-gold/40 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon */}
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gold/20 to-transparent border border-gold/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <r.icon className="h-5 w-5 text-gold" />
              </div>

              <h3 className="font-display text-xl mb-3 group-hover:text-gold transition-colors">
                {r.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>

              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-gold/8 to-transparent rounded-tr-2xl pointer-events-none" />
            </Reveal>
          ))}
        </div>

        {/* Bottom trust bar */}
        <Reveal className="mt-14">
          <div className="rounded-2xl border border-gold/20 bg-gradient-to-r from-gold/5 via-transparent to-gold/5 p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="font-display text-2xl lg:text-3xl text-gradient-gold mb-1">
                12,400+ students can't be wrong.
              </div>
              <p className="text-sm text-muted-foreground">
                Join India's most trusted admission platform. Free counseling, zero pressure.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-center shrink-0">
              {[
                { v: "12,400+", l: "Students" },
                { v: "98%", l: "Success Rate" },
                { v: "4.8★", l: "Avg Rating" },
                { v: "₹0", l: "Counseling Fee" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl text-gold">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
