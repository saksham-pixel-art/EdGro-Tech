import { Bot, Sparkles, MessageSquare, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHAT = [
  { role: "user", text: "I'm a working professional with 4 yrs in IT. Should I do an MBA or MS in Data Science?" },
  { role: "ai", text: "Great question! Given your IT background, a 12-month online MS in Data Science from MAHE or NMIMS could deliver faster ROI (~₹14 LPA avg). MBA suits if you want leadership transition. Want me to compare both?" },
  { role: "user", text: "Compare please. Budget under ₹2.5L." },
  { role: "ai", text: "On it. Pulling 3 best-fit programs under your budget…" },
];

export function AICounselor() {
  return (
    <section id="counselor" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — copy */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs uppercase tracking-[0.2em] mb-6">
            <Sparkles className="h-3 w-3" />
            AI-Powered Career Counselor
          </div>
          <h2 className="font-display text-4xl lg:text-5xl leading-tight mb-5">
            Meet <span className="text-gradient-gold">Edgro AI</span> — your <br />
            24/7 admission expert.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Powered by leading LLMs, trained on every partner university's curriculum,
            fees and placement data. Ask anything, get unbiased recommendations
            instantly — no waiting for a callback.
          </p>

          <div className="space-y-4 mb-8">
            {[
              { icon: Brain, title: "Smart course matching", desc: "Finds the right program based on your goals, budget & background." },
              { icon: MessageSquare, title: "Step-by-step admission help", desc: "From eligibility to fee payment — guided answers, not generic links." },
              { icon: Bot, title: "Always available", desc: "No callbacks, no waiting. Get answers at 2am if you need to." },
            ].map((f) => (
              <div key={f.title} className="flex gap-4">
                <div className="shrink-0 h-10 w-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <f.icon className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-0.5">{f.title}</h4>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Button variant="premium" size="lg">
            Start chat with Edgro AI
          </Button>
        </div>

        {/* Right — chat preview */}
        <div className="relative">
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-gold/40 via-transparent to-transparent" />
          <div className="relative rounded-3xl bg-card border border-border p-6 lg:p-8 shadow-elegant">
            {/* Header */}
            <div className="flex items-center gap-3 pb-5 border-b border-border mb-5">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gold to-gold-deep flex items-center justify-center">
                <Bot className="h-5 w-5 text-charcoal" />
              </div>
              <div>
                <div className="font-medium">Edgro AI Counselor</div>
                <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-4">
              {CHAT.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-gold/15 text-foreground border border-gold/20 rounded-br-sm"
                        : "bg-background/60 text-foreground/90 border border-border rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {/* Typing */}
              <div className="flex justify-start">
                <div className="bg-background/60 border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                  {[0, 0.2, 0.4].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse"
                      style={{ animationDelay: `${d}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <input
                placeholder="Ask Edgro AI…"
                className="flex-1 h-11 rounded-xl bg-background/60 border border-border px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold/50"
                disabled
              />
              <Button variant="premium" size="default">Send</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
