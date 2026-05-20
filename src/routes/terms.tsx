import { createFileRoute } from "@tanstack/react-router";
import {
  LegalPageLayout, P, UL, LI, SectionLabel, Highlight, InfoCard,
  type LegalSection,
} from "@/components/site/LegalPageLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — EdGro Tech" },
      { name: "description", content: "Terms and conditions governing use of EdGro Tech's platform, counseling services, and university admission assistance." },
      { property: "og:title", content: "Terms & Conditions — EdGro Tech" },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: TermsPage,
});

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: (
      <>
        <P>By accessing or using the EdGro Tech website (<Highlight>edgrotech.in</Highlight>), submitting any form, or engaging with our counseling services, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our platform.</P>
        <P>These terms constitute a legally binding agreement between you and <Highlight>EdGro Tech Private Limited</Highlight>, a company incorporated under the laws of India.</P>
        <InfoCard variant="info">These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in <Highlight>New Delhi, India</Highlight>.</InfoCard>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "2. User Eligibility",
    content: (
      <>
        <P>To use our services, you must:</P>
        <UL>
          <LI>Be at least <Highlight>18 years of age</Highlight></LI>
          <LI>Have the legal capacity to enter into binding agreements</LI>
          <LI>Provide accurate and truthful information in all forms</LI>
          <LI>Not be prohibited from using our services under applicable law</LI>
        </UL>
        <P>By submitting a lead form or counseling request, you represent that you meet these eligibility requirements.</P>
      </>
    ),
  },
  {
    id: "services",
    title: "3. Services Provided",
    content: (
      <>
        <P>EdGro Tech provides the following services:</P>
        <UL>
          <LI><Highlight>University discovery:</Highlight> Information about partner universities, programs, fees, and accreditations</LI>
          <LI><Highlight>Admission counseling:</Highlight> Personalized guidance from trained counselors</LI>
          <LI><Highlight>AI Counselor:</Highlight> AI-powered program recommendations (advisory only)</LI>
          <LI><Highlight>Comparison tools:</Highlight> Side-by-side university comparison</LI>
          <LI><Highlight>Application assistance:</Highlight> Support with document preparation and submission</LI>
        </UL>
        <InfoCard variant="warning">EdGro Tech is an <Highlight>admission facilitation platform</Highlight>, not a university. We do not grant degrees, issue certificates, or guarantee admission to any institution.</InfoCard>
      </>
    ),
  },
  {
    id: "university-info",
    title: "4. University Information Disclaimer",
    content: (
      <>
        <P>All university information on our platform — including fees, programs, rankings, placement statistics, and accreditations — is sourced from publicly available data and university communications.</P>
        <UL>
          <LI>Information may change without notice; always verify directly with the university</LI>
          <LI>Fee structures are indicative and subject to revision by the institution</LI>
          <LI>Placement statistics are historical averages, not guarantees</LI>
          <LI>NAAC grades and rankings are as published by the respective bodies</LI>
        </UL>
        <P>EdGro Tech is not liable for discrepancies between information on our platform and the university's official communications.</P>
      </>
    ),
  },
  {
    id: "ai-counselor",
    title: "5. AI Counselor Limitations",
    content: (
      <>
        <P>Our AI Counselor is a <Highlight>decision-support tool</Highlight>, not a substitute for professional human counseling.</P>
        <UL>
          <LI>AI recommendations are based on the information you provide and may not account for all personal circumstances</LI>
          <LI>AI outputs should be verified with a human counselor before making admission decisions</LI>
          <LI>EdGro Tech is not liable for decisions made solely based on AI recommendations</LI>
          <LI>The AI does not have access to real-time university admission status</LI>
        </UL>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "6. Intellectual Property",
    content: (
      <>
        <P>All content on the EdGro Tech platform — including text, graphics, logos, icons, images, audio clips, and software — is the property of <Highlight>EdGro Tech Private Limited</Highlight> and is protected by applicable intellectual property laws.</P>
        <UL>
          <LI>You may not reproduce, distribute, or create derivative works without written permission</LI>
          <LI>University logos and trademarks belong to their respective owners</LI>
          <LI>Unauthorized use of our brand assets is strictly prohibited</LI>
        </UL>
      </>
    ),
  },
  {
    id: "user-conduct",
    title: "7. User Conduct",
    content: (
      <>
        <P>You agree not to:</P>
        <UL>
          <LI>Submit false, misleading, or fraudulent information</LI>
          <LI>Use our platform for any unlawful purpose</LI>
          <LI>Attempt to gain unauthorized access to our systems</LI>
          <LI>Scrape, crawl, or harvest data from our platform</LI>
          <LI>Interfere with the proper functioning of the website</LI>
          <LI>Impersonate any person or entity</LI>
          <LI>Transmit spam, malware, or harmful code</LI>
        </UL>
        <P>Violation of these conduct rules may result in immediate termination of access and legal action.</P>
      </>
    ),
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    content: (
      <>
        <InfoCard variant="important">To the maximum extent permitted by applicable law, EdGro Tech shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our platform or services.</InfoCard>
        <P>Specifically, EdGro Tech is not liable for:</P>
        <UL>
          <LI>Admission rejections by any university</LI>
          <LI>Changes in university fees, programs, or policies</LI>
          <LI>Placement outcomes after graduation</LI>
          <LI>Decisions made based on AI counselor recommendations</LI>
          <LI>Third-party website content linked from our platform</LI>
          <LI>Service interruptions due to technical issues or force majeure</LI>
        </UL>
        <P>Our total liability to you for any claim shall not exceed the amount paid by you to EdGro Tech for the specific service giving rise to the claim.</P>
      </>
    ),
  },
  {
    id: "third-party",
    title: "9. Third-Party Links & Services",
    content: (
      <>
        <P>Our platform may contain links to third-party websites, including university portals, payment gateways, and social media platforms. These links are provided for convenience only.</P>
        <UL>
          <LI>EdGro Tech does not endorse or control third-party websites</LI>
          <LI>We are not responsible for the content, privacy practices, or terms of third-party sites</LI>
          <LI>Access to third-party sites is at your own risk</LI>
        </UL>
      </>
    ),
  },
  {
    id: "modifications",
    title: "10. Service Modifications & Termination",
    content: (
      <>
        <P>EdGro Tech reserves the right to:</P>
        <UL>
          <LI>Modify, suspend, or discontinue any part of our services at any time</LI>
          <LI>Update these Terms & Conditions with reasonable notice</LI>
          <LI>Terminate access for users who violate these terms</LI>
          <LI>Add or remove university partners from our platform</LI>
        </UL>
        <P>Continued use of our platform after modifications constitutes acceptance of the updated terms.</P>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "11. Governing Law & Disputes",
    content: (
      <>
        <P>These Terms are governed by the laws of the <Highlight>Republic of India</Highlight>. Any dispute arising from these terms shall be resolved through:</P>
        <UL>
          <LI><Highlight>First:</Highlight> Good-faith negotiation between the parties</LI>
          <LI><Highlight>Second:</Highlight> Mediation under the Mediation Act, 2023</LI>
          <LI><Highlight>Third:</Highlight> Exclusive jurisdiction of courts in New Delhi, India</LI>
        </UL>
      </>
    ),
  },
];

function TermsPage() {
  return (
    <LegalPageLayout
      badge="Terms & Conditions"
      title={<>Terms & <span className="text-gradient-gold">Conditions.</span></>}
      subtitle="The rules and guidelines governing your use of EdGro Tech's platform and admission counseling services."
      lastUpdated="January 1, 2025"
      effectiveDate="January 1, 2025"
      sections={SECTIONS}
    />
  );
}
