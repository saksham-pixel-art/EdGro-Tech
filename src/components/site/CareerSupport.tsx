import { FileText, Briefcase, Users } from "lucide-react";

const ITEMS = [
  {
    icon: FileText,
    title: "Resume Building",
    desc: "1-on-1 sessions with HR experts. Industry-tailored resumes that pass ATS filters.",
  },
  {
    icon: Users,
    title: "Interview Prep",
    desc: "Mock interviews with senior managers from Fortune 500s. Real feedback, real prep.",
  },
  {
    icon: Briefcase,
    title: "Placement Support",
    desc: "Access to our 500+ hiring partner network. Lifetime job board access.",
  },
];

export function CareerSupport() {
  return (
    <section className="relative py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
            Beyond Admission
          </div>
          <h2 className="font-display text-4xl lg:text-5xl leading-tight">
            We don't stop at the offer letter.
          </h2>
          <p className="text-muted-foreground mt-4">
            Career support that continues until you land the role you deserve.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {ITEMS.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl border border-border bg-card p-7 hover:border-gold/40 transition-colors"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gold/20 to-transparent border border-gold/20 flex items-center justify-center mb-5">
                <it.icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-display text-xl mb-2">{it.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
