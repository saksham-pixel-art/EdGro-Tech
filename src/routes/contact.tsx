import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ChatbotWidget } from "@/components/site/ChatbotWidget";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { contactApi, ApiError } from "@/api/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact EdGro Tech — Talk to a Counselor" },
      { name: "description", content: "Get in touch with EdGro Tech. Talk to senior admission counselors. Phone, email, WhatsApp — your choice." },
      { property: "og:title", content: "Contact EdGro Tech" },
      { property: "og:description", content: "Senior counselors. Real answers in 24 hours." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    try {
      const result = await contactApi.submit({
        name: (form.elements.namedItem("name") as HTMLInputElement).value,
        email: (form.elements.namedItem("email") as HTMLInputElement).value,
        phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
        subject: (form.elements.namedItem("topic") as HTMLInputElement).value,
        message: (form.elements.namedItem("msg") as HTMLTextAreaElement).value,
      });
      toast.success(result.message ?? "Message received. A counselor will reach out within 24 hours.");
      form.reset();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative pt-20 pb-12 lg:pt-28 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
          <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Contact Us</div>
            <h1 className="font-display text-4xl lg:text-6xl leading-tight max-w-3xl">
              Talk to a <span className="text-gradient-gold">senior counselor.</span>
            </h1>
            <p className="mt-5 text-muted-foreground max-w-2xl">
              Real humans, no scripts. We typically respond within 4 working hours.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-[1fr_1.2fr] gap-10">
            {/* Channels */}
            <div className="space-y-4">
              {[
                { icon: Phone, t: "Call us", v: "+91 87963 46455", s: "Mon–Sat, 9 AM – 9 PM IST" },
                { icon: MessageCircle, t: "WhatsApp", v: "+91 87963 46455", s: "Fastest response, usually < 30 min" },
                { icon: Mail, t: "Email", v: "hr@edgrotech.in", s: "We reply within 4 hours" },
                { icon: MapPin, t: "Office", v: "EdGro Tech Pvt. Ltd.", s: "Bengaluru, Karnataka, India" },
                { icon: Clock, t: "Counseling Hours", v: "Mon–Sat, 9 AM – 9 PM", s: "Sunday: 10 AM – 6 PM" },
              ].map((c) => (
                <div key={c.t} className="rounded-2xl border border-border bg-card p-5 flex gap-4 hover:border-gold/40 transition-colors">
                  <div className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-gold/20 to-transparent border border-gold/20 flex items-center justify-center">
                    <c.icon className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">{c.t}</div>
                    <div className="font-display text-base text-foreground">{c.v}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{c.s}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="rounded-3xl border border-border bg-card p-6 lg:p-10 shadow-elegant">
              <h2 className="font-display text-2xl lg:text-3xl mb-2">Send us a message</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Fill the form and a senior counselor will reach out within 24 hours.
              </p>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" required placeholder="Your full name" className="mt-1.5 bg-background border-border" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" required type="tel" placeholder="10-digit mobile" className="mt-1.5 bg-background border-border" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" required type="email" placeholder="you@example.com" className="mt-1.5 bg-background border-border" />
                </div>
                <div>
                  <Label htmlFor="topic">What can we help with?</Label>
                  <Input id="topic" placeholder="e.g. Online MBA admission for working professional" className="mt-1.5 bg-background border-border" />
                </div>
                <div>
                  <Label htmlFor="msg">Message</Label>
                  <Textarea id="msg" rows={5} placeholder="Tell us about your goal, current stage, and any questions..." className="mt-1.5 bg-background border-border resize-none" />
                </div>
                <Button type="submit" variant="premium" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? "Sending..." : "Send message"}
                </Button>
                <p className="text-[11px] text-muted-foreground text-center">
                  By submitting, you agree to our terms. We never share your details.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <ChatbotWidget />
      <Toaster position="top-center" />
    </div>
  );
}
