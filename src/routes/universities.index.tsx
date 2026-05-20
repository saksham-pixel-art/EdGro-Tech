import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ChatbotWidget } from "@/components/site/ChatbotWidget";
import { CounselingModal } from "@/components/site/CounselingModal";
import { Toaster } from "@/components/ui/sonner";
import { useUniversities } from "@/api/queries";
import { type UniversityDto } from "@/api/client";
import { UNIVERSITIES } from "@/lib/edgro-data";
import { MapPin, Star, TrendingUp, Users, BookOpen, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { useCounselingModal } from "@/hooks/use-counseling-modal";
import { UniversityCard } from "@/components/site/UniversityCard";

export const Route = createFileRoute("/universities/")({
  component: UniversitiesPage,
});

function UniversitiesPage() {
  const [q, setQ] = useState("");
  const [naac, setNaac] = useState<string>("All");
  const { open, openModal, closeModal } = useCounselingModal();

  const { data: apiUniversities = [], isLoading } = useUniversities();

  // Static fallback when backend is offline
  const staticFallback: UniversityDto[] = UNIVERSITIES.map((u) => ({
    id: 0,
    slug: u.slug,
    name: u.name,
    shortName: u.short,
    city: u.city,
    naacGrade: u.naac,
    hue: u.hue,
    primaryImage: u.image ?? "",
    heroImage: "",
    thumbnailImage: "",
    logo: u.logo,
    established: u.established,
    programs: u.programs,
    feesMin: 0,
    feesMax: 0,
    feesRange: u.feesRange,
    placement: u.placement,
    alumni: u.alumni,
    tag: u.tag as UniversityDto["tag"],
    highlights: u.highlights,
  }));

  const universities = apiUniversities.length > 0 ? apiUniversities : staticFallback;

  const filtered = useMemo(() => {
    return universities.filter((u) => {
      const m1 =
        u.name.toLowerCase().includes(q.toLowerCase()) ||
        u.city.toLowerCase().includes(q.toLowerCase());
      const m2 = naac === "All" || u.naacGrade === naac;
      return m1 && m2;
    });
  }, [universities, q, naac]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
          <div className="absolute -top-40 left-0 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
              Partner Universities
            </div>
            <h1 className="font-display text-4xl lg:text-6xl leading-tight max-w-3xl">
              30+ universities.
              <br />
              <span className="text-gradient-gold">All vetted. All accredited.</span>
            </h1>
            <p className="mt-5 text-muted-foreground max-w-2xl">
              Every partner is UGC-DEB approved with NAAC accreditation. Click any university to
              see full details — courses, fees, placement, and accreditations.
            </p>

            {/* Search + filters */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by university or city..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="pl-10 bg-card border-border"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {["All", "A++", "A+", "A"].map((n) => (
                  <button
                    key={n}
                    onClick={() => setNaac(n)}
                    className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                      naac === n
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
                    }`}
                  >
                    {n === "All" ? "All NAAC" : `NAAC ${n}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Grid ─────────────────────────────────────────────────────────── */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            {isLoading ? (
              <p className="text-center text-muted-foreground py-16">
                Loading universities...
              </p>
            ) : filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-16">
                No universities match your filters.
              </p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  {filtered.length} {filtered.length === 1 ? "university" : "universities"} found
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((u) => (
                    <UniversityCard key={u.slug} u={u} onApply={openModal} />
                  ))}
                </div>
              </>
            )}
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
