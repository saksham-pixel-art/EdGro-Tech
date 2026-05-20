import { Link } from "@tanstack/react-router";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-gold/40 hover:-translate-y-1 transition-all duration-300 shadow-card flex flex-col"
    >
      {/* Cover image */}
      <div className="relative h-48 overflow-hidden bg-charcoal shrink-0">
        <img
          src={post.coverImage}
          alt={post.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
        {/* Category badge */}
        <div className="absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-gold/90 text-charcoal font-semibold">
          {post.category}
        </div>
        {/* Read time overlay */}
        <div className="absolute top-3 right-3 text-[10px] px-2 py-1 rounded-full bg-charcoal/70 backdrop-blur text-white/80 flex items-center gap-1">
          <Clock className="h-3 w-3" />{post.readTime} min
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-xl leading-snug mb-2 group-hover:text-gold transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 text-gold" />
            {formatDate(post.publishDate)}
          </div>
          <span className="flex items-center gap-1 text-xs text-gold font-medium group-hover:gap-2 transition-all">
            Read Article
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
