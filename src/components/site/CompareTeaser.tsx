import { Check, X, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ROWS = [
  { label: "Total Fees", a: "₹1.75L", b: "₹2.20L", c: "₹1.40L" },
  { label: "Duration", a: "24 months", b: "24 months", c: "24 months" },
  { label: "Accreditation", a: "NAAC A+", b: "NAAC A++", c: "NAAC A" },
  { label: "Avg Placement", a: "₹8.2 LPA", b: "₹9.6 LPA", c: "₹6.8 LPA" },
  { label: "Live Classes", a: true, b: true, c: false },
  { label: "Industry Mentor", a: true, b: true, c: true },
  { label: "Capstone Project", a: true, b: true, c: false },
  { label: "Alumni Network", a: "60K+", b: "120K+", c: "35K+" },
];

const UNIS = [
  { name: "Manipal University Jaipur", tag: "Recommended", roi: "+185%" },
  { name: "NMIMS University", tag: "Premium", roi: "+220%" },
  { name: "Amity University", tag: "Popular", roi: "+140%" },
];

export function CompareTeaser() {
  return (
    <section id="compare" className="relative py-24 lg:py-32 bg-ink border-y border-border overflow-hidden">
      <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
            Our Core Differentiator
          </div>
          <h2 className="font-display text-4xl lg:text-5xl leading-tight mb-4">
            Compare universities <span className="text-gradient-gold">side by side.</span>
          </h2>
          <p className="text-muted-foreground">
            Fees, accreditation, placement, ROI — all in one screen. No more
            jumping across 20 brochures.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card shadow-elegant overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr] border-b border-border">
            <div className="p-5 lg:p-6 text-xs uppercase tracking-wider text-muted-foreground hidden sm:block">
              Compare
            </div>
            <div className="p-5 lg:p-6 text-xs uppercase tracking-wider text-muted-foreground sm:hidden">
              &nbsp;
            </div>
            {UNIS.map((u, i) => (
              <div
                key={u.name}
                className={`p-5 lg:p-6 border-l border-border ${
                  i === 1 ? "bg-gold/5" : ""
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider text-gold mb-1">{u.tag}</div>
                <div className="font-display text-sm lg:text-base leading-tight">{u.name}</div>
                <div className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-400">
                  <TrendingUp className="h-3 w-3" /> ROI {u.roi}
                </div>
              </div>
            ))}
          </div>

          {/* Body rows */}
          {ROWS.map((row, idx) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1.2fr_1fr_1fr_1fr] ${
                idx % 2 === 0 ? "bg-background/30" : ""
              }`}
            >
              <div className="p-4 lg:p-5 text-sm text-muted-foreground">{row.label}</div>
              {[row.a, row.b, row.c].map((v, i) => (
                <div
                  key={i}
                  className={`p-4 lg:p-5 border-l border-border text-sm ${
                    i === 1 ? "bg-gold/5 text-foreground font-medium" : "text-foreground/90"
                  }`}
                >
                  {typeof v === "boolean" ? (
                    v ? <Check className="h-4 w-4 text-gold" /> : <X className="h-4 w-4 text-muted-foreground/50" />
                  ) : (
                    v
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="premium" size="lg">
            <a href="#lead">Get my custom comparison report</a>
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            Sample shown — real comparison built around your profile in 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
