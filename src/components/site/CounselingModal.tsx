import { useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2, ShieldCheck, X, GraduationCap, Sparkles } from "lucide-react";
import { leadsApi, ApiError } from "@/api/client";

// ── Validation ────────────────────────────────────────────────────────────────
const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{7,19}$/, "Enter a valid phone number"),
  course: z.string().min(1, "Select a course"),
  state: z.string().min(1, "Select your state"),
  city: z.string().trim().max(100).optional(),
  preferredUniversity: z.string().max(200).optional(),
});

// ── Static data ───────────────────────────────────────────────────────────────
const COURSES = [
  "Online MBA",
  "Online BBA",
  "Online BCA",
  "Online MCA",
  "Online BCom",
  "Online MCom",
  "Online BA",
  "Online MA",
  "Other",
];

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi (NCT)",
  "Chandigarh","Jammu & Kashmir","Ladakh","Puducherry","Outside India",
];

const UNIVERSITIES = [
  "Amity University","Andhra University","Chandigarh University",
  "DY Patil University Mumbai","DY Patil University Pune","Galgotias University",
  "GLA University","Kurukshetra University",
  "Lovely Professional University (LPU)","MAHE Manipal","Manipal University Jaipur",
  "NMIMS University","OP Jindal University","Parul University","Sharda University",
  "Shoolini University","Sikkim Manipal University","UPES University",
  "Uttaranchal University","Vivekananda Global University","Other",
];

type FormData = {
  name: string; email: string; phone: string;
  course: string; state: string; city: string;
  preferredUniversity: string;
};

const EMPTY: FormData = {
  name: "", email: "", phone: "",
  course: "", state: "", city: "",
  preferredUniversity: "",
};

