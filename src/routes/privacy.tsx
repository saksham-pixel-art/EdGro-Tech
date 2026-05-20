import { createFileRoute } from "@tanstack/react-router";
import {
  LegalPageLayout, P, UL, LI, Highlight, InfoCard,
  type LegalSection,
} from "@/components/site/LegalPageLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — EdGro Tech" },
      { name: "description", content: "Learn how EdGro Tech collects, uses, and protects your personal data in compliance with modern data protection frameworks." },
      { property: "og:title", content: "Privacy Policy — EdGro Tech" },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS: LegalSection[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <>
        <P>Welcome to <Highlight>EdGro Tech</Highlight> ("Company," "we," "our," or "us"). We respect your privacy and are deeply committed to protecting your personal data. This Privacy Policy governs your access to and use of the EdGro Tech website, platform, applications, and related services (collectively, the "Services").</P>
        <P>This document outlines our practices regarding the collection, use, processing, and disclosure of your information when you interact with our platform, whether as a student, intern, training applicant, recruiter, or academic institution. By accessing our Services, you consent to the data practices detailed in this Privacy Policy. This policy is designed in compliance with modern global data protection frameworks and the Information Technology Act, 2000 (India) and its corresponding rules.</P>
      </>
    ),
  },
  {
    id: "information-collected",
    title: "2. Information We Collect",
    content: (
      <>
        <P>We collect information that identifies, relates to, or could reasonably be linked to you ("Personal Data"). The types of data we collect include:</P>
        <UL>
          <LI><Highlight>Directly Provided Information:</Highlight> When you register, apply for programs, or contact us, you may provide your name, email address, phone number, physical address, date of birth, educational background, professional history, resumes, and identification documents.</LI>
          <LI><Highlight>Automatically Collected Data:</Highlight> As you navigate our platform, we automatically collect technical data such as your IP address, browser type, device information, operating system, and interaction metrics (e.g., pages visited, time spent, and clickstream data).</LI>
          <LI><Highlight>Communication Data:</Highlight> Records of correspondence, including support requests, email communications, and feedback submitted through our platform.</LI>
        </UL>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "3. How We Use Information",
    content: (
      <>
        <P>We utilize the collected information strictly for professional and operational purposes, including but not limited to:</P>
        <UL>
          <LI><Highlight>Service Delivery:</Highlight> Processing enrollments, facilitating internship placements, managing course access, and verifying academic credentials.</LI>
          <LI><Highlight>Platform Optimization:</Highlight> Analyzing usage trends to improve user experience, platform functionality, and technical performance.</LI>
          <LI><Highlight>Communication:</Highlight> Sending essential updates, transactional emails, enrollment confirmations, and responding to inquiries.</LI>
          <LI><Highlight>Marketing:</Highlight> Providing tailored recommendations, newsletters, and promotional content (subject to your explicit consent).</LI>
          <LI><Highlight>Compliance & Security:</Highlight> Enforcing our terms of service, preventing fraud, and ensuring the safety of our ecosystem.</LI>
        </UL>
      </>
    ),
  },
  {
    id: "user-accounts",
    title: "4. User Account Data",
    content: (
      <>
        <P>Creating an account with EdGro Tech requires the submission of specific profile data. You maintain control over your account settings and can update or correct your profile information at any time.</P>
        <InfoCard variant="warning">We monitor account activity to prevent unauthorized access, platform misuse, and fraudulent registrations. We reserve the right to suspend or terminate accounts that exhibit suspicious behavior or violate our community standards.</InfoCard>
      </>
    ),
  },
  {
    id: "cookies",
    title: "5. Cookies & Tracking Technologies",
    content: (
      <>
        <P>Our website utilizes cookies, web beacons, and similar tracking technologies to enhance your browsing experience. These tools help us remember your preferences, authenticate your sessions, and analyze traffic patterns.</P>
        <UL>
          <LI><Highlight>Essential Cookies:</Highlight> Required for core platform functionality.</LI>
          <LI><Highlight>Analytical Cookies:</Highlight> Used to aggregate data on site usage.</LI>
          <LI><Highlight>Marketing Cookies:</Highlight> Used to deliver relevant advertisements.</LI>
        </UL>
        <P>You may adjust your browser settings to refuse cookies; however, doing so may limit your ability to utilize certain features of the EdGro Tech platform.</P>
      </>
    ),
  },
  {
    id: "third-party",
    title: "6. Third-Party Services",
    content: (
      <>
        <P>To provide a seamless experience, we integrate with trusted third-party service providers (e.g., hosting partners, CRM systems, analytics providers like Google Analytics, and cloud infrastructure).</P>
        <P>These providers process data solely on our behalf, under strict confidentiality agreements, and are prohibited from utilizing your Personal Data for independent purposes.</P>
      </>
    ),
  },
  {
    id: "payment-info",
    title: "7. Payment Information",
    content: (
      <>
        <P>EdGro Tech partners with secure, industry-standard, and PCI-DSS compliant third-party payment gateways to process transactions for course enrollments and premium services.</P>
        <InfoCard variant="info">We do not directly collect, store, or retain your full credit card numbers or banking credentials on our servers.</InfoCard>
      </>
    ),
  },
  {
    id: "internship-training",
    title: "8. Internship & Training Applications",
    content: (
      <>
        <P>When you apply for internships, training modules, or placements through EdGro Tech, we process specific career-related data. This includes academic transcripts, project portfolios, and interview performance metrics.</P>
        <P>With your explicit authorization, this data may be shared with prospective employers, recruiters, and partner colleges to facilitate career opportunities.</P>
      </>
    ),
  },
  {
    id: "data-sharing",
    title: "9. Data Sharing & Disclosure",
    content: (
      <>
        <P>We do not sell or rent your Personal Data. We may disclose your information under the following circumstances:</P>
        <UL>
          <LI><Highlight>To Academic & Corporate Partners:</Highlight> For the fulfillment of training programs and recruitment processing.</LI>
          <LI><Highlight>For Legal Obligations:</Highlight> When required by law, subpoena, or legal process to protect the rights, property, and safety of EdGro Tech, our users, or the public.</LI>
          <LI><Highlight>Business Transfers:</Highlight> In the event of a merger, acquisition, reorganization, or sale of assets, your data may be transferred as part of the business assets.</LI>
        </UL>
      </>
    ),
  },
  {
    id: "data-security",
    title: "10. Data Security",
    content: (
      <>
        <P>We implement robust, enterprise-grade technical and organizational security measures to safeguard your Personal Data against unauthorized access, alteration, disclosure, or destruction.</P>
        <P>This includes end-to-end encryption, secure socket layer (SSL) technology, routine security audits, and strict access controls. While we strive for maximum security, no digital transmission or storage is entirely infallible.</P>
      </>
    ),
  },
  {
    id: "user-rights",
    title: "11. User Rights",
    content: (
      <>
        <P>Depending on your jurisdiction, you possess specific rights regarding your Personal Data:</P>
        <UL>
          <LI><Highlight>Right to Access:</Highlight> Request a copy of the data we hold about you.</LI>
          <LI><Highlight>Right to Rectification:</Highlight> Request corrections to inaccurate or incomplete data.</LI>
          <LI><Highlight>Right to Erasure:</Highlight> Request the deletion of your data, subject to legal retention requirements.</LI>
          <LI><Highlight>Right to Restrict Processing:</Highlight> Limit how we process your data.</LI>
          <LI><Highlight>Right to Withdraw Consent:</Highlight> Opt-out of marketing communications and analytics tracking at any time.</LI>
        </UL>
        <P>To exercise these rights, please contact our Data Protection Officer using the details provided below.</P>
      </>
    ),
  },
  {
    id: "children-privacy",
    title: "12. Children's Privacy",
    content: (
      <>
        <P>EdGro Tech is designed for adult learners, college students, and professionals. Our platform is not directed at children under the age of 16.</P>
        <P>We do not knowingly collect Personal Data from children. If we become aware that a child under 16 has provided us with Personal Data without verifiable parental consent, we will take immediate steps to permanently delete such information.</P>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "13. International Data Transfers",
    content: (
      <>
        <P>As a modern digital platform, EdGro Tech may host data on servers located outside of your country of residence.</P>
        <P>By using our Services, you consent to the transfer, storage, and processing of your data in global data centers. We ensure that such international transfers are protected by standard contractual clauses and compliant data protection frameworks.</P>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "14. Data Retention",
    content: (
      <>
        <P>We retain your Personal Data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy. This includes the duration of your active account and any mandatory retention periods dictated by tax, legal, or regulatory obligations.</P>
        <P>Once data is no longer required, it is securely anonymized or permanently deleted.</P>
      </>
    ),
  },
  {
    id: "changes-to-policy",
    title: "15. Changes to Privacy Policy",
    content: (
      <>
        <P>The digital landscape is constantly evolving, and so are our practices. EdGro Tech reserves the right to modify this Privacy Policy at any time.</P>
        <P>Significant changes will be communicated via email or through a prominent notice on our platform prior to the change becoming effective. Your continued use of the Services after the effective date constitutes your acceptance of the revised policy.</P>
      </>
    ),
  },
  {
    id: "contact-information",
    title: "16. Contact Information",
    content: (
      <>
        <P>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our privacy team:</P>
        <UL>
          <LI><Highlight>Email:</Highlight> privacy@edgrotech.in</LI>
          <LI><Highlight>Phone:</Highlight> +91 87963 46455</LI>
          <LI><Highlight>Address:</Highlight> New Delhi, India</LI>
        </UL>
        <InfoCard variant="important">By engaging with EdGro Tech, you acknowledge that you have read, understood, and agreed to be bound by this Privacy Policy.</InfoCard>
      </>
    ),
  },
];

function PrivacyPage() {
  return (
    <LegalPageLayout
      badge="Privacy Policy"
      title={<>Privacy <span className="text-gradient-gold">Policy.</span></>}
      subtitle="How we collect, use, and protect your personal data in compliance with modern data protection frameworks."
      lastUpdated="May 17, 2026"
      effectiveDate="May 17, 2026"
      sections={SECTIONS}
    />
  );
}
