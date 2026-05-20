import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, GraduationCap, Minimize2, MessageCircle } from "lucide-react";

type Msg = { role: "user" | "ai"; text: string; time: string };

function now() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

const STARTER: Msg[] = [
  {
    role: "ai",
    text: "Hi! I'm Edgro AI 👋 Your personal admission counselor. Tell me your goal — career switch, upskilling, or starting fresh?",
    time: now(),
  },
];

const QUICK_CHIPS = [
  "Best MBA universities",
  "Data Science fees",
  "Eligibility criteria",
  "EMI options",
];

const CANNED: Record<string, string> = {
  default:
    "Great! Based on your interest, I'd recommend our Online MBA or Data Science programs. Want me to share the top 3 universities with fees & ROI breakdown?",
  mba: "🎓 Online MBA from NMIMS, Manipal Jaipur, or Amity is a great fit. Fees range ₹85K – ₹2.4L with avg placement of ₹8.4 LPA. Should I shortlist based on your budget?",
  data: "📊 Data Science is booming! MAHE & NMIMS offer 12–24 month programs with avg placement of ₹12–14 LPA. Want a side-by-side comparison?",
  fees: "💰 Fees vary by program:\n• MBA: ₹85K – ₹2.4L\n• BBA: ₹55K – ₹1.6L\n• Data Science: ₹95K – ₹2.8L\n\nMost universities offer 0% EMI. Which program interests you?",
  emi: "✅ Yes! All our partner universities offer 0% EMI through leading banks and NBFCs. You can split fees into 6–24 monthly instalments. Want me to connect you with a counselor?",
  eligibility:
    "📋 Eligibility depends on the program:\n• MBA / MCA: Any bachelor's degree, 50%+\n• BBA / BCA: 12th pass, any stream\n• Data Science: Graduate with basic math\n\nWhich program are you considering?",
};

