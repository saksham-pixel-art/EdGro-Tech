import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ChatbotWidget } from "@/components/site/ChatbotWidget";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, Award, Users, Globe, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About EdGro Tech — India's Premium EdTech Partner" },
      { name: "description", content: "EdGro Tech makes premium online education accessible. 12,400+ students enrolled across 30+ partner universities with AI-driven counseling." },
      { property: "og:title", content: "About EdGro Tech" },
      { property: "og:description", content: "Mission, vision, and the team behind India's premium admission partner." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Target, t: "Outcome-First", d: "Every recommendation is benchmarked against career ROI, not commission." },
  { icon: Heart, t: "Student-Centric", d: "Lifetime career support. We don't disappear after enrollment." },
  { icon: Sparkles, t: "AI-Powered", d: "Our AI counselor surfaces the right fit in minutes, not weeks." },
  { icon: Award, t: "Premium Network", d: "Only NAAC-accredited, UGC-approved partners. No diploma mills." },
];

const STATS = [
  { v: "12,400+", l: "Students Guided" },
  { v: "30+", l: "Partner Universities" },
  { v: "98%", l: "Admission Rate" },
  { v: "4.8/5", l: "Counseling NPS" },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
          <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">About EdGro Tech</div>
            <h1 className="font-display text-4xl lg:text-6xl leading-tight max-w-3xl">
              Education that <span className="text-gradient-gold">opens doors,</span><br />
              not just degrees.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl leading-relaxed">
              EdGro Tech is a premium EdTech platform connecting ambitious learners with
              India's most respected universities. We blend human counselors with AI guidance
              to make degree decisions clear, transparent, and outcome-driven — all the way
              from shortlisting to placement.
            </p>
          </div>
        </section>

        <section className="py-16 border-y border-border bg-ink">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.l} className="text-center">
                <div className="font-display text-4xl lg:text-5xl text-gradient-gold">{s.v}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12">
            <div className="rounded-3xl border border-border bg-card p-8 lg:p-10">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gold/20 to-transparent border border-gold/20 flex items-center justify-center mb-5">
                <Target className="h-5 w-5 text-gold" />
              </div>
              <h2 className="font-display text-3xl mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                Make premium online education accessible to every Indian — regardless of city,
                income, or background. Help 1 million working professionals upskill into
                higher-paying careers by 2030 through trusted university partnerships and
                AI-driven guidance.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-8 lg:p-10">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gold/20 to-transparent border border-gold/20 flex items-center justify-center mb-5">
                <Eye className="h-5 w-5 text-gold" />
              </div>
              <h2 className="font-display text-3xl mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                Build India's most trusted EdTech brand — where students don't choose a degree
                because of marketing, but because data, mentors, and outcomes pointed them
                there. Education that compounds for a lifetime.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-border bg-ink">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">What We Stand For</div>
              <h2 className="font-display text-4xl lg:text-5xl">Our <span className="text-gradient-gold">core values.</span></h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {VALUES.map((v) => (
                <div key={v.t} className="rounded-2xl border border-border bg-card p-6 hover:border-gold/40 transition-colors">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gold/20 to-transparent border border-gold/20 flex items-center justify-center mb-4">
                    <v.icon className="h-4 w-4 text-gold" />
                  </div>
                  <h3 className="font-display text-lg mb-2">{v.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/10 to-transparent p-10 lg:p-16 text-center">
              <Users className="h-10 w-10 text-gold mx-auto mb-4" />
              <h2 className="font-display text-3xl lg:text-5xl mb-4">
                Ready to find <span className="text-gradient-gold">your degree?</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Talk to a senior counselor in 24 hours. No spam, no pressure — just clarity.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="premium" size="lg">
                  <Link to="/" hash="lead">Get Free Counseling</Link>
                </Button>
                <Button asChild variant="outlineGold" size="lg">
                  <Link to="/contact">Contact Us <Globe className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <ChatbotWidget />
      <Toaster position="top-center" />
    </div>
  );
}
