import { useCountUp } from "@/hooks/use-reveal";
import { Reveal } from "./Reveal";

const STATS = [
  { value: 12400, suffix: "+", label: "Students Enrolled", sub: "Across India & abroad" },
  { value: 30, suffix: "+", label: "Universities Partnered", sub: "All UGC-DEB approved" },
  { value: 98, suffix: "%", label: "Admission Success Rate", sub: "On counseled applications" },
  { value: 48, suffix: "/5", label: "Student Rating", sub: "Based on 2,000+ reviews", divide: 10 },
];

function StatNumber({ target, suffix, divide }: { target: number; suffix: string; divide?: number }) {
  const { ref, value } = useCountUp(target);
  const display = divide ? (value / divide).toFixed(1) : value.toLocaleString();
  return (
    <span ref={ref} className="font-display text-4xl lg:text-5xl text-gradient-gold-anim">
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="rounded-3xl border border-border bg-gradient-to-br from-card via-ink to-card p-10 lg:p-14 relative overflow-hidden noise">
          <div className="absolute inset-0 bg-aurora opacity-60 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl" />

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`${i !== 0 ? "lg:border-l lg:border-border lg:pl-6" : ""}`}
              >
                <div className="mb-2">
                  <StatNumber target={s.value} suffix={s.suffix} divide={s.divide} />
                </div>
                <div className="text-sm font-medium text-foreground mb-1">{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.sub}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
