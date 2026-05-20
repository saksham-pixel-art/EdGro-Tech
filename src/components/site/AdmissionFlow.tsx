import { Phone, Search, FileCheck, GraduationCap } from "lucide-react";

const STEPS = [
  { icon: Phone, title: "Free Counseling", desc: "Talk to our expert. Share goals, budget, eligibility." },
  { icon: Search, title: "Choose University", desc: "Side-by-side comparison. Pick the best-fit program." },
  { icon: FileCheck, title: "Apply", desc: "We handle docs, application & fee submission for you." },
  { icon: GraduationCap, title: "Get Admission", desc: "Letter in hand. Onboarding & student support begins." },
];

export function AdmissionFlow() {
  return (
    <section className="relative py-24 lg:py-32 bg-ink border-y border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
            How It Works
          </div>
          <h2 className="font-display text-4xl lg:text-5xl leading-tight">
            From confused to <span className="text-gradient-gold">enrolled</span>, in 4 simple steps.
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          {STEPS.map((s, i) => (
            <div key={s.title} className="relative">
              <div className="relative bg-card border border-border rounded-2xl p-6 hover:border-gold/40 transition-colors">
                <div className="absolute -top-4 left-6 h-8 w-8 rounded-full bg-charcoal border border-gold/40 flex items-center justify-center text-xs text-gold font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gold/20 to-transparent border border-gold/20 flex items-center justify-center mb-4 mt-2">
                  <s.icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="font-display text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
