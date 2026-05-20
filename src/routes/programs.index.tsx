import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ChatbotWidget } from "@/components/site/ChatbotWidget";
import { CounselingModal } from "@/components/site/CounselingModal";
import { Toaster } from "@/components/ui/sonner";
import { PROGRAMS } from "@/lib/edgro-data";
import { Clock, IndianRupee, GraduationCap, ArrowRight, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCounselingModal } from "@/hooks/use-counseling-modal";

export const Route = createFileRoute("/programs/")({
  component: ProgramsPage,
});

const CATEGORIES = ["All", "Postgraduate", "Undergraduate", "Certification"] as const;

function ProgramsPage() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const filtered = filter === "All" ? PROGRAMS : PROGRAMS.filter((p) => p.category === filter);
  const { open, openModal, closeModal } = useCounselingModal();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
          <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Discover Programs</div>
            <h1 className="font-display text-4xl lg:text-6xl leading-tight max-w-3xl">
              200+ programs.<br />
              <span className="text-gradient-gold">One that fits your career.</span>
            </h1>
            <p className="mt-5 text-muted-foreground max-w-2xl">
              UGC-approved online degrees and certifications from India's top universities.
              Filter by goal, level, and budget — our counselors shortlist the best fit in 24 hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                    filter === c
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <article key={p.slug} className="group relative rounded-2xl border border-border bg-card p-6 hover:border-gold/40 hover:-translate-y-1 hover:shadow-card transition-all flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/20">{p.tag}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.category}</div>
                  </div>
                  <h3 className="font-display text-2xl mb-2">{p.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.desc}</p>
                  <div className="space-y-2 text-xs text-muted-foreground border-t border-border pt-4 mb-4">
                    <div className="flex items-center gap-2"><IndianRupee className="h-3.5 w-3.5 text-gold" /> {p.feesRange}</div>
                    <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-gold" /> {p.duration}</div>
                    <div className="flex items-center gap-2"><GraduationCap className="h-3.5 w-3.5 text-gold" /> {p.universities} universities</div>
                    <div className="flex items-center gap-2"><Users className="h-3.5 w-3.5 text-gold" /> {p.eligibility}</div>
                  </div>
                  <div className="mb-5">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Specializations</div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.specializations.slice(0, 4).map((s) => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded-full border border-border text-foreground/80">{s}</span>
                      ))}
                      {p.specializations.length > 4 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full text-muted-foreground">+{p.specializations.length - 4} more</span>
                      )}
                    </div>
                  </div>
                  <div className="mb-5 p-3 rounded-lg bg-background/50 border border-border">
                    <div className="text-[10px] uppercase tracking-wider text-gold mb-2 flex items-center gap-1.5"><Target className="h-3 w-3" /> Career Outcomes</div>
                    <ul className="space-y-1">
                      {p.outcomes.map((o) => (
                        <li key={o} className="text-xs text-foreground/80">• {o}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto flex gap-2">
                    <Button variant="premium" size="sm" className="flex-1" onClick={openModal}>
                      Get Counseling
                    </Button>
                    <Button asChild variant="outlineGold" size="sm">
                      <Link to="/programs/$slug" params={{ slug: p.slug }}>
                        View Universities <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <ChatbotWidget />
      <CounselingModal open={open} onClose={closeModal} />
      <Toaster position="top-center" />
    </div>
  );
}
