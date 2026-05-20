import { useState } from "react";
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
import { Loader2, ShieldCheck } from "lucide-react";
import { leadsApi, ApiError } from "@/api/client";

// ── Validation schema ─────────────────────────────────────────────────────────
const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{7,19}$/, "Enter a valid phone number"),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Enter a valid email address")
    .max(200),
  city: z.string().trim().max(100).optional(),
  state: z.string().min(1, "Select your state"),
  preferredUniversity: z.string().max(200).optional(),
  course: z.string().min(1, "Select a course"),
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
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi (NCT)",
  "Chandigarh",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry",
  "Outside India",
];

const UNIVERSITIES = [
  "Amity University",
  "Andhra University",
  "Chandigarh University",
  "DY Patil University Mumbai",
  "DY Patil University Pune",
  "Galgotias University",
  "GLA University",
  "Kurukshetra University",
  "Lovely Professional University (LPU)",
  "MAHE Manipal",
  "Manipal University Jaipur",
  "NMIMS University",
  "OP Jindal University",
  "Parul University",
  "Sharda University",
  "Shoolini University",
  "Sikkim Manipal University",
  "UPES University",
  "Uttaranchal University",
  "Vivekananda Global University",
  "Other",
];

// ── Types ─────────────────────────────────────────────────────────────────────
type FormData = {
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  preferredUniversity: string;
  course: string;
};

const EMPTY: FormData = {
  name: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  preferredUniversity: "",
  course: "",
};

// ── Component ─────────────────────────────────────────────────────────────────
export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FormData>(EMPTY);

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
      const result = await leadsApi.submit({
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || undefined,
        city: parsed.data.city || undefined,
        state: parsed.data.state,
        preferredUniversity: parsed.data.preferredUniversity || undefined,
        courseInterest: parsed.data.course,
      });
      toast.success(
        result.message ?? "Thanks! Our counselor will call you within 24 hours.",
      );
      setData(EMPTY);
    } catch (err) {
      toast.error(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  const fieldClass = "mt-1.5 h-12 bg-background/50";
  const labelClass = "text-xs uppercase tracking-wider text-muted-foreground";

  return (
    <form
      onSubmit={onSubmit}
      className={`bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-6 ${
        compact ? "" : "lg:p-8"
      } shadow-card`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
        <span className="text-xs uppercase tracking-[0.2em] text-gold">
          Limited Slots
        </span>
      </div>
      <h3 className="font-display text-2xl mb-1">Free Career Counseling</h3>
      <p className="text-sm text-muted-foreground mb-5">
        Talk to our admission expert. No charges, no spam.
      </p>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <Label htmlFor="lf-name" className={labelClass}>
            Full Name <span className="text-gold">*</span>
          </Label>
          <Input
            id="lf-name"
            value={data.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Your full name"
            className={fieldClass}
            maxLength={100}
            required
          />
        </div>

        {/* Mobile */}
        <div>
          <Label htmlFor="lf-phone" className={labelClass}>
            Mobile Number <span className="text-gold">*</span>
          </Label>
          <Input
            id="lf-phone"
            value={data.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+91 98xxxxxxxx"
            className={fieldClass}
            maxLength={16}
            required
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="lf-email" className={labelClass}>
            Email Address <span className="text-gold">*</span>
          </Label>
          <Input
            id="lf-email"
            type="email"
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@example.com"
            className={fieldClass}
            maxLength={200}
            required
          />
        </div>

        {/* City + State — side by side */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="lf-city" className={labelClass}>
              City
            </Label>
            <Input
              id="lf-city"
              value={data.city}
              onChange={(e) => set("city", e.target.value)}
              placeholder="Your city"
              className={fieldClass}
              maxLength={100}
            />
          </div>
          <div>
            <Label className={labelClass}>
              State <span className="text-gold">*</span>
            </Label>
            <Select value={data.state} onValueChange={(v) => set("state", v)}>
              <SelectTrigger className="mt-1.5 h-12 bg-background/50">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {INDIAN_STATES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Preferred University */}
        <div>
          <Label className={labelClass}>Preferred University</Label>
          <Select
            value={data.preferredUniversity}
            onValueChange={(v) => set("preferredUniversity", v)}
          >
            <SelectTrigger className="mt-1.5 h-12 bg-background/50">
              <SelectValue placeholder="Any university (optional)" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {UNIVERSITIES.map((u) => (
                <SelectItem key={u} value={u}>
                  {u}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Course */}
        <div>
          <Label className={labelClass}>
            Interested Course <span className="text-gold">*</span>
          </Label>
          <Select value={data.course} onValueChange={(v) => set("course", v)}>
            <SelectTrigger className="mt-1.5 h-12 bg-background/50">
              <SelectValue placeholder="Choose a program" />
            </SelectTrigger>
            <SelectContent>
              {COURSES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="premium"
          size="lg"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Request Free Counseling"
          )}
        </Button>

        {/* Trust line */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-gold" />
          <span>100% confidential · Trusted by 12,400+ students</span>
        </div>
      </div>
    </form>
  );
}
