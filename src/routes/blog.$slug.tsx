import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  getBlogBySlug,
  BLOG_POSTS,
  type BlogPost,
} from "@/lib/blog-data";
import { UNIVERSITIES } from "@/lib/edgro-data";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ChatbotWidget } from "@/components/site/ChatbotWidget";
import { CounselingModal } from "@/components/site/CounselingModal";
import { Toaster } from "@/components/ui/sonner";
import { LeadForm } from "@/components/site/LeadForm";
import { BlogCard } from "@/components/site/BlogCard";
import { useCounselingModal } from "@/hooks/use-counseling-modal";
import { useState } from "react";
import {
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp,
  Star,
  MapPin,
  TrendingUp,
  Check,
  ArrowRight,
  BookOpen,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlogBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  component: BlogPostPage,
});

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BlogPostPage() {
  const post = Route.useLoaderData() as BlogPost;
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { open, openModal, closeModal } = useCounselingModal();

  // Resolve related universities from UNIVERSITIES array
  const relatedUniversities = post.relatedUniversitySlugs
    .map((uniSlug: string) => UNIVERSITIES.find((u) => u.slug === uniSlug))
    .filter(Boolean) as (typeof UNIVERSITIES)[number][];

  // Related articles — up to 3 other posts
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(
    0,
    3,
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative h-72 lg:h-96 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/20" />
          <div className="relative h-full flex flex-col justify-end pb-8 lg:pb-12">
            <div className="mx-auto max-w-7xl w-full px-6 lg:px-10">
              {/* Category badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/90 text-charcoal text-xs font-semibold uppercase tracking-wider mb-4">
                {post.category}
              </div>
              <h1 className="font-display text-3xl lg:text-5xl text-white leading-tight max-w-4xl">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 mt-4 text-sm text-white/70">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-gold" />
                  {post.readTime} min read
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-gold" />
                  {formatDate(post.publishDate)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-3">
            <nav className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                to="/blog"
                className="hover:text-foreground transition-colors"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="text-gold">{post.category}</span>
              <span>/</span>
              <span className="text-foreground/70 truncate max-w-[200px] lg:max-w-none">
                {post.title.length > 60
                  ? post.title.slice(0, 60) + "…"
                  : post.title}
              </span>
            </nav>
          </div>
        </div>

        {/* ── Two-column layout ────────────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
            <div className="flex-1 min-w-0 space-y-12">
              {/* a. Introduction */}
              <section>
                <p className="text-base lg:text-lg text-foreground/90 leading-relaxed">
                  {post.intro}
                </p>

                {/* Who is this for? */}
                <div className="mt-6 rounded-xl border border-gold/20 bg-gold/5 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-gold" />
                    <span className="text-sm font-semibold text-gold uppercase tracking-wider">
                      Who is this for?
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {post.courseOverview.whoShouldPursue.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* b. Course Overview */}
              <section>
                <h2 className="font-display text-2xl lg:text-3xl mb-4">
                  Course Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {post.courseOverview.what}
                </p>
              </section>

              {/* c. Top Universities */}
              {relatedUniversities.length > 0 && (
                <section>
                  <h2 className="font-display text-2xl lg:text-3xl mb-6">
                    Top Universities for {post.category}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {relatedUniversities.map((uni) => (
                      <article
                        key={uni.slug}
                        className="rounded-xl border border-border bg-card overflow-hidden hover:border-gold/40 transition-colors"
                      >
                        {/* University image */}
                        <div className="relative h-32 overflow-hidden bg-charcoal">
                          <img
                            src={uni.image}
                            alt={`${uni.name} campus`}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                          {/* NAAC badge */}
                          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-charcoal/80 backdrop-blur border border-gold/30 text-[10px] text-gold">
                            <Star className="h-2.5 w-2.5 fill-gold" />
                            NAAC {uni.naac}
                          </div>
                          <div className="absolute bottom-2 left-3 font-display text-2xl text-white/90 drop-shadow">
                            {uni.short}
                          </div>
                        </div>
                        {/* Card body */}
                        <div className="p-4">
                          <h3 className="font-semibold text-sm mb-1">
                            {uni.name}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                            <MapPin className="h-3 w-3" />
                            {uni.city}
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                            <div>
                              <div className="text-muted-foreground">Fees</div>
                              <div className="font-medium text-foreground">
                                {uni.feesRange}
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">
                                Avg Placement
                              </div>
                              <div className="font-medium text-emerald-400">
                                {uni.placement}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {uni.highlights.slice(0, 3).map((h) => (
                              <span
                                key={h}
                                className="text-[10px] px-2 py-0.5 rounded-full border border-border text-foreground/70"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                          <Button variant="premium" size="sm" className="w-full" onClick={openModal}>
                            Apply Now
                          </Button>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {/* d. Fees Comparison Table */}
              <section>
                <h2 className="font-display text-2xl lg:text-3xl mb-5">
                  Fees Comparison 2025
                </h2>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm min-w-[560px]">
                    <thead>
                      <tr className="border-b border-border bg-card/80">
                        <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                          University
                        </th>
                        <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                          Fees
                        </th>
                        <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                          Duration
                        </th>
                        <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                          NAAC
                        </th>
                        <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                          Avg Placement
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {post.feesTable.map((row, i) => (
                        <tr
                          key={i}
                          className={`border-b border-border last:border-0 ${
                            i % 2 === 0 ? "bg-background/30" : "bg-card/40"
                          }`}
                        >
                          <td className="px-4 py-3 font-medium text-foreground">
                            {row.university}
                          </td>
                          <td className="px-4 py-3 text-gold font-medium">
                            {row.fees}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {row.duration}
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[11px] font-medium">
                              <Star className="h-2.5 w-2.5 fill-gold" />
                              {row.naac}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-emerald-400 font-medium">
                            {row.placement}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* e. Curriculum / Skills */}
              <section>
                <h2 className="font-display text-2xl lg:text-3xl mb-5">
                  Curriculum &amp; Key Skills
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {post.curriculum.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground/90 hover:border-gold/40 transition-colors"
                    >
                      <Check className="h-3.5 w-3.5 text-gold shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              {/* f. Career Opportunities */}
              <section>
                <h2 className="font-display text-2xl lg:text-3xl mb-5">
                  Career Opportunities
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {post.careerRoles.map((role, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-border bg-card p-4 hover:border-gold/40 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-sm text-foreground">
                          {role.title}
                        </h3>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full border font-medium shrink-0 ${
                            role.growth === "Very High"
                              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                              : role.growth === "High"
                                ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                                : "border-border text-muted-foreground"
                          }`}
                        >
                          {role.growth} Growth
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold text-sm">
                          {role.salary}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* g. Admission Process */}
              <section>
                <h2 className="font-display text-2xl lg:text-3xl mb-6">
                  Admission Process
                </h2>
                <div className="relative">
                  {/* Connecting line */}
                  <div className="absolute left-5 top-6 bottom-6 w-px bg-border" />
                  <ol className="space-y-5">
                    {post.admissionSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-4 relative">
                        <div className="h-10 w-10 rounded-full border-2 border-gold bg-card flex items-center justify-center shrink-0 z-10 text-gold font-bold text-sm">
                          {i + 1}
                        </div>
                        <div className="pt-2 text-sm text-foreground/85 leading-relaxed">
                          {step}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              {/* h. Inline Lead Capture */}
              <section>
                <div className="rounded-2xl border border-gold/30 bg-card p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-gold" />
                    <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                      Free Counseling
                    </span>
                  </div>
                  <h2 className="font-display text-2xl lg:text-3xl mb-2">
                    Ready to enroll? Get free counseling.
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    Our admission experts will help you shortlist the best
                    university for your goals, budget, and timeline — at no
                    cost.
                  </p>
                  <LeadForm compact />
                </div>
              </section>

              {/* i. FAQ Section */}
              <section>
                <h2 className="font-display text-2xl lg:text-3xl mb-5">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {post.faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-border bg-card overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setExpandedFaq(expandedFaq === i ? null : i)
                        }
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-card/80 transition-colors"
                        aria-expanded={expandedFaq === i}
                      >
                        <span className="font-semibold text-sm text-foreground">
                          {faq.q}
                        </span>
                        {expandedFaq === i ? (
                          <ChevronUp className="h-4 w-4 text-gold shrink-0" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                        )}
                      </button>
                      {expandedFaq === i && (
                        <div className="px-5 pb-4 border-t border-border">
                          <p className="text-sm text-muted-foreground leading-relaxed pt-3">
                            {faq.a}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* j. Related Articles */}
              {relatedPosts.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-2xl lg:text-3xl">
                      Related Articles
                    </h2>
                    <Link
                      to="/blog"
                      className="flex items-center gap-1 text-sm text-gold hover:text-gold/80 transition-colors"
                    >
                      View all <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {relatedPosts.map((p) => (
                      <BlogCard key={p.slug} post={p} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* ── RIGHT SIDEBAR ────────────────────────────────────────────── */}
            <aside className="hidden lg:block w-80 shrink-0">
              <div className="sticky top-24 space-y-5">
                {/* Lead Form card */}
                <LeadForm compact />

                {/* Quick Facts card */}
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gold mb-4 font-medium">
                    Quick Facts
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 text-gold" />
                        Read Time
                      </span>
                      <span className="font-medium">{post.readTime} min</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <BookOpen className="h-3.5 w-3.5 text-gold" />
                        Category
                      </span>
                      <span className="font-medium">{post.category}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 text-gold" />
                        Published
                      </span>
                      <span className="font-medium">
                        {formatDate(post.publishDate)}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Related Programs card */}
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gold mb-4 font-medium">
                    Related Programs
                  </h3>
                  <ul className="space-y-2.5">
                    {[
                      { label: "Online MBA", slug: "online-mba" },
                      { label: "Data Science & AI", slug: "data-science" },
                      { label: "Online BCA", slug: "online-bca" },
                    ].map((prog) => (
                      <li key={prog.slug}>
                        <Link
                          to="/programs"
                          className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors group"
                        >
                          <span>{prog.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-border">
                    <Button asChild variant="outlineGold" size="sm" className="w-full">
                      <Link to="/programs">
                        View All Programs
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-gold mb-4 font-medium">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground hover:border-gold/40 hover:text-foreground transition-colors cursor-default"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
      <ChatbotWidget />
      <CounselingModal open={open} onClose={closeModal} />
      <Toaster position="top-center" />
    </div>
  );
}
