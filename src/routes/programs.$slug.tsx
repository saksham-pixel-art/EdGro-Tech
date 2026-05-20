import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PROGRAMS, UNIVERSITIES, PROGRAM_UNIVERSITIES } from "@/lib/edgro-data";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ChatbotWidget } from "@/components/site/ChatbotWidget";
import { CounselingModal } from "@/components/site/CounselingModal";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { useCounselingModal } from "@/hooks/use-counseling-modal";
import {
  Clock, IndianRupee, GraduationCap, Users, Target, Star,
  MapPin, TrendingUp, ShieldCheck, ArrowRight, BookOpen, Award,
} from "lucide-react";

export const Route = createFileRoute("/programs/$slug")({
  loader: ({ params }) => {
    const program = PROGRAMS.find((p) => p.slug === params.slug);
    if (!program) throw notFound();
    return program;
  },
  component: ProgramDetailPage,
});

function ProgramDetailPage() {
  const program = Route.useLoaderData();
  const { open, openModal, closeModal } = useCounselingModal();

  // Get all universities offering this program with their specific course details
  const entries = PROGRAM_UNIVERSITIES[program.slug] ?? [];
  const uniDetails = entries
    .map((entry) => {
      const uni = UNIVERSITIES.find((u) => u.slug === entry.universitySlug);
      return uni ? { uni, entry } : null;
    })
    .filter(Boolean) as { uni: (typeof UNIVERSITIES)[number]; entry: (typeof entries)[number] }[];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
          <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link to="/programs" className="hover:text-foreground transition-colors">Programs</Link>
              <span>/</span>
              <span className="text-gold">{program.name}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/20">
                {program.tag}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {program.category}
              </span>
            </div>

            <h1 className="font-display text-4xl lg:text-6xl leading-tight max-w-3xl mb-4">
              {program.name}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed mb-8">
              {program.desc}
            </p>

            {/* Quick stats bar */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: IndianRupee, label: "Fees Range", value: program.feesRange },
                { icon: Clock,       label: "Duration",   value: program.duration },
                { icon: GraduationCap, label: "Universities", value: `${uniDetails.length} offering` },
                { icon: Users,       label: "Eligibility", value: program.eligibility },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                    <s.icon className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                    <div className="text-sm font-medium text-foreground">{s.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* ── LEFT — University cards ──────────────────────────────────── */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl lg:text-3xl">
                  Universities Offering <span className="text-gradient-gold">{program.name}</span>
                </h2>
                <span className="text-sm text-muted-foreground">{uniDetails.length} universities</span>
              </div>

              {/* Fees comparison table */}
              <div className="rounded-2xl border border-border overflow-hidden mb-10">
                <div className="bg-card/80 px-5 py-3 border-b border-border">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                    Fees Comparison Table
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[560px]">
                    <thead>
                      <tr className="border-b border-border bg-background/40">
                        <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">University</th>
                        <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">Course</th>
                        <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">Fee</th>
                        <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">Duration</th>
                        <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">NAAC</th>
                        <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">Placement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {uniDetails.map(({ uni, entry }, i) => (
                        <tr
                          key={`${uni.slug}-${i}`}
                          className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-background/20" : "bg-card/30"}`}
                        >
                          <td className="px-5 py-3 font-medium text-foreground">{uni.name}</td>
                          <td className="px-5 py-3 text-muted-foreground text-xs">{entry.courseName}</td>
                          <td className="px-5 py-3 text-gold font-semibold">{entry.fee}</td>
                          <td className="px-5 py-3 text-muted-foreground">{entry.duration}</td>
                          <td className="px-5 py-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[11px] font-medium">
                              <Star className="h-2.5 w-2.5 fill-gold" />{uni.naac}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-emerald-400 font-medium text-xs">{uni.placement}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* University detail cards */}
              <div className="space-y-6">
                {uniDetails.map(({ uni, entry }, i) => (
                  <article
                    key={`${uni.slug}-card-${i}`}
                    className="rounded-2xl border border-border bg-card overflow-hidden hover:border-gold/40 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="relative md:w-56 h-44 md:h-auto shrink-0 overflow-hidden bg-charcoal">
                        <img
                          src={uni.image}
                          alt={`${uni.name} campus`}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-charcoal/80 to-transparent" />
                        <div className="absolute bottom-3 left-3 md:bottom-auto md:top-3">
                          <span className="font-display text-2xl text-white/90 drop-shadow">{uni.short}</span>
                        </div>
                        {uni.tag && (
                          <div className="absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold/90 text-charcoal font-semibold">
                            {uni.tag}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <h3 className="font-display text-xl text-foreground">{uni.name}</h3>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                              <MapPin className="h-3 w-3" />{uni.city} · Est. {uni.established}
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/20">
                            <Star className="h-3 w-3 fill-gold text-gold" />
                            <span className="text-xs font-semibold text-gold">NAAC {uni.naac}</span>
                          </div>
                        </div>

                        {/* Course highlight */}
                        <div className="rounded-xl border border-gold/20 bg-gold/5 px-4 py-3 mb-4">
                          <div className="text-[10px] uppercase tracking-wider text-gold mb-1">This Program</div>
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <span className="font-medium text-foreground">{entry.courseName}</span>
                            <span className="text-gold font-bold">{entry.fee}</span>
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />{entry.duration}
                            </span>
                          </div>
                        </div>

                        {/* Stats grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-xs">
                          <div>
                            <div className="text-muted-foreground mb-0.5">Avg Placement</div>
                            <div className="font-semibold text-emerald-400">{uni.placement}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground mb-0.5">Alumni</div>
                            <div className="font-semibold text-foreground">{uni.alumni}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground mb-0.5">Total Programs</div>
                            <div className="font-semibold text-foreground">{uni.programs}+</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground mb-0.5">Placement Partners</div>
                            <div className="font-semibold text-foreground">{uni.placementPartners}+</div>
                          </div>
                        </div>

                        {/* Accreditations */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {uni.accreditations.map((a) => (
                            <span key={a} className="text-[10px] px-2 py-0.5 rounded-full border border-border text-foreground/70">
                              {a}
                            </span>
                          ))}
                        </div>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {uni.highlights.map((h) => (
                            <span key={h} className="flex items-center gap-1 text-[11px] text-muted-foreground">
                              <ShieldCheck className="h-3 w-3 text-gold shrink-0" />{h}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex gap-2">
                          <Button variant="premium" size="sm" className="flex-1" onClick={openModal}>
                            Apply Now — {entry.fee}
                          </Button>
                          <Button asChild variant="outlineGold" size="sm">
                            <Link to="/compare">Compare <ArrowRight className="ml-1 h-3 w-3" /></Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* ── RIGHT SIDEBAR ────────────────────────────────────────────── */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 space-y-5">
                {/* CTA card */}
                <div className="rounded-2xl border border-gold/30 bg-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-gold" />
                    <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">Free Counseling</span>
                  </div>
                  <h3 className="font-display text-xl mb-2">Not sure which university?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our experts shortlist the best-fit university for your budget and goals in 24 hours.
                  </p>
                  <Button variant="premium" size="sm" className="w-full" onClick={openModal}>
                    Get Free Counseling
                  </Button>
                </div>

                {/* Program overview */}
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gold mb-4 font-medium">Program Overview</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Fees Range</span>
                      <span className="font-medium text-gold">{program.feesRange}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{program.duration}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Eligibility</span>
                      <span className="font-medium text-right max-w-[140px]">{program.eligibility}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Universities</span>
                      <span className="font-medium">{uniDetails.length}</span>
                    </li>
                  </ul>
                </div>

                {/* Specializations */}
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gold mb-4 font-medium">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {program.specializations.map((s: string) => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-full border border-border text-foreground/80">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Career outcomes */}
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gold mb-4 font-medium flex items-center gap-1.5">
                    <Target className="h-3.5 w-3.5" /> Career Outcomes
                  </h3>
                  <ul className="space-y-2">
                    {program.outcomes.map((o: string) => (
                      <li key={o} className="flex items-start gap-2 text-sm text-foreground/80">
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />{o}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Other programs */}
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gold mb-4 font-medium">Other Programs</h3>
                  <Button asChild variant="outlineGold" size="sm" className="w-full">
                    <Link to="/programs">
                      <Award className="h-3.5 w-3.5 mr-1.5" /> View All Programs
                    </Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
      <ChatbotWidget />
      <CounselingModal open={open} onClose={closeModal} />
      <Toaster position="top-center" />
    </div>
  );
}
