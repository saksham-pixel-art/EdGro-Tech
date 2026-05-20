import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ChatbotWidget } from "@/components/site/ChatbotWidget";
import { CounselingModal } from "@/components/site/CounselingModal";
import { Toaster } from "@/components/ui/sonner";
import { type UniversityDto } from "@/api/client";
import { useUniversities } from "@/api/queries";
import { Check, X, Plus, TrendingUp, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useCounselingModal } from "@/hooks/use-counseling-modal";
import { CompareUniversityCard } from "@/components/site/CompareUniversityCard";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Universities Side-by-Side | EdGro Tech" },
      { name: "description", content: "Compare fees, placement, accreditation, and ROI across India's top online universities. Pick up to 3." },
      { property: "og:title", content: "University Comparison Tool — EdGro Tech" },
      { property: "og:description", content: "Compare up to 3 universities side-by-side. Fees, placement, ROI, accreditation." },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  const [picks, setPicks] = useState<(string | null)[]>(["muj", "nmims", "smu"]);
  const { open, openModal, closeModal } = useCounselingModal();

  const { data: universities = [] } = useUniversities();

  const selected: (UniversityDto | null)[] = picks.map((slug) =>
    slug ? universities.find((u) => u.slug === slug) ?? null : null
  );

  const setPick = (idx: number, slug: string) => {
    const next = [...picks];
    next[idx] = slug;
    setPicks(next);
  };

  const ROWS: { label: string; get: (u: UniversityDto) => string | boolean | number | undefined }[] = [
    { label: "City", get: (u) => u.city },
    { label: "Established", get: (u) => u.established },
    { label: "NAAC", get: (u) => u.naacGrade },
    { label: "Total Programs", get: (u) => `${u.programs}+` },
    { label: "Fees Range", get: (u) => u.feesRange },
    { label: "Avg Placement", get: (u) => u.placement },
    { label: "Alumni Network", get: (u) => u.alumni },
    { label: "UGC-DEB Approved", get: () => true },
    { label: "Live Classes", get: () => true },
    { label: "Industry Mentor", get: () => true },
    { label: "Placement Support", get: () => true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-10 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Compare Tool</div>
            <h1 className="font-display text-4xl lg:text-6xl leading-tight max-w-3xl mx-auto">
              Compare universities <br />
              <span className="text-gradient-gold">side by side.</span>
            </h1>
            <p className="mt-5 text-muted-foreground max-w-2xl mx-auto">
              Pick up to 3. See fees, placement, accreditation, and ROI in one screen.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="rounded-3xl border border-border bg-card shadow-elegant overflow-hidden">
              {/* Picker row */}
              <div className="grid grid-cols-[1fr_repeat(3,1fr)] border-b border-border">
                <div className="p-5 lg:p-6 text-xs uppercase tracking-wider text-muted-foreground hidden md:block">
                  Select Universities
                </div>
                <div className="md:hidden p-5 text-xs uppercase tracking-wider text-muted-foreground">&nbsp;</div>
                {selected.map((u, i) => (
                  <div key={i} className={`p-4 lg:p-5 border-l border-border ${i === 1 ? "bg-gold/5" : ""}`}>
                    <Select value={picks[i] ?? ""} onValueChange={(v) => setPick(i, v)}>
                      <SelectTrigger className="bg-background border-border text-xs lg:text-sm">
                        <SelectValue placeholder={<><Plus className="h-3 w-3 inline mr-1" /> Add</>} />
                      </SelectTrigger>
                      <SelectContent className="max-h-72">
                        {universities.map((opt) => (
                          <SelectItem key={opt.slug} value={opt.slug} className="text-xs">
                            {opt.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {u && (
                      <div className="mt-3 hidden lg:block">
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                          <MapPin className="h-2.5 w-2.5" /> {u.city}
                        </div>
                        <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-emerald-400">
                          <TrendingUp className="h-2.5 w-2.5" /> {u.placement}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Body rows */}
              {ROWS.map((row, idx) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[1fr_repeat(3,1fr)] ${idx % 2 === 0 ? "bg-background/30" : ""}`}
                >
                  <div className="p-4 lg:p-5 text-xs lg:text-sm text-muted-foreground">{row.label}</div>
                  {selected.map((u, i) => (
                    <div
                      key={i}
                      className={`p-4 lg:p-5 border-l border-border text-xs lg:text-sm ${
                        i === 1 ? "bg-gold/5 text-foreground font-medium" : "text-foreground/90"
                      }`}
                    >
                      {!u ? (
                        <span className="text-muted-foreground/40">—</span>
                      ) : (() => {
                        const v = row.get(u);
                        if (typeof v === "boolean") return v ? <Check className="h-4 w-4 text-gold" /> : <X className="h-4 w-4 text-muted-foreground/50" />;
                        return v;
                      })()}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-4">
              {selected.map((u, i) => u && (
                <CompareUniversityCard key={i} u={u} onApply={openModal} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button variant="outlineGold" size="lg" onClick={openModal}>
                Get a personalized comparison report
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                Our counselor builds a custom report around your profile in 24 hours.
              </p>
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
