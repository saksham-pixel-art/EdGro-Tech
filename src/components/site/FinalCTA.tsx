import { LeadForm } from "./LeadForm";

export function FinalCTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
            Take the next step
          </div>
          <h2 className="font-display text-4xl lg:text-6xl leading-[1.05] mb-6">
            Your career upgrade <br />
            starts with one <span className="text-gradient-gold">free call.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
            No pressure. No commitment. Just a 15-minute conversation with an
            expert who will map out your best-fit program, university, and
            payment plan.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              "Personalized university shortlist",
              "Fee + EMI options walkthrough",
              "Eligibility & document checklist",
              "Side-by-side ROI comparison",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-foreground/90">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <LeadForm />
      </div>
    </section>
  );
}