// ── Props ─────────────────────────────────────────────────────────────────────
interface CounselingModalProps {
  open: boolean;
  onClose: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function CounselingModal({ open, onClose }: CounselingModalProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  function set(field: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      await leadsApi.submit({
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        city: parsed.data.city || undefined,
        state: parsed.data.state,
        preferredUniversity: parsed.data.preferredUniversity || undefined,
        courseInterest: parsed.data.course,
      });
      setSubmitted(true);
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    onClose();
    // Reset after close animation
    setTimeout(() => { setData(EMPTY); setSubmitted(false); }, 300);
  }

  const inputCls = "h-11 bg-background/60 border-border text-sm placeholder:text-muted-foreground/60 focus-visible:ring-gold/40";
  const labelCls = "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block";

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="p-0 gap-0 max-w-3xl w-[calc(100vw-2rem)] overflow-hidden border-border bg-card rounded-2xl [&>button:last-child]:hidden">
        {/* Close button */}
        <DialogClose
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 h-8 w-8 rounded-full bg-background/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="flex flex-col md:flex-row min-h-0">
          {/* ── Left illustration panel ──────────────────────────────────── */}
          <div
            className="hidden md:flex md:w-[42%] flex-col items-center justify-center p-8 relative overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #1a1208 0%, #0F1113 60%, #1a1208 100%)",
            }}
          >
            {/* Glow */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-gold/8 rounded-full blur-2xl translate-x-1/3 translate-y-1/3" />

            {/* SVG Illustration — student at laptop with teacher */}
            <div className="relative z-10 w-full max-w-[260px]">
              <svg viewBox="0 0 280 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                {/* Monitor / screen */}
                <rect x="60" y="20" width="160" height="110" rx="10" fill="#1e1e1e" stroke="#C6904D" strokeWidth="2"/>
                <rect x="68" y="28" width="144" height="88" rx="6" fill="#111"/>
                {/* Screen content lines */}
                <rect x="80" y="40" width="60" height="6" rx="3" fill="#C6904D" opacity="0.7"/>
                <rect x="80" y="52" width="100" height="4" rx="2" fill="#444"/>
                <rect x="80" y="62" width="80" height="4" rx="2" fill="#444"/>
                <rect x="80" y="72" width="90" height="4" rx="2" fill="#444"/>
                {/* Teacher figure on screen */}
                <circle cx="175" cy="55" r="12" fill="#2a2a2a" stroke="#C6904D" strokeWidth="1.5"/>
                <circle cx="175" cy="50" r="5" fill="#C6904D" opacity="0.8"/>
                <path d="M165 68 Q175 62 185 68" stroke="#C6904D" strokeWidth="1.5" fill="none" opacity="0.8"/>
                {/* Monitor stand */}
                <rect x="128" y="130" width="24" height="16" rx="2" fill="#2a2a2a"/>
                <rect x="110" y="144" width="60" height="6" rx="3" fill="#2a2a2a"/>
                {/* Desk */}
                <rect x="30" y="168" width="220" height="8" rx="4" fill="#1e1e1e" stroke="#333" strokeWidth="1"/>
                {/* Laptop (student) */}
                <rect x="80" y="148" width="80" height="52" rx="6" fill="#1e1e1e" stroke="#555" strokeWidth="1.5"/>
                <rect x="86" y="154" width="68" height="38" rx="4" fill="#0a0a0a"/>
                <rect x="90" y="158" width="40" height="4" rx="2" fill="#C6904D" opacity="0.5"/>
                <rect x="90" y="166" width="55" height="3" rx="1.5" fill="#333"/>
                <rect x="90" y="173" width="45" height="3" rx="1.5" fill="#333"/>
                <rect x="70" y="198" width="100" height="6" rx="3" fill="#1a1a1a" stroke="#444" strokeWidth="1"/>
                {/* Student figure */}
                <circle cx="155" cy="178" r="14" fill="#1e1e1e" stroke="#C6904D" strokeWidth="1.5"/>
                <circle cx="155" cy="172" r="6" fill="#C6904D" opacity="0.7"/>
                <path d="M143 192 Q155 184 167 192" stroke="#C6904D" strokeWidth="1.5" fill="none" opacity="0.7"/>
                {/* Arm / writing */}
                <path d="M143 195 L130 210" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="127" cy="213" r="3" fill="#C6904D" opacity="0.6"/>
                {/* Sparkle dots */}
                <circle cx="50" cy="60" r="3" fill="#C6904D" opacity="0.4"/>
                <circle cx="240" cy="40" r="2" fill="#C6904D" opacity="0.3"/>
                <circle cx="245" cy="160" r="2.5" fill="#C6904D" opacity="0.35"/>
                <circle cx="45" cy="150" r="2" fill="#C6904D" opacity="0.3"/>
              </svg>
            </div>

            {/* Text below illustration */}
            <div className="relative z-10 text-center mt-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <GraduationCap className="h-5 w-5 text-gold" />
                <span className="font-display text-lg text-white">EdGro Tech</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
                Expert counselors ready to guide your admission journey
              </p>
              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {["UGC-DEB", "NAAC A++", "AICTE"].map((b) => (
                  <span
                    key={b}
                    className="text-[10px] px-2.5 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right form panel ─────────────────────────────────────────── */}
          <div className="flex-1 p-6 lg:p-8 overflow-y-auto max-h-[90vh]">
            {submitted ? (
              /* Success state */
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div
                  className="h-16 w-16 rounded-full flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(198,144,77,0.4)]"
                  style={{ background: "linear-gradient(135deg, #E0A86A, #8E5F2E)" }}
                >
                  <GraduationCap className="h-8 w-8 text-[#1F1F1F]" />
                </div>
                <h3 className="font-display text-2xl mb-2">You're all set! 🎉</h3>
                <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-6">
                  Our senior counselor will call you within <strong className="text-foreground">24 hours</strong>. Check your email for a confirmation.
                </p>
                <Button variant="outlineGold" size="sm" onClick={handleClose}>
                  Close
                </Button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-4 w-4 text-gold" />
                    <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                      Free · No Spam · No Commitment
                    </span>
                  </div>
                  <h2 className="font-display text-2xl lg:text-3xl leading-tight">
                    Great Decision!{" "}
                    <span className="text-gradient-gold">Let's Connect</span> With You Soon
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1.5">
                    Fill in your details and our expert will reach out within 24 hours.
                  </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                  {/* Row 1 — Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label className={labelCls}>
                        Full Name <span className="text-gold">*</span>
                      </Label>
                      <Input
                        value={data.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="Enter your full name"
                        className={inputCls}
                        maxLength={100}
                      />
                    </div>
                    <div>
                      <Label className={labelCls}>
                        Your Email <span className="text-gold">*</span>
                      </Label>
                      <Input
                        type="email"
                        value={data.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="Enter your email"
                        className={inputCls}
                        maxLength={200}
                      />
                    </div>
                  </div>

                  {/* Row 2 — Phone + Course */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label className={labelCls}>
                        Mobile No. <span className="text-gold">*</span>
                      </Label>
                      <Input
                        value={data.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="+91 98xxxxxxxx"
                        className={inputCls}
                        maxLength={16}
                      />
                    </div>
                    <div>
                      <Label className={labelCls}>
                        Course <span className="text-gold">*</span>
                      </Label>
                      <Select value={data.course} onValueChange={(v) => set("course", v)}>
                        <SelectTrigger className={`${inputCls} w-full`}>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          {COURSES.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Row 3 — State + City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label className={labelCls}>
                        State <span className="text-gold">*</span>
                      </Label>
                      <Select value={data.state} onValueChange={(v) => set("state", v)}>
                        <SelectTrigger className={`${inputCls} w-full`}>
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent className="max-h-56">
                          {INDIAN_STATES.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className={labelCls}>City</Label>
                      <Input
                        value={data.city}
                        onChange={(e) => set("city", e.target.value)}
                        placeholder="Enter your city"
                        className={inputCls}
                        maxLength={100}
                      />
                    </div>
                  </div>

                  {/* Row 4 — Preferred University */}
                  <div>
                    <Label className={labelCls}>Preferred University</Label>
                    <Select
                      value={data.preferredUniversity}
                      onValueChange={(v) => set("preferredUniversity", v)}
                    >
                      <SelectTrigger className={`${inputCls} w-full`}>
                        <SelectValue placeholder="Any university (optional)" />
                      </SelectTrigger>
                      <SelectContent className="max-h-56">
                        {UNIVERSITIES.map((u) => (
                          <SelectItem key={u} value={u}>{u}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="premium"
                    size="lg"
                    className="w-full mt-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Get Free Counseling →"
                    )}
                  </Button>

                  {/* Trust */}
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-gold shrink-0" />
                    <span>100% confidential · Trusted by 12,400+ students · No spam</span>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
