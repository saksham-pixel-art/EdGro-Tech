import heroImg from "@/assets/hero-student.jpg";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { CounselingModal } from "./CounselingModal";
import { useCounselingModal } from "@/hooks/use-counseling-modal";

export function Hero() {
  const { open, openModal, closeModal } = useCounselingModal();

  return (
    <section className="relative overflow-hidden noise">
      {/* Decorative bg layers */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-aurora pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-gold/10 blur-3xl pointer-events-none animate-floaty" />
      <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full bg-silver/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-16 lg:pt-24 pb-20 lg:pb-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left — copy */}
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs uppercase tracking-[0.2em] mb-6 backdrop-blur">
              <Sparkles className="h-3 w-3" />
              India's Premium Admission Partner
            </div>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              Transform your <br />
              career with a <br />
              <span className="text-gradient-gold-anim">degree that delivers.</span>
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Get admitted to India's top UGC-approved universities — Online MBA, BBA,
              Data Science & more. Personalized counseling, end-to-end admission
              support, and AI-powered guidance, all in one place.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild variant="premium" size="xl" className="pulse-gold">
                <a href="#programs">
                  Explore Programs <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outlineGold" size="xl" onClick={openModal}>
                Get Free Counseling
              </Button>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs text-silver">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" />
              UGC-DEB · NAAC A+ · AICTE · WES Accepted
            </div>
          </Reveal>

          {/* Mini stats */}
          <Reveal delay={4}>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { v: "12,400+", l: "Students Guided" },
                { v: "30+", l: "Top Universities" },
                { v: "98%", l: "Admission Rate" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl text-gradient-gold">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right — hero image */}
        <Reveal delay={2} className="relative">
          <div className="relative rounded-3xl overflow-hidden ring-1 ring-border shadow-elegant aspect-[4/5] lg:aspect-[5/6] tilt-card">
            <img
              src={heroImg}
              alt="Confident graduate at university campus"
              className="absolute inset-0 h-full w-full object-cover"
              width={800}
              height={960}
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
            {/* Floating chip */}
            <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal/70 backdrop-blur border border-gold/30 text-[11px] text-gold animate-floaty">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              Live counselors online
            </div>
            {/* CTA overlay at bottom of image */}
            <div className="absolute bottom-6 left-6 right-6">
              <button
                onClick={openModal}
                className="w-full py-3.5 rounded-xl text-sm font-semibold text-[#1F1F1F] transition-all hover:brightness-110 hover:scale-[1.02] active:scale-100"
                style={{ background: "linear-gradient(135deg, #E0A86A 0%, #C6904D 50%, #8E5F2E 100%)", boxShadow: "0 8px 32px rgba(198,144,77,0.45)" }}
              >
                🎓 Get Free Counseling — No Charges
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Modal */}
      <CounselingModal open={open} onClose={closeModal} />
    </section>
  );
}
