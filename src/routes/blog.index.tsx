import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ChatbotWidget } from "@/components/site/ChatbotWidget";
import { CounselingModal } from "@/components/site/CounselingModal";
import { Toaster } from "@/components/ui/sonner";
import { BlogCard } from "@/components/site/BlogCard";
import { BLOG_POSTS, BLOG_CATEGORIES, type BlogCategory } from "@/lib/blog-data";
import { useState, useMemo } from "react";
import { Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCounselingModal } from "@/hooks/use-counseling-modal";

export const Route = createFileRoute("/blog/")({
  component: BlogPage,
});

function BlogPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "All">("All");
  const { open, openModal, closeModal } = useCounselingModal();

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesQuery = !q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
          <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-gold" />
              <span className="text-xs uppercase tracking-[0.3em] text-gold">EdGro Insights</span>
            </div>
            <h1 className="font-display text-4xl lg:text-6xl leading-tight max-w-3xl">
              Expert guides on <span className="text-gradient-gold">online degrees</span>,
              universities &amp; career growth in India.
            </h1>
            <p className="mt-5 text-muted-foreground max-w-2xl text-lg">
              In-depth articles to help you choose the right program, compare universities,
              and plan your career — backed by real data.
            </p>

            {/* Search */}
            <div className="mt-8 relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search articles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 h-12 bg-card border-border text-sm"
              />
            </div>

            {/* Category pills */}
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("All")}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  activeCategory === "All"
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
                }`}
              >
                All
              </button>
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                    activeCategory === cat
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="h-16 w-16 rounded-2xl border border-border bg-card flex items-center justify-center mb-5">
                  <BookOpen className="h-7 w-7 text-muted-foreground" />
                </div>
                <h3 className="font-display text-2xl mb-2">No articles found</h3>
                <p className="text-muted-foreground text-sm max-w-sm">
                  Try a different search term or browse all categories.
                </p>
                <button
                  onClick={() => { setQuery(""); setActiveCategory("All"); }}
                  className="mt-5 text-sm text-gold hover:text-gold/80 underline underline-offset-4 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-muted-foreground">
                    {filtered.length} {filtered.length === 1 ? "article" : "articles"}
                    {activeCategory !== "All" && ` in ${activeCategory}`}
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="rounded-2xl border border-gold/20 bg-card p-8 lg:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent pointer-events-none" />
              <div className="relative">
                <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Free Counseling</div>
                <h2 className="font-display text-3xl lg:text-4xl mb-3">
                  Still unsure which program is right for you?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                  Our admission experts have helped 12,400+ students find the perfect online degree.
                  Get a free, personalised recommendation in 24 hours.
                </p>
                <button
                  onClick={openModal}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[image:var(--gradient-gold)] text-charcoal font-semibold text-sm shadow-[var(--shadow-gold)] hover:brightness-110 transition-all"
                >
                  Get Free Counseling
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <ChatbotWidget />
      <CounselingModal open={open} onClose={closeModal} />
      <Toaster position="top-center" />
    </div>
  );
}
