import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { PartnerUniversities } from "@/components/site/PartnerUniversities";
import { Programs } from "@/components/site/Programs";
import { CompareTeaser } from "@/components/site/CompareTeaser";
import { AICounselor } from "@/components/site/AICounselor";
import { AdmissionFlow } from "@/components/site/AdmissionFlow";
import { Stats } from "@/components/site/Stats";
import { WhyEdgro } from "@/components/site/WhyEdgro";
import { Testimonials } from "@/components/site/Testimonials";
import { CareerSupport } from "@/components/site/CareerSupport";
import { BlogPreview } from "@/components/site/BlogPreview";
import { FinalCTA } from "@/components/site/FinalCTA";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ChatbotWidget } from "@/components/site/ChatbotWidget";
import { CounselingModal } from "@/components/site/CounselingModal";
import { useCounselingModal } from "@/hooks/use-counseling-modal";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EdGro Tech — India's Premium Online University Admission Partner" },
      {
        name: "description",
        content:
          "Get admitted to top UGC-approved universities in India. Online MBA, BBA, Data Science & more. AI-powered counseling, side-by-side university comparison, end-to-end admission support.",
      },
      { property: "og:title", content: "EdGro Tech — Premium University Admissions, Simplified" },
      {
        property: "og:description",
        content:
          "30+ partner universities. 12,400+ students enrolled. AI counselor, transparent fees, lifetime career support.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { open, openModal, closeModal } = useCounselingModal();

  // Auto-open the counseling modal 2 seconds after landing on the homepage.
  // Only fires once per session so it doesn't annoy returning visitors.
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("edgro_modal_shown");
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      openModal();
      sessionStorage.setItem("edgro_modal_shown", "1");
    }, 3000);

    return () => clearTimeout(timer);
  }, [openModal]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <PartnerUniversities />
        <Programs />
        <CompareTeaser />
        <AICounselor />
        <AdmissionFlow />
        <Stats />
        <WhyEdgro />
        <Testimonials />
        <CareerSupport />
        <BlogPreview />
        <FinalCTA />
      </main>
      <SiteFooter />
      <ChatbotWidget />
      <CounselingModal open={open} onClose={closeModal} />
      <Toaster position="top-center" />
    </div>
  );
}
