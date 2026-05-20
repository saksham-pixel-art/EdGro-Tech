import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { BlogCard } from "./BlogCard";
import { Reveal } from "./Reveal";
import { Button } from "@/components/ui/button";

export function BlogPreview() {
  const featured = BLOG_POSTS.slice(0, 3);

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-gold" />
              <span className="text-xs uppercase tracking-[0.3em] text-gold">EdGro Insights</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl leading-tight">
              Guides to help you{" "}
              <span className="text-gradient-gold">choose smarter.</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl">
              In-depth articles on online degrees, university comparisons, career paths, and
              admission tips — written by our counseling team.
            </p>
          </div>
          <Button asChild variant="outlineGold" size="lg" className="shrink-0">
            <Link to="/blog">
              View all articles <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((post, idx) => (
            <Reveal key={post.slug} delay={(Math.min(idx + 1, 3) as 1 | 2 | 3)}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