function reply(input: string): string {
  const t = input.toLowerCase();
  if (t.includes("mba")) return CANNED.mba;
  if (t.includes("data") || t.includes("science") || t.includes("ai")) return CANNED.data;
  if (t.includes("fee") || t.includes("cost") || t.includes("price")) return CANNED.fees;
  if (t.includes("emi") || t.includes("instalment") || t.includes("installment")) return CANNED.emi;
  if (t.includes("eligib") || t.includes("qualify") || t.includes("criteria")) return CANNED.eligibility;
  return CANNED.default;
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(STARTER);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Focus input when opened
  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, minimized]);

  // Unread badge when closed
  useEffect(() => {
    if (!open && messages.length > 1) {
      setUnread((n) => n + 1);
    }
  }, [messages]);

  function openChat() {
    setOpen(true);
    setMinimized(false);
    setUnread(0);
  }

  function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    const next: Msg[] = [...messages, { role: "user", text: msg, time: now() }];
    setMessages(next);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages([...next, { role: "ai", text: reply(msg), time: now() }]);
      setTyping(false);
    }, 1000);
  }

  function handleChip(q: string) {
    send(q);
  }

  return (
    <>
      {/* ── Floating Trigger Button ─────────────────────────────────────── */}
      {!open && (
        <button
          onClick={openChat}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Open AI Counselor"
        >
          {/* Outer glow ring */}
          <span className="absolute inset-0 rounded-full animate-ping bg-gold/30 scale-110" />
          <span className="absolute inset-0 rounded-full bg-gold/20 blur-xl group-hover:bg-gold/40 transition-all duration-500" />

          {/* Button body */}
          <div className="relative h-16 w-16 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(198,144,77,0.5)]"
            style={{ background: "linear-gradient(135deg, #E0A86A 0%, #C6904D 50%, #8E5F2E 100%)" }}
          >
            <MessageCircle className="h-7 w-7 text-[#1F1F1F]" strokeWidth={2} />

            {/* Online dot */}
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-emerald-400 ring-2 ring-[#1F1F1F] animate-pulse" />

            {/* Unread badge */}
            {unread > 0 && (
              <span className="absolute -top-1 -left-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-[#1F1F1F]">
                {unread}
              </span>
            )}
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-card border border-gold/30 text-foreground text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-elegant">
              💬 Chat with Edgro AI
            </div>
            <div className="w-2 h-2 bg-card border-r border-b border-gold/30 rotate-45 ml-auto mr-3 -mt-1" />
          </div>
        </button>
      )}

      {/* ── Chat Panel ──────────────────────────────────────────────────── */}
      {open && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] rounded-2xl flex flex-col overflow-hidden transition-all duration-300 ${
            minimized ? "h-[68px]" : "h-[620px] max-h-[calc(100vh-3rem)]"
          }`}
          style={{
            background: "rgba(22, 22, 22, 0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(198,144,77,0.25)",
            boxShadow: "0 32px 80px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(198,144,77,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* ── Header ──────────────────────────────────────────────────── */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0 cursor-pointer select-none"
            style={{
              background: "linear-gradient(135deg, rgba(198,144,77,0.15) 0%, rgba(198,144,77,0.05) 100%)",
              borderBottom: minimized ? "none" : "1px solid rgba(198,144,77,0.15)",
            }}
            onClick={() => minimized && setMinimized(false)}
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(198,144,77,0.4)]"
                  style={{ background: "linear-gradient(135deg, #E0A86A 0%, #8E5F2E 100%)" }}
                >
                  <GraduationCap className="h-5 w-5 text-[#1F1F1F]" strokeWidth={2.5} />
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#161616] animate-pulse" />
              </div>

              {/* Name + status */}
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-white">Edgro AI</span>
                  <Sparkles className="h-3 w-3 text-gold" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online · Replies instantly
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); setMinimized((m) => !m); }}
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                aria-label={minimized ? "Expand" : "Minimize"}
              >
                <Minimize2 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setOpen(false); setUnread(0); }}
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* ── Body (hidden when minimized) ────────────────────────────── */}
          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Avatar */}
                    {m.role === "ai" && (
                      <div
                        className="h-7 w-7 rounded-full shrink-0 flex items-center justify-center mt-0.5"
                        style={{ background: "linear-gradient(135deg, #E0A86A 0%, #8E5F2E 100%)" }}
                      >
                        <GraduationCap className="h-3.5 w-3.5 text-[#1F1F1F]" strokeWidth={2.5} />
                      </div>
                    )}

                    <div className={`flex flex-col gap-1 max-w-[80%] ${m.role === "user" ? "items-end" : "items-start"}`}>
                      <div
                        className={`px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                          m.role === "user"
                            ? "rounded-2xl rounded-tr-sm text-white"
                            : "rounded-2xl rounded-tl-sm text-white/90"
                        }`}
                        style={
                          m.role === "user"
                            ? {
                                background: "linear-gradient(135deg, rgba(198,144,77,0.35) 0%, rgba(142,95,46,0.35) 100%)",
                                border: "1px solid rgba(198,144,77,0.3)",
                              }
                            : {
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.08)",
                              }
                        }
                      >
                        {m.text}
                      </div>
                      <span className="text-[10px] text-white/25 px-1">{m.time}</span>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {typing && (
                  <div className="flex gap-2.5 items-end">
                    <div
                      className="h-7 w-7 rounded-full shrink-0 flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #E0A86A 0%, #8E5F2E 100%)" }}
                    >
                      <GraduationCap className="h-3.5 w-3.5 text-[#1F1F1F]" strokeWidth={2.5} />
                    </div>
                    <div
                      className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {[0, 0.15, 0.3].map((d, i) => (
                        <span
                          key={i}
                          className="h-2 w-2 rounded-full bg-gold"
                          style={{
                            animation: "bounce 1.2s ease-in-out infinite",
                            animationDelay: `${d}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick chips — only on first message */}
              {messages.length <= 1 && (
                <div className="px-4 pb-3 flex flex-wrap gap-2">
                  {QUICK_CHIPS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleChip(q)}
                      className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105"
                      style={{
                        background: "rgba(198,144,77,0.1)",
                        border: "1px solid rgba(198,144,77,0.25)",
                        color: "rgba(198,144,77,0.9)",
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input bar */}
              <div
                className="px-3 py-3 flex gap-2 shrink-0"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                  placeholder="Ask about programs, fees, eligibility…"
                  maxLength={300}
                  className="flex-1 h-11 rounded-xl px-4 text-sm text-white placeholder:text-white/30 focus:outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(198,144,77,0.5)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
                  }}
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim()}
                  className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    background: input.trim()
                      ? "linear-gradient(135deg, #E0A86A 0%, #C6904D 50%, #8E5F2E 100%)"
                      : "rgba(255,255,255,0.06)",
                    boxShadow: input.trim() ? "0 4px 16px rgba(198,144,77,0.4)" : "none",
                  }}
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4 text-[#1F1F1F]" strokeWidth={2.5} />
                </button>
              </div>

              {/* Footer */}
              <div
                className="px-4 py-2 text-center shrink-0"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
              >
                <span className="text-[10px] text-white/20">
                  Powered by <span className="text-gold/50">EdGro AI</span> · 12,400+ students guided
                </span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Bounce keyframe */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
