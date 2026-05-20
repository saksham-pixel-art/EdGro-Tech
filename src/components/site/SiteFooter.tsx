import logo from "@/assets/edgro-logo-new.png";
import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";
import { Link } from "@tanstack/react-router";

// Meta (Facebook) icon — not in lucide-react, using official path
function MetaIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/edgro-tech-private-limited",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/edgro_tech?igsh=MXg3ajVuMGFrc2ppcw%3D%3D&utm_source=qr",
  },
  {
    icon: MetaIcon,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61589020510361&mibextid=wwXIfr",
  },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-ink">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-4 mb-6">
              {/* CSS Crop to extract just the EG Icon */}
              <div className="h-14 w-14 rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] flex items-start justify-center shadow-xl">
                <img src={logo} alt="EdGro Tech" className="w-[145%] max-w-none h-auto -mt-2" />
              </div>
              <div>
                <div className="font-display text-[22px] leading-none tracking-tight">
                  <span className="text-gradient-gold">EdGro</span>
                  <span className="text-white/90"> Tech</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.32em] text-white/40 mt-1.5 font-medium">
                  Private Limited
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              India's premium admission partner for online & distance education.
              UGC-DEB approved universities, transparent counseling, lifetime career support.
            </p>
            <div className="flex gap-3 mt-6">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/programs" className="hover:text-foreground transition-colors">All Programs</Link></li>
              <li><Link to="/universities" className="hover:text-foreground transition-colors">All Universities</Link></li>
              <li><Link to="/compare" className="hover:text-foreground transition-colors">Compare Tool</Link></li>
              <li><Link to="/blog" className="hover:text-foreground transition-colors">EdGro Insights</Link></li>
              <li><Link to="/" hash="counselor" className="hover:text-foreground transition-colors">AI Counselor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/" hash="success" className="hover:text-foreground transition-colors">Success Stories</Link></li>
              <li><Link to="/" hash="lead" className="hover:text-foreground transition-colors">Free Counseling</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-4">Get in touch</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 mt-0.5 text-gold shrink-0" />
                <span>+91 87963 46455</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 text-gold shrink-0" />
                <span>hr@edgrotech.in</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} EdGro Tech Private Limited. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
